import test from 'node:test'
import assert from 'node:assert/strict'
import { createSign, generateKeyPairSync } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { readAdminConfig, verifyKomplyintAdmin, komplyintAdminTools } from '../src/lib/admin-access.mjs'

const { publicKey, privateKey } = generateKeyPairSync('rsa', { modulusLength: 2048 })
const publicJwk = publicKey.export({ format: 'jwk' })
const NOW = Date.parse('2026-11-22T12:00:00Z')
const SEC = NOW / 1000
const env = {
  KOMPLYINT_ACCESS_TEAM_DOMAIN: 'team.cloudflareaccess.com',
  KOMPLYINT_ACCESS_AUD: 'test-app-audience',
  KOMPLYINT_ADMIN_EMAILS: 'owner@example.invalid',
  KOMPLYINT_ADMIN_ALLOWED_HOSTS: 'ops.komplyint.fi,operator.tinyerg.com',
  KOMPLYINT_ADMIN_BUSINESS_OS_URL: 'https://ops.komplyint.fi/',
  KOMPLYINT_ADMIN_TINYERG_OPERATOR_URL: 'https://operator.tinyerg.com/operator/',
}
const claims = { iss: 'https://team.cloudflareaccess.com', aud: ['test-app-audience'], exp: SEC + 3600, iat: SEC - 30, email: 'owner@example.invalid' }
const b64 = value => Buffer.from(JSON.stringify(value)).toString('base64url')
function signJwt(c = claims, header = { alg: 'RS256', kid: 'unit-test-key', typ: 'JWT' }) {
  const payload = b64(header) + '.' + b64(c)
  const signer = createSign('RSA-SHA256')
  signer.update(payload)
  return payload + '.' + signer.sign(privateKey).toString('base64url')
}
const fetchImpl = async url => {
  assert.equal(url, 'https://team.cloudflareaccess.com/cdn-cgi/access/certs')
  return { ok: true, json: async () => ({ keys: [{ ...publicJwk, kid: 'unit-test-key', alg: 'RS256', use: 'sig' }] }) }
}
const verify = (token, overrides = {}) => verifyKomplyintAdmin(token, { env, now: NOW, fetchImpl, ...overrides })

test('denies every admin request when authentication is not configured', async () => {
  assert.equal(readAdminConfig({}), null)
  assert.equal(await verifyKomplyintAdmin(signJwt(), { env: {}, now: NOW, fetchImpl }), null)
  assert.equal(await verify(''), null)
  assert.equal(await verify('not-a-jwt'), null)
})
test('admits only an allowed email with signed token, exact team and audience', async () => {
  assert.deepEqual(await verify(signJwt()), { email: 'owner@example.invalid' })
  assert.equal(await verify(signJwt({ ...claims, email: 'outsider@example.invalid' })), null)
  assert.equal(await verify(signJwt({ ...claims, aud: 'other-app' })), null)
  assert.equal(await verify(signJwt({ ...claims, iss: 'https://other.cloudflareaccess.com' })), null)
})
test('rejects expired, future, forged and algorithm-confused JWTs', async () => {
  assert.equal(await verify(signJwt({ ...claims, exp: SEC - 1 })), null)
  assert.equal(await verify(signJwt({ ...claims, iat: SEC + 120 })), null)
  assert.equal(await verify(signJwt({ ...claims, nbf: SEC + 120 })), null)
  assert.equal(await verify(signJwt(claims, { alg: 'none', kid: 'unit-test-key' })), null)
  const original = signJwt().split('.')
  const forged = original[0] + '.' + b64({ ...claims, email: 'owner@example.invalid', exp: SEC + 7200 }) + '.' + original[2]
  assert.equal(await verify(forged), null)
  assert.equal(await verify(signJwt(), { fetchImpl: async () => ({ ok: false }) }), null)
})
test('does not trust spoofed team names or wildcard admin configuration', () => {
  assert.equal(readAdminConfig({ ...env, KOMPLYINT_ACCESS_TEAM_DOMAIN: 'evil.com/?url=cloudflareaccess.com' }), null)
  assert.equal(readAdminConfig({ ...env, KOMPLYINT_ADMIN_EMAILS: '*' }), null)
})
test('only emits explicitly allowlisted HTTPS tool destinations, never tokenized URLs', () => {
  const tools = komplyintAdminTools(env)
  assert.equal(tools.length, 6)
  assert.equal(tools.find(t => t.id === 'business').href, 'https://ops.komplyint.fi/')
  assert.equal(tools.find(t => t.id === 'orders').href, 'https://operator.tinyerg.com/operator/')
  assert.equal(tools.find(t => t.id === 'media').href, null)
  assert.equal(komplyintAdminTools({ ...env, KOMPLYINT_ADMIN_BUSINESS_OS_URL: 'https://ops.komplyint.fi/?token=abc' })[0].href, null)
  assert.equal(komplyintAdminTools({ ...env, KOMPLYINT_ADMIN_BUSINESS_OS_URL: 'https://attacker.invalid/' })[0].href, null)
  assert.equal(komplyintAdminTools({ ...env, KOMPLYINT_ADMIN_BUSINESS_OS_URL: 'http://ops.komplyint.fi/' })[0].href, null)
})

test('the private /admin page performs server-side verification before rendering any tools', () => {
  const page = readFileSync(new URL('../src/app/admin/page.tsx', import.meta.url), 'utf8')
  const home = readFileSync(new URL('../src/app/page.tsx', import.meta.url), 'utf8')
  assert.match(page, /verifyKomplyintAdmin\(headers\(\)\.get\('cf-access-jwt-assertion'\)/)
  assert.match(page, /if \(!principal\) notFound\(\)/)
  assert.match(page, /dynamic = 'force-dynamic'/)
  assert.match(page, /robots: \{ index: false, follow: false/)
  assert.doesNotMatch(home, /\/admin(?:\/|['"])/)
})
