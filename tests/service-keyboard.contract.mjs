import assert from 'node:assert/strict'
import { chromium } from 'playwright'

const origin=process.env.SITE_URL||'http://127.0.0.1:3000'
const browser=await chromium.launch({headless:true,args:['--no-sandbox']})
try{
  const page=await browser.newPage({viewport:{width:1440,height:900}})
  for(const route of ['/services','/en/services']){
    const response=await page.goto(origin+route,{waitUntil:'domcontentloaded'})
    assert.equal(response?.status(),200)
    const tabs=page.locator('.kc-explorer-tabs [role="tab"]')
    assert.equal(await tabs.count(),6,route+' has six real services')
    assert.equal(await tabs.nth(0).getAttribute('aria-selected'),'true')
    assert.equal(await tabs.nth(0).getAttribute('tabindex'),'0')
    await tabs.nth(0).focus()
    await page.keyboard.press('ArrowDown')
    assert.equal(await tabs.nth(1).getAttribute('aria-selected'),'true',route+' ArrowDown selects next service')
    assert.equal(await tabs.nth(1).evaluate(el=>el===document.activeElement),true,route+' focus follows selection')
    assert.equal(await tabs.nth(0).getAttribute('tabindex'),'-1',route+' inactive tabs leave the Tab order')
    const panel=page.locator('[role="tabpanel"]')
    assert.equal(await panel.getAttribute('aria-labelledby'),'service-tab-1')
    await page.keyboard.press('End')
    assert.equal(await tabs.nth(5).getAttribute('aria-selected'),'true')
    await page.keyboard.press('ArrowRight')
    assert.equal(await tabs.nth(0).getAttribute('aria-selected'),'true',route+' arrows wrap')
    await page.keyboard.press('End')
    const contact=route.startsWith('/en')?'/en/contact?service=document-support':'/contact?service=document-support'
    assert.ok((await panel.locator('a[href*="contact?service="]').getAttribute('href'))?.endsWith(contact))
  }
  console.log('Accessible FI/EN service keyboard interaction PASS')
}finally{await browser.close()}
