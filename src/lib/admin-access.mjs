/**
 * Komplyint's PRIVATE admin authentication boundary.
 * Trusts only a Cloudflare Access JWT signed for our configured Access app.
 * A forwarded email header, cookie by itself, or an unsigned JWT is never identity.
 * Separate business tools MUST enforce their own access policies too.
 */
import { createPublicKey, verify as verifySignature } from 'node:crypto'

const TEAM_DOMAIN = /^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+cloudflareaccess\.com$/
const EMAIL = /^[^@\s,]+@[^@\s,]+\.[^@\s,.]+$/
const CLOCK_SKEW_S = 60
const MAX_JWT_LENGTH = 16_384

export function readAdminConfig(env = process.env) {
  const teamDomain = (env.KOMPLYINT_ACCESS_TEAM_DOMAIN || '').trim().toLowerCase()
  const audience = (env.KOMPLYINT_ACCESS_AUD || '').trim()
  const emails = (env.KOMPLYINT_ADMIN_EMAILS || '').split(',').map(s => s.trim().toLowerCase()).filter(Boolean)
  if (!TEAM_DOMAIN.test(teamDomain) || !audience || audience.length > 512 || emails.length < 1 || emails.some(e => !EMAIL.test(e))) return null
  return { teamDomain, audience, emails: new Set(emails) }
}

function decodePart(part) {
  if (typeof part !== 'string' || !/^[A-Za-z0-9_-]+$/.test(part)) throw new Error('invalid JWT section')
  return JSON.parse(Buffer.from(part, 'base64url').toString('utf8'))
}

/** Returns a verified principal, or null on ANY missing configuration/identity error. */
export async function verifyKomplyintAdmin(token, { env = process.env, fetchImpl = fetch, now = Date.now() } = {}) {
  const config = readAdminConfig(env)
  if (!config || typeof token !== 'string' || token.length > MAX_JWT_LENGTH || token.length < 24) return null
  const parts = token.split('.')
  if (parts.length !== 3 || !parts.every(p => /^[A-Za-z0-9_-]+$/.test(p))) return null
  try {
    const header = decodePart(parts[0])
    const claims = decodePart(parts[1])
    if (!header || header.alg !== 'RS256' || typeof header.kid !== 'string' || !header.kid || header.crit || header.jku || header.x5u) return null
    if (!claims || claims.iss !== 'https://' + config.teamDomain) return null
    const audiences = Array.isArray(claims.aud) ? claims.aud : [claims.aud]
    if (!audiences.includes(config.audience)) return null
    const seconds = Math.floor(now / 1000)
    if (!Number.isFinite(claims.exp) || claims.exp <= seconds || !Number.isFinite(claims.iat) || claims.iat > seconds + CLOCK_SKEW_S) return null
    if (claims.nbf !== undefined && (!Number.isFinite(claims.nbf) || claims.nbf > seconds + CLOCK_SKEW_S)) return null

    const response = await fetchImpl('https://' + config.teamDomain + '/cdn-cgi/access/certs', {
      method: 'GET', redirect: 'error', cache: 'no-store',
      signal: AbortSignal.timeout(5000),
      headers: { Accept: 'application/json' },
    })
    if (!response?.ok) return null
    const jwks = await response.json()
    const jwk = jwks?.keys?.find(key => key.kid === header.kid && key.kty === 'RSA' &&
      (!key.use || key.use === 'sig') && (!key.alg || key.alg === 'RS256') && key.n && key.e)
    if (!jwk) return null
    const valid = verifySignature(
      'RSA-SHA256',
      Buffer.from(parts[0] + '.' + parts[1]),
      createPublicKey({ key: jwk, format: 'jwk' }),
      Buffer.from(parts[2], 'base64url'),
    )
    if (!valid || typeof claims.email !== 'string') return null
    const email = claims.email.trim().toLowerCase()
    if (!config.emails.has(email)) return null
    return Object.freeze({ email })
  } catch {
    // Do not expose token, network errors, or internal configuration in public responses.
    return null
  }
}

const ADMIN_TOOLS = Object.freeze([
  { id: 'business', name: 'Business OS', purpose: 'Clients, leads, proposals and work tracking', key: 'KOMPLYINT_ADMIN_BUSINESS_OS_URL' },
  { id: 'orders', name: 'Tinyerg orders', purpose: 'Private order review and delivery', key: 'KOMPLYINT_ADMIN_TINYERG_OPERATOR_URL' },
  { id: 'data', name: 'Data and reporting', purpose: 'Dataset validation, reports and dashboards', key: 'KOMPLYINT_ADMIN_DATA_URL' },
  { id: 'automation', name: 'Automation', purpose: 'Approved flows, provider connections and results', key: 'KOMPLYINT_ADMIN_AUTOMATION_URL' },
  { id: 'media', name: 'Media production', purpose: 'Licensed assets, real render and download', key: 'KOMPLYINT_ADMIN_STUDIO_URL' },
  { id: 'security', name: 'Security and QA', purpose: 'Authorized assessments and verifiable findings', key: 'KOMPLYINT_ADMIN_SECURITY_URL' },
])

function verifiedDestination(raw, allowedHosts) {
  if (!raw) return null
  try {
    const url = new URL(raw)
    if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash || url.port) return null
    if (!allowedHosts.has(url.hostname.toLowerCase())) return null
    return url.href
  } catch {
    return null
  }
}

/** A configured link is not evidence that a downstream service is deployed or healthy. */
export function komplyintAdminTools(env = process.env) {
  const allowedHosts = new Set((env.KOMPLYINT_ADMIN_ALLOWED_HOSTS || '').split(',')
    .map(v => v.trim().toLowerCase()).filter(v => /^[a-z0-9.-]+$/.test(v)))
  return ADMIN_TOOLS.map(tool => ({
    id: tool.id, name: tool.name, purpose: tool.purpose,
    href: verifiedDestination(env[tool.key], allowedHosts),
  }))
}
