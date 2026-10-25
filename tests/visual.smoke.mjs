import assert from 'node:assert/strict'
import { mkdir } from 'node:fs/promises'
import { chromium } from 'playwright'

const base = process.env.SITE_URL || 'http://127.0.0.1:3000'
const out = 'site-preview'
await mkdir(out,{recursive:true})
const browser = await chromium.launch({headless:true,args:['--no-sandbox']})
const desktop = await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1,reducedMotion:'no-preference'})

await desktop.goto(base+'/',{waitUntil:'domcontentloaded'})
await desktop.locator('.kc-service-tile').first().waitFor()
assert.match((await desktop.locator('h1').first().textContent())||'',/Selkeyttä/)
assert.equal(await desktop.locator('.kc-logo').count(),1)
assert.equal(await desktop.locator('.kc-footer-brand img').count(),1)
assert.equal(await desktop.locator('.kc-hero-video').count(),1)
assert.equal(await desktop.locator('.kc-service-tile').count(),6)
assert.equal(await desktop.locator('.kc-hero-video').evaluate(el=>getComputedStyle(el).display),'block')
await desktop.goto(base+'/services',{waitUntil:'domcontentloaded'})
await desktop.locator('.kc-explorer-tab').nth(1).click()
assert.match((await desktop.locator('#service-detail h3').textContent())||'',/Microsoft 365/)
await desktop.goto(base+'/',{waitUntil:'domcontentloaded'})
await desktop.screenshot({path:out+'/desktop-fi.png',fullPage:true,animations:'disabled'})

const mobile = await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true,reducedMotion:'no-preference'})
await mobile.goto(base+'/',{waitUntil:'domcontentloaded'})
await mobile.locator('.kc-hero-video').waitFor()
assert.equal(await mobile.locator('.qh-video-controls button').count(),1)
assert.equal(await mobile.locator('.kc-hero-video').evaluate(el=>getComputedStyle(el).display),'block')
await mobile.locator('.kc-mobile-toggle').click()
assert.equal(await mobile.locator('nav.kc-nav').isVisible(),true)
assert.equal(await mobile.locator('nav.kc-nav').getAttribute('role'),'dialog')
const sheetBounds=await mobile.locator('nav.kc-nav').boundingBox()
assert.ok(sheetBounds&&sheetBounds.x<=1&&sheetBounds.width>=389,'Mobile navigation sheet must cover the full 390px viewport without leaking background controls')
assert.equal(await mobile.locator('.kc-actions').evaluate(el=>getComputedStyle(el).visibility),'hidden','Underlying header utilities must not bleed through the modal')
assert.equal(await mobile.locator('#main-content').getAttribute('inert'),'')
assert.equal(await mobile.evaluate(()=>document.activeElement?.classList.contains('qh-menu-close')),true)
await mobile.screenshot({path:out+'/mobile-menu-fi.png',fullPage:false,animations:'disabled'})
await mobile.keyboard.press('Shift+Tab')
assert.equal(await mobile.evaluate(()=>document.activeElement?.tagName),'SELECT')
await mobile.keyboard.press('Tab')
assert.equal(await mobile.evaluate(()=>document.activeElement?.classList.contains('qh-menu-close')),true)
await mobile.keyboard.press('Escape')
assert.equal(await mobile.locator('nav.kc-nav').isVisible(),false)
assert.equal(await mobile.locator('#main-content').getAttribute('inert'),null)
assert.equal(await mobile.evaluate(()=>document.activeElement?.classList.contains('kc-mobile-toggle')),true)
await mobile.screenshot({path:out+'/mobile-fi.png',fullPage:true,animations:'disabled'})

await desktop.goto(base+'/en',{waitUntil:'domcontentloaded'})
assert.match((await desktop.locator('h1').first().textContent())||'',/Clarity/)
await desktop.screenshot({path:out+'/desktop-en.png',fullPage:true,animations:'disabled'})

await desktop.goto(base+'/en/services?service=1#service-explorer',{waitUntil:'domcontentloaded'})
await desktop.locator('#service-detail h3').filter({hasText:'Microsoft 365'}).waitFor()
await desktop.screenshot({path:out+'/services-en.png',fullPage:true,animations:'disabled'})

await desktop.goto(base+'/en/services/m365-automation',{waitUntil:'domcontentloaded'})
assert.match((await desktop.locator('h1').first().textContent())||'',/Microsoft 365/)
await desktop.goto(base+'/contact',{waitUntil:'domcontentloaded'})
assert.equal(await desktop.locator('form.kc-form input[type=email]').count(),1)
assert.equal(await desktop.locator('form.kc-form button[type=submit]').count(),1)
await desktop.locator('form.kc-form input[type=email]').fill('draft@example.org')
desktop.once('dialog',async dialog=>{assert.match(dialog.message(),/Lomakkeen/);await dialog.dismiss()})
await desktop.locator('.kc-language').click()
assert.equal(new URL(desktop.url()).pathname,'/contact','Cancelling language switch preserves the contact draft')
const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}})
const nojsPage=await nojs.newPage()
await nojsPage.goto(base+'/',{waitUntil:'domcontentloaded'})
assert.ok(await nojsPage.locator('.qh-nojs-nav a').count()>=4,'Public navigation must be available without JavaScript')
await nojs.close()
const release=await desktop.request.get(base+'/api/release')
assert.equal(release.status(),200,'The deployed site must expose its release contract')
const releaseInfo=await release.json()
assert.equal(releaseInfo.contract,'komplyint-handbook-2026-10-25')
assert.equal(releaseInfo.site,'Komplyint Oy')
const badContact=await desktop.request.post(base+'/api/contact',{
  data:{name:'Automated Test',email:'invalid-email',message:'invalid'},
  headers:{'Content-Type':'application/json'}
})
assert.equal(badContact.status(),422,'The public enquiry endpoint must reject malformed or too-short messages')
const files=[
  ['/downloads/Komplyint_Palveluesite_FI.pdf','%PDF'],
  ['/downloads/Komplyint_Service_Portfolio_EN.pdf','%PDF'],
  ['/downloads/Komplyint_Service_Documents.zip','PK']
]
for(const [path,signature] of files){
  const response=await desktop.request.get(base+path)
  assert.equal(response.status(),200,'download unavailable: '+path)
  const data=await response.body()
  assert.ok(data.length>1000,'download empty: '+path)
  assert.equal(data.subarray(0,signature.length).toString(),signature,'invalid archive/document: '+path)
}
assert.equal(await desktop.locator('a[href^="/downloads/"]').count(),1,'Footer should offer a ZIP download')
await browser.close()
console.log('Visual smoke tests passed (FI/EN, desktop/mobile, service tabs, original media element, contact UI).')
