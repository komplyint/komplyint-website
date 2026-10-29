import assert from 'node:assert/strict'
import {chromium} from 'playwright'
import {mkdir} from 'node:fs/promises'
const base=process.env.SITE_URL||'http://127.0.0.1:3000'
const locales=[
 {code:'fi',prefix:'',name:'Sovelluksen korjaus ja jatkokehitys',about:'Ohjelmistokehitystä ja digipalveluja yrityksille.',contact:'Kuvaile, missä sovellus'},
 {code:'en',prefix:'/en',name:'Fix and extend an existing application',about:'Software engineering and digital services for business.',contact:'Tell us about an application issue'},
 {code:'sv',prefix:'/sv',name:'Rätta fel och vidareutveckla en applikation',about:'Programutveckling och digitala tjänster för företag.',contact:'Beskriv problemen med en applikation'}
]
await mkdir('site-preview',{recursive:true})
const browser=await chromium.launch({headless:true,args:['--no-sandbox']})
try{
 for(const locale of locales){
   const page=await browser.newPage({viewport:{width:1440,height:950},reducedMotion:'reduce',acceptDownloads:true})
   let response=await page.goto(base+locale.prefix+'/work',{waitUntil:'domcontentloaded'})
   assert.equal(response?.status(),200,'work '+locale.code)
   assert.equal(await page.locator('html').getAttribute('lang'),locale.code)
   assert.equal(await page.locator('#data-examples .kc-example').count(),3,'original examples preserved '+locale.code)
   assert.equal(await page.locator('#software-examples .kc-example').count(),3,'software row added '+locale.code)
   assert.equal(await page.locator('.kc-example .qh-example-art svg').count(),6,'6 individual diagrams '+locale.code)
   assert.ok((await page.locator('#software-examples').innerText()).includes(locale.name))
   assert.equal(await page.locator('.kc-example-page-index a').count(),2)
   await page.locator('a[href="#software-examples"]').click()
   assert.equal(new URL(page.url()).hash,'#software-examples')
   await page.screenshot({path:'site-preview/work-six-'+locale.code+'-desktop.png',fullPage:true,animations:'disabled'})
   await page.goto(base+(locale.prefix||'/'),{waitUntil:'domcontentloaded'})
   assert.equal(await page.locator('.qh-feature-software-art svg').count(),1,'homepage software preview '+locale.code)
   assert.equal(await page.locator('.qh-featured-work .qh-work-art-image').count(),1,'reporting preview preserved '+locale.code)
   assert.equal(await page.locator('.qh-feature-software a[href$="#software-examples"]').count(),1)
   await page.goto(base+locale.prefix+'/services',{waitUntil:'domcontentloaded'})
   assert.equal(await page.locator('.kc-examples-bridge a[href$="#software-examples"]').count(),1,'services software examples link')
   await page.goto(base+locale.prefix+'/software',{waitUntil:'domcontentloaded'})
   assert.equal(await page.locator('.kc-examples-bridge a[href$="#software-examples"]').count(),1,'software examples link')
   await page.goto(base+locale.prefix+'/about',{waitUntil:'domcontentloaded'})
   assert.ok((await page.locator('main h1').textContent()||'').includes(locale.about))
   await page.goto(base+locale.prefix+'/contact',{waitUntil:'domcontentloaded'})
   assert.ok((await page.locator('.kc-page-top').innerText()).includes(locale.contact))
   await page.setViewportSize({width:390,height:850})
   await page.goto(base+locale.prefix+'/work',{waitUntil:'domcontentloaded'})
   assert.equal(await page.locator('#software-examples .kc-example').count(),3)
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth)
   assert.ok(overflow<=4,'mobile overflow '+locale.code+': '+overflow)
   await page.screenshot({path:'site-preview/work-six-'+locale.code+'-mobile.png',fullPage:true,animations:'disabled'})
   await page.close()
 }
 console.log('PASS: six work cards, original SVGs, home/services/software/about/contact links and FI/EN/SV responsive views')
}finally{await browser.close()}
