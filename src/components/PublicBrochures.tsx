import type { Lang } from '@/lib/commercial'
import { ui } from '@/lib/i18n-ui'

export default function PublicBrochures({lang}:{lang:Lang}){
  const b=ui[lang].brochures
  return <section className="kc-section qh-downloads"><div className="kc-shell qh-downloads-grid">
    <div><p className="kc-eyebrow">{b.eyebrow}</p><h2>{b.title}</h2><p>{b.lead}</p></div>
    <div className="qh-download-links">
      <a href="/downloads/Komplyint_Palveluesite_FI.pdf" download><span>PDF · FI</span><strong>Palveluesite · suomi</strong><span aria-hidden="true">↓</span></a>
      <a href="/downloads/Komplyint_Service_Portfolio_EN.pdf" download><span>PDF · EN</span><strong>Service brochure · English</strong><span aria-hidden="true">↓</span></a>
      <a href="/downloads/Komplyint_Tjanstebroschyr_SV.pdf" download><span>PDF · SV</span><strong>Tjänstebroschyr · svenska</strong><span aria-hidden="true">↓</span></a>
      <a href="/downloads/Komplyint_Service_Documents.zip" download><span>ZIP</span><strong>{b.both}</strong><span aria-hidden="true">↓</span></a>
    </div>
  </div></section>
}
