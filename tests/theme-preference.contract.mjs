import assert from 'node:assert/strict'
import { chromium } from 'playwright'

// Owner-approved dark-first art direction: default dark, explicit light and
// system choices are still first-class and persist before paint.
const base=process.env.SITE_URL||'http://127.0.0.1:3000'
const browser=await chromium.launch({headless:true,args:['--no-sandbox']})
try {
  for(const scheme of ['light','dark']){
    const context=await browser.newContext({colorScheme:scheme})
    const page=await context.newPage()
    await page.goto(base+'/',{waitUntil:'domcontentloaded'})
    assert.equal(await page.locator('html').evaluate(el=>el.classList.contains('dark')),true,'dark must be the default even with a light OS')
    assert.equal(await page.locator('.qh-appearance select').first().inputValue(),'dark')
    await context.close()
  }
  const context=await browser.newContext({colorScheme:'light'})
  const page=await context.newPage()
  await page.goto(base+'/',{waitUntil:'domcontentloaded'})
  const appearance=page.locator('.qh-appearance select').first()
  await appearance.selectOption('light')
  assert.equal(await page.locator('html').evaluate(el=>el.classList.contains('dark')),false,'explicit light wins')
  assert.equal(await page.evaluate(()=>localStorage.getItem('komplyint-theme')),'light')
  await page.reload({waitUntil:'domcontentloaded'})
  await page.waitForFunction(()=>document.querySelector('.qh-appearance select')?.value==='light',{timeout:5000})
  assert.equal(await page.locator('html').evaluate(el=>el.classList.contains('dark')),false,'light is restored before paint')
  await appearance.selectOption('system')
  assert.equal(await page.locator('html').evaluate(el=>el.classList.contains('dark')),false,'system follows light OS')
  await appearance.selectOption('dark')
  assert.equal(await page.locator('html').evaluate(el=>el.classList.contains('dark')),true,'dark can be explicitly selected')
  assert.equal(await page.evaluate(()=>localStorage.getItem('komplyint-theme')),'dark')
  await context.close()
  console.log('Dark-first default, explicit light, system recovery, and persistence PASS')
}finally{await browser.close()}
