import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, statSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'

const generator=readFileSync('scripts/generate_public_portfolio.py','utf8')
const exporter=readFileSync('scripts/export-public-portfolio.mjs','utf8')
const brochure=readFileSync('src/components/PublicBrochures.tsx','utf8')
const translations=readFileSync('src/lib/i18n-ui.ts','utf8')
const workflow=readFileSync('.github/workflows/build-public-brochures.yml','utf8')

test('brochure copy is compiled from actual website dictionaries in all three languages',()=>{
  const folder=mkdtempSync(join(tmpdir(),'komplyint-copy-test-'))
  try {
    const path=join(folder,'portfolio.json')
    const result=spawnSync(process.execPath,['scripts/export-public-portfolio.mjs',path],{encoding:'utf8',timeout:60000})
    assert.equal(result.status,0,result.stderr || result.stdout)
    const data=JSON.parse(readFileSync(path,'utf8'))
    assert.equal(data.schema,'komplyint-public-portfolio.v2')
    assert.deepEqual(Object.keys(data.locales),['fi','en','sv'])
    assert.equal(Object.keys(data.sourceHashes).length,4)
    for(const [lang,copy] of Object.entries(data.locales)){
      assert.equal(copy.services.length,6,lang)
      assert.equal(copy.steps.length,4,lang)
      assert.equal(copy.serviceUrls.length,6,lang)
      assert.ok(copy.businessIdLine.includes('3588595-3'))
      assert.equal(copy.email,'info@komplyint.fi')
      for(const service of copy.services){
        assert.equal(service.length,5)
        assert.equal(service[2].length,3)
        assert.ok(service.every(value=>Array.isArray(value)?value.every(v=>typeof v==='string'&&v.length>0):typeof value==='string'&&value.length>0))
      }
    }
    assert.equal(data.locales.fi.serviceLabel,'PALVELU')
    assert.equal(data.locales.sv.serviceLabel,'TJ\u00c4NST')
    assert.equal(data.locales.sv.language,'sv-FI')
  }finally{rmSync(folder,{recursive:true,force:true})}
})

test('the original six-page renderer rejects stale copy and has no parallel Swedish catalogue',()=>{
  assert.match(generator,/sourceHashes/)
  assert.match(generator,/Stale brochure source/)
  assert.doesNotMatch(generator,/portfolio_sv\.json/)
  assert.match(generator,/invariant=1/)
  assert.match(exporter,/services\[lang\]\.map/)
  assert.match(exporter,/t\.process\.steps\.map/)
})

test('website always links all three PDF formats and a shared ZIP',()=>{
  for(const name of ['Komplyint_Palveluesite_FI.pdf','Komplyint_Service_Portfolio_EN.pdf','Komplyint_Tjanstebroschyr_SV.pdf','Komplyint_Service_Documents.zip'])assert.ok(brochure.includes(name),name)
  for(const label of ['Alla tj\u00e4nstebroschyrer','All service brochures','Kaikki palveluesitteet'])assert.ok(translations.includes(label))
})

test('copy edits rebuild and verify brochures before publishing to main',()=>{
  for(const path of ['src/lib/commercial.ts','src/lib/i18n-sv.ts','src/lib/i18n-ui.ts','scripts/export-public-portfolio.mjs','scripts/verify_portfolio_copy.py'])assert.ok(workflow.includes(path),path)
  assert.match(workflow,/branches: \[main\]/)
  assert.match(workflow,/git push origin HEAD:main/)
  assert.match(workflow,/verify_public_brochures\.py/)
  assert.match(workflow,/document-preview/)
  assert.doesNotMatch(workflow,/feature\/handbook-quiet-precision/)
})

test('committed FI/EN/SV PDFs and ZIP remain complete, real downloadable files',()=>{
  const names=['Komplyint_Palveluesite_FI.pdf','Komplyint_Service_Portfolio_EN.pdf','Komplyint_Tjanstebroschyr_SV.pdf']
  const archive=readFileSync('public/downloads/Komplyint_Service_Documents.zip')
  assert.ok(archive.length>100000)
  assert.equal(archive.subarray(0,2).toString(),'PK')
  for(const name of names){
    const path='public/downloads/'+name, bytes=readFileSync(path)
    assert.ok(statSync(path).size>50000,name)
    assert.equal(bytes.subarray(0,5).toString(),'%PDF-')
    assert.ok(bytes.subarray(Math.max(0,bytes.length-2048)).includes(Buffer.from('%%EOF')))
    assert.ok(archive.includes(Buffer.from(name)))
  }
})
