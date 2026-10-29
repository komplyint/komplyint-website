import assert from 'node:assert/strict'
import {chromium} from 'playwright'
import {mkdir} from 'node:fs/promises'

const origin=process.env.SITE_URL||'http://127.0.0.1:3000'
const fixtures=[
 {locale:'fi',route:'/',software:'/software',pdf:'Komplyint_Palveluesite_FI.pdf',language:'Tekninen työskentelykieli: englanti'},
 {locale:'en',route:'/en',software:'/en/software',pdf:'Komplyint_Service_Portfolio_EN.pdf',language:'Technical working language: English'},
 {locale:'sv',route:'/sv',software:'/sv/software',pdf:'Komplyint_Tjanstebroschyr_SV.pdf',language:'Arbetsspråket för den tekniska utvecklingen är engelska'}
]
const browser=await chromium.launch({headless:true,args:['--no-sandbox']})
await mkdir('site-preview',{recursive:true})
try{
 for(const fixture of fixtures){
  for(const width of [390,1440]){
   const context=await browser.newContext({viewport:{width,height:900},acceptDownloads:true,reducedMotion:'reduce'})
   const page=await context.newPage()
   const response=await page.goto(origin+fixture.route,{waitUntil:'domcontentloaded'})
   assert.equal(response?.status(),200)
   const e=page.locator('#software-expertise')
   await e.waitFor({state:'visible'})
   assert.equal(await page.locator('html').getAttribute('lang'),fixture.locale)
   for(const skill of ['TypeScript','Node.js','React','Angular','Vue.js','C# / .NET','Docker']){
    assert.ok((await e.innerText()).includes(skill),'Missing visible skill '+fixture.locale+'/'+skill)
   }
   assert.ok((await e.innerText()).includes(fixture.language),'Working language not displayed')
   const pdf=e.locator('a[download$=".pdf"]')
   assert.ok((await pdf.getAttribute('href'))?.endsWith(fixture.pdf))
   const all=e.locator('a[download$=".zip"]')
   assert.equal(await all.getAttribute('href'),'/downloads/Komplyint_Service_Documents.zip')
   const pdfResponse=await page.request.get(origin+'/downloads/'+fixture.pdf)
   assert.equal(pdfResponse.status(),200,'PDF must download in built preview')
   const pdfBytes=await pdfResponse.body()
   assert.equal(pdfBytes.subarray(0,5).toString('ascii'),'%PDF-')
   const zipResponse=await page.request.get(origin+'/downloads/Komplyint_Service_Documents.zip')
   assert.equal(zipResponse.status(),200,'ZIP must download in built preview')
   const zipBytes=await zipResponse.body()
   assert.equal(zipBytes.subarray(0,2).toString('ascii'),'PK')
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth)
   assert.ok(overflow<=4,fixture.locale+'/'+width+' overflow '+overflow)
   if(width===1440)await page.screenshot({path:'site-preview/fullstack-'+fixture.locale+'-desktop.png',fullPage:true,animations:'disabled'})
   if(width===390)await page.screenshot({path:'site-preview/fullstack-'+fixture.locale+'-mobile.png',fullPage:true,animations:'disabled'})
   await page.goto(origin+fixture.software,{waitUntil:'domcontentloaded'})
   assert.equal(await page.locator('#software-expertise').count(),1,'Software route must show expertise')
   await context.close()
  }
 }
 console.log('PASS: prominent full-stack expertise, FI/EN/SV working languages, 6 PDF/ZIP links, real file signatures and responsive layout')
}finally{await browser.close()}
