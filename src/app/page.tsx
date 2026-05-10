'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { translations, type Language } from '@/lib/translations'

type PageType = 'home' | 'software' | 'privacy'
type SiteTranslations = (typeof translations)[Language]

function getLanguageFromPath(pathname: string): Language {
  return pathname.startsWith('/en') ? 'en' : 'fi'
}

function getPageType(pathname: string): PageType {
  if (pathname.endsWith('/software') || pathname.includes('/software/')) return 'software'
  if (pathname.endsWith('/privacy') || pathname.includes('/privacy/')) return 'privacy'
  return 'home'
}

function localizedPath(page: PageType, lang: Language) {
  const prefix = lang === 'en' ? '/en' : ''
  if (page === 'home') return prefix || '/'
  return `${prefix}/${page}`
}

export default function Home() {
  const pathname = usePathname()
  const router = useRouter()
  const [lang, setLang] = useState<Language>(getLanguageFromPath(pathname))
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setLang(getLanguageFromPath(pathname))

    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme)
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(prefersDark ? 'dark' : 'light')
    }
  }, [pathname])

  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.toggle('dark', theme === 'dark')
    }
  }, [theme, mounted])

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('.reveal-on-scroll'))
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [pathname])

  useEffect(() => {
    if (mounted && getPageType(pathname) === 'home') {
      const video = document.querySelector('.hero-video') as HTMLVideoElement
      if (video) {
        video.play().catch((err) => {
          console.log('Video autoplay prevented:', err)
        })
      }
    }
  }, [mounted, pathname])

  const currentLang: Language = mounted ? lang : getLanguageFromPath(pathname)
  const pageType = getPageType(pathname)
  const t = translations[currentLang]

  const handleLangToggle = () => {
    const nextLang: Language = currentLang === 'fi' ? 'en' : 'fi'
    router.push(localizedPath(pageType, nextLang))
  }

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    if (mounted) {
      localStorage.setItem('theme', newTheme)
    }
  }

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      <SiteHeader
        t={t}
        currentLang={currentLang}
        pageType={pageType}
        onLangToggle={handleLangToggle}
        onThemeToggle={handleThemeToggle}
      />

      {pageType === 'home' && <HomePage t={t} currentLang={currentLang} />}
      {pageType === 'software' && <SoftwarePage t={t} />}
      {pageType === 'privacy' && <PrivacyPage t={t} />}

      <SiteFooter t={t} />
    </div>
  )
}

function SiteHeader({
  t,
  currentLang,
  pageType,
  onLangToggle,
  onThemeToggle,
}: {
  t: SiteTranslations
  currentLang: Language
  pageType: PageType
  onLangToggle: () => void
  onThemeToggle: () => void
}) {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <a href={localizedPath('home', currentLang)} className="logo" aria-label="Komplyint Oy home">
            <img src="/logo.svg" alt="KOMPLYINT OY" className="logo-img" />
          </a>
          <nav className="main-nav" aria-label={t.nav.ariaLabel}>
            <a className={pageType === 'home' ? 'active' : ''} href={localizedPath('home', currentLang)}>
              {t.nav.home}
            </a>
            <a className={pageType === 'software' ? 'active' : ''} href={localizedPath('software', currentLang)}>
              {t.nav.software}
            </a>
            <a href="#contact">{t.nav.contact}</a>
          </nav>
          <div className="header-controls">
            <button
              onClick={onLangToggle}
              className={`lang-toggle ${currentLang === 'fi' ? 'active' : ''}`}
              aria-label={t.nav.switchLanguage}
            >
              <span>{currentLang === 'fi' ? 'FI' : 'EN'}</span>
            </button>
            <button
              onClick={onThemeToggle}
              className="theme-toggle"
              aria-label={t.nav.toggleTheme}
            >
              <span className="theme-icon theme-icon-moon">🌙</span>
              <span className="theme-icon theme-icon-sun">☀️</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

function HomePage({ t, currentLang }: { t: SiteTranslations; currentLang: Language }) {
  return (
    <>
      <section className="hero">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/media/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-image">
          <img src="/media/hero.webp" alt="" aria-hidden="true" />
        </div>
        <div className="hero-overlay" aria-hidden="true"></div>
        <div className="container">
          <div className="hero-content hero-reveal">
            <h1 className="hero-title">{t.hero.title}</h1>
            <h2 className="hero-subtitle">{t.hero.subtitle}</h2>
            <p className="hero-text">{t.hero.text}</p>
            <blockquote className="hero-disclaimer">{t.hero.disclaimer}</blockquote>
            <a href="#contact" className="btn-contact">{t.hero.contactBtn}</a>
          </div>
        </div>
      </section>

      <section className="process-flow-section" aria-label={t.process.ariaLabel}>
        <div className="container">
          <div className="process-flow reveal-on-scroll">
            <span className="process-item">{t.process.step1}</span>
            <span className="process-arrow"> → </span>
            <span className="process-item">{t.process.step2}</span>
            <span className="process-arrow"> → </span>
            <span className="process-item">{t.process.step3}</span>
          </div>
        </div>
      </section>

      <section className="mid-page-image-section">
        <div className="container">
          <div className="mid-page-image-wrapper">
            <img 
              src="/media/section.jpg" 
              alt="" 
              className="mid-page-image"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                const wrapper = target.closest('.mid-page-image-wrapper')
                if (wrapper) {
                  (wrapper as HTMLElement).style.display = 'none'
                }
              }}
            />
          </div>
        </div>
      </section>

      <section className="services bg-blue">
        <div className="container">
          <h2 className="section-title">{t.services.title}</h2>
          <div className="cards">
            <InfoCard variant="green" title={t.services.card1.title} text={t.services.card1.text} />
            <InfoCard variant="blue" title={t.services.card2.title} text={t.services.card2.text} />
            <InfoCard variant="green" title={t.services.card3.title} text={t.services.card3.text} />
            <InfoCard variant="blue" title={t.services.card4.title} text={t.services.card4.text} />
          </div>
          <blockquote
            className="services-disclaimer"
            dangerouslySetInnerHTML={{ __html: t.services.disclaimer }}
          />
        </div>
      </section>

      <section className="software-teaser bg-green">
        <div className="container">
          <div className="feature-panel reveal-on-scroll">
            <p className="eyebrow">{t.softwareTeaser.eyebrow}</p>
            <h2>{t.softwareTeaser.title}</h2>
            <p>{t.softwareTeaser.text}</p>
            <a href={localizedPath('software', currentLang)} className="btn-secondary">
              {t.softwareTeaser.link}
            </a>
          </div>
        </div>
      </section>

      <section className="howwework bg-green">
        <div className="container">
          <h2 className="section-title">{t.howwework.title}</h2>
          <ul className="approach-list">
            <li>{t.howwework.item1}</li>
            <li>{t.howwework.item2}</li>
            <li>{t.howwework.item3}</li>
          </ul>
        </div>
      </section>

      <section className="approach bg-green">
        <div className="container">
          <h2 className="section-title">{t.approach.title}</h2>
          <ul className="approach-list">
            <li>{t.approach.item1}</li>
            <li>{t.approach.item2}</li>
            <li>{t.approach.item3}</li>
            <li>{t.approach.item4}</li>
          </ul>
        </div>
      </section>

      <section className="about bg-blue">
        <div className="container">
          <h2 className="section-title">{t.about.title}</h2>
          <div className="about-content">
            <p className="about-text">{t.about.text1}</p>
            <p
              className="about-text"
              dangerouslySetInnerHTML={{ __html: t.about.text2 }}
            />
          </div>
        </div>
      </section>

      <ContactSection t={t} />
    </>
  )
}

function SoftwarePage({ t }: { t: SiteTranslations }) {
  return (
    <>
      <section className="page-hero bg-blue">
        <div className="container narrow">
          <p className="eyebrow">{t.softwarePage.eyebrow}</p>
          <h1>{t.softwarePage.title}</h1>
          <p className="lead">{t.softwarePage.lead}</p>
        </div>
      </section>

      <section className="bg-primary-soft">
        <div className="container">
          <h2 className="section-title">{t.softwarePage.whatWeBuild.title}</h2>
          <div className="cards software-cards">
            {t.softwarePage.whatWeBuild.items.map((item, index) => (
              <InfoCard
                key={item.title}
                variant={index % 2 === 0 ? 'green' : 'blue'}
                title={item.title}
                text={item.text}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="product-section bg-green">
        <div className="container">
          <div className="product-panel reveal-on-scroll">
            <p className="eyebrow">{t.softwarePage.floently.eyebrow}</p>
            <h2>{t.softwarePage.floently.title}</h2>
            <p>{t.softwarePage.floently.text1}</p>
            <p>{t.softwarePage.floently.text2}</p>
            <div className="product-grid">
              {t.softwarePage.floently.points.map((point) => (
                <div className="product-point" key={point.title}>
                  <h3>{point.title}</h3>
                  <p>{point.text}</p>
                </div>
              ))}
            </div>
            <blockquote className="services-disclaimer product-disclaimer">
              {t.softwarePage.floently.disclaimer}
            </blockquote>
          </div>
        </div>
      </section>

      <section className="bg-blue">
        <div className="container narrow">
          <h2 className="section-title">{t.softwarePage.working.title}</h2>
          <ul className="approach-list strong-list">
            {t.softwarePage.working.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-green">
        <div className="container narrow">
          <h2 className="section-title">{t.softwarePage.company.title}</h2>
          <div className="company-box">
            {t.softwarePage.company.items.map((item) => (
              <p key={item.label}>
                <strong>{item.label}</strong> {item.value}
              </p>
            ))}
          </div>
          <p className="legal-note">{t.softwarePage.company.note}</p>
        </div>
      </section>

      <ContactSection t={t} />
    </>
  )
}

function PrivacyPage({ t }: { t: SiteTranslations }) {
  return (
    <>
      <section className="page-hero bg-blue">
        <div className="container narrow">
          <p className="eyebrow">{t.privacyPage.eyebrow}</p>
          <h1>{t.privacyPage.title}</h1>
          <p className="lead">{t.privacyPage.lead}</p>
        </div>
      </section>
      <section className="bg-primary-soft">
        <div className="container narrow legal-content">
          {t.privacyPage.sections.map((section) => (
            <div className="legal-section" key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

function ContactSection({ t }: { t: SiteTranslations }) {
  return (
    <section id="contact" className="contact bg-green">
      <div className="container">
        <h2 className="section-title">{t.contact.title}</h2>
        <div className="contact-content">
          <ContactForm t={t.contact} />
          <blockquote className="contact-disclaimer">{t.contact.disclaimer}</blockquote>
        </div>
      </div>
    </section>
  )
}

function SiteFooter({ t }: { t: SiteTranslations }) {
  return (
    <>
      <div className="footer-divider" aria-hidden="true" />
      <footer className="footer">
        <div className="container">
          <div className="footer-links">
            <a href={localizedPath('software', t.lang)}>{t.nav.software}</a>
            <a href={localizedPath('privacy', t.lang)}>{t.nav.privacy}</a>
          </div>
          <p
            className="footer-text"
            dangerouslySetInnerHTML={{ __html: t.footer.text1 }}
          />
          <p
            className="footer-text footer-independence"
            dangerouslySetInnerHTML={{ __html: t.footer.text2 }}
          />
        </div>
      </footer>
    </>
  )
}

function InfoCard({ variant, title, text }: { variant: 'green' | 'blue'; title: string; text: string }) {
  return (
    <div className={`card ${variant === 'green' ? 'bg-green-card' : 'bg-blue-card'} reveal-on-scroll`}>
      <h3 className="card-title">{title}</h3>
      <p className="card-text">{text}</p>
    </div>
  )
}

function ContactForm({ t }: { t: SiteTranslations['contact'] }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMessage('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })

      if (!res.ok) {
        throw new Error('Failed to send message')
      }

      setStatus('success')
      setName('')
      setEmail('')
      setMessage('')
    } catch (err) {
      setStatus('error')
      setErrorMessage(t.form.error)
    }
  }

  return (
    <>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">{t.form.name}</label>
          <input
            type="text"
            id="name"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.form.namePlaceholder}
            maxLength={120}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">
            {t.form.email} <span className="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.form.emailPlaceholder}
            required
            maxLength={200}
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">
            {t.form.message} <span className="required">*</span>
          </label>
          <textarea
            id="message"
            className="form-textarea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t.form.messagePlaceholder}
            required
            rows={6}
            maxLength={5000}
          />
        </div>
        <p className="privacy-note" dangerouslySetInnerHTML={{ __html: t.form.privacyNote }} />
        {status === 'success' && (
          <div className="form-message success">{t.form.success}</div>
        )}
        {status === 'error' && (
          <div className="form-message error">{errorMessage || t.form.error}</div>
        )}
        <button type="submit" className="btn-submit" disabled={status === 'sending'}>
          {status === 'sending' ? t.form.sending : t.form.submit}
        </button>
      </form>
    </>
  )
}
