import type { Metadata } from 'next'
import { services, serviceSlugs, canonicalHost, type Lang } from './commercial'
import { localizedPath, languages } from './i18n'

export type SiteSection='home'|'services'|'software'|'work'|'about'|'contact'|'privacy'|'accessibility'

const titles:Record<SiteSection,Record<Lang,string>>={
 home:{fi:'Ohjelmistokehitys, data ja automaatio',en:'Software engineering, data and automation',sv:'Programutveckling, data och automatisering'},
 services:{fi:'Palvelut',en:'Our services',sv:'Våra tjänster'},
 software:{fi:'Ohjelmistokehitys',en:'Software development',sv:'Programutveckling'},
 work:{fi:'Esimerkkejä mahdollisista ratkaisuista',en:'Example projects',sv:'Exempel på uppdrag'},
 about:{fi:'Tietoa Komplyint Oy:stä',en:'About Komplyint Oy',sv:'Om Komplyint Oy'},
 contact:{fi:'Ota yhteyttä',en:'Contact us',sv:'Kontakta oss'},
 privacy:{fi:'Tietosuojaseloste',en:'Privacy notice',sv:'Dataskyddsbeskrivning'},
 accessibility:{fi:'Saavutettavuustiedot',en:'Accessibility information',sv:'Tillgänglighetsinformation'},
}
const descriptions:Record<SiteSection,Record<Lang,string>>={
 home:{fi:'Ohjelmistokehitys, Power BI, Microsoft 365, automaatio ja testaus. Projekteja ja asiantuntijatyötä sopimuksen mukaan.',en:'Full-stack software engineering, Power BI, Microsoft 365 automation, QA and project-based IT consulting.',sv:'Programutveckling, Power BI, Microsoft 365-automatisering, testning och projektbaserade IT-konsulttjänster.'},
 services:{fi:'Tutustu palveluihimme ja katso, millaisissa tehtävissä voimme auttaa.',en:'See how we can help with data, reporting, automation and small software projects.',sv:'Läs om våra tjänster inom data, rapportering, automatisering och mindre programprojekt.'},
 software:{fi:'Verkkosovellukset, TypeScript, Node.js, React, Angular, Vue ja API-rajapinnat.',en:'Full-stack development with TypeScript, Node.js, React, Angular, Vue and APIs.',sv:'Fullstackutveckling med TypeScript, Node.js, React, Angular, Vue och API:er.'},
 work:{fi:'Havainnollistavia esimerkkejä raportoinnista, automaatiosta ja verkkosivuista.',en:'Illustrative examples of reporting, workflows and website improvements.',sv:'Illustrativa exempel på rapportering, arbetsflöden och förbättringar av webbplatser.'},
 about:{fi:'Komplyint Oy:n toimintatapa, yhteystiedot ja yritystiedot.',en:'Company information, working principles and contact details of Komplyint Oy.',sv:'Information om Komplyint Oy, våra arbetsprinciper och kontaktuppgifter.'},
 contact:{fi:'Kerro, millaisessa digitehtävässä tarvitset apua. Myös pienet toimeksiannot ovat tervetulleita.',en:'Tell us which digital task you need help with, even if it is a small one-off job.',sv:'Berätta vilken digital uppgift ni behöver hjälp med. Även mindre uppdrag är välkomna.'},
 privacy:{fi:'Tietoa verkkosivuston yhteydenottoihin liittyvästä henkilötietojen käsittelystä.',en:'Information about personal data processed for website enquiries.',sv:'Information om behandling av personuppgifter vid förfrågningar via webbplatsen.'},
 accessibility:{fi:'Tietoa sivuston saavutettavuudesta ja siitä, miten voit antaa palautetta.',en:'Find out how we improve accessibility and how to contact us about barriers.',sv:'Läs om webbplatsens tillgänglighet och hur du kan lämna respons.'},
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
