import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
import { verifyPublicRelease, REQUIRED_PAGES } from '../scripts/verify-public-release.mjs'

// Use the actual standalone Next.js server, not phrase-generated mocks.
// This verifies release-validator compatibility with the current rendered site.
// It is not a claim that this build has been deployed to the public domain.
const origin=process.env.SITE_URL||'http://127.0.0.1:3000'
const result=await verifyPublicRelease({origin})
await mkdir('site-preview',{recursive:true})
await writeFile('site-preview/release-copy-build-evidence.json',JSON.stringify({
  scope:'CI production build',testedCommit:process.env.GITHUB_SHA||'local',
  productionPublication:'NOT_VERIFIED_BY_THIS_TEST',...result,
},null,2)+'\n')
assert.equal(result.pass,true,result.problems.join('\n'))
assert.equal(result.checks.filter(check=>check.label.startsWith('page ')).length,REQUIRED_PAGES.length)
console.log(JSON.stringify({result:'PASS',scope:'actual production build',pages:REQUIRED_PAGES.length,checks:result.checks.length}))
