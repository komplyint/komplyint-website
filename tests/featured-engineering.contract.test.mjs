import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
const read=p=>readFileSync(p,'utf8')

test('the floating experience badge is removed from the hero',()=>{
 const page=read('src/app/page.tsx'),hero=read('src/lib/commercial.ts')
 assert.ok(!page.includes('kc-hero-engineering'))
 assert.ok(!page.includes('spotlightCopy[lang].heroYears'))
 for(const phrase of ['Yli 5 vuotta','5+ years','Över 5 år'])assert.ok(!hero.includes(phrase),phrase)
 assert.ok(page.includes('<VideoHero lang={lang}/>'))
})

test('customer challenges replace the technology skill wall',()=>{
 const copy=read('src/lib/commercial.ts'),component=read('src/components/ExpertiseSpotlight.tsx')
 for(const word of ['Vanhaa sovellusta on vaikea kehittää','Järjestelmien väliset tiedot eivät kulje','Testaus hidastaa julkaisua','Existing applications are hard to maintain','Testningen fördröjer publiceringen'])assert.ok(copy.includes(word),word)
 assert.ok(component.includes('c.problems.map('))
 assert.ok(component.includes('item.problem'))
 assert.ok(component.includes('item.solution'))
 assert.ok(component.includes('item.outcome'))
 assert.ok(!component.includes('c.stack.map('),'technologies cannot lead the sales story')
})

test('real iterative delivery and QA are explained without claiming Scrum certification or client projects',()=>{
 const copy=read('src/lib/commercial.ts'),component=read('src/components/ExpertiseSpotlight.tsx')
 for(const phrase of ['KETTERÄ YHTEISTYÖ','AGILE COLLABORATION','AGILT SAMARBETE','koodikatselmointeihin','acceptance criteria','testitapauksia'])assert.ok(copy.includes(phrase),phrase)
 assert.ok(component.includes('c.deliverySteps.map('))
 assert.ok(copy.includes('not claims that Komplyint Oy has delivered'))
})

test('languages do not misrepresent the business lead as an experienced web developer',()=>{
 const copy=read('src/lib/commercial.ts'),sv=read('src/lib/i18n-sv.ts')
 for(const phrase of ['Ohjelmistokehityksen tekninen työskentelykieli on englanti','Technical working language for software engineering: English','Arbetsspråk för programutveckling är engelska'])assert.ok(copy.includes(phrase))
 assert.ok(sv.includes('Det tekniska arbetsspråket är engelska'))
 assert.ok(!copy.includes('Finnish for HTML, CSS and limited JavaScript'))
 assert.ok(!copy.includes('pienet JavaScript-verkkosivutyöt onnistuvat suomeksi'))
})

test('existing palette and real PDF and ZIP links stay intact',()=>{
 const page=read('src/app/page.tsx'),component=read('src/components/ExpertiseSpotlight.tsx')
 const colors=JSON.parse(read('src/design/tokens.json','utf8')).colors.dark
 assert.equal(colors.page,'#101418');assert.equal(colors.red,'#C74C57');assert.equal(colors.action,'#A4DDBA')
 assert.ok(component.includes('download={c.pdfName}'))
 assert.ok(component.includes('download="Komplyint_Service_Documents.zip"'))
 assert.ok(page.includes('spotlightCopy[lang].pdfFile'))
 assert.ok(read('next.config.js').includes('Content-Disposition'))
})

test('all three brochures include four case stories rather than an experience badge',()=>{
 const exporter=read('scripts/export-public-portfolio.mjs'),pdf=read('scripts/generate_public_portfolio.py'),verify=read('scripts/verify_public_brochures.py'),parity=read('scripts/verify_portfolio_copy.py')
 assert.ok(exporter.includes('capabilities:spotlightCopy[lang]'))
 assert.ok(pdf.includes("for i,case in enumerate(v['problems'])"))
 assert.ok(!pdf.includes("feature['heroYears']"))
 assert.ok(parity.includes("expected four research-grounded customer challenges"))
 assert.ok(verify.includes('len(document) != 8'))
})
