import assert from 'node:assert/strict'
import { chromium } from 'playwright'

const origin=process.env.SITE_URL||'http://127.0.0.1:3000'
const browser=await chromium.launch({headless:true,args:['--no-sandbox']})
try{
  const page=await browser.newPage({viewport:{width:1440,height:900}})
  for(const route of ['/services','/en/services','/sv/services']){
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
    const contact=route.startsWith('/en')?'/en/contact?service=document-support':route.startsWith('/sv')?'/sv/contact?service=document-support':'/contact?service=document-support'
    assert.ok((await panel.locator('a[href*="contact?service="]').getAttribute('href'))?.endsWith(contact))
  }
  for (const locale of [{route:'/services',contact:'/contact',prefix:'fi'},{route:'/en/services',contact:'/en/contact',prefix:'en'},{route:'/sv/services',contact:'/sv/contact',prefix:'sv'}]) {
    const mobile=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true})
    await mobile.goto(origin+locale.route+'?service=3',{waitUntil:'domcontentloaded'})
    const picker=mobile.locator('#kc-service-native')
    await picker.waitFor({state:'visible'})
    // Next.js sends the pre-hydration default selection in SSR HTML;
    // the URL-driven effect restores the legacy deep link after hydration.
    await mobile.waitForFunction(()=>document.querySelector('#kc-service-native')?.value==='software-integrations')
    assert.equal(await picker.inputValue(),'software-integrations',locale.prefix+' legacy integer entry')
    assert.equal(await mobile.locator('.kc-explorer-tabs').isVisible(),false,locale.prefix+' hide cramped mobile tabs')
    await picker.selectOption('document-support')
    assert.equal(await picker.inputValue(),'document-support',locale.prefix+' mobile selection')
    assert.match(mobile.url(),/service=document-support/,locale.prefix+' stable deep link')
    assert.equal(await mobile.locator('#service-detail h3').textContent(),await picker.locator('option:checked').textContent(),locale.prefix+' selected service panel parity')
    assert.ok((await mobile.locator('#service-detail a[href*="?service="]').getAttribute('href'))?.startsWith(locale.contact+'?service=document-support'))
    await mobile.goBack({waitUntil:'domcontentloaded'})
    await mobile.waitForFunction(()=>document.querySelector('#kc-service-native')?.value==='software-integrations')
    assert.equal(await picker.inputValue(),'software-integrations',locale.prefix+' popstate restores visible selection')
    await mobile.close()
  }
  console.log('Accessible FI/EN/SV keyboard tabs, native mobile selector, stable deep links and history PASS')
}finally{await browser.close()}
