import {spotlightCopy, type Lang} from '@/lib/commercial'
import {pathFor} from '@/lib/site-route'
import Arrow from '@/components/Arrow'

/** Buyer-problem-based software page, not an inflated experience or technology badge.
 * Public services are conditional on the assignment and agreed specialist.
 */
export default function ExpertiseSpotlight({lang}:{lang:Lang}) {
 const c=spotlightCopy[lang]
 const contact=pathFor(lang,'contact')
 const software=pathFor(lang,'software')
 return <section className="kc-expertise kc-solutions" id="software-expertise" aria-labelledby="kc-expertise-title">
  <div className="kc-shell">
    <div className="kc-expertise-intro">
      <p className="kc-eyebrow">{c.eyebrow}</p>
      <h2 id="kc-expertise-title">{c.title}</h2>
      <p>{c.lead}</p>
    </div>
    <div className="kc-solutions-list">
      {c.problems.map((item,i)=><article className="kc-solutions-case" key={item.title}>
        <div className="kc-solutions-challenge">
          <span className="kc-solutions-number" aria-hidden="true">{String(i+1).padStart(2,'0')}</span>
          <p className="kc-solutions-label">{c.problemLabel}</p>
          <h3>{item.title}</h3>
          <p className="kc-solutions-problem">{item.problem}</p>
        </div>
        <div className="kc-solutions-response">
          <p className="kc-solutions-label">{c.solutionLabel}</p>
          <p>{item.solution}</p>
          <p className="kc-solutions-outcome-label">{c.outcomeLabel}</p>
          <p className="kc-solutions-outcome">{item.outcome}</p>
        </div>
      </article>)}
    </div>

    <div className="kc-solutions-delivery">
      <div className="kc-solutions-delivery-intro">
        <p className="kc-eyebrow">{c.deliveryEyebrow}</p>
        <h3>{c.deliveryHeading}</h3>
        <p>{c.deliveryLead}</p>
        <a href={contact+'?engagement=project'} className="kc-expertise-primary">{c.actionProject}<Arrow/></a>
      </div>
      <ol className="kc-solutions-steps">
        {c.deliverySteps.map((step,i)=><li key={step.title}>
          <span aria-hidden="true">{String(i+1).padStart(2,'0')}</span>
          <div><h4>{step.title}</h4><p>{step.description}</p></div>
        </li>)}
      </ol>
    </div>

    <div className="kc-solutions-expertise">
      <article>
        <p className="kc-eyebrow">{c.fullstackSubtitle}</p>
        <h3>{c.fullstackTitle}</h3>
        <p>{c.fullstackDescription}</p>
        <p className="kc-solutions-language">{c.fullstackLanguage}</p>
        <a className="kc-text-link" href={software}>{c.actionSoftware}<Arrow/></a>
      </article>
      <article>
        <p className="kc-eyebrow">{c.dataSubtitle}</p>
        <h3>{c.dataTitle}</h3>
        <p>{c.dataDescription}</p>
        <p className="kc-solutions-language">{c.dataLanguage}</p>
      </article>
    </div>
    <div className="kc-solutions-technology">
      <strong>{c.technologyHeading}</strong>
      <p>{c.technologyLead}</p>
      <p>{c.stack.join(' · ')}</p>
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
