import Link from 'next/link'
import { services, serviceSlugs, canonicalHost, contactEmail, type Lang } from '@/lib/commercial'

const artTitles: Record<Lang,string[]> = {
  fi:['Tietoa, johon voi luottaa','Työvaihe, joka etenee','Sivusto, jota on helppo käyttää','Työkalu juuri oikeaan tarpeeseen','Selkeä testihavainto','Viimeistelty ja käytettävä asiakirja'],
  en:['Information you can rely on','A workflow that moves forward','A website that is easier to use','A tool for the specific task','Clear testing evidence','A document ready for real work']
}
function FoldMotif({id}:{id:number}) {
  return <svg className="qh-fold-art" viewBox="0 0 440 360" role="img" aria-label="Abstract folded-plane graphic, representing a practical workflow">
    <defs><linearGradient id="qhFold" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#8ACA9F"/><stop offset="1" stopColor="#1B6444"/></linearGradient></defs>
    <path fill="none" stroke="currentColor" opacity=".15" d="M36 315H414M36 264H414M36 213H414M36 162H414M36 111H414M36 60H414M68 28V336M129 28V336M190 28V336M251 28V336M312 28V336M373 28V336"/>
    <path d="M78 249 206 86 364 143 232 313Z" fill="url(#qhFold)" opacity=".92"/>
    <path d="M206 86 232 313 364 143Z" fill="#D1EBDD" opacity=".88"/>
    <path d="M78 249 232 313 206 86Z" fill="#2D7E57" opacity=".92"/>
    <path d="M206 86 364 143 232 313" fill="none" stroke="#E7F8EA" strokeWidth="2.1" strokeLinejoin="round"/>
    <circle cx={206+(id%3)*9} cy="86" r="5" fill="#D8F9B8" />
  </svg>
}
export default function ServiceDetail({lang,index}:{lang:Lang,index:number}) {
  const s=services[lang][index], slug=serviceSlugs[index], prefix=lang==='en'?'/en':''
  const label=lang==='fi'?'Palvelut':'Services'
  const overview=lang==='fi'?'Mitä voimme tehdä':'What we can do'
  const deliver=lang==='fi'?'Mitä saat':'What we deliver'
  const limits=lang==='fi'?'Mitä sovimme ennen aloitusta':'What we agree before starting'
  const method=lang==='fi'?'Näin etenemme':'Our process'
  const touch=lang==='fi'?'Kerro tarpeestasi':'Discuss this service'
  const next=lang==='fi'?'Tutustu muihin palveluihin':'Explore all services'
  const canonical=canonicalHost+prefix+'/services/'+slug
  const schema={ '@context':'https://schema.org','@type':'Service',name:s.title,description:s.intro,serviceType:s.title,areaServed:{'@type':'Country',name:'Finland'},provider:{'@type':'Organization',name:'Komplyint Oy',url:canonicalHost,email:contactEmail,identifier:'3588595-3'},url:canonical }
  const breadcrumbs={ '@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:lang==='fi'?'Etusivu':'Home',item:canonicalHost+(lang==='en'?'/en':'/')},{'@type':'ListItem',position:2,name:lang==='fi'?'Palvelut':'Services',item:canonicalHost+prefix+'/services'},{'@type':'ListItem',position:3,name:s.title,item:canonical}] }
  const phases=lang==='fi'?[
    {t:'Kuvaile tehtävä',d:'Selvitämme nykytilan, käytössä olevat työkalut ja toivotun lopputuloksen.'},
    {t:'Rajataan työ',d:'Sovimme tarkasti sisällön, hinnan, vastuut ja tarkistettavan lopputuloksen.'},
    {t:'Toteutus ja tarkistus',d:'Hyödynnämme ensisijaisesti olemassa olevia ratkaisuja ja testaamme toimituksen.'},
    {t:'Luovutus',d:'Saat tulokset sekä tarvittavat ylläpito- ja käyttöohjeet.'}
  ]:[
    {t:'Describe the task',d:'We review the current process, available tools and desired outcome.'},
    {t:'Agree a scope',d:'We agree on what will be delivered, the price, responsibilities and acceptance.'},
    {t:'Build and verify',d:'We reuse suitable existing solutions and test the agreed work.'},
    {t:'Handover',d:'You receive deliverables with practical usage and maintenance notes.'}
  ]
  return <article className="qh-service-page"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify([schema,breadcrumbs]).replace(/</g,'\\u003c')}}/>
    <div className="qh-inner-hero">
      <div className="kc-shell qh-inner-grid">
        <div><nav className="qh-breadcrumb" aria-label={lang==='fi'?'Murupolku':'Breadcrumb'}><Link href={prefix||'/'}>{lang==='fi'?'Etusivu':'Home'}</Link><span aria-hidden="true">/</span><Link href={prefix+'/services'}>{label}</Link><span aria-hidden="true">/</span><span aria-current="page">{s.title}</span></nav>
          <p className="kc-eyebrow">{lang==='fi'?'PALVELU':'SERVICE'} {String(index+1).padStart(2,'0')} / 06</p>
          <h1>{s.title}</h1>
          <p className="qh-inner-lead">{s.intro}</p>
          <Link className="kc-button kc-button-primary" href={prefix+'/contact?service='+encodeURIComponent(slug)}>{touch} <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="qh-art-panel"><FoldMotif id={index}/><span className="qh-art-caption">{artTitles[lang][index]}</span></div>
      </div>
    </div>
    <section className="kc-section"><div className="kc-shell qh-detail-columns">
      <div><p className="kc-eyebrow">01 / {overview}</p><h2>{overview}</h2><ul className="qh-service-list">{s.examples.map(x=><li key={x}>{x}</li>)}</ul></div>
      <aside className="qh-scope-card"><div><p className="kc-eyebrow">02 / {deliver}</p><h3>{deliver}</h3><p>{s.deliverable}</p></div><div><p className="kc-eyebrow">03 / {limits}</p><h3>{limits}</h3><p>{s.boundaries}</p></div><p className="qh-tool-caption">{s.tools}</p></aside>
    </div></section>
    <section className="kc-section kc-muted-section"><div className="kc-shell"><div className="kc-intro"><p className="kc-eyebrow">04 / {method}</p><h2>{method}</h2></div><div className="qh-phase-grid">{phases.map((p,i)=><div className="qh-phase" key={p.t}><span>{String(i+1).padStart(2,'0')}</span><h3>{p.t}</h3><p>{p.d}</p></div>)}</div></div></section>
    <div className="kc-shell qh-service-bottom"><Link className="kc-text-link" href={prefix+'/services'}>← {next}</Link><Link className="kc-button kc-button-primary" href={prefix+'/contact?service='+slug}>{touch} <span aria-hidden="true">↗</span></Link></div>
  </article>
}
