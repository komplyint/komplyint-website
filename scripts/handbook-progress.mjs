import { readFileSync } from 'node:fs'
const ledger=JSON.parse(readFileSync(new URL('../docs/handbook-specification-units.json',import.meta.url),'utf8'))
const tally={}
for(const entry of ledger.units){
  tally[entry.verification]=(tally[entry.verification]||0)+1
}
console.log(JSON.stringify({specification:ledger.specification_version,firstLevelUnits:ledger.units.length,detailedAcceptanceEntries:ledger.declared_acceptance_entries,detailedAcceptanceLedgerImported:false,validation:tally,unitsWithRelevantSourceEvidence:ledger.units.filter(entry=>entry.implementation_evidence.length).length},null,2))
