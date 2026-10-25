'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getLocaleFromPath, localizedPath } from '@/lib/i18n'
import { ui } from '@/lib/i18n-ui'

export default function ErrorPage({reset}:{error:Error&{digest?:string};reset:()=>void}){
 const locale=getLocaleFromPath(usePathname()||'/'),labels=ui[locale].errors
 return <main className="kc-root qh-error-page"><div className="kc-shell">
   <p className="kc-eyebrow">500 / {labels.eyebrow}</p>
   <h1>{labels.title}</h1><p>{labels.body}</p>
   <div className="qh-error-actions"><button type="button" className="kc-button kc-button-primary" onClick={reset}>{labels.retry} ↻</button>
   <Link className="kc-text-link" href={localizedPath('/',locale)}>{labels.home}</Link></div>
 </div></main>
}
