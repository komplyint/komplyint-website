import assert from 'node:assert/strict'
import {mkdir} from 'node:fs/promises'
import {chromium} from 'playwright'

// F09/F10/F12/Q11: measure applied browser color, not just CSS string existence.
// A staged build of this exact main revision is required before screenshots
// are evidence. Never confuse the screenshot with a deployed public release.
const origin=process.env.SITE_URL||'http://127.0.0.1:3000'
await mkdir('site-preview',{recursive:true})
const browser=await chromium.launch({headless:true,args:['--no-sandbox']})
const rgb = s => {
  const match=s.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
  assert.ok(match,'Expected RGB color, received: '+s)
  return match.slice(1,4).map(Number)
}
const contrast=(fore,back)=>{
  const lum=color=>{
    const [r,g,b]=rgb(color).map(c=>{
      const x=c/255
      return x<=.04045?x/12.92:Math.pow((x+.055)/1.055,2.4)
    })
    return .2126*r+.7152*g+.0722*b
  }
  const a=lum(fore),b=lum(back)
  return (Math.max(a,b)+.05)/(Math.min(a,b)+.05)
}
async function computed(page,selector){
 return await page.locator(selector).first().evaluate(el=>{
   const s=getComputedStyle(el)
   return {bg:s.backgroundColor,color:s.color,border:s.borderColor,display:s.display}
 })
}
async function audit(locale,theme,width){
 const page=await browser.newPage({viewport:{width,height:900},colorScheme:theme,reducedMotion:'reduce'})
 try{
  const url=locale==='fi'?'/':'/'+locale
  const result=await page.goto(origin+url,{waitUntil:'domcontentloaded'})
  assert.equal(result?.status(),200,locale+' '+theme)
  await page.locator('.kc-root').waitFor()
  await page.locator('html').evaluate((el,mode)=>el.classList.toggle('dark',mode==='dark'),theme)
  const htmlClass=await page.locator('html').getAttribute('class')
  assert.equal((htmlClass||'').split(' ').includes('dark'),theme==='dark','theme classes must reflect requested appearance')
  const header=await computed(page,'.kc-header')
  const hero=await computed(page,'.kc-hero-copy')
  const process=await computed(page,'.kc-process')
  const featured=await computed(page,'.qh-featured-work')
  const cta=await computed(page,'.kc-cta')
  const footer=await computed(page,'.kc-footer')
  const card=await computed(page,'.kc-service-tile')
  const body=await computed(page,'.kc-root')
  assert.deepEqual(rgb(header.bg),[16,20,24],'Header must be charcoal, not forest green')
  assert.deepEqual(rgb(process.bg),[26,32,36],'Process must use graphite')
  assert.deepEqual(rgb(featured.bg),[19,26,30],'Feature should have a separate cinematic charcoal area')
  assert.deepEqual(rgb(cta.bg),[16,20,24],'CTA should not be full-bleed green')
  assert.deepEqual(rgb(footer.bg),[11,15,18],'Footer should be almost black')
  assert.deepEqual(rgb(body.bg),theme==='dark'?[16,20,24]:[247,246,242],'Page should retain appropriate neutral appearance')
  assert.deepEqual(rgb(card.bg),theme==='dark'?[29,37,41]:[255,255,255],'Cards must use neutral surfaces')
  assert.ok(contrast(header.color,header.bg)>4.5,'Header must remain readable')
  for(const [selector,bg] of [
   ['.kc-process .kc-step p',process.bg],
   ['.qh-featured-work .kc-lead',featured.bg],
   ['.qh-featured-work .kc-text-link','rgb(181, 45, 67)'],
   ['.kc-footer-links',footer.bg],
  ]){
    const color=(await computed(page,selector)).color
    assert.ok(contrast(color,bg)>=4.5,selector+' text contrast too low ('+contrast(color,bg).toFixed(2)+')')
  }
  const formRoute=locale==='fi'?'/contact':'/'+locale+'/contact'
  const pageRole=page.locator('.kc-root h1').first()
  assert.equal(await pageRole.count(),1)
  if(width>=768){
    assert.ok(hero.bg.startsWith('rgba(15, 20, 23, 0.95)'),'Desktop hero reading panel should be translucent charcoal, got '+hero.bg)
  }else{
    assert.deepEqual(rgb(hero.bg),[21,27,31],'Mobile hero uses opaque charcoal for readability')
  }
  assert.equal(await page.locator('.ki-locale-switcher [data-locale="sv"]').first().count(),1,'Swedish language selector preserved')
  const widthCheck=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,viewport:innerWidth}))
  assert.ok(widthCheck.scroll<=widthCheck.viewport+2,'Horizontal overflow on '+locale+' '+theme+' '+width+': '+JSON.stringify(widthCheck))
  await page.screenshot({path:'site-preview/charcoal-'+locale+'-'+theme+'-'+width+'.png',fullPage:true,animations:'disabled'})
  await page.goto(origin+formRoute,{waitUntil:'domcontentloaded'})
  const input=await computed(page,'.kc-form input[type="email"]')
  assert.ok(contrast(input.color,input.bg)>=4.5,'Contact form contrast must work in '+locale+' '+theme)
  return {locale,theme,width,header:header.bg,featured:featured.bg,card:card.bg,body:body.bg}
 }finally{await page.close()}
}
try{
 const observations=[]
 for(const locale of ['fi','en','sv']){
  observations.push(await audit(locale,'light',1440))
  observations.push(await audit(locale,'dark',390))
 }
 console.log('Charcoal Precision real-browser theme and contrast PASS '+JSON.stringify(observations))
}finally{await browser.close()}
