'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { navPages, services, content, serviceSlugs, contactEmail, duns, type Page, type Lang } from '@/lib/commercial'
import ServiceDetail from '@/components/ServiceDetail'
import Arrow from '@/components/Arrow'
import FeaturedWork from '@/components/FeaturedWork'
import WorkExampleArt from '@/components/WorkExampleArt'
import PublicBrochures from '@/components/PublicBrochures'
import ServiceCard from '@/components/ServiceCard'
import SectionIntro from '@/components/SectionIntro'
import ServiceExplorer from '@/components/ServiceExplorer'
import ContactForm from '@/components/ContactForm'
import VideoHero from '@/components/VideoHero'
import { pathFor } from '@/lib/site-route'

function pageFromPath(path: string): Page {
  const part = path.replace(/^\/en(?=\/|$)/, '').split('/').filter(Boolean)[0]
  return part === 'services' || part === 'software' || part === 'work' || part === 'about' || part === 'contact' || part === 'privacy' || part === 'accessibility' ? part : 'home'
}

export default function KomplyintWebsite() {
  const pathname = usePathname() || '/'
  const router = useRouter()
  const lang: Lang = pathname.startsWith('/en') ? 'en' : 'fi'
  const page = pageFromPath(pathname)
  const t = content[lang]
  const pathParts=pathname.replace(/^\/en(?=\/|$)/,'').split('/').filter(Boolean)
  const serviceIndex=page==='services' && pathParts.length===2 ? serviceSlugs.indexOf(pathParts[1] as typeof serviceSlugs[number]) : -1
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef=useRef<HTMLElement>(null)
  const menuTrigger=useRef<HTMLButtonElement>(null)
  const [appearance, setAppearance] = useState<'dark'|'light'|'system'>('system')
  useEffect(() => {
    let next:'dark'|'light'|'system'='system'
    try { const saved=window.localStorage.getItem('komplyint-theme');if(saved==='dark'||saved==='light'||saved==='system')next=saved } catch {}
    setAppearance(next)
  }, [])
  useEffect(() => { setMenuOpen(false) }, [pathname])
  useEffect(()=>{
    if(!menuOpen)return
    const previousOverflow=document.body.style.overflow
    const main=document.getElementById('main-content')
    const footer=document.querySelector('footer.kc-footer')
    const mainAlreadyInert=main?.hasAttribute('inert')
    const footerAlreadyInert=footer?.hasAttribute('inert')
    main?.setAttribute('inert','')
    footer?.setAttribute('inert','')
    document.body.style.overflow='hidden'
    menuRef.current?.querySelector<HTMLButtonElement>('.qh-menu-close')?.focus()
    function onKeyDown(event:KeyboardEvent){
      if(event.key==='Escape'){event.preventDefault();setMenuOpen(false);return}
      if(event.key!=='Tab'||!menuRef.current)return
      const focusables=Array.from(menuRef.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),select,summary'))
        .filter(node=>node.getClientRects().length>0)
      if(!focusables.length)return
      const first=focusables[0],last=focusables[focusables.length-1]
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
    }
    document.addEventListener('keydown',onKeyDown)
    return()=>{
      document.removeEventListener('keydown',onKeyDown)
      document.body.style.overflow=previousOverflow
      if(!mainAlreadyInert)main?.removeAttribute('inert')
      if(!footerAlreadyInert)footer?.removeAttribute('inert')
      menuTrigger.current?.focus()
    }
  },[menuOpen])
  useEffect(() => {
    const media=window.matchMedia('(prefers-color-scheme: dark)')
    function apply(){
      const dark=appearance==='dark'||(appearance==='system'&&media.matches)
      document.documentElement.classList.toggle('dark',dark)
      document.documentElement.style.colorScheme=dark?'dark':'light'
    }
    apply()
    media.addEventListener('change',apply)
    return()=>media.removeEventListener('change',apply)
  },[appearance])
  function setTheme(next:'dark'|'light'|'system'){
    setAppearance(next)
    try{window.localStorage.setItem('komplyint-theme',next)}catch{}
  }
  function switchLanguage(){
    if(page==='contact'){
      const form=document.querySelector<HTMLFormElement>('form.kc-form')
      const hasDraft=!!form&&Array.from(form.querySelectorAll<HTMLInputElement|HTMLTextAreaElement>('input:not([type=hidden]),textarea'))
        .some(field=>field.value.trim().length>0)
      if(hasDraft&&!window.confirm(lang==='fi'?'Lomakkeen keskeneräiset tiedot voivat hävitä. Vaihdetaanko kieli?':'Your unsent form fields may be lost. Switch language?'))return
    }
    const target=(lang==='fi'?'/en'+pathname:pathname.replace(/^\/en(?=\/|$)/,''))||'/'
    router.push(target+(typeof window!=='undefined'?window.location.search:''))
  }

  return (
    <div className="kc-root">
      <a href="#main-content" className="kc-skip">{lang === 'fi' ? 'Siirry sisältöön' : 'Skip to content'}</a>
      <div className="kc-topbar">
        <div className="kc-shell kc-topbar-inner">
          <span><span className="kc-small-dot" /> {t.tagline}</span>
          <span>{t.footer}</span>
        </div>
      </div>
      <header className={menuOpen ? "kc-header qh-menu-open" : "kc-header"}>
        <div className="kc-shell kc-header-row">
          <a href={pathFor(lang, 'home')} className="kc-logo-link" aria-label="Komplyint Oy">
            <img src="/logo.svg" className="kc-logo" alt="Komplyint Oy" />
          </a>
          {menuOpen&&<div className="qh-menu-backdrop" aria-hidden="true" onClick={()=>setMenuOpen(false)}/>}
          <nav id="komplyint-primary-navigation" ref={menuRef}
            className={menuOpen ? 'kc-nav is-open' : 'kc-nav'}
            role={menuOpen?'dialog':undefined}
            aria-modal={menuOpen?'true':undefined}
            aria-label={lang === 'fi' ? 'Päänavigaatio' : 'Main navigation'}>
            <div className="qh-mobile-menu-head"><span>Komplyint Oy</span><button className="qh-menu-close" type="button" onClick={()=>setMenuOpen(false)}>{lang==='fi'?'Sulje':'Close'} <span aria-hidden="true">×</span></button></div>
            {navPages.map((item) => <span className="qh-nav-entry" key={item}><a href={pathFor(lang, item)} className={page === item ? 'is-current' : ''} aria-current={page === item ? 'page' : undefined}>{t.navigation[item]}</a>{item==='services'&&<details className="qh-service-menu"><summary aria-label={lang==='fi'?'Näytä palveluluokat':'Show service categories'}>⌄</summary><div className="qh-mega"><span className="qh-mega-eyebrow">{lang==='fi'?'VALITSE PALVELU':'CHOOSE A SERVICE'}</span>{services[lang].map((svc,i)=><a key={serviceSlugs[i]} href={pathFor(lang,'services')+'/'+serviceSlugs[i]}><b>{String(i+1).padStart(2,'0')}</b><span>{svc.title}</span><span aria-hidden="true">↗</span></a>)}</div></details>}</span>)}
            <div className="qh-mobile-services"><p>{lang==='fi'?'Palvelualueet':'Service areas'}</p>{services[lang].map((svc,i)=><a href={pathFor(lang,'services')+'/'+serviceSlugs[i]} key={serviceSlugs[i]}>{svc.title}<Arrow/></a>)}</div>
            <div className="qh-mobile-utilities">
              <button type="button" onClick={switchLanguage}>{lang==='fi'?'English / EN':'Suomi / FI'}</button>
              <label>{lang==='fi'?'Ulkoasu':'Appearance'}<select value={appearance} onChange={e=>setTheme(e.target.value as 'dark'|'light'|'system')}><option value="dark">{lang==='fi'?'Tumma':'Dark'}</option><option value="light">{lang==='fi'?'Vaalea':'Light'}</option><option value="system">{lang==='fi'?'Järjestelmän mukaan':'System'}</option></select></label>
            </div>
          </nav>
          <div className="kc-actions">
            <button className="kc-language" type="button" onClick={switchLanguage} aria-label={lang === 'fi' ? 'EN — Switch to English' : 'FI — Vaihda suomeksi'}>{lang === 'fi' ? 'EN' : 'FI'}</button>
            
            <a href={pathFor(lang,'contact')} className="kc-header-cta">{t.contactButton}<Arrow /></a>
            <button className="kc-mobile-toggle" ref={menuTrigger} type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="komplyint-primary-navigation" aria-label={t.navigation.menu}><span /><span /><span /></button>
          </div>
        </div>
        <noscript><nav className="qh-nojs-nav" aria-label={lang==='fi'?'Päänavigaatio ilman JavaScriptiä':'Navigation without JavaScript'}>{navPages.map(item=><a href={pathFor(lang,item)} key={item}>{t.navigation[item]}</a>)}<a href={pathFor(lang,'services')}>{t.explore}</a></nav></noscript>
      </header>

      <main id="main-content">
        {page === 'home' && <Home lang={lang} />}
        {page === 'services' && (serviceIndex>=0?<ServiceDetail lang={lang} index={serviceIndex}/>:<ServicesPage lang={lang} />)}
        {page === 'work' && <WorkPage lang={lang} />}
        {page === 'about' && <AboutPage lang={lang} />}
        {page === 'accessibility' && <AccessibilityPage lang={lang} />}
        {page === 'software' && <SoftwarePage lang={lang} />}
        {page === 'contact' && <ContactPage lang={lang} />}
        {page === 'privacy' && <PrivacyPage lang={lang} />}
      </main>
      <footer className="kc-footer">
        <div className="kc-shell kc-footer-top">
          <div className="kc-footer-brand"><img src="/logo.svg" alt="Komplyint Oy" /><p>{t.about.text}</p></div>
          <div className="kc-footer-links"><strong>{lang === 'fi' ? 'Sivusto' : 'Explore'}</strong>{[...navPages,'software' as Page,'privacy' as Page,'accessibility' as Page].map(item=><a key={item} href={pathFor(lang,item)}>{t.navigation[item]}</a>)}<a href="/downloads/Komplyint_Service_Documents.zip" download>{lang==='fi'?'Lataa palveluesitteet (ZIP)':'Download service brochures (ZIP)'}</a></div>
          <div className="kc-footer-links"><strong>{lang === 'fi' ? 'Yhteys' : 'Get in touch'}</strong><a href="mailto:info@komplyint.fi">info@komplyint.fi</a><a href={pathFor(lang,'contact')}>{t.contactButton}</a><span>Finland · EU</span><span>D‑U‑N‑S® {duns}</span><label className="qh-appearance"><span>{lang==='fi'?'Ulkoasu':'Appearance'}</span><select aria-label={lang==='fi'?'Ulkoasu':'Appearance'} value={appearance} onChange={e=>setTheme(e.target.value as 'dark'|'light'|'system')}><option value="dark">{lang==='fi'?'Tumma':'Dark'}</option><option value="light">{lang==='fi'?'Vaalea':'Light'}</option><option value="system">{lang==='fi'?'Järjestelmä':'System'}</option></select></label></div>
        </div>
        <div className="kc-shell kc-footer-bottom"><span>© {new Date().getFullYear()} {t.footer}</span><span>{t.footerNote}</span></div>
      </footer>
    </div>
  )
}

function Home({lang}:{lang:Lang}) {
  const t = content[lang]
  return <>
    <section className="kc-hero">
      <div className="kc-shell kc-hero-layout">
        <div className="kc-hero-copy">
          <p className="kc-hero-tag">{t.hero.label}</p>
          <h1>{t.hero.title}</h1>
          <p className="kc-hero-lead">{t.hero.text}</p>
          <div className="kc-hero-buttons"><a className="kc-button kc-button-primary" href={pathFor(lang,'contact')}>{t.contactButton}<Arrow /></a><a className="kc-button kc-button-ghost" href={pathFor(lang,'services')}>{t.explore}<span aria-hidden="true">↓</span></a></div>
        </div>
        <div className="kc-hero-side"><div className="kc-side-marker">K / 01</div><div className="kc-hero-side-label">{lang === 'fi' ? 'TYÖN PERIAATTEET' : 'DELIVERY PRINCIPLES'}</div><span>{t.hero.point1}</span><span>{t.hero.point2}</span><span>{t.hero.point3}</span></div>
      </div>
      <VideoHero lang={lang}/>
      <div className="kc-hero-shade" />
      <div className="kc-hero-edge" />
    </section>

    <section className="kc-section kc-section-intro"><div className="kc-shell">
      <SectionIntro {...t.intro} />
      <div className="kc-service-grid">{services[lang].map((service,i)=><ServiceCard key={service.title} lang={lang} service={service} index={i}/>)}</div>
      <div className="kc-moreline"><span>{lang === 'fi' ? 'Lisäksi: ohjelmistotestaus, laadunvarmistus ja digitaalinen toimistotuki.' : 'Also available: software testing, quality assurance and digital office support.'}</span><a href={pathFor(lang,'services')}>{t.explore} <Arrow /></a></div>
    </div></section>

    <FeaturedWork lang={lang}/>
    <Process lang={lang}/>
    <Trust lang={lang}/>
    <About lang={lang}/>
    <CTA lang={lang}/>
  </>
}

function Examples({lang}:{lang:Lang}) {
  const t=content[lang].impact
  return <section className="kc-section kc-examples"><div className="kc-shell"><SectionIntro eyebrow={t.eyebrow} title={t.title} text={t.disclaimer}/><div className="kc-example-grid">{t.cases.map((c,i)=><article key={c.num} className="kc-example"><span className="kc-example-num">{c.num}</span><h3>{c.title}</h3><WorkExampleArt index={i}/><div className="kc-example-line"><span>{lang === 'fi'?'LÄHTÖTILANNE':'BEFORE'}</span><p>{c.before}</p></div><div className="kc-example-line"><span>{lang === 'fi'?'TAVOITE':'AFTER'}</span><p>{c.after}</p></div></article>)}</div></div></section>
}
function Process({lang}:{lang:Lang}) {
  const t=content[lang].process
  return <section className="kc-section kc-process"><div className="kc-shell"><SectionIntro eyebrow={t.eyebrow} title={t.title}/><div className="kc-steps">{t.steps.map((s,i)=><div className="kc-step" key={s.title}><div className="kc-step-no">{String(i+1).padStart(2,'0')}</div><h3>{s.title}</h3><p>{s.body}</p></div>)}</div></div></section>
}
function Trust({lang}:{lang:Lang}) {
  const t=content[lang].trust
  return <section className="kc-section kc-muted-section"><div className="kc-shell kc-values"><SectionIntro eyebrow={t.eyebrow} title={t.title}/><div className="kc-values-grid">{t.items.map((s,i)=><div className="kc-value" key={s.title}><span>0{i+1}</span><div><h3>{s.title}</h3><p>{s.body}</p></div></div>)}</div></div></section>
}
function About({lang}:{lang:Lang}) {const a=content[lang].about;return <section className="kc-section kc-about"><div className="kc-shell kc-about-layout"><div><p className="kc-eyebrow">{lang==='fi'?'YRITYKSESTÄ':'ABOUT OUR COMPANY'}</p><h2>{a.title}</h2></div><p>{a.text}</p></div></section>}
function CTA({lang}:{lang:Lang}) {const c=content[lang].cta;return <section className="kc-cta"><div className="kc-shell kc-cta-inner"><div><p className="kc-eyebrow">{c.eyebrow}</p><h2>{c.title}</h2><p>{c.text}</p></div><a className="kc-button kc-button-light" href={pathFor(lang,'contact')}>{c.button}<Arrow /></a></div></section>}

function ServicesPage({lang}:{lang:Lang}) {
  const t=content[lang]
  return <><div className="kc-page-top"><div className="kc-shell"><p className="kc-eyebrow">{t.area.eyebrow}</p><h1>{t.area.title}</h1><p>{t.area.text}</p></div></div><section className="kc-section kc-muted-section kc-services-detail" id="service-explorer"><div className="kc-shell"><ServiceExplorer lang={lang} showIntro={false}/></div></section><Process lang={lang}/><Trust lang={lang}/><PublicBrochures lang={lang}/><CTA lang={lang}/></>
}
function SoftwarePage({lang}:{lang:Lang}) {
  const t=content[lang].software
  return <><div className="kc-page-top"><div className="kc-shell"><p className="kc-eyebrow">{t.eyebrow}</p><h1>{t.title}</h1><p>{t.lead}</p><a className="kc-button kc-button-primary" href={pathFor(lang,'contact')}>{content[lang].contactButton}<Arrow /></a></div></div>
    <section className="kc-section"><div className="kc-shell"><div className="kc-software-grid">{t.items.map((s,i)=><article key={s.title} className="kc-software-card"><span>{String(i+1).padStart(2,'0')}</span><h2>{s.title}</h2><p>{s.body}</p></article>)}</div><div className="kc-limit"><h3>{t.limitTitle}</h3><p>{t.limit}</p></div></div></section>
    <section className="kc-section kc-muted-section"><div className="kc-shell kc-product"><div><p className="kc-eyebrow">{lang==='fi'?'TUOTEKEHITYS':'PRODUCT DEVELOPMENT'}</p><h2>{t.productTitle}</h2><p>{t.productText}</p></div><a href="https://floently.com/learn" target="_blank" rel="noopener noreferrer" className="kc-text-link">{t.productLink}<Arrow /></a></div></section><CTA lang={lang}/></>
}
function ContactPage({lang}:{lang:Lang}) {
  const t=content[lang].contactPage
  return <><div className="kc-page-top"><div className="kc-shell"><p className="kc-eyebrow">{t.eyebrow}</p><h1>{t.title}</h1><p>{t.lead}</p></div></div>
    <section className="kc-section"><div className="kc-shell kc-contact-grid"><div className="kc-contact-side"><p className="kc-eyebrow">{t.action}</p><h2>Komplyint Oy</h2><p>{content[lang].footer}</p><p>Finland · European Union</p><a className="kc-text-link" href="mailto:info@komplyint.fi">info@komplyint.fi<Arrow /></a><div className="kc-contact-note">{t.note}</div></div>
    <ContactForm lang={lang}/></div></section></>
}

function PrivacyPage({lang}:{lang:Lang}) {
  const t=content[lang].privacyPage
  return <><div className="kc-page-top"><div className="kc-shell"><p className="kc-eyebrow">{t.eyebrow}</p><h1>{t.title}</h1><p>{t.lead}</p></div></div><section className="kc-section"><div className="kc-shell kc-privacy-list">{t.sections.map((s,i)=><article key={s.title}><span>{String(i+1).padStart(2,'0')}</span><div><h2>{s.title}</h2><p>{s.body}</p></div></article>)}</div></section></>
}


function WorkPage({lang}:{lang:Lang}){
  const t=content[lang].impact
  return <><section className="kc-page-top qh-inner-landing"><div className="kc-shell"><p className="kc-eyebrow">{t.eyebrow}</p><h1>{lang==='fi'?'Näin ratkaisu voi toimia.':'See how a solution can work.'}</h1><p>{lang==='fi'?'Tässä esitetyt skenaariot kuvaavat mahdollisia toimituksia kuvitteellisilla tiedoilla.':'These scenarios show possible deliverables using fictional information.'}</p></div></section><Examples lang={lang}/><CTA lang={lang}/></>
}
function AboutPage({lang}:{lang:Lang}){
  const a=content[lang].about
  const fi=lang==='fi'
  return <><section className="kc-page-top qh-inner-landing"><div className="kc-shell"><p className="kc-eyebrow">{fi?'YRITYS JA TOIMINTATAPA':'COMPANY AND APPROACH'}</p><h1>{fi?'Pienet ongelmat ansaitsevat hyvän ratkaisun.':'Small problems deserve thoughtful solutions.'}</h1><p>{a.text}</p></div></section>
    <section className="kc-section"><div className="kc-shell qh-about-detail"><div><p className="kc-eyebrow">{fi?'MIKSI TOIMIMME NÄIN':'OUR APPROACH'}</p><h2>{a.title}</h2><p>{fi?'Kuuntelemme, rajaamme tehtävän, käytämme olemassa olevia työkaluja ja toimitamme selkeän lopputuloksen. Emme väitä asiakkaalle valmiiksi sellaista, mitä ei ole todistettu.':'We listen, scope the task, reuse suitable existing tools and deliver a clear outcome. We do not claim work as completed before it is evidenced.'}</p></div>
    <div className="qh-company-facts"><h3>Komplyint Oy</h3><dl><div><dt>{fi?'Y-tunnus':'Business ID'}</dt><dd>3588595-3</dd></div><div><dt>D‑U‑N‑S®</dt><dd>{duns}</dd></div><div><dt>{fi?'Sijainti':'Location'}</dt><dd>Helsinki, Finland</dd></div><div><dt>{fi?'Yhteys':'Contact'}</dt><dd><a href={'mailto:'+contactEmail}>{contactEmail}</a></dd></div></dl></div>
    </div></section><Process lang={lang}/><CTA lang={lang}/></>
}
function AccessibilityPage({lang}:{lang:Lang}){
  const fi=lang==='fi'
  return <><section className="kc-page-top qh-inner-landing"><div className="kc-shell"><p className="kc-eyebrow">{fi?'SAAVUTETTAVUUS':'ACCESSIBILITY'}</p><h1>{fi?'Saavutettavuustiedot':'Accessibility information'}</h1>
    <p>{fi?'Pyrimme tekemään palveluistamme saavutettavia ja ymmärrettäviä mahdollisimman monelle.':'We work to make our website accessible and understandable to as many visitors as possible.'}</p></div></section>
    <section className="kc-section"><div className="kc-shell qh-accessibility-text">
      <h2>{fi?'Mitä teemme':'What we are doing'}</h2><p>{fi?'Kehitämme näppäimistökäyttöä, luettavuutta, liikkeen hallintaa, lomakepalautetta ja responsiivisuutta. Säännölliset testit eivät yksin muodosta virallista vaatimustenmukaisuusvakuutusta.':'We improve keyboard access, readable content, motion controls, form feedback and responsive layouts. Automated testing alone is not a formal accessibility conformance statement.'}</p>
      <h2>{fi?'Palaute ja vaihtoehtoinen tapa':'Feedback and alternative contact'}</h2><p>{fi?'Jos huomaat esteen tai tarvitset tietoa toisessa muodossa, kirjoita meille osoitteeseen':'If you encounter a barrier or need information in another format, contact'} <a href={'mailto:'+contactEmail}>{contactEmail}</a>.</p>
      <h2>{fi?'Arvioinnin tila':'Review status'}</h2><p>{fi?'Laaja WCAG 2.2 AA -arviointi on työn alla. Emme väitä virallista sertifiointia ennen asianmukaista tarkistusta.':'A full WCAG 2.2 AA review is in progress. We do not claim certification without the necessary independent review.'}</p>
    </div></section></>
}

