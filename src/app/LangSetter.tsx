'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { getLocaleFromPath } from '@/lib/i18n'

export default function LangSetter() {
  const pathname = usePathname()

  useEffect(() => {
    // Update HTML lang attribute based on route
    const lang = getLocaleFromPath(pathname)
    document.documentElement.lang = lang
  }, [pathname])

  return null
}
