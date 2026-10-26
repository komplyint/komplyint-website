import type { Locale } from './i18n'
import { svServices, svContent } from './i18n-sv'

export type Lang = Locale
export type Page = 'home' | 'services' | 'software' | 'work' | 'about' | 'contact' | 'privacy' | 'accessibility'
export type Service = { title: string; intro: string; examples: string[]; deliverable: string; boundaries: string; tools: string }
export const navPages: Page[] = ['services', 'work', 'about', 'contact']
export const services: Record<Lang, Service[]> = {
  fi: [
    { title: 'Excel, data ja raportointi', intro: 'Excel-tiedostot kuntoon ja raportointi sujuvammaksi.', examples: ['Excel-tiedostojen korjaaminen, kaavat ja Power Query -muokkaukset', 'Tietojen yhdistäminen, siivoaminen ja tarkistaminen', 'Power BI -raporttien rakentaminen ja päivittäminen'], deliverable: 'Toimiva tiedosto tai raportti sekä selkeät käyttöohjeet.', boundaries: 'Tarkistamme lähtötiedot, käyttöoikeudet ja tarvittavat lisenssit ennen työn aloittamista.', tools: 'Excel · Power Query · Power BI · CSV' },
    { title: 'Microsoft 365 ja automaatio', intro: 'Toistuvat työvaiheet helpommiksi Microsoft 365:n työkaluilla.', examples: ['Forms-, Lists- ja SharePoint-ratkaisujen kehittäminen', 'Power Automate -ilmoitukset ja hyväksymisprosessit', 'Teamsin, Outlookin ja OneDriven työnkulkujen parantaminen'], deliverable: 'Sovittu automaatio, sen toimivuuden tarkistus ja ylläpito-ohjeet.', boundaries: 'Toteutus edellyttää tarvittavia käyttöoikeuksia ja lisenssejä.', tools: 'Forms · Lists · SharePoint · Teams · Outlook · Power Automate' },
    { title: 'Verkkosivut ja ylläpito', intro: 'Selkeämmät verkkosivut, toimivat lomakkeet ja sovitut päivitykset.', examples: ['Sisällön, ulkoasun ja mobiilikäytettävyyden parantaminen', 'Lomakkeiden ja sivuston tärkeimpien toimintojen testaus', 'Pienet sivustouudistukset ja sisällön päivitykset'], deliverable: 'Sovitut muutokset, niiden toimivuuden tarkistus ja kirjalliset ohjeet.', boundaries: 'Palvelinympäristöstä, tietoturvasta ja mahdollisista käyttökatkoista sovitaan erikseen. Jatkuva päivystys ei sisälly palveluun.', tools: 'HTML · CSS · JavaScript · WordPress / muut soveltuvat alustat' },
    { title: 'Pienet ohjelmistot ja integraatiot', intro: 'Pienet sovellukset ja integraatiot yrityksen käytännön tarpeisiin.', examples: ['Sisäiset seurantatyökalut, lomakkeet ja laskurit', 'Pienet verkkosovellukset ja käyttöliittymän parannukset', 'Tietojen siirtäminen järjestelmien välillä käytettävissä olevilla rajapinnoilla'], deliverable: 'Sovitut ominaisuudet, testaus sekä tarvittavat lähdekoodi- ja käyttöönotto-ohjeet.', boundaries: 'Laajat järjestelmät, kriittiset integraatiot ja ympärivuorokautinen tuki arvioidaan erikseen.', tools: 'Web-sovellukset · API:t · Python · JavaScript / TypeScript' },
    { title: 'Ohjelmistotestaus ja laadunvarmistus', intro: 'Testausta ennen julkaisua ja muutosten jälkeen.', examples: ['Verkkosivujen ja lomakkeiden toiminnallinen testaus', 'Virheiden toistaminen, kirjaaminen ja korjausten tarkistaminen', 'Sovitut selain- ja mobiilitestit'], deliverable: 'Testausraportti, kiireellisyysjärjestykseen asetetut virheet ja ohjeet niiden toistamiseen.', boundaries: 'Testaus ei korvaa tietoturva-arviointia eikä takaa täysin virheetöntä ohjelmistoa.', tools: 'Manuaalitestaus · Playwright · Testitapaukset · Bugiraportit' },
    { title: 'Digitaalinen toimistotuki', intro: 'Apua asiakirjoihin, taulukoihin ja tiedostojen järjestämiseen.', examples: ['PowerPoint-esitysten ja Word-asiakirjapohjien viimeistely', 'Tiedostojen järjestäminen ja Excel-pohjien tekeminen', 'Pienet raportit, asiakirjat ja käyttöohjeet'], deliverable: 'Muokattavat tiedostot ja lyhyet käyttöohjeet sovitun työn mukaan.', boundaries: 'Jatkuvasta avustamisesta, asiakaspalvelusta ja henkilötietojen käsittelystä sovitaan erikseen.', tools: 'PowerPoint · Word · OneDrive · SharePoint · Excel' }
  ],
  en: [
    { title: 'Excel, data & reporting', intro: 'Clearer information with less manual work.', examples: ['Excel fixes, formulas and Power Query improvements', 'Data consolidation, cleaning and quality checks', 'Power BI dashboards and repeatable reporting'], deliverable: 'A working file or report, agreed checks and a user handover.', boundaries: 'Input data quality, access permissions and licensing are reviewed before work begins.', tools: 'Excel · Power Query · Power BI · CSV' },
    { title: 'Microsoft 365 & automation', intro: 'Streamline repetitive steps using tools your team already has.', examples: ['Forms, Lists and SharePoint-based workflows', 'Power Automate notifications and approval flows', 'Simplifying Teams, Outlook and OneDrive processes'], deliverable: 'A scoped automation, tested workflow and maintenance notes.', boundaries: 'Automations depend on available permissions and appropriate licences.', tools: 'Forms · Lists · SharePoint · Teams · Outlook · Power Automate' },
    { title: 'Websites & maintenance', intro: 'Make existing websites clearer, more useful and easier to maintain.', examples: ['Content, layout and mobile usability improvements', 'Contact-form and page-flow testing', 'Small site refreshes and agreed updates'], deliverable: 'Defined changes, functional verification and written handover.', boundaries: 'Hosting, security and downtime responsibilities require separate agreement; no 24/7 promise.', tools: 'HTML · CSS · JavaScript · WordPress / suitable platforms' },
    { title: 'Small software & integrations', intro: 'Focused tools for real operational needs, without unnecessary complexity.', examples: ['Internal trackers, forms and calculators', 'Small web applications and interface improvements', 'Connecting systems through available supported APIs'], deliverable: 'Agreed features, tests, source code and deployment notes as contracted.', boundaries: 'Large platforms, critical integrations and around-the-clock support need separate assessment.', tools: 'Web apps · APIs · Python · JavaScript / TypeScript' },
    { title: 'Software testing & QA', intro: 'Practical checks before release or your next development stage.', examples: ['Functional testing for websites and forms', 'Reproducing bugs, documenting issues and verifying fixes', 'Agreed browser and mobile-layout checks'], deliverable: 'Test summary, prioritised issue list and reproducible findings.', boundaries: 'This is not a security audit, certification or guarantee of defect-free software.', tools: 'Manual QA · Playwright · Test cases · Bug reports' },
    { title: 'Digital office support', intro: 'Small, well-defined document and information management tasks.', examples: ['PowerPoint presentations and Word templates', 'File organisation and spreadsheet templates', 'Simple reporting, documentation and instruction materials'], deliverable: 'Agreed editable files and short handover notes.', boundaries: 'Customer service, personal data handling and ongoing assistance are separately scoped.', tools: 'PowerPoint · Word · OneDrive · SharePoint · Excel' }
  ],
  sv: svServices
}
export const content = {
  fi: {
    navigation: { home: 'Etusivu', services: 'Palvelut', software: 'Ohjelmistokehitys', work: 'Esimerkit', about: 'Yritys', contact: 'Yhteystiedot', privacy: 'Tietosuoja', accessibility: 'Saavutettavuus', menu: 'Avaa valikko' },
    tagline: 'SUOMALAINEN DIGIPALVELUYRITYS',
    contactButton: 'Ota yhteyttä', explore: 'Tutustu palveluihin', email: 'Sähköposti',
    hero: { label: 'DATA · AUTOMAATIO · OHJELMISTOT', title: 'Kun työkalut toimivat, työ sujuu.', text: 'Autamme yrityksiä kehittämään raportointia, automatisoimaan toistuvia työvaiheita ja toteuttamaan pieniä ohjelmistoratkaisuja. Käymme tarpeen läpi yhdessä, sovimme työn laajuudesta ja toteutamme sovitun.', point1: 'Sovittu työn sisältö', point2: 'Selkeät lopputulokset', point3: 'Toimivuuden tarkistus' },
    intro: { eyebrow: 'MITÄ TEEMME', title: 'Apua dataan, automaatioon ja ohjelmistoihin.', text: 'Korjaamme Excel-raportteja, parannamme Microsoft 365 -työnkulkuja ja kehitämme verkkosivuja sekä pieniä ohjelmistoja. Autamme myös yksittäisissä, selkeästi rajatuissa tehtävissä.' },
    area: { eyebrow: 'PALVELUMME', title: 'Valitse palvelu tarpeesi mukaan.', text: 'Tutustu palveluihimme ja katso, millaisissa tehtävissä voimme auttaa. Kerromme myös, mitä sovimme ennen työn aloittamista.', examples: 'Esimerkkejä tehtävistä', delivered: 'Mitä saat', boundaries: 'Mistä sovitaan etukäteen', tools: 'Käytettävät työkalut', help: 'Kysy lisää palvelusta' },
    impact: { eyebrow: 'ESIMERKKEJÄ', title: 'Esimerkkejä mahdollisista toteutuksista.', disclaimer: 'Esimerkit ovat kuvitteellisia, eivät toteutettuja asiakastöitä.', cases: [
      { num: '01', title: 'Kuukausiraportin selkeyttäminen', before: 'Kuukausiraportti kootaan käsin useasta Excel-tiedostosta.', after: 'Yksi päivitettävä raporttipohja ja selkeät käyttöohjeet.' },
      { num: '02', title: 'Yhteydenottojen käsittelyn helpottaminen', before: 'Yhteydenotot tulevat sähköpostiin, ja niiden seuranta vie aikaa.', after: 'Lomake kokoaa pyynnöt yhteen ja ilmoittaa niistä vastuuhenkilölle.' },
      { num: '03', title: 'Verkkosivujen toimivuuden tarkistaminen', before: 'Sivusto toimii huonosti puhelimella, eikä lomakkeen toimivuudesta ole varmuutta.', after: 'Selkeä korjauslista, sovitut muutokset ja niiden testaus.' }
    ] },
    process: { eyebrow: 'NÄIN TYÖ ETENEE', title: 'Selvitämme tarpeen ennen työn aloittamista.', steps: [
      {title:'Kartoitus',body:'Kerro, mikä työssä vie aikaa tai ei toimi toivotulla tavalla.'},
      {title:'Työn rajaus ja tarjous',body:'Sovimme, mitä tehdään, kuka vastaa mistäkin sekä työn hinnasta ja aikataulusta.'},
      {title:'Toteutus ja testaus',body:'Käytämme mahdollisuuksien mukaan nykyisiä työkaluja ja testaamme sovitut muutokset.'},
      {title:'Luovutus',body:'Saat valmiin työn, tarvittavat ohjeet ja tiedon mahdollisesta jatkotuesta.'}
    ] },
    trust: {eyebrow:'TOIMINTATAPAMME', title:'Tiedät, mitä sovimme ja mitä saat.', items: [
      {title:'Hyödynnämme nykyisiä työkaluja',body:'Selvitämme ensin, mitä nykyisillä järjestelmillä ja työkaluilla voidaan tehdä.'},
      {title:'Selkeästi sovittu työ',body:'Sovimme työn sisällöstä ja mahdollisista lisätöistä ennen toteutusta.'},
      {title:'Huolellinen tietojen käsittely',body:'Käymme läpi tarvittavat käyttöoikeudet sekä sen, mitä tietoja työssä käsitellään ja säilytetään.'},
      {title:'Esimerkit merkitään selkeästi',body:'Kerromme, mitkä esimerkit ovat kuvitteellisia. Todellisia asiakastöitä esittelemme vain luvalla.'}
    ]},
    cta:{eyebrow:'OTA YHTEYTTÄ',title:'Kerro, missä tarvitset apua.',text:'Kuvaile tehtävä lyhyesti. Kerromme, voimmeko auttaa ja mitä tietoja tarvitsemme tarjousta varten.',button:'Ota yhteyttä'},
    software: {eyebrow:'OHJELMISTOKEHITYS JA YLLÄPITO',title:'Ohjelmistokehitystä yrityksesi tarpeisiin.',lead:'Toteutamme pieniä digitaalisia työkaluja ja kehitämme olemassa olevia verkkosovelluksia. Sovimme aina etukäteen työn sisällöstä, käyttöönotosta ja ylläpidosta.', items:[
      {title:'Sisäiset työkalut',body:'Seurantatyökalut, lomakkeet, laskurit ja yksinkertaiset tiedonhallintaratkaisut.'},
      {title:'Korjaukset ja jatkokehitys',body:'Pienet ominaisuudet, käyttöliittymän muutokset, virheiden korjaaminen ja testaus.'},
      {title:'Rajatut integraatiot',body:'Tietojen siirtäminen järjestelmien välillä niiden tarjoamien rajapintojen avulla.'}
    ], productTitle:'Omat ohjelmistotuotteemme',productText:'Kehitämme myös omia digitaalisia tuotteita. Asiakastyöt ja omien tuotteiden kehittäminen pidetään erillään, jotta vastuut ja aikataulut ovat selkeät.',productLink:'Tutustu Floentlyyn', limitTitle:'Mitä palveluun ei automaattisesti sisälly?', limit:'Jatkuva päivystys, kriittisten järjestelmien ylläpito ja tietoturvasertifiointi eivät kuulu tavalliseen toimeksiantoon. Niistä on sovittava erikseen.'},
    contactPage:{eyebrow:'YHTEYDENOTTO',title:'Miten voimme auttaa?',lead:'Kerro lyhyesti, mitä haluaisit parantaa ja mitä työkaluja käytät. Voit kysyä tarjousta myös yksittäiseen pieneen tehtävään.', formName:'Nimi',formEmail:'Sähköpostiosoite',formService:'Aihe',formMessage:'Miten voimme auttaa?',send:'Lähetä viesti',sending:'Lähetetään...',sent:'Kiitos! Olemme vastaanottaneet yhteydenottosi.',fail:'Viestin lähettäminen ei onnistunut. Voit ottaa yhteyttä myös sähköpostitse.',privacy:'Käytämme lomakkeella antamiasi tietoja yhteydenottoosi vastaamiseen.',select:'Valitse aihe',other:'Muu asia tai en ole varma', note:'Älä lähetä lomakkeella arkaluonteisia henkilötietoja tai asiakkaidesi luottamuksellisia tietoja.', action:'Yritystiedot' },
    privacyPage:{eyebrow:'TIETOSUOJA',title:'Tietosuojaseloste',lead:'Tässä kerromme, miten käsittelemme verkkosivuston kautta saamiamme henkilötietoja.',sections:[
      {title:'Rekisterinpitäjä',body:'Komplyint Oy, Y-tunnus 3588595-3. Yhteydenotot: info@komplyint.fi.'},
      {title:'Käsiteltävät tiedot',body:'Voimme käsitellä nimeäsi, sähköpostiosoitettasi, viestiäsi ja sen turvalliseen lähettämiseen tarvittavia teknisiä tietoja.'},
      {title:'Tarkoitus ja oikeusperuste',body:'Käsittelemme tietoja yhteydenottoihin vastaamista ja mahdollisen sopimuksen valmistelua varten. Käsittely perustuu tilanteen mukaan oikeutettuun etuun tai sopimusta edeltäviin toimiin.'},
      {title:'Säilytys ja palveluntarjoajat',body:'Säilytämme tietoja vain niin kauan kuin yhteydenpito, asiakkuus tai lakisääteiset velvoitteet sitä edellyttävät. Sähköposti- ja verkkopalveluntarjoajat voivat käsitellä tietoja puolestamme sovituin ehdoin.'},
      {title:'Oikeutesi',body:'Sinulla voi olla oikeus tarkastaa tietosi sekä pyytää niiden oikaisua tai poistamista tai käsittelyn rajoittamista. Voit myös vastustaa käsittelyä tai ottaa yhteyttä tietosuojavaltuutettuun.'},
      {title:'Evästeet ja teema-asetus',body:'Sivusto voi tallentaa valitsemasi ulkoasun selaimeen. Jos otamme käyttöön analytiikkaa tai markkinointievästeitä, päivitämme tämän selosteen ja tarvittavat valinnat.'},
      {title:'Muut tuotteet',body:'Muilla ohjelmistotuotteillamme voi olla omat tietosuojaselosteensa.'}
    ]},
    about:{title:'Suomalainen digipalveluyritys',text:'Komplyint Oy on suomalainen yritys, joka auttaa yrityksiä raportoinnissa, automaatiossa ja pienissä ohjelmistoprojekteissa. Kehitämme myös omia digitaalisia tuotteita. Emme tällä hetkellä tarjoa vaatimustenmukaisuuskonsultointia.'},
    footerDescription:'Dataa, automaatiota ja käytännön ohjelmistoratkaisuja yritysten tarpeisiin.',
    footer:'Komplyint Oy · Y-tunnus 3588595-3', footerNote:'Sovimme jokaisen toimeksiannon sisällöstä erikseen. Emme tarjoa oikeudellista neuvontaa, sertifiointia tai viranomaishyväksyntöjä.'
  },
  en: {
    navigation: { home: 'Home', services: 'Services', software: 'Software', work: 'Work', about: 'About', contact: 'Contact', privacy: 'Privacy', accessibility: 'Accessibility', menu: 'Open menu' },
    tagline: 'FINNISH DIGITAL SOLUTIONS COMPANY',
    contactButton: 'Discuss a project', explore: 'Explore services', email: 'Email',
    hero: {label:'DATA · AUTOMATION · SOFTWARE',title:'Clarity for your work. Care in every delivery.',text:'We help businesses bring clarity to information, reduce repetitive manual work and build useful digital solutions. We start with the need, agree on a clear scope and keep delivery practical.',point1:'Defined scope',point2:'Agreed deliverables',point3:'Tested handover'},
    intro:{eyebrow:'WHAT WE DO',title:'Practical digital help. Clear deliverables.',text:'From a broken Excel workflow to a small software enhancement: focused support when your team needs an extra pair of technical hands.'},
    area:{eyebrow:'SERVICE AREAS',title:'The right solution. A clear scope.',text:'Select a service on the left to see examples, deliverables and what we agree before work begins.',examples:'Typical requests',delivered:'What you receive',boundaries:'Before we start',tools:'Suitable tools',help:'Ask about this service'},
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
    contactPage:{eyebrow:'CONTACT',title:'Tell us what needs to work better.',lead:'Share the current tools, the issue and your desired result. Small one-off tasks are welcome.',formName:'Name',formEmail:'Email address',formService:'Topic',formMessage:'How can we help?',send:'Send enquiry',sending:'Sending...',sent:'Thank you. Your enquiry has been accepted for processing.',fail:'The message could not be sent. Please use the email address below.',privacy:'We use these details only to respond to your enquiry. Read the privacy notice.',select:'Select a topic',other:'Not sure / something else',note:'Please send only the information needed to describe the request, not sensitive customer data.',action:'Company details'},
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
  },
  sv: svContent
}

export const serviceSlugs = ["data-reporting","m365-automation","websites-maintenance","software-integrations","testing-qa","document-support"] as const;
export type ServiceSlug = typeof serviceSlugs[number];
export const contactEmail = "info@komplyint.fi";
export const duns = "369283279";
export const canonicalHost = "https://www.komplyint.fi";
