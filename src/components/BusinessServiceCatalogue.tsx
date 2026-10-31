'use client'

import { useMemo, useState } from 'react'
import type { Lang } from '@/lib/commercial'
import { pathFor } from '@/lib/site-route'
import { areaNames, businessPackages, businessServices, expansionText, platformGroups, type BusinessArea } from '@/lib/business-offers'

export default function BusinessServiceCatalogue({ lang }: { lang: Lang }) {
  const t = expansionText[lang]
  const [area, setArea] = useState<BusinessArea | 'all'>('all')
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => {
    const term = query.toLocaleLowerCase().trim()
    return businessServices.filter(item =>
      (area === 'all' || item.area === area) &&
      (!term || [item.name[lang], item.tools, areaNames[item.area][lang]].join(' ').toLocaleLowerCase().includes(term))
    )
  }, [area, query, lang])
  const areas = Object.keys(areaNames) as BusinessArea[]
  return <section className="kc-section bs-catalogue" aria-labelledby="bs-catalogue-title">
    <div className="kc-shell">
      <div className="bs-intro">
        <p className="kc-eyebrow">{t.eyebrow}</p>
        <h2 id="bs-catalogue-title">{t.headline}</h2>
        <p>{t.intro}</p>
      </div>

      <div className="bs-package-heading">
        <div><p className="kc-eyebrow">01 / {t.packageTitle}</p><h3>{t.packageTitle}</h3></div>
        <p>{t.packageIntro}</p>
      </div>
      <div className="bs-packages">
        {businessPackages.map((item, i) => <article key={item.id} className="bs-package">
          <div className="bs-package-number">{String(i + 1).padStart(2, '0')}</div>
          <h4>{item.name[lang]}</h4>
          <p>{item.description[lang]}</p>
          <a href={pathFor(lang,'contact') + '?service=' + encodeURIComponent(item.route)}>{t.enquire}<span aria-hidden="true">↗</span></a>
        </article>)}
      </div>

      <div className="bs-library" id="solutions">
        <div className="bs-package-heading">
          <div><p className="kc-eyebrow">02 / {t.tasksTitle}</p><h3>{t.tasksTitle}</h3></div>
          <p>{t.tasksIntro}</p>
        </div>
        <div className="bs-controls">
          <label className="bs-search">{t.search}<input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={t.search}/></label>
          <div className="bs-areas" role="group" aria-label={t.tasksTitle}>
            <button type="button" aria-pressed={area === 'all'} onClick={() => setArea('all')}>{t.all}</button>
            {areas.map(group => <button key={group} type="button" aria-pressed={area === group} onClick={() => setArea(group)}>{areaNames[group][lang]}</button>)}
          </div>
        </div>
        <p className="bs-result-count" role="status">{filtered.length} {t.showing}</p>
        {filtered.length ? <div className="bs-service-list">
          {filtered.map(item => <article key={item.id} className="bs-task">
            <div className="bs-task-heading"><h4>{item.name[lang]}</h4><span>{areaNames[item.area][lang]}</span></div>
            <p>{item.tools}</p>
            <a href={pathFor(lang,'contact') + '?service=' + encodeURIComponent(item.route)} aria-label={t.enquire + ': ' + item.name[lang]}>{t.enquire} <span aria-hidden="true">↗</span></a>
          </article>)}
        </div> : <p className="bs-no-results">{t.empty}</p>}
      </div>

      <div className="bs-toolbox">
        <div className="bs-package-heading"><div><p className="kc-eyebrow">03 / {t.toolsTitle}</p><h3>{t.toolsTitle}</h3></div><p>{t.toolsIntro}</p></div>
        <div className="bs-tool-columns">
          {platformGroups.map(group => <details key={group.id} open={group.id==='microsoft'} className="bs-tool-group">
            <summary>{group.name[lang]}<span aria-hidden="true">+</span></summary>
            <div className="bs-tool-tags">{group.tools.map(tool=><span key={tool}>{tool}</span>)}</div>
          </details>)}
        </div>
        <p className="bs-scope-note">{t.scope}</p>
      </div>
    </div>
  </section>
}
