'use client'

import { useEffect, useRef, useState } from 'react'
import type React from 'react'
import { content, services, serviceSlugs, type Lang } from '@/lib/commercial'
import SectionIntro from '@/components/SectionIntro'
import Arrow from '@/components/Arrow'
import { pathFor } from '@/lib/site-route'

export default function ServiceExplorer({lang, showIntro=true}:{lang:Lang;showIntro?:boolean}) {
  const [selected, setSelected] = useState(0)
  const tabButtons = useRef<(HTMLButtonElement | null)[]>([])
  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get('service')
    const idx = value === null ? 0 : Number(value)
    if (Number.isInteger(idx) && idx >= 0 && idx < 6) setSelected(idx)
  }, [])
  function onTabKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    const keys=['ArrowDown','ArrowRight','ArrowUp','ArrowLeft','Home','End']
    if(!keys.includes(event.key))return
    event.preventDefault()
    const next=event.key==='Home'?0:event.key==='End'?5:
      (selected+(event.key==='ArrowDown'||event.key==='ArrowRight'?1:5))%6
    setSelected(next)
    tabButtons.current[next]?.focus()
  }
  const t = content[lang].area
  const s = services[lang][selected]
  return <>
    {showIntro && <SectionIntro {...t} />}
    <div className="kc-explorer">
      <div className="kc-explorer-tabs" role="tablist" aria-label={t.title}>
        {services[lang].map((item, i)=><button key={item.title} role="tab" type="button" aria-selected={selected === i} aria-controls="service-detail" aria-labelledby={undefined} id={"service-tab-"+i} tabIndex={selected===i?0:-1} ref={el=>{tabButtons.current[i]=el}} onKeyDown={onTabKeyDown} className={selected === i ? 'kc-explorer-tab active' : 'kc-explorer-tab'} onClick={()=>setSelected(i)}><span>{String(i+1).padStart(2,'0')}</span><strong>{item.title}</strong><b aria-hidden="true">↗</b></button>)}
      </div>
      <div className="kc-detail" role="tabpanel" id="service-detail" aria-labelledby={"service-tab-"+selected} tabIndex={0}><span className="kc-detail-index">{String(selected+1).padStart(2,'0')} / 06</span><h3>{s.title}</h3><p className="kc-detail-lead">{s.intro}</p>
        <div className="kc-detail-grid"><div><h4>{t.examples}</h4><ul>{s.examples.map(ex=><li key={ex}>{ex}</li>)}</ul></div><div className="kc-detail-side"><div><h4>{t.delivered}</h4><p>{s.deliverable}</p></div><div><h4>{t.boundaries}</h4><p>{s.boundaries}</p></div></div></div>
        <div className="kc-detail-bottom"><div><small>{t.tools}</small><p>{s.tools}</p></div><div className="qh-detail-actions"><a className="kc-text-link" href={pathFor(lang,'services')+'/'+serviceSlugs[selected]}>{lang==='fi'?'Lue lisää palvelusta':'View service detail'}<Arrow /></a><a className="kc-text-link" href={pathFor(lang,'contact')+'?service='+serviceSlugs[selected]}>{t.help}<Arrow /></a></div></div>
      </div>
    </div>
  </>
}
