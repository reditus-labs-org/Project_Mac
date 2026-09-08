import {NextResponse} from 'next/server';
const attempts=new Map<string,{count:number;until:number}>();
export async function POST(request:Request){
 if(Number(request.headers.get('content-length')||0)>18000)return NextResponse.json({error:'Your enquiry is too long.'},{status:413});
 let data:Record<string,unknown>;
 try{const raw=await request.text();if(raw.length>18000)return NextResponse.json({error:'Your enquiry is too long.'},{status:413});data=JSON.parse(raw);}catch{return NextResponse.json({error:'Please check your enquiry and try again.'},{status:400});}
 if(!data||typeof data!=='object'||Array.isArray(data))return NextResponse.json({error:'Invalid enquiry.'},{status:400});
 const read=(key:string)=>typeof data[key]==='string'?(data[key] as string).trim():'';
 const name=read('name'),company=read('company'),email=read('email'),phone=read('phone'),type=read('type'),brief=read('brief');
 if(read('website'))return NextResponse.json({error:'Unable to process this enquiry.'},{status:400});
 if(!name||name.length>120||!company||company.length>160||! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||email.length>254||phone.length>40||!type||type.length>100||brief.length<10||brief.length>5000){
  return NextResponse.json({error:'Please enter your name, company, a valid email and a project brief of 10–5,000 characters.'},{status:400});
 }
 const key=process.env.RESEND_API_KEY,from=process.env.ENQUIRY_FROM;
 if(!key||!from)return NextResponse.json({error:'Please send your project brief by email using the link below, or call +91 44 4857 3774.'},{status:503});
 const now=Date.now();
 for(const [id,value] of attempts)if(value.until<now)attempts.delete(id);
 const id=email.toLowerCase();const previous=attempts.get(id);
 if(previous&&previous.count>=3)return NextResponse.json({error:'Please wait a few minutes before sending another enquiry.'},{status:429});
 attempts.set(id,{count:(previous?.count||0)+1,until:previous?.until||now+600000});
 try{
  const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+key,'Content-Type':'application/json'},body:JSON.stringify({from,to:['info@maceng.in'],reply_to:email,subject:'Website enquiry: '+company.replace(/[\r\n]/g,' '),text:['Name: '+name,'Company: '+company,'Email: '+email,'Phone: '+phone,'Project type: '+type,'',brief].join('\n')}),signal:AbortSignal.timeout(12000)});
  if(!response.ok)return NextResponse.json({error:'We couldn’t send your enquiry. Please use the email link below.'},{status:502});
  const result=await response.json();if(!result.id)throw new Error('Unconfirmed delivery');
  return NextResponse.json({ok:true});
 }catch{return NextResponse.json({error:'Delivery could not be confirmed. Please use the email link below.'},{status:502});}
}
