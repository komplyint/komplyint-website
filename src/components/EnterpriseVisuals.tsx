'use client'

import {useState} from 'react'
import type {Lang} from '@/lib/commercial'

type Outcome = 'idle' | 'passed' | 'recovered'

const copy = {
  fi: {
    frame:'KOMPLYINT / TOIMITUSLABORATORIO', demo:'HAVAINNOLLISTAVA DEMO', online:'Paikallinen simulaatio',
    title:'Integraation laadunvarmistus', subtitle:'Esimerkkipyyntö · Synteettiset tiedot', request:'Saapuva pyyntö',
    validate:'Tarkistus', result:'Kuittaus', ready:'Valmis tarkistettavaksi', validated:'Tarkistettu',
    test:'Suorita tarkistus', retry:'Testaa virhetilanne', idle:'Tarkistus voidaan aloittaa',
    passed:'Kolme paikallista tarkistusta onnistui.', recovered:'Simuloitu aikakatkaisu käsiteltiin ja uusi yritys onnistui.',
    status:'Tarkistuksen tulos', tests:'3 / 3 tarkistusta', source:'Lähde', sourceValue:'Esimerkkitiedot',
    code:'Pyyntö', codeStatus:'Vastaus', stage:'ESIMERKKI · EI ASIAKASTYÖ',
    chartTitle:'Raportoinnin tilannekuva', chartSubtitle:'Päivittyvä, selkeä näkymä tietoihin',
    chartNote:'Havainnollistava raportti synteettisellä aineistolla. Luvut eivät kuvaa asiakastuloksia.',
    period:'Jakso', total:'Yhteensä', average:'Keskiarvo', unit:'tapahtumaa', plot:'Tapahtumat kuukausittain',
    h1:'Tammi–kesäkuu', h2:'Heinä–joulukuu', chartEyebrow:'RAPORTOINNIN DEMO',
    dataSource:'Lähde: esimerkkiaineisto', quality:'Tarkistussäännöt', evidence:'Esimerkkikuva · ei asiakasreferenssi',
    qualityTitle:'Koodimuutos, testaus ja luovutus', qualityIntro:'Näin rajattu ohjelmistomuutos voidaan tarkistaa.',
    before:'ENNEN', after:'MUUTOKSEN JÄLKEEN', error:'Yhteys katkesi', success:'Virhe käsitelty',
    check1:'Virhe tunnistetaan', check2:'Uusi yritys käsitellään', check3:'Tulos tarkistetaan'
  },
  en: {
    frame:'KOMPLYINT / DELIVERY LAB', demo:'INTERACTIVE DEMONSTRATION', online:'Local simulation',
    title:'Integration quality check', subtitle:'Example request · Synthetic data', request:'Incoming request',
    validate:'Validation', result:'Acknowledgement', ready:'Ready for review', validated:'Validated',
    test:'Run validation', retry:'Test retry path', idle:'Ready to run a check',
    passed:'Three local checks completed successfully.', recovered:'A simulated timeout was handled and the retry succeeded.',
    status:'Check result', tests:'3 / 3 checks', source:'Source', sourceValue:'Sample data',
    code:'Request', codeStatus:'Response', stage:'DEMONSTRATION · NOT CLIENT WORK',
    chartTitle:'Reporting overview', chartSubtitle:'A clear, updateable view of your data',
    chartNote:'Illustrative dashboard using synthetic data. Figures are not client results.',
    period:'Period', total:'Total', average:'Average', unit:'events', plot:'Events by month',
    h1:'January–June', h2:'July–December', chartEyebrow:'REPORTING DEMO',
    dataSource:'Source: example dataset', quality:'Validation rules', evidence:'Illustration · not a client case',
    qualityTitle:'A change, a test and a handover', qualityIntro:'How a scoped software change could be verified.',
    before:'BEFORE', after:'AFTER THE CHANGE', error:'Connection failed', success:'Error handled',
    check1:'Identify the defect', check2:'Handle the retry', check3:'Verify the result'
  },
  sv: {
    frame:'KOMPLYINT / LEVERANSLABB', demo:'INTERAKTIV DEMONSTRATION', online:'Lokal simulering',
    title:'Kontroll av en integration', subtitle:'Exempelbegäran · Syntetiska uppgifter', request:'Inkommande begäran',
    validate:'Validering', result:'Bekräftelse', ready:'Klar för granskning', validated:'Kontrollerad',
    test:'Kör kontroll', retry:'Testa nytt försök', idle:'Redo att köra kontrollen',
    passed:'Tre lokala kontroller genomfördes.', recovered:'En simulerad timeout hanterades och ett nytt försök lyckades.',
    status:'Kontrollresultat', tests:'3 / 3 kontroller', source:'Källa', sourceValue:'Exempeldata',
    code:'Begäran', codeStatus:'Svar', stage:'DEMONSTRATION · INTE KUNDARBETE',
    chartTitle:'Rapportöversikt', chartSubtitle:'En tydlig vy som kan uppdateras',
    chartNote:'Illustrativ rapport med syntetiska uppgifter. Siffrorna avser inte kundresultat.',
    period:'Period', total:'Totalt', average:'Medelvärde', unit:'händelser', plot:'Händelser per månad',
    h1:'Januari–juni', h2:'Juli–december', chartEyebrow:'RAPPORTDEMO',
    dataSource:'Källa: exempeldata', quality:'Kontrollregler', evidence:'Illustration · inte ett kunduppdrag',
    qualityTitle:'Ändring, testning och överlämning', qualityIntro:'Så kan en avgränsad programändring kontrolleras.',
    before:'FÖRE', after:'EFTER ÄNDRINGEN', error:'Anslutningen avbröts', success:'Felet hanteras',
    check1:'Identifiera felet', check2:'Hantera ett nytt försök', check3:'Kontrollera resultatet'
  }
} as const

export function EnterpriseHeroVisual({lang}:{lang:Lang}) {
  const t=copy[lang]
  const [result,setResult]=useState<Outcome>('idle')
  const [runs,setRuns]=useState(0)
  function execute(simulateTimeout:boolean){
    const record={id:'REQ-104',state:'received',owner:'Delivery team'}
    const valid=/^REQ-\d{3}$/.test(record.id)&&record.state==='received'&&Boolean(record.owner)
    const first={ok:!simulateTimeout&&valid,status:simulateTimeout?504:valid?200:422}
    const final=first.ok?first:{ok:valid,status:valid?200:422}
    const checks=[valid,final.ok,final.status===200]
    setResult(checks.every(Boolean)?(simulateTimeout?'recovered':'passed'):'idle')
    setRuns(current=>current+1)
  }
  const success=result!=='idle'
  return <div className="ev-hero-visual" aria-label={t.demo}>
    <div className="ev-surface-glow" aria-hidden="true"/>
    <div className="ev-console">
      <div className="ev-console-top">
        <div className="ev-console-dots" aria-hidden="true"><i/><i/><i/></div>
        <span>{t.frame}</span>
        <span className="ev-console-live"><i aria-hidden="true"/>{t.online}</span>
      </div>
      <div className="ev-console-body">
        <div className="ev-console-eyebrow"><span>{t.demo}</span><span>01 / 03</span></div>
        <div className="ev-console-heading"><strong>{t.title}</strong><span>{t.subtitle}</span></div>
        <div className="ev-flow" aria-label={t.title}>
          <div className="ev-flow-node">
            <span className="ev-node-icon" aria-hidden="true">↧</span>
            <small>{t.request}</small><strong>REQ-104</strong>
            <span className="ev-node-tiny">JSON / POST</span>
          </div>
          <span className="ev-flow-arrow" aria-hidden="true">→</span>
          <div className="ev-flow-node ev-flow-node-accent">
            <span className="ev-node-icon" aria-hidden="true">◇</span>
            <small>{t.validate}</small><strong>{success?t.validated:'schema / id'}</strong>
            <span className="ev-node-tiny">3 RULES</span>
          </div>
          <span className="ev-flow-arrow" aria-hidden="true">→</span>
          <div className="ev-flow-node">
            <span className="ev-node-icon" aria-hidden="true">✓</span>
            <small>{t.result}</small><strong>{success?'200 OK':'—'}</strong>
            <span className="ev-node-tiny">HTTP / API</span>
          </div>
        </div>
        <div className="ev-console-requests">
          <div><span>{t.code}</span><code>POST /demo/requests/104</code></div>
          <div><span>{t.codeStatus}</span><code className={success?'ev-code-success':''}>{success?'200 OK':'—'}</code></div>
        </div>
        <div className="ev-console-status" role="status" aria-live="polite">
          <span className={'ev-status-indicator'+(success?' is-complete':'')} aria-hidden="true"/>
          <span>{result==='passed'?t.passed:result==='recovered'?t.recovered:t.idle}</span>
          <strong>{success?t.tests:('00 / 03')}</strong>
        </div>
        <div className="ev-console-actions">
          <button type="button" onClick={()=>execute(false)}>{t.test}<span aria-hidden="true">↗</span></button>
          <button type="button" className="ev-secondary-action" onClick={()=>execute(true)}>{t.retry}</button>
        </div>
      </div>
    </div>
    <div className="ev-floating-note" aria-hidden="true"><span className="ev-floating-icon">✓</span><span><strong>{t.quality}</strong><small>{runs===0?t.ready:t.tests}</small></span></div>
    <p className="ev-hero-footnote">{t.stage}</p>
  </div>
}

const series = {
  H1:[46,58,51,72,65,78],
  H2:[64,70,68,84,76,88]
} as const

export function EnterpriseReportingVisual({lang}:{lang:Lang}) {
  const t=copy[lang]
  const [period,setPeriod]=useState<'H1'|'H2'>('H1')
  const values=series[period]
  const total=values.reduce((sum,value)=>sum+value,0)
  const average=Math.round(total/values.length)
  return <div className="ev-report" aria-label={t.chartTitle}>
    <div className="ev-report-nav"><span className="ev-report-mark">K<span>·</span></span><span>{t.chartEyebrow}</span><span className="ev-report-dot">●</span></div>
    <div className="ev-report-main">
      <div className="ev-report-heading"><div><span className="ev-overline">{t.dataSource}</span><strong>{t.chartTitle}</strong><p>{t.chartSubtitle}</p></div>
      <div className="ev-period" role="group" aria-label={t.period}>
        <button type="button" aria-pressed={period==='H1'} onClick={()=>setPeriod('H1')}>H1</button>
        <button type="button" aria-pressed={period==='H2'} onClick={()=>setPeriod('H2')}>H2</button>
      </div></div>
      <div className="ev-metrics">
        <div><span>{t.total}</span><strong>{total}</strong><small>{t.unit}</small></div>
        <div><span>{t.average}</span><strong>{average}</strong><small>{t.unit}</small></div>
        <div><span>{t.source}</span><strong className="ev-text-metric">CSV → BI</strong><small>{t.sourceValue}</small></div>
      </div>
      <div className="ev-chart">
        <div className="ev-chart-label"><span>{t.plot}</span><span>{period==='H1'?t.h1:t.h2}</span></div>
        <svg viewBox="0 0 660 226" role="img" aria-label={t.plot+': '+values.map((n,i)=>(i+(period==='H1'?1:7))+'='+n).join(', ')}>
          {[50,100,150,200].map(y=><line key={y} x1="18" x2="640" y1={y} y2={y} stroke="currentColor" strokeOpacity=".12" strokeDasharray="4 8"/>)}
          {values.map((value,i)=>{
            const height=value*1.65
            return <g key={i}>
              <rect x={42+i*102} y={202-height} width="54" height={height} rx="8" fill={i===values.length-1?'#C74C57':'#8EC6A4'} opacity={i===values.length-1?1:.92}/>
              <text x={69+i*102} y={192-height} textAnchor="middle" className="ev-bar-value">{value}</text>
              <text x={69+i*102} y="222" textAnchor="middle" className="ev-bar-month">{String(i+(period==='H1'?1:7)).padStart(2,'0')}</text>
            </g>
          })}
        </svg>
      </div>
      <p className="ev-report-note">{t.chartNote}</p>
    </div>
  </div>
}

export function EnterpriseEngineeringVisual({lang}:{lang:Lang}) {
  const t=copy[lang]
  return <div className="ev-engineering" aria-label={t.qualityTitle}>
    <div className="ev-engineering-head"><span><i aria-hidden="true"/>{t.qualityTitle}</span><small>{t.evidence}</small></div>
    <div className="ev-engineering-body">
      <div className="ev-engineering-code">
        <div className="ev-code-head"><span>{t.before}</span><span>src / integration.ts</span></div>
        <div className="ev-code-line"><span>01</span><code>fetch(request.url)</code></div>
        <div className="ev-code-line ev-code-delete"><span>02</span><code>throw Error("timeout")</code></div>
        <div className="ev-code-line"><span>03</span><code>// {t.error}</code></div>
      </div>
      <div className="ev-engineering-code">
        <div className="ev-code-head"><span>{t.after}</span><span>src / integration.ts</span></div>
        <div className="ev-code-line"><span>01</span><code>const response = await retry()</code></div>
        <div className="ev-code-line ev-code-add"><span>02</span><code>if (!response.ok) report()</code></div>
        <div className="ev-code-line"><span>03</span><code>// {t.success}</code></div>
      </div>
    </div>
    <div className="ev-engineering-checks">
      {[t.check1,t.check2,t.check3].map((label,i)=><span key={label}><b aria-hidden="true">{String(i+1).padStart(2,'0')}</b>{label}</span>)}
    </div>
    <p className="ev-engineering-caption">{t.qualityIntro} {t.chartNote}</p>
  </div>
}
