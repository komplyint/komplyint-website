import { content, type Lang } from '@/lib/commercial'
import Arrow from '@/components/Arrow'
import {EnterpriseHeroVisual, EnterpriseReportingVisual} from '@/components/EnterpriseVisuals'
import { pathFor } from '@/lib/site-route'
import { ui } from '@/lib/i18n-ui'

/** Homepage previews for both reporting and software engineering examples.
 * Neither is represented as a completed client engagement.
 */
export default function FeaturedWork({lang}:{lang:Lang}){
  const t=content[lang].impact
  const f=ui[lang].featured
  return <section className="kc-section qh-featured-work"><div className="kc-shell">
    <div className="qh-feature-grid">
      <div><p className="kc-eyebrow">{f.eyebrow}</p>
        <h2>{f.title}</h2>
        <p className="kc-lead">{f.summary}</p>
        <p className="qh-truth-note">{t.disclaimer}</p>
        <a className="kc-text-link" href={pathFor(lang,'work')+'#data-examples'}>{f.link} <Arrow/></a>
      </div>
      <div className="qh-work-art" role="group" aria-label={f.alt}>
        <img src={lang==='fi'?'/media/featured-reporting-art-fi.svg':lang==='sv'?'/media/featured-reporting-art-sv.svg':'/media/featured-reporting-art.svg'} width={960} height={600} loading="lazy" decoding="async" className="qh-work-art-image" alt="" aria-hidden="true"/>
        <EnterpriseReportingVisual lang={lang}/>
      </div>
    </div>
    <div className="qh-feature-grid qh-feature-software">
      <div className="qh-feature-software-art">
        <EnterpriseHeroVisual lang={lang}/>
      </div>
      <div><p className="kc-eyebrow">{t.softwareEyebrow}</p>
        <h2>{t.featuredSoftwareTitle}</h2>
        <p className="kc-lead">{t.featuredSoftwareText}</p>
        <p className="qh-truth-note">{t.disclaimer}</p>
        <a className="kc-text-link" href={pathFor(lang,'work')+'#software-examples'}>{t.softwareLink} <Arrow/></a>
      </div>
    </div>
  </div></section>
}
