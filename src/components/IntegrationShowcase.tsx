import type {Lang} from '@/lib/commercial'
import {pathFor} from '@/lib/site-route'
import {EnterpriseHeroVisual} from '@/components/EnterpriseVisuals'
import Arrow from '@/components/Arrow'

const content={
  fi:{
    eyebrow:'OHJELMISTOT · INTEGRAATIOT · TESTAUS',
    title:'Integraation toimivuus pitää pystyä todentamaan.',
    lead:'Kun järjestelmät vaihtavat tietoa, pelkkä onnistunut vastaus ei riitä. Kokeile, miten tietojen tarkistus, virhetilanne ja uusi yritys näkyvät yhdessä näkymässä.',
    action:'Kerro integraatiohaasteesta'
  },
  en:{
    eyebrow:'SOFTWARE · INTEGRATIONS · TESTING',
    title:'An integration should be verifiably reliable.',
    lead:'When systems exchange data, one successful response is not enough. Explore how validation, a simulated failure and a retry can be checked in one clear view.',
    action:'Discuss an integration challenge'
  },
  sv:{
    eyebrow:'PROGRAMVARA · INTEGRATIONER · TESTNING',
    title:'En fungerande integration ska också kunna kontrolleras.',
    lead:'När system utbyter uppgifter räcker det inte med ett lyckat svar. Se hur datakontroll, ett simulerat fel och ett nytt försök kan följas upp i en tydlig vy.',
    action:'Diskutera en integrationsutmaning'
  }
} as const

/** A real interactive local demonstration, placed after the primary video and
 * the portfolio narrative. The film itself remains an uncluttered introduction. */
export default function IntegrationShowcase({lang}:{lang:Lang}){
  const t=content[lang]
  return <section className="kc-section kc-integration-demo" aria-labelledby="kc-integration-demo-heading" id="integration-demo">
    <div className="kc-shell kc-integration-demo-grid">
      <div className="kc-integration-demo-copy">
        <p className="kc-eyebrow">{t.eyebrow}</p>
        <h2 id="kc-integration-demo-heading">{t.title}</h2>
        <p>{t.lead}</p>
        <a className="kc-text-link" href={pathFor(lang,'contact')+'?engagement=project'}>{t.action}<Arrow/></a>
      </div>
      <EnterpriseHeroVisual lang={lang}/>
    </div>
  </section>
}
