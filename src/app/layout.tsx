import type { Metadata } from 'next'
import './globals.css'
import './commercial.css'
import LangSetter from './LangSetter'

export const metadata: Metadata = {
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
    <html lang="fi" suppressHydrationWarning>
      <body>
        <LangSetter />
        {children}
      </body>
    </html>
  )
}
