import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
const read=p=>readFileSync(p,'utf8')

test('the project-based full-stack specialist and all core stack technologies are prominently present',()=>{
 const copy=read('src/lib/commercial.ts'),component=read('src/components/ExpertiseSpotlight.tsx'),page=read('src/app/page.tsx')
 for(const term of ['TypeScript','JavaScript','Node.js','React','Angular','Vue.js','C# / .NET','REST APIs','Azure Functions','Kafka','Docker'])assert.ok(copy.includes(term),'Missing '+term)
 assert.match(copy,/5\+ years/)
 assert.ok(page.includes('<ExpertiseSpotlight lang={lang}/>'))
 assert.ok(page.includes('kc-hero-engineering-years'))
 assert.ok(component.includes('c.stack.map('))
 assert.ok(component.includes('c.fullstackLanguage'))
 assert.ok(component.includes('c.dataLanguage'))
})

test('actual delivery language is not incorrectly inferred from the website translation',()=>{
 const copy=read('src/lib/commercial.ts')
 for(const phrase of ['Tekninen työskentelykieli: englanti','Technical working language: English','Arbetsspråket för den tekniska utvecklingen är engelska','suomeksi','Finnish and English'])assert.ok(copy.includes(phrase),phrase)
 assert.ok(copy.includes('Specialist availability'))
 assert.ok(!copy.includes('full-time employee'))
})

test('the homepage provides direct downloadable PDF and ZIP files, not fake CTA buttons',()=>{
 const component=read('src/components/ExpertiseSpotlight.tsx'),page=read('src/app/page.tsx'),brochures=read('src/components/PublicBrochures.tsx')
 assert.ok(component.includes('download={c.pdfName}'))
 assert.ok(component.includes('download="Komplyint_Service_Documents.zip"'))
 assert.ok(page.includes('spotlightCopy[lang].pdfFile'))
 assert.ok(brochures.includes('Komplyint_Service_Documents.zip'))
 const config=read('next.config.js')
 assert.ok(config.includes("Content-Disposition"))
 assert.ok(config.includes('application/zip'))
})

test('the existing approved charcoal / green / red token values are unchanged',()=>{
 const t=JSON.parse(read('src/design/tokens.json','utf8'))
 assert.equal(t.colors.dark.page,'#101418')
 assert.equal(t.colors.dark.red,'#C74C57')
 assert.equal(t.colors.dark.action,'#A4DDBA')
 assert.ok(read('src/app/handbook.css').includes('Full-stack capability showcase'))
})

test('PDF generation reuses website copy, includes the prominently featured skills and checks all 24 pages',()=>{
 const exporter=read('scripts/export-public-portfolio.mjs'),renderer=read('scripts/generate_public_portfolio.py'),verify=read('scripts/verify_public_brochures.py')
 assert.ok(exporter.includes('capabilities:spotlightCopy[lang]'))
 assert.ok(renderer.includes('engineering_page(cv,t)'))
 assert.ok(renderer.includes("'pages':24"))
 assert.ok(verify.includes('len(document) != 8'))
})
