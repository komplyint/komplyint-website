import assert from 'node:assert/strict'
import {mkdir, writeFile} from 'node:fs/promises'
import {chromium} from 'playwright'

// C01/C03, P18, Q10-Q12, F07: actually exercise every published page and
// trilingual route at 320 CSS px (responsive reflow) in light/dark appearance.
// This is NOT an independent 400%-browser-zoom or screen-reader conformance test.
const origin=process.env.SITE_URL||'http://127.0.0.1:3000'
const build=process.env.GITHUB_SHA||'unattested-local'
await mkdir('site-preview',{recursive:true})
const browser=await chromium.launch({headless:true,args:['--no-sandbox']})
const report={build,method:'Playwright Chromium 320px/390px reflow + skip target + server HTML + 200% text spacing checks',specs:['C01','C03','P18','Q10','Q11','F07'],routes:[],focus:[],textSpacing:[],noJavaScript:[],failures:[]}
const expectedLanguages=['fi','en','sv']
const slug=['data-reporting','m365-automation','websites-maintenance','software-integrations','testing-qa','document-support']
const roots=['','/services','/software','/work','/about','/contact','/privacy','/accessibility',...slug.map(x=>'/services/'+x)]
const paths=expectedLanguages.flatMap(locale=>roots.map(root=>(locale==='fi'?'':'/'+locale)+root||'/'))
const pathLocale=path=>path==='/en'||path.startsWith('/en/')?'en':path==='/sv'||path.startsWith('/sv/')?'sv':'fi'
function check(fact,reason){
 if(!fact)report.failures.push(reason)
}
async function pageGeometry(page){
 return page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,viewport:innerWidth,bodyWidth:document.body.scrollWidth,headings:document.querySelectorAll('main h1').length,mainPresent:!!document.getElementById('main-content')}))
}
try{
 const sitemap=await (await browser.newPage()).request.get(origin+'/sitemap.xml')
 assert.equal(sitemap.status(),200,'Local sitemap must be published')
 const xml=await sitemap.text()
 const sitemapPaths=[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(x=>new URL(x[1].replace(/&amp;/g,'&')).pathname)
 assert.equal(sitemapPaths.length,42,'Expected the 14 page families in each of FI/EN/SV')
 assert.equal(new Set(sitemapPaths).size,42,'Sitemap must not duplicate routes')
 for(const path of paths)assert.ok(sitemapPaths.includes(path),'Sitemap omitted '+path)
 for(const theme of ['light','dark']){
  const context=await browser.newContext({viewport:{width:320,height:568},colorScheme:theme,reducedMotion:'reduce'})
  await context.addInitScript(choice=>localStorage.setItem('komplyint-theme',choice),theme)
  const page=await context.newPage()
  for(const path of paths){
   let evidence={route:path,locale:pathLocale(path),theme,viewport:320,status:null,overflow:null,hasOneH1:false,canonical:false,alternates:false}
   try{
    const response=await page.goto(origin+path,{waitUntil:'domcontentloaded',timeout:25000})
    evidence.status=response?.status()??null
    const geo=await pageGeometry(page)
    evidence.overflow=geo.scrollWidth-geo.viewport
    evidence.hasOneH1=geo.headings===1
    const lang=await page.locator('html').getAttribute('lang')
    const canonical=await page.locator('link[rel="canonical"]').getAttribute('href')
    evidence.canonical=canonical===('https://www.komplyint.fi'+path)
    evidence.alternates=(await page.locator('link[rel="alternate"][hreflang]').count())>=4
    check(evidence.status===200,'HTTP route '+path+' '+theme+' returned '+evidence.status)
    check(lang===evidence.locale,'SSR lang mismatch '+path+' '+theme+': '+lang)
    check(evidence.hasOneH1,'Expected one main h1 at '+path+' '+theme)
    check(evidence.overflow<=4,'Horizontal overflow at 320px '+path+' '+theme+': '+evidence.overflow+'px')
    check(evidence.canonical,'Wrong canonical URL '+path+' '+theme+': '+canonical)
    check(evidence.alternates,'Reciprocal FI/EN/SV/hreflang missing on '+path)
   }catch(e){report.failures.push('Navigation '+path+' '+theme+': '+String(e).slice(0,240))}
   report.routes.push(evidence)
  }
  await context.close()
 }
 // Focus test covers all three entry locales, both no-JS and hydrated behavior.
 for(const locale of expectedLanguages){
  const path=locale==='fi'?'/':'/'+locale
  const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'})
  const page=await context.newPage()
  await page.goto(origin+path,{waitUntil:'domcontentloaded'})
  await page.keyboard.press('Tab')
  const first=await page.evaluate(()=>({selector:document.activeElement?.className||'',href:document.activeElement?.getAttribute('href'),height:document.activeElement?.getBoundingClientRect().height}))
  check(String(first.selector).includes('kc-skip')&&first.href==='#main-content','First Tab must expose skip-to-content: '+locale+': '+JSON.stringify(first))
  await page.keyboard.press('Enter')
  const target=await page.evaluate(()=>({focus:document.activeElement?.id,hash:location.hash,top:document.getElementById('main-content')?.getBoundingClientRect().top}))
  check(target.focus==='main-content'&&target.hash==='#main-content','Skip link must focus main region: '+locale+': '+JSON.stringify(target))
  report.focus.push({locale,first,target})
  await page.screenshot({path:'site-preview/reflow-skip-'+locale+'.png',animations:'disabled'})
  await context.close()
 }
 // No-JavaScript browsing must preserve useful public copy, contact fallback and native links.
 for(const locale of expectedLanguages){
  for(const section of ['/','/services','/contact']){
   const path=(locale==='fi'?'':'/'+locale)+(section==='/'?'':section)||'/'
   const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:568}})
   const page=await context.newPage()
   const response=await page.goto(origin+path,{waitUntil:'domcontentloaded'})
   const links=await page.locator('.qh-nojs-nav a').count()
   const heading=await page.locator('main h1').count()
   const text=await page.locator('main').innerText()
   check(response?.status()===200&&links>=8&&heading===1&&text.trim().length>100,'No-JS content/navigation fails at '+path)
   report.noJavaScript.push({path,status:response?.status(),links,heading,contentLength:text.trim().length})
   await context.close()
  }
 }
 // WCAG 1.4.12 browser check: user-defined text spacing on representative templates.
 // Not a claim of equivalent browser 200/400% zoom or independent AT approval.
 for(const locale of expectedLanguages){
  for(const section of ['/','/services','/contact']){
   const path=(locale==='fi'?'':'/'+locale)+(section==='/'?'':section)||'/'
   const context=await browser.newContext({viewport:{width:320,height:568},reducedMotion:'reduce'})
   const page=await context.newPage()
   await page.goto(origin+path,{waitUntil:'domcontentloaded'})
   await page.addStyleTag({content:'.kc-root p,.kc-root li,.kc-root label,.kc-root a,.kc-root button{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important}.kc-root p{margin-bottom:2em!important}'})
   const geo=await pageGeometry(page)
   const overflow=geo.scrollWidth-geo.viewport
   check(overflow<=4,'Text-spacing reflow overflow at '+path+': '+overflow+'px')
   report.textSpacing.push({path,viewport:320,overflow})
   await context.close()
  }
 }
}finally{await browser.close();await writeFile('site-preview/handbook-route-reflow-evidence.json',JSON.stringify({...report,summary:{totalRoutes:paths.length,checked:report.routes.length,failures:report.failures.length}},null,2))}
console.log(JSON.stringify({result:report.failures.length?'FAIL':'PASS',routes:report.routes.length,focus:report.focus.length,noJavaScript:report.noJavaScript.length,textSpacing:report.textSpacing.length,failures:report.failures.slice(0,25)}))
if(report.failures.length)process.exitCode=1
