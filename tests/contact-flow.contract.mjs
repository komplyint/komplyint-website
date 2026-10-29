import assert from 'node:assert/strict'
import { chromium } from 'playwright'
const base=process.env.SITE_URL||'http://127.0.0.1:3000'
const browser=await chromium.launch({headless:true,args:['--no-sandbox']})
try{
  const page=await browser.newPage({viewport:{width:1440,height:900}})
  for(const route of ['/contact','/en/contact','/sv/contact']){
    const english=route.startsWith('/en')
    const swedish=route.startsWith('/sv')
    await page.goto(base+route,{waitUntil:'domcontentloaded'})
    const form=page.locator('form.kc-form')
    assert.equal(await form.locator('input[type=email]').count(),1)
    await form.locator('input[type=email]').fill('synthetic@example.invalid')
    await form.locator('textarea').fill('Synthetic request for a small reporting task.')
    await form.locator('select').first().selectOption('data-reporting')
    let observed=null
    await page.route('**/api/contact',async request=>{
      observed=request.request().postDataJSON()
      await request.fulfill({status:202,contentType:'application/json',body:JSON.stringify({ok:true,accepted:true,status:'queued'})})
    })
    await form.locator('button[type=submit]').click()
    await form.locator('.kc-form-success[role="status"]').waitFor({state:'visible'})
    assert.equal(observed.service,'data-reporting')
    assert.equal(observed.engagementType,'project')
    assert.equal(observed.workLanguage,'flexible')
    assert.equal(observed.locale,english?'en':swedish?'sv':'fi')
    assert.equal(observed.email,'synthetic@example.invalid')
    assert.match(observed.idempotencyKey,/^[0-9a-f-]{20,64}$/)
    await page.unroute('**/api/contact')
    await form.locator('input[type=email]').fill('synthetic@example.invalid')
    await form.locator('textarea').fill('Synthetic request for a second safe test.')
    await page.route('**/api/contact',async request=>request.fulfill({
      status:429,contentType:'application/json',body:JSON.stringify({ok:false,error:'Rate limited'})
    }))
    await form.locator('button[type=submit]').click()
    const alert=form.locator('.kc-form-error[role="alert"]')
    await alert.waitFor({state:'visible'})
    await page.waitForFunction(()=>!!document.querySelector('form.kc-form .kc-form-error[role="alert"]')?.textContent?.trim())
    assert.match(await alert.textContent()||'',english?/Too many requests/:swedish?/För många försök/:/Liikaa lähetysyrityksiä/)
    assert.equal(await form.locator('textarea').inputValue(),'Synthetic request for a second safe test.')
    await page.unroute('**/api/contact')
    await page.route('**/api/contact',async request=>request.fulfill({
      status:422,contentType:'application/json',body:JSON.stringify({ok:false,error:'Validation failed',fields:{email:'Invalid email'}})
    }))
    await form.locator('button[type=submit]').click()
    const emailError=form.locator('#kc-contact-email-error')
    await emailError.waitFor({state:'visible'})
    assert.equal(await form.locator('input[type=email]').getAttribute('aria-invalid'),'true')
    assert.equal(await form.locator('input[type=email]').getAttribute('aria-describedby'),'kc-contact-email-error')
    await page.waitForFunction(()=>document.activeElement?.getAttribute('type')==='email')
    await page.unroute('**/api/contact')
  }
  // Real layout regression: the address panel must have visible inset space,
  // and both columns must stay completely inside the page at desktop,
  // tablet, mobile and narrow (200%-zoom-equivalent) viewport widths.
  for (const route of ['/contact','/en/contact','/sv/contact']) {
    for (const width of [320,390,820,1024,1440]) {
      await page.setViewportSize({width,height:900})
      await page.goto(base+route,{waitUntil:'domcontentloaded'})
      const r=await page.evaluate(()=>{
        const side=document.querySelector('.kc-contact-side')
        const grid=document.querySelector('.kc-contact-grid')
        const form=document.querySelector('.kc-contact-grid .kc-form')
        const eyebrow=side?.querySelector('.kc-eyebrow')
        const addresses=[...document.querySelectorAll('.kc-contact-side .kc-mail-channel a')]
        if(!side||!grid||!form||!eyebrow||addresses.length!==4)return null
        const sideBox=side.getBoundingClientRect()
        const gridBox=grid.getBoundingClientRect()
        const formBox=form.getBoundingClientRect()
        const eyebrowBox=eyebrow.getBoundingClientRect()
        const padding=getComputedStyle(side)
        return {
          viewport:innerWidth,
          gridLeft:gridBox.left,gridRight:gridBox.right,
          sideLeft:sideBox.left,sideRight:sideBox.right,sideTop:sideBox.top,
          formLeft:formBox.left,formRight:formBox.right,formTop:formBox.top,
          insetLeft:eyebrowBox.left-sideBox.left,
          insetRight:parseFloat(padding.paddingRight),
          addressRight:Math.max(...addresses.map(a=>a.getBoundingClientRect().right)),
          clientWidth:side.clientWidth,scrollWidth:side.scrollWidth,
          formClientWidth:form.clientWidth,formScrollWidth:form.scrollWidth,
        }
      })
      assert.ok(r,route+' @ '+width+': address layout missing')
      assert.ok(r.insetLeft>=17,route+' @ '+width+': info panel touches its edge')
      assert.ok(r.insetRight>=17,route+' @ '+width+': missing right inset')
      assert.ok(r.sideLeft>=r.gridLeft-1&&r.sideRight<=r.gridRight+1,
        route+' @ '+width+': information card escapes grid')
      assert.ok(r.formLeft>=r.gridLeft-1&&r.formRight<=r.gridRight+1,
        route+' @ '+width+': enquiry form escapes grid')
      assert.ok(r.addressRight<=r.sideRight-15,
        route+' @ '+width+': department email is cropped')
      assert.ok(r.scrollWidth<=r.clientWidth+1&&r.formScrollWidth<=r.formClientWidth+1,
        route+' @ '+width+': contact panel has horizontal overflow')
      if(width<=1023){
        assert.ok(r.formTop<r.sideTop,route+' @ '+width+': cards should stack form-first')
      }else{
        assert.ok(r.formLeft>=r.sideRight+12,route+' @ '+width+': desktop columns overlap')
      }
      if(width===390||width===1440){
        const {mkdirSync}=await import('node:fs')
        mkdirSync('site-preview',{recursive:true})
        const locale=route.startsWith('/en')?'en':route.startsWith('/sv')?'sv':'fi'
        await page.screenshot({path:'site-preview/contact-reflow-'+locale+'-'+width+'.png',fullPage:true})
      }
    }
  }
  console.log('FI EN SV contact address cards have inset spacing and no clipping at 320, 390, 820, 1024, 1440px PASS')

  console.log('Trilingual contact submission, rate limits, accessible validation focus and inline errors PASS')
}finally{await browser.close()}
