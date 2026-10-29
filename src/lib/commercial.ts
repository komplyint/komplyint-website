import type { Locale } from './i18n'
import { svServices, svContent } from './i18n-sv'

export type Lang = Locale
export type Page = 'home' | 'services' | 'software' | 'work' | 'about' | 'contact' | 'privacy' | 'accessibility'
export type Service = { title: string; intro: string; examples: string[]; deliverable: string; boundaries: string; tools: string }
export const navPages: Page[] = ['services', 'software', 'work', 'about', 'contact']
export const services: Record<Lang, Service[]> = {
  fi: [
    { title: 'Excel, data ja raportointi', intro: 'Excel-tiedostot kuntoon ja raportointi sujuvammaksi.', examples: ['Excel-tiedostojen korjaaminen, kaavat ja Power Query -muokkaukset', 'Tietojen yhdistäminen, siivoaminen ja tarkistaminen', 'Power BI -raporttien rakentaminen ja päivittäminen'], deliverable: 'Toimiva tiedosto tai raportti sekä selkeät käyttöohjeet.', boundaries: 'Tarkistamme lähtötiedot, käyttöoikeudet ja tarvittavat lisenssit ennen työn aloittamista.', tools: 'Excel · Power Query · Power BI · CSV' },
    { title: 'Microsoft 365 ja automaatio', intro: 'Toistuvat työvaiheet helpommiksi Microsoft 365:n työkaluilla.', examples: ['Forms-, Lists- ja SharePoint-ratkaisujen kehittäminen', 'Power Automate -ilmoitukset ja hyväksymisprosessit', 'Teamsin, Outlookin ja OneDriven työnkulkujen parantaminen'], deliverable: 'Sovittu automaatio, sen toimivuuden tarkistus ja ylläpito-ohjeet.', boundaries: 'Toteutus edellyttää tarvittavia käyttöoikeuksia ja lisenssejä.', tools: 'Forms · Lists · SharePoint · Teams · Outlook · Power Automate' },
    { title: 'Verkkosivut ja ylläpito', intro: 'Selkeämmät verkkosivut, toimivat lomakkeet ja sovitut päivitykset.', examples: ['Sisällön, ulkoasun ja mobiilikäytettävyyden parantaminen', 'Lomakkeiden ja sivuston tärkeimpien toimintojen testaus', 'Verkkosivujen korjaukset sovitun kehittäjän kanssa; tekninen työ englanniksi'], deliverable: 'Sovitut muutokset, niiden toimivuuden tarkistus ja kirjalliset ohjeet.', boundaries: 'Palvelinympäristöstä, tietoturvasta ja mahdollisista käyttökatkoista sovitaan erikseen. Jatkuva päivystys ei sisälly palveluun.', tools: 'HTML · CSS · JavaScript · WordPress / muut soveltuvat alustat' },
    { title: 'Ohjelmistokehitys ja integraatiot', intro: 'Sovellusten korjaukset, uudet ominaisuudet ja toimivammat integraatiot.', examples: ['Nykyisen sovelluksen virheiden korjaaminen ja jatkokehitys', 'Käyttöliittymä- ja taustapalvelutehtävät osana asiakkaan kehitysjonoa', 'Rajapintojen sekä tiedonsiirron toimivuuden parantaminen'], deliverable: 'Sovitut ominaisuudet, niiden testaus sekä sovittu lähdekoodi ja käyttöönotto-ohjeet.', boundaries: 'Vaativa ohjelmistokehitys tehdään englanniksi nimetyn asiantuntijan kanssa; suomenkielinen asiakasviestintä sopimuksen mukaan. Saatavuus ja kriittiset integraatiot arvioidaan erikseen.', tools: 'TypeScript · Node.js · React · Angular · Vue · C#/.NET · API' },
    { title: 'Ohjelmistotestaus ja laadunvarmistus', intro: 'Selvitämme virheet ja autamme varmistamaan, että ohjelmistomuutokset toimivat ennen julkaisua.', examples: ['Toiminnallinen testaus ja testitapausten suunnittelu', 'Virheiden toistaminen, raportointi ja korjausten todentaminen', 'Soveltuva regressio-, rajapinta- ja selaintestaus'], deliverable: 'Testausraportti, kiireellisyysjärjestykseen asetetut virheet ja ohjeet niiden toistamiseen.', boundaries: 'Testaus ei korvaa tietoturva-arviointia eikä takaa täysin virheetöntä ohjelmistoa.', tools: 'Manuaalitestaus · Robot Framework · Playwright · API-testit' },
    { title: 'Asiakirjat ja toimistotuki', intro: 'Apua asiakirjoihin, taulukoihin ja tiedostojen järjestämiseen.', examples: ['PowerPoint-esitysten ja Word-asiakirjapohjien viimeistely', 'Tiedostojen järjestäminen ja Excel-pohjien tekeminen', 'Pienet raportit, asiakirjat ja käyttöohjeet'], deliverable: 'Muokattavat tiedostot ja lyhyet käyttöohjeet sovitun työn mukaan.', boundaries: 'Jatkuvasta avustamisesta, asiakaspalvelusta ja henkilötietojen käsittelystä sovitaan erikseen.', tools: 'PowerPoint · Word · OneDrive · SharePoint · Excel' }
  ],
  en: [
    { title: 'Excel, data & reporting', intro: 'Get spreadsheets in order and make reporting easier to maintain.', examples: ['Excel troubleshooting, formulas and Power Query updates', 'Combining, cleaning and checking data', 'Building and updating Power BI reports'], deliverable: 'A working spreadsheet or report with clear instructions.', boundaries: 'We check the source data, access permissions and any required licences before starting.', tools: 'Excel · Power Query · Power BI · CSV' },
    { title: 'Microsoft 365 & automation', intro: 'Reduce repetitive work with the Microsoft 365 tools you already use.', examples: ['Setting up and improving Forms, Lists and SharePoint processes', 'Power Automate notifications and approval processes', 'Improving workflows in Teams, Outlook and OneDrive'], deliverable: 'The agreed automation, functional checks and maintenance notes.', boundaries: 'Implementation depends on the necessary access permissions and licences.', tools: 'Forms · Lists · SharePoint · Teams · Outlook · Power Automate' },
    { title: 'Websites & maintenance', intro: 'Improve existing websites, forms and content without a full rebuild.', examples: ['Content, layout and mobile usability improvements', 'Testing contact forms and key website functions', 'Website changes delivered by an agreed developer in English; Finnish client coordination available'], deliverable: 'The agreed changes, a functional check and written handover notes.', boundaries: 'We agree separately on hosting, security and downtime responsibilities. Round-the-clock support is not included.', tools: 'HTML · CSS · JavaScript · WordPress / suitable platforms' },
    { title: 'Software engineering & integrations', intro: 'Fix existing applications, deliver features and improve integrations.', examples: ['Fixing recurring bugs and improving maintainability', 'Delivering frontend and backend tasks within an agreed agile backlog', 'Improving APIs, data exchange and integration error handling'], deliverable: 'The agreed features, testing and any source-code or deployment instructions included in the scope.', boundaries: 'Advanced software engineering is delivered in English with a confirmed specialist; Finnish client coordination can be agreed. Availability and critical systems require separate assessment.', tools: 'TypeScript · Node.js · React · Angular · Vue · C#/.NET · APIs' },
    { title: 'Software testing & QA', intro: 'Find defects early and establish clearer release evidence for software changes.', examples: ['Functional QA and clearly defined test cases', 'Reproducing, prioritising and retesting defects', 'Suitable regression, API and browser checks'], deliverable: 'A test report, prioritised issues and steps to reproduce them.', boundaries: 'Testing is not a security audit or a guarantee that software is free of defects.', tools: 'Manual QA · Robot Framework · Playwright · API checks' },
    { title: 'Documents and office support', intro: 'Help with documents, spreadsheets and organising files.', examples: ['Finishing PowerPoint presentations and Word templates', 'Organising files and creating Excel templates', 'Short reports, documents and user instructions'], deliverable: 'Editable files and concise instructions for the agreed work.', boundaries: 'Ongoing administration, customer service and handling personal data require separate agreement.', tools: 'PowerPoint · Word · OneDrive · SharePoint · Excel' }
  ],
  sv: svServices
}
export const content = {
  fi: {
    navigation: { home: 'Etusivu', services: 'Palvelut', software: 'Ohjelmistokehitys', work: 'Esimerkit', about: 'Yritys', contact: 'Yhteystiedot', privacy: 'Tietosuoja', accessibility: 'Saavutettavuus', menu: 'Avaa valikko' },
    tagline: 'SUOMALAINEN DIGIPALVELUYRITYS',
    contactButton: 'Ota yhteyttä', explore: 'Tutustu palveluihin', email: 'Sähköposti',
    hero: { label: 'OHJELMISTOKEHITYS · DATA · AUTOMAATIO · IT-ASIANTUNTIJAT', title: 'Ohjelmistokehitystä, testausta ja toimivia integraatioita.', text: 'Autamme jatkokehittämään sovelluksia, korjaamaan rajapintoja ja varmistamaan muutosten toimivuuden. Toteutamme sovittuja projekteja ja tarjoamme myös Power BI -raportointia sekä Microsoft 365 -ratkaisuja.', point1: 'Sovittu työn sisältö', point2: 'Selkeät lopputulokset', point3: 'Toimivuuden tarkistus' },
    intro: { eyebrow: 'MITÄ TEEMME', title: 'Ohjelmistokehitys, data ja digipalvelut samasta paikasta.', text: 'Autamme ohjelmistokehityksessä, Power BI -raportoinnissa, Microsoft 365 -ratkaisuissa ja testauksessa. Myös pienet, rajatut tehtävät ovat tervetulleita.' },
    area: { eyebrow: 'PALVELUMME', title: 'Valitse palvelu tarpeesi mukaan.', text: 'Autamme nykyisten sovellusten jatkokehityksessä, rajapinnoissa, ohjelmistotestauksessa, datassa ja Microsoft 365 -ratkaisuissa. Valitse palvelu tai katso esimerkkejä mahdollisista toimeksiannoista.', examples: 'Esimerkkejä tehtävistä', delivered: 'Mitä saat', boundaries: 'Mistä sovitaan etukäteen', tools: 'Käytettävät työkalut', help: 'Kysy lisää palvelusta' },
    impact: { eyebrow: 'ESIMERKKEJÄ', title: 'Esimerkkejä mahdollisista toteutuksista.', disclaimer: 'Esimerkit ovat kuvitteellisia, eivät toteutettuja asiakastöitä.', cases: [
      { num: '01', title: 'Kuukausiraportin selkeyttäminen', before: 'Kuukausiraportti kootaan käsin useasta Excel-tiedostosta.', after: 'Yksi päivitettävä raporttipohja ja selkeät käyttöohjeet.' },
      { num: '02', title: 'Yhteydenottojen käsittelyn helpottaminen', before: 'Yhteydenotot tulevat sähköpostiin, ja niiden seuranta vie aikaa.', after: 'Lomake kokoaa pyynnöt yhteen ja ilmoittaa niistä vastuuhenkilölle.' },
      { num: '03', title: 'Verkkosivujen toimivuuden tarkistaminen', before: 'Sivusto toimii huonosti puhelimella, eikä lomakkeen toimivuudesta ole varmuutta.', after: 'Selkeä korjauslista, sovitut muutokset ja niiden testaus.' }
    ], featuredSoftwareTitle:'Kun sovellus tarvitsee korjauksia tai jatkokehitystä.', featuredSoftwareText:'Kuvitteellisessa esimerkissä yrityksen vanhan sovelluksen toistuvat virheet selvitetään ja sovitut korjaukset sekä uudet ominaisuudet toteutetaan vaiheittain ja testataan.', dataAnchor:'Data ja arjen työnkulut', softwareAnchor:'Ohjelmistokehityksen esimerkit', softwareLink:'Katso ohjelmistokehityksen esimerkit', softwareEyebrow:'OHJELMISTOKEHITYS', softwareTitle:'Esimerkkejä ohjelmistokehityksen toimeksiannoista.', softwareLead:'Miten autamme, kun sovellusta pitää jatkokehittää, järjestelmiä yhdistää tai julkaisu varmistaa. Nämäkin esimerkit ovat kuvitteellisia.', softwareCases: [
      { num:'04', title:'Sovelluksen korjaus ja jatkokehitys', before:'Nykyisen sovelluksen virheet toistuvat, ja uusien ominaisuuksien toteutus vie aikaa.', after:'Virheen syy selvitetään, sovittu ominaisuus toteutetaan ja muutokset testataan.' },
      { num:'05', title:'Rajapinnan toimivuuden parantaminen', before:'Kahden järjestelmän tiedot eivät päivity luotettavasti, ja niitä siirretään käsin.', after:'Rajapinnan tiedonsiirtoa ja virhetilanteiden käsittelyä parannetaan ja testataan.' },
      { num:'06', title:'Julkaisua edeltävä ohjelmistotestaus', before:'Ohjelmistomuutokset aiheuttavat uusia virheitä, eikä testauksen kattavuus ole selvä.', after:'Tärkeimmät käyttötapaukset testataan, virheet raportoidaan ja sovitut tarkistukset automatisoidaan.' }
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
    software: {eyebrow:'OHJELMISTOKEHITYS · RAJAPINNAT · TESTAUS',title:'Jatkokehitystä ja korjauksia olemassa oleviin sovelluksiin.',lead:'Autamme, kun sovelluksen muutokset ovat hitaita, rajapinnat eivät toimi tai kehitystehtävät kasaantuvat. Sovimme ensin tavoitteesta ja toteutamme sovitut muutokset vaiheittain. Full-stack-kehityksen tekninen työ tehdään englanniksi; suomenkielinen asiakasviestintä voidaan järjestää.', items:[
      {title:'Sovelluksen ylläpidettävyys',body:'Nykyisen koodin selvittäminen, virheiden paikantaminen ja sovittu jatkokehitys ilman tarpeetonta kokonaisuudistusta.'},
      {title:'API:t ja integraatiot',body:'Tietojen siirron, rajapintojen ja taustapalvelujen kehittäminen sekä virhetilanteiden käsittely ja testaus.'},
      {title:'Käyttöliittymien ja ominaisuuksien kehitys',body:'Sovittujen frontend- ja backend-tehtävien toteutus asiakkaan kehitysjonon ja katselmointikäytäntöjen mukaisesti.'},
      {title:'Testaus osana kehitystä',body:'Toiminnallinen testaus, testitapaukset, rajapintojen tarkistukset ja soveltuva testiautomaatio ennen julkaisua.'}
    ], productTitle:'Omat ohjelmistotuotteemme',productText:'Kehitämme myös omia digitaalisia tuotteita. Asiakastyöt ja omien tuotteiden kehittäminen pidetään erillään, jotta vastuut ja aikataulut ovat selkeät.',productLink:'Tutustu Floentlyyn',limitTitle:'Sovitaan työ ennen aloitusta',limit:'Asiantuntija, työskentelykieli, rajaukset, testaus ja ylläpitovastuut vahvistetaan ennen toimeksiantoa. Kriittisten järjestelmien päivystys tai tietoturvasertifiointi eivät sisälly peruspalveluun.'},
    contactPage:{eyebrow:'YHTEYDENOTTO',title:'Miten voimme auttaa?',lead:'Kuvaile, missä sovellus, rajapinta, testaus tai raportointi tarvitsee apua. Voit kysyä projektin toteutusta, asiantuntijaa toimeksiantoon tai yksittäistä korjausta.', formName:'Nimi (vapaaehtoinen)',formEmail:'Sähköpostiosoite',formService:'Palvelu tai aihe',formMessage:'Kuvaile tehtävää',send:'Lähetä viesti',sending:'Lähetetään...',sent:'Kiitos! Olemme vastaanottaneet yhteydenottosi.',fail:'Viestin lähettäminen ei onnistunut. Voit ottaa yhteyttä myös sähköpostitse.',privacy:'Käytämme lomakkeella antamiasi tietoja yhteydenottoosi vastaamiseen.',select:'Valitse palvelu tai aihe',other:'Muu asia tai en ole varma', note:'Älä lähetä lomakkeella arkaluonteisia henkilötietoja tai asiakkaidesi luottamuksellisia tietoja.', action:'Yritystiedot' },
    privacyPage:{eyebrow:'TIETOSUOJA',title:'Tietosuojaseloste',lead:'Tässä kerromme, miten käsittelemme verkkosivuston kautta saamiamme henkilötietoja.',sections:[
      {title:'Rekisterinpitäjä',body:'Komplyint Oy, Y-tunnus 3588595-3. Yhteydenotot: info@komplyint.fi.'},
      {title:'Käsiteltävät tiedot',body:'Voimme käsitellä nimeäsi, sähköpostiosoitettasi, viestiäsi ja sen turvalliseen lähettämiseen tarvittavia teknisiä tietoja.'},
      {title:'Tarkoitus ja oikeusperuste',body:'Käsittelemme tietoja yhteydenottoihin vastaamista ja mahdollisen sopimuksen valmistelua varten. Käsittely perustuu tilanteen mukaan oikeutettuun etuun tai sopimusta edeltäviin toimiin.'},
      {title:'Säilytys ja palveluntarjoajat',body:'Säilytämme tietoja vain niin kauan kuin yhteydenpito, asiakkuus tai lakisääteiset velvoitteet sitä edellyttävät. Sähköposti- ja verkkopalveluntarjoajat voivat käsitellä tietoja puolestamme sovituin ehdoin.'},
      {title:'Oikeutesi',body:'Sinulla voi olla oikeus tarkastaa tietosi sekä pyytää niiden oikaisua tai poistamista tai käsittelyn rajoittamista. Voit myös vastustaa käsittelyä tai ottaa yhteyttä tietosuojavaltuutettuun.'},
      {title:'Evästeet ja teema-asetus',body:'Sivusto voi tallentaa valitsemasi ulkoasun selaimeen. Jos otamme käyttöön analytiikkaa tai markkinointievästeitä, päivitämme tämän selosteen ja tarvittavat valinnat.'},
      {title:'Muut tuotteet',body:'Muilla ohjelmistotuotteillamme voi olla omat tietosuojaselosteensa.'}
    ]},
    about:{title:'Ohjelmistokehitystä, testausta ja datapalveluja',text:'Komplyint Oy tukee yrityksiä nykyisten ohjelmistojen kehittämisessä, rajapintojen parantamisessa, testauksessa ja raportoinnissa. Työ toteutetaan sovittuina projekteina tai osana asiakkaan kehitystiimiä. Ohjelmistokehityksen asiantuntija ja tekninen työskentelykieli vahvistetaan toimeksiantokohtaisesti. Emme tarjoa oikeudellista neuvontaa tai sertifiointeja.'},
    footerDescription:'Ohjelmistokehitystä, Power BI -raportointia, automaatiota ja laadunvarmistusta.',
    footer:'Komplyint Oy · Y-tunnus 3588595-3', footerNote:'Sovimme jokaisen toimeksiannon sisällöstä erikseen. Emme tarjoa oikeudellista neuvontaa, sertifiointia tai viranomaishyväksyntöjä.'
  },
  en: {
    navigation: { home: 'Home', services: 'Services', software: 'Software development', work: 'Examples', about: 'About', contact: 'Contact', privacy: 'Privacy', accessibility: 'Accessibility', menu: 'Open menu' },
    tagline: 'DIGITAL SERVICES FROM FINLAND',
    contactButton: 'Contact us', explore: 'Explore services', email: 'Email',
    hero: {label:'SOFTWARE ENGINEERING · DATA · AUTOMATION · IT CONSULTING',title:'Software development, testing and reliable integrations.',text:'We help teams improve existing applications, repair integrations and test changes before release. Defined projects, agreed specialist assignments, Power BI and Microsoft 365 support are available.',point1:'Agreed scope',point2:'Clear deliverables',point3:'Checked before handover'},
    intro:{eyebrow:'WHAT WE DO',title:'Software delivery, analytics and digital services.',text:'From application development and APIs to Power BI, Microsoft 365 workflows and QA. Small, well-defined tasks are welcome too.'},
    area:{eyebrow:'SERVICE AREAS',title:'Find the service you need.',text:'Explore software maintenance, integration and testing alongside data, reporting and Microsoft 365 services. Choose a service or review illustrative assignments to see how we work.',examples:'Examples of tasks',delivered:'What you get',boundaries:'What we agree in advance',tools:'Tools we use',help:'Ask us about this service'},
    impact:{eyebrow:'EXAMPLE PROJECTS',title:'Examples of the work we can help with.',disclaimer:'These examples are fictional and do not represent completed client projects.',cases:[
      {num:'01',title:'Make a monthly report easier to update',before:'Staff compile a monthly report manually from several Excel files.',after:'One reusable report template with clear instructions.'},
      {num:'02',title:'Make incoming enquiries easier to manage',before:'Enquiries arrive by email and take time to track.',after:'A form gathers requests in one place and notifies the person responsible.'},
      {num:'03',title:'Check how a business website works',before:'The site is difficult to use on a phone, and the contact form may not be working.',after:'A clear list of fixes, the agreed changes and a round of testing.'}
    ],featuredSoftwareTitle:'When an existing application needs attention.', featuredSoftwareText:'In this fictional example, recurring application defects are investigated and an agreed fix and new feature are developed incrementally, reviewed and tested.', dataAnchor:'Data and everyday workflows', softwareAnchor:'Software development examples', softwareLink:'Explore software development examples', softwareEyebrow:'SOFTWARE ENGINEERING',softwareTitle:'Examples of software development assignments.',softwareLead:'How we could help with application enhancements, system integrations and release readiness. These scenarios are illustrative, not completed client projects.',softwareCases:[
      {num:'04',title:'Fix and extend an existing application',before:'Recurring defects make the existing application hard to change and new features slow to deliver.',after:'Identify the cause, implement an agreed improvement and test the changes.'},
      {num:'05',title:'Improve an unreliable API integration',before:'Two business systems fail to exchange updates reliably, leading to manual data entry.',after:'Improve API data transfer and error handling, then verify the integration.'},
      {num:'06',title:'Test software before a release',before:'Application updates introduce regressions and it is unclear what has been tested.',after:'Test critical user journeys, report defects and automate agreed repeatable checks.'}
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
    software:{eyebrow:'SOFTWARE ENGINEERING · APIs · QUALITY',title:'Maintain, extend and integrate your existing applications.',lead:'We help when software changes take too long, integrations fail or feature backlogs build up. We agree the problem and acceptance criteria, then deliver improvements in manageable steps. Technical software engineering is in English, with Finnish-speaking client coordination by agreement.',items:[
      {title:'Maintainable applications',body:'Understand existing code, diagnose recurring bugs and implement agreed enhancements without an unnecessary complete rewrite.'},
      {title:'APIs and system integrations',body:'Improve data exchange, backend services, error handling, testing and integration documentation.'},
      {title:'Frontend and backend features',body:'Deliver defined tasks in the client’s backlog, following their reviews and engineering practices.'},
      {title:'Testing within development',body:'Functional QA, test cases, API and regression checks, and suitable automation before release.'}
    ],productTitle:'Our software products',productText:'We also develop our own digital products. We keep this work separate from client projects so responsibilities and timelines remain clear.',productLink:'Explore Floently',limitTitle:'Agree delivery responsibilities first',limit:'The specialist, technical language, scope, testing and support responsibilities are confirmed before engagement. Critical-system standby and security certification are outside the standard service.'},
    contactPage:{eyebrow:'CONTACT',title:'How can we help?',lead:'Tell us about an application issue, API integration, testing requirement or reporting task. We can discuss a defined project, specialist assignment or smaller fix.',formName:'Name (optional)',formEmail:'Email address',formService:'Service or topic',formMessage:'Tell us about the task',send:'Send message',sending:'Sending...',sent:'Thank you. We have received your enquiry.',fail:'Your message could not be sent. You can also contact us by email.',privacy:'We use the details you provide to respond to your enquiry.',select:'Select a service or topic',other:'Something else / not sure',note:'Please do not include sensitive personal data or confidential customer information in this form.',action:'Company details'},
    privacyPage:{eyebrow:'PRIVACY',title:'Privacy notice',lead:'This notice explains how we handle personal data received through the website.',sections:[
      {title:'Controller',body:'Komplyint Oy, Finnish Business ID 3588595-3. Contact: info@komplyint.fi.'},
      {title:'Data collected',body:'We may process your name, email address, message and technical information needed to send the message securely.'},
      {title:'Purpose and lawful basis',body:'We use this information to respond to enquiries and discuss potential work. Depending on the circumstances, processing is based on legitimate interests or steps taken before entering into a contract.'},
      {title:'Retention and providers',body:'We keep enquiry details only for as long as needed to communicate, manage a customer relationship or meet legal obligations. Email and hosting providers may process data on our behalf under appropriate agreements.'},
      {title:'Your rights',body:'You may have the right to access, correct or erase your data, restrict its processing or object to processing. You can also contact the Finnish Data Protection Ombudsman.'},
      {title:'Cookies and preferences',body:'The website may save your appearance preference in your browser. If we introduce analytics or marketing cookies, we will update this notice and provide any required choices.'},
      {title:'Other products',body:'Our other software products may have separate privacy notices.'}
    ]},
    about:{title:'Software engineering, testing and data services',text:'Komplyint Oy supports companies with application maintenance, API integrations, software testing, reporting and Microsoft 365 workflows. We can deliver defined projects or contribute to an existing development team. Technical software delivery is assigned to an agreed specialist with an agreed working language. We do not provide legal advice or certification.'},
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
    "Verkkokehityksen tekninen toteutus englanniksi; asiakasviestintä suomeksi sovittaessa",
    "Englanti (tekninen kehitys); asiakasviestintä suomeksi sopimuksen mukaan",
    "Suomi ja englanti",
    "Suomi ja englanti"
  ],
  "en": [
    "Finnish and English",
    "Finnish and English",
    "Website engineering in English; Finnish client coordination by agreement",
    "English technical delivery; Finnish client coordination by agreement",
    "Finnish and English",
    "Finnish and English"
  ],
  "sv": [
    "Finska och engelska",
    "Finska och engelska",
    "Webbutveckling på engelska; kundkontakt på finska enligt överenskommelse",
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
    "languageLead": "Data, Power BI, Microsoft 365, testaus, projektiseuranta ja dokumentointi: suomi ja englanti. Ohjelmisto- ja verkkokehitys: englanti, suomenkielinen asiakasviestintä sopimuksen mukaan.",
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
    "languageLead": "Data, Power BI, Microsoft 365, QA, project tracking and documentation: Finnish and English. Software and website engineering: English, with Finnish-speaking client coordination by agreement.",
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
    "languageLead": "Data, Power BI, Microsoft 365, testning, projektuppföljning och dokumentation: finska och engelska. Program- och webbutveckling sker på engelska; finskspråkig kundkontakt enligt överenskommelse.",
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


/** Public delivery capability, with the developer's professional experience
 * attributed to the project-based specialist rather than the company owner.
 * Keep locale selection distinct from the language used by the actual developer.
 */
export const spotlightCopy = {
  "fi": {
    "eyebrow": "OHJELMISTOKEHITYS · INTEGRAATIOT · TESTAUS",
    "title": "Ratkaisuja ohjelmistojen arjen ongelmiin.",
    "lead": "Kun nykyinen sovellus on vaikea muuttaa, integraatiot aiheuttavat käsityötä tai julkaisut tuovat uusia virheitä, autamme selvittämään tilanteen ja toteuttamaan rajatut parannukset. Työ voidaan tehdä projektina tai osana asiakkaan kehitystiimiä.",
    "problemLabel": "ASIAKKAAN HAASTE",
    "solutionLabel": "MITEN AUTAMME",
    "outcomeLabel": "TAVOITTEENA",
    "problems": [
      {
        "title": "Vanhaa sovellusta on vaikea kehittää",
        "problem": "Muutokset vievät aikaa, virheet toistuvat ja koodin ylläpito kuormittaa omaa tiimiä.",
        "solution": "Perehdymme nykyiseen toteutukseen, selvitämme ongelman syyt ja teemme hallittuja korjauksia sekä sovittua jatkokehitystä.",
        "outcome": "Ylläpidettävämpi sovellus ja ennakoitavammat muutokset."
      },
      {
        "title": "Järjestelmien väliset tiedot eivät kulje",
        "problem": "Tietoja siirretään käsin tai rajapintojen virheet katkaisevat työnkulun.",
        "solution": "Kehitämme ja korjaamme rajapintoja, taustapalveluja ja tiedonsiirtoa. Sovimme virheiden käsittelystä, testauksesta ja dokumentoinnista.",
        "outcome": "Vähemmän manuaalisia vaiheita ja luotettavampi tiedonkulku."
      },
      {
        "title": "Uudet ominaisuudet eivät etene",
        "problem": "Oma kehitystiimi tarvitsee apua käyttöliittymiin, palvelinpuolen toimintoihin tai keskeneräisiin kehitystehtäviin.",
        "solution": "Toteutamme sovittuja osia nykyiseen sovellukseen ja työskentelemme asiakkaan backlogissa, koodikatselmointien ja tiimin käytäntöjen mukaisesti.",
        "outcome": "Kehitystehtävät etenevät ilman tarpeetonta järjestelmän uusimista."
      },
      {
        "title": "Testaus hidastaa julkaisua",
        "problem": "Manuaaliset tarkistukset vievät aikaa eikä muutosten vaikutuksia ole helppo todentaa.",
        "solution": "Laadimme testitapauksia, tutkimme ja raportoimme virheitä, testaamme rajapintoja sekä automatisoimme toistuvia tarkistuksia sovitusti.",
        "outcome": "Selkeämpi kuva ohjelmiston laadusta ja hallitumpi julkaisu."
      }
    ],
    "deliveryEyebrow": "KETTERÄ YHTEISTYÖ",
    "deliveryHeading": "Selkeä tehtävä. Näkyvä eteneminen. Testattu muutos.",
    "deliveryLead": "Emme edellytä kokonaisen järjestelmän uusimista. Sovimme ensin, mitä ongelmaa korjataan ja mistä tiedämme työn onnistuneen. Voimme toimia asiakkaan ketterässä kehitystiimissä tai toimittaa rajatun kokonaisuuden.",
    "deliverySteps": [
      {
        "title": "Ymmärrämme nykytilan",
        "description": "Käymme läpi järjestelmän, riippuvuudet, tehtävät ja hyväksymiskriteerit."
      },
      {
        "title": "Kehitämme vaiheittain",
        "description": "Teemme sovitut muutokset pienissä kokonaisuuksissa, seuraamme etenemistä ja osallistumme koodikatselmointeihin asiakkaan käytäntöjen mukaan."
      },
      {
        "title": "Testaamme ja luovutamme",
        "description": "Tarkistamme toimivuuden, kirjaamme havainnot ja sovimme dokumentoinnista sekä mahdollisesta jatkotuesta."
      }
    ],
    "fullstackTitle": "Ohjelmistokehitys ja integraatiot",
    "fullstackSubtitle": "Projektikohtainen full-stack-asiantuntija",
    "fullstackDescription": "Sovellusten korjaukset ja jatkokehitys, käyttöliittymät, Node.js- ja .NET-taustapalvelut sekä REST API -integraatiot. Tekninen toteutus tehdään englanniksi; asiakkaan suomenkielinen yhteydenpito voidaan sopia erikseen.",
    "stack": [
      "TypeScript",
      "JavaScript",
      "Node.js",
      "React",
      "Angular",
      "Vue.js",
      "C# / .NET",
      "REST API:t",
      "Next.js",
      "Azure Functions",
      "Kafka",
      "Docker"
    ],
    "fullstackLanguage": "Ohjelmistokehityksen tekninen työskentelykieli on englanti. Asiantuntijan saatavuus vahvistetaan projektikohtaisesti.",
    "dataTitle": "Testaus, data ja Microsoft 365",
    "dataSubtitle": "Suomeksi ja englanniksi",
    "dataDescription": "Toiminnallinen testaus, testitapaukset, regressio- ja API-testit, Power BI -raportit, Excel, SQL/Python sekä Microsoft 365 -työnkulut.",
    "dataStack": [
      "Ohjelmistotestaus",
      "Power BI",
      "Excel",
      "Power Query",
      "SQL",
      "Python",
      "SharePoint",
      "Power Automate",
      "Jira"
    ],
    "dataLanguage": "Testaus, raportointi, dokumentointi ja projektiseuranta onnistuvat suomeksi ja englanniksi. Ohjelmistokehityksen tekninen toteutus tehdään erikseen sovitun asiantuntijan kanssa.",
    "technologyHeading": "Tekninen osaaminen työn tukena",
    "technologyLead": "Työkalut valitaan olemassa olevan sovelluksen ja asiakkaan tarpeen perusteella. Emme ehdota uutta teknologiaa vain sen vuoksi, että se löytyy osaamislistalta.",
    "caveat": "Kuvatut ongelmat ovat esimerkkejä palveluista, eivät Komplyint Oy:n asiakasreferenssejä. Asiantuntija, työn laajuus, käytettävät teknologiat ja kielet vahvistetaan ennen toimeksiantoa.",
    "actionSoftware": "Tutustu ohjelmistokehitykseen",
    "actionProject": "Keskustele projektista",
    "actionDownload": "Lataa palveluesite (PDF)",
    "actionPackage": "Lataa esitteet (ZIP)",
    "portfolioHeading": "Palvelut ja toteutustavat",
    "portfolioLead": "Lataa palveluesite, jossa kuvataan asiakkaiden tyypilliset ohjelmistohaasteet, projektitoimitukset, testaus ja työskentelykielet.",
    "pdfFile": "/downloads/Komplyint_Palveluesite_FI.pdf",
    "pdfName": "Komplyint_Palveluesite_FI.pdf"
  },
  "en": {
    "eyebrow": "SOFTWARE DEVELOPMENT · INTEGRATIONS · TESTING",
    "title": "Solving the software problems that slow teams down.",
    "lead": "When an existing application is hard to change, integrations create manual work or releases introduce recurring defects, we help diagnose the issue and deliver defined improvements. We can work on a scoped project or alongside your development team.",
    "problemLabel": "THE CHALLENGE",
    "solutionLabel": "OUR APPROACH",
    "outcomeLabel": "THE GOAL",
    "problems": [
      {
        "title": "Existing applications are hard to maintain",
        "problem": "Changes take too long, defects keep returning and technical debt consumes internal development capacity.",
        "solution": "We examine the existing code, identify root causes and deliver focused fixes or enhancements without assuming a full rewrite is necessary.",
        "outcome": "More maintainable software and more predictable changes."
      },
      {
        "title": "Systems do not exchange data reliably",
        "problem": "Manual transfers and unreliable APIs interrupt business workflows.",
        "solution": "We build or improve APIs, backend services and integrations, with agreed error handling, testing and documentation.",
        "outcome": "Less manual handoff and more reliable data flow."
      },
      {
        "title": "Feature backlogs keep growing",
        "problem": "Your team needs development capacity for frontend, backend or unfinished application features.",
        "solution": "We take ownership of defined tasks within your existing backlog, contributing code through your team's review and delivery practices.",
        "outcome": "Progress on priority features without unnecessary replacement work."
      },
      {
        "title": "Testing slows every release",
        "problem": "Manual checks take time and regressions are hard to reproduce or detect.",
        "solution": "We design test cases, reproduce and document defects, check APIs and automate repeatable tests where appropriate.",
        "outcome": "Clearer release evidence and better control over quality."
      }
    ],
    "deliveryEyebrow": "AGILE COLLABORATION",
    "deliveryHeading": "Clear scope. Visible progress. Tested changes.",
    "deliveryLead": "We agree on the problem and acceptance criteria before building. We can contribute to a client's agile delivery process or take responsibility for a defined project without insisting on a full platform rewrite.",
    "deliverySteps": [
      {
        "title": "Understand what exists",
        "description": "Review the system, dependencies, priorities and acceptance criteria."
      },
      {
        "title": "Work in manageable increments",
        "description": "Implement agreed changes, share progress and follow the client's code review and delivery practices."
      },
      {
        "title": "Test and hand over",
        "description": "Verify functionality, record results and agree on documentation and follow-up support."
      }
    ],
    "fullstackTitle": "Application development & integrations",
    "fullstackSubtitle": "Project-based full-stack engineering",
    "fullstackDescription": "Maintenance and enhancements for existing applications, frontend changes, Node.js and .NET backend services, and REST API integrations. Technical delivery is in English; Finnish client coordination can be arranged.",
    "stack": [
      "TypeScript",
      "JavaScript",
      "Node.js",
      "React",
      "Angular",
      "Vue.js",
      "C# / .NET",
      "REST APIs",
      "Next.js",
      "Azure Functions",
      "Kafka",
      "Docker"
    ],
    "fullstackLanguage": "Technical working language for software engineering: English. Specialist availability is confirmed per assignment.",
    "dataTitle": "Testing, data & Microsoft 365",
    "dataSubtitle": "Finnish and English",
    "dataDescription": "Functional QA, test cases, regression and API checks, Power BI reporting, Excel, SQL/Python and Microsoft 365 workflows.",
    "dataStack": [
      "Software QA",
      "Power BI",
      "Excel",
      "Power Query",
      "SQL",
      "Python",
      "SharePoint",
      "Power Automate",
      "Jira"
    ],
    "dataLanguage": "Testing, reporting, documentation and project coordination are available in Finnish and English. Software engineering is delivered by an agreed specialist.",
    "technologyHeading": "The tools support the work",
    "technologyLead": "Technology choices depend on the existing system and the customer's needs. We do not recommend a new stack merely because it appears on a skills list.",
    "caveat": "These are examples of problems we can help evaluate, not claims that Komplyint Oy has delivered the featured external customer cases. We confirm availability, scope, technology and language before engagement.",
    "actionSoftware": "Explore software development",
    "actionProject": "Discuss a project",
    "actionDownload": "Download service brochure (PDF)",
    "actionPackage": "Download brochures (ZIP)",
    "portfolioHeading": "Services and delivery approach",
    "portfolioLead": "Download our brochure covering common software challenges, engineering delivery, quality assurance and working languages.",
    "pdfFile": "/downloads/Komplyint_Service_Portfolio_EN.pdf",
    "pdfName": "Komplyint_Service_Portfolio_EN.pdf"
  },
  "sv": {
    "eyebrow": "PROGRAMUTVECKLING · INTEGRATIONER · TESTNING",
    "title": "Vi hjälper er att lösa problem i befintliga programvarusystem.",
    "lead": "När en applikation är svår att ändra, integrationer kräver manuellt arbete eller nya versioner orsakar fel hjälper vi till att utreda problemet och genomföra överenskomna förbättringar. Vi kan ta ansvar för ett avgränsat projekt eller samarbeta med ert utvecklingsteam.",
    "problemLabel": "UTMANINGEN",
    "solutionLabel": "SÅ HJÄLPER VI",
    "outcomeLabel": "MÅLET",
    "problems": [
      {
        "title": "Äldre applikationer är svåra att vidareutveckla",
        "problem": "Ändringar tar tid, fel återkommer och den tekniska skulden belastar utvecklingsteamet.",
        "solution": "Vi går igenom befintlig kod, utreder orsakerna och genomför avgränsade rättelser och förbättringar utan att förutsätta en total omskrivning.",
        "outcome": "En mer underhållbar applikation och förutsägbar vidareutveckling."
      },
      {
        "title": "Systemen utbyter inte information pålitligt",
        "problem": "Manuella överföringar och instabila gränssnitt stör arbetsflödena.",
        "solution": "Vi utvecklar och förbättrar API:er, bakgrundstjänster och integrationer med överenskommen felhantering, testning och dokumentation.",
        "outcome": "Mindre manuellt arbete och ett tillförlitligare informationsflöde."
      },
      {
        "title": "Nya funktioner blir liggande",
        "problem": "Det egna teamet behöver mer kapacitet för gränssnitt, bakgrundsfunktioner och vidareutveckling.",
        "solution": "Vi genomför avgränsade utvecklingsuppgifter inom kundens befintliga arbetslista och följer teamets rutiner för kodgranskning och leverans.",
        "outcome": "Viktiga funktioner kan utvecklas utan onödiga systembyten."
      },
      {
        "title": "Testningen fördröjer publiceringen",
        "problem": "Manuella kontroller tar tid och det är svårt att upptäcka återkommande fel.",
        "solution": "Vi tar fram testfall, återskapar och dokumenterar fel, testar API:er och automatiserar återkommande tester där det är lämpligt.",
        "outcome": "Bättre underlag inför publicering och tydligare kvalitetskontroll."
      }
    ],
    "deliveryEyebrow": "AGILT SAMARBETE",
    "deliveryHeading": "Tydligt uppdrag. Synliga framsteg. Testad leverans.",
    "deliveryLead": "Vi kommer överens om problemet och acceptanskriterierna innan utvecklingen börjar. Vi kan delta i kundens agila utvecklingsarbete eller genomföra ett avgränsat projekt utan att kräva ett totalt systembyte.",
    "deliverySteps": [
      {
        "title": "Förstå nuläget",
        "description": "Vi går igenom systemet, beroenden, prioriteringar och acceptanskriterier."
      },
      {
        "title": "Utveckla stegvis",
        "description": "Vi genomför överenskomna ändringar, rapporterar om arbetet och följer kundens rutiner för kodgranskning och leverans."
      },
      {
        "title": "Testa och lämna över",
        "description": "Vi kontrollerar funktionen, dokumenterar resultaten och kommer överens om fortsatt stöd."
      }
    ],
    "fullstackTitle": "Programutveckling och integrationer",
    "fullstackSubtitle": "Projektbaserad fullstackkompetens",
    "fullstackDescription": "Underhåll och vidareutveckling av applikationer, gränssnitt, Node.js- och .NET-bakgrundstjänster samt REST API-integrationer. Den tekniska utvecklingen sker på engelska; kundkontakten kan skötas på finska enligt överenskommelse.",
    "stack": [
      "TypeScript",
      "JavaScript",
      "Node.js",
      "React",
      "Angular",
      "Vue.js",
      "C# / .NET",
      "REST API:er",
      "Next.js",
      "Azure Functions",
      "Kafka",
      "Docker"
    ],
    "fullstackLanguage": "Arbetsspråk för programutveckling är engelska. Specialistens tillgänglighet bekräftas per uppdrag.",
    "dataTitle": "Testning, data och Microsoft 365",
    "dataSubtitle": "Finska och engelska",
    "dataDescription": "Funktionstestning, testfall, regressions- och API-tester, Power BI-rapportering, Excel, SQL/Python och arbetsflöden i Microsoft 365.",
    "dataStack": [
      "Programvarutestning",
      "Power BI",
      "Excel",
      "Power Query",
      "SQL",
      "Python",
      "SharePoint",
      "Power Automate",
      "Jira"
    ],
    "dataLanguage": "Testning, rapportering, dokumentation och projektuppföljning kan utföras på finska och engelska. Den tekniska programutvecklingen utförs av en separat överenskommen specialist.",
    "technologyHeading": "Tekniken väljs efter behovet",
    "technologyLead": "Vi väljer verktyg utifrån det befintliga systemet och kundens behov, inte för att ett visst ramverk finns på en kompetenslista.",
    "caveat": "Beskrivningarna är exempel på problem vi kan hjälpa till att bedöma, inte påståenden om kundprojekt som Komplyint Oy har genomfört. Vi bekräftar resurser, omfattning, teknik och språk före uppdraget.",
    "actionSoftware": "Läs om programutveckling",
    "actionProject": "Diskutera ett projekt",
    "actionDownload": "Ladda ner tjänstebroschyr (PDF)",
    "actionPackage": "Ladda ner broschyrerna (ZIP)",
    "portfolioHeading": "Tjänster och arbetssätt",
    "portfolioLead": "Ladda ner broschyren med exempel på programvaruproblem, utvecklingsarbete, kvalitetssäkring och arbetsspråk.",
    "pdfFile": "/downloads/Komplyint_Tjanstebroschyr_SV.pdf",
    "pdfName": "Komplyint_Tjanstebroschyr_SV.pdf"
  }
} as const
