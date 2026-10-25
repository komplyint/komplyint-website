import type { Metadata } from 'next'
import { services, serviceSlugs, canonicalHost, type Lang } from './commercial'
export type SiteSection='home'|'services'|'software'|'work'|'about'|'contact'|'privacy'|'accessibility'
const titles: Record<SiteSection,Record<Lang,string>>={
 home:{fi:'Data, automaatio ja ohjelmistot',en:'Data, automation and software'},
 services:{fi:'Palvelut ja toimitukset',en:'Services and deliverables'},
 software:{fi:'Ohjelmistokehitys ja tuotehankkeet',en:'Software development and product work'},
 work:{fi:'Esimerkkejä ratkaisuista',en:'Examples of practical solutions'},
 about:{fi:'Yritys ja toimintatapa',en:'Company and approach'},
 contact:{fi:'Kerro tarpeestasi',en:'Discuss your project'},
 privacy:{fi:'Tietosuojaseloste',en:'Privacy notice'},
 accessibility:{fi:'Saavutettavuustiedot',en:'Accessibility information'},
}
const descriptions:Record<SiteSection,Record<Lang,string>>={
 home:{fi:'Käytännön apua Exceliin, raportointiin, Microsoft 365 -työnkulkuihin, verkkosivuihin ja pieniin ohjelmistoihin.',en:'Practical help with Excel, reporting, Microsoft 365 workflows, websites and small software projects.'},
 services:{fi:'Tutustu kuuteen palvelualueeseen, tyypillisiin tehtäviin, toimituksiin ja rajauksiin.',en:'Explore six service areas, typical requests, deliverables and project boundaries.'},
 software:{fi:'Rajattuja sisäisiä työkaluja, jatkokehitystä ja integraatioita.',en:'Scoped internal tools, enhancements and small integrations.'},
 work:{fi:'Havainnollistavia esimerkkejä raportoinnista, automaatiosta ja verkkosivuista.',en:'Illustrative examples of reporting, workflows and website improvements.'},
 about:{fi:'Komplyint Oy:n toimintatapa, yhteystiedot ja yritystiedot.',en:'Company information, working principles and contact details of Komplyint Oy.'},
 contact:{fi:'Kerro ongelmasta, käytössä olevista työkaluista ja toivotusta lopputuloksesta.',en:'Tell us the problem, tools you use and outcome you need.'},
 privacy:{fi:'Tietoa verkkosivuston yhteydenottoihin liittyvästä henkilötietojen käsittelystä.',en:'Information about personal data processed for website enquiries.'},
 accessibility:{fi:'Tietoa saavutettavuustyöstämme ja palautteen antamisesta.',en:'How we work on accessibility and how to send accessibility feedback.'},
}
function route(lang:Lang,page:SiteSection,slug?:string){
 const prefix=lang==='en'?'/en':''
 const path=page==='home'?'':('/'+page)
 return (prefix+path+(slug?'/'+slug:''))||'/'
}
export function pageMetadata(lang:Lang,page:SiteSection,slug?:string):Metadata{
 let title=titles[page][lang],description=descriptions[page][lang]
 if(slug){
   const i=serviceSlugs.indexOf(slug as typeof serviceSlugs[number])
   if(i>=0){title=services[lang][i].title;description=services[lang][i].intro+' '+services[lang][i].deliverable}
 }
 const own=route(lang,page,slug)
 return {
   title:title+' | Komplyint Oy',description,
   alternates:{canonical:canonicalHost+own,languages:{fi:canonicalHost+route('fi',page,slug),en:canonicalHost+route('en',page,slug)}},
   openGraph:{title,description,url:canonicalHost+own,type:'website',siteName:'Komplyint Oy',locale:lang==='fi'?'fi_FI':'en_GB'},
   robots:{index:true,follow:true}
 }
}
