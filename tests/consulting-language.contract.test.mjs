import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
const read=path=>readFileSync(path,'utf8')

test('six public service URLs retain explicit delivery-language notes across FI/EN/SV',()=>{
 const src=read('src/lib/commercial.ts')
 for(const slug of ['data-reporting','m365-automation','websites-maintenance','software-integrations','testing-qa','document-support'])assert.ok(src.includes(slug))
 for(const value of ['workingLanguages','consultingCopy','Finnish and English','Suomi ja englanti','Finska och engelska','Englanti (tekninen kehitys)','English technical delivery'])assert.ok(src.includes(value),value)
 const sv=read('src/lib/i18n-sv.ts')
 assert.ok(sv.includes('HTML-, CSS- och mindre JavaScript-ändringar på finska'))
 assert.ok(sv.includes('fullstackutveckling sker på engelska'))
})

test('engagement journeys reuse the website and retain Charcoal Precision tokens',()=>{
 const page=read('src/app/page.tsx'),card=read('src/components/ServiceCard.tsx'),detail=read('src/components/ServiceDetail.tsx'),css=read('src/app/handbook.css')
 assert.ok(page.includes('<ConsultingEngagement lang={lang}/>'))
 assert.ok(card.includes('workingLanguages[lang][index]'))
 assert.ok(detail.includes('workingLanguages[lang][index]'))
 assert.ok(css.includes('2026-10-29 consulting expansion'))
 const colors=JSON.parse(read('src/design/tokens.json','utf8')).colors.dark
 assert.equal(colors.page,'#101418');assert.equal(colors.red,'#C74C57');assert.equal(colors.action,'#A4DDBA')
})

test('contact records type of engagement and individual technical work language',()=>{
 const form=read('src/components/ContactForm.tsx'),api=read('src/app/api/contact/route.ts')
 for(const phrase of ['consulting.formLanguage','engagementType','workLanguage'])assert.ok(form.includes(phrase),phrase)
 for(const phrase of ['Technical work language','engagementType','workLanguage'])assert.ok(api.includes(phrase),phrase)
})

test('all three PDFs include consulting and language material in seven pages',()=>{
 const exp=read('scripts/export-public-portfolio.mjs'),pdf=read('scripts/generate_public_portfolio.py'),verify=read('scripts/verify_public_brochures.py')
 assert.ok(exp.includes('consulting:consultingCopy[lang]'))
 assert.ok(exp.includes('workingLanguages:workingLanguages[lang]'))
 assert.ok(pdf.includes('consulting_page(cv,t)'))
 assert.ok(pdf.includes('top(c,7,t)'))
 assert.ok(verify.includes('len(document) != 7'))
})
