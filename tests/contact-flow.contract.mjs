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
    await form.locator('select').selectOption('data-reporting')
    let observed=null
    await page.route('**/api/contact',async request=>{
      observed=request.request().postDataJSON()
      await request.fulfill({status:202,contentType:'application/json',body:JSON.stringify({ok:true,accepted:true,status:'queued'})})
    })
    await form.locator('button[type=submit]').click()
    await form.locator('.kc-form-success[role="status"]').waitFor({state:'visible'})
    assert.equal(observed.service,'data-reporting')
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
  }
  console.log('Bilingual contact submission, structured service, accepted and rate-limited states PASS')
}finally{await browser.close()}
