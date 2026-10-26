import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

// F15-F18: reliable original human-designed fonts with reusable, licensed WOFF2 assets.
// Package versions and six font subset imports are pinned in the production source.
const pkg=JSON.parse(readFileSync('package.json','utf8'))
const layout=readFileSync('src/app/layout.tsx','utf8')
const css=readFileSync('src/app/handbook.css','utf8')
test('human-designed typography is locally bundled and builds without Google Fonts API',()=>{
 assert.equal(pkg.dependencies['@fontsource/lato'],'5.3.0')
 assert.equal(pkg.dependencies['@fontsource/eb-garamond'],'5.3.0')
 assert.doesNotMatch(layout,/next\/font\/google/)
 for(const family of ['lato','eb-garamond']){
  for(const subset of ['latin','latin-ext'])
   assert.ok(layout.includes(`@fontsource/${family}/${subset}-400.css`),`${family} ${subset} normal subset must be bundled`)
 }
 assert.match(layout,/@fontsource\/lato\/latin-700\.css/)
 assert.match(layout,/@fontsource\/lato\/latin-ext-700\.css/)
 assert.match(css,/--font-eb-garamond:"EB Garamond"/)
 assert.match(css,/--font-lato:"Lato"/)
 assert.ok(!layout.includes('fonts.googleapis.com'))
})
