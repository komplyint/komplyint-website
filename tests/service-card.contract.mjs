import assert from 'node:assert/strict'
import { mkdir } from 'node:fs/promises'
import { chromium } from 'playwright'

// C20-T01 through C20-T04: evidence for the actual commercial service cards.
// No customer identities, claims or screenshots of real contacts are used.
const base=process.env.SITE_URL||'http://127.0.0.1:3000'
const browser=await chromium.launch({headless:true,args:['--no-sandbox']})
await mkdir('site-preview',{recursive:true})
const fixtures=[
 {locale:'fi',url:'/',action:'Tutustu palveluun'},
 {locale:'en',url:'/en',action:'View this service'},
 {locale:'sv',url:'/sv',action:'Läs om tjänsten'}
]
const sizes=[
 {name:'mobile',width:320,heading:'22px',padding:'24px',columns:1},
 {name:'tablet',width:960,heading:'24px',padding:'32px',columns:2},
 {name:'desktop',width:1440,heading:'26px',padding:'32px',columns:3}
]
const results=[]
try{
 for(const f of fixtures){
  for(const size of sizes){
   const context=await browser.newContext({viewport:{width:size.width,height:900},reducedMotion:'reduce'})
   const page=await context.newPage()
   const response=await page.goto(base+f.url,{waitUntil:'domcontentloaded',timeout:25000})
   assert.equal(response?.status(),200,f.locale+' '+size.name)
   const cards=page.locator('.kc-service-grid .kc-service-tile')
   assert.equal(await cards.count(),6,'Every service must be independently discoverable')
   const columns=await page.locator('.kc-service-grid').evaluate(el=>getComputedStyle(el).gridTemplateColumns.split(' ').length)
   assert.equal(columns,size.columns,'C20 grid layout '+f.locale+' '+size.name)
   for(let i=0;i<6;i++){
    const card=cards.nth(i)
    assert.equal(await card.evaluate(el=>el.tagName),'A','One semantic service destination')
    assert.equal(await card.locator('a,button,select,input,[role="button"]').count(),0,'No nested interactive controls')
    const href=await card.getAttribute('href')
    assert.ok(href?.startsWith(f.locale==='fi'?'/services/':'/'+f.locale+'/services/'),f.locale+' service URL '+href)
    const label=await card.locator('.kc-service-card-action').innerText()
    assert.equal(label.replace(/↗/g,'').trim(),f.action,'Explicit localized service destination')
    const metric=await card.evaluate(el=>{
      const css=getComputedStyle(el)
      const heading=el.querySelector('h3')
      const action=el.querySelector('.kc-service-card-action')
      const text=el.querySelector('p')
      const rect=el.getBoundingClientRect()
      const headingRect=heading.getBoundingClientRect()
      const actionRect=action.getBoundingClientRect()
      const textRect=text.getBoundingClientRect()
      const selection=window.getSelection()
      const range=document.createRange()
      range.selectNodeContents(heading)
      selection.removeAllRanges();selection.addRange(range)
      const selected=selection.toString()
      selection.removeAllRanges()
      return {
        height:rect.height,padding:css.paddingTop,
        headingSize:getComputedStyle(heading).fontSize,
        bodySize:getComputedStyle(text).fontSize,
        iconGap:getComputedStyle(el.querySelector('.qh-service-icon')).marginBottom,
        actionSize:getComputedStyle(action).fontSize,
        headingFits:headingRect.left>=rect.left-1&&headingRect.right<=rect.right+1,
        textFits:textRect.right<=rect.right+1,
        actionFits:actionRect.bottom<=rect.bottom+1&&actionRect.right<=rect.right+1,
        selected,
        overflow:el.scrollWidth-el.clientWidth,
      }
    })
    assert.ok(metric.height>=300, 'Service card cannot have less than 300px minimum height')
    assert.equal(metric.padding,size.padding,'Card padding must match source specification')
    assert.equal(metric.headingSize,size.heading,'Card heading size must match handbook C20')
    assert.equal(metric.bodySize,'18px')
    assert.equal(metric.iconGap,size.width===320?'24px':'32px','Icon-to-heading gap matches C20 spacing')
    assert.equal(metric.actionSize,'16px')
    assert.ok(metric.headingFits&&metric.textFits&&metric.actionFits,'Card parts must remain within their surface')
    assert.ok(metric.selected.length>3,'Card text should be selectable')
    assert.ok(metric.overflow<=2,'No horizontal clipping in service card')
   }
   await page.locator('.kc-service-grid').screenshot({path:'site-preview/c20-service-cards-'+f.locale+'-'+size.name+'.png',animations:'disabled'})
   if(size.width===320){
     // Simulate a 200% text size in the card without shrinking the font role.
     await page.addStyleTag({content:'.kc-service-tile h3{font-size:44px!important;line-height:1.3!important}.kc-service-tile p{font-size:36px!important;line-height:1.65!important}.kc-service-card-action{font-size:32px!important;line-height:1.5!important}'})
     for(let i=0;i<6;i++){
      const over=await cards.nth(i).evaluate(el=>{
        const rect=el.getBoundingClientRect()
        const heading=el.querySelector('h3').getBoundingClientRect()
        const action=el.querySelector('.kc-service-card-action').getBoundingClientRect()
        const offenders=[...el.querySelectorAll('h3,p,span,svg')].map(node=>{
          const box=node.getBoundingClientRect()
          return {tag:node.tagName,className:node.getAttribute('class')||'',right:Math.round(box.right-rect.right),width:Math.round(box.width),scroll:node.scrollWidth-node.clientWidth}
        }).filter(node=>node.right>1||node.scroll>2).slice(0,8)
        return {clip:el.scrollWidth-el.clientWidth,head:heading.right-rect.right,action:action.right-rect.right,height:rect.height,actionBottom:action.bottom-rect.bottom,offenders}
      })
      assert.ok(over.clip<=2&&over.head<=2&&over.action<=2&&over.actionBottom<=2,'200% text should reflow, not clip: '+f.locale+' card '+i+' '+JSON.stringify(over))
     }
     const docOver=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)
     assert.ok(docOver<=4,'200% text must not cause document-level horizontal scrolling: '+f.locale)
   }
   results.push({locale:f.locale,viewport:size.width,cards:6,columns,typography:size.heading,status:'PASS'})
   await context.close()
  }
 }
 console.log(JSON.stringify({result:'PASS',spec:'C20',matrix:results}))
}finally{await browser.close()}
