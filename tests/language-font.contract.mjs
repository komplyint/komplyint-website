import assert from 'node:assert/strict'
import { chromium } from 'playwright'

// F07 / T12 / F15-F18: verify first-response HTML semantics and browser-loaded
// font faces. Checking React-hydrated document.lang alone can hide SSR defects.
const origin = process.env.SITE_URL || 'http://127.0.0.1:3000'
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] })
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  for (const [route, expectedLocale] of [
    ['/', 'fi'], ['/en', 'en'], ['/sv', 'sv'],
    ['/services', 'fi'], ['/en/services', 'en'], ['/sv/services', 'sv'],
    ['/contact', 'fi'], ['/en/contact', 'en'], ['/sv/contact', 'sv'],
  ]) {
    const response = await page.goto(origin + route, { waitUntil: 'domcontentloaded' })
    assert.equal(response?.status(), 200, route + ': expected HTTP 200')
    const raw = await response.text()
    assert.match(raw, new RegExp('<html[^>]*\\blang="' + expectedLocale + '"'), route + ': server HTML must declare the proper locale')
    assert.equal(await page.locator('html').getAttribute('lang'), expectedLocale, route + ': runtime locale')
    assert.equal(await page.locator('h1').count(), 1, route + ': a single primary heading is required')
    if (route === '/' || route === '/en' || route === '/sv') {
      const proof = await page.evaluate(async () => {
        await document.fonts.ready
        const title = getComputedStyle(document.querySelector('h1')).fontFamily
        const body = getComputedStyle(document.querySelector('.kc-root')).fontFamily
        const faces = Array.from(document.fonts, f => ({ family: f.family, status: f.status, weight: f.weight }))
        const remoteFontRequests=performance.getEntriesByType('resource').filter(r => /fonts\.(?:googleapis|gstatic)\.com/.test(r.name)).map(r=>r.name)
        return { title, body, faces, remoteFontRequests }
      })
      assert.match(proof.title, /Manrope/, route + ': enterprise heading font')
      assert.match(proof.body, /Lato/, route + ': approved Lato body font')
      assert.ok(proof.faces.some(f => /Manrope/.test(f.family) && f.status === 'loaded'), route + ': enterprise heading face loaded locally')
      assert.ok(proof.faces.some(f => /Lato/.test(f.family) && f.status === 'loaded'), route + ': approved body face loaded locally')
      assert.deepEqual(proof.remoteFontRequests,[],route + ': public page must not require a remote font request')
    }
  }
  console.log('FI/EN/SV initial HTML locales, Manrope display and Lato body font loading PASS')
} finally {
  await browser.close()
}
