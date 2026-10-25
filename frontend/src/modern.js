const services = {
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
      {title:'Rekisterinpitäjä',body:'Komplyint Oy, Y-tunnus 3588595-3. Yhteydenotot: info@komplyint.fi.'},
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
      {title:'Controller',body:'Komplyint Oy, Finnish Business ID 3588595-3. Contact: info@komplyint.fi.'},
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

(function legacyRuntime(){
  const root = document.getElementById('site');
  let lang = localStorage.getItem('komplyint-lang') === 'en' ? 'en' : 'fi';
  let selected = 0;
  const path = id => '#' + id;
  const arrow = '<span class="kc-arrow" aria-hidden="true">↗</span>';
  function detailMarkup(){
    const t=content[lang].area,s=services[lang][selected];
    return `<span class="kc-detail-index">${String(selected+1).padStart(2,'0')} / 06</span><h3>${s.title}</h3><p class="kc-detail-lead">${s.intro}</p><div class="kc-detail-grid"><div><h4>${t.examples}</h4><ul>${s.examples.map(x=>`<li>${x}</li>`).join('')}</ul></div><div class="kc-detail-side"><div><h4>${t.delivered}</h4><p>${s.deliverable}</p></div><div><h4>${t.boundaries}</h4><p>${s.boundaries}</p></div></div></div><div class="kc-detail-bottom"><div><small>${t.tools}</small><p>${s.tools}</p></div><a href="#contact" class="kc-text-link">${t.help}${arrow}</a></div>`;
  }
  function intro(t){return `<div class="kc-intro"><p class="kc-eyebrow">${t.eyebrow}</p><h2>${t.title}</h2>${t.text ? `<p class="kc-lead">${t.text}</p>`:''}</div>`}
  function render(){
    const t=content[lang], sv=services[lang];
    document.documentElement.lang=lang;
    root.innerHTML=`
    <a class="kc-skip" href="#main-content">${lang==='fi'?'Siirry sisältöön':'Skip to content'}</a>
    <div class="kc-topbar"><div class="kc-shell kc-topbar-inner"><span><span class="kc-small-dot"></span> ${t.tagline}</span><span>${t.footer}</span></div></div>
    <header class="kc-header"><div class="kc-shell kc-header-row">
      <a href="#home" class="kc-logo-link" aria-label="Komplyint Oy"><img src="/logo.svg" alt="Komplyint Oy" class="kc-logo"></a>
      <nav class="main-nav kc-nav" id="static-nav" aria-label="${lang==='fi'?'Päänavigaatio':'Main navigation'}">
        <a href="#home">${t.navigation.home}</a><a href="#services">${t.navigation.services}</a><a href="#software">${t.navigation.software}</a><a href="#contact">${t.navigation.contact}</a>
      </nav>
      <div class="kc-actions"><button id="toggle-language" class="kc-language" aria-label="${lang==='fi'?'Switch to English':'Vaihda suomeksi'}">${lang==='fi'?'EN':'FI'}</button>
      <button id="toggle-theme" class="kc-theme" aria-label="Toggle theme">◐</button><a href="#contact" class="kc-header-cta">${t.contactButton}${arrow}</a>
      <button class="kc-mobile-toggle" id="toggle-menu" aria-label="${t.navigation.menu}" aria-expanded="false"><span></span><span></span><span></span></button></div></div></header>
    <main id="main-content">
      <section class="kc-hero" id="home"><div class="kc-hero-poster"></div><video class="kc-hero-video" id="hero-video" autoplay muted loop playsinline preload="auto" poster="/media/hero.webp" aria-hidden="true"><source src="/media/hero-optimized.mp4" type="video/mp4" /><source src="/media/hero.mp4" type="video/mp4"></video><div class="kc-hero-shade"></div>
        <div class="kc-shell kc-hero-layout"><div class="kc-hero-copy"><p class="kc-hero-tag">${t.hero.label}</p><h1>${t.hero.title}</h1><p class="kc-hero-lead">${t.hero.text}</p><div class="kc-hero-buttons"><a class="kc-button kc-button-primary" href="#contact">${t.contactButton}${arrow}</a><a class="kc-button kc-button-ghost" href="#services">${t.explore}<span>↓</span></a></div></div>
        <div class="kc-hero-side"><div class="kc-side-marker">K / 01</div><div class="kc-hero-side-label">${lang==='fi'?'TYÖN PERIAATTEET':'DELIVERY PRINCIPLES'}</div><span>${t.hero.point1}</span><span>${t.hero.point2}</span><span>${t.hero.point3}</span></div></div><div class="kc-hero-edge"></div></section>
      <section class="kc-section kc-section-intro" id="services"><div class="kc-shell">${intro(t.intro)}
        <div class="kc-service-grid">${sv.slice(0,4).map((s,i)=>`<a class="kc-service-tile" href="#service-explorer" data-open-service="${i}"><div class="kc-tile-top"><span>${String(i+1).padStart(2,'0')}</span>${arrow}</div><h3>${s.title}</h3><p>${s.intro}</p></a>`).join('')}</div>
        <div class="kc-moreline"><span>${lang==='fi'?'Lisäksi: ohjelmistotestaus, laadunvarmistus ja digitaalinen toimistotuki.':'Also available: software testing, quality assurance and digital office support.'}</span><a href="#service-explorer">${t.explore} ${arrow}</a></div></div></section>
      <section class="kc-section kc-muted-section" id="service-explorer"><div class="kc-shell">${intro(t.area)}<div class="kc-explorer">
        <div class="kc-explorer-tabs" role="tablist" aria-label="${t.area.title}">${sv.map((s,i)=>`<button class="kc-explorer-tab ${selected===i?'active':''}" type="button" role="tab" aria-selected="${selected===i}" data-service="${i}"><span>${String(i+1).padStart(2,'0')}</span><strong>${s.title}</strong><b>↗</b></button>`).join('')}</div>
        <div id="service-detail" class="kc-detail" role="tabpanel">${detailMarkup()}</div></div></div></section>
      <section class="kc-section kc-examples"><div class="kc-shell">${intro({eyebrow:t.impact.eyebrow,title:t.impact.title,text:t.impact.disclaimer})}
        <div class="kc-example-grid">${t.impact.cases.map(c=>`<article class="kc-example"><span class="kc-example-num">${c.num}</span><h3>${c.title}</h3><div class="kc-example-line"><span>${lang==='fi'?'LÄHTÖTILANNE':'BEFORE'}</span><p>${c.before}</p></div><div class="kc-example-line"><span>${lang==='fi'?'TAVOITE':'AFTER'}</span><p>${c.after}</p></div></article>`).join('')}</div></div></section>
      <section class="kc-section kc-process"><div class="kc-shell">${intro({eyebrow:t.process.eyebrow,title:t.process.title})}<div class="kc-steps">${t.process.steps.map((s,i)=>`<div class="kc-step"><div class="kc-step-no">${String(i+1).padStart(2,'0')}</div><h3>${s.title}</h3><p>${s.body}</p></div>`).join('')}</div></div></section>
      <section class="kc-section kc-muted-section"><div class="kc-shell kc-values">${intro({eyebrow:t.trust.eyebrow,title:t.trust.title})}<div class="kc-values-grid">${t.trust.items.map((s,i)=>`<div class="kc-value"><span>0${i+1}</span><div><h3>${s.title}</h3><p>${s.body}</p></div></div>`).join('')}</div></div></section>
      <section class="kc-section kc-about"><div class="kc-shell kc-about-layout"><div><p class="kc-eyebrow">${lang==='fi'?'YRITYKSESTÄ':'ABOUT OUR COMPANY'}</p><h2>${t.about.title}</h2></div><p>${t.about.text}</p></div></section>
      <section class="kc-section kc-muted-section" id="software"><div class="kc-shell">${intro({eyebrow:t.software.eyebrow,title:t.software.title,text:t.software.lead})}<div class="kc-software-grid">${t.software.items.map((s,i)=>`<article class="kc-software-card"><span>${String(i+1).padStart(2,'0')}</span><h2>${s.title}</h2><p>${s.body}</p></article>`).join('')}</div><div class="kc-limit"><h3>${t.software.limitTitle}</h3><p>${t.software.limit}</p></div><div class="kc-product" style="margin-top:50px"><div><h2>${t.software.productTitle}</h2><p>${t.software.productText}</p></div><a class="kc-text-link" href="https://floently.com/learn" rel="noopener noreferrer" target="_blank">${t.software.productLink}${arrow}</a></div></div></section>
      <section class="kc-cta"><div class="kc-shell kc-cta-inner"><div><p class="kc-eyebrow">${t.cta.eyebrow}</p><h2>${t.cta.title}</h2><p>${t.cta.text}</p></div><a class="kc-button kc-button-light" href="#contact">${t.cta.button}${arrow}</a></div></section>
      <section class="kc-section" id="contact"><div class="kc-shell">${intro({eyebrow:t.contactPage.eyebrow,title:t.contactPage.title,text:t.contactPage.lead})}<div class="kc-contact-grid">
        <div class="kc-contact-side"><p class="kc-eyebrow">${t.contactPage.action}</p><h2>Komplyint Oy</h2><p>${t.footer}</p><p>Finland · EU</p><a class="kc-text-link" href="mailto:info@komplyint.fi">info@komplyint.fi${arrow}</a><div class="kc-contact-note">${t.contactPage.note}</div></div>
        <form class="kc-form" id="contact-form"><div class="kc-form-two"><label>${t.contactPage.formName}<input type="text" name="name" maxlength="120" autocomplete="name"></label><label>${t.contactPage.formEmail}<input type="email" name="email" required maxlength="200" autocomplete="email" placeholder="name@company.fi"></label></div><label>${t.contactPage.formService}<select name="topic"><option value="">${t.contactPage.select}</option>${sv.map(s=>`<option value="${s.title}">${s.title}</option>`).join('')}<option value="Other">${t.contactPage.other}</option></select></label><label>${t.contactPage.formMessage}<textarea name="message" rows="6" required maxlength="4500"></textarea></label>
        <label class="kc-honeypot">Website<input name="website" tabindex="-1" autocomplete="off"></label><p class="kc-form-privacy">${t.contactPage.privacy} <a href="#privacy">${t.navigation.privacy}</a></p><div id="contact-status" role="status"></div><button type="submit" class="kc-button kc-button-primary">${t.contactPage.send}${arrow}</button></form></div></div></section>
      <section class="kc-section kc-muted-section" id="privacy"><div class="kc-shell"><div class="kc-intro"><p class="kc-eyebrow">${t.privacyPage.eyebrow}</p><h2>${t.privacyPage.title}</h2><p class="kc-lead">${t.privacyPage.lead}</p></div><div class="kc-privacy-list">${t.privacyPage.sections.map((s,i)=>`<article><span>${String(i+1).padStart(2,'0')}</span><div><h2>${s.title}</h2><p>${s.body}</p></div></article>`).join('')}</div></div></section>
    </main><footer class="kc-footer"><div class="kc-shell kc-footer-top"><div class="kc-footer-brand"><img src="/logo.svg" alt="Komplyint Oy"><p>${t.about.text}</p></div><div class="kc-footer-links"><strong>${lang==='fi'?'Sivusto':'Explore'}</strong><a href="#home">${t.navigation.home}</a><a href="#services">${t.navigation.services}</a><a href="#software">${t.navigation.software}</a><a href="#contact">${t.navigation.contact}</a><a href="#privacy">${t.navigation.privacy}</a></div><div class="kc-footer-links"><strong>${lang==='fi'?'Yhteys':'Contact'}</strong><a href="mailto:info@komplyint.fi">info@komplyint.fi</a><span>Finland · EU</span></div></div><div class="kc-shell kc-footer-bottom"><span>© 2026 ${t.footer}</span><span>${t.footerNote}</span></div></footer>`;
    document.getElementById('toggle-language').onclick=()=>{lang=lang==='fi'?'en':'fi';selected=0;localStorage.setItem('komplyint-lang',lang);render()};
    document.getElementById('toggle-theme').onclick=()=>{const n=!document.documentElement.classList.contains('dark');document.documentElement.classList.toggle('dark',n);localStorage.setItem('komplyint-theme',n?'dark':'light')};
    document.getElementById('toggle-menu').onclick=()=>{const el=document.getElementById('static-nav');el.classList.toggle('is-open');document.getElementById('toggle-menu').setAttribute('aria-expanded',el.classList.contains('is-open')?'true':'false')};
    document.querySelectorAll('[data-service]').forEach(el=>el.addEventListener('click',()=>{selected=Number(el.getAttribute('data-service'));document.getElementById('service-detail').innerHTML=detailMarkup();document.querySelectorAll('[data-service]').forEach(b=>{const a=Number(b.getAttribute('data-service'))===selected;b.classList.toggle('active',a);b.setAttribute('aria-selected',a?'true':'false')})}));
    document.querySelectorAll('[data-open-service]').forEach(el=>el.addEventListener('click',()=>{const i=Number(el.getAttribute('data-open-service'));document.querySelector('[data-service="'+i+'"]')?.click()}));
    document.getElementById('contact-form').onsubmit=async event=>{
      event.preventDefault();const form=event.currentTarget, f=new FormData(form), status=document.getElementById('contact-status'), btn=form.querySelector('button[type=submit]');
      if(f.get('website'))return;
      btn.disabled=true;btn.textContent=t.contactPage.sending;status.textContent='';
      try {
        const message=(f.get('topic')?'Topic: '+f.get('topic')+'\n\n':'')+(f.get('message')||'');
        const response=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:f.get('name'),email:f.get('email'),message})});
        if(!response.ok)throw Error('send');
        status.className='kc-form-success';status.textContent=t.contactPage.sent;form.reset();
      } catch(e){status.className='kc-form-error';status.textContent=t.contactPage.fail+' info@komplyint.fi'}
      finally{btn.disabled=false;btn.textContent=t.contactPage.send}
    };
    try{document.getElementById('hero-video').play().catch(()=>{})}catch(e){}
  }
  render();
})();
