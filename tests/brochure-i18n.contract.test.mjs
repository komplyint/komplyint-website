import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, statSync } from 'node:fs'

const data=JSON.parse(readFileSync('scripts/portfolio_sv.json','utf8'))
const generator=readFileSync('scripts/generate_public_portfolio.py','utf8')
const brochure=readFileSync('src/components/PublicBrochures.tsx','utf8')
const translations=readFileSync('src/lib/i18n-ui.ts','utf8')
const workflow=readFileSync('.github/workflows/build-public-brochures.yml','utf8')
test('the original reviewed ReportLab renderer covers all six Swedish service areas',()=>{
  assert.equal(data.services.length,6)
  assert.equal(data.steps.length,4)
  assert.match(data.title,/Digitala tjänster/)
  assert.match(data.note,/inte rådgivning om regelefterlevnad/)
  assert.match(generator,/D\['sv'\]/)
  assert.match(generator,/build\("sv",sv\)/)
  assert.match(generator,/assert len\(\[f for f in z.namelist\(\) if f.endswith\("\.pdf"\)\]\)==3/)
})
test('website always links all three PDF formats and a shared ZIP',()=>{
  for(const name of ['Komplyint_Palveluesite_FI.pdf','Komplyint_Service_Portfolio_EN.pdf','Komplyint_Tjanstebroschyr_SV.pdf','Komplyint_Service_Documents.zip'])assert.ok(brochure.includes(name),name)
  assert.match(translations,/Alla tjänstebroschyrer/)
  assert.match(translations,/All service brochures/)
  assert.match(translations,/Kaikki palveluesitteet/)
})
test('download builder uses main and a verifiable ZIP, never the retired feature branch',()=>{
  assert.match(workflow,/branches: \[main\]/)
  assert.match(workflow,/git push origin HEAD:main/)
  assert.match(workflow,/PdfReader/)
  assert.match(workflow,/document-preview/)
  assert.doesNotMatch(workflow,/feature\/handbook-quiet-precision/)
})

test('generated FI/EN/SV PDFs are committed, non-placeholder and included by name in the ZIP',()=>{
  const names=['Komplyint_Palveluesite_FI.pdf','Komplyint_Service_Portfolio_EN.pdf','Komplyint_Tjanstebroschyr_SV.pdf']
  const archive=readFileSync('public/downloads/Komplyint_Service_Documents.zip')
  assert.ok(archive.length>100000,'Combined ZIP must contain full PDF payloads')
  assert.equal(archive.subarray(0,2).toString(),'PK','ZIP container signature')
  for(const name of names){
    const path='public/downloads/'+name
    const bytes=readFileSync(path)
    assert.ok(statSync(path).size>50000,name+' must be a complete six-page document')
    assert.equal(bytes.subarray(0,5).toString(),'%PDF-',name+' is not PDF')
    assert.ok(bytes.subarray(Math.max(0,bytes.length-2048)).includes(Buffer.from('%%EOF')),name+' missing PDF end-of-file signature')
    assert.ok(archive.includes(Buffer.from(name)),name+' is not present inside the ZIP')
  }
})
