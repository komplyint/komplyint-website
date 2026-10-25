import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync,existsSync} from 'node:fs'

const load=p=>readFileSync(p,'utf8')
const locale=load('src/lib/i18n.ts')
const content=load('src/lib/commercial.ts')
const sv=load('src/lib/i18n-sv.ts')
const labels=load('src/lib/i18n-ui.ts')
const route=load('src/lib/route-meta.ts')
const sitemap=load('src/app/sitemap.ts')
test('FI/EN/SV routes and SEO are not implemented by client text replacement',()=>{
  assert.match(locale,/\['fi','en','sv'\]/)
  assert.match(locale,/localizedPath/)
  assert.match(content,/sv:\s*svServices/)
  assert.match(content,/sv:\s*svContent/)
  assert.match(route,/sv:/)
  assert.match(route,/x-default/)
  assert.match(sitemap,/languages\.map/)
  for(const suffix of ['/page.tsx','/services/page.tsx','/services/[slug]/page.tsx','/software/page.tsx','/work/page.tsx','/about/page.tsx','/contact/page.tsx','/privacy/page.tsx','/accessibility/page.tsx']){
    assert.ok(existsSync('src/app/sv'+suffix),'Missing Swedish route: '+suffix)
  }
})
test('Swedish catalogue includes six translated services and privacy content',()=>{
  for(const phrase of ['Excel, data och rapportering','Microsoft 365 och automatisering','Webbplatser och underhåll','Mindre programvaror och integrationer','Programvarutestning och kvalitetssäkring','Digitalt kontorsstöd','Personuppgiftsansvarig']){
    assert.ok(sv.includes(phrase),'Swedish translation missing: '+phrase)
  }
  assert.ok(labels.includes("Svenska")===false,'Language names must come from the single locale config')
  for(const field of ['languageSwitcher','localeDraftWarning','serviceDetailLink','accessibility','video','form','serviceDetail']){
    assert.ok(labels.includes(field),'Missing UI translation category '+field)
  }
})
test('flags are explicit and adjacent to accessible native language names',()=>{
  const component=load('src/components/LanguageSwitcher.tsx')
  assert.match(locale,/🇫🇮/)
  assert.match(locale,/🇬🇧/)
  assert.match(locale,/🇸🇪/)
  assert.match(component,/language\.flag/)
  assert.match(component,/language\.name/)
  assert.match(component,/hrefLang/)
  assert.match(component,/aria-current/)
  assert.match(component,/localeDraftWarning/)
})
