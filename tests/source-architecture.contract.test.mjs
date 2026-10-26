import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'

// E02/C20: enforce reuse of the real component library instead of duplicating
// feature/film/graphic JSX in the monolithic public routing component.
const page=readFileSync('src/app/page.tsx','utf8')
const names=['Arrow','FeaturedWork','PublicBrochures','ServiceCard','VideoHero','SectionIntro','ServiceExplorer']
for(const name of names){
  test(name+' is extracted and imported by the public app',()=>{
    assert.equal(existsSync('src/components/'+name+'.tsx'),true)
    assert.match(page,new RegExp("import "+name+" from "))
    assert.doesNotMatch(page,new RegExp('function '+name+'\\('))
  })
}
test('site route mapping is centralized',()=>{
  assert.match(page,/import \{ pathFor \} from '@\/lib\/site-route'/)
  assert.doesNotMatch(page,/function pathFor\(/)
})
test('the preserved hero controls still stay in one source component',()=>{
  const hero=readFileSync('src/components/VideoHero.tsx','utf8')
  assert.match(hero,/prefers-reduced-motion/)
  assert.match(hero,/onClick=\{toggle\}/)
  assert.match(hero,/hero-optimized\.mp4/)
  assert.match(hero,/hero-mobile\.mp4/)
  assert.match(hero,/hero\.mp4/)
  assert.match(hero,/komplyint-video-paused/)
})

test('E02 marketing sections are extracted without a second render engine',()=>{
  const sections=readFileSync('src/components/MarketingSections.tsx','utf8')
  assert.match(page,/import \{ Process, Trust, About, CTA \} from '@\/components\/MarketingSections'/)
  for(const name of ['Process','Trust','About','CTA']){
    assert.match(sections,new RegExp('export function '+name+'\\('))
    assert.doesNotMatch(page,new RegExp('function '+name+'\\('))
  }
})
