import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { EB_Garamond, Lato } from 'next/font/google'
import './globals.css'
import './commercial.css'
import './handbook.css'
import './i18n.css'
import { isLocale, defaultLocale } from '@/lib/i18n'
import { pageMetadata } from '@/lib/route-meta'
import LangSetter from './LangSetter'

// F15-F18: real, build-time self-hosted font files with immutable Next.js URLs.
// Only the required upright EB Garamond and Lato 400/700 weights are preloaded.
const displayFont = EB_Garamond({ subsets: ['latin'], weight: ['400'], style: ['normal'], display: 'swap', variable: '--font-eb-garamond' })
const bodyFont = Lato({ subsets: ['latin'], weight: ['400', '700'], style: ['normal'], display: 'swap', variable: '--font-lato' })

export const metadata: Metadata = {
  ...pageMetadata('fi','home'),
  metadataBase: new URL('https://www.komplyint.fi'),
  verification: {
    google: 'GI4h7VfvcOLD5ypU8bsuOOS5ayP6HyE04klUIoLIPFY',
  },
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // F07/T12: locale must be correct in *server HTML*, not only after React hydrates.
  // Middleware always overrides the incoming locale header; client navigation is
  // still handled by LangSetter after a language switch.
  const headerLocale = headers().get('x-komplyint-locale') || ''
  const locale = isLocale(headerLocale) ? headerLocale : defaultLocale
  return (
    <html lang={locale} className={`${displayFont.variable} ${bodyFont.variable} dark`} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{__html:`(function(){try{var v=localStorage.getItem('komplyint-theme')||'system';var d=v==='dark'||(v==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);document.documentElement.style.colorScheme=d?'dark':'light'}catch(e){}})();`}}/></head>
      <body>
        <LangSetter />
        {children}
      </body>
    </html>
  )
}
