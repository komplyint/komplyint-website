import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'

const base=process.env.SITE_URL||'http://127.0.0.1:3000'
const browser=await chromium.launch({headless:true,args:['--no-sandbox']})
const samples=[]
try{
  for(let i=0;i<2;i++){
    const context=await browser.newContext({viewport:{width:412,height:823},isMobile:true,hasTouch:true,deviceScaleFactor:1,reducedMotion:'no-preference'})
    const page=await context.newPage()
    await page.addInitScript(()=>{
      window.__komplyintShiftLog=[]
      new PerformanceObserver(list=>{
        for(const e of list.getEntries()){
          if(e.hadRecentInput)continue
          window.__komplyintShiftLog.push({
            time:e.startTime,value:e.value,
            sources:(e.sources||[]).map(x=>({
              selector:x.node?.className?.toString().slice(0,140) || x.node?.tagName || '?',
              previousRect:x.previousRect?{x:x.previousRect.x,y:x.previousRect.y,width:x.previousRect.width,height:x.previousRect.height}:null,
              currentRect:x.currentRect?{x:x.currentRect.x,y:x.currentRect.y,width:x.currentRect.width,height:x.currentRect.height}:null,
            }))
          })
        }
      }).observe({type:'layout-shift',buffered:true})
    })
    const session=await context.newCDPSession(page)
    await session.send('Emulation.setCPUThrottlingRate',{rate:4})
    await session.send('Network.emulateNetworkConditions',{
      offline:false,latency:120,downloadThroughput:180000,uploadThroughput:80000,
    })
    await page.goto(base+'/',{waitUntil:'domcontentloaded',timeout:30000})
    await page.waitForTimeout(4600)
    const sample=await page.evaluate(()=>({
      ratio:window.devicePixelRatio,viewport:{width:innerWidth,height:innerHeight},
      shifts:window.__komplyintShiftLog,
      poster:document.querySelector('img.kc-hero-poster')?.currentSrc,
      videoLoaded:!!document.querySelector('video.kc-hero-video source'),
      heroTextRect:document.querySelector('.kc-hero-layout')?.getBoundingClientRect()?.toJSON(),
      filmRect:document.querySelector('.qh-film-layer')?.getBoundingClientRect()?.toJSON(),
      fonts:[...document.fonts].map(x=>({family:x.family,status:x.status,display:x.display})),
    }))
    samples.push(sample)
    await context.close()
  }
}finally{await browser.close()}
await mkdir('site-preview',{recursive:true})
await writeFile('site-preview/layout-shift-diagnostics.json',JSON.stringify(samples,null,2))
console.log(JSON.stringify(samples.map((s,i)=>({
  run:i+1,cls:s.shifts.reduce((n,v)=>n+v.value,0),
  shifts:s.shifts,heroTop:s.heroTextRect?.top,filmTop:s.filmRect?.top,
  videoLoaded:s.videoLoaded,poster:s.poster,fonts:s.fonts,
})),null,2))
