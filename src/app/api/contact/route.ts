import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { serviceSlugs } from '@/lib/commercial'

export const runtime = 'nodejs'
const RECIPIENT = 'info@komplyint.fi'
const BODY_LIMIT = 32 * 1024
const WINDOW = 15 * 60 * 1000
const MAX_REQUESTS = 5
const limit = new Map<string, {start:number;count:number}>()
// A process-local duplicate guard improves the experience but is NOT durable
// across Vercel instances. E08 durable idempotency remains an operational gate.
const accepted = new Map<string,number>()
const MAX_AGE = 24 * 60 * 60 * 1000
const noStore = { 'Cache-Control':'no-store' }

function reply(error:string,status:number,fields?:Record<string,string>){
  return NextResponse.json({ok:false,error,...(fields?{fields}:{})},{status,headers:noStore})
}
function escapeHtml(text:string){
  return text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;')
}
function countCodePoints(text:string){return Array.from(text).length}
function normalized(value:unknown):string{return typeof value==='string'?value.normalize('NFC').trim():''}
function validEmail(value:string){
  return value.length<=254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && !/[\r\n]/.test(value)
}
async function boundedJson(request:NextRequest):Promise<{data:unknown}|{error:number}>{
  const declared=Number(request.headers.get('content-length')||0)
  if(declared>BODY_LIMIT)return {error:413}
  const reader=request.body?.getReader()
  if(!reader)return {error:400}
  const fragments:Uint8Array[]=[]
  let bytes=0
  for(;;){
    const result=await reader.read()
    if(result.done)break
    bytes+=result.value.byteLength
    if(bytes>BODY_LIMIT){
      await reader.cancel().catch(()=>{})
      return {error:413}
    }
    fragments.push(result.value)
  }
  const payload=Buffer.concat(fragments.map(bytes=>Buffer.from(bytes)))
  try{return {data:JSON.parse(payload.toString('utf8'))}}catch{return {error:400}}
}
export async function POST(request:NextRequest){
  if(!request.headers.get('content-type')?.toLowerCase().includes('application/json')){
    return reply('JSON request required',415)
  }
  const ip=(request.headers.get('x-forwarded-for')||'unknown').split(',')[0].trim().slice(0,100)
  const now=Date.now()
  if(limit.size>1200)limit.forEach((slot,key)=>{if(now-slot.start>WINDOW)limit.delete(key)})
  if(accepted.size>1200)accepted.forEach((at,key)=>{if(now-at>MAX_AGE)accepted.delete(key)})
  const slot=limit.get(ip)
  if(slot && now-slot.start<WINDOW && slot.count>=MAX_REQUESTS){
    return NextResponse.json({ok:false,error:'Rate limited'},{status:429,headers:{'Retry-After':String(Math.max(1,Math.ceil((WINDOW-(now-slot.start))/1000))),...noStore}})
  }
  try{
    const parsed=await boundedJson(request)
    if('error' in parsed)return reply(parsed.error===413?'Request too large':'Malformed JSON',parsed.error)
    if(!parsed.data || typeof parsed.data!=='object' || Array.isArray(parsed.data))return reply('Invalid request',422)
    const data=parsed.data as Record<string,unknown>
    // Quietly discard automated honeypot submissions; no inbox was contacted.
    if(typeof data.website==='string'&&data.website.trim()){
      return NextResponse.json({ok:true,accepted:false,filtered:true},{status:202,headers:noStore})
    }
    const fields:Record<string,string>={}
    if(data.name!==undefined&&typeof data.name!=='string')fields.name='Invalid name'
    if(data.company!==undefined&&typeof data.company!=='string')fields.company='Invalid company'
    const name=normalized(data.name),company=normalized(data.company),email=normalized(data.email)
    const message=normalized(data.message),service=normalized(data.service),locale=normalized(data.locale)||'fi'
    if(countCodePoints(name)>120)fields.name='Name is too long'
    if(countCodePoints(company)>140)fields.company='Company is too long'
    if(typeof data.email!=='string'||!validEmail(email))fields.email='Valid email is required'
    if(typeof data.message!=='string'||countCodePoints(message)<10||countCodePoints(message)>4500)fields.message='Message must contain 10 to 4500 characters'
    if(data.service!==undefined&&(typeof data.service!=='string'||(service!==''&&service!=='other'&&!serviceSlugs.some(slug=>slug===service))))fields.service='Unknown service'
    if(data.locale!==undefined&&(typeof data.locale!=='string'||!['fi','en'].includes(locale)))fields.locale='Unknown language'
    const requestKey=normalized(data.idempotencyKey)
    if(data.idempotencyKey!==undefined&&(typeof data.idempotencyKey!=='string'||!/^[0-9a-f-]{20,64}$/i.test(requestKey)))fields.idempotencyKey='Invalid request identifier'
    if(Object.keys(fields).length)return reply('Validation failed',422,fields)
    if(requestKey&&accepted.has(requestKey)&&now-(accepted.get(requestKey)||0)<MAX_AGE){
      return NextResponse.json({ok:true,accepted:true,status:'queued',duplicate:true},{status:202,headers:noStore})
    }
    if(!process.env.SMTP_HOST||!process.env.SMTP_USER||!process.env.SMTP_PASSWORD)return reply('Delivery service unavailable',503)
    limit.set(ip,{start:slot&&now-slot.start<WINDOW?slot.start:now,count:(slot&&now-slot.start<WINDOW?slot.count:0)+1})
    const smtp=nodemailer.createTransport({
      host:process.env.SMTP_HOST,port:Number(process.env.SMTP_PORT||587),
      secure:process.env.SMTP_PORT==='465',
      auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASSWORD},
      connectionTimeout:12000,greetingTimeout:12000,socketTimeout:20000
    })
    const identity=service||'not specified'
    const subject='Komplyint website enquiry'+(name?': '+name.replace(/[\r\n]/g,' ').slice(0,70):'')
    const text=['Name: '+(name||'Not provided'),'Email: '+email,'Company: '+(company||'Not provided'),
      'Service: '+identity,'Language: '+locale,'','Message:',message].join('\n')
    const result=await smtp.sendMail({
      from:process.env.SMTP_USER,to:RECIPIENT,replyTo:email,subject,
      text,
      html:'<p><b>Name:</b> '+escapeHtml(name||'Not provided')+'</p><p><b>Email:</b> '+escapeHtml(email)+
        '</p><p><b>Company:</b> '+escapeHtml(company||'Not provided')+'</p><p><b>Service:</b> '+
        escapeHtml(identity)+'</p><p><b>Message:</b></p><p>'+escapeHtml(message).replace(/\n/g,'<br>')+'</p>'
    })
    if(!(result.accepted||[]).some(x=>(typeof x==='string'?x:x.address).toLowerCase()===RECIPIENT))return reply('Recipient not accepted by mail service',502)
    if(requestKey)accepted.set(requestKey,now)
    return NextResponse.json({ok:true,accepted:true,status:'queued'},{status:202,headers:noStore})
  }catch(error){
    console.error('Contact request delivery could not be confirmed:',error instanceof Error?error.name:'unknown')
    return reply('Unable to confirm request acceptance',503)
  }
}
