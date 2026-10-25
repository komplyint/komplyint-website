import { content, type Lang } from '@/lib/commercial'
import Arrow from '@/components/Arrow'
import { pathFor } from '@/lib/site-route'
import { ui } from '@/lib/i18n-ui'

export default function FeaturedWork({lang}:{lang:Lang}){
  const t=content[lang].impact
  const f=ui[lang].featured
  const item=t.cases[0]
  return <section className="kc-section qh-featured-work"><div className="kc-shell qh-feature-grid">
    <div><p className="kc-eyebrow">{f.eyebrow}</p>
      <h2>{f.title}</h2>
      <p className="kc-lead">{item.title} — {item.before} {item.after}</p>
      <p className="qh-truth-note">{t.disclaimer}</p>
      <a className="kc-text-link" href={pathFor(lang,'work')}>{f.link} <Arrow/></a>
    </div>
    <div className="qh-work-art" role="img" aria-label={f.alt}>
      <img src={lang==='fi'?'/media/featured-reporting-art-fi.svg':lang==='sv'?'/media/featured-reporting-art-sv.svg':'/media/featured-reporting-art.svg'} width={960} height={600} loading="lazy" decoding="async" className="qh-work-art-image" alt=""/>

    </div>
  </div></section>
}
