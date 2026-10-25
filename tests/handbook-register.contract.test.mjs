import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'

const ledger=JSON.parse(readFileSync('docs/handbook-specification-units.json','utf8'))
const families={F:24,C:64,P:18,T:20,E:16,Q:22,R:6}
test('the actual 191-page handbook maps to 170 uniquely identified F/C/P/T/E/Q/R units',()=>{
  assert.equal(ledger.declared_specification_units,170)
  assert.equal(ledger.units.length,170)
  assert.equal(new Set(ledger.units.map(x=>x.id)).size,170)
  assert.equal(ledger.reference_pages,191)
  assert.equal(ledger.declared_acceptance_entries,1517)
  for(const [category,count] of Object.entries(families))assert.equal(ledger.units.filter(x=>x.id.startsWith(category)).length,count,category)
})
test('unreviewed acceptance is never represented as completed',()=>{
  for(const unit of ledger.units){
    assert.match(unit.id,/^[FCPT EQR]\d{2}$/)
    assert.ok(unit.title?.trim())
    assert.ok(Number.isInteger(unit.page)&&unit.page>=12&&unit.page<=191)
    assert.ok(['NOT_TESTED','PASS','FAIL','NOT_APPLICABLE'].includes(unit.verification))
    if(unit.verification==='PASS'){
      assert.ok(unit.signed_off_by,'A handbook PASS requires a named reviewer')
      assert.ok(unit.evidence?.length>0,'A handbook PASS requires reviewable evidence')
    }
    for(const p of unit.implementation_evidence||[])assert.ok(existsSync(p),'Missing recorded implementation source: '+p)
  }
})
test('a specification-unit register cannot be misrepresented as the 1,517-entry detailed acceptance ledger',()=>{
  assert.match(ledger.granularity,/NOT been imported/)
  assert.ok(ledger.units.length<ledger.declared_acceptance_entries)
})

const extraction=JSON.parse(readFileSync('docs/handbook-extraction-audit.json','utf8'))
test('the audited PDF source count is explicit and 35 unreconciled entries cannot disappear',()=>{
  assert.equal(extraction.schema_version,'handbook-extraction-audit.v1')
  assert.equal(extraction.source_page_count,191)
  assert.equal(extraction.declared_specification_units,170)
  assert.equal(extraction.declared_entries,1517)
  assert.equal(extraction.independently_extracted_table_rows,1257)
  assert.equal(extraction.independently_extracted_component_tests,JSON.parse(readFileSync('docs/handbook-component-acceptance.json','utf8')).tests.length)
  assert.equal(extraction.identifiable_entries,1482)
  assert.equal(extraction.identifiable_entries+extraction.source_entries_unmapped,1517)
  assert.equal(extraction.full_1517_item_ledger_committed,false)
  assert.equal(extraction.verification_status,'SOURCE_EXTRACTED_UNATTESTED')
  assert.match(extraction.source_sha256,/^[0-9a-f]{64}$/)
  assert.ok(existsSync('scripts/import_handbook_pdf.py'),'reproducible source importer must exist')
})
