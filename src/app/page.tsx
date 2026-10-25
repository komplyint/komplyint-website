'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { navPages, services, content, serviceSlugs, contactEmail, duns, type Page, type Lang } from '@/lib/commercial'

function pathFor(lang: Lang, page: Page): string {
  const prefix = lang === 'en' ? '/en' : ''
  return page === 'home' ? (prefix || '/') : prefix + '/' + page
}

function pageFromPath(path: string): Page {
  const part = path.replace(/^\/en(?=\/|$)/, '').split('/').filter(Boolean)[0]
  return part === 'services' || part === 'software' || part === 'contact' || part === 'privacy' ? part : 'home'
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
  const [menuOpen, setMenuOpen] = useState(false)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const saved = window.localStorage.getItem('komplyint-theme')
    setDark(saved === 'dark')
    document.documentElement.classList.toggle('dark', saved === 'dark')
  }, [])
  useEffect(() => { setMenuOpen(false) }, [pathname])
  useEffect(() => { document.documentElement.classList.toggle('dark', dark) }, [dark])

  function toggleTheme() {
    const next = !dark
    setDark(next)
    try { window.localStorage.setItem('komplyint-theme', next ? 'dark' : 'light') } catch {}
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
      <header className="kc-header">
        <div className="kc-shell kc-header-row">
          <a href={pathFor(lang, 'home')} className="kc-logo-link" aria-label="Komplyint Oy">
            <img src="/logo.svg" className="kc-logo" alt="Komplyint Oy" />
          </a>
          <nav className={menuOpen ? 'main-nav kc-nav is-open' : 'main-nav kc-nav'} aria-label={lang === 'fi' ? 'Päänavigaatio' : 'Main navigation'}>
            {navPages.map((item) => <a href={pathFor(lang, item)} className={page === item ? 'is-current' : ''} key={item} aria-current={page === item ? 'page' : undefined}>{t.navigation[item]}</a>)}
          </nav>
          <div className="kc-actions">
            <button className="kc-language" type="button" onClick={() => router.push(pathFor(lang === 'en' ? 'fi' : 'en', page))} aria-label={lang === 'fi' ? 'Switch to English' : 'Vaihda suomeksi'}>{lang === 'fi' ? 'EN' : 'FI'}</button>
            <button className="kc-theme" type="button" onClick={toggleTheme} aria-label={dark ? 'Light theme' : 'Dark theme'} title={dark ? 'Light theme' : 'Dark theme'}>{dark ? '☀' : '◐'}</button>
            <a href={pathFor(lang,'contact')} className="kc-header-cta">{t.contactButton}<Arrow /></a>
            <button className="kc-mobile-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={t.navigation.menu}><span /><span /><span /></button>
          </div>
        </div>
      </header>

      <main id="main-content">
        {page === 'home' && <Home lang={lang} />}
        {page === 'services' && <ServicesPage lang={lang} />}
        {page === 'software' && <SoftwarePage lang={lang} />}
        {page === 'contact' && <ContactPage lang={lang} />}
        {page === 'privacy' && <PrivacyPage lang={lang} />}
      </main>
      <footer className="kc-footer">
        <div className="kc-shell kc-footer-top">
          <div className="kc-footer-brand"><img src="/logo.svg" alt="Komplyint Oy" /><p>{t.about.text}</p></div>
          <div className="kc-footer-links"><strong>{lang === 'fi' ? 'Sivusto' : 'Explore'}</strong>{[...navPages,'privacy' as Page].map(item=><a key={item} href={pathFor(lang,item)}>{t.navigation[item]}</a>)}</div>
          <div className="kc-footer-links"><strong>{lang === 'fi' ? 'Yhteys' : 'Get in touch'}</strong><a href="mailto:info@komplyint.fi">info@komplyint.fi</a><a href={pathFor(lang,'contact')}>{t.contactButton}</a><span>Finland · EU</span></div>
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
  const video = useRef<HTMLVideoElement>(null)
  useEffect(() => { video.current?.play().catch(() => {}) }, [])
  return <>
    <section className="kc-hero">
      <div className="kc-hero-poster" aria-hidden="true" />
      <video className="kc-hero-video" ref={video} autoPlay muted loop playsInline preload="auto" poster="/media/hero.webp" aria-hidden="true">
        <source src="/media/hero.mp4" type="video/mp4" />
      </video>
      <div className="kc-hero-shade" />
      <div className="kc-shell kc-hero-layout">
        <div className="kc-hero-copy">
          <p className="kc-hero-tag">{t.hero.label}</p>
          <h1>{t.hero.title}</h1>
          <p className="kc-hero-lead">{t.hero.text}</p>
          <div className="kc-hero-buttons"><a className="kc-button kc-button-primary" href={pathFor(lang,'contact')}>{t.contactButton}<Arrow /></a><a className="kc-button kc-button-ghost" href={pathFor(lang,'services')}>{t.explore}<span aria-hidden="true">↓</span></a></div>
        </div>
        <div className="kc-hero-side"><div className="kc-side-marker">K / 01</div><div className="kc-hero-side-label">{lang === 'fi' ? 'TYÖN PERIAATTEET' : 'DELIVERY PRINCIPLES'}</div><span>{t.hero.point1}</span><span>{t.hero.point2}</span><span>{t.hero.point3}</span></div>
      </div>
      <div className="kc-hero-edge" />
    </section>

    <section className="kc-section kc-section-intro"><div className="kc-shell">
      <SectionIntro {...t.intro} />
      <div className="kc-service-grid">{services[lang].slice(0,4).map((s,i)=><a className="kc-service-tile" key={s.title} href={pathFor(lang,'services') + '?service=' + i + '#service-explorer'}><div className="kc-tile-top"><span>{String(i+1).padStart(2,'0')}</span><Arrow /></div><h3>{s.title}</h3><p>{s.intro}</p></a>)}</div>
      <div className="kc-moreline"><span>{lang === 'fi' ? 'Lisäksi: ohjelmistotestaus, laadunvarmistus ja digitaalinen toimistotuki.' : 'Also available: software testing, quality assurance and digital office support.'}</span><a href={pathFor(lang,'services')}>{t.explore} <Arrow /></a></div>
    </div></section>

    <section className="kc-section kc-muted-section" id="service-explorer"><div className="kc-shell"><ServiceExplorer lang={lang} /></div></section>
    <Examples lang={lang}/>
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
        <div className="kc-detail-bottom"><div><small>{t.tools}</small><p>{s.tools}</p></div><a className="kc-text-link" href={pathFor(lang,'contact')}>{t.help}<Arrow /></a></div>
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
  return <><div className="kc-page-top"><div className="kc-shell"><p className="kc-eyebrow">{t.area.eyebrow}</p><h1>{t.area.title}</h1><p>{t.area.text}</p></div></div><section className="kc-section kc-muted-section kc-services-detail" id="service-explorer"><div className="kc-shell"><ServiceExplorer lang={lang} showIntro={false}/></div></section><Process lang={lang}/><Trust lang={lang}/><CTA lang={lang}/></>
}
function SoftwarePage({lang}:{lang:Lang}) {
  const t=content[lang].software
  return <><div className="kc-page-top"><div className="kc-shell"><p className="kc-eyebrow">{t.eyebrow}</p><h1>{t.title}</h1><p>{t.lead}</p><a className="kc-button kc-button-primary" href={pathFor(lang,'contact')}>{content[lang].contactButton}<Arrow /></a></div></div>
    <section className="kc-section"><div className="kc-shell"><div className="kc-software-grid">{t.items.map((s,i)=><article key={s.title} className="kc-software-card"><span>{String(i+1).padStart(2,'0')}</span><h2>{s.title}</h2><p>{s.body}</p></article>)}</div><div className="kc-limit"><h3>{t.limitTitle}</h3><p>{t.limit}</p></div></div></section>
    <section className="kc-section kc-muted-section"><div className="kc-shell kc-product"><div><p className="kc-eyebrow">{lang==='fi'?'TUOTEKEHITYS':'PRODUCT DEVELOPMENT'}</p><h2>{t.productTitle}</h2><p>{t.productText}</p></div><a href="https://floently.com/learn" target="_blank" rel="noopener noreferrer" className="kc-text-link">{t.productLink}<Arrow /></a></div></section><CTA lang={lang}/></>
}
function ContactPage({lang}:{lang:Lang}) {
  const t=content[lang].contactPage
  const [name,setName]=useState(''), [email,setEmail]=useState(''), [message,setMessage]=useState(''), [topic,setTopic]=useState('')
  const [status,setStatus]=useState<'idle'|'sending'|'sent'|'error'>('idle')
  const [trap,setTrap]=useState('')
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if(trap) return
    setStatus('sending')
    try {
      const payload = {name,email,message:((topic ? (lang==='fi'?'Aihe: ':'Topic: ')+topic+'\n\n' : '')+message)}
      const r = await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)})
      if(!r.ok) throw new Error('send failed')
      setName('');setEmail('');setMessage('');setTopic('');setStatus('sent')
    } catch {setStatus('error')}
  }
  return <><div className="kc-page-top"><div className="kc-shell"><p className="kc-eyebrow">{t.eyebrow}</p><h1>{t.title}</h1><p>{t.lead}</p></div></div>
    <section className="kc-section"><div className="kc-shell kc-contact-grid"><div className="kc-contact-side"><p className="kc-eyebrow">{t.action}</p><h2>Komplyint Oy</h2><p>{content[lang].footer}</p><p>Finland · European Union</p><a className="kc-text-link" href="mailto:info@komplyint.fi">info@komplyint.fi<Arrow /></a><div className="kc-contact-note">{t.note}</div></div>
    <form className="kc-form" onSubmit={submit}><div className="kc-form-two"><label>{t.formName}<input type="text" value={name} onChange={e=>setName(e.target.value)} maxLength={120} autoComplete="name" placeholder={lang==='fi'?'Nimesi':'Your name'}/></label><label>{t.formEmail}<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required maxLength={200} autoComplete="email" placeholder="name@company.fi"/></label></div>
    <label>{t.formService}<select value={topic} onChange={e=>setTopic(e.target.value)}><option value="">{t.select}</option>{services[lang].map(s=><option key={s.title} value={s.title}>{s.title}</option>)}<option value="Other">{t.other}</option></select></label>
    <label>{t.formMessage}<textarea rows={6} maxLength={4500} required value={message} onChange={e=>setMessage(e.target.value)} placeholder={lang==='fi'?'Kerro lyhyesti ongelma ja toivottu lopputulos.':'Describe the problem and desired outcome.'}/></label>
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
