import Link from 'next/link'
import { services, serviceSlugs, canonicalHost, contactEmail, type Lang } from '@/lib/commercial'
import { localizedPath } from '@/lib/i18n'
import { ui } from '@/lib/i18n-ui'

function FoldMotif({id,label}:{id:number;label:string}) {
  return <svg className="qh-fold-art" viewBox="0 0 440 360" role="img" aria-label={label}>
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
  const service=services[lang][index],slug=serviceSlugs[index],l=ui[lang].serviceDetail
  const home=localizedPath('/',lang),catalogue=localizedPath('/services',lang)
  const detail=localizedPath('/services/'+slug,lang),contact=localizedPath('/contact',lang)
  const canonical=canonicalHost+detail
  const schema={ '@context':'https://schema.org','@type':'Service',name:service.title,description:service.intro,serviceType:service.title,inLanguage:lang,areaServed:{'@type':'Country',name:'Finland'},provider:{'@type':'Organization',name:'Komplyint Oy',url:canonicalHost,email:contactEmail,identifier:'3588595-3'},url:canonical }
  const breadcrumbs={ '@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:l.home,item:canonicalHost+home},{'@type':'ListItem',position:2,name:l.services,item:canonicalHost+catalogue},{'@type':'ListItem',position:3,name:service.title,item:canonical}]}
  return <article className="qh-service-page"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify([schema,breadcrumbs]).replace(/</g,'\\u003c')}}/>
    <div className="qh-inner-hero">
      <div className="kc-shell qh-inner-grid">
        <div><nav className="qh-breadcrumb" aria-label={l.breadcrumb}><Link href={home}>{l.home}</Link><span aria-hidden="true">/</span><Link href={catalogue}>{l.services}</Link><span aria-hidden="true">/</span><span aria-current="page">{service.title}</span></nav>
          <p className="kc-eyebrow">{l.service} {String(index+1).padStart(2,'0')} / 06</p>
          <h1>{service.title}</h1>
          <p className="qh-inner-lead">{service.intro}</p>
          <Link className="kc-button kc-button-primary" href={contact+'?service='+encodeURIComponent(slug)}>{l.touch} <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="qh-art-panel"><FoldMotif id={index} label={l.graphic}/><span className="qh-art-caption">{l.artTitles[index]}</span></div>
      </div>
    </div>
    <section className="kc-section"><div className="kc-shell qh-detail-columns">
      <div><p className="kc-eyebrow">01 / {l.overview}</p><h2>{l.overview}</h2><ul className="qh-service-list">{service.examples.map(example=><li key={example}>{example}</li>)}</ul></div>
      <aside className="qh-scope-card"><div><p className="kc-eyebrow">02 / {l.deliver}</p><h3>{l.deliver}</h3><p>{service.deliverable}</p></div><div><p className="kc-eyebrow">03 / {l.limits}</p><h3>{l.limits}</h3><p>{service.boundaries}</p></div><p className="qh-tool-caption">{service.tools}</p></aside>
    </div></section>
    <section className="kc-section kc-muted-section"><div className="kc-shell"><div className="kc-intro"><p className="kc-eyebrow">04 / {l.method}</p><h2>{l.method}</h2></div><div className="qh-phase-grid">{l.phases.map((phase,i)=><div className="qh-phase" key={phase.title}><span>{String(i+1).padStart(2,'0')}</span><h3>{phase.title}</h3><p>{phase.description}</p></div>)}</div></div></section>
    <div className="kc-shell qh-service-bottom"><Link className="kc-text-link" href={catalogue}>← {l.next}</Link><Link className="kc-button kc-button-primary" href={contact+'?service='+slug}>{l.touch} <span aria-hidden="true">↗</span></Link></div>
  </article>
}
