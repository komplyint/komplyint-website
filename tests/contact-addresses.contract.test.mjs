import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const inventory = readFileSync('src/lib/contact-addresses.ts', 'utf8')
const links = readFileSync('src/components/ContactAddressLinks.tsx', 'utf8')
const website = readFileSync('src/app/page.tsx', 'utf8')
const contactRoute = readFileSync('src/app/api/contact/route.ts', 'utf8')

test('exactly 15 unique registered Zoho Mail aliases share a single primary mailbox', () => {
  const section = inventory.match(/export const zohoAliases = \{([\s\S]*?)\n\} as const/)
  assert.ok(section, 'expected canonical aliases register')
  const aliases = [...section[1].matchAll(/'([a-z]+@komplyint\.fi)'/g)].map(match => match[1])
  assert.equal(aliases.length, 15)
  assert.equal(new Set(aliases).size, 15)
  assert.match(inventory, /primaryZohoMailbox = 'komplyint@komplyint\.fi'/)
  for (const alias of ['tarjous', 'proposals', 'sales', 'info', 'contacts', 'hello',
    'hakemus', 'apply', 'careers', 'laskutus', 'invoices', 'compliance', 'legal', 'delivery', 'support']) {
    assert.ok(aliases.includes(alias + '@komplyint.fi'), 'missing verified alias: ' + alias)
  }
})

test('public FI EN SV contact directory reuses canonical aliases and existing contact panel', () => {
  assert.match(inventory, /contactChannelsTitle: Localized/)
  for (const locale of ['fi', 'en', 'sv']) {
    assert.match(inventory, new RegExp(locale + ':'))
  }
  assert.match(website, /import ContactAddressLinks from '@\/components\/ContactAddressLinks'/)
  assert.match(website, /<ContactAddressLinks lang=\{lang\}\/>/)
  assert.match(links, /websiteContactChannels\.map/)
  assert.match(links, /mailto:/)
  assert.doesNotMatch(links, /komplyint@gmail\.com/)
})

test('website form still targets the public general mailbox without leaking credentials', () => {
  assert.match(contactRoute, /const RECIPIENT = 'info@komplyint\.fi'/)
  assert.doesNotMatch(inventory, /password|private.key|smtp.gmail.com/i)
})
