import test from 'node:test'
import assert from 'node:assert/strict'
import {
  verifyPublicRelease, REQUIRED_DOWNLOADS, REQUIRED_PAGES, REQUIRED_MEDIA,
} from '../scripts/verify-public-release.mjs'

function fakeResponse(path,{commit='abc123',stale=false,missing=[],badDownload=false,badMedia=false,badLocale=false}={}){
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
  const media=REQUIRED_MEDIA.find(row=>row[0]===path)
  if(media){
    if(media[1]==='svg')return new Response(badMedia?'<bad />':'<svg xmlns="http://www.w3.org/2000/svg"><title>'+media[2]+'</title><desc>'+('Illustrative non-client source artwork. '.repeat(12))+'</desc></svg>')
    const buf=Buffer.alloc(1200)
    if(!badMedia){
      if(media[1]==='mp4')buf.write('ftyp',4)
      if(media[1]==='webp'){buf.write('RIFF',0);buf.write('WEBP',8)}
    }
    return new Response(buf)
  }
  const phrases=REQUIRED_PAGES.find(row=>row[0]===path)?.[1]||[]
  const body=phrases.join(' / ')+(stale&&path==='/'?' Teknologiaa, joka helpottaa oikeaa työtä.':'')
  const lang=path.startsWith('/en')&&!badLocale?'en':path.startsWith('/sv')&&!badLocale?'sv':'fi'
  return new Response('<html lang="'+lang+'"><body>'+body+'</body></html>',{status:200,headers:{'Content-Type':'text/html; charset=utf-8'}})
}
function fetcher(options={}) {
  return async url=>fakeResponse(new URL(url).pathname,options)
}

test('all current trilingual pages and real download signatures satisfy the release contract',async()=>{
  const result=await verifyPublicRelease({fetcher:fetcher(),origin:'https://www.komplyint.fi',expectedCommit:'abc123'})
  assert.equal(result.pass,true)
  assert.equal(result.commitVerified,true)
  assert.equal(result.checks.length,1+REQUIRED_PAGES.length+REQUIRED_DOWNLOADS.length+REQUIRED_MEDIA.length)
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

test('missing original-feature art or an optimized film fails production release',async()=>{
  const missing=await verifyPublicRelease({fetcher:fetcher({missing:['/media/featured-reporting-art-fi.svg']})})
  assert.equal(missing.pass,false)
  assert.match(missing.problems.join(' '),/featured-reporting-art-fi/)
  const bad=await verifyPublicRelease({fetcher:fetcher({badMedia:true})})
  assert.equal(bad.pass,false)
  assert.equal(bad.problems.length,REQUIRED_MEDIA.length)
})
test('the production verifier rejects an English page served with Finnish initial document language',async()=>{
  const result=await verifyPublicRelease({fetcher:fetcher({badLocale:true})})
  assert.equal(result.pass,false)
  assert.ok(result.problems.some(x=>x.includes('incorrect SSR document language')))
})

test('a missing Swedish service page or Swedish featured graphic blocks publication',async()=>{
  const result=await verifyPublicRelease({fetcher:fetcher({missing:['/sv/services/data-reporting','/media/featured-reporting-art-sv.svg']})})
  assert.equal(result.pass,false)
  assert.equal(result.problems.length,2)
  assert.match(result.problems.join(' '),/featured-reporting-art-sv/)
})
