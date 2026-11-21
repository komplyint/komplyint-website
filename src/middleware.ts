import { NextResponse, type NextRequest } from 'next/server'
import { getLocaleFromPath } from './lib/i18n'

// F07/T12: preserve real bilingual SSR while retaining the existing single
// Next.js app and bilingual routes. Never trust an incoming locale header.
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const locale = getLocaleFromPath(pathname)
  const forwardedHeaders = new Headers(request.headers)
  forwardedHeaders.set('x-komplyint-locale', locale)
  const response = NextResponse.next({ request: { headers: forwardedHeaders } })
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    response.headers.set('Cache-Control', 'private, no-store, max-age=0, must-revalidate')
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive')
  }
  return response
}

// Do not make static assets, documents, API endpoints or framework resources dynamic.
export const config = {
  matcher: ['/((?!api|_next|favicon.ico|.*\\..*).*)'],
}
