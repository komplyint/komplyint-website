import type { Metadata } from 'next'
import { services, serviceSlugs, canonicalHost, type Lang } from './commercial'
import { localizedPath, languages } from './i18n'

export type SiteSection='home'|'services'|'software'|'work'|'about'|'contact'|'privacy'|'accessibility'

const titles:Record<SiteSection,Record<Lang,string>>={
 home:{fi:'Data, automaatio ja ohjelmistot',en:'Data, automation and software',sv:'Data, automatisering och programvara'},
 services:{fi:'Palvelut ja toimitukset',en:'Services and deliverables',sv:'Tjänster och leveranser'},
 software:{fi:'Ohjelmistokehitys ja tuotehankkeet',en:'Software development and product work',sv:'Programvaruutveckling och produktprojekt'},
 work:{fi:'Esimerkkejä ratkaisuista',en:'Examples of practical solutions',sv:'Exempel på praktiska lösningar'},
 about:{fi:'Yritys ja toimintatapa',en:'Company and approach',sv:'Företaget och vårt arbetssätt'},
 contact:{fi:'Kerro tarpeestasi',en:'Discuss your project',sv:'Berätta om ditt behov'},
 privacy:{fi:'Tietosuojaseloste',en:'Privacy notice',sv:'Integritetsinformation'},
 accessibility:{fi:'Saavutettavuustiedot',en:'Accessibility information',sv:'Tillgänglighetsinformation'},
}
const descriptions:Record<SiteSection,Record<Lang,string>>={
 home:{fi:'Käytännön apua Exceliin, raportointiin, Microsoft 365 -työnkulkuihin, verkkosivuihin ja pieniin ohjelmistoihin.',en:'Practical help with Excel, reporting, Microsoft 365 workflows, websites and small software projects.',sv:'Praktisk hjälp med Excel, rapportering, Microsoft 365-arbetsflöden, webbplatser och mindre programvaruprojekt.'},
 services:{fi:'Tutustu kuuteen palvelualueeseen, tyypillisiin tehtäviin, toimituksiin ja rajauksiin.',en:'Explore six service areas, typical requests, deliverables and project boundaries.',sv:'Bekanta dig med sex tjänsteområden, vanliga uppdrag, leveranser och avgränsningar.'},
 software:{fi:'Rajattuja sisäisiä työkaluja, jatkokehitystä ja integraatioita.',en:'Scoped internal tools, enhancements and small integrations.',sv:'Avgränsade interna verktyg, vidareutveckling och mindre integrationer.'},
 work:{fi:'Havainnollistavia esimerkkejä raportoinnista, automaatiosta ja verkkosivuista.',en:'Illustrative examples of reporting, workflows and website improvements.',sv:'Illustrativa exempel på rapportering, arbetsflöden och förbättringar av webbplatser.'},
 about:{fi:'Komplyint Oy:n toimintatapa, yhteystiedot ja yritystiedot.',en:'Company information, working principles and contact details of Komplyint Oy.',sv:'Information om Komplyint Oy, våra arbetsprinciper och kontaktuppgifter.'},
 contact:{fi:'Kerro ongelmasta, käytössä olevista työkaluista ja toivotusta lopputuloksesta.',en:'Tell us the problem, tools you use and outcome you need.',sv:'Berätta om problemet, era nuvarande verktyg och vilket resultat ni vill uppnå.'},
 privacy:{fi:'Tietoa verkkosivuston yhteydenottoihin liittyvästä henkilötietojen käsittelystä.',en:'Information about personal data processed for website enquiries.',sv:'Information om behandling av personuppgifter vid förfrågningar via webbplatsen.'},
 accessibility:{fi:'Tietoa saavutettavuustyöstämme ja palautteen antamisesta.',en:'How we work on accessibility and how to send accessibility feedback.',sv:'Så arbetar vi med tillgänglighet och tar emot tillgänglighetsrespons.'},
}

export function pageMetadata(lang:Lang,page:SiteSection,slug?:string):Metadata{
 let title=titles[page][lang],description=descriptions[page][lang]
 if(slug){
   const i=serviceSlugs.indexOf(slug as typeof serviceSlugs[number])
   if(i>=0){title=services[lang][i].title;description=services[lang][i].intro+' '+services[lang][i].deliverable}
 }
 const sectionPath=(page==='home'?'':'/'+page)+(slug?'/'+slug:'')
 const own=localizedPath(sectionPath||'/',lang)
 const alternateLanguages:Object=Object.fromEntries(languages.map(language=>[language.code,canonicalHost+localizedPath(sectionPath||'/',language.code)]))
 return {
   title:title+' | Komplyint Oy',description,
   alternates:{
     canonical:canonicalHost+own,
     languages:{...alternateLanguages,'x-default':canonicalHost+localizedPath(sectionPath||'/','fi')},
   },
   openGraph:{title,description,url:canonicalHost+own,type:'website',siteName:'Komplyint Oy',locale:languages.find(item=>item.code===lang)?.ogLocale||'fi_FI'},
   robots:{index:true,follow:true},
 }
}
