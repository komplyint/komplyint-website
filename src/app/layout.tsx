import type { Metadata } from 'next'
import './globals.css'
import './commercial.css'
import './handbook.css'
import LangSetter from './LangSetter'

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
  return (
    <html lang="fi" className="dark" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{__html:`(function(){try{var v=localStorage.getItem('komplyint-theme')||'dark';var d=v==='dark'||(v==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);document.documentElement.style.colorScheme=d?'dark':'light'}catch(e){}})();`}}/></head>
      <body>
        <LangSetter />
        {children}
      </body>
    </html>
  )
}
