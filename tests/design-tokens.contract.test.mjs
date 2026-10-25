import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'
const tokens=JSON.parse(readFileSync('src/design/tokens.json','utf8'))
const css=readFileSync('src/app/handbook.css','utf8')
test('all handbook-approved light/dark color tokens have synchronized CSS definitions',()=>{
  assert.equal(tokens.version,'1.2.0')
  assert.deepEqual(tokens.specification_ids,['F09','F10','F12','F13','E03'])
  for(const theme of ['light','dark']){
    const block=css.slice(css.indexOf(theme==='light'?'.kc-root{\n--ki-color-page':'.dark .kc-root{\n--ki-color-page'))
    assert.ok(block.length>200,theme+' design block missing')
    for(const [name,value] of Object.entries(tokens.colors[theme])){
      assert.ok(block.includes('--ki-color-'+name+':'+value+';'),theme+': missing or stale '+name)
    }
  }
  for(const [name,value] of Object.entries(tokens.shadows)){
    assert.ok(css.includes('--ki-shadow-'+name.toLowerCase()+':'+value+';'))
  }
})
test('component theme values resolve from semantic tokens rather than duplicated palette literals',()=>{
  assert.match(css,/--kc-bg:var\(--ki-color-page\)/)
  assert.match(css,/--kc-teal:var\(--ki-color-action\)/)
  assert.match(css,/--kc-surface:var\(--ki-color-panel\)/)
  assert.match(css,/--ki-shadow-e2/)
  assert.match(css,/--ki-color-focus/)
})

test('charcoal is the structural neutral; green and red remain limited identity accents',()=>{
  assert.equal(tokens.art_direction.name,'Charcoal Precision')
  assert.equal(tokens.colors.light.page,'#F7F6F2')
  assert.equal(tokens.colors.dark.page,'#101418')
  assert.equal(tokens.colors.light.deep,'#101418')
  assert.equal(tokens.colors.light.action,'#124C35')
  assert.equal(tokens.colors.light.red,'#C74C57')
  for(const section of ['.kc-header{background:#101418','.kc-hero-copy{background:rgba(15,20,23,.95)','.kc-process{background:#1A2024','.qh-featured-work{background:#131A1E','.kc-cta{background:#101418','.kc-footer{background:#0B0F12']){
    assert.ok(css.includes(section),'missing charcoal application: '+section)
  }
  assert.match(css,/\.kc-hero \.kc-hero-copy\{background:#151B1F\}/,'mobile hero must not revert to forest green')
})
