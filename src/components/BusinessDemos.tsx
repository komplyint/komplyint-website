'use client'

import { useMemo, useState, type KeyboardEvent } from 'react'
import type { Lang } from '@/lib/commercial'
import { pathFor } from '@/lib/site-route'

type T = Record<Lang,string>
type Demo = 'funding' | 'intranet' | 'workflow'
type Decision = 'approved' | 'rejected' | 'pending'
const names:Record<Demo,T> = {
  funding:{fi:'Hanke- ja rahoitusraportointi',en:'Funding & project dashboard',sv:'Projekt- och finansieringsrapportering'},
  intranet:{fi:'Intranet ja prosessikirjasto',en:'Intranet & process library',sv:'Intranät och processbibliotek'},
  workflow:{fi:'Pyyntöjen ja hyväksyntöjen hallinta',en:'Request & approval workflow',sv:'Hantering av förfrågningar och godkännanden'},
}
const copy:Record<Lang,{
  eyebrow:string;title:string;lead:string;note:string;cta:string;years:string;all:string;
  applications:string;approved:string;pending:string;rejected:string;requested:string;approvalRate:string;byStatus:string;legend:string;
  filter:string;docs:string;owner:string;steps:string;search:string;noDocs:string;openDoc:string;
  inbox:string;submit:string;approve:string;decline:string;reset:string;newRequest:string;requestKinds:string[];
  statuses:Record<Decision,string>;workflowNote:string;inspect:string;
}> = {
  fi:{
    eyebrow:'TOIMINNALLISET ESIMERKIT',title:'Kokeile, miten ratkaisut toimivat.',lead:'Kolme erilaista esimerkkiä siitä, miten tieto, prosessit ja automaatio voidaan yhdistää. Voit muuttaa valintoja ja nähdä tuloksen.',
    note:'Kaikki tiedot ovat kuvitteellisia. Demot toimivat selaimessa, eivät lähetä tietoja eivätkä ole aiempia asiakastöitä.',
    cta:'Keskustele vastaavasta ratkaisusta',years:'Vuosi',all:'Kaikki',applications:'Hakemuksia',approved:'Myönnetty',pending:'Käsittelyssä',rejected:'Hylätty',requested:'Myönnetty rahoitus',approvalRate:'Hyväksymisaste',byStatus:'Päätösten jakauma',legend:'Suhde ratkaistuihin hakemuksiin',
    filter:'Osasto',docs:'Ohjeet ja prosessit',owner:'Vastuualue',steps:'Työvaiheet',search:'Hae ohjetta',noDocs:'Ei hakutuloksia',openDoc:'Näytä ohje',
    inbox:'Pyyntöjono',submit:'Luo esimerkkipyyntö',approve:'Hyväksy',decline:'Hylkää',reset:'Aloita alusta',newRequest:'Uusi pyyntö',requestKinds:['Käyttöoikeuspyyntö','Laitehankinta','Asiakirjan tarkistus'],
    statuses:{approved:'Hyväksytty',rejected:'Hylätty',pending:'Odottaa päätöstä'},workflowNote:'Tämä on paikallinen simulaatio. Hyväksynnät eivät mene oikeaan järjestelmään.',inspect:'Valitse esimerkkitapaus',
  },
  en:{
    eyebrow:'INTERACTIVE EXAMPLES',title:'Explore how the solutions work.',lead:'Three interactive examples of how reporting, documentation and approvals can support everyday operations. Change the controls and observe the results.',
    note:'All information is fictional. Demos run locally in your browser; no data is submitted or presented as previous client work.',
    cta:'Discuss a similar solution',years:'Year',all:'All',applications:'Applications',approved:'Approved',pending:'Pending',rejected:'Rejected',requested:'Approved funding',approvalRate:'Approval rate',byStatus:'Decision breakdown',legend:'Of applications with a final decision',
    filter:'Department',docs:'Guides & processes',owner:'Process owner',steps:'Process steps',search:'Search instructions',noDocs:'No matching documents',openDoc:'Open instruction',
    inbox:'Request queue',submit:'Create sample request',approve:'Approve',decline:'Decline',reset:'Reset demo',newRequest:'New request',requestKinds:['Access request','Equipment request','Document review'],
    statuses:{approved:'Approved',rejected:'Rejected',pending:'Pending decision'},workflowNote:'This is a local simulation. Actions are not sent to any real system.',inspect:'Choose a scenario',
  },
  sv:{
    eyebrow:'INTERAKTIVA EXEMPEL',title:'Pröva hur lösningarna fungerar.',lead:'Tre interaktiva exempel på hur rapportering, dokumentation och godkännanden kan stödja det dagliga arbetet. Ändra valen och se resultatet.',
    note:'Alla uppgifter är fiktiva. Demonstrationerna körs lokalt i webbläsaren och skickar inga uppgifter. De är inte tidigare kundprojekt.',
    cta:'Diskutera en liknande lösning',years:'År',all:'Alla',applications:'Ansökningar',approved:'Beviljade',pending:'Pågående',rejected:'Avslagna',requested:'Beviljad finansiering',approvalRate:'Beviljandegrad',byStatus:'Beslutsfördelning',legend:'Av ansökningar med beslut',
    filter:'Avdelning',docs:'Anvisningar och processer',owner:'Processansvarig',steps:'Processsteg',search:'Sök instruktion',noDocs:'Inga träffar',openDoc:'Öppna anvisning',
    inbox:'Begärandelista',submit:'Skapa exempelbegäran',approve:'Godkänn',decline:'Avslå',reset:'Återställ',newRequest:'Ny begäran',requestKinds:['Behörighetsbegäran','Utrustningsbegäran','Dokumentgranskning'],
    statuses:{approved:'Godkänd',rejected:'Avslagen',pending:'Väntar på beslut'},workflowNote:'Detta är en lokal simulering. Inga beslut skickas till riktiga system.',inspect:'Välj ett scenario',
  }
}
const grants:{id:string;year:number;amount:number;status:Decision}[]=[
  {id:'P-101',year:2024,amount:84000,status:'approved'},
  {id:'P-102',year:2024,amount:56000,status:'rejected'},
  {id:'P-103',year:2025,amount:125000,status:'approved'},
  {id:'P-104',year:2025,amount:62000,status:'pending'},
  {id:'P-105',year:2025,amount:97000,status:'rejected'},
  {id:'P-106',year:2026,amount:113000,status:'approved'},
  {id:'P-107',year:2026,amount:78000,status:'pending'},
  {id:'P-108',year:2026,amount:145000,status:'approved'},
]
const departments:{id:string;name:T}[]=[
  {id:'all',name:{fi:'Kaikki',en:'All',sv:'Alla'}},
  {id:'operations',name:{fi:'Toiminnan tuki',en:'Operations',sv:'Verksamhetsstöd'}},
  {id:'hr',name:{fi:'Henkilöstö',en:'People',sv:'Personal'}},
  {id:'finance',name:{fi:'Talous',en:'Finance',sv:'Ekonomi'}},
]
const documents:{id:string;dept:string;title:T;owner:T;steps:Record<Lang,string[]>}[]=[
  {id:'01',dept:'operations',title:{fi:'Uuden pyynnön käsittely',en:'Handling a new request',sv:'Behandla en ny begäran'},
  owner:{fi:'Toiminnan tuki',en:'Operations',sv:'Verksamhetsstöd'},
  steps:{fi:['Kirjaa pyyntö yhteiseen rekisteriin.','Tarkista tiedot ja vastuuhenkilö.','Ohjaa päätettäväksi ja ilmoita tuloksesta.'],en:['Register the request in a shared list.','Check information and assign an owner.','Route for a decision and notify the requester.'],sv:['Registrera begäran i en gemensam lista.','Kontrollera uppgifter och ansvarig.','Skicka till beslut och meddela resultatet.']}},
  {id:'02',dept:'hr',title:{fi:'Uuden työntekijän perehdytys',en:'New employee onboarding',sv:'Introduktion av ny medarbetare'},
  owner:{fi:'Henkilöstöhallinto',en:'People team',sv:'Personaladministration'},
  steps:{fi:['Vahvista aloituspäivä ja tehtävä.','Tilaa tarvittavat oikeudet ja laitteet.','Merkitse perehdytysvaiheet valmiiksi.'],en:['Confirm the start date and role.','Request appropriate access and equipment.','Track completion of onboarding tasks.'],sv:['Bekräfta startdatum och roll.','Beställ rättigheter och utrustning.','Följ upp introduktionsuppgifterna.']}},
  {id:'03',dept:'finance',title:{fi:'Ostolaskun tarkistus',en:'Invoice review process',sv:'Granskning av inköpsfaktura'},
  owner:{fi:'Taloushallinto',en:'Finance team',sv:'Ekonomiförvaltning'},
  steps:{fi:['Tarkista laskun perustiedot.','Varmista kustannuspaikka ja hyväksyjä.','Kirjaa käsittelyn lopputulos.'],en:['Validate invoice details.','Check cost centre and approval owner.','Record the decision in the register.'],sv:['Kontrollera fakturauppgifter.','Verifiera kostnadsställe och godkännare.','Dokumentera beslutet.']}},
  {id:'04',dept:'operations',title:{fi:'Projektin kuukausitilanne',en:'Monthly project reporting',sv:'Månatlig projektstatus'},
  owner:{fi:'Projektikoordinaattori',en:'Project coordinator',sv:'Projektkoordinator'},
  steps:{fi:['Kerää ajantasaiset mittarit.','Tarkista poikkeamat ja riskit.','Julkaise yhteenveto sovituille vastaanottajille.'],en:['Collect current KPI updates.','Review exceptions and risks.','Publish an agreed progress summary.'],sv:['Samla in aktuella nyckeltal.','Granska avvikelser och risker.','Publicera en överenskommen sammanfattning.']}},
]
type Request={id:number;kind:number;status:Decision}
const initialRequests:Request[]=[{id:1001,kind:0,status:'pending'},{id:1002,kind:1,status:'approved'},{id:1003,kind:2,status:'pending'}]

export default function BusinessDemos({lang}:{lang:Lang}){
  const t=copy[lang]
  const [demo,setDemo]=useState<Demo>('funding')
  const [year,setYear]=useState('all')
  const [department,setDepartment]=useState('all')
  const [search,setSearch]=useState('')
  const [documentId,setDocumentId]=useState('01')
  const [requests,setRequests]=useState<Request[]>(initialRequests)
  const [newKind,setNewKind]=useState(0)
  const records=useMemo(()=>grants.filter(item=>year==='all'||String(item.year)===year),[year])
  const counts:Record<Decision,number>={approved:0,pending:0,rejected:0}
  records.forEach(item=>counts[item.status]++)
  const finished=counts.approved+counts.rejected
  const funding=records.reduce((sum,item)=>sum+(item.status==='approved'?item.amount:0),0)
  const rate=finished?Math.round(counts.approved/finished*100):0
  const money=new Intl.NumberFormat(lang==='fi'?'fi-FI':lang==='sv'?'sv-FI':'en-GB',{style:'currency',currency:'EUR',maximumFractionDigits:0})
  const visibleDocs=documents.filter(item=>(department==='all'||item.dept===department)&&(!search.trim()||item.title[lang].toLocaleLowerCase().includes(search.trim().toLocaleLowerCase())))
  const activeDoc=visibleDocs.find(item=>item.id===documentId)||visibleDocs[0]
  function decide(id:number,status:Decision){setRequests(items=>items.map(item=>item.id===id?{...item,status}:item))}
  function addRequest(){setRequests(items=>[...items,{id:items.reduce((m,item)=>Math.max(m,item.id),1000)+1,kind:newKind,status:'pending'}])}
  function onDemoTabKeyDown(event:KeyboardEvent<HTMLButtonElement>, current:Demo){
    if(!['ArrowRight','ArrowLeft','Home','End'].includes(event.key))return
    event.preventDefault()
    const choices:Demo[]=['funding','intranet','workflow']
    const index=choices.indexOf(current)
    const next=event.key==='Home'?0:event.key==='End'?choices.length-1:event.key==='ArrowRight'?(index+1)%choices.length:(index+choices.length-1)%choices.length
    setDemo(choices[next])
    event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus()
  }
  const pendingCount=requests.filter(r=>r.status==='pending').length
  const route=demo==='funding'?'data-reporting': 'm365-automation'
  return <section className="kc-section bs-demos" aria-labelledby="bs-demo-title">
    <div className="kc-shell">
      <div className="bs-intro">
        <p className="kc-eyebrow">{t.eyebrow}</p><h2 id="bs-demo-title">{t.title}</h2><p>{t.lead}</p>
        <small className="bs-demo-disclaimer">{t.note}</small>
      </div>
      <div className="bs-demo-shell">
        <nav className="bs-demo-tabs" role="tablist" aria-label={t.inspect}>
          {(['funding','intranet','workflow'] as Demo[]).map((key,i)=><button key={key} type="button" role="tab" id={'bs-tab-'+key} aria-selected={demo===key} aria-controls="bs-demo-panel" tabIndex={demo===key?0:-1} onKeyDown={event=>onDemoTabKeyDown(event,key)} onClick={()=>setDemo(key)}>
            <span>{String(i+1).padStart(2,'0')}</span>{names[key][lang]}
          </button>)}
        </nav>
        <div className="bs-demo-panel" id="bs-demo-panel" role="tabpanel" aria-labelledby={'bs-tab-'+demo}>
          <header className="bs-demo-top"><div><span>Komplyint / {t.eyebrow}</span><h3>{names[demo][lang]}</h3></div><b>DEMO · SYNTHETIC</b></header>
          {demo==='funding'&&<div className="bs-funding">
            <div className="bs-demo-control"><label>{t.years}<select value={year} onChange={e=>setYear(e.target.value)}><option value="all">{t.all}</option>{[2024,2025,2026].map(y=><option key={y} value={y}>{y}</option>)}</select></label></div>
            <div className="bs-kpis">
              <div><span>{t.applications}</span><strong>{records.length}</strong></div>
              <div><span>{t.requested}</span><strong>{money.format(funding)}</strong></div>
              <div><span>{t.approvalRate}</span><strong>{rate}%</strong><small>{t.legend}</small></div>
            </div>
            <div className="bs-bars"><h4>{t.byStatus}</h4>
              {(['approved','pending','rejected'] as Decision[]).map(status=><div key={status} className="bs-bar-row"><span>{t.statuses[status]}</span><div className="bs-bar-track"><div className={'bs-bar-fill bs-'+status} style={{width:(records.length?100*counts[status]/records.length:0)+'%'}}/></div><b>{counts[status]}</b></div>)}
            </div>
          </div>}
          {demo==='intranet'&&<div className="bs-intranet">
            <div className="bs-intranet-list"><label>{t.filter}<select value={department} onChange={e=>setDepartment(e.target.value)}>{departments.map(item=><option key={item.id} value={item.id}>{item.name[lang]}</option>)}</select></label>
              <label>{t.search}<input type="search" value={search} onChange={e=>setSearch(e.target.value)} placeholder={t.search}/></label>
              <h4>{t.docs}</h4>
              {visibleDocs.map(item=><button key={item.id} type="button" aria-pressed={activeDoc?.id===item.id} onClick={()=>setDocumentId(item.id)}><span>{item.title[lang]}</span><small>{t.openDoc} ↗</small></button>)}
              {!visibleDocs.length&&<p>{t.noDocs}</p>}
            </div>
            <div className="bs-intranet-content" aria-live="polite">{activeDoc?<><span className="bs-demo-kicker">INTRANET / {activeDoc.id}</span><h4>{activeDoc.title[lang]}</h4><p><b>{t.owner}:</b> {activeDoc.owner[lang]}</p><h5>{t.steps}</h5><ol>{activeDoc.steps[lang].map(step=><li key={step}>{step}</li>)}</ol></>:<p>{t.noDocs}</p>}</div>
          </div>}
          {demo==='workflow'&&<div className="bs-workflow">
            <div className="bs-workflow-compose"><label>{t.newRequest}<select value={newKind} onChange={e=>setNewKind(Number(e.target.value))}>{t.requestKinds.map((kind,i)=><option key={kind} value={i}>{kind}</option>)}</select></label><button type="button" onClick={addRequest}>{t.submit} <span aria-hidden="true">+</span></button></div>
            <div className="bs-workflow-heading"><h4>{t.inbox}</h4><span role="status" aria-live="polite">{pendingCount} {t.statuses.pending}</span></div>
            <div className="bs-request-list">{requests.map(item=><div className="bs-request" key={item.id}><div><small>REQ-{item.id}</small><strong>{t.requestKinds[item.kind]}</strong><span className={'bs-request-status bs-'+item.status}>{t.statuses[item.status]}</span></div>{item.status==='pending'&&<div className="bs-request-actions"><button type="button" onClick={()=>decide(item.id,'approved')}>{t.approve}</button><button type="button" onClick={()=>decide(item.id,'rejected')}>{t.decline}</button></div>}</div>)}</div>
            <div className="bs-workflow-footer"><small>{t.workflowNote}</small><button type="button" onClick={()=>{setRequests(initialRequests);setNewKind(0)}}>{t.reset}</button></div>
          </div>}
        </div>
        <footer className="bs-demo-footer"><span>{t.note}</span><a href={pathFor(lang,'contact')+'?service='+route}>{t.cta}<span aria-hidden="true">↗</span></a></footer>
      </div>
    </div>
  </section>
}
