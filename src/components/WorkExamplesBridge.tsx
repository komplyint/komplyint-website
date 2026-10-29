import {content, type Lang} from '@/lib/commercial'
import {pathFor} from '@/lib/site-route'
import Arrow from '@/components/Arrow'

/** Reuse the same example routes from the Services and Software pages. */
export default function WorkExamplesBridge({lang}:{lang:Lang}){
  const t=content[lang].impact
  const base=pathFor(lang,'work')
  return <section className="kc-section kc-examples-bridge" aria-label={t.softwareTitle}>
    <div className="kc-shell kc-examples-bridge-inner">
      <div>
        <p className="kc-eyebrow">{t.softwareEyebrow}</p>
        <h2>{t.softwareTitle}</h2>
        <p>{t.softwareLead}</p>
      </div>
      <div className="kc-examples-bridge-links">
        <a href={base+'#software-examples'} className="kc-examples-bridge-primary">{t.softwareLink}<Arrow/></a>
        <a href={base+'#data-examples'} className="kc-examples-bridge-secondary">{t.dataAnchor}<Arrow/></a>
      </div>
    </div>
  </section>
}
