import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync, existsSync} from 'node:fs'

const read=path=>readFileSync(path,'utf8')
const home=read('src/app/page.tsx')
const visuals=read('src/components/EnterpriseVisuals.tsx')
const features=read('src/components/FeaturedWork.tsx')
const css=read('src/app/enterprise.css')

test('enterprise assets are real accessible HTML and SVG, not decorative screenshots alone',()=>{
  for(const symbol of ['EnterpriseHeroVisual','EnterpriseReportingVisual','EnterpriseEngineeringVisual'])assert.ok(visuals.includes('function '+symbol))
  assert.match(visuals,/onClick=\{\(\)=>execute\(false\)\}/)
  assert.match(visuals,/onClick=\{\(\)=>execute\(true\)\}/)
  assert.match(visuals,/onClick=\{\(\)=>setPeriod\('H1'\)\}/)
  assert.match(visuals,/onClick=\{\(\)=>setPeriod\('H2'\)\}/)
  assert.match(visuals,/aria-live="polite"/)
  assert.match(visuals,/aria-pressed=\{period==='H1'\}/)
  assert.match(visuals,/svg viewBox="0 0 660 226"/)
  assert.match(visuals,/values\.reduce\(/)
})

test('each meaningful visual is localized and transparently labels synthetic evidence',()=>{
  for(const phrase of ['Paikallinen simulaatio','Local simulation','Lokal simulering','synteettisellä aineistolla','synthetic data','syntetiska uppgifter'])assert.ok(visuals.includes(phrase),phrase)
  for(const phrase of ['EI ASIAKASTYÖ','NOT CLIENT WORK','INTE KUNDARBETE'])assert.ok(visuals.includes(phrase),phrase)
  assert.ok(!visuals.includes('trusted by'))
  assert.ok(!visuals.includes('client success rate'))
})

test('homepage preserves original video and buyer routes while prioritising engineering, QA and data',()=>{
  for(const fragment of ['<VideoHero lang={lang}/>','([3,4,0,1,2,5] as const).map','<ExpertiseSpotlight lang={lang}/>'])assert.ok(home.includes(fragment),fragment)
  const homepage=home.slice(home.indexOf('function Home('),home.indexOf('function Examples('))
  assert.ok(!homepage.includes('<EnterpriseHeroVisual lang={lang}/>'),'No interactive console may obscure the cinematic homepage hero')
  assert.match(features,/<EnterpriseHeroVisual lang=\{lang\}\/>/,'The same interactive component must be placed inside the software case study')
  assert.match(features,/<EnterpriseReportingVisual lang=\{lang\}\/>/)
  assert.match(home,/<EnterpriseEngineeringVisual lang=\{lang\}\/>/,'Engineering illustration remains on the dedicated software page')
  assert.match(home,/ev-work-demo-grid/)
  assert.match(home,/ev-software-story/)
})

test('owner-approved privacy: no named staff cards or individual biographies in website source',()=>{
  assert.ok(!home.includes('DeliveryProfiles'),'Public routes must not mount the personal profiles')
  assert.equal(existsSync('src/components/DeliveryProfiles.tsx'),false,'Former named-profile module must not ship in source')
  for(const file of ['src/app/page.tsx','src/lib/commercial.ts','src/lib/i18n-sv.ts','src/lib/i18n-ui.ts','src/components/FeaturedWork.tsx']){
    assert.doesNotMatch(read(file),/Valentine Idi|Vitus Idi|Valentine osallistuu|Vitus auttaa|Valentine contributes|Vitus supports/i,file+' must remain company-facing')
  }
})

test('new typography is locally licensed and the site opens dark without overriding an explicit light choice',()=>{
  const pkg=JSON.parse(read('package.json'))
  const layout=read('src/app/layout.tsx')
  assert.equal(pkg.dependencies['@fontsource/manrope'],'5.3.0')
  assert.ok(layout.includes("@fontsource/manrope/latin-ext-700.css"))
  assert.ok(layout.includes("import './enterprise.css'"))
  assert.ok(layout.includes("localStorage.getItem('komplyint-theme')||'dark'"))
  assert.ok(home.includes("useState<'dark'|'light'|'system'>('dark')"))
  assert.match(css,/prefers-reduced-motion:reduce/)
  assert.match(css,/grid-template-columns:repeat\(3,minmax\(0,1fr\)\)/)
  assert.match(css,/font-enterprise/)
  assert.match(css,/--font-editorial:"EB Garamond"/)
  assert.match(css,/\.kc-root \.kc-hero h1 \{font-size:clamp\(38px,3\.4vw,48px\)/)
  assert.match(css,/\.kc-root \.qh-feature-software-art \.ev-hero-visual/)
  assert.match(read('src/app/delivery-lab.css'),/font:400 clamp\(34px,3\.4vw,48px\)\/1\.15 var\(--font-editorial\)/)
  const palettes=JSON.parse(read('src/design/tokens.json'))
  assert.equal(palettes.colors.dark.page,'#101418')
  assert.equal(palettes.colors.light.page,'#F7F6F2')
})
