import type { Metadata } from 'next'
import { services, serviceSlugs, canonicalHost, type Lang } from './commercial'
import { localizedPath, languages } from './i18n'

export type SiteSection='home'|'services'|'software'|'work'|'about'|'contact'|'privacy'|'accessibility'

const titles:Record<SiteSection,Record<Lang,string>>={
 home:{fi:'Ohjelmistokehitys, integraatiot ja testaus',en:'Software development, integrations and QA',sv:'Programutveckling, integrationer och testning'},
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
 services:{fi:'Sovellusten jatkokehitys, API-integraatiot, ohjelmistotestaus, Power BI ja Microsoft 365 -ratkaisut yrityksille.',en:'Application maintenance, API integrations, software QA, Power BI and Microsoft 365 services for business.',sv:'Vidareutveckling av applikationer, API-integrationer, testning, Power BI och Microsoft 365 för företag.'},
 software:{fi:'Korjaamme sovellusten ongelmia, parannamme rajapintoja ja toteutamme sovittuja kehitystehtäviä ketterästi sekä testaamme muutokset.',en:'Improve existing applications, repair APIs and integrations, deliver scoped features and test changes as part of agile teams.',sv:'Vi förbättrar befintliga applikationer, utvecklar integrationer och testar ändringar inom avgränsade uppdrag.'},
 work:{fi:'Kuusi kuvitteellista esimerkkiä: raportointi, työnkulut, verkkosivut, sovellusten jatkokehitys, API-integraatiot ja ohjelmistotestaus.',en:'Six illustrative scenarios covering reporting, workflows, websites, application maintenance, API integrations and software QA.',sv:'Sex fiktiva exempel inom rapportering, arbetsflöden, webbplatser, vidareutveckling, API-integrationer och testning.'},
 about:{fi:'Komplyint Oy:n toimintatapa, yhteystiedot ja yritystiedot.',en:'Company information, working principles and contact details of Komplyint Oy.',sv:'Information om Komplyint Oy, våra arbetsprinciper och kontaktuppgifter.'},
 contact:{fi:'Kerro sovelluksen ongelmasta, kehitystehtävästä, API-integraatiosta, testauksesta tai raportoinnista. Kysy projektista tai asiantuntijasta.',en:'Discuss an application issue, new feature, API integration, software testing or reporting project.',sv:'Beskriv ett problem med en applikation, ny funktion, API-integration, testning eller rapportering.'},
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
