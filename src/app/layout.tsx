import type { Metadata } from 'next'
import { headers } from 'next/headers'
import '@fontsource/eb-garamond/latin-400.css'
import '@fontsource/eb-garamond/latin-ext-400.css'
import '@fontsource/lato/latin-400.css'
import '@fontsource/lato/latin-ext-400.css'
import '@fontsource/lato/latin-700.css'
import '@fontsource/lato/latin-ext-700.css'
import './globals.css'
import './commercial.css'
import './handbook.css'
import './i18n.css'
import { isLocale, defaultLocale } from '@/lib/i18n'
import { pageMetadata } from '@/lib/route-meta'
import LangSetter from './LangSetter'

// F15-F18: pinned SIL-OFL fontsource webfont assets are bundled locally at build time.
// Unlike next/font/google, the production build never depends on a live Google CSS endpoint.

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
    <html lang={locale} className="dark" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{__html:`(function(){try{var v=localStorage.getItem('komplyint-theme')||'system';var d=v==='dark'||(v==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);document.documentElement.style.colorScheme=d?'dark':'light'}catch(e){}})();`}}/></head>
      <body>
        <LangSetter />
        {children}
      </body>
    </html>
  )
}
