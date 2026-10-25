import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
const data=JSON.parse(readFileSync('docs/handbook-component-acceptance.json','utf8'))
const units=JSON.parse(readFileSync('docs/handbook-specification-units.json','utf8'))
test('all 225 explicit component test statements from handbook pages 41–106 are imported',()=>{
  assert.equal(data.component_count,64)
  assert.equal(data.explicit_component_tests,225)
  assert.equal(data.tests.length,225)
  assert.equal(new Set(data.tests.map(x=>x.id)).size,225)
  assert.equal(new Set(data.tests.map(x=>x.unit_id)).size,64)
})
test('every component check is linked to an actual numbered specification unit with honest status',()=>{
  const parents=new Map(units.units.map(x=>[x.id,x]))
  for(const row of data.tests){
    assert.match(row.id,/^C\d{2}-T\d{2}$/)
    assert.equal(row.id.slice(0,3),row.unit_id)
    assert.ok(parents.has(row.unit_id))
    assert.ok(parents.get(row.unit_id).explicit_acceptance_test_ids.includes(row.id))
    assert.ok(row.text.length>=15)
    assert.ok(row.source_page>=41&&row.source_page<=106)
    assert.equal(row.result,'NOT_TESTED')
  }
})
