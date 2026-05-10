import type { Metadata } from 'next'
import './globals.css'
import LangSetter from './LangSetter'

export const metadata: Metadata = {
  title: 'Komplyint Oy',
  description: 'KOMPLYINT OY - Compliance readiness, software production, and Floently language-learning product.',
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
