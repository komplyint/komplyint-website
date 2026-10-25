import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const RELEASE_CONTRACT = 'komplyint-handbook-2026-10-25'

export function GET() {
  const commit = process.env.VERCEL_GIT_COMMIT_SHA ||
    process.env.KOMPLYINT_DEPLOY_COMMIT ||
    process.env.GITHUB_SHA || null
  return NextResponse.json({
    site: 'Komplyint Oy',
    contract: RELEASE_CONTRACT,
    design: 'charcoal-precision-v1.2.0',
    commit,
    production: process.env.VERCEL_ENV === 'production',
  }, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
