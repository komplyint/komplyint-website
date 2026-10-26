import assert from 'node:assert/strict'
import { chromium, firefox, webkit } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'

// Q10/Q11: cross-engine functional baseline, not a substitute for real devices
// or independent NVDA/VoiceOver and visual art-direction sign-off.
const base=process.env.SITE_URL||'http://127.0.0.1:3000'
const routes=[{locale:'fi',path:'/'},{locale:'en',path:'/en'},{locale:'sv',path:'/sv'},
 {locale:'fi',path:'/services'},{locale:'en',path:'/en/services'},{locale:'sv',path:'/sv/services'},
 {locale:'fi',path:'/contact'},{locale:'en',path:'/en/contact'},{locale:'sv',path:'/sv/contact'}]
const results=[]
await mkdir('site-preview',{recursive:true})
for(const [name,engine] of [['chromium',chromium],['firefox',firefox],['webkit',webkit]]){
 const browser=await engine.launch({headless:true,args:name==='chromium'?['--no-sandbox']:[]})
 try{
  for(const width of [390,1440]){
   const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce',colorScheme:'light'})
   const page=await context.newPage()
   for(const route of routes){
    const response=await page.goto(base+route.path,{waitUntil:'domcontentloaded',timeout:30000})
    assert.equal(response?.status(),200,name+' '+route.path)
    const snapshot=await page.evaluate(()=>({
      lang:document.documentElement.lang,
      main:document.querySelectorAll('main#main-content').length,
      headings:document.querySelectorAll('main h1').length,
      logo:document.querySelector('header .kc-logo')?.getBoundingClientRect().width,
      overflow:document.documentElement.scrollWidth-window.innerWidth,
      contact:!!document.querySelector('form.kc-form'),
      headerLink:document.querySelector('.kc-logo-link')?.getAttribute('aria-label'),
    }))
    assert.equal(snapshot.lang,route.locale,name+' document language '+route.path)
    assert.equal(snapshot.main,1,name+' main landmark '+route.path)
    assert.equal(snapshot.headings,1,name+' H1 '+route.path)
    assert.ok(snapshot.logo>=90,name+' logo visible '+route.path)
    assert.ok(snapshot.overflow<=3,name+' horizontal overflow '+route.path+' '+snapshot.overflow)
    assert.ok(snapshot.headerLink?.includes('Komplyint Oy'),name+' labelled home link')
    assert.equal(snapshot.contact,route.path.endsWith('contact'),name+' form placement '+route.path)
    results.push({browser:name,width,locale:route.locale,route:route.path,result:'PASS',...snapshot})
   }
   if(width===390){
    await page.goto(base+'/',{waitUntil:'domcontentloaded'})
    await page.locator('.kc-mobile-toggle').click()
    assert.equal(await page.locator('nav.kc-nav').isVisible(),true,name+' mobile navigation')
    await page.keyboard.press('Escape')
    assert.equal(await page.locator('nav.kc-nav').isVisible(),false,name+' escape closes menu')
   }
   await context.close()
  }
 }finally{await browser.close()}
}
const report={schema:'komplyint-cross-browser-q10.v1',sha:process.env.GITHUB_SHA||'local',
 browsers:['chromium','firefox','webkit'],routes:routes.length,viewports:[390,1440],checks:results.length,
 automatedResult:'PASS',manualPhysicalDevices:'NOT_TESTED',screenReaderReview:'NOT_TESTED',results}
await writeFile('site-preview/cross-browser-evidence.json',JSON.stringify(report,null,2))
console.log(JSON.stringify({result:'PASS',browsers:report.browsers,viewports:report.viewports,checked:report.checks}))
