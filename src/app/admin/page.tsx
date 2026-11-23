import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { komplyintAdminTools, verifyKomplyintAdmin } from '@/lib/admin-access.mjs'
import './admin.css'

/* Keep all admin data dynamic, private and unreachable without a verified identity. */
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0
export const metadata: Metadata = {
  title: 'Komplyint | Private operations',
  description: 'Restricted Komplyint Oy operations workspace',
  robots: { index: false, follow: false, noarchive: true },
}

export default async function AdminPage() {
  const principal = await verifyKomplyintAdmin(headers().get('cf-access-jwt-assertion') || '')
  // Never use unverified email headers, login query parameters or client-side checks.
  if (!principal) notFound()

  const tools = komplyintAdminTools()

  return (
    <main className="kc-root kc-admin" aria-labelledby="kc-admin-title">
      <div className="kc-admin-shell">
        <header className="kc-admin-header">
          <a href="/" aria-label="Komplyint public website">
            <img src="/logo.svg" alt="Komplyint Oy" width="86" height="62" />
          </a>
          <span className="kc-admin-tag">Private · Admin only</span>
        </header>

        <section className="kc-admin-intro">
          <p className="kc-admin-eyebrow">Komplyint Oy / Operations</p>
          <h1 id="kc-admin-title">Your business workspace</h1>
          <p>Approved business, data, automation, media and security tools in one restricted place. Each service retains its own permissions.</p>
          <p className="kc-admin-identity">Signed in as <strong>{principal.email}</strong></p>
        </section>

        <section aria-label="Operational applications" className="kc-admin-grid">
          {tools.map(tool => (
            <article className="kc-admin-card" key={tool.id}>
              <div className="kc-admin-card-top">
                <span className="kc-admin-name">{tool.name}</span>
                <span className={'kc-admin-status ' + (tool.href ? 'kc-admin-status-configured' : '')}>
                  {tool.href ? 'Link configured' : 'Not connected'}
                </span>
              </div>
              <p>{tool.purpose}</p>
              {tool.href
                ? <a className="kc-admin-open" href={tool.href} target="_blank" rel="noopener noreferrer">
                    Open protected service <span aria-hidden="true">↗</span>
                  </a>
                : <span className="kc-admin-unavailable">Service URL not configured</span>}
            </article>
          ))}
        </section>

        <p className="kc-admin-note">A configured link does not establish that its downstream service is live or authenticated. The service must independently authorize every action. No customer data is retrieved by this page.</p>
      </div>
    </main>
  )
}
