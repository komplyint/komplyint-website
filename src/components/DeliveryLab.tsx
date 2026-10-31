'use client'

import {useId,useMemo,useState} from 'react'
import type {Lang} from '@/lib/commercial'
import {pathFor} from '@/lib/site-route'
import {deliveryLabCopy} from '@/lib/delivery-lab-copy'
import {
  LAB_REGIONS,LAB_SOURCES,labReport,runLabPipeline,
  type LabFilter,type LabMonth,type LabRegion,type LabScenario,type LabSource,
  type LabGate
} from '@/lib/delivery-lab-engine'

type Workspace='data'|'bi'|'software'|'testing'
const sourceLabels:Record<LabSource,string>={all:'All',CRM:'CRM',ERP:'ERP',ServiceDesk:'ServiceDesk'}
const issueKeys={AMOUNT:'issueAmount',DUPLICATE:'issueUnique',REGION:'issueReference',SCHEMA:'issueSchema'} as const
const gateKeys:Record<LabGate['id'],'unit'|'unique'|'references'|'gateway'>={
  schema:'unit',unique:'unique',references:'references',gateway:'gateway'
}

/** One connected, fully local interactive story; no client records or network requests. */
export default function DeliveryLab({lang}:{lang:Lang}){
  const t=deliveryLabCopy[lang]
  const id=useId().replace(/:/g,'')
  const [scenario,setScenario]=useState<LabScenario>('normal')
  const [region,setRegion]=useState<LabRegion>('all')
  const [source,setSource]=useState<LabSource>('all')
  const [month,setMonth]=useState<LabMonth>('all')
  const [workspace,setWorkspace]=useState<Workspace>('data')
  const [repaired,setRepaired]=useState(false)
  const [retry,setRetry]=useState(false)
  const [tested,setTested]=useState(false)
  const [runNumber,setRunNumber]=useState(0)
  const pipeline=useMemo(()=>runLabPipeline(scenario,repaired,retry),[scenario,repaired,retry])
  const filter:LabFilter={region,source,month}
  const view=labReport(pipeline.audit.accepted,filter)
  const monthly=labReport(pipeline.audit.accepted,{...filter,month:'all'}).monthly
  const highest=Math.max(1,...monthly.map(item=>item.closed))
  const formatMoney=(value:number)=>new Intl.NumberFormat(lang==='fi'?'fi-FI':lang==='sv'?'sv-FI':'en-GB',{
    style:'currency',currency:'EUR',maximumFractionDigits:0
  }).format(value)
  const flow:{id:Workspace;number:string;title:string;desc:string}[]=[
    {id:'data',number:'01',title:t.data,desc:t.dataDesc},
    {id:'bi',number:'02',title:t.bi,desc:t.biDesc},
    {id:'software',number:'03',title:t.software,desc:t.softwareDesc},
    {id:'testing',number:'04',title:t.testing,desc:t.testingDesc}
  ]
  function chooseScenario(next:LabScenario){
    setScenario(next);setRepaired(false);setRetry(false);setTested(false);setMonth('all')
    setWorkspace(next==='normal'?'bi':next==='quality'?'data':'software')
  }
  function run(){setTested(true);setRunNumber(n=>n+1)}
  function repair(){
    if(scenario==='quality')setRepaired(true)
    if(scenario==='outage')setRetry(true)
    setTested(true);setRunNumber(n=>n+1)
  }
  const summary=!tested?t.awaiting:pipeline.ok?t.success:t.failure+' '+pipeline.passed+'/4.'
  const gateStatus=(gate:LabGate)=>!tested?t.pending:gate.pass?t.passed:t.failed
  const issues=Object.entries(issueKeys).map(([code,key])=>({
    code,label:t[key],count:pipeline.audit.issues.filter(issue=>issue.code===code).length
  })).filter(issue=>issue.count>0)
  return <section id="delivery-lab" className="dl-section kc-section" aria-labelledby={id+'-heading'}>
    <div className="kc-shell">
      <div className="dl-intro">
        <div><p className="kc-eyebrow">{t.eyebrow}</p><h2 id={id+'-heading'}>{t.title}</h2></div>
        <div><p>{t.lead}</p><a href={pathFor(lang,'contact')+'?engagement=project'} className="dl-contact-link">{t.contact}<span aria-hidden="true">↗</span></a></div>
      </div>
      <div className="dl-app">
        <header className="dl-appbar">
          <div className="dl-appbar-left"><span className="dl-logo" aria-hidden="true">K<span>·</span></span><span>{t.shell}</span></div>
          <span className="dl-appbar-right"><i aria-hidden="true"/>{t.badge}</span>
        </header>
        <div className="dl-titlebar">
          <div><span className="dl-kicker">{t.source}</span><strong>Operations intelligence / 2026 H1</strong><small>{t.sourceDetail}</small></div>
          <span className="dl-version">DEMO / 01</span>
        </div>
        <nav className="dl-flow" aria-label={t.flowLabel}>
          {flow.map((step,index)=><button key={step.id} type="button"
            className={'dl-flow-step'+(workspace===step.id?' is-active':'')}
            onClick={()=>setWorkspace(step.id)} aria-pressed={workspace===step.id}
            aria-controls={id+'-inspector'}>
            <span className="dl-flow-number">{step.number}</span>
            <span className="dl-flow-text"><b>{step.title}</b><small>{step.desc}</small></span>
            <span className="dl-flow-chevron" aria-hidden="true">{index===3?'✓':'→'}</span>
          </button>)}
        </nav>
        <div className="dl-toolbar">
          <fieldset className="dl-scenario-group"><legend>{t.scenario}</legend><div className="dl-scenario-buttons">
            {([['normal',t.normal],['quality',t.quality],['outage',t.outage]] as const)
              .map(([value,label])=><button type="button" key={value}
                aria-pressed={scenario===value} onClick={()=>chooseScenario(value)}>{label}</button>)}
          </div></fieldset>
          <div className="dl-filters">
            <label>{t.region}<select value={region} onChange={event=>{
              setRegion(event.target.value as LabRegion);setMonth('all')}}>
              <option value="all">{t.allRegions}</option>
              {LAB_REGIONS.map(value=><option value={value} key={value}>{value}</option>)}
            </select></label>
            <label>{t.sourceFilter}<select value={source} onChange={event=>{
              setSource(event.target.value as LabSource);setMonth('all')}}>
              <option value="all">{t.allSources}</option>
              {LAB_SOURCES.map(value=><option value={value} key={value}>{sourceLabels[value]}</option>)}
            </select></label>
          </div>
        </div>
        <div className="dl-kpis" role="group" aria-label={t.subtitle}>
          <div className="dl-kpi"><span>{t.metricReceived}</span><strong>{view.received}</strong><small>{t.requests}</small></div>
          <div className="dl-kpi"><span>{t.metricClosed}</span><strong>{view.closed}</strong><small>{t.requests}</small></div>
          <div className="dl-kpi"><span>{t.metricSla}</span><strong>{view.rate}%</strong><small>{view.onTime} / {view.closed}</small></div>
          <div className="dl-kpi"><span>{t.metricBilling}</span><strong className="dl-currency">{formatMoney(view.total)}</strong><small>EUR · {t.source}</small></div>
        </div>
        <div className="dl-main-grid">
          <section className="dl-chart-card" aria-labelledby={id+'-chart-heading'}>
            <div className="dl-panel-head">
              <div><span className="dl-kicker">{t.powerBi}</span>
                <h3 id={id+'-chart-heading'}>{t.subtitle}</h3><p>{t.subtitleText}</p></div>
              <span className="dl-panel-icon" aria-hidden="true">▥</span>
            </div>
            <div className="dl-chart-heading"><strong>{t.chart}</strong><span>01—06 / 2026</span></div>
            <div className="dl-chart" role="group" aria-label={t.chart}>
              {monthly.map(item=><button type="button" key={item.month}
                className={'dl-chart-bar'+(month===item.month?' is-selected':'')}
                aria-pressed={month===item.month}
                onClick={()=>setMonth(selected=>selected===item.month?'all':item.month as LabMonth)}>
                <span className="dl-bar-count">{item.closed}</span>
                <span className="dl-bar-track"><span className="dl-bar-fill" style={{height:String(Math.max(4,100*item.closed/highest))+'%'}}/></span>
                <span className="dl-bar-month">{String(item.month).padStart(2,'0')}</span>
                <span className="sr-only">{t.month} {item.month}: {item.closed} {t.requests}</span>
              </button>)}
            </div>
            <div className="dl-chart-footer"><span><i aria-hidden="true"/>{t.chartSource}</span>
              {month!=='all'&&<button type="button" onClick={()=>setMonth('all')}>{t.monthClear} ×</button>}
            </div>
          </section>
          <section className="dl-inspector" id={id+'-inspector'} aria-labelledby={id+'-inspector-heading'}>
            <div className="dl-panel-head"><div><span className="dl-kicker">{t.inspector}</span>
              <h3 id={id+'-inspector-heading'}>{workspace==='data'?t.dataTitle:workspace==='bi'?t.biTitle:workspace==='software'?t.apiTitle:t.qaTitle}</h3>
              <p>{workspace==='data'?t.dataText:workspace==='bi'?t.biText:workspace==='software'?t.apiText:t.qaText}</p>
            </div></div>
            {workspace==='data'&&<div className="dl-inspector-content">
              <dl className="dl-data-grid">
                <div><dt>{t.rowsIn}</dt><dd>{pipeline.audit.received}</dd></div>
                <div><dt>{t.rowsValid}</dt><dd>{pipeline.audit.accepted.length}</dd></div>
                <div><dt>{t.rowsHeld}</dt><dd>{pipeline.audit.received-pipeline.audit.accepted.length}</dd></div>
                <div><dt>{t.dataQuality}</dt><dd>{pipeline.audit.qualityRate}%</dd></div>
              </dl>
              <strong className="dl-subtitle">{t.errorTitle}</strong>
              {issues.length?<ul className="dl-issues">{issues.map(issue=>
                <li key={issue.code}><span>{issue.label}</span><b>{issue.count}</b></li>)}</ul>
                :<p className="dl-no-issues">✓ {t.noErrors}</p>}
              <div className="dl-source-strip">{LAB_SOURCES.map(value=><span key={value}>
                {value}<b>{pipeline.audit.accepted.filter(row=>row.source===value).length}</b></span>)}</div>
            </div>}
            {workspace==='bi'&&<div className="dl-inspector-content">
              <div className="dl-inspector-metric"><span>{t.metricSla}</span><strong>{view.rate}%</strong><small>{view.onTime} / {view.closed}</small></div>
              <p className="dl-subtitle">{t.biFormula}</p>
              <pre className="dl-code">{'SLA % =\nDIVIDE([On time], [Closed], 0)'}</pre>
              <p className="dl-inspector-note">{t.biWarning}</p>
            </div>}
            {workspace==='software'&&<div className="dl-inspector-content">
              <div className="dl-http-status"><code>GET /v1/analytics/summary</code>
                <span className={pipeline.apiStatus===200?'is-ok':'is-error'}>{tested?pipeline.apiStatus:'—'}</span>
              </div>
              <pre className="dl-code dl-json">{JSON.stringify({
                region,source,month,received:view.received,closed:view.closed,
                sla_percent:view.rate,billable_eur:view.total
              },null,2)}</pre>
              <p className="dl-inspector-note">{t.attempts}: {tested?pipeline.gatewayAttempts.join(' → '):'—'}</p>
            </div>}
            {workspace==='testing'&&<div className="dl-inspector-content">
              <div className="dl-test-summary"><strong>{tested?pipeline.passed+'/4':'— / 4'}</strong>
                <span>{tested?(pipeline.ok?t.success:summary):t.awaiting}</span></div>
              <ul className="dl-mini-tests">{pipeline.gates.map(gate=><li key={gate.id}>
                <span>{t[gateKeys[gate.id]]}</span>
                <b className={tested?(gate.pass?'is-ok':'is-error'):''}>{gateStatus(gate)}</b>
              </li>)}</ul>
            </div>}
          </section>
        </div>
        <div className="dl-qa-strip">
          <div className="dl-qa-title"><div><span className="dl-kicker">QUALITY GATES / 04</span>
            <h3>{t.testing}</h3><p>{t.tip}</p></div>
            <span className="dl-run-number" aria-hidden="true">RUN {String(runNumber).padStart(2,'0')}</span>
          </div>
          <div className="dl-test-grid" role="group" aria-label={t.qaTitle}>{pipeline.gates.map((gate,index)=>
            <div className={'dl-test-card'+(tested?(gate.pass?' is-pass':' is-fail'):'')} key={gate.id}>
              <span>{String(index+1).padStart(2,'0')} / {t[gateKeys[gate.id]]}</span>
              <strong>{gateStatus(gate)}</strong>
            </div>)}
          </div>
          <div className="dl-bottom-controls">
            <div className="dl-run-actions">
              <button type="button" className="dl-run-button" onClick={run}>{t.run}<span aria-hidden="true">↗</span></button>
              {((scenario==='quality'&&!repaired)||(scenario==='outage'&&!retry))&&
                <button type="button" className="dl-repair-button" onClick={repair}>
                  {scenario==='quality'?t.fixData:t.fixOutage}</button>}
            </div>
            <p role="status" aria-live="polite">{summary}</p>
          </div>
        </div>
        <footer className="dl-disclaimer">{t.legal}</footer>
      </div>
    </div>
  </section>
}
