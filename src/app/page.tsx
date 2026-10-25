'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

type Lang = 'fi' | 'en'
type Page = 'home' | 'services' | 'software' | 'contact' | 'privacy'
type Service = { title: string; intro: string; examples: string[]; deliverable: string; boundaries: string; tools: string }
const navPages: Page[] = ['home', 'services', 'software', 'contact']
const services: Record<Lang, Service[]> = {
  fi: [
    { title: 'Excel, data ja raportointi', intro: 'Selkeämpää tietoa vähemmällä manuaalisella työllä.', examples: ['Excel-tiedostojen korjaus, kaavat ja Power Query', 'Tietojen yhdistäminen, puhdistaminen ja laadun tarkistus', 'Power BI -raportit ja toistuvan raportoinnin kehittäminen'], deliverable: 'Toimiva tiedosto tai raportti, sovitut tarkistukset ja käyttöohje.', boundaries: 'Lähdetietojen laatu, käyttöoikeudet ja mahdolliset lisenssit tarkistetaan ennen toteutusta.', tools: 'Excel · Power Query · Power BI · CSV' },
    { title: 'Microsoft 365 ja automaatio', intro: 'Toistuvien vaiheiden virtaviivaistamista olemassa olevilla työkaluilla.', examples: ['Forms-, Lists- ja SharePoint-pohjaiset työvaiheet', 'Power Automate -ilmoitukset ja hyväksyntäkierrot', 'Teams-, Outlook- ja OneDrive-työnkulkujen selkeyttäminen'], deliverable: 'Rajattu automaatio, testattu työnkulku ja selkeä ylläpito-ohje.', boundaries: 'Automaatio tehdään vain käytettävissä olevilla oikeuksilla ja soveltuvilla lisensseillä.', tools: 'Forms · Lists · SharePoint · Teams · Outlook · Power Automate' },
    { title: 'Verkkosivut ja ylläpito', intro: 'Olemassa olevat sivustot siistiksi, toimiviksi ja helpommin ylläpidettäviksi.', examples: ['Sisältö-, ulkoasu- ja mobiilikäytettävyyskorjaukset', 'Yhteydenottolomakkeiden ja sivupolkujen testaus', 'Pienet sivustouudistukset ja sovitut päivitykset'], deliverable: 'Rajatut muutokset, toimivuuden tarkistus ja kirjallinen luovutus.', boundaries: 'Palvelin-, tietoturva- ja käyttökatkovastuut sovitaan erikseen; jatkuvaa päivystystä ei luvata.', tools: 'HTML · CSS · JavaScript · WordPress / muut soveltuvat alustat' },
    { title: 'Pienet ohjelmistot ja integraatiot', intro: 'Kevyitä työkaluja oikeaan työongelmaan, ei tarpeettoman suuria hankkeita.', examples: ['Sisäiset seuranta-, lomake- ja laskurityökalut', 'Rajatut verkkosovellukset ja käyttöliittymämuutokset', 'Tietojen siirto järjestelmien välillä tarjolla olevien rajapintojen avulla'], deliverable: 'Sovitut toiminnallisuudet, testaus, lähdekoodi ja käyttöönottotiedot sopimuksen mukaan.', boundaries: 'Laajat alustat, kriittiset integraatiot ja ympärivuorokautinen tuotantotuki arvioidaan erillisinä toimeksiantoina.', tools: 'Web-sovellukset · API:t · Python · JavaScript / TypeScript' },
    { title: 'Ohjelmistotestaus ja laadunvarmistus', intro: 'Käytännön testaus ennen julkaisua tai seuraavaa kehitysvaihetta.', examples: ['Verkkosivujen ja lomakkeiden toiminnallinen testaus', 'Virheiden toistaminen, dokumentointi ja korjausten tarkistus', 'Sovitut selain- ja mobiilinäkymien tarkistukset'], deliverable: 'Testausyhteenveto, priorisoitu virheluettelo ja toistettavat havainnot.', boundaries: 'Testaus ei ole tietoturva-auditointi, sertifiointi eikä lupaus virheettömyydestä.', tools: 'Manuaalitestaus · Playwright · Testitapaukset · Bugiraportit' },
    { title: 'Digitaalinen toimistotuki', intro: 'Pieniä, tarkasti määriteltyjä asiakirja- ja tiedonhallintatehtäviä.', examples: ['PowerPoint-esitysten ja Word-pohjien viimeistely', 'Tiedostojen järjestäminen ja taulukkopohjien rakentaminen', 'Yksinkertaiset raportointi-, dokumentointi- ja ohjemateriaalit'], deliverable: 'Sovitut muokattavat tiedostot ja lyhyt luovutusohje.', boundaries: 'Asiakaspalvelu, henkilötietojen käsittely ja jatkuva assistenttityö vain erikseen sovittuna.', tools: 'PowerPoint · Word · OneDrive · SharePoint · Excel' }
  ],
  en: [
    { title: 'Excel, data & reporting', intro: 'Clearer information with less manual work.', examples: ['Excel fixes, formulas and Power Query improvements', 'Data consolidation, cleaning and quality checks', 'Power BI dashboards and repeatable reporting'], deliverable: 'A working file or report, agreed checks and a user handover.', boundaries: 'Input data quality, access permissions and licensing are reviewed before work begins.', tools: 'Excel · Power Query · Power BI · CSV' },
    { title: 'Microsoft 365 & automation', intro: 'Streamline repetitive steps using tools your team already has.', examples: ['Forms, Lists and SharePoint-based workflows', 'Power Automate notifications and approval flows', 'Simplifying Teams, Outlook and OneDrive processes'], deliverable: 'A scoped automation, tested workflow and maintenance notes.', boundaries: 'Automations depend on available permissions and appropriate licences.', tools: 'Forms · Lists · SharePoint · Teams · Outlook · Power Automate' },
    { title: 'Websites & maintenance', intro: 'Make existing websites clearer, more useful and easier to maintain.', examples: ['Content, layout and mobile usability improvements', 'Contact-form and page-flow testing', 'Small site refreshes and agreed updates'], deliverable: 'Defined changes, functional verification and written handover.', boundaries: 'Hosting, security and downtime responsibilities require separate agreement; no 24/7 promise.', tools: 'HTML · CSS · JavaScript · WordPress / suitable platforms' },
    { title: 'Small software & integrations', intro: 'Focused tools for real operational needs, without unnecessary complexity.', examples: ['Internal trackers, forms and calculators', 'Small web applications and interface improvements', 'Connecting systems through available supported APIs'], deliverable: 'Agreed features, tests, source code and deployment notes as contracted.', boundaries: 'Large platforms, critical integrations and around-the-clock support need separate assessment.', tools: 'Web apps · APIs · Python · JavaScript / TypeScript' },
    { title: 'Software testing & QA', intro: 'Practical checks before release or your next development stage.', examples: ['Functional testing for websites and forms', 'Reproducing bugs, documenting issues and verifying fixes', 'Agreed browser and mobile-layout checks'], deliverable: 'Test summary, prioritised issue list and reproducible findings.', boundaries: 'This is not a security audit, certification or guarantee of defect-free software.', tools: 'Manual QA · Playwright · Test cases · Bug reports' },
    { title: 'Digital office support', intro: 'Small, well-defined document and information management tasks.', examples: ['PowerPoint presentations and Word templates', 'File organisation and spreadsheet templates', 'Simple reporting, documentation and instruction materials'], deliverable: 'Agreed editable files and short handover notes.', boundaries: 'Customer service, personal data handling and ongoing assistance are separately scoped.', tools: 'PowerPoint · Word · OneDrive · SharePoint · Excel' }
  ]
}
const content = {
  fi: {
    navigation: { home: 'Etusivu', services: 'Palvelut', software: 'Ohjelmistokehitys', contact: 'Yhteystiedot', privacy: 'Tietosuoja', menu: 'Avaa valikko' },
    tagline: 'SUOMALAINEN DIGITAALISTEN RATKAISUJEN YRITYS',
    contactButton: 'Kerro tarpeestasi', explore: 'Tutustu palveluihin', email: 'Sähköposti',
    hero: { label: 'DATA · AUTOMAATIO · OHJELMISTOT', title: 'Teknologiaa, joka helpottaa oikeaa työtä.', text: 'Autamme yrityksiä selkeyttämään tietoa, vähentämään toistuvaa käsityötä ja kehittämään toimivia digitaalisia ratkaisuja. Aloitamme pienestä, sovimme rajat ja rakennamme tarpeeseen.', point1: 'Selkeä rajaus', point2: 'Sovitut toimitukset', point3: 'Testattu luovutus' },
    intro: { eyebrow: 'MITÄ TEEMME', title: 'Käytännöllistä digiapua. Selkeillä toimituksilla.', text: 'Excel-ongelmasta ohjelmiston pieneen jatkokehitykseen: tarjoamme konkreettista apua silloin, kun oma aika tai tekninen osaaminen ei riitä.' },
    area: { eyebrow: 'PALVELUKOKONAISUUDET', title: 'Löydä sopiva ratkaisu', text: 'Valitse palvelu vasemmalta nähdäksesi esimerkkejä, tyypilliset toimitukset ja työn rajaukset.', examples: 'Tyypillisiä tehtäviä', delivered: 'Mitä toimitamme', boundaries: 'Mitä sovimme etukäteen', tools: 'Soveltuvat työkalut', help: 'Kysy tästä palvelusta' },
    impact: { eyebrow: 'KÄYTÄNNÖN ESIMERKKEJÄ', title: 'Miltä työ voi näyttää käytännössä?', disclaimer: 'Havainnollistavia esimerkkejä, eivät julkaistuja asiakastapauksia.', cases: [
      { num: '01', title: 'Excel-raportin korjaus', before: 'Useita tiedostoja ja virheherkkä kuukausiraportti.', after: 'Yksi selkeä päivitettävä pohja ja käyttöohje.' },
      { num: '02', title: 'Pyyntöjen käsittelyn automatisointi', before: 'Pyynnöt saapuvat sähköpostiin ja hukkuvat ketjuihin.', after: 'Lomake, vastuuhenkilö ja automaattinen ilmoitus.' },
      { num: '03', title: 'Verkkosivujen toimivuustarkistus', before: 'Mobiiliongelmia ja epävarmuutta lomakkeen toiminnasta.', after: 'Korjauslista, sovitut muutokset ja tarkistettu käyttökokemus.' }
    ] },
    process: { eyebrow: 'TAPA TOIMIA', title: 'Ensin ymmärrämme. Sitten toteutamme.', steps: [
      {title:'Kartoitus',body:'Kerro, mikä vie aikaa tai ei toimi.'},
      {title:'Rajaus ja tarjous',body:'Määrittelemme sisällön, vastuut, hinnan ja aikataulun.'},
      {title:'Toteutus ja testaus',body:'Hyödynnämme olemassa olevia työkaluja ja tarkistamme sovitun lopputuloksen.'},
      {title:'Luovutus',body:'Saat tulokset, ohjeet ja tiedon mahdollisesta jatkotuesta.'}
    ] },
    trust: {eyebrow:'TOIMINTAPERIAATTEET', title:'Selkeys on osa laatua.', items: [
      {title:'Ei turhaa uudelleenrakentamista',body:'Hyödynnämme ensin asiakkaan olemassa olevia työkaluja ja ratkaisuja.'},
      {title:'Ei epämääräisiä lupauksia',body:'Sovimme etukäteen toimituksen, rajaukset ja muutospyynnöt.'},
      {title:'Tietojen käsittely harkiten',body:'Käyttöoikeudet, tietojen tarve ja säilytys käsitellään ennen toteutusta.'},
      {title:'Ei keksittyjä referenssejä',body:'Näytämme demot demoina ja asiakastyöt vain luvan kanssa.'}
    ]},
    cta:{eyebrow:'ALOITETAAN SOPIVAN KOKOISESTI',title:'Mikä työvaihe yrityksessäsi kaipaa helpotusta?',text:'Lähetä lyhyt kuvaus. Kerromme, sopiiko tehtävä palveluihimme ja mitä tarvitaan tarjousta varten.',button:'Ota yhteyttä'},
    software: {eyebrow:'OHJELMISTOKEHITYS JA YLLÄPITO',title:'Pieniä ohjelmistoratkaisuja. Hallittua jatkokehitystä.',lead:'Rakennamme rajattuja digitaalisia työkaluja ja kehitämme olemassa olevia verkkosovelluksia. Työn laajuus, käyttöönotto ja ylläpitovastuut sovitaan aina erikseen.', items:[
      {title:'Sisäiset työkalut',body:'Seurantalistat, lomakkeet, laskurit ja kevyet tiedonhallintaratkaisut.'},
      {title:'Korjaukset ja jatkokehitys',body:'Pienet ominaisuudet, käyttöliittymämuutokset, bugikorjaukset ja testaus.'},
      {title:'Rajatut integraatiot',body:'Tietojen siirto soveltuvien järjestelmien välillä dokumentoitujen rajapintojen avulla.'}
    ], productTitle:'Omat tuotekehityshankkeet',productText:'Kehitämme myös omia digitaalisia tuotteita. Tuotekehitys ja asiakkaille tarjottavat palvelut pidetään erillisinä, jotta toimeksiantojen sisältö pysyy selkeänä.',productLink:'Tutustu Floentlyyn', limitTitle:'Mitä emme lupaa automaattisesti?', limit:'Emme lupaa rajatonta kehitystä, tietoturvasertifiointia, kriittisten järjestelmien ylläpitoa tai jatkuvaa päivystystä ilman erillistä arviota ja sopimusta.'},
    contactPage:{eyebrow:'YHTEYDENOTTO',title:'Kerro meille ongelma. Aloitetaan ratkaisusta.',lead:'Kuvaile esimerkiksi käytössä olevat työkalut, ongelma ja toivottu lopputulos. Voit pyytää arviota myös pienestä yksittäisestä tehtävästä.', formName:'Nimi',formEmail:'Sähköpostiosoite',formService:'Aihe',formMessage:'Miten voimme auttaa?',send:'Lähetä viesti',sending:'Lähetetään...',sent:'Kiitos. Viestisi on lähetetty.',fail:'Viestiä ei voitu lähettää. Käytä alla olevaa sähköpostiosoitetta.',privacy:'Käsittelemme lähettämiäsi tietoja vain yhteydenottoon vastaamiseksi. Lue tietosuojaseloste.',select:'Valitse aihe',other:'En ole varma / muu', note:'Lähetäthän aluksi vain tehtävän kuvaamiseen tarvittavat tiedot, et arkaluonteisia asiakastietoja.', action:'Yritystiedot' },
    privacyPage:{eyebrow:'TIETOSUOJA',title:'Tietosuojaseloste',lead:'Tietoa siitä, miten käsittelemme verkkosivuston yhteydenottoihin liittyviä henkilötietoja.',sections:[
      {title:'Rekisterinpitäjä',body:'Komplyint Oy, Y-tunnus 3588595-3. Yhteydenotot: gliavex@gliavex.fi.'},
      {title:'Käsiteltävät tiedot',body:'Yhteydenottolomakkeesta voidaan käsitellä nimeä, sähköpostiosoitetta, viestin sisältöä ja lähettämiseen tarvittavia teknisiä tietoja.'},
      {title:'Tarkoitus ja oikeusperuste',body:'Tietoja käytetään yhteydenottoihin vastaamiseen, asiakasviestintään ja mahdollisen sopimuksen valmisteluun. Oikeusperusteena on oikeutettu etu tai sopimusta edeltävät toimet soveltuvin osin.'},
      {title:'Säilytys ja palveluntarjoajat',body:'Tietoja säilytetään vain tarpeellinen aika viestintään, asiakkuuden hoitoon tai lakisääteisiin velvoitteisiin. Sähköposti- ja hostingpalveluntarjoajat voivat käsitellä tietoja puolestamme asianmukaisin järjestelyin.'},
      {title:'Oikeutesi',body:'Sinulla voi olla oikeus saada pääsy tietoihisi, pyytää niiden oikaisua tai poistamista, rajoittaa käsittelyä ja vastustaa sitä. Voit olla yhteydessä tietosuojavaltuutettuun.'},
      {title:'Evästeet ja teema-asetus',body:'Sivusto voi tallentaa selaimeen kieli- ja ulkoasuasetuksen. Mahdolliset tulevat analytiikka- ja markkinointiratkaisut edellyttävät selosteen tarkistamista.'},
      {title:'Muut tuotteet',body:'Erillisten ohjelmistotuotteiden tietosuojakäytännöt kerrotaan niiden omissa palveluissa.'}
    ]},
    about:{title:'Itsenäinen suomalainen yritys',text:'Komplyint Oy keskittyy tällä hetkellä dataan, automaatioon, pieniin ohjelmistoratkaisuihin ja sovittuun tekniseen tukeen. Vaatimustenmukaisuuteen liittyvien palveluiden kehittäminen on pidemmän aikavälin tavoite; emme tällä hetkellä tarjoa vaatimustenmukaisuuskonsultointia.'},
    footer:'Komplyint Oy · Y-tunnus 3588595-3', footerNote:'Palvelut toteutetaan aina erikseen sovitussa laajuudessa. Ei oikeudellista neuvontaa, sertifiointia eikä viranomaishyväksyntöjä.'
  },
  en: {
    navigation: { home: 'Home', services: 'Services', software: 'Software', contact: 'Contact', privacy: 'Privacy', menu: 'Open menu' },
    tagline: 'FINNISH DIGITAL SOLUTIONS COMPANY',
    contactButton: 'Discuss a project', explore: 'Explore services', email: 'Email',
    hero: {label:'DATA · AUTOMATION · SOFTWARE',title:'Technology that makes real work easier.',text:'We help businesses bring clarity to information, reduce repetitive manual work and build useful digital solutions. We start with the need, agree on a clear scope and keep delivery practical.',point1:'Defined scope',point2:'Agreed deliverables',point3:'Tested handover'},
    intro:{eyebrow:'WHAT WE DO',title:'Practical digital help. Clear deliverables.',text:'From a broken Excel workflow to a small software enhancement: focused support when your team needs an extra pair of technical hands.'},
    area:{eyebrow:'SERVICE AREAS',title:'Find the right solution',text:'Select a service on the left to see examples, deliverables and what we agree before work begins.',examples:'Typical requests',delivered:'What you receive',boundaries:'Before we start',tools:'Suitable tools',help:'Ask about this service'},
    impact:{eyebrow:'PRACTICAL EXAMPLES',title:'What could a project look like?',disclaimer:'Illustrative scenarios, not claims about completed client projects.',cases:[
      {num:'01',title:'Repair a monthly Excel report',before:'Multiple files and an error-prone reporting routine.',after:'A maintainable template with clear update instructions.'},
      {num:'02',title:'Automate incoming requests',before:'Requests get lost in long email threads.',after:'A form, assigned owner and automatic notification.'},
      {num:'03',title:'Check a business website',before:'Mobile layout problems and an unreliable contact form.',after:'A prioritised fix list, agreed changes and verified user flow.'}
    ]},
    process:{eyebrow:'HOW WE WORK',title:'Understand first. Build second.',steps:[
      {title:'Discover',body:'Tell us what is slow, confusing or not working.'},
      {title:'Scope & quote',body:'We agree on deliverables, responsibilities, price and timing.'},
      {title:'Build & verify',body:'We reuse suitable tools and test the agreed outcome.'},
      {title:'Handover',body:'You receive the deliverables, instructions and any agreed support options.'}
    ]},
    trust:{eyebrow:'HOW WE EARN TRUST',title:'Clarity is part of quality.',items:[
      {title:'Reuse before rebuild',body:'We look at your existing tools and workflows before proposing new software.'},
      {title:'No vague promises',body:'Scope, limits and change requests are discussed before work starts.'},
      {title:'Responsible data handling',body:'We clarify access, data minimisation and handling requirements before delivery.'},
      {title:'No invented client stories',body:'Demonstrations are identified as demonstrations; client work is shared only with permission.'}
    ]},
    cta:{eyebrow:'START WITH SOMETHING MANAGEABLE',title:'What could your business make easier?',text:'Send a short description. We will tell you whether the task fits and what we need to prepare a quote.',button:'Get in touch'},
    software:{eyebrow:'SOFTWARE DEVELOPMENT & MAINTENANCE',title:'Small software solutions. Thoughtful improvements.',lead:'We develop clearly scoped internal tools and improve existing web software. Scope, deployment and maintenance responsibilities are agreed separately for each engagement.',items:[
      {title:'Internal tools',body:'Trackers, forms, calculators and lightweight information management tools.'},
      {title:'Fixes & enhancements',body:'Small features, interface changes, bug fixes and functional verification.'},
      {title:'Scoped integrations',body:'Moving data between suitable systems through documented APIs.'}
    ],productTitle:'Our own product work',productText:'We also develop digital products. Product development stays separate from client services so commercial scope and responsibilities remain clear.',productLink:'Explore Floently',limitTitle:'What we do not promise by default',limit:'Unlimited development, security certification, critical-system maintenance and 24/7 response require separate assessment and explicit agreement.'},
    contactPage:{eyebrow:'CONTACT',title:'Tell us the problem. Start with a solution.',lead:'Share the current tools, the issue and your desired result. Small one-off tasks are welcome.',formName:'Name',formEmail:'Email address',formService:'Topic',formMessage:'How can we help?',send:'Send enquiry',sending:'Sending...',sent:'Thank you. Your message has been sent.',fail:'The message could not be sent. Please use the email address below.',privacy:'We use these details only to respond to your enquiry. Read the privacy notice.',select:'Select a topic',other:'Not sure / something else',note:'Please send only the information needed to describe the request, not sensitive customer data.',action:'Company details'},
    privacyPage:{eyebrow:'PRIVACY',title:'Privacy notice',lead:'How we process personal data sent through this website.',sections:[
      {title:'Controller',body:'Komplyint Oy, Finnish Business ID 3588595-3. Contact: gliavex@gliavex.fi.'},
      {title:'Data collected',body:'For website enquiries, we may process your name, email address, message content and technical information necessary to deliver and secure the message.'},
      {title:'Purpose and lawful basis',body:'We process information to respond to enquiries, communicate about services and take steps before a potential agreement. Depending on the context, the basis is legitimate interests or pre-contractual steps.'},
      {title:'Retention and providers',body:'We retain enquiries only as long as necessary for communication, services or legal obligations. Email and hosting providers may process information for us under appropriate arrangements.'},
      {title:'Your rights',body:'Depending on applicable law, you may ask to access, correct, erase, restrict or object to processing of personal data. You may contact the Finnish Data Protection Ombudsman.'},
      {title:'Cookies and preferences',body:'This site may save your display preference locally in your browser. New analytics or marketing services would require an update to this notice and applicable choices.'},
      {title:'Other products',body:'Separate software products provide their own privacy information where required.'}
    ]},
    about:{title:'An independent Finnish company',text:'Komplyint Oy currently focuses on data, automation, small software solutions and agreed technical support. Compliance-related capabilities remain a longer-term development direction; we do not currently offer compliance consulting.'},
    footer:'Komplyint Oy · Business ID 3588595-3',footerNote:'All work is subject to an agreed scope. No legal advice, certification or regulatory approval is provided.'
  }
}

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
          <div className="kc-footer-links"><strong>{lang === 'fi' ? 'Yhteys' : 'Get in touch'}</strong><a href="mailto:gliavex@gliavex.fi">gliavex@gliavex.fi</a><a href={pathFor(lang,'contact')}>{t.contactButton}</a><span>Finland · EU</span></div>
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
    <section className="kc-section"><div className="kc-shell kc-contact-grid"><div className="kc-contact-side"><p className="kc-eyebrow">{t.action}</p><h2>Komplyint Oy</h2><p>{content[lang].footer}</p><p>Finland · European Union</p><a className="kc-text-link" href="mailto:gliavex@gliavex.fi">gliavex@gliavex.fi<Arrow /></a><div className="kc-contact-note">{t.note}</div></div>
    <form className="kc-form" onSubmit={submit}><div className="kc-form-two"><label>{t.formName}<input type="text" value={name} onChange={e=>setName(e.target.value)} maxLength={120} autoComplete="name" placeholder={lang==='fi'?'Nimesi':'Your name'}/></label><label>{t.formEmail}<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required maxLength={200} autoComplete="email" placeholder="name@company.fi"/></label></div>
    <label>{t.formService}<select value={topic} onChange={e=>setTopic(e.target.value)}><option value="">{t.select}</option>{services[lang].map(s=><option key={s.title} value={s.title}>{s.title}</option>)}<option value="Other">{t.other}</option></select></label>
    <label>{t.formMessage}<textarea rows={6} maxLength={4500} required value={message} onChange={e=>setMessage(e.target.value)} placeholder={lang==='fi'?'Kerro lyhyesti ongelma ja toivottu lopputulos.':'Describe the problem and desired outcome.'}/></label>
    <label className="kc-honeypot" aria-hidden="true">Website <input tabIndex={-1} autoComplete="off" value={trap} onChange={e=>setTrap(e.target.value)}/></label>
    <p className="kc-form-privacy">{t.privacy} <a href={pathFor(lang,'privacy')}>{content[lang].navigation.privacy}.</a></p>
    {status==='sent' && <p role="status" className="kc-form-success">{t.sent}</p>}
    {status==='error' && <p role="alert" className="kc-form-error">{t.fail} <a href="mailto:gliavex@gliavex.fi">gliavex@gliavex.fi</a></p>}
    <button className="kc-button kc-button-primary" disabled={status==='sending'} type="submit">{status==='sending'?t.sending:t.send}<Arrow /></button></form></div></section></>
}
function PrivacyPage({lang}:{lang:Lang}) {
  const t=content[lang].privacyPage
  return <><div className="kc-page-top"><div className="kc-shell"><p className="kc-eyebrow">{t.eyebrow}</p><h1>{t.title}</h1><p>{t.lead}</p></div></div><section className="kc-section"><div className="kc-shell kc-privacy-list">{t.sections.map((s,i)=><article key={s.title}><span>{String(i+1).padStart(2,'0')}</span><div><h2>{s.title}</h2><p>{s.body}</p></div></article>)}</div></section></>
}
