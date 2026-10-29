import assert from 'node:assert/strict'
import {chromium} from 'playwright'
import {mkdir} from 'node:fs/promises'

const origin=process.env.SITE_URL||'http://127.0.0.1:3000'
const fixtures=[
 {locale:'fi',route:'/',software:'/software',pdf:'Komplyint_Palveluesite_FI.pdf',language:'Ohjelmistokehityksen tekninen työskentelykieli on englanti',question:'Vanhaa sovellusta on vaikea kehittää'},
 {locale:'en',route:'/en',software:'/en/software',pdf:'Komplyint_Service_Portfolio_EN.pdf',language:'Technical working language for software engineering: English',question:'Existing applications are hard to maintain'},
 {locale:'sv',route:'/sv',software:'/sv/software',pdf:'Komplyint_Tjanstebroschyr_SV.pdf',language:'Arbetsspråk för programutveckling är engelska',question:'Äldre applikationer är svåra att vidareutveckla'}
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
   assert.equal(await page.locator('.kc-hero-engineering').count(),0,'floating years badge must be gone')
   assert.equal(await e.locator('.kc-solutions-case').count(),4)
   assert.ok((await e.innerText()).includes(fixture.question))
   assert.ok((await e.innerText()).includes(fixture.language))
   assert.equal(await e.locator('.kc-solutions-steps li').count(),3)
   assert.equal(await e.locator('.kc-expertise-tech span').count(),0,'site should not be a skill tag wall')
   assert.ok(!(await e.innerText()).includes('Yli 5 vuotta'))
   const pdf=e.locator('a[download$=".pdf"]')
   assert.ok((await pdf.getAttribute('href'))?.endsWith(fixture.pdf))
   const zip=e.locator('a[download$=".zip"]')
   assert.equal(await zip.getAttribute('href'),'/downloads/Komplyint_Service_Documents.zip')
   const pdfResponse=await page.request.get(origin+'/downloads/'+fixture.pdf)
   assert.equal(pdfResponse.status(),200,'PDF must load')
   assert.ok((pdfResponse.headers()['content-disposition']||'').includes('attachment'),'PDF should download')
   const pdfBytes=await pdfResponse.body()
   assert.equal(pdfBytes.subarray(0,5).toString('ascii'),'%PDF-')
   const zipResponse=await page.request.get(origin+'/downloads/Komplyint_Service_Documents.zip')
   assert.equal(zipResponse.status(),200,'ZIP must load')
   assert.ok((zipResponse.headers()['content-disposition']||'').includes('attachment'),'ZIP must download')
   assert.equal((await zipResponse.body()).subarray(0,2).toString('ascii'),'PK')
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth)
   assert.ok(overflow<=4,fixture.locale+'/'+width+' overflow '+overflow)
   if(width===1440)await page.screenshot({path:'site-preview/customer-solutions-'+fixture.locale+'-desktop.png',fullPage:true,animations:'disabled'})
   if(width===390)await page.screenshot({path:'site-preview/customer-solutions-'+fixture.locale+'-mobile.png',fullPage:true,animations:'disabled'})
   await page.goto(origin+fixture.software,{waitUntil:'domcontentloaded'})
   assert.equal(await page.locator('#software-expertise .kc-solutions-case').count(),4)
   await context.close()
  }
 }
 console.log('PASS: no years badge; 4 buyer problems, agile process, FI/EN/SV language scopes, 6 real PDF/ZIP URLs and responsive views')
}finally{await browser.close()}
