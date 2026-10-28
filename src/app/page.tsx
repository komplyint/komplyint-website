'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

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
import ContactAddressLinks from '@/components/ContactAddressLinks'
import VideoHero from '@/components/VideoHero'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { ui } from '@/lib/i18n-ui'
import { Process, Trust, About, CTA } from '@/components/MarketingSections'
import { getLocaleFromPath, stripLocale, localizedPath, languages } from '@/lib/i18n'
import { pathFor } from '@/lib/site-route'

function pageFromPath(path: string): Page {
  const part = stripLocale(path).split('/').filter(Boolean)[0]
  return part === 'services' || part === 'software' || part === 'work' || part === 'about' || part === 'contact' || part === 'privacy' || part === 'accessibility' ? part : 'home'
}

export default function KomplyintWebsite() {
  const pathname = usePathname() || '/'
  const lang: Lang = getLocaleFromPath(pathname)
  const page = pageFromPath(pathname)
  const t = content[lang]
  const l = ui[lang]
  const pathParts=stripLocale(pathname).split('/').filter(Boolean)
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


  return (
    <div className="kc-root">
      <a href="#main-content" className="kc-skip">{l.skip}</a>
      <div className="kc-topbar">
        <div className="kc-shell kc-topbar-inner">
          <span><span className="kc-small-dot" /> {t.tagline}</span>
          <span>{t.footer}</span>
        </div>
      </div>
      <header className={menuOpen ? "kc-header qh-menu-open" : "kc-header"}>
        <div className="kc-shell kc-header-row">
          <a href={pathFor(lang, 'home')} className="kc-logo-link" aria-label={l.logoHome}>
            <img src="/logo.svg" className="kc-logo" alt="" aria-hidden="true" />
          </a>
          {menuOpen&&<div className="qh-menu-backdrop" aria-hidden="true" onClick={()=>setMenuOpen(false)}/>}
          <nav id="komplyint-primary-navigation" ref={menuRef}
            className={menuOpen ? 'kc-nav is-open' : 'kc-nav'}
            role={menuOpen?'dialog':undefined}
            aria-modal={menuOpen?'true':undefined}
            aria-label={l.navigation}>
            <div className="qh-mobile-menu-head"><span>Komplyint Oy</span><button className="qh-menu-close" type="button" onClick={()=>setMenuOpen(false)}>{l.close} <span aria-hidden="true">×</span></button></div>
            {navPages.map((item) => <span className="qh-nav-entry" key={item}><a href={pathFor(lang, item)} className={page === item ? 'is-current' : ''} aria-current={page === item ? 'page' : undefined}>{t.navigation[item]}</a>{item==='services'&&<details className="qh-service-menu"><summary aria-label={l.categories}>⌄</summary><div className="qh-mega"><span className="qh-mega-eyebrow">{l.chooseService}</span>{services[lang].map((svc,i)=><a key={serviceSlugs[i]} href={pathFor(lang,'services')+'/'+serviceSlugs[i]}><b>{String(i+1).padStart(2,'0')}</b><span>{svc.title}</span><span aria-hidden="true">↗</span></a>)}</div></details>}</span>)}
            <div className="qh-mobile-services"><p>{l.serviceAreas}</p>{services[lang].map((svc,i)=><a href={pathFor(lang,'services')+'/'+serviceSlugs[i]} key={serviceSlugs[i]}>{svc.title}<Arrow/></a>)}</div>
            <div className="qh-mobile-utilities">
              <LanguageSwitcher locale={lang} pathname={pathname}/>
              <label>{l.appearance}<select value={appearance} onChange={e=>setTheme(e.target.value as 'dark'|'light'|'system')}><option value="dark">{l.dark}</option><option value="light">{l.light}</option><option value="system">{l.system}</option></select></label>
            </div>
          </nav>
          <div className="kc-actions">
            <LanguageSwitcher locale={lang} pathname={pathname}/>
            
            <a href={pathFor(lang,'contact')} className="kc-header-cta">{t.contactButton}<Arrow /></a>
            <button className="kc-mobile-toggle" ref={menuTrigger} type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="komplyint-primary-navigation" aria-label={t.navigation.menu}><span /><span /><span /></button>
          </div>
        </div>
        <noscript><nav className="qh-nojs-nav" aria-label={l.noScriptNav}>{navPages.map(item=><a href={pathFor(lang,item)} key={item}>{t.navigation[item]}</a>)}<a href={pathFor(lang,'services')}>{t.explore}</a>{languages.map(language=><a key={language.code} href={localizedPath(pathname,language.code)} hrefLang={language.code} lang={language.code}><span aria-hidden="true">{language.flag}</span> {language.name}</a>)}</nav></noscript>
      </header>

      <main id="main-content" tabIndex={-1}>
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
          <div className="kc-footer-brand"><img src="/logo.svg" alt="Komplyint Oy" /><p>{t.footerDescription}</p></div>
          <div className="kc-footer-links"><strong>{l.site}</strong>{[...navPages,'software' as Page,'privacy' as Page,'accessibility' as Page].map(item=><a key={item} href={pathFor(lang,item)}>{t.navigation[item]}</a>)}<a href="/downloads/Komplyint_Service_Documents.zip" download>{l.downloadBrochures}</a></div>
          <div className="kc-footer-links"><strong>{l.contact}</strong><a href="mailto:info@komplyint.fi">info@komplyint.fi</a><a href={pathFor(lang,'contact')}>{t.contactButton}</a><span>{l.locationName}</span><span>D‑U‑N‑S® {duns}</span><label className="qh-appearance"><span>{l.appearance}</span><select aria-label={l.appearance} value={appearance} onChange={e=>setTheme(e.target.value as 'dark'|'light'|'system')}><option value="dark">{l.dark}</option><option value="light">{l.light}</option><option value="system">{l.system}</option></select></label></div>
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
        <div className="kc-hero-side"><div className="kc-side-marker">K / 01</div><div className="kc-hero-side-label">{ui[lang].heroPrinciples}</div><span>{t.hero.point1}</span><span>{t.hero.point2}</span><span>{t.hero.point3}</span></div>
      </div>
      <VideoHero lang={lang}/>
      <div className="kc-hero-shade" />
      <div className="kc-hero-edge" />
    </section>

    <section className="kc-section kc-section-intro"><div className="kc-shell">
      <SectionIntro {...t.intro} />
      <div className="kc-service-grid">{services[lang].map((service,i)=><ServiceCard key={service.title} lang={lang} service={service} index={i}/>)}</div>
      <div className="kc-moreline"><span>{ui[lang].otherServices}</span><a href={pathFor(lang,'contact')}>{t.contactButton} <Arrow /></a></div>
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
  return <section className="kc-section kc-examples"><div className="kc-shell"><SectionIntro eyebrow={t.eyebrow} title={t.title} text={t.disclaimer}/><div className="kc-example-grid">{t.cases.map((c,i)=><article key={c.num} className="kc-example"><span className="kc-example-num">{c.num}</span><h3>{c.title}</h3><WorkExampleArt index={i}/><div className="kc-example-line"><span>{ui[lang].before}</span><p>{c.before}</p></div><div className="kc-example-line"><span>{ui[lang].after}</span><p>{c.after}</p></div></article>)}</div></div></section>
}
function ServicesPage({lang}:{lang:Lang}) {
  const t=content[lang]
  return <><div className="kc-page-top"><div className="kc-shell"><p className="kc-eyebrow">{t.area.eyebrow}</p><h1>{t.area.title}</h1><p>{t.area.text}</p></div></div><section className="kc-section kc-muted-section kc-services-detail" id="service-explorer"><div className="kc-shell"><ServiceExplorer lang={lang} showIntro={false}/></div></section><Process lang={lang}/><Trust lang={lang}/><PublicBrochures lang={lang}/><CTA lang={lang}/></>
}
function SoftwarePage({lang}:{lang:Lang}) {
  const t=content[lang].software
  return <><div className="kc-page-top"><div className="kc-shell"><p className="kc-eyebrow">{t.eyebrow}</p><h1>{t.title}</h1><p>{t.lead}</p><a className="kc-button kc-button-primary" href={pathFor(lang,'contact')}>{content[lang].contactButton}<Arrow /></a></div></div>
    <section className="kc-section"><div className="kc-shell"><div className="kc-software-grid">{t.items.map((s,i)=><article key={s.title} className="kc-software-card"><span>{String(i+1).padStart(2,'0')}</span><h2>{s.title}</h2><p>{s.body}</p></article>)}</div><div className="kc-limit"><h3>{t.limitTitle}</h3><p>{t.limit}</p></div></div></section>
    <section className="kc-section kc-muted-section"><div className="kc-shell kc-product"><div><p className="kc-eyebrow">{ui[lang].productDevelopment}</p><h2>{t.productTitle}</h2><p>{t.productText}</p></div><a href="https://floently.com/learn" target="_blank" rel="noopener noreferrer" className="kc-text-link">{t.productLink}<Arrow /></a></div></section><CTA lang={lang}/></>
}
function ContactPage({lang}:{lang:Lang}) {
  const t=content[lang].contactPage
  return <><div className="kc-page-top"><div className="kc-shell"><p className="kc-eyebrow">{t.eyebrow}</p><h1>{t.title}</h1><p>{t.lead}</p></div></div>
    <section className="kc-section"><div className="kc-shell kc-contact-grid"><div className="kc-contact-side"><p className="kc-eyebrow">{t.action}</p><h2>Komplyint Oy</h2><p>{content[lang].footer}</p><p>{ui[lang].locationName}</p><a className="kc-text-link" href="mailto:info@komplyint.fi">info@komplyint.fi<Arrow /></a><ContactAddressLinks lang={lang}/><div className="kc-contact-note">{t.note}</div></div>
    <ContactForm lang={lang}/></div></section></>
}

function PrivacyPage({lang}:{lang:Lang}) {
  const t=content[lang].privacyPage
  return <><div className="kc-page-top"><div className="kc-shell"><p className="kc-eyebrow">{t.eyebrow}</p><h1>{t.title}</h1><p>{t.lead}</p></div></div><section className="kc-section"><div className="kc-shell kc-privacy-list">{t.sections.map((s,i)=><article key={s.title}><span>{String(i+1).padStart(2,'0')}</span><div><h2>{s.title}</h2><p>{s.body}</p></div></article>)}</div></section></>
}


function WorkPage({lang}:{lang:Lang}){
  const t=content[lang].impact
  return <><section className="kc-page-top qh-inner-landing"><div className="kc-shell"><p className="kc-eyebrow">{t.eyebrow}</p><h1>{ui[lang].workTitle}</h1><p>{ui[lang].workLead}</p></div></section><Examples lang={lang}/><CTA lang={lang}/></>
}
function AboutPage({lang}:{lang:Lang}){
  const a=content[lang].about
  const l=ui[lang]
  return <><section className="kc-page-top qh-inner-landing"><div className="kc-shell"><p className="kc-eyebrow">{l.aboutPageLabel}</p><h1>{l.aboutPageTitle}</h1><p>{a.text}</p></div></section>
    <section className="kc-section"><div className="kc-shell qh-about-detail"><div><p className="kc-eyebrow">{l.whyUs}</p><h2>{a.title}</h2><p>{l.whyText}</p></div>
    <div className="qh-company-facts"><h3>Komplyint Oy</h3><dl><div><dt>{l.businessId}</dt><dd>3588595-3</dd></div><div><dt>D‑U‑N‑S®</dt><dd>{duns}</dd></div><div><dt>{l.location}</dt><dd>{l.locationValue}</dd></div><div><dt>{l.contactLabel}</dt><dd><a href={'mailto:'+contactEmail}>{contactEmail}</a></dd></div></dl></div>
    </div></section><Process lang={lang}/><CTA lang={lang}/></>
}

function AccessibilityPage({lang}:{lang:Lang}){
  const a=ui[lang].accessibility
  return <><section className="kc-page-top qh-inner-landing"><div className="kc-shell"><p className="kc-eyebrow">{a.label}</p><h1>{a.title}</h1><p>{a.lead}</p></div></section>
    <section className="kc-section"><div className="kc-shell qh-accessibility-text">
      <h2>{a.doing}</h2><p>{a.doingText}</p>
      <h2>{a.feedback}</h2><p>{a.feedbackText} <a href={'mailto:'+contactEmail}>{contactEmail}</a>.</p>
      <h2>{a.review}</h2><p>{a.reviewText}</p>
    </div></section></>
}
