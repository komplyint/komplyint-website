'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getLocaleFromPath, localizedPath } from '@/lib/i18n'
import { ui } from '@/lib/i18n-ui'

export default function NotFound(){
 const locale=getLocaleFromPath(usePathname()||'/'),labels=ui[locale].notFound
 return <main className="kc-root qh-error-page"><div className="kc-shell">
   <p className="kc-eyebrow">404 / {labels.eyebrow}</p>
   <h1>{labels.title}</h1><p>{labels.body}</p>
   <Link className="kc-button kc-button-primary" href={localizedPath('/',locale)}>{labels.home} ↗</Link>
 </div></main>
}
