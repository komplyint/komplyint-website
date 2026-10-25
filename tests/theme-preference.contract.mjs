import assert from 'node:assert/strict'
import { chromium } from 'playwright'

// F10 / C09: system preference applies before paint, while explicit user
// choices override it and retain the requested state after reload.
const base=process.env.SITE_URL||'http://127.0.0.1:3000'
const browser=await chromium.launch({headless:true,args:['--no-sandbox']})
try {
  for(const [system,expectedDark] of [['light',false],['dark',true]]){
    const context=await browser.newContext({colorScheme:system})
    const page=await context.newPage()
    await page.goto(base+'/',{waitUntil:'domcontentloaded'})
    assert.equal(await page.locator('html').evaluate(el=>el.classList.contains('dark')),expectedDark,system+' system appearance before user choice')
    assert.equal(await page.locator('.qh-appearance select').first().inputValue(),'system','System is initial preference')
    await context.close()
  }
  const context=await browser.newContext({colorScheme:'light'})
  const page=await context.newPage()
  await page.goto(base+'/',{waitUntil:'domcontentloaded'})
  const appearance=page.locator('.qh-appearance select').first()
  await appearance.selectOption('dark')
  assert.equal(await page.locator('html').evaluate(el=>el.classList.contains('dark')),true,'Explicit dark wins over light OS')
  await page.reload({waitUntil:'domcontentloaded'})
  assert.equal(await appearance.inputValue(),'dark','Explicit selection persists')
  assert.equal(await page.locator('html').evaluate(el=>el.classList.contains('dark')),true,'Dark stays applied after reload')
  await appearance.selectOption('system')
  assert.equal(await page.locator('html').evaluate(el=>el.classList.contains('dark')),false,'System restores light OS')
  await context.close()
  console.log('System theme, explicit override, persistence and recovery PASS')
}finally{await browser.close()}
