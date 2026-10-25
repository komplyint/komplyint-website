import test from 'node:test'
import assert from 'node:assert/strict'
import {
  verifyPublicRelease, REQUIRED_DOWNLOADS, REQUIRED_PAGES,
} from '../scripts/verify-public-release.mjs'

function fakeResponse(path,{commit='abc123',stale=false,missing=[],badDownload=false}={}){
  if(missing.includes(path))return new Response('Not Found',{status:404})
  if(path==='/api/release')return Response.json({
    site:'Komplyint Oy',contract:'komplyint-handbook-2026-10-25',commit,
  })
  const download=REQUIRED_DOWNLOADS.find(row=>row[0]===path)
  if(download){
    const data=Buffer.alloc(3000)
    data.write(badDownload?'FAIL':download[1])
    return new Response(data,{status:200})
  }
  const phrases=REQUIRED_PAGES.find(row=>row[0]===path)?.[1]||[]
  const body=phrases.join(' / ')+(stale&&path==='/'?' Teknologiaa, joka helpottaa oikeaa työtä.':'')
  return new Response(body,{status:200,headers:{'Content-Type':'text/html; charset=utf-8'}})
}
function fetcher(options={}) {
  return async url=>fakeResponse(new URL(url).pathname,options)
}

test('all current bilingual pages and real download signatures satisfy the release contract',async()=>{
  const result=await verifyPublicRelease({fetcher:fetcher(),origin:'https://www.komplyint.fi',expectedCommit:'abc123'})
  assert.equal(result.pass,true)
  assert.equal(result.commitVerified,true)
  assert.equal(result.checks.length,1+REQUIRED_PAGES.length+REQUIRED_DOWNLOADS.length)
})
test('a previous homepage is rejected even if it has some similar service content',async()=>{
  const result=await verifyPublicRelease({fetcher:fetcher({stale:true})})
  assert.equal(result.pass,false)
  assert.match(result.problems.join(' '),/stale pre-handbook homepage/)
})
test('a missing service detail or ZIP makes the publication incomplete',async()=>{
  const result=await verifyPublicRelease({fetcher:fetcher({missing:['/services/data-reporting','/downloads/Komplyint_Service_Documents.zip']})})
  assert.equal(result.pass,false)
  assert.equal(result.problems.length,2)
})
test('a mismatched production revision is not accepted',async()=>{
  const result=await verifyPublicRelease({fetcher:fetcher({commit:'old-commit'}),expectedCommit:'new-commit'})
  assert.equal(result.pass,false)
  assert.match(result.problems.join(' '),/deployed commit differs/)
})
test('a wrong document file type is rejected',async()=>{
  const result=await verifyPublicRelease({fetcher:fetcher({badDownload:true})})
  assert.equal(result.pass,false)
  assert.equal(result.problems.length,REQUIRED_DOWNLOADS.length)
})
test('when Git integration does not expose the commit, require the deployed contract and mark hash unverified',async()=>{
  const result=await verifyPublicRelease({fetcher:fetcher({commit:null}),expectedCommit:'new-commit'})
  assert.equal(result.pass,true)
  assert.equal(result.commitVerified,false)
})
