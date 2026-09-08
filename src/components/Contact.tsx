'use client';
import {useState,type FormEvent} from 'react';
import {Arrow} from './Icons';
export default function Contact(){
 const [state,setState]=useState<'idle'|'sending'|'sent'|'error'>('idle');const [draft,setDraft]=useState('');const [message,setMessage]=useState('');
 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();const form=event.currentTarget;const data=Object.fromEntries(new FormData(form));
  setDraft('mailto:info@maceng.in?subject='+encodeURIComponent('Project enquiry — '+data.company)+'&body='+encodeURIComponent('Name: '+data.name+'\nCompany: '+data.company+'\nEmail: '+data.email+'\nPhone: '+data.phone+'\nProject type: '+data.type+'\n\n'+data.brief));
  setState('sending');
  try{const response=await fetch('/api/enquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});const result=await response.json();
   if(!response.ok){setMessage(result.error||'We couldn’t send your enquiry. Please try email instead.');setState('error');return;}
   setState('sent');form.reset();
  }catch{setMessage('We couldn’t connect. Your project brief is ready to send by email below.');setState('error');}
 }
 return <section className="contact section-pad" id="contact" aria-labelledby="contact-heading"><div className="section-tag"><span className="dot"/> YOUR NEXT PROJECT STARTS HERE.</div>
 <div className="contact-grid"><div className="contact-copy"><h2 id="contact-heading" data-reveal>Let’s make<br/><em>space work.</em><span className="contact-arrow">↗</span></h2><p>A building. A challenge. A fresh start.<br/>Tell us what you have in mind.</p><a href="mailto:info@maceng.in" className="contact-email">info@maceng.in <Arrow diagonal/></a><a href="tel:+914448573774" className="contact-phone">+91 44 4857 3774</a><address>35/1, 1st Main Road Annexe,<br/>Alwarthirunagar, Chennai — 600087</address></div>
 <form onSubmit={submit} className="contact-form"><span className="mono">PROJECT ENQUIRY / ALL FIELDS MARKED * REQUIRED</span><div className="form-row"><label>Your name *<input name="name" autoComplete="name" placeholder="How should we address you?" required maxLength={120}/></label><label>Company *<input name="company" autoComplete="organization" placeholder="Your company" required maxLength={160}/></label></div>
 <div className="form-row"><label>Email *<input type="email" name="email" autoComplete="email" placeholder="you@company.com" required maxLength={254}/></label><label>Phone<input type="tel" name="phone" autoComplete="tel" placeholder="+91" maxLength={40}/></label></div>
 <label>What are you working on? *<select name="type" defaultValue="" required><option value="" disabled>Select project type</option><option>Commercial / workplace</option><option>Industrial</option><option>Healthcare / education</option><option>Hospitality</option><option>Residential</option><option>Maintenance / other</option></select></label>
 <label>A little about your project *<textarea name="brief" placeholder="Location, systems, timeline — whatever you know so far." rows={3} required minLength={10} maxLength={5000}/></label>
 <div className="honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
 <div className="form-bottom"><p>We’ll use these details to respond to your enquiry. <a href="/privacy">Privacy</a></p><button disabled={state==='sending'} className="primary-button" type="submit">{state==='sending'?'Sending…':'Send enquiry'}<Arrow diagonal/></button></div>
 <div aria-live="polite" className={'form-status '+state}>{state==='sent'&&<p>Thank you. Your enquiry has been sent to MAC Engineering Services.</p>}{state==='error'&&<><p>{message}</p><a className="text-link" href={draft}>Open your email app with this enquiry <Arrow diagonal/></a></>}</div>
 </form></div></section>;
}
