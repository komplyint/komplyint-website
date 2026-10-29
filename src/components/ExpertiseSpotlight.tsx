import {spotlightCopy, type Lang} from '@/lib/commercial'
import {pathFor} from '@/lib/site-route'
import Arrow from '@/components/Arrow'

/** Prominent specialist capabilities, reused on home and software pages.
 * Avoid implying that the collaborating engineer is a permanent employee.
 */
export default function ExpertiseSpotlight({lang}:{lang:Lang}) {
  const c=spotlightCopy[lang]
  const software=pathFor(lang,'software')
  const contact=pathFor(lang,'contact')
  return <section id="software-expertise" className="kc-expertise" aria-labelledby="kc-expertise-title">
    <div className="kc-shell">
      <div className="kc-expertise-intro">
        <p className="kc-eyebrow">{c.eyebrow}</p>
        <h2 id="kc-expertise-title">{c.title}</h2>
        <p>{c.lead}</p>
      </div>
      <div className="kc-expertise-grid">
        <article className="kc-expertise-feature">
          <div className="kc-expertise-heading">
            <span className="kc-expertise-highlight">{c.fullstackSubtitle}</span>
            <span className="kc-expertise-symbol" aria-hidden="true">{'{ }'}</span>
          </div>
          <h3>{c.fullstackTitle}</h3>
          <p>{c.fullstackDescription}</p>
          <div className="kc-expertise-tech" aria-label={c.fullstackTitle}>
            {c.stack.map(tech=><span key={tech}>{tech}</span>)}
          </div>
          <p className="kc-expertise-language">{c.fullstackLanguage}</p>
          <a className="kc-expertise-primary" href={software}>{c.actionSoftware}<Arrow/></a>
        </article>
        <article className="kc-expertise-secondary">
          <span className="kc-expertise-highlight kc-expertise-highlight-secondary">{c.dataSubtitle}</span>
          <h3>{c.dataTitle}</h3>
          <p>{c.dataDescription}</p>
          <div className="kc-expertise-tech kc-expertise-tech-secondary" aria-label={c.dataTitle}>
            {c.dataStack.map(tech=><span key={tech}>{tech}</span>)}
          </div>
          <p className="kc-expertise-language">{c.dataLanguage}</p>
          <a className="kc-expertise-secondary-link" href={contact+'?engagement=project'}>{c.actionProject}<Arrow/></a>
        </article>
      </div>
      <p className="kc-expertise-scope">{c.caveat}</p>
      <div className="kc-expertise-downloads" aria-label={c.portfolioHeading}>
        <div><strong>{c.portfolioHeading}</strong><p>{c.portfolioLead}</p></div>
        <div className="kc-expertise-download-actions">
          <a href={c.pdfFile} download={c.pdfName} className="kc-expertise-download">{c.actionDownload}<span aria-hidden="true">↓</span></a>
          <a href="/downloads/Komplyint_Service_Documents.zip" download="Komplyint_Service_Documents.zip" className="kc-expertise-download kc-expertise-download-all">{c.actionPackage}<span aria-hidden="true">↓</span></a>
        </div>
      </div>
    </div>
  </section>
}
