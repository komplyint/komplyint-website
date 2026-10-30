import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import ts from 'typescript'

/* The engine is intentionally dependency-free. Transpile the real TypeScript
 * module to run its exported functions, not merely grep for expected names. */
const code=readFileSync('src/lib/delivery-lab-engine.ts','utf8')
const output=ts.transpileModule(code,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext},reportDiagnostics:true})
assert.equal(output.diagnostics?.filter(d=>d.category===ts.DiagnosticCategory.Error).length??0,0)
const engine=await import('data:text/javascript;base64,'+Buffer.from(output.outputText).toString('base64'))

test('72 deterministic synthetic records are clean and fully traceable',()=>{
 const rows=engine.makeLabRows('normal')
 assert.equal(rows.length,72)
 assert.deepEqual(rows,engine.makeLabRows('normal'))
 assert.equal(new Set(rows.map(row=>row.id)).size,72)
 assert.equal(engine.auditLabRows(rows).qualityRate,100)
 const pipeline=engine.runLabPipeline('normal')
 assert.equal(pipeline.passed,4)
 assert.equal(pipeline.apiStatus,200)
 assert.deepEqual(pipeline.gatewayAttempts,[200])
})

test('three distinguishable data defects are quarantined and reflected in QA',()=>{
 const pipeline=engine.runLabPipeline('quality')
 assert.equal(pipeline.audit.received,72)
 assert.equal(pipeline.audit.accepted.length,69)
 assert.equal(pipeline.audit.issues.length,3)
 assert.deepEqual(new Set(pipeline.audit.issues.map(issue=>issue.code)),new Set(['AMOUNT','DUPLICATE','REGION']))
 assert.equal(pipeline.passed,1)
 assert.deepEqual(pipeline.gates.map(gate=>gate.pass),[false,false,false,true])
 assert.ok(!pipeline.audit.accepted.some(row=>row.amount<=0||row.region==='Unknown'))
 const fixed=engine.runLabPipeline('quality',true)
 assert.equal(fixed.audit.accepted.length,72)
 assert.equal(fixed.audit.issues.length,0)
 assert.equal(fixed.passed,4)
})

test('API outage fails without retry and passes after a simulated 504 to 200 retry',()=>{
 const failing=engine.runLabPipeline('outage')
 assert.deepEqual(failing.gatewayAttempts,[504])
 assert.equal(failing.apiStatus,504)
 assert.deepEqual(failing.gates.map(gate=>gate.pass),[true,true,true,false])
 const recovered=engine.runLabPipeline('outage',false,true)
 assert.deepEqual(recovered.gatewayAttempts,[504,200])
 assert.equal(recovered.apiStatus,200)
 assert.equal(recovered.passed,4)
 assert.equal(recovered.ok,true)
})

test('report, month drilldown, source and region use the same accepted records',()=>{
 const accepted=engine.runLabPipeline('normal').audit.accepted
 const filter={region:'all',source:'all',month:'all'}
 const whole=engine.labReport(accepted,filter)
 assert.equal(whole.received,72)
 assert.equal(whole.closed+whole.open,72)
 assert.equal(whole.monthly.reduce((sum,item)=>sum+item.received,0),72)
 assert.equal(whole.monthly.reduce((sum,item)=>sum+item.closed,0),whole.closed)
 assert.ok(whole.rate>=0&&whole.rate<=100)
 assert.ok(whole.total>0)
 const filtered=engine.labReport(accepted,{region:'Uusimaa',source:'CRM',month:2})
 const independent=accepted.filter(row=>row.region==='Uusimaa'&&row.source==='CRM'&&row.month===2)
 assert.equal(filtered.received,independent.length)
 assert.equal(filtered.closed,independent.filter(row=>row.closed).length)
 assert.equal(filtered.total,independent.filter(row=>row.closed).reduce((n,row)=>n+row.amount,0))
 const healthy=engine.labReport(accepted,{region:'all',source:'all',month:2})
 const dirty=engine.labReport(engine.runLabPipeline('quality').audit.accepted,{region:'all',source:'all',month:2})
 assert.ok(dirty.received<=healthy.received)
})

test('original client-facing demo has trilingual copy, live controls and no real network calls',()=>{
 const visual=readFileSync('src/components/DeliveryLab.tsx','utf8')
 const copy=readFileSync('src/lib/delivery-lab-copy.ts','utf8')
 const css=readFileSync('src/app/delivery-lab.css','utf8')
 const page=readFileSync('src/app/page.tsx','utf8')
 const layout=readFileSync('src/app/layout.tsx','utf8')
 for(const phrase of ['Paikallinen demo','LOCAL DEMO','LOKAL DEMO','Power BI','synteettis','synthetic','syntetiska']){
  assert.ok(copy.toLowerCase().includes(phrase.toLowerCase()),'Missing demo disclosure: '+phrase)
 }
 for(const phrase of ['setScenario(next)','setRegion(event.target.value as LabRegion)','setSource(event.target.value as LabSource)','setMonth(selected=>','runLabPipeline(scenario,repaired,retry)','onClick={run}','onClick={repair}']){
  assert.ok(visual.includes(phrase),'Missing interaction: '+phrase)
 }
 assert.ok(!/\bfetch\s*\(|\bXMLHttpRequest\b|\bWebSocket\b/.test(visual),'The page must not transmit synthetic or visitor data')
 assert.ok(page.includes('<DeliveryLab lang={lang}/>'))
 assert.ok(layout.includes("import './delivery-lab.css'"))
 assert.ok(css.includes('prefers-reduced-motion:reduce'))
 assert.ok(css.includes('max-width:360px'))
})
