import type {Lang} from '@/lib/commercial'
import {pathFor} from '@/lib/site-route'
import Arrow from '@/components/Arrow'

/**
 * First names only, by owner choice. These are areas of responsibility, not
 * claims of headcount, personal relationships, formal titles or client delivery.
 */
const copy={
  fi:{
    eyebrow:'TEKIJÄT',heading:'Osaamista oikeaan tehtävään.',
    dataIndex:'01 / DATA JA TESTAUS',softwareIndex:'02 / OHJELMISTOT',
    intro:'Komplyintin työssä yhdistyvät raportointi, laadunvarmistus ja ohjelmistokehitys. Sovimme projektikohtaisesti, kuka vastaa mistäkin ja miten yhteistyö toteutetaan.',
    dataLabel:'DATA · RAPORTOINTI · TESTAUS',
    dataDescription:'Tietojen jäsentäminen, Excel- ja Power BI -raportointi, ohjelmistotestaus sekä työn etenemisen seuranta.',
    dataLanguages:'Asiakasviestintä suomeksi ja englanniksi',
    softwareLabel:'OHJELMISTOKEHITYS · INTEGRAATIOT',
    softwareDescription:'Nykyisten sovellusten korjaukset ja jatkokehitys, käyttöliittymät, taustapalvelut sekä rajapinnat.',
    softwareLanguages:'Tekninen työskentelykieli englanti',
    note:'Projektin tekijät, vastuut ja saatavuus vahvistetaan ennen toimeksiantoa.',
    action:'Kerro projektistasi'
  },
  en:{
    eyebrow:'PEOPLE BEHIND THE WORK',heading:'The right skills for the work.',
    dataIndex:'01 / DATA & QA',softwareIndex:'02 / SOFTWARE',
    intro:'Komplyint brings together reporting, quality assurance and software engineering. We agree who is responsible for each part of an assignment and how the work will be delivered.',
    dataLabel:'DATA · REPORTING · QA',
    dataDescription:'Organising data, Excel and Power BI reporting, software testing and keeping project delivery on track.',
    dataLanguages:'Client communication in Finnish and English',
    softwareLabel:'SOFTWARE DEVELOPMENT · INTEGRATIONS',
    softwareDescription:'Maintaining and improving existing applications, frontend and backend features, and API integrations.',
    softwareLanguages:'Technical working language: English',
    note:'People, responsibilities and availability are confirmed before an engagement.',
    action:'Tell us about your project'
  },
  sv:{
    eyebrow:'PERSONERNA BAKOM ARBETET',heading:'Rätt kompetens för uppdraget.',
    dataIndex:'01 / DATA OCH TESTNING',softwareIndex:'02 / PROGRAMUTVECKLING',
    intro:'Komplyint arbetar med rapportering, kvalitetssäkring och programutveckling. Inför varje uppdrag kommer vi överens om ansvarsfördelning och hur arbetet ska genomföras.',
    dataLabel:'DATA · RAPPORTERING · TESTNING',
    dataDescription:'Strukturering av data, rapportering i Excel och Power BI, programtestning och projektuppföljning.',
    dataLanguages:'Kundkontakt på finska och engelska',
    softwareLabel:'PROGRAMUTVECKLING · INTEGRATIONER',
    softwareDescription:'Underhåll och vidareutveckling av befintliga applikationer, frontend- och backendfunktioner samt API-integrationer.',
    softwareLanguages:'Tekniskt arbetsspråk: engelska',
    note:'Ansvariga personer, arbetsfördelning och tillgänglighet bekräftas före uppdraget.',
    action:'Berätta om ert projekt'
  }
} as const

function ServiceMark({variant}:{variant:'data'|'software'}){
  return <span className="kp-mark" aria-hidden="true">
    {variant==='data'?
      <svg viewBox="0 0 48 48" focusable="false" fill="none">
        <rect x="6" y="6" width="36" height="36" rx="9" stroke="currentColor" strokeOpacity=".48"/>
        <path d="M14 32V24M23 32V17M32 32V13" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M12 36H36" stroke="currentColor" strokeOpacity=".6" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>:
      <svg viewBox="0 0 48 48" focusable="false" fill="none">
        <rect x="6" y="6" width="36" height="36" rx="9" stroke="currentColor" strokeOpacity=".48"/>
        <path d="M18 17 12 24l6 7m12-14 6 7-6 7m-4-18-5 22" stroke="currentColor" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>}
  </span>
}

export default function PeopleAtKomplyint({lang}:{lang:Lang}){
  const t=copy[lang]
  return <section className="kc-section kp-people" aria-labelledby="kp-people-title">
    <div className="kc-shell">
      <div className="kp-intro">
        <div><p className="kc-eyebrow">{t.eyebrow}</p><h2 id="kp-people-title">{t.heading}</h2></div>
        <p>{t.intro}</p>
      </div>
      <div className="kp-grid">
        <article className="kp-person kp-person-data">
          <div className="kp-person-top"><ServiceMark variant="data"/><span className="kp-number">{t.dataIndex}</span></div>
          <h3>Vitus</h3>
          <p className="kp-person-role">{t.dataLabel}</p>
          <p className="kp-person-description">{t.dataDescription}</p>
          <div className="kp-person-language"><span className="kp-language-dot" aria-hidden="true"/>{t.dataLanguages}</div>
        </article>
        <article className="kp-person kp-person-software">
          <div className="kp-person-top"><ServiceMark variant="software"/><span className="kp-number">{t.softwareIndex}</span></div>
          <h3>Valentine</h3>
          <p className="kp-person-role">{t.softwareLabel}</p>
          <p className="kp-person-description">{t.softwareDescription}</p>
          <div className="kp-person-language"><span className="kp-language-dot" aria-hidden="true"/>{t.softwareLanguages}</div>
        </article>
      </div>
      <div className="kp-footer">
        <p>{t.note}</p>
        <a href={pathFor(lang,'contact')+'?engagement=project'} className="kc-text-link">{t.action}<Arrow/></a>
      </div>
    </div>
  </section>
}
