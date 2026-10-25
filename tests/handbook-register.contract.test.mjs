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
