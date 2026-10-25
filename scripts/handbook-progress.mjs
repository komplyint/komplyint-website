import { readFileSync } from 'node:fs'
const ledger=JSON.parse(readFileSync(new URL('../docs/handbook-specification-units.json',import.meta.url),'utf8'))
const explicit=JSON.parse(readFileSync(new URL('../docs/handbook-component-acceptance.json',import.meta.url),'utf8'))
const extraction=JSON.parse(readFileSync(new URL('../docs/handbook-extraction-audit.json',import.meta.url),'utf8'))
const tally={}
for(const entry of ledger.units){
  tally[entry.verification]=(tally[entry.verification]||0)+1
}
console.log(JSON.stringify({specification:ledger.specification_version,firstLevelUnits:ledger.units.length,detailedAcceptanceEntries:ledger.declared_acceptance_entries,detailedAcceptanceLedgerImported:false,validation:tally,unitsWithRelevantSourceEvidence:ledger.units.filter(entry=>entry.implementation_evidence.length).length,explicitComponentTests:explicit.tests.length,explicitComponentTestsNotTested:explicit.tests.filter(x=>x.result==='NOT_TESTED').length,sourceExtraction:{identified:extraction.identifiable_entries,unmapped:extraction.source_entries_unmapped,declared:extraction.declared_entries,sourceSHA256:extraction.source_sha256,status:extraction.verification_status,fullLedgerCommitted:extraction.full_1517_item_ledger_committed}},null,2))
