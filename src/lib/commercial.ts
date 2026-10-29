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
    { title: 'Verkkosivut ja ylläpito', intro: 'Selkeämmät verkkosivut, toimivat lomakkeet ja sovitut päivitykset.', examples: ['Sisällön, ulkoasun ja mobiilikäytettävyyden parantaminen', 'Lomakkeiden ja sivuston tärkeimpien toimintojen testaus', 'Suomenkieliset HTML-, CSS- ja pienet JavaScript-muutokset'], deliverable: 'Sovitut muutokset, niiden toimivuuden tarkistus ja kirjalliset ohjeet.', boundaries: 'Palvelinympäristöstä, tietoturvasta ja mahdollisista käyttökatkoista sovitaan erikseen. Jatkuva päivystys ei sisälly palveluun.', tools: 'HTML · CSS · JavaScript · WordPress / muut soveltuvat alustat' },
    { title: 'Ohjelmistokehitys ja integraatiot', intro: 'Verkkosovellusten, rajapintojen ja nykyisten järjestelmien jatkokehitystä sovitun asiantuntijan kanssa.', examples: ['Node.js-, TypeScript-, C#/.NET- ja REST API -taustapalvelut', 'React-, Angular- ja Vue-käyttöliittymät sekä nykyisten sovellusten muutokset', 'Tietojen siirtäminen järjestelmien välillä käytettävissä olevilla rajapinnoilla'], deliverable: 'Sovitut ominaisuudet, niiden testaus sekä sovittu lähdekoodi ja käyttöönotto-ohjeet.', boundaries: 'Vaativa ohjelmistokehitys tehdään englanniksi nimetyn asiantuntijan kanssa; suomenkielinen asiakasviestintä sopimuksen mukaan. Saatavuus ja kriittiset integraatiot arvioidaan erikseen.', tools: 'TypeScript · Node.js · React · Angular · Vue · C#/.NET · API' },
    { title: 'Ohjelmistotestaus ja laadunvarmistus', intro: 'Testausta ennen julkaisua ja muutosten jälkeen.', examples: ['Verkkosivujen ja lomakkeiden toiminnallinen testaus', 'Virheiden toistaminen, kirjaaminen ja korjausten tarkistaminen', 'Sovitut selain- ja mobiilitestit'], deliverable: 'Testausraportti, kiireellisyysjärjestykseen asetetut virheet ja ohjeet niiden toistamiseen.', boundaries: 'Testaus ei korvaa tietoturva-arviointia eikä takaa täysin virheetöntä ohjelmistoa.', tools: 'Manuaalitestaus · Playwright · Testitapaukset · Bugiraportit' },
    { title: 'Asiakirjat ja toimistotuki', intro: 'Apua asiakirjoihin, taulukoihin ja tiedostojen järjestämiseen.', examples: ['PowerPoint-esitysten ja Word-asiakirjapohjien viimeistely', 'Tiedostojen järjestäminen ja Excel-pohjien tekeminen', 'Pienet raportit, asiakirjat ja käyttöohjeet'], deliverable: 'Muokattavat tiedostot ja lyhyet käyttöohjeet sovitun työn mukaan.', boundaries: 'Jatkuvasta avustamisesta, asiakaspalvelusta ja henkilötietojen käsittelystä sovitaan erikseen.', tools: 'PowerPoint · Word · OneDrive · SharePoint · Excel' }
  ],
  en: [
    { title: 'Excel, data & reporting', intro: 'Get spreadsheets in order and make reporting easier to maintain.', examples: ['Excel troubleshooting, formulas and Power Query updates', 'Combining, cleaning and checking data', 'Building and updating Power BI reports'], deliverable: 'A working spreadsheet or report with clear instructions.', boundaries: 'We check the source data, access permissions and any required licences before starting.', tools: 'Excel · Power Query · Power BI · CSV' },
    { title: 'Microsoft 365 & automation', intro: 'Reduce repetitive work with the Microsoft 365 tools you already use.', examples: ['Setting up and improving Forms, Lists and SharePoint processes', 'Power Automate notifications and approval processes', 'Improving workflows in Teams, Outlook and OneDrive'], deliverable: 'The agreed automation, functional checks and maintenance notes.', boundaries: 'Implementation depends on the necessary access permissions and licences.', tools: 'Forms · Lists · SharePoint · Teams · Outlook · Power Automate' },
    { title: 'Websites & maintenance', intro: 'Improve existing websites, forms and content without a full rebuild.', examples: ['Content, layout and mobile usability improvements', 'Testing contact forms and key website functions', 'HTML, CSS and limited JavaScript updates available in Finnish'], deliverable: 'The agreed changes, a functional check and written handover notes.', boundaries: 'We agree separately on hosting, security and downtime responsibilities. Round-the-clock support is not included.', tools: 'HTML · CSS · JavaScript · WordPress / suitable platforms' },
    { title: 'Software engineering & integrations', intro: 'Full-stack web applications, APIs and improvements to existing business software.', examples: ['Node.js, TypeScript, C#/.NET and REST API backend development', 'React, Angular and Vue frontend development and existing-app improvements', 'Moving information between systems using available APIs'], deliverable: 'The agreed features, testing and any source-code or deployment instructions included in the scope.', boundaries: 'Advanced software engineering is delivered in English with a confirmed specialist; Finnish client coordination can be agreed. Availability and critical systems require separate assessment.', tools: 'TypeScript · Node.js · React · Angular · Vue · C#/.NET · APIs' },
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
    hero: { label: 'OHJELMISTOKEHITYS · DATA · AUTOMAATIO · IT-ASIANTUNTIJAT', title: 'Ohjelmistokehitystä, dataa ja automaatiota yrityksille.', text: 'Autamme yrityksiä ja IT-kumppaneita ohjelmistokehityksessä, Power BI -raportoinnissa, automaatiossa ja laadunvarmistuksessa. Toteutamme rajattuja projekteja ja sovimme erikseen pidemmistä asiantuntijatoimeksiannoista.', point1: 'Sovittu työn sisältö', point2: 'Selkeät lopputulokset', point3: 'Toimivuuden tarkistus' },
    intro: { eyebrow: 'MITÄ TEEMME', title: 'Ohjelmistokehitys, data ja digipalvelut samasta paikasta.', text: 'Autamme ohjelmistokehityksessä, Power BI -raportoinnissa, Microsoft 365 -ratkaisuissa ja testauksessa. Myös pienet, rajatut tehtävät ovat tervetulleita.' },
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
    software: {eyebrow:'OHJELMISTOKEHITYS JA YLLÄPITO',title:'Ohjelmistokehitystä ja järjestelmien jatkokehitystä.',lead:'Toteutamme verkkosovelluksia, API-rajapintoja ja jatkokehitystä. HTML-, CSS- ja rajatut JavaScript-muutokset onnistuvat suomeksi; laajempi full-stack-kehitys tehdään englanniksi nimetyn asiantuntijan kanssa.', items:[
      {title:'Sisäiset työkalut',body:'Seurantatyökalut, lomakkeet, laskurit ja yksinkertaiset tiedonhallintaratkaisut.'},
      {title:'Korjaukset ja jatkokehitys',body:'Pienet ominaisuudet, käyttöliittymän muutokset, virheiden korjaaminen ja testaus.'},
      {title:'Rajatut integraatiot',body:'Tietojen siirtäminen järjestelmien välillä niiden tarjoamien rajapintojen avulla.'}
    ], productTitle:'Omat ohjelmistotuotteemme',productText:'Kehitämme myös omia digitaalisia tuotteita. Asiakastyöt ja omien tuotteiden kehittäminen pidetään erillään, jotta vastuut ja aikataulut ovat selkeät.',productLink:'Tutustu Floentlyyn', limitTitle:'Mitä palveluun ei kuulu?', limit:'Jatkuva päivystys, kriittisten järjestelmien ylläpito ja tietoturvasertifiointi eivät kuulu tavalliseen toimeksiantoon. Niistä on sovittava erikseen.'},
    contactPage:{eyebrow:'YHTEYDENOTTO',title:'Miten voimme auttaa?',lead:'Kerro, tarvitsetko projektin toteutuksen, asiantuntijan toimeksiantoon vai apua yksittäisessä tehtävässä.', formName:'Nimi (vapaaehtoinen)',formEmail:'Sähköpostiosoite',formService:'Palvelu tai aihe',formMessage:'Kuvaile tehtävää',send:'Lähetä viesti',sending:'Lähetetään...',sent:'Kiitos! Olemme vastaanottaneet yhteydenottosi.',fail:'Viestin lähettäminen ei onnistunut. Voit ottaa yhteyttä myös sähköpostitse.',privacy:'Käytämme lomakkeella antamiasi tietoja yhteydenottoosi vastaamiseen.',select:'Valitse palvelu tai aihe',other:'Muu asia tai en ole varma', note:'Älä lähetä lomakkeella arkaluonteisia henkilötietoja tai asiakkaidesi luottamuksellisia tietoja.', action:'Yritystiedot' },
    privacyPage:{eyebrow:'TIETOSUOJA',title:'Tietosuojaseloste',lead:'Tässä kerromme, miten käsittelemme verkkosivuston kautta saamiamme henkilötietoja.',sections:[
      {title:'Rekisterinpitäjä',body:'Komplyint Oy, Y-tunnus 3588595-3. Yhteydenotot: info@komplyint.fi.'},
      {title:'Käsiteltävät tiedot',body:'Voimme käsitellä nimeäsi, sähköpostiosoitettasi, viestiäsi ja sen turvalliseen lähettämiseen tarvittavia teknisiä tietoja.'},
      {title:'Tarkoitus ja oikeusperuste',body:'Käsittelemme tietoja yhteydenottoihin vastaamista ja mahdollisen sopimuksen valmistelua varten. Käsittely perustuu tilanteen mukaan oikeutettuun etuun tai sopimusta edeltäviin toimiin.'},
      {title:'Säilytys ja palveluntarjoajat',body:'Säilytämme tietoja vain niin kauan kuin yhteydenpito, asiakkuus tai lakisääteiset velvoitteet sitä edellyttävät. Sähköposti- ja verkkopalveluntarjoajat voivat käsitellä tietoja puolestamme sovituin ehdoin.'},
      {title:'Oikeutesi',body:'Sinulla voi olla oikeus tarkastaa tietosi sekä pyytää niiden oikaisua tai poistamista tai käsittelyn rajoittamista. Voit myös vastustaa käsittelyä tai ottaa yhteyttä tietosuojavaltuutettuun.'},
      {title:'Evästeet ja teema-asetus',body:'Sivusto voi tallentaa valitsemasi ulkoasun selaimeen. Jos otamme käyttöön analytiikkaa tai markkinointievästeitä, päivitämme tämän selosteen ja tarvittavat valinnat.'},
      {title:'Muut tuotteet',body:'Muilla ohjelmistotuotteillamme voi olla omat tietosuojaselosteensa.'}
    ]},
    about:{title:'Suomalainen digipalveluyritys',text:'Komplyint Oy auttaa yrityksiä ohjelmistokehityksessä, raportoinnissa, automaatiossa ja testauksessa. Sovimme projektikohtaisesti asiantuntijasta ja työskentelykielestä. Emme tarjoa oikeudellista neuvontaa tai sertifiointeja.'},
    footerDescription:'Ohjelmistokehitystä, Power BI -raportointia, automaatiota ja laadunvarmistusta.',
    footer:'Komplyint Oy · Y-tunnus 3588595-3', footerNote:'Sovimme jokaisen toimeksiannon sisällöstä erikseen. Emme tarjoa oikeudellista neuvontaa, sertifiointia tai viranomaishyväksyntöjä.'
  },
  en: {
    navigation: { home: 'Home', services: 'Services', software: 'Software development', work: 'Examples', about: 'About', contact: 'Contact', privacy: 'Privacy', accessibility: 'Accessibility', menu: 'Open menu' },
    tagline: 'DIGITAL SERVICES FROM FINLAND',
    contactButton: 'Contact us', explore: 'Explore services', email: 'Email',
    hero: {label:'SOFTWARE ENGINEERING · DATA · AUTOMATION · IT CONSULTING',title:'Software, data and automation expertise for business.',text:'We support companies and IT partners with full-stack software engineering, Power BI reporting, workflow automation and quality assurance. We take on defined projects and discuss longer specialist assignments.',point1:'Agreed scope',point2:'Clear deliverables',point3:'Checked before handover'},
    intro:{eyebrow:'WHAT WE DO',title:'Software delivery, analytics and digital services.',text:'From application development and APIs to Power BI, Microsoft 365 workflows and QA. Small, well-defined tasks are welcome too.'},
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
    software:{eyebrow:'SOFTWARE DEVELOPMENT & MAINTENANCE',title:'Software development and integrations for business.',lead:'We develop web applications, APIs and enhancements to existing systems. HTML, CSS and limited JavaScript work can be delivered in Finnish; advanced full-stack development is performed in English.',items:[
      {title:'Internal tools',body:'Tracking tools, forms, calculators and simple information-management systems.'},
      {title:'Fixes & enhancements',body:'Small features, interface changes, bug fixes and testing.'},
      {title:'Scoped integrations',body:'Moving data between systems using their documented APIs.'}
    ],productTitle:'Our software products',productText:'We also develop our own digital products. We keep that work separate from client projects so responsibilities and timelines are clear.',productLink:'Explore Floently',limitTitle:'What is not included in a standard project?',limit:'Ongoing support, maintenance of critical systems and security certification are not included in standard projects. They require a separate agreement.'},
    contactPage:{eyebrow:'CONTACT',title:'How can we help?',lead:'Tell us whether you need a project delivered, a specialist for an assignment or help with a smaller task.',formName:'Name (optional)',formEmail:'Email address',formService:'Service or topic',formMessage:'Tell us about the task',send:'Send message',sending:'Sending...',sent:'Thank you. We have received your enquiry.',fail:'Your message could not be sent. You can also contact us by email.',privacy:'We use the details you provide to respond to your enquiry.',select:'Select a service or topic',other:'Something else / not sure',note:'Please do not include sensitive personal data or confidential customer information in this form.',action:'Company details'},
    privacyPage:{eyebrow:'PRIVACY',title:'Privacy notice',lead:'This notice explains how we handle personal data received through the website.',sections:[
      {title:'Controller',body:'Komplyint Oy, Finnish Business ID 3588595-3. Contact: info@komplyint.fi.'},
      {title:'Data collected',body:'We may process your name, email address, message and technical information needed to send the message securely.'},
      {title:'Purpose and lawful basis',body:'We use this information to respond to enquiries and discuss potential work. Depending on the circumstances, processing is based on legitimate interests or steps taken before entering into a contract.'},
      {title:'Retention and providers',body:'We keep enquiry details only for as long as needed to communicate, manage a customer relationship or meet legal obligations. Email and hosting providers may process data on our behalf under appropriate agreements.'},
      {title:'Your rights',body:'You may have the right to access, correct or erase your data, restrict its processing or object to processing. You can also contact the Finnish Data Protection Ombudsman.'},
      {title:'Cookies and preferences',body:'The website may save your appearance preference in your browser. If we introduce analytics or marketing cookies, we will update this notice and provide any required choices.'},
      {title:'Other products',body:'Our other software products may have separate privacy notices.'}
    ]},
    about:{title:'A Finnish digital services company',text:'Komplyint Oy supports companies and IT partners with software engineering, data, Microsoft 365 automation and QA. We agree the delivery specialist and working language for each assignment. We do not offer legal advice or certification.'},
    footerDescription:'Software engineering, Power BI reporting, automation and quality assurance.',
    footer:'Komplyint Oy · Business ID 3588595-3',footerNote:'Every project has an agreed scope. We do not provide legal advice, certification or regulatory approval.'
  },
  sv: svContent
}

export const serviceSlugs = ["data-reporting","m365-automation","websites-maintenance","software-integrations","testing-qa","document-support"] as const;
export type ServiceSlug = typeof serviceSlugs[number];
export const contactEmail = "info@komplyint.fi";
export const duns = "369283279";
export const canonicalHost = "https://www.komplyint.fi";

/** Distinguish actual delivery languages from the displayed website locale. */
export const workingLanguages: Record<Lang, string[]> = {
  "fi": [
    "Suomi ja englanti",
    "Suomi ja englanti",
    "Suomi: HTML, CSS ja pienet JavaScript-muutokset; laajempi kehitys englanniksi",
    "Englanti (tekninen kehitys); asiakasviestintä suomeksi sopimuksen mukaan",
    "Suomi ja englanti",
    "Suomi ja englanti"
  ],
  "en": [
    "Finnish and English",
    "Finnish and English",
    "Finnish for HTML, CSS and limited JavaScript; English for advanced development",
    "English technical delivery; Finnish client coordination by agreement",
    "Finnish and English",
    "Finnish and English"
  ],
  "sv": [
    "Finska och engelska",
    "Finska och engelska",
    "Finska för HTML, CSS och mindre JavaScript-ändringar; engelska för avancerad utveckling",
    "Engelska i tekniskt arbete; finskspråkig kundkontakt enligt överenskommelse",
    "Finska och engelska",
    "Finska och engelska"
  ]
};

export const consultingCopy = {
  "fi": {
    "eyebrow": "YHTEISTYÖN TAVAT",
    "title": "Projektin toteutus vai IT-asiantuntija?",
    "lead": "Sovimme projektin tai asiantuntijatoimeksiannon tarpeesi mukaan. Vahvistamme osaamisen, saatavuuden ja työskentelykielen ennen sopimusta.",
    "projectHeading": "Toteutamme projektin",
    "projectText": "Määrittelemme tavoitteen, lopputuloksen ja aikataulun. Esimerkkejä ovat Power BI, automaatiot, verkkopalvelut ja sovellusten jatkokehitys.",
    "consultantHeading": "Tarvitsemme asiantuntijan",
    "consultantText": "Voimme ehdottaa englanninkielistä full-stack-kehittäjää tai suomeksi ja englanniksi työskentelevää data-, Microsoft 365- tai QA-osaamista. Pidemmät toimeksiannot sovitaan erikseen.",
    "languageHeading": "Työskentelykieli on palvelukohtainen",
    "languageLead": "Data, Power BI, Microsoft 365, testaus, projektiseuranta ja dokumentointi: suomi ja englanti. Myös HTML-, CSS- ja pienet JavaScript-muutokset suomeksi. Vaativa full-stack-kehitys englanniksi.",
    "languageNote": "Suomenkielinen asiakasviestintä voidaan yhdistää englanninkieliseen tekniseen toteutukseen, jos asiakkaalle sopii. Ruotsinkielinen sivusto ei tarkoita ruotsinkielistä asiantuntijatyötä.",
    "trainingHeading": "Osaamisen kehittäminen",
    "trainingText": "AWS:n ja Udacityn no-code- ja tekoälyavusteisen BI:n opinnot ovat käynnissä. Koulutusta ei esitetä suoritettuna sertifiointina.",
    "ctaProject": "Kysy projektista",
    "ctaConsultant": "Kysy asiantuntijaa",
    "workLabel": "Työskentelykieli",
    "formEngagement": "Toimeksiannon tyyppi",
    "formLanguage": "Teknisen työn edellyttämä kieli",
    "options": [
      "Projektin toteutus",
      "Asiantuntijatoimeksianto",
      "Ylläpito tai jatkuva tuki",
      "Muu tarve"
    ],
    "languageOptions": [
      "Suomi",
      "Englanti",
      "Suomi tai englanti",
      "Muu, tarkenna viestissä"
    ]
  },
  "en": {
    "eyebrow": "ENGAGEMENT OPTIONS",
    "title": "Project delivery or an IT specialist?",
    "lead": "Choose a defined project or discuss specialist support. We confirm skills, availability and technical working language before agreeing to an assignment.",
    "projectHeading": "Deliver a project",
    "projectText": "Agree the outcome, responsibilities and timeframe. Typical work includes Power BI, automation, websites and application enhancements.",
    "consultantHeading": "Find an IT specialist",
    "consultantText": "We can propose an English-speaking full-stack engineer or Finnish- and English-speaking data, Microsoft 365 and QA expertise. Longer assignments are agreed individually.",
    "languageHeading": "Working language depends on the service",
    "languageLead": "Data, Power BI, Microsoft 365, QA, project tracking and documentation: Finnish and English. HTML, CSS and limited JavaScript changes also available in Finnish. Advanced full-stack delivery: English.",
    "languageNote": "Finnish-speaking customer coordination can accompany English-speaking technical delivery by agreement. A Swedish-language website does not imply Swedish-speaking consultant availability.",
    "trainingHeading": "Professional development",
    "trainingText": "AWS/Udacity no-code and AI-assisted business intelligence studies are in progress. These are not presented as completed certification.",
    "ctaProject": "Discuss a project",
    "ctaConsultant": "Ask about a consultant",
    "workLabel": "Working language",
    "formEngagement": "Engagement type",
    "formLanguage": "Required technical working language",
    "options": [
      "Project delivery",
      "Consultant assignment",
      "Maintenance or ongoing support",
      "Other requirement"
    ],
    "languageOptions": [
      "Finnish",
      "English",
      "Finnish or English",
      "Other, explain in message"
    ]
  },
  "sv": {
    "eyebrow": "SAMARBETSFORMER",
    "title": "Ett projekt eller en IT-specialist?",
    "lead": "Vi genomför avgränsade projekt och diskuterar längre konsultuppdrag. Kompetens, tillgänglighet och arbetsspråk bekräftas före avtal.",
    "projectHeading": "Vi genomför ett projekt",
    "projectText": "Vi kommer överens om resultat, ansvar och tidtabell. Det kan gälla Power BI, automatisering, webbplatser och vidareutveckling.",
    "consultantHeading": "Vi behöver en specialist",
    "consultantText": "Vi kan föreslå en engelskspråkig fullstackutvecklare eller data-, Microsoft 365- och testkompetens på finska och engelska. Längre uppdrag avtalas separat.",
    "languageHeading": "Arbetsspråk enligt tjänst",
    "languageLead": "Data, Power BI, Microsoft 365, testning, projektuppföljning och dokumentation: finska och engelska. HTML-, CSS- och mindre JavaScript-ändringar också på finska. Avancerad fullstackutveckling: engelska.",
    "languageNote": "Finskspråkig kundkontakt kan kombineras med engelskspråkigt tekniskt arbete enligt överenskommelse. En svenskspråkig webbplats innebär inte att konsulterna arbetar på svenska.",
    "trainingHeading": "Kompetensutveckling",
    "trainingText": "Studier i no-code och AI-stödd business intelligence via AWS och Udacity pågår. De anges inte som en slutförd certifiering.",
    "ctaProject": "Diskutera ett projekt",
    "ctaConsultant": "Fråga efter en konsult",
    "workLabel": "Arbetsspråk",
    "formEngagement": "Typ av uppdrag",
    "formLanguage": "Arbetsspråk som krävs för det tekniska arbetet",
    "options": [
      "Projektleverans",
      "Konsultuppdrag",
      "Underhåll eller löpande stöd",
      "Annat behov"
    ],
    "languageOptions": [
      "Finska",
      "Engelska",
      "Finska eller engelska",
      "Annat, ange i meddelandet"
    ]
  }
} as const;
