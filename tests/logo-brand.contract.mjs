import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { mkdir } from 'node:fs/promises'
import { chromium } from 'playwright'

// F08 original asset integrity + three-language brand placement in real Chromium.
const svg=readFileSync('public/logo.svg','utf8')
assert.match(svg,/viewBox="0 0 1088 783"/)
for(const token of ['#6b7896','#6ea78a','#6fe06b','#16a34a'])assert.ok(svg.includes(token),'original logo gradient and wordmark color '+token)
const browser=await chromium.launch({headless:true,args:['--no-sandbox']})
const base=process.env.SITE_URL||'http://127.0.0.1:3000'
const fixtures=[
  {locale:'fi',url:'/',width:1440,header:120,logoWidth:124,logoHeight:89.2,home:'etusivu'},
  {locale:'en',url:'/en',width:390,header:92,logoWidth:92,logoHeight:66.2,home:'home'},
  {locale:'sv',url:'/sv',width:320,header:92,logoWidth:92,logoHeight:66.2,home:'startsida'}
]
await mkdir('site-preview',{recursive:true})
try {
  for(const fixture of fixtures){
    const page=await browser.newPage({viewport:{width:fixture.width,height:900},reducedMotion:'reduce'})
    const response=await page.goto(base+fixture.url,{waitUntil:'domcontentloaded'})
    assert.equal(response?.status(),200,fixture.locale)
    const measurement=await page.evaluate(()=>{
      const logo=document.querySelector('.kc-logo')
      const header=document.querySelector('.kc-header-row')
      const footer=document.querySelector('.kc-footer-brand img')
      const link=document.querySelector('.kc-logo-link')
      const bounds=logo.getBoundingClientRect()
      return {logoWidth:bounds.width,logoHeight:bounds.height,
        headerHeight:header.getBoundingClientRect().height,
        linkName:link.getAttribute('aria-label'),imgAlt:logo.getAttribute('alt'),
        imgFilter:getComputedStyle(logo).filter,
        footerFilter:getComputedStyle(footer).filter,
        footerWidth:footer.getBoundingClientRect().width,
        footerHeight:footer.getBoundingClientRect().height,
        footerVisible:footer.complete&&footer.naturalWidth>0
      }
    })
    assert.ok(measurement.headerHeight+1>=fixture.header,fixture.locale+' header height')
    assert.ok(Math.abs(measurement.logoWidth-fixture.logoWidth)<1,fixture.locale+' logo width')
    assert.ok(Math.abs(measurement.logoHeight-fixture.logoHeight)<1,fixture.locale+' logo height')
    assert.match(measurement.linkName,new RegExp(fixture.home))
    assert.equal(measurement.imgAlt,'','logo home link must expose exactly one accessible name')
    assert.equal(measurement.imgFilter,'none')
    assert.equal(measurement.footerFilter,'none','Never recolor the owner-protected logo using a CSS filter')
    assert.ok(Math.abs(measurement.footerWidth-172)<1)
    assert.ok(Math.abs(measurement.footerHeight-123.8)<1)
    assert.ok(measurement.footerVisible,'Original logo must decode and render')
    await page.locator('.kc-header').screenshot({path:'site-preview/f08-header-'+fixture.locale+'.png',animations:'disabled'})
    console.log(JSON.stringify({spec:'F08',locale:fixture.locale,result:'PASS',...measurement}))
    await page.close()
  }
}finally{await browser.close()}
