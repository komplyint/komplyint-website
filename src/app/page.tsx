'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { navPages, services, content, serviceSlugs, contactEmail, duns, type Page, type Lang } from '@/lib/commercial'
import ServiceDetail from '@/components/ServiceDetail'
import ServiceIcon from '@/components/ServiceIcon'

function pathFor(lang: Lang, page: Page): string {
  const prefix = lang === 'en' ? '/en' : ''
  return page === 'home' ? (prefix || '/') : prefix + '/' + page
}

function pageFromPath(path: string): Page {
  const part = path.replace(/^\/en(?=\/|$)/, '').split('/').filter(Boolean)[0]
  return part === 'services' || part === 'software' || part === 'work' || part === 'about' || part === 'contact' || part === 'privacy' || part === 'accessibility' ? part : 'home'
}

function Arrow({ light = false }: { light?: boolean }) {
  return <span className={light ? 'kc-arrow light' : 'kc-arrow'} aria-hidden="true">↗</span>
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
  const [appearance, setAppearance] = useState<'dark'|'light'|'system'>('dark')
  useEffect(() => {
    let next:'dark'|'light'|'system'='dark'
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

function SectionIntro({ eyebrow, title, text }: {eyebrow:string;title:string;text?:string}) {
  return <div className="kc-intro"><p className="kc-eyebrow">{eyebrow}</p><h2>{title}</h2>{text && <p className="kc-lead">{text}</p>}</div>
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
      <div className="kc-service-grid">{services[lang].map((s,i)=><a className="kc-service-tile" key={s.title} href={pathFor(lang,'services') + '/' + serviceSlugs[i]}><div className="kc-tile-top"><span>{String(i+1).padStart(2,'0')}</span><Arrow /></div><ServiceIcon index={i}/><h3>{s.title}</h3><p>{s.intro}</p></a>)}</div>
      <div className="kc-moreline"><span>{lang === 'fi' ? 'Lisäksi: ohjelmistotestaus, laadunvarmistus ja digitaalinen toimistotuki.' : 'Also available: software testing, quality assurance and digital office support.'}</span><a href={pathFor(lang,'services')}>{t.explore} <Arrow /></a></div>
    </div></section>

    <FeaturedWork lang={lang}/>
    <Process lang={lang}/>
    <Trust lang={lang}/>
    <About lang={lang}/>
    <CTA lang={lang}/>
  </>
}

function ServiceExplorer({lang, showIntro=true}:{lang:Lang;showIntro?:boolean}) {
  const [selected, setSelected] = useState(0)
  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get('service')
    const idx = value === null ? 0 : Number(value)
    if (Number.isInteger(idx) && idx >= 0 && idx < 6) setSelected(idx)
  }, [])
  const t = content[lang].area
  const s = services[lang][selected]
  return <>
    {showIntro && <SectionIntro {...t} />}
    <div className="kc-explorer">
      <div className="kc-explorer-tabs" role="tablist" aria-label={t.title}>
        {services[lang].map((item, i)=><button key={item.title} role="tab" type="button" aria-selected={selected === i} aria-controls="service-detail" className={selected === i ? 'kc-explorer-tab active' : 'kc-explorer-tab'} onClick={()=>setSelected(i)}><span>{String(i+1).padStart(2,'0')}</span><strong>{item.title}</strong><b aria-hidden="true">↗</b></button>)}
      </div>
      <div className="kc-detail" role="tabpanel" id="service-detail"><span className="kc-detail-index">{String(selected+1).padStart(2,'0')} / 06</span><h3>{s.title}</h3><p className="kc-detail-lead">{s.intro}</p>
        <div className="kc-detail-grid"><div><h4>{t.examples}</h4><ul>{s.examples.map(ex=><li key={ex}>{ex}</li>)}</ul></div><div className="kc-detail-side"><div><h4>{t.delivered}</h4><p>{s.deliverable}</p></div><div><h4>{t.boundaries}</h4><p>{s.boundaries}</p></div></div></div>
        <div className="kc-detail-bottom"><div><small>{t.tools}</small><p>{s.tools}</p></div><div className="qh-detail-actions"><a className="kc-text-link" href={pathFor(lang,'services')+'/'+serviceSlugs[selected]}>{lang==='fi'?'Lue lisää palvelusta':'View service detail'}<Arrow /></a><a className="kc-text-link" href={pathFor(lang,'contact')+'?service='+serviceSlugs[selected]}>{t.help}<Arrow /></a></div></div>
      </div>
    </div>
  </>
}

function Examples({lang}:{lang:Lang}) {
  const t=content[lang].impact
  return <section className="kc-section kc-examples"><div className="kc-shell"><SectionIntro eyebrow={t.eyebrow} title={t.title} text={t.disclaimer}/><div className="kc-example-grid">{t.cases.map(c=><article key={c.num} className="kc-example"><span className="kc-example-num">{c.num}</span><h3>{c.title}</h3><div className="kc-example-line"><span>{lang === 'fi'?'LÄHTÖTILANNE':'BEFORE'}</span><p>{c.before}</p></div><div className="kc-example-line"><span>{lang === 'fi'?'TAVOITE':'AFTER'}</span><p>{c.after}</p></div></article>)}</div></div></section>
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
  const [name,setName]=useState(''), [company,setCompany]=useState(''), [email,setEmail]=useState(''), [message,setMessage]=useState(''), [topic,setTopic]=useState('')
  useEffect(()=>{const slug=new URLSearchParams(window.location.search).get('service');const i=serviceSlugs.indexOf(slug as typeof serviceSlugs[number]);if(i>=0)setTopic(services[lang][i].title)},[lang])
  const [status,setStatus]=useState<'idle'|'sending'|'sent'|'error'>('idle')
  const [trap,setTrap]=useState('')
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if(trap) return
    setStatus('sending')
    try {
      const payload = {name,email,company,website:trap,message:((company ? (lang==='fi'?'Yritys: ':'Company: ')+company+'\n' : '')+(topic ? (lang==='fi'?'Aihe: ':'Topic: ')+topic+'\n\n' : '')+message)}
      const r = await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)})
      if(!r.ok) throw new Error('send failed')
      setName('');setCompany('');setEmail('');setMessage('');setTopic('');setStatus('sent')
    } catch {setStatus('error')}
  }
  return <><div className="kc-page-top"><div className="kc-shell"><p className="kc-eyebrow">{t.eyebrow}</p><h1>{t.title}</h1><p>{t.lead}</p></div></div>
    <section className="kc-section"><div className="kc-shell kc-contact-grid"><div className="kc-contact-side"><p className="kc-eyebrow">{t.action}</p><h2>Komplyint Oy</h2><p>{content[lang].footer}</p><p>Finland · European Union</p><a className="kc-text-link" href="mailto:info@komplyint.fi">info@komplyint.fi<Arrow /></a><div className="kc-contact-note">{t.note}</div></div>
    <form className="kc-form" onSubmit={submit}><div className="kc-form-two"><label>{t.formName}<input type="text" value={name} onChange={e=>setName(e.target.value)} maxLength={120} autoComplete="name" placeholder={lang==='fi'?'Nimesi':'Your name'}/></label><label>{lang==='fi'?'Yritys (valinnainen)':'Company (optional)'}<input type="text" value={company} onChange={e=>setCompany(e.target.value)} maxLength={140} autoComplete="organization" placeholder={lang==='fi'?'Yrityksen nimi':'Company name'}/></label><label>{t.formEmail}<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required maxLength={200} autoComplete="email" placeholder="name@company.fi"/></label></div>
    <label>{t.formService}<select value={topic} onChange={e=>setTopic(e.target.value)}><option value="">{t.select}</option>{services[lang].map(s=><option key={s.title} value={s.title}>{s.title}</option>)}<option value="Other">{t.other}</option></select></label>
    <label>{t.formMessage}<textarea rows={6} maxLength={4500} minLength={10} required value={message} onChange={e=>setMessage(e.target.value)} placeholder={lang==='fi'?'Kerro lyhyesti ongelma ja toivottu lopputulos.':'Describe the problem and desired outcome.'}/></label>
    <label className="kc-honeypot" aria-hidden="true">Website <input tabIndex={-1} autoComplete="off" value={trap} onChange={e=>setTrap(e.target.value)}/></label>
    <p className="kc-form-privacy">{t.privacy} <a href={pathFor(lang,'privacy')}>{content[lang].navigation.privacy}.</a></p>
    {status==='sent' && <p role="status" className="kc-form-success">{t.sent}</p>}
    {status==='error' && <p role="alert" className="kc-form-error">{t.fail} <a href="mailto:info@komplyint.fi">info@komplyint.fi</a></p>}
    <button className="kc-button kc-button-primary" disabled={status==='sending'} type="submit">{status==='sending'?t.sending:t.send}<Arrow /></button></form></div></section></>
}
function PrivacyPage({lang}:{lang:Lang}) {
  const t=content[lang].privacyPage
  return <><div className="kc-page-top"><div className="kc-shell"><p className="kc-eyebrow">{t.eyebrow}</p><h1>{t.title}</h1><p>{t.lead}</p></div></div><section className="kc-section"><div className="kc-shell kc-privacy-list">{t.sections.map((s,i)=><article key={s.title}><span>{String(i+1).padStart(2,'0')}</span><div><h2>{s.title}</h2><p>{s.body}</p></div></article>)}</div></section></>
}


function VideoHero({lang}:{lang:Lang}){
  type FilmState='poster'|'loading'|'playing'|'paused'|'blocked'|'error'
  const frame=useRef<HTMLDivElement>(null)
  const video=useRef<HTMLVideoElement>(null)
  const [state,setState]=useState<FilmState>('poster')
  const [sourceReady,setSourceReady]=useState(false)
  const [reducedMotion,setReducedMotion]=useState(false)
  const [saveData,setSaveData]=useState(false)
  const [visible,setVisible]=useState(false)
  const [inViewport,setInViewport]=useState(false)
  const [hidden,setHidden]=useState(false)
  const [userPaused,setUserPaused]=useState(false)
  const [manualPlay,setManualPlay]=useState(false)
  const [mobileViewport,setMobileViewport]=useState(false)

  useEffect(()=>{
    const media=window.matchMedia('(prefers-reduced-motion: reduce)')
    const compact=window.matchMedia('(max-width: 767px)')
    setMobileViewport(compact.matches)
    const connection=(navigator as Navigator&{connection?:{saveData?:boolean}}).connection
    setReducedMotion(media.matches)
    setSaveData(Boolean(connection?.saveData))
    try{setUserPaused(window.sessionStorage.getItem('komplyint-video-paused')==='1')}catch{}
    const onMotion=()=>{setReducedMotion(media.matches);if(media.matches)setManualPlay(false)}
    const onWidth=()=>setMobileViewport(compact.matches)
    const onVisibility=()=>setHidden(document.hidden)
    media.addEventListener('change',onMotion)
    compact.addEventListener('change',onWidth)
    document.addEventListener('visibilitychange',onVisibility)
    onVisibility()
    const observer=new IntersectionObserver(entries=>{
      setInViewport(entries.some(x=>x.isIntersecting))
      setVisible(entries.some(x=>x.isIntersecting&&x.intersectionRatio>=(compact.matches?0.7:0.05)))
    },{threshold:[0.05,0.7]})
    if(frame.current)observer.observe(frame.current)
    return()=>{
      media.removeEventListener('change',onMotion)
      compact.removeEventListener('change',onWidth)
      document.removeEventListener('visibilitychange',onVisibility)
      observer.disconnect()
    }
  },[])

  const allowPlayback=(visible||(manualPlay&&inViewport))&&!hidden&&!userPaused&&(!reducedMotion&&!saveData||manualPlay)
  useEffect(()=>{
    if(allowPlayback&&!sourceReady)setSourceReady(true)
  },[allowPlayback,sourceReady])
  useEffect(()=>{
    const el=video.current
    if(sourceReady&&el&&!el.hasAttribute('src'))el.load()
  },[sourceReady,mobileViewport])
  useEffect(()=>{
    const el=video.current
    if(!el)return
    if(!allowPlayback){
      el.pause()
      return
    }
    if(!sourceReady)return
    // Play must be muted and inline. Some browsers require a direct user gesture;
    // when autoplay is rejected, the visible Play control always remains usable.
    el.muted=true
    void el.play().then(()=>setState('playing')).catch(()=>{
      if(el.paused)setState('blocked')
    })
  },[allowPlayback,sourceReady])

  async function toggle(){
    const el=video.current
    if(!el)return
    if(!el.paused){
      setUserPaused(true)
      setManualPlay(false)
      try{window.sessionStorage.setItem('komplyint-video-paused','1')}catch{}
      el.pause()
      setState('paused')
      return
    }
    try{window.sessionStorage.removeItem('komplyint-video-paused')}catch{}
    setUserPaused(false)
    setManualPlay(true)
    setState('loading')
    el.muted=true
    // Desktop Safari/Chrome autoplay policies may reject effect-driven play.
    // Supply media and call play() SYNCHRONOUSLY inside the user's click gesture.
    if(!sourceReady){
      el.src=window.matchMedia('(max-width: 767px)').matches?'/media/hero-mobile.mp4':'/media/hero-optimized.mp4'
      el.load()
      setSourceReady(true)
    }
    try{
      await el.play()
      setState('playing')
    }catch{
      // Retain the original 4K source as an explicit recovery fallback.
      if(el.getAttribute('src')!=='/media/hero.mp4'){
        el.src='/media/hero.mp4'
        el.load()
        try{await el.play();setState('playing');return}catch{}
      }
      setState('error')
    }
  }

  return <>
    <div className="qh-film-layer" ref={frame}>
      <img className="kc-hero-poster" src="/media/hero.webp" srcSet="/media/hero-mobile.webp 800w, /media/hero.webp 1920w" sizes="100vw" alt="" width={1920} height={1080} fetchPriority="high" decoding="sync" aria-hidden="true" />
      <video className={'kc-hero-video'+(manualPlay?' qh-user-play':'')+(state==='error'?' qh-failed':'')}
        ref={video} muted loop playsInline preload="none" autoPlay={allowPlayback} aria-hidden="true"
        onPlaying={()=>setState('playing')}
        onPause={()=>setState(previous=>previous==='error'?'error':'paused')}
        onWaiting={()=>setState(previous=>previous==='playing'?'loading':previous)}
        onError={()=>setState('error')}>
        {sourceReady&&<><source src={mobileViewport?'/media/hero-mobile.mp4':'/media/hero-optimized.mp4'} type="video/mp4" /><source src="/media/hero.mp4" type="video/mp4" /></>}
      </video>
    </div>
    <div className="qh-video-controls">
      <button type="button" onClick={toggle}
        aria-label={state==='playing'?(lang==='fi'?'Pysäytä taustavideo':'Pause background video'):(lang==='fi'?'Toista taustavideo':'Play background video')}>
        <span aria-hidden="true">{state==='playing'?'Ⅱ':'▶'}</span> {state==='playing'?(lang==='fi'?'Pysäytä':'Pause'):(lang==='fi'?'Toista':'Play')}
      </button>
      {(state==='blocked'||state==='error')&&<span className="qh-film-note" role="status">{lang==='fi'?'Automaattinen toisto on estetty. Käynnistä video painikkeesta.':'Autoplay is blocked. Use Play to start the film.'}</span>}
    </div>
  </>
}

function FeaturedWork({lang}:{lang:Lang}){
  const t=content[lang].impact
  const item=t.cases[0]
  return <section className="kc-section qh-featured-work"><div className="kc-shell qh-feature-grid">
    <div><p className="kc-eyebrow">{lang==='fi'?'HAVAINNOLLISTAVA DEMO':'ILLUSTRATIVE DEMONSTRATION'}</p>
      <h2>{lang==='fi'?'Pienestä ongelmasta selkeään lopputulokseen.':'From a small problem to a clearer outcome.'}</h2>
      <p className="kc-lead">{item.title} — {item.before} {item.after}</p>
      <p className="qh-truth-note">{t.disclaimer}</p>
      <a className="kc-text-link" href={pathFor(lang,'work')}>{lang==='fi'?'Tutustu esimerkkeihin':'Explore examples'} <Arrow/></a>
    </div>
    <div className="qh-work-art" role="img" aria-label={lang==='fi'?'Alkuperäinen kuva tiedon jalostumisesta selkeäksi raportiksi, tumma vihreä, musta ja hillitty punainen':'Original illustration of scattered report data becoming a clear dashboard, in deep forest green, black and restrained red'}>
      <img src={lang==='fi'?'/media/featured-reporting-art-fi.svg':'/media/featured-reporting-art.svg'} width={960} height={600} loading="lazy" decoding="async" className="qh-work-art-image" alt=""/>

    </div>
  </div></section>
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

function PublicBrochures({lang}:{lang:Lang}){
  const fi=lang==='fi'
  return <section className="kc-section qh-downloads"><div className="kc-shell qh-downloads-grid">
    <div><p className="kc-eyebrow">{fi?'LADATTAVAT PALVELUESITTEET':'DOWNLOAD SERVICE INFORMATION'}</p><h2>{fi?'Tutustu palveluihimme omassa tahdissasi.':'Explore our services in your own time.'}</h2><p>{fi?'Lataa suomen- tai englanninkielinen esite. Molemmat ovat saatavilla myös yhtenä ZIP-pakettina.':'Download a Finnish or English brochure, or get both in one ZIP package.'}</p></div>
    <div className="qh-download-links">
      <a href="/downloads/Komplyint_Palveluesite_FI.pdf" download><span>PDF · FI</span><strong>Komplyint Palveluesite</strong><span aria-hidden="true">↓</span></a>
      <a href="/downloads/Komplyint_Service_Portfolio_EN.pdf" download><span>PDF · EN</span><strong>Komplyint Service Portfolio</strong><span aria-hidden="true">↓</span></a>
      <a href="/downloads/Komplyint_Service_Documents.zip" download><span>ZIP</span><strong>{fi?'Molemmat esitteet':'Both brochures'}</strong><span aria-hidden="true">↓</span></a>
    </div>
  </div></section>
}