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
    { title: 'Pienet ohjelmistot ja integraatiot', intro: 'Pienet sovellukset ja integraatiot yrityksen käytännön tarpeisiin.', examples: ['Sisäiset seurantatyökalut, lomakkeet ja laskurit', 'Pienet verkkosovellukset ja käyttöliittymän parannukset', 'Tietojen siirtäminen järjestelmien välillä käytettävissä olevilla rajapinnoilla'], deliverable: 'Sovitut ominaisuudet, niiden testaus sekä sovittu lähdekoodi ja käyttöönotto-ohjeet.', boundaries: 'Laajat järjestelmät, kriittiset integraatiot ja ympärivuorokautinen tuki arvioidaan erikseen.', tools: 'Web-sovellukset · API:t · Python · JavaScript / TypeScript' },
    { title: 'Ohjelmistotestaus ja laadunvarmistus', intro: 'Testausta ennen julkaisua ja muutosten jälkeen.', examples: ['Verkkosivujen ja lomakkeiden toiminnallinen testaus', 'Virheiden toistaminen, kirjaaminen ja korjausten tarkistaminen', 'Sovitut selain- ja mobiilitestit'], deliverable: 'Testausraportti, kiireellisyysjärjestykseen asetetut virheet ja ohjeet niiden toistamiseen.', boundaries: 'Testaus ei korvaa tietoturva-arviointia eikä takaa täysin virheetöntä ohjelmistoa.', tools: 'Manuaalitestaus · Playwright · Testitapaukset · Bugiraportit' },
    { title: 'Asiakirjat ja toimistotuki', intro: 'Apua asiakirjoihin, taulukoihin ja tiedostojen järjestämiseen.', examples: ['PowerPoint-esitysten ja Word-asiakirjapohjien viimeistely', 'Tiedostojen järjestäminen ja Excel-pohjien tekeminen', 'Pienet raportit, asiakirjat ja käyttöohjeet'], deliverable: 'Muokattavat tiedostot ja lyhyet käyttöohjeet sovitun työn mukaan.', boundaries: 'Jatkuvasta avustamisesta, asiakaspalvelusta ja henkilötietojen käsittelystä sovitaan erikseen.', tools: 'PowerPoint · Word · OneDrive · SharePoint · Excel' }
  ],
  en: [
    { title: 'Excel, data & reporting', intro: 'Get spreadsheets in order and make reporting easier to maintain.', examples: ['Excel troubleshooting, formulas and Power Query updates', 'Combining, cleaning and checking data', 'Building and updating Power BI reports'], deliverable: 'A working spreadsheet or report with clear instructions.', boundaries: 'We check the source data, access permissions and any required licences before starting.', tools: 'Excel · Power Query · Power BI · CSV' },
    { title: 'Microsoft 365 & automation', intro: 'Reduce repetitive work with the Microsoft 365 tools you already use.', examples: ['Setting up and improving Forms, Lists and SharePoint processes', 'Power Automate notifications and approval processes', 'Improving workflows in Teams, Outlook and OneDrive'], deliverable: 'The agreed automation, functional checks and maintenance notes.', boundaries: 'Implementation depends on the necessary access permissions and licences.', tools: 'Forms · Lists · SharePoint · Teams · Outlook · Power Automate' },
    { title: 'Websites & maintenance', intro: 'Improve existing websites, forms and content without a full rebuild.', examples: ['Content, layout and mobile usability improvements', 'Testing contact forms and key website functions', 'Small website updates and content changes'], deliverable: 'The agreed changes, a functional check and written handover notes.', boundaries: 'We agree separately on hosting, security and downtime responsibilities. Round-the-clock support is not included.', tools: 'HTML · CSS · JavaScript · WordPress / suitable platforms' },
    { title: 'Small apps and integrations', intro: 'Small applications and integrations built around a specific business need.', examples: ['Internal trackers, forms and calculators', 'Small web apps and interface improvements', 'Moving information between systems using available APIs'], deliverable: 'The agreed features, testing and any source-code or deployment instructions included in the scope.', boundaries: 'Large systems, critical integrations and 24/7 support are assessed separately.', tools: 'Web apps · APIs · Python · JavaScript / TypeScript' },
    { title: 'Software testing & QA', intro: 'Testing before release and after changes.', examples: ['Functional testing of websites and forms', 'Reproducing issues, recording findings and checking fixes', 'Agreed browser and mobile tests'], deliverable: 'A test report, prioritised issues and steps to reproduce them.', boundaries: 'Testing is not a security audit or a guarantee that software is free of defects.', tools: 'Manual QA · Playwright · Test cases · Bug reports' },
    { title: 'Documents and office support', intro: 'Help with documents, spreadsheets and organising files.', examples: ['Finishing PowerPoint presentations and Word templates', 'Organising files and creating Excel templates', 'Short reports, documents and user instructions'], deliverable: 'Editable files and concise instructions for the agreed work.', boundaries: 'Ongoing administration, customer service and handling personal data require separate agreement.', tools: 'PowerPoint · Word · OneDrive · SharePoint · Excel' }
  ],
  sv: svServices
}
export const content = {
  fi: {
    navigation: { home: 'Etusivu', services: 'Palvelut', software: 'Ohjelmistokehitys', work: 'Esimerkit', about: 'Yritys', contact: 'Yhteystiedot', privacy: 'Tietosuoja', accessibility: 'Saavutettavuus', menu: 'Avaa valikko' },
    tagline: 'SUOMALAINEN DIGIPALVELUYRITYS',
    contactButton: 'Ota yhteyttä', explore: 'Tutustu palveluihin', email: 'Sähköposti',
    hero: { label: 'DATA · AUTOMAATIO · OHJELMISTOT', title: 'Kun työkalut toimivat, työ sujuu.', text: 'Autamme yrityksiä kehittämään raportointia, automatisoimaan toistuvia työvaiheita ja toteuttamaan pieniä ohjelmistoratkaisuja. Selvitämme tarpeen yhdessä ja sovimme työn sisällöstä ennen toteutusta.', point1: 'Sovittu työn sisältö', point2: 'Selkeät lopputulokset', point3: 'Toimivuuden tarkistus' },
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
    ], productTitle:'Omat ohjelmistotuotteemme',productText:'Kehitämme myös omia digitaalisia tuotteita. Asiakastyöt ja omien tuotteiden kehittäminen pidetään erillään, jotta vastuut ja aikataulut ovat selkeät.',productLink:'Tutustu Floentlyyn', limitTitle:'Mitä palveluun ei kuulu?', limit:'Jatkuva päivystys, kriittisten järjestelmien ylläpito ja tietoturvasertifiointi eivät kuulu tavalliseen toimeksiantoon. Niistä on sovittava erikseen.'},
    contactPage:{eyebrow:'YHTEYDENOTTO',title:'Miten voimme auttaa?',lead:'Kerro lyhyesti, mitä haluaisit parantaa ja mitä työkaluja käytät. Voit kysyä tarjousta myös yksittäiseen pieneen tehtävään.', formName:'Nimi (vapaaehtoinen)',formEmail:'Sähköpostiosoite',formService:'Palvelu tai aihe',formMessage:'Kuvaile tehtävää',send:'Lähetä viesti',sending:'Lähetetään...',sent:'Kiitos! Olemme vastaanottaneet yhteydenottosi.',fail:'Viestin lähettäminen ei onnistunut. Voit ottaa yhteyttä myös sähköpostitse.',privacy:'Käytämme lomakkeella antamiasi tietoja yhteydenottoosi vastaamiseen.',select:'Valitse palvelu tai aihe',other:'Muu asia tai en ole varma', note:'Älä lähetä lomakkeella arkaluonteisia henkilötietoja tai asiakkaidesi luottamuksellisia tietoja.', action:'Yritystiedot' },
    privacyPage:{eyebrow:'TIETOSUOJA',title:'Tietosuojaseloste',lead:'Tässä kerromme, miten käsittelemme verkkosivuston kautta saamiamme henkilötietoja.',sections:[
      {title:'Rekisterinpitäjä',body:'Komplyint Oy, Y-tunnus 3588595-3. Yhteydenotot: info@komplyint.fi.'},
      {title:'Käsiteltävät tiedot',body:'Voimme käsitellä nimeäsi, sähköpostiosoitettasi, viestiäsi ja sen turvalliseen lähettämiseen tarvittavia teknisiä tietoja.'},
      {title:'Tarkoitus ja oikeusperuste',body:'Käsittelemme tietoja yhteydenottoihin vastaamista ja mahdollisen sopimuksen valmistelua varten. Käsittely perustuu tilanteen mukaan oikeutettuun etuun tai sopimusta edeltäviin toimiin.'},
      {title:'Säilytys ja palveluntarjoajat',body:'Säilytämme tietoja vain niin kauan kuin yhteydenpito, asiakkuus tai lakisääteiset velvoitteet sitä edellyttävät. Sähköposti- ja verkkopalveluntarjoajat voivat käsitellä tietoja puolestamme sovituin ehdoin.'},
      {title:'Oikeutesi',body:'Sinulla voi olla oikeus tarkastaa tietosi sekä pyytää niiden oikaisua tai poistamista tai käsittelyn rajoittamista. Voit myös vastustaa käsittelyä tai ottaa yhteyttä tietosuojavaltuutettuun.'},
      {title:'Evästeet ja teema-asetus',body:'Sivusto voi tallentaa valitsemasi ulkoasun selaimeen. Jos otamme käyttöön analytiikkaa tai markkinointievästeitä, päivitämme tämän selosteen ja tarvittavat valinnat.'},
      {title:'Muut tuotteet',body:'Muilla ohjelmistotuotteillamme voi olla omat tietosuojaselosteensa.'}
    ]},
    about:{title:'Suomalainen digipalveluyritys',text:'Komplyint Oy auttaa yrityksiä raportoinnissa, automaatiossa ja pienissä ohjelmistoprojekteissa. Kehitämme myös omia digitaalisia tuotteita. Emme tällä hetkellä tarjoa vaatimustenmukaisuuskonsultointia.'},
    footerDescription:'Dataa, automaatiota ja käytännön ohjelmistoratkaisuja yritysten tarpeisiin.',
    footer:'Komplyint Oy · Y-tunnus 3588595-3', footerNote:'Sovimme jokaisen toimeksiannon sisällöstä erikseen. Emme tarjoa oikeudellista neuvontaa, sertifiointia tai viranomaishyväksyntöjä.'
  },
  en: {
    navigation: { home: 'Home', services: 'Services', software: 'Software development', work: 'Examples', about: 'About', contact: 'Contact', privacy: 'Privacy', accessibility: 'Accessibility', menu: 'Open menu' },
    tagline: 'DIGITAL SERVICES FROM FINLAND',
    contactButton: 'Contact us', explore: 'Explore services', email: 'Email',
    hero: {label:'DATA · AUTOMATION · SOFTWARE',title:'Digital tools that make everyday work easier.',text:'We help businesses improve reporting, automate repetitive tasks and build small software tools. We discuss the task with you and agree on the scope before work begins.',point1:'Agreed scope',point2:'Clear deliverables',point3:'Checked before handover'},
    intro:{eyebrow:'WHAT WE DO',title:'Practical help with data, automation and software.',text:'We fix Excel reports, improve Microsoft 365 workflows and develop websites and small applications. We also take on one-off tasks with a clear scope.'},
    area:{eyebrow:'SERVICE AREAS',title:'Find the service you need.',text:'Explore our services to see what we can help with, what you receive and what we discuss before starting.',examples:'Examples of tasks',delivered:'What you get',boundaries:'What we agree in advance',tools:'Tools we use',help:'Ask us about this service'},
    impact:{eyebrow:'EXAMPLE PROJECTS',title:'Examples of the work we can help with.',disclaimer:'These examples are fictional and do not represent completed client projects.',cases:[
      {num:'01',title:'Make a monthly report easier to update',before:'Staff compile a monthly report manually from several Excel files.',after:'One reusable report template with clear instructions.'},
      {num:'02',title:'Make incoming enquiries easier to manage',before:'Enquiries arrive by email and take time to track.',after:'A form gathers requests in one place and notifies the person responsible.'},
      {num:'03',title:'Check how a business website works',before:'The site is difficult to use on a phone, and the contact form may not be working.',after:'A clear list of fixes, the agreed changes and a round of testing.'}
    ]},
    process:{eyebrow:'HOW WE WORK',title:'We agree on the work before we begin.',steps:[
      {title:'Discuss the task',body:'Tell us what takes too much time or is not working as it should.'},
      {title:'Scope and quote',body:'We agree on the tasks, responsibilities, price and timetable.'},
      {title:'Build and test',body:'We use existing tools where possible and test the agreed changes.'},
      {title:'Handover',body:'You receive the finished work, instructions and details of any follow-up support.'}
    ]},
    trust:{eyebrow:'OUR PRINCIPLES',title:'Clear expectations from start to finish.',items:[
      {title:'Start with what you already use',body:'We check whether your current tools can do the job before suggesting new software.'},
      {title:'Agree the scope upfront',body:'We agree on the work and discuss any additional requests before starting.'},
      {title:'Handle data with care',body:'We agree on access permissions and what information needs to be handled and stored.'},
      {title:'Examples are clearly labelled',body:'We identify fictional examples as such and share real client work only with permission.'}
    ]},
    cta:{eyebrow:'GET IN TOUCH',title:'Tell us what you need help with.',text:'Briefly describe the task. We will let you know whether we can help and what information we need to prepare a quote.',button:'Get in touch'},
    software:{eyebrow:'SOFTWARE DEVELOPMENT & MAINTENANCE',title:'Software development for practical business needs.',lead:'We build small digital tools and improve existing web applications. We agree on the work, deployment and maintenance responsibilities before starting.',items:[
      {title:'Internal tools',body:'Tracking tools, forms, calculators and simple information-management systems.'},
      {title:'Fixes & enhancements',body:'Small features, interface changes, bug fixes and testing.'},
      {title:'Scoped integrations',body:'Moving data between systems using their documented APIs.'}
    ],productTitle:'Our software products',productText:'We also develop our own digital products. We keep that work separate from client projects so responsibilities and timelines are clear.',productLink:'Explore Floently',limitTitle:'What is not included in a standard project?',limit:'Ongoing support, maintenance of critical systems and security certification are not included in standard projects. They require a separate agreement.'},
    contactPage:{eyebrow:'CONTACT',title:'How can we help?',lead:'Tell us what you would like to improve and which tools you use. You can also enquire about a small, one-off task.',formName:'Name (optional)',formEmail:'Email address',formService:'Service or topic',formMessage:'Tell us about the task',send:'Send message',sending:'Sending...',sent:'Thank you. We have received your enquiry.',fail:'Your message could not be sent. You can also contact us by email.',privacy:'We use the details you provide to respond to your enquiry.',select:'Select a service or topic',other:'Something else / not sure',note:'Please do not include sensitive personal data or confidential customer information in this form.',action:'Company details'},
    privacyPage:{eyebrow:'PRIVACY',title:'Privacy notice',lead:'This notice explains how we handle personal data received through the website.',sections:[
      {title:'Controller',body:'Komplyint Oy, Finnish Business ID 3588595-3. Contact: info@komplyint.fi.'},
      {title:'Data collected',body:'We may process your name, email address, message and technical information needed to send the message securely.'},
      {title:'Purpose and lawful basis',body:'We use this information to respond to enquiries and discuss potential work. Depending on the circumstances, processing is based on legitimate interests or steps taken before entering into a contract.'},
      {title:'Retention and providers',body:'We keep enquiry details only for as long as needed to communicate, manage a customer relationship or meet legal obligations. Email and hosting providers may process data on our behalf under appropriate agreements.'},
      {title:'Your rights',body:'You may have the right to access, correct or erase your data, restrict its processing or object to processing. You can also contact the Finnish Data Protection Ombudsman.'},
      {title:'Cookies and preferences',body:'The website may save your appearance preference in your browser. If we introduce analytics or marketing cookies, we will update this notice and provide any required choices.'},
      {title:'Other products',body:'Our other software products may have separate privacy notices.'}
    ]},
    about:{title:'A Finnish digital services company',text:'Komplyint Oy is a Finnish company helping businesses with reporting, automation and small software projects. We also develop our own digital products. We do not currently provide compliance consulting.'},
    footerDescription:'Practical support with data, automation and small software projects.',
    footer:'Komplyint Oy · Business ID 3588595-3',footerNote:'Every project has an agreed scope. We do not provide legal advice, certification or regulatory approval.'
  },
  sv: svContent
}

export const serviceSlugs = ["data-reporting","m365-automation","websites-maintenance","software-integrations","testing-qa","document-support"] as const;
export type ServiceSlug = typeof serviceSlugs[number];
export const contactEmail = "info@komplyint.fi";
export const duns = "369283279";
export const canonicalHost = "https://www.komplyint.fi";
