import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'

const global=readFileSync('src/app/globals.css','utf8')
const feature=readFileSync('src/app/handbook.css','utf8')
const commercial=readFileSync('src/app/commercial.css','utf8')

test('the global stylesheet contains only framework reset and document primitives',()=>{
  assert.match(global,/@tailwind base;/)
  for(const orphan of ['.hero-video','.bg-blue-card','.hero-reveal','.contact-form','.footer-company','.main-nav','.lang-toggle','.container']){
    assert.equal(global.includes(orphan),false,'legacy global collision still present: '+orphan)
  }
  assert.doesNotMatch(global,/\bsection\s*\{\s*padding/)
})
test('public design components remain scoped and original motion is still accessible',()=>{
  assert.match(feature,/\.kc-hero/)
  assert.match(feature,/\.qh-work-art/)
  assert.match(commercial,/\.kc-service-tile/)
  assert.match(feature,/prefers-reduced-motion/)
})
