import type { Lang } from '@/lib/commercial'

export default function PublicBrochures({lang}:{lang:Lang}){
  const fi=lang==='fi'
  return <section className="kc-section qh-downloads"><div className="kc-shell qh-downloads-grid">
    <div><p className="kc-eyebrow">{fi?'LADATTAVAT PALVELUESITTEET':'DOWNLOAD SERVICE INFORMATION'}</p><h2>{fi?'Tutustu palveluihimme omassa tahdissasi.':'Explore our services in your own time.'}</h2><p>{fi?'Lataa suomen- tai englanninkielinen esite. Molemmat ovat saatavilla myös yhtenä ZIP-pakettina.':'Download a Finnish or English brochure, or get both in one ZIP package.'}</p></div>
    <div className="qh-download-links">
      <a href="/downloads/Komplyint_Palveluesite_FI.pdf" download><span>PDF · FI</span><strong>Komplyint Palveluesite</strong><span aria-hidden="true">↓</span></a>
      <a href="/downloads/Komplyint_Service_Portfolio_EN.pdf" download><span>PDF · EN</span><strong>Komplyint Service Portfolio</strong><span aria-hidden="true">↓</span></a>
      <a href="/downloads/Komplyint_Service_Documents.zip" download><span>ZIP</span><strong>{fi?'Molemmat esitteet':'Both brochures'}</strong><span aria-hidden="true">↓</span></a>
    </div>
  </div></section>
}
