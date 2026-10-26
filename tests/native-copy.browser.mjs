import assert from 'node:assert/strict'
import {mkdir} from 'node:fs/promises'
import {chromium} from 'playwright'

const base=process.env.SITE_URL||'http://127.0.0.1:3000'
const cases=[
 {locale:'fi',prefix:'',hero:'Kun työkalut toimivat, työ sujuu.',cta:'OTA YHTEYTTÄ',privacy:'Lue tietosuojaseloste',city:'Helsinki, Suomi',example:'Kuvitellussa esimerkissä'},
 {locale:'en',prefix:'/en',hero:'Digital tools that make everyday work easier.',cta:'GET IN TOUCH',privacy:'Read our privacy notice',city:'Helsinki, Finland',example:'In this fictional example'},
 {locale:'sv',prefix:'/sv',hero:'Digitala verktyg som förenklar arbetsdagen.',cta:'KONTAKTA OSS',privacy:'Läs vår dataskyddsbeskrivning',city:'Helsingfors, Finland',example:'I det här fiktiva exemplet'}
]
const browser=await chromium.launch({headless:true,args:['--no-sandbox']})
await mkdir('site-preview',{recursive:true})
try{
 for(const f of cases){
  const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'})
  const home=await page.goto(base+(f.prefix||'/'),{waitUntil:'domcontentloaded'})
  assert.equal(home?.status(),200)
  assert.equal((await page.locator('main h1').textContent())?.trim(),f.hero)
  assert.equal((await page.locator('.kc-cta .kc-eyebrow').textContent())?.trim(),f.cta)
  assert.ok((await page.locator('.qh-featured-work .kc-lead').textContent()||'').includes(f.example))
  const footer=await page.locator('.kc-footer-brand p').textContent()||''
  assert.ok(footer.length>20&&footer.length<180,f.locale+' concise footer')
  assert.equal(await page.locator('.kc-service-grid .kc-service-tile').count(),6)
  assert.equal(await page.locator('html').getAttribute('lang'),f.locale)
  await page.locator('.kc-cta').screenshot({path:'site-preview/editorial-cta-'+f.locale+'.png',animations:'disabled'})
  await page.goto(base+f.prefix+'/contact',{waitUntil:'domcontentloaded'})
  assert.ok((await page.locator('.kc-form-privacy').textContent()||'').includes(f.privacy))
  assert.equal(await page.locator('.kc-form-privacy a').getAttribute('href'),f.prefix+'/privacy')
  await page.goto(base+f.prefix+'/about',{waitUntil:'domcontentloaded'})
  assert.ok((await page.locator('.qh-company-facts').textContent()||'').includes(f.city))
  await page.close()
 }
 console.log('Independent FI, EN and Finland-Swedish content, contact and location browser checks PASS')
}finally{await browser.close()}
