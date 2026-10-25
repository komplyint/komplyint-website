import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { EB_Garamond, Lato } from 'next/font/google'
import './globals.css'
import './commercial.css'
import './handbook.css'
import LangSetter from './LangSetter'

// F15-F18: real, build-time self-hosted font files with immutable Next.js URLs.
// Only the required upright EB Garamond and Lato 400/700 weights are preloaded.
const displayFont = EB_Garamond({ subsets: ['latin'], weight: ['400'], style: ['normal'], display: 'swap', variable: '--font-eb-garamond' })
const bodyFont = Lato({ subsets: ['latin'], weight: ['400', '700'], style: ['normal'], display: 'swap', variable: '--font-lato' })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.komplyint.fi'),
  openGraph: {
    title: 'Komplyint Oy | Data, automation and software solutions',
    description: 'Practical Excel, Power BI, Microsoft 365 workflow, software and website services for Finnish businesses.',
    url: 'https://www.komplyint.fi',
    siteName: 'Komplyint Oy',
    type: 'website',
  },
  verification: {
    google: 'GI4h7VfvcOLD5ypU8bsuOOS5ayP6HyE04klUIoLIPFY',
  },
  title: 'Komplyint Oy',
  description: 'Komplyint Oy offers Excel and Power BI reporting, Microsoft 365 automation, small software development, website improvements and agreed technical maintenance for Finnish businesses.',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // F07/T12: locale must be correct in *server HTML*, not only after React hydrates.
  // Middleware always overrides the incoming locale header; client navigation is
  // still handled by LangSetter after a language switch.
  const locale = headers().get('x-komplyint-locale') === 'en' ? 'en' : 'fi'
  return (
    <html lang={locale} className={`${displayFont.variable} ${bodyFont.variable} dark`} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{__html:`(function(){try{var v=localStorage.getItem('komplyint-theme')||'dark';var d=v==='dark'||(v==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);document.documentElement.style.colorScheme=d?'dark':'light'}catch(e){}})();`}}/></head>
      <body>
        <LangSetter />
        {children}
      </body>
    </html>
  )
}
