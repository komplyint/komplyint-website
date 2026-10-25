import assert from 'node:assert/strict'
import { pathToFileURL } from 'node:url'

export const REQUIRED_PAGES = [
  ['/', ['Selkeyttä työhön.', 'Käytännöllistä digiapua', 'info@komplyint.fi']],
  ['/en', ['Clarity for your work.', 'Explore services']],
  ['/services', ['Oikea ratkaisu.', 'Komplyint']],
  ['/services/data-reporting', ['Excel, data ja raportointi', 'Mitä voimme tehdä']],
  ['/en/services/m365-automation', ['Microsoft 365', 'Our process']],
  ['/work', ['Näin ratkaisu voi toimia.']],
  ['/about', ['Pienet ongelmat ansaitsevat hyvän ratkaisun.', '369283279']],
  ['/contact', ['info@komplyint.fi']],
  ['/accessibility', ['Saavutettavuustiedot']],
]
export const REQUIRED_DOWNLOADS = [
  ['/downloads/Komplyint_Palveluesite_FI.pdf', '%PDF'],
  ['/downloads/Komplyint_Service_Portfolio_EN.pdf', '%PDF'],
  ['/downloads/Komplyint_Service_Documents.zip', 'PK'],
]
const RELEASE_CONTRACT='komplyint-handbook-2026-10-25'

export async function verifyPublicRelease({
  origin='https://www.komplyint.fi',
  fetcher=fetch,
  expectedCommit='',
}={}) {
  const problems=[]
  const checks=[]
  let releaseCommit=null
  const base=origin.endsWith('/')?origin:origin+'/'
  async function request(path) {
    const response=await fetcher(new URL(path.replace(/^\//,''),base).href,{
      redirect:'follow',
      cache:'no-store',
      headers:{'Cache-Control':'no-cache'},
      signal:AbortSignal.timeout(18000),
    })
    if(response.status!==200)throw new Error('HTTP '+response.status)
    return response
  }
  async function checked(label,path,validator){
    try{
      const response=await request(path)
      await validator(response)
      checks.push({label,path,pass:true})
    }catch(error){
      const issue=error instanceof Error?error.message:String(error)
      problems.push(label+': '+issue)
      checks.push({label,path,pass:false,error:issue})
    }
  }

  await checked('release signature','/api/release',async response=>{
    const info=await response.json()
    assert.equal(info.site,'Komplyint Oy')
    assert.equal(info.contract,RELEASE_CONTRACT,
      'wrong or outdated site release contract')
    releaseCommit=typeof info.commit==='string'?info.commit:null
    if(expectedCommit && releaseCommit){
      assert.equal(releaseCommit,expectedCommit,'deployed commit differs from main')
    }
  })

  for(const [path,phrases] of REQUIRED_PAGES){
    await checked('page '+path,path,async response=>{
      const html=await response.text()
      for(const phrase of phrases)assert.ok(html.includes(phrase),'missing content: '+phrase)
      if(path==='/'){
        assert.ok(!html.includes('Teknologiaa, joka helpottaa oikeaa työtä.'),
          'stale pre-handbook homepage still deployed')
      }
    })
  }

  for(const [path,signature] of REQUIRED_DOWNLOADS){
    await checked('download '+path,path,async response=>{
      const buffer=new Uint8Array(await response.arrayBuffer())
      assert.ok(buffer.byteLength>=1000,'download is empty or placeholder')
      const prefix=Buffer.from(buffer.slice(0,signature.length)).toString('ascii')
      assert.equal(prefix,signature,'download is not the expected file type')
    })
  }
  return {pass:problems.length===0,origin,releaseCommit,
    commitVerified:!!expectedCommit&&releaseCommit===expectedCommit,
    checks,problems}
}

async function main(){
  const origin=process.env.PUBLIC_SITE_URL||'https://www.komplyint.fi'
  const expectedCommit=process.env.GITHUB_SHA||''
  const attempts=Math.max(1,Math.min(12,Number(process.env.RELEASE_VERIFY_ATTEMPTS)||1))
  let result
  for(let i=1;i<=attempts;i++){
    result=await verifyPublicRelease({origin,expectedCommit})
    if(result.pass)break
    console.error('Attempt '+i+'/'+attempts+' failed: '+result.problems.join(' | '))
    if(i<attempts)await new Promise(resolve=>setTimeout(resolve,6000))
  }
  console.log(JSON.stringify({
    result:result.pass?'PASS':'BLOCKED',
    origin:result.origin,
    releaseCommit:result.releaseCommit,
    commitVerified:result.commitVerified,
    total:result.checks.length,
    passed:result.checks.filter(c=>c.pass).length,
    problems:result.problems,
  },null,2))
  if(!result.pass)process.exitCode=1
}
if(process.argv[1] && import.meta.url===pathToFileURL(process.argv[1]).href){
  await main()
}
