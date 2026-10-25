import { chromium } from 'playwright'
import AxeBuilder from '@axe-core/playwright'
import { mkdir, writeFile } from 'node:fs/promises'

const base=process.env.SITE_URL||'http://127.0.0.1:3000'
const build=process.env.GITHUB_SHA||'local'
await mkdir('site-preview',{recursive:true})
const report={build,criteria:['Awwwards Design','Awwwards Usability','Awwwards Creativity','Awwwards Content','Webby Content','Webby Navigation','Webby Visual Design','Webby Functionality','Webby Interactivity','Webby Innovation','Webby Overall Experience'],automated:[],humanReviews:{artDirection:'NOT REVIEWED',accessibility:'NOT REVIEWED',owner:'NOT APPROVED'},competitionSubmission:'NOT SUBMITTED'}
const pages=['/','/en','/services','/en/services','/work','/en/work','/about','/en/about','/contact','/en/contact','/privacy','/en/privacy','/accessibility','/en/accessibility','/services/data-reporting','/en/services/m365-automation','/services/websites-maintenance','/en/services/software-integrations','/services/testing-qa','/en/services/document-support']
const browser=await chromium.launch({headless:true,args:['--no-sandbox']})
let blocking=0
for(const theme of ['dark','light']){
  const context=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce'})
  const page=await context.newPage()
  await page.addInitScript(v=>{localStorage.setItem('komplyint-theme',v)},theme)
  for(const route of pages){
    try {
      const response=await page.goto(base+route,{waitUntil:'domcontentloaded',timeout:22000})
      const status=response?.status()
      const h1=await page.locator('h1').count()
      const links=await page.locator('nav.kc-nav a').count()
      const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth)
      const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']).analyze()
      const critical=axe.violations.filter(v=>v.impact==='critical'||v.impact==='serious').map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.length,help:v.help,examples:v.nodes.slice(0,2).map(n=>({target:n.target,html:n.html?.slice(0,380),summary:n.failureSummary?.slice(0,430)}))}))
      const ok=status===200&&h1===1&&links>=4&&overflow<=4&&critical.length===0
      if(!ok)blocking++
      report.automated.push({route,theme,status,h1,navLinks:links,horizontalOverflow:overflow,violations:critical,otherIssues:axe.violations.filter(v=>!critical.some(c=>c.id===v.id)).map(v=>({id:v.id,impact:v.impact})),result:ok?'PASS':'FAIL'})
    }catch(e){blocking++;report.automated.push({route,theme,result:'ERROR',message:String(e).slice(0,300)})}
  }
  if(theme==='dark')await page.screenshot({path:'site-preview/award-desktop-dark.png',fullPage:true,animations:'disabled'})
  await context.close()
}
const mobile=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce'})
await mobile.goto(base+'/',{waitUntil:'domcontentloaded'})
const mobileOverflow=await mobile.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth)
const menu=mobile.locator('.kc-mobile-toggle')
await menu.click()
const navOpen=await mobile.locator('nav.kc-nav').isVisible()
await mobile.screenshot({path:'site-preview/award-mobile-menu.png',animations:'disabled'})
report.mobile={overflow:mobileOverflow,navigationOpened:navOpen,pass:mobileOverflow<=4&&navOpen}
if(!report.mobile.pass)blocking++
await mobile.close()
const film=await browser.newPage({viewport:{width:1280,height:800},reducedMotion:'no-preference'})
await film.goto(base+'/',{waitUntil:'networkidle'})
const video=film.locator('video.kc-hero-video')
const initial=await video.evaluate(el=>({duration:el.duration,readyState:el.readyState,videoWidth:el.videoWidth,videoHeight:el.videoHeight,paused:el.paused,currentTime:el.currentTime,error:el.error?.message||null,networkState:el.networkState}))
await film.waitForTimeout(1500)
const later=await video.evaluate(el=>({currentTime:el.currentTime,paused:el.paused,readyState:el.readyState,error:el.error?.message||null}))
report.video={initial,later,playbackAdvanced:later.currentTime>initial.currentTime+0.25}
if(!report.video.playbackAdvanced)blocking++
await film.close()
await browser.close()
await writeFile('site-preview/award-review-evidence.json',JSON.stringify({...report,failures:blocking},null,2))
console.log(JSON.stringify({result:blocking?'FAIL':'PASS',checks:report.automated.length,blocking,video:report.video,mobile:report.mobile}))
if(blocking)process.exitCode=1
