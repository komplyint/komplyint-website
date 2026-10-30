import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'

const read=path=>readFileSync(path,'utf8')

test('existing 3 work examples remain and a second software row contains exactly 3 additional examples in every locale',()=>{
 const fiEn=read('src/lib/commercial.ts'),sv=read('src/lib/i18n-sv.ts'),page=read('src/app/page.tsx')
 for(const locale of ['fi','en']){
   assert.ok(fiEn.includes(locale==='fi'?'Julkaisua edeltävä ohjelmistotestaus':'Test software before a release'))
 }
 for(const name of ['Rätta fel och vidareutveckla en applikation','Få en systemintegration att fungera bättre','Testa programvaran före en ny version'])assert.ok(sv.includes(name))
 for(const num of ['04','05','06'])assert.ok(fiEn.includes("num:'"+num+"'")||fiEn.includes("num: '"+num+"'"))
 assert.ok(page.includes('id="data-examples"'))
 assert.ok(page.includes('id="software-examples"'))
 assert.ok(page.includes('t.cases.map'))
 assert.ok(page.includes('t.softwareCases.map'))
 assert.ok(page.includes('WorkExampleArt index={i+3}'))
})

test('all six examples receive distinct editable SVG compositions',()=>{
 const art=read('src/components/WorkExampleArt.tsx')
 for(let n=0;n<6;n++)assert.ok(art.includes('index==='+n),'Missing illustration '+n)
 assert.ok(art.includes('viewBox="0 0 420 152"'))
 assert.ok(art.includes('aria-hidden="true"'))
})

test('homepage, services and software pages link to the new examples',()=>{
 const page=read('src/app/page.tsx'),featured=read('src/components/FeaturedWork.tsx'),bridge=read('src/components/WorkExamplesBridge.tsx'),copy=read('src/lib/commercial.ts')
 assert.ok(featured.includes('<EnterpriseHeroVisual lang={lang}/>'),'Homepage integration demo now belongs in the software feature below the hero')
 assert.ok(page.includes('<EnterpriseEngineeringVisual lang={lang}/>'),'The engineering visual remains on the software service page')
 assert.ok(featured.includes("'#software-examples'"))
 assert.ok(featured.includes("'#data-examples'"))
 assert.ok(page.includes("import WorkExamplesBridge"))
 assert.equal(page.split('<WorkExamplesBridge lang={lang}/>').length-1,2)
 assert.ok(bridge.includes("base+'#software-examples'"))
 assert.ok(bridge.includes("base+'#data-examples'"))
 assert.ok(copy.includes("'services', 'software', 'work', 'about', 'contact'"))
})

test('broader company, services, contact and metadata retain native FI EN SV and do not invent real client references',()=>{
 const i18n=read('src/lib/i18n-ui.ts'),fiEn=read('src/lib/commercial.ts'),sv=read('src/lib/i18n-sv.ts'),seo=read('src/lib/route-meta.ts')
 for(const text of ['Ohjelmistokehitystä ja digipalveluja yrityksille.','Software engineering and digital services for business.','Programutveckling och digitala tjänster för företag.'])assert.ok(i18n.includes(text))
 for(const title of ['Ohjelmistokehitystä, testausta ja datapalveluja','Software engineering, testing and data services'])assert.ok(fiEn.includes(title))
 assert.ok(sv.includes('Programutveckling, testning och datatjänster'))
 assert.ok(seo.includes('Six illustrative scenarios'))
 assert.ok(seo.includes('Kuusi kuvitteellista esimerkkiä'))
 assert.ok(fiEn.includes('Esimerkit ovat kuvitteellisia'))
 assert.ok(fiEn.includes('do not represent completed client projects'))
 assert.ok(sv.includes('Exemplen är fiktiva'))
})

test('approved dark palette, PDF/ZIP availability and hero media are unchanged',()=>{
 const colors=JSON.parse(read('src/design/tokens.json','utf8')).colors.dark
 assert.equal(colors.page,'#101418');assert.equal(colors.red,'#C74C57');assert.equal(colors.action,'#A4DDBA')
 const page=read('src/app/page.tsx'),css=read('src/app/handbook.css')
 assert.ok(page.includes('<VideoHero lang={lang}/>'))
 assert.ok(page.includes('<PublicBrochures lang={lang}/>'))
 assert.ok(css.includes('Work examples: paired data and software stories'))
 assert.ok(!page.includes('kc-hero-engineering-years'))
})
