/* Pure, deterministic demo engine. No user data, telemetry, network or real client records.
 * The same validated rows drive BI, API response previews and automated QA gates. */
export type LabScenario = 'normal' | 'quality' | 'outage'
export type LabRegion = 'all' | 'Uusimaa' | 'Pirkanmaa' | 'Varsinais-Suomi'
export type LabSource = 'all' | 'CRM' | 'ERP' | 'ServiceDesk'
export type LabMonth = 'all' | 1 | 2 | 3 | 4 | 5 | 6
export type LabIssue = 'AMOUNT' | 'DUPLICATE' | 'REGION' | 'SCHEMA'
export type LabRow = {
  id: string
  month: number
  region: string
  source: string
  amount: number
  closed: boolean
  cycleDays: number
}
export type LabFilter = {region:LabRegion;source:LabSource;month:LabMonth}
export const LAB_REGIONS = ['Uusimaa','Pirkanmaa','Varsinais-Suomi'] as const
export const LAB_SOURCES = ['CRM','ERP','ServiceDesk'] as const
export const LAB_MONTHS = [1,2,3,4,5,6] as const

export function makeLabRows(scenario:LabScenario, repaired=false):LabRow[] {
  const rows:LabRow[] = Array.from({length:72},(_,i)=>({
    id:'REQ-'+String(i+101).padStart(4,'0'),
    month:(i%6)+1,
    region:LAB_REGIONS[(Math.floor(i/6)+i)%3],
    source:LAB_SOURCES[(Math.floor(i/6)+2*i)%3],
    amount:400+((i*137+53)%1700),
    closed:i%5!==0,
    cycleDays:2+((i*3+Math.floor(i/6))%11)
  }))
  if(scenario==='quality'&&!repaired){
    rows[11]={...rows[11],id:rows[10].id} // duplicate external identifier
    rows[27]={...rows[27],amount:-350}      // invalid amount
    rows[45]={...rows[45],region:'Unknown'} // broken reference
  }
  return rows
}

export type AuditResult = {accepted:LabRow[];issues:{index:number;code:LabIssue;id:string}[];received:number;qualityRate:number}
export function auditLabRows(rows:readonly LabRow[]):AuditResult {
  const seen=new Set<string>()
  const accepted:LabRow[]=[]
  const issues:AuditResult['issues']=[]
  rows.forEach((row,index)=>{
    const rowIssues:LabIssue[]=[]
    if(!/^REQ-\d{4}$/.test(row.id)||!LAB_MONTHS.some(m=>m===row.month)
      ||typeof row.closed!=='boolean'||!Number.isInteger(row.cycleDays)||row.cycleDays<0
      ||!LAB_SOURCES.some(source=>source===row.source))rowIssues.push('SCHEMA')
    if(seen.has(row.id))rowIssues.push('DUPLICATE')
    else seen.add(row.id)
    if(!Number.isFinite(row.amount)||row.amount<=0)rowIssues.push('AMOUNT')
    if(!LAB_REGIONS.some(region=>region===row.region))rowIssues.push('REGION')
    for(const code of rowIssues)issues.push({index,code,id:row.id})
    if(rowIssues.length===0)accepted.push(row)
  })
  return {accepted,issues,received:rows.length,qualityRate:rows.length?Math.round(100*accepted.length/rows.length):100}
}

export function labReport(rows:readonly LabRow[],filter:LabFilter){
  const scoped=rows.filter(row=>(filter.region==='all'||row.region===filter.region)
    &&(filter.source==='all'||row.source===filter.source))
  const inMonth=filter.month==='all'?scoped:scoped.filter(row=>row.month===filter.month)
  const closed=inMonth.filter(row=>row.closed)
  const onTime=closed.filter(row=>row.cycleDays<=7)
  const total=closed.reduce((sum,row)=>sum+row.amount,0)
  const monthly=LAB_MONTHS.map(month=>{
    const monthRows=scoped.filter(row=>row.month===month)
    return {month,received:monthRows.length,closed:monthRows.filter(row=>row.closed).length}
  })
  return {received:inMonth.length,closed:closed.length,open:inMonth.length-closed.length,
    onTime:onTime.length,rate:closed.length?Math.round(onTime.length/closed.length*100):0,
    total,monthly}
}

export type LabGate = {id:'schema'|'unique'|'references'|'gateway';pass:boolean;errors:number}
export function runLabPipeline(scenario:LabScenario,repaired=false,retry=false){
  const rows=makeLabRows(scenario,repaired)
  const audit=auditLabRows(rows)
  const count=(code:LabIssue)=>audit.issues.filter(issue=>issue.code===code).length
  const gatewayAttempts=scenario==='outage'?(retry?[504,200]:[504]):[200]
  const apiStatus=gatewayAttempts[gatewayAttempts.length-1]
  const gates:LabGate[]=[
    {id:'schema',pass:count('AMOUNT')+count('SCHEMA')===0,errors:count('AMOUNT')+count('SCHEMA')},
    {id:'unique',pass:count('DUPLICATE')===0,errors:count('DUPLICATE')},
    {id:'references',pass:count('REGION')===0,errors:count('REGION')},
    {id:'gateway',pass:apiStatus===200,errors:apiStatus===200?0:1}
  ]
  return {rows,audit,gates,passed:gates.filter(gate=>gate.pass).length,
    ok:gates.every(gate=>gate.pass),apiStatus,gatewayAttempts}
}
