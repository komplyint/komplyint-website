'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { content, services, serviceSlugs, type Lang } from '@/lib/commercial'
import { pathFor } from '@/lib/site-route'
import Arrow from '@/components/Arrow'

export default function ContactForm({lang}:{lang:Lang}) {
  const t=content[lang].contactPage
  const [name,setName]=useState(''), [company,setCompany]=useState(''), [email,setEmail]=useState(''), [message,setMessage]=useState(''), [topic,setTopic]=useState('')
  useEffect(()=>{const slug=new URLSearchParams(window.location.search).get('service');const i=serviceSlugs.indexOf(slug as typeof serviceSlugs[number]);if(i>=0)setTopic(services[lang][i].title)},[lang])
  const [status,setStatus]=useState<'idle'|'sending'|'sent'|'error'>('idle')
  const [trap,setTrap]=useState('')
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if(trap) return
    setStatus('sending')
    try {
      const payload = {name,email,company,website:trap,message:((company ? (lang==='fi'?'Yritys: ':'Company: ')+company+'\n' : '')+(topic ? (lang==='fi'?'Aihe: ':'Topic: ')+topic+'\n\n' : '')+message)}
      const r = await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)})
      if(!r.ok) throw new Error('send failed')
      setName('');setCompany('');setEmail('');setMessage('');setTopic('');setStatus('sent')
    } catch {setStatus('error')}
  }
  return (
    <form className="kc-form" onSubmit={submit}><div className="kc-form-two"><label>{t.formName}<input type="text" value={name} onChange={e=>setName(e.target.value)} maxLength={120} autoComplete="name" placeholder={lang==='fi'?'Nimesi':'Your name'}/></label><label>{lang==='fi'?'Yritys (valinnainen)':'Company (optional)'}<input type="text" value={company} onChange={e=>setCompany(e.target.value)} maxLength={140} autoComplete="organization" placeholder={lang==='fi'?'Yrityksen nimi':'Company name'}/></label><label>{t.formEmail}<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required maxLength={200} autoComplete="email" placeholder="name@company.fi"/></label></div>
    <label>{t.formService}<select value={topic} onChange={e=>setTopic(e.target.value)}><option value="">{t.select}</option>{services[lang].map(s=><option key={s.title} value={s.title}>{s.title}</option>)}<option value="Other">{t.other}</option></select></label>
    <label>{t.formMessage}<textarea rows={6} maxLength={4500} minLength={10} required value={message} onChange={e=>setMessage(e.target.value)} placeholder={lang==='fi'?'Kerro lyhyesti ongelma ja toivottu lopputulos.':'Describe the problem and desired outcome.'}/></label>
    <label className="kc-honeypot" aria-hidden="true">Website <input tabIndex={-1} autoComplete="off" value={trap} onChange={e=>setTrap(e.target.value)}/></label>
    <p className="kc-form-privacy">{t.privacy} <a href={pathFor(lang,'privacy')}>{content[lang].navigation.privacy}.</a></p>
    {status==='sent' && <p role="status" className="kc-form-success">{t.sent}</p>}
    {status==='error' && <p role="alert" className="kc-form-error">{t.fail} <a href="mailto:info@komplyint.fi">info@komplyint.fi</a></p>}
    <button className="kc-button kc-button-primary" disabled={status==='sending'} type="submit">{status==='sending'?t.sending:t.send}<Arrow /></button></form>
  )
}
