import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export const runtime = 'nodejs'
const RECIPIENT = 'info@komplyint.fi'
const limit = new Map<string, {start:number;count:number}>()
const WINDOW = 15 * 60 * 1000
const MAX_REQUESTS = 4
function escapeHtml(value:string){
  return value.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;')
}
function cleanString(x:unknown,max:number){return typeof x==='string'?x.trim().slice(0,max):''}
function validEmail(x:string){return x.length<=200 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x)}
function json(error:string,status:number){return NextResponse.json({ok:false,error},{status,headers:{'Cache-Control':'no-store'}})}
export async function POST(request:NextRequest) {
  if(Number(request.headers.get('content-length')||0)>12000)return json('Request too large',413)
  const ip=(request.headers.get('x-forwarded-for')||'unknown').split(',')[0].trim()
  const now=Date.now(), slot=limit.get(ip)
  if(slot && now-slot.start<WINDOW && slot.count>=MAX_REQUESTS)return NextResponse.json({ok:false,error:'Rate limited'},{status:429,headers:{'Retry-After':'900','Cache-Control':'no-store'}})
  try{
    const body=await request.json() as Record<string,unknown>
    const name=cleanString(body.name,120)
    const email=cleanString(body.email,200)
    const message=cleanString(body.message,5000)
    if(body.website)return NextResponse.json({ok:true,accepted:true},{status:202})
    if(!validEmail(email)||message.length<10)return json('Valid email and a message of at least 10 characters are required',422)
    if(!process.env.SMTP_HOST||!process.env.SMTP_USER||!process.env.SMTP_PASSWORD)return json('Delivery service unavailable',503)
    limit.set(ip,{start:slot&&now-slot.start<WINDOW?slot.start:now,count:(slot&&now-slot.start<WINDOW?slot.count:0)+1})
    const smtp=nodemailer.createTransport({
      host:process.env.SMTP_HOST,
      port:Number(process.env.SMTP_PORT||587),
      secure:process.env.SMTP_PORT==='465',
      auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASSWORD},
      connectionTimeout:12000,
      greetingTimeout:12000,
      socketTimeout:20000,
    })
    const subject='Komplyint website enquiry'+(name?': '+name.replace(/[\r\n]/g,' ').slice(0,70):'')
    const result=await smtp.sendMail({
      from:process.env.SMTP_USER,
      to:RECIPIENT,
      replyTo:email,
      subject,
      text:'Name: '+(name||'Not provided')+'\nEmail: '+email+'\n\nMessage:\n'+message,
      html:'<p><b>Name:</b> '+escapeHtml(name||'Not provided')+'</p><p><b>Email:</b> '+escapeHtml(email)+'</p><p><b>Message:</b></p><p>'+escapeHtml(message).replace(/\n/g,'<br>')+'</p>'
    })
    if(!(result.accepted||[]).some(x=>(typeof x==='string'?x:x.address).toLowerCase()===RECIPIENT))return json('Recipient was not accepted by mail service',502)
    return NextResponse.json({ok:true,accepted:true,status:'queued'}, {status:202,headers:{'Cache-Control':'no-store'}})
  }catch(e){console.error('Contact request was not accepted:',e instanceof Error?e.message:'unknown');return json('Unable to confirm delivery service acceptance',503)}
}
