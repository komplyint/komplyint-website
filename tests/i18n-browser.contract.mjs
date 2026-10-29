import assert from 'node:assert/strict'
import {chromium} from 'playwright'
const base=process.env.SITE_URL||'http://127.0.0.1:3000'
const browser=await chromium.launch({headless:true,args:['--no-sandbox']})
try{
  const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'})
  const expected=[
    {path:'/',locale:'fi',heading:'Ohjelmistokehitystä, testausta'},
    {path:'/en',locale:'en',heading:'Software development, testing and reliable'},
    {path:'/sv',locale:'sv',heading:'Programutveckling, testning och fungerande'},
    {path:'/sv/services',locale:'sv',heading:'Hitta en tjänst som passar ert behov'},
    {path:'/sv/services/data-reporting',locale:'sv',heading:'Excel, data och rapportering'},
    {path:'/sv/privacy',locale:'sv',heading:'Dataskyddsbeskrivning'},
    {path:'/sv/accessibility',locale:'sv',heading:'Tillgänglighetsinformation'},
  ]
  for(const route of expected){
    const response=await page.goto(base+route.path,{waitUntil:'domcontentloaded'})
    assert.equal(response?.status(),200,route.path)
    const raw=await response.text()
    assert.match(raw,new RegExp('<html[^>]*\\blang="'+route.locale+'"'),route.path+' initial HTML lang')
    assert.equal(await page.locator('html').getAttribute('lang'),route.locale)
    assert.ok((await page.locator('h1').innerText()).includes(route.heading),route.path+' translated heading')
    for(const locale of ['fi','en','sv']){
      const alt=page.locator('link[rel="alternate"][hreflang="'+locale+'"]')
      assert.equal(await alt.count(),1,route.path+' '+locale+' alternate')
      assert.ok((await alt.getAttribute('href'))?.includes('komplyint.fi'))
    }
    const links=page.locator('.kc-actions .ki-locale-switcher a')
    assert.equal(await links.count(),3)
    for(const [code,name,flag] of [['fi','Suomi','🇫🇮'],['en','English','🇬🇧'],['sv','Svenska','🇸🇪']]){
      const anchor=links.filter({has:page.locator('[data-unused="none"]')})
      void anchor
      const link=page.locator('.kc-actions .ki-locale-switcher [data-locale="'+code+'"]')
      assert.match(await link.textContent()||'',new RegExp(name))
      assert.ok((await link.textContent()||'').includes(flag),'flag missing beside '+name)
    }
    assert.equal(await page.locator('.kc-actions .ki-locale-switcher [data-locale="'+route.locale+'"]').getAttribute('aria-current'),'true')
  }
  const missing=await page.goto(base+'/sv/does-not-exist',{waitUntil:'domcontentloaded'})
  assert.equal(missing?.status(),404,'A missing Swedish route should return 404')
  assert.equal(await page.locator('html').getAttribute('lang'),'sv')
  assert.match(await page.locator('h1').innerText(),/Sidan hittades inte/)
  for(const width of [360,390,768,1024,1200,1366,1440]){
    await page.setViewportSize({width,height:850})
    const response=await page.goto(base+'/sv/services',{waitUntil:'domcontentloaded'})
    assert.equal(response?.status(),200,'Swedish services page '+width)
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth)
    assert.ok(overflow<=4,'Unexpected horizontal overflow in Swedish locale at '+width+': '+overflow)
    if(width>=1200){
      const locales=page.locator('.kc-actions .ki-locale-switcher a:visible')
      assert.equal(await locales.count(),3,'Desktop flags must remain visible at '+width)
    }else{
      const toggle=page.locator('.kc-mobile-toggle')
      assert.equal(await toggle.isVisible(),true,'Mobile navigation must remain available at '+width)
      await toggle.click()
      assert.equal(await page.locator('.qh-mobile-utilities .ki-locale-switcher a:visible').count(),3)
    }
  }
  await page.setViewportSize({width:1440,height:900})
  await page.goto(base+'/sv/services',{waitUntil:'domcontentloaded'})
  const brochures=page.locator('.qh-download-links a')
  assert.equal(await brochures.count(),4,'Three individual PDFs and one shared ZIP')
  for(const asset of ['Komplyint_Palveluesite_FI.pdf','Komplyint_Service_Portfolio_EN.pdf','Komplyint_Tjanstebroschyr_SV.pdf']){
    const link=page.locator('.qh-download-links a[href$="'+asset+'"]')
    assert.equal(await link.count(),1,'Missing public '+asset+' link')
    const pdf=await page.request.get(base+'/downloads/'+asset)
    assert.equal(pdf.status(),200,'Local download must exist: '+asset)
    assert.equal((await pdf.body()).subarray(0,5).toString(),'%PDF-',asset+' signature')
  }
  await page.goto(base+'/en/services/data-reporting?source=i18n-test#main-content',{waitUntil:'domcontentloaded'})
  await page.locator('.kc-actions .ki-locale-switcher [data-locale="sv"]').click()
  await page.waitForURL(/\/sv\/services\/data-reporting\?source=i18n-test#main-content/)
  assert.equal(await page.locator('html').getAttribute('lang'),'sv')
  assert.match(await page.locator('h1').innerText(),/Excel, data och rapportering/)
  await page.locator('.kc-actions .ki-locale-switcher [data-locale="fi"]').click()
  await page.waitForURL(/\/services\/data-reporting\?source=i18n-test#main-content/)
  assert.equal(await page.locator('html').getAttribute('lang'),'fi')
  const mobile=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce'})
  await mobile.goto(base+'/sv',{waitUntil:'domcontentloaded'})
  await mobile.locator('.kc-mobile-toggle').click()
  const choices=mobile.locator('.qh-mobile-utilities .ki-locale-switcher a')
  assert.equal(await choices.count(),3)
  for(const name of ['Suomi','English','Svenska'])assert.ok((await choices.allTextContents()).some(text=>text.includes(name)))
  await mobile.screenshot({path:'site-preview/i18n-mobile-sv.png',animations:'disabled'})
  await mobile.locator('.qh-mobile-utilities [data-locale="en"]').click()
  await mobile.waitForURL(/\/en$/)
  assert.equal(await mobile.locator('html').getAttribute('lang'),'en')
  await mobile.close()
  console.log('FI/EN/SV navigation, flags, SEO, deep links, query/hash and mobile language switching PASS')
}finally{await browser.close()}
