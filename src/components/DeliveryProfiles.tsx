import type {Lang} from '@/lib/commercial'
import {pathFor} from '@/lib/site-route'
import Arrow from '@/components/Arrow'

const text={
  fi:{
    eyebrow:'ASIANTUNTIJAT JA VASTUUT',title:'Osaamista siellä, missä sitä tarvitaan.',
    intro:'Sovimme jokaisen toimeksiannon tekijät, tavoitteet ja työskentelytavat etukäteen. Ohjelmistokehitys ja data- sekä testaustehtävät muodostavat kaksi selkeää palvelualuetta.',
    engineer:'Ohjelmistokehitys ja integraatiot',engineerRole:'Full-stack-ohjelmistokehittäjä · yhteistyö sovittuihin toimeksiantoihin',
    engineerBody:'Valentine osallistuu sovittuihin ohjelmistoprojekteihin: nykyisten sovellusten korjaukset ja jatkokehitys, käyttöliittymä- ja taustapalvelutehtävät, API-integraatiot sekä koodin ylläpidettävyys.',
    engineerMeta:'Tekninen työ englanniksi',engineeringFocus:'React · Node.js · .NET · API:t · pilvi-integraatiot',
    data:'Data, raportointi ja laadunvarmistus',dataRole:'Data-, Power BI- ja QA-tehtävät · asiakasyhteistyö Suomessa',
    dataBody:'Vitus auttaa raportoinnin kehittämisessä, Excel- ja Power BI -ratkaisuissa, testitapauksissa, ohjelmistovirheiden dokumentoinnissa ja projektiseurannassa. Hän koordinoi myös suomenkielistä asiakasviestintää.',
    dataMeta:'Työ suomeksi ja englanniksi',dataFocus:'Power BI · Excel · SQL · Python · QA',
    foot:'Henkilöiden aiempi työkokemus ja Komplyint Oy:n omat toimeksiannot esitetään erillisinä. Saatavuus vahvistetaan ennen sopimusta.',
    action:'Kerro projektistasi'
  },
  en:{
    eyebrow:'PEOPLE AND RESPONSIBILITIES',title:'The right expertise for the work.',
    intro:'We agree the specialist, scope and delivery approach before each assignment. Software engineering and data/QA have distinct responsibilities and practical outputs.',
    engineer:'Software engineering and integrations',engineerRole:'Full-stack software engineer · available for agreed assignments',
    engineerBody:'Valentine contributes to scoped software work: maintaining and improving existing applications, frontend and backend features, API integrations and maintainable code.',
    engineerMeta:'Technical delivery in English',engineeringFocus:'React · Node.js · .NET · APIs · cloud integrations',
    data:'Data, reporting and quality assurance',dataRole:'Data, Power BI and QA · Finnish client coordination',
    dataBody:'Vitus supports reporting improvements, Excel and Power BI work, software test cases, defect documentation and project tracking. He also coordinates Finnish-language client communication.',
    dataMeta:'Working languages: Finnish and English',dataFocus:'Power BI · Excel · SQL · Python · QA',
    foot:'Individual professional experience is distinct from Komplyint Oy client engagements. Specialist availability is confirmed before contract.',
    action:'Discuss your assignment'
  },
  sv:{
    eyebrow:'SPECIALISTER OCH ANSVAR',title:'Kompetens för uppgiften.',
    intro:'Inför varje uppdrag kommer vi överens om ansvarig specialist, arbetets omfattning och genomförande. Programutveckling och data/testning har tydliga ansvarsområden.',
    engineer:'Programutveckling och integrationer',engineerRole:'Fullstackutvecklare · för uppdrag enligt överenskommelse',
    engineerBody:'Valentine arbetar med överenskomna programuppgifter: underhåll och vidareutveckling av applikationer, frontend, backend, API-integrationer och kodens underhållbarhet.',
    engineerMeta:'Tekniskt arbete på engelska',engineeringFocus:'React · Node.js · .NET · API:er · molnintegrationer',
    data:'Data, rapportering och kvalitetssäkring',dataRole:'Data, Power BI och testning · kundkontakt på finska',
    dataBody:'Vitus arbetar med förbättrad rapportering, Excel, Power BI, testfall, dokumentation av programfel och projektuppföljning. Han kan även samordna kundkontakten på finska.',
    dataMeta:'Arbetsspråk: finska och engelska',dataFocus:'Power BI · Excel · SQL · Python · testning',
    foot:'Specialisternas tidigare erfarenhet skiljs från Komplyint Oy:s egna kunduppdrag. Tillgänglighet bekräftas innan ett avtal ingås.',
    action:'Diskutera ert uppdrag'
  }
} as const

export default function DeliveryProfiles({lang,compact=false}:{lang:Lang;compact?:boolean}){
 const t=text[lang]
 return <section className={'ev-people-section kc-section'+(compact?' ev-people-compact':'')} aria-labelledby="ev-team-title">
  <div className="kc-shell">
   <div className="ev-people-intro"><div><p className="kc-eyebrow">{t.eyebrow}</p><h2 id="ev-team-title">{t.title}</h2></div><p>{t.intro}</p></div>
   <div className="ev-people-grid">
    <article className="ev-person ev-person-engineering">
     <div className="ev-person-top"><span className="ev-monogram" aria-hidden="true">V<span>.</span></span><span className="ev-person-index">01 / ENGINEERING</span></div>
     <p className="ev-person-specialism">{t.engineer}</p>
     <h3>Valentine Idi</h3>
     <p className="ev-person-role">{t.engineerRole}</p>
     <p className="ev-person-description">{t.engineerBody}</p>
     <div className="ev-person-bottom"><p>{t.engineerMeta}</p><small>{t.engineeringFocus}</small></div>
    </article>
    <article className="ev-person ev-person-data">
     <div className="ev-person-top"><span className="ev-monogram" aria-hidden="true">V<span>.</span></span><span className="ev-person-index">02 / DATA & QA</span></div>
     <p className="ev-person-specialism">{t.data}</p>
     <h3>Vitus Idi</h3>
     <p className="ev-person-role">{t.dataRole}</p>
     <p className="ev-person-description">{t.dataBody}</p>
     <div className="ev-person-bottom"><p>{t.dataMeta}</p><small>{t.dataFocus}</small></div>
    </article>
   </div>
   <div className="ev-people-tail"><p>{t.foot}</p><a className="kc-text-link" href={pathFor(lang,'contact')+'?engagement=project'}>{t.action}<Arrow/></a></div>
  </div>
 </section>
}
