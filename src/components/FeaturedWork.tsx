import { content, type Lang } from '@/lib/commercial'
import Arrow from '@/components/Arrow'
import { pathFor } from '@/lib/site-route'

export default function FeaturedWork({lang}:{lang:Lang}){
  const t=content[lang].impact
  const item=t.cases[0]
  return <section className="kc-section qh-featured-work"><div className="kc-shell qh-feature-grid">
    <div><p className="kc-eyebrow">{lang==='fi'?'HAVAINNOLLISTAVA DEMO':'ILLUSTRATIVE DEMONSTRATION'}</p>
      <h2>{lang==='fi'?'Pienestä ongelmasta selkeään lopputulokseen.':'From a small problem to a clearer outcome.'}</h2>
      <p className="kc-lead">{item.title} — {item.before} {item.after}</p>
      <p className="qh-truth-note">{t.disclaimer}</p>
      <a className="kc-text-link" href={pathFor(lang,'work')}>{lang==='fi'?'Tutustu esimerkkeihin':'Explore examples'} <Arrow/></a>
    </div>
    <div className="qh-work-art" role="img" aria-label={lang==='fi'?'Alkuperäinen kuva tiedon jalostumisesta selkeäksi raportiksi, tumma vihreä, musta ja hillitty punainen':'Original illustration of scattered report data becoming a clear dashboard, in deep forest green, black and restrained red'}>
      <img src={lang==='fi'?'/media/featured-reporting-art-fi.svg':'/media/featured-reporting-art.svg'} width={960} height={600} loading="lazy" decoding="async" className="qh-work-art-image" alt=""/>

    </div>
  </div></section>
}
