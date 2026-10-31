import type { Lang } from './commercial'

type T = Record<Lang, string>
export type BusinessArea = 'analytics' | 'processes' | 'workplace' | 'operations'
export type BusinessService = { id: string; area: BusinessArea; name: T; tools: string; route: string }
export type BusinessPackage = { id: string; name: T; description: T; route: string }

export const areaNames: Record<BusinessArea, T> = {
  analytics: { fi: 'Data, analytiikka ja raportointi', en: 'Data, analytics & reporting', sv: 'Data, analys och rapportering' },
  processes: { fi: 'Prosessit ja automaatio', en: 'Processes & automation', sv: 'Processer och automatisering' },
  workplace: { fi: 'Intranet ja digitaalinen työympäristö', en: 'Intranet & digital workplace', sv: 'Intranät och digital arbetsmiljö' },
  operations: { fi: 'Projektit ja digitaaliset toiminnot', en: 'Projects & digital operations', sv: 'Projekt och digital verksamhet' },
}

/** Discoverable scope, not a claim of specialist proficiency or immediate capacity.
 * Each delivery is assessed for tools, permissions, licenses, owner and acceptance tests. */
export const businessServices: BusinessService[] = [
  { id: 'excel-cleanup', area: 'analytics', name: { fi: 'Excel-tietojen siivous ja hallinta', en: 'Excel cleanup & management', sv: 'Rensning och hantering av Excel-data' }, tools: 'Excel · Power Query', route: 'data-reporting' },
  { id: 'powerbi', area: 'analytics', name: { fi: 'Power BI -raportit ja ylläpito', en: 'Power BI reporting & maintenance', sv: 'Power BI-rapporter och underhåll' }, tools: 'Power BI · DAX · Power Query', route: 'data-reporting' },
  { id: 'quality', area: 'analytics', name: { fi: 'Datan laatu ja täsmäytys', en: 'Data quality & reconciliation', sv: 'Datakvalitet och avstämning' }, tools: 'SQL · Python · Excel', route: 'data-reporting' },
  { id: 'management', area: 'analytics', name: { fi: 'Johdon kuukausiraportointi', en: 'Management & monthly reporting', sv: 'Lednings- och månadsrapportering' }, tools: 'Power BI · Excel · PowerPoint', route: 'data-reporting' },
  { id: 'kpi', area: 'analytics', name: { fi: 'Mittarit ja KPI-määrittely', en: 'KPIs and performance measures', sv: 'Nyckeltal och prestationsmått' }, tools: 'Power BI · business analysis', route: 'data-reporting' },
  { id: 'project-tracking', area: 'operations', name: { fi: 'Projektiseuranta ja tilanneraportointi', en: 'Project tracking & status reporting', sv: 'Projektuppföljning och statusrapportering' }, tools: 'Jira · Planner · Excel', route: 'document-support' },
  { id: 'process-drawing', area: 'processes', name: { fi: 'Prosessikuvaukset ja työnkulut', en: 'Process mapping & documentation', sv: 'Processkartläggning och dokumentation' }, tools: 'Visio · diagrams.net', route: 'm365-automation' },
  { id: 'intranet-content', area: 'workplace', name: { fi: 'Intranetin sisällön päivitys', en: 'Intranet content updates', sv: 'Uppdatering av intranätinnehåll' }, tools: 'SharePoint · Teams', route: 'm365-automation' },
  { id: 'documents', area: 'workplace', name: { fi: 'Asiakirjamallit ja työohjeet', en: 'Document templates & work instructions', sv: 'Dokumentmallar och arbetsanvisningar' }, tools: 'Word · PowerPoint', route: 'document-support' },
  { id: 'sharepoint-reporting', area: 'analytics', name: { fi: 'SharePointiin kytketty raportointi', en: 'SharePoint-connected reporting', sv: 'Rapportering kopplad till SharePoint' }, tools: 'SharePoint · Power BI', route: 'data-reporting' },
  { id: 'testing', area: 'operations', name: { fi: 'Ohjelmistojen ja raporttien testaus', en: 'Software & reporting QA', sv: 'Testning av programvara och rapporter' }, tools: 'Jira · Robot Framework · SQL', route: 'testing-qa' },
  { id: 'funding', area: 'analytics', name: { fi: 'Hanke- ja rahoitusraportointi', en: 'Grant & project reporting', sv: 'Bidrags- och projektrapportering' }, tools: 'Excel · Power BI', route: 'data-reporting' },
  { id: 'presentations', area: 'analytics', name: { fi: 'Johdon esitykset ja raporttimuotoilu', en: 'Executive presentations & reporting design', sv: 'Ledningspresentationer och rapportdesign' }, tools: 'PowerPoint · Power BI', route: 'document-support' },
  { id: 'workflow', area: 'processes', name: { fi: 'Työnkulkujen automatisointi', en: 'Workflow automation', sv: 'Automatisering av arbetsflöden' }, tools: 'Power Automate', route: 'm365-automation' },
  { id: 'forms', area: 'processes', name: { fi: 'Digitaaliset lomakkeet ja rekisterit', en: 'Digital forms & registers', sv: 'Digitala formulär och register' }, tools: 'Forms · Lists · SharePoint', route: 'm365-automation' },
  { id: 'internal-apps', area: 'processes', name: { fi: 'Sisäiset pienet liiketoimintasovellukset', en: 'Small internal business applications', sv: 'Små interna verksamhetsappar' }, tools: 'Power Apps · Lists', route: 'm365-automation' },
  { id: 'bpmn', area: 'processes', name: { fi: 'BPMN-prosessimallinnus', en: 'BPMN 2.0 process modelling', sv: 'BPMN 2.0-processmodellering' }, tools: 'BPMN · Visio · diagrams.net', route: 'm365-automation' },
  { id: 'sharepoint-structure', area: 'workplace', name: { fi: 'SharePoint-rakenteet ja tiedon löydettävyys', en: 'SharePoint structure & findability', sv: 'SharePoint-struktur och informationssökning' }, tools: 'SharePoint · metadata', route: 'm365-automation' },
  { id: 'knowledge', area: 'workplace', name: { fi: 'Ohje- ja tietopankkien rakentaminen', en: 'Knowledge base development', sv: 'Utveckling av kunskapsbanker' }, tools: 'SharePoint · Confluence · Notion', route: 'm365-automation' },
  { id: 'onboarding', area: 'processes', name: { fi: 'Perehdytyksen digitaaliset työnkulut', en: 'Digital onboarding workflows', sv: 'Digitala introduktionsflöden' }, tools: 'Forms · Lists · Power Automate', route: 'm365-automation' },
  { id: 'crm', area: 'operations', name: { fi: 'CRM-tietojen kunnostus ja raportointi', en: 'CRM data cleanup & reporting', sv: 'CRM-datarensning och rapportering' }, tools: 'HubSpot · Pipedrive · Dynamics 365', route: 'data-reporting' },
  { id: 'feedback', area: 'analytics', name: { fi: 'Palaute- ja kyselyanalytiikka', en: 'Feedback & survey analytics', sv: 'Analys av respons och enkäter' }, tools: 'Forms · Power BI · Looker Studio', route: 'data-reporting' },
  { id: 'web-analytics', area: 'analytics', name: { fi: 'Verkkosivuston ja markkinoinnin analytiikka', en: 'Website & marketing analytics', sv: 'Webb- och marknadsföringsanalys' }, tools: 'GA4 · Looker Studio', route: 'data-reporting' },
  { id: 'integrations', area: 'processes', name: { fi: 'Järjestelmien väliset työnkulut', en: 'Cross-application workflows', sv: 'Arbetsflöden mellan system' }, tools: 'n8n · Make · Zapier · APIs', route: 'software-integrations' },
  { id: 'jira', area: 'operations', name: { fi: 'Jira- ja Confluence-käytäntöjen kehittäminen', en: 'Jira & Confluence improvement', sv: 'Förbättring av Jira och Confluence' }, tools: 'Jira · Confluence · JQL', route: 'document-support' },
  { id: 'doc-flow', area: 'processes', name: { fi: 'Asiakirjojen automaattinen muodostaminen', en: 'Document workflow automation', sv: 'Automatisering av dokumentflöden' }, tools: 'Word · Power Automate', route: 'm365-automation' },
  { id: 'support', area: 'operations', name: { fi: 'Palvelu- ja tukipyyntöjen analytiikka', en: 'Service & support analytics', sv: 'Analys av service och support' }, tools: 'Jira Service Management · Power BI', route: 'data-reporting' },
]

export const businessPackages: BusinessPackage[] = [
  { id: 'reporting', name: { fi: 'Raportoinnin ja datan kunnostus', en: 'Reporting & Data Cleanup', sv: 'Rapportering och datarensning' }, description: { fi: 'Epäyhtenäisistä taulukoista luotettavaksi raportoinniksi.', en: 'From fragmented spreadsheets to dependable reporting.', sv: 'Från splittrade kalkylblad till tillförlitlig rapportering.' }, route: 'data-reporting' },
  { id: 'workplace', name: { fi: 'Intranet ja digitaalinen työympäristö', en: 'Digital Workplace & Intranet', sv: 'Digital arbetsmiljö och intranät' }, description: { fi: 'Selkeämmät sisällöt, asiakirjat ja työohjeet.', en: 'Clearer intranet content, documents and work instructions.', sv: 'Tydligare intranätinnehåll, dokument och arbetsanvisningar.' }, route: 'm365-automation' },
  { id: 'processes', name: { fi: 'Prosessit ja automaatio', en: 'Process Improvement & Automation', sv: 'Processförbättring och automatisering' }, description: { fi: 'Kuvaamme nykytilan ja toteutamme sovitut parannukset.', en: 'Map the current process and deliver agreed improvements.', sv: 'Kartlägg nuläget och genomför avtalade förbättringar.' }, route: 'm365-automation' },
  { id: 'projects', name: { fi: 'Projekti- ja kehittämistoiminnan tuki', en: 'Project & Development Support', sv: 'Projekt- och utvecklingsstöd' }, description: { fi: 'Seuranta, vastuut, dokumentointi ja tilannekuva.', en: 'Tracking, ownership, documentation and progress reporting.', sv: 'Uppföljning, ansvar, dokumentation och statusrapportering.' }, route: 'document-support' },
  { id: 'performance', name: { fi: 'Liiketoiminnan analytiikka ja tiedolla johtaminen', en: 'Business Performance & Analytics', sv: 'Verksamhetsanalys och nyckeltal' }, description: { fi: 'Mittarit ja raportit, jotka tukevat päätöksiä.', en: 'Performance measures and reporting that support decisions.', sv: 'Nyckeltal och rapporter som stöder beslut.' }, route: 'data-reporting' },
  { id: 'software', name: { fi: 'Ohjelmistokehitys ja laadunvarmistus', en: 'Software Quality & Digital Solutions', sv: 'Programvarukvalitet och digitala lösningar' }, description: { fi: 'Sovellusten jatkokehitys, integraatiot ja testaus.', en: 'Application enhancements, integrations and quality assurance.', sv: 'Vidareutveckling, integrationer och kvalitetssäkring.' }, route: 'software-integrations' },
]

export const platformGroups = [
  { id: 'microsoft', name: { fi: 'Microsoft 365 ja Power Platform', en: 'Microsoft 365 & Power Platform', sv: 'Microsoft 365 och Power Platform' }, tools: ['Excel', 'Power Query', 'Power BI', 'SharePoint', 'Lists', 'Forms', 'Power Automate', 'Power Apps', 'Teams', 'Planner', 'Project', 'Outlook', 'OneDrive', 'Word', 'PowerPoint', 'Bookings', 'Power Pivot', 'Fabric', 'Copilot Studio', 'Visio'] },
  { id: 'other', name: { fi: 'Muut sovellukset ja alustat', en: 'Other business platforms', sv: 'Andra verksamhetsplattformar' }, tools: ['Jira', 'Confluence', 'diagrams.net', 'Miro', 'Notion', 'Google Sheets', 'Looker Studio', 'GA4', 'HubSpot', 'Pipedrive', 'n8n', 'Make', 'Zapier', 'Metabase', 'Tableau', 'Qlik', 'SQL', 'Python', 'PostgreSQL', 'dbt'] },
] as const

export const expansionText: Record<Lang, {
  eyebrow: string; headline: string; intro: string; packageTitle: string; packageIntro: string;
  tasksTitle: string; tasksIntro: string; all: string; search: string; empty: string;
  toolsTitle: string; toolsIntro: string; scope: string; enquire: string; showing: string; browseAll: string; showFewer: string;
}> = {
  fi: {
    eyebrow: 'RATKAISUT YRITYSTEN ARKEEN', headline: 'Tietoa, prosesseja ja toimivampia työpäiviä.',
    intro: 'Autamme selkeyttämään raportointia, dokumentoimaan työnkulkuja, kehittämään intranetiä ja automatisoimaan toistuvia tehtäviä. Lähdemme liikkeelle liiketoiminnan tarpeesta, emme työkalun nimestä.',
    packageTitle: 'Kuusi tapaa ratkaista ongelma', packageIntro: 'Palvelukokonaisuudet sovitetaan asiakkaan ympäristöön ja tarvittavaan osaamiseen.',
    tasksTitle: 'Tutustu mahdollisiin toteutuksiin', tasksIntro: 'Hakemistossa on 27 esimerkkiä tehtävistä, joita voimme arvioida ja toteuttaa sovitun laajuuden mukaan.',
    all: 'Kaikki', search: 'Hae tehtävää tai työkalua', empty: 'Hakuehdoilla ei löytynyt tehtäviä.',
    toolsTitle: 'Työkalut valitaan tarpeen mukaan', toolsIntro: 'Hyödynnämme ensisijaisesti asiakkaan jo käytössä olevia järjestelmiä.',
    scope: 'Työkalut, osaaminen, käyttöoikeudet, tietosuoja, lisenssit ja ylläpitovastuut varmistetaan toimeksiantokohtaisesti. Kaikki luetellut alustat eivät tarkoita valmista erityisasiantuntijuutta tai välitöntä saatavuutta.',
    enquire: 'Kysy toteutuksesta', showing: 'tehtävää', browseAll: 'Näytä kaikki 27 palveluesimerkkiä', showFewer: 'Näytä vähemmän',
  },
  en: {
    eyebrow: 'BUSINESS SOLUTIONS', headline: 'Better information. Clearer processes. More effective operations.',
    intro: 'We help improve reporting, document workflows, organise intranet content and explore practical automation. We start with the business problem, not the name of a tool.',
    packageTitle: 'Six ways to approach the problem', packageIntro: 'Engagements are scoped for the customer environment and confirmed delivery capability.',
    tasksTitle: 'Explore the work we can assess', tasksIntro: 'A searchable catalogue of 27 types of work we can discuss and scope for delivery.',
    all: 'All', search: 'Search tasks or tools', empty: 'No matching tasks.',
    toolsTitle: 'Tools chosen for the job', toolsIntro: 'We first consider the systems already in use at your organisation.',
    scope: 'Tool fit, specialist availability, access, data protection, licensing, acceptance tests and support ownership are agreed before delivery. A platform listed here is not a claim of established expertise or immediate capacity in every feature.',
    enquire: 'Discuss this project', showing: 'service areas', browseAll: 'Explore all 27 service examples', showFewer: 'Show fewer examples',
  },
  sv: {
    eyebrow: 'LÖSNINGAR FÖR VERKSAMHETEN', headline: 'Bättre information. Tydligare processer. Smidigare arbete.',
    intro: 'Vi hjälper organisationer att förbättra rapportering, beskriva arbetsflöden, ordna intranätinnehåll och utreda praktisk automatisering. Vi utgår från behovet, inte verktyget.',
    packageTitle: 'Sex sätt att lösa problemet', packageIntro: 'Uppdrag avgränsas enligt kundens miljö och bekräftad leveranskompetens.',
    tasksTitle: 'Utforska möjliga uppdrag', tasksIntro: 'En sökbar katalog med 27 typer av arbete som vi kan diskutera och avgränsa.',
    all: 'Alla', search: 'Sök uppdrag eller verktyg', empty: 'Inga träffar.',
    toolsTitle: 'Rätt verktyg för uppgiften', toolsIntro: 'Vi utgår i första hand från system som kunden redan använder.',
    scope: 'Verktyg, kompetens, åtkomsträttigheter, dataskydd, licenser, tester och underhållsansvar avtalas för varje uppdrag. Listade plattformar innebär inte specialistkompetens eller omedelbar tillgänglighet inom alla funktioner.',
    enquire: 'Diskutera ett uppdrag', showing: 'tjänster', browseAll: 'Visa alla 27 tjänsteexempel', showFewer: 'Visa färre exempel',
  },
}
