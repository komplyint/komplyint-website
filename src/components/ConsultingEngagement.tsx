import { consultingCopy, type Lang } from '@/lib/commercial'
import { pathFor } from '@/lib/site-route'
import Arrow from '@/components/Arrow'

/** Reuse the site's public layout and existing contact journey; no duplicate microsite. */
export default function ConsultingEngagement({lang}:{lang:Lang}){
  const t=consultingCopy[lang]
  const contact=pathFor(lang,'contact')
  return <section className="kc-section kc-engagement" id="engagement-options" aria-labelledby="kc-engagement-title">
    <div className="kc-shell">
      <p className="kc-eyebrow">{t.eyebrow}</p>
      <h2 id="kc-engagement-title">{t.title}</h2>
      <p className="kc-engagement-lead">{t.lead}</p>
      <div className="kc-engagement-grid">
        <article className="kc-engagement-card">
          <span aria-hidden="true" className="kc-engagement-number">01</span>
          <h3>{t.projectHeading}</h3><p>{t.projectText}</p>
          <a className="kc-text-link" href={contact+'?engagement=project'}>{t.ctaProject}<Arrow/></a>
        </article>
        <article className="kc-engagement-card">
          <span aria-hidden="true" className="kc-engagement-number">02</span>
          <h3>{t.consultantHeading}</h3><p>{t.consultantText}</p>
          <a className="kc-text-link" href={contact+'?engagement=consultant'}>{t.ctaConsultant}<Arrow/></a>
        </article>
      </div>
      <div className="kc-engagement-notes">
        <div><h3>{t.languageHeading}</h3><p>{t.languageLead}</p><p className="kc-engagement-disclaimer">{t.languageNote}</p></div>
        <div><h3>{t.trainingHeading}</h3><p>{t.trainingText}</p></div>
      </div>
    </div>
  </section>
}
