import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8')
const catalog=read('src/lib/business-offers.ts')
const page=read('src/app/page.tsx')
const demos=read('src/components/BusinessDemos.tsx')
const solutions=read('src/components/BusinessServiceCatalogue.tsx')
const css=read('src/app/business-solutions.css')
const layout=read('src/app/layout.tsx')

test('all 27 business offerings and six packages are available with native FI/EN/SV names',()=>{
  const source=catalog.split('export const businessServices:')[1].split('export const businessPackages:')[0]
  assert.equal((source.match(/\{ id: '[^']+', area: /g)||[]).length,27)
  assert.equal((source.match(/name: \{ fi: /g)||[]).length,27)
  const packages=catalog.split('export const businessPackages:')[1].split('export const platformGroups')[0]
  assert.equal((packages.match(/\{ id: '/g)||[]).length,6)
  assert.equal((packages.match(/name: \{ fi: /g)||[]).length,6)
})
test('Microsoft and non-Microsoft platforms are discoverable and qualified by delivery scope',()=>{
  for(const name of ['Power BI','Power Automate','Power Apps','SharePoint','Visio','Microsoft','Jira','Confluence','n8n','HubSpot','Looker Studio','Google Sheets'])assert.ok(catalog.includes(name),name)
  for(const lang of ['fi','en','sv'])assert.ok(catalog.includes(lang+': {'),lang)
  assert.match(solutions,/setArea/)
  assert.match(solutions,/setQuery/)
  assert.match(solutions,/t.scope/)
})
test('public page integration does not disrupt hero video or existing delivery lab',()=>{
  assert.match(page,/<BusinessServiceCatalogue lang=\{lang\}\/>/)
  assert.match(page,/<BusinessDemos lang=\{lang\}\/>/)
  assert.match(page,/<DeliveryLab lang=\{lang\}\/>/)
  assert.match(page,/<VideoHero lang=\{lang\}\/>/)
  assert.match(layout,/import '\.\/business-solutions.css'/)
})
test('demonstrations are interactive local fictional cases, not customer claims',()=>{
  for(const control of ['setYear','setDepartment','setSearch','setRequests','addRequest','decide','setDemo'])assert.ok(demos.includes(control),control)
  for(const required of ['All information is fictional','Kaikki tiedot ovat kuvitteellisia','Alla uppgifter är fiktiva','DEMO · SYNTHETIC'])assert.ok(demos.includes(required),required)
  assert.doesNotMatch(demos,/fetch\s*\(|XMLHttpRequest|localStorage|sessionStorage|navigator\.sendBeacon/i)
  assert.match(demos,/status==='approved'/)
  assert.match(demos,/pendingCount/)
})
test('new visual layer supports responsive, focus-visible and reduced motion',()=>{
  assert.match(css,/@media\(max-width:720px\)/)
  assert.match(css,/:focus-visible/)
  assert.match(css, /prefers-reduced-motion/)
  assert.match(css,/--kc-bg/)
})
