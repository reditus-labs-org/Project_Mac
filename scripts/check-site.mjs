import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {projects} from '../src/data/projects.ts';
const base=process.env.TEST_BASE_URL||'http://localhost:3000';
const request=(path,options={})=>fetch(base+path,{...options,signal:AbortSignal.timeout(30000)});
const home=await request('/');assert.equal(home.status,200);const html=await home.text();
for(const content of ['ENGINEERED','Everything connects.','Stanley Government Hospital','info@maceng.in','id="contact"','id="about"'])assert.ok(html.includes(content),'Missing content: '+content);
assert.equal(projects.length,13);assert.equal(new Set(projects.map(p=>p.slug)).size,13);
console.log('PASS: homepage and source inventory');
for(const p of projects){
 const response=await request('/projects/'+p.slug);assert.equal(response.status,200,p.slug);const body=await response.text();assert.ok(body.includes(p.name),p.slug+' title missing');assert.ok(body.includes(p.client),p.slug+' client missing');
 const asset=await request('/images/'+p.slug+'.webp',{method:'HEAD'});assert.equal(asset.status,200,p.slug+' image');
}
console.log('PASS: all 13 project routes and original image assets');
assert.equal((await request('/projects/not-a-project')).status,404);
assert.equal((await request('/privacy')).status,200);
const pdf=await request('/portfolio',{method:'HEAD'});assert.equal(pdf.status,200);assert.equal(pdf.headers.get('content-type'),'application/pdf');assert.ok(Number(pdf.headers.get('content-length'))>50000000);
console.log('PASS: missing-project 404, privacy and portfolio PDF');
async function post(body){return request('/api/enquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});}
assert.equal((await post({})).status,400);
assert.equal((await post({website:'spam'})).status,400);
assert.equal((await post(null)).status,400);
const invalid=await request('/api/enquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:'invalid json'});assert.equal(invalid.status,400);
assert.equal((await post({brief:'x'.repeat(19000)})).status,413);
console.log('PASS: validation, honeypot, malformed input and payload limit');
const configured=Boolean(process.env.RESEND_API_KEY&&process.env.ENQUIRY_FROM)||['.env','.env.local','.env.development','.env.development.local','.env.production','.env.production.local'].some(existsSync);
if(!configured){
 const fallback=await post({name:'Local preview check',company:'Preview',email:'preview@example.com',phone:'',type:'Industrial',brief:'Local validation check with no email service configured.'});
 assert.equal(fallback.status,503);const result=await fallback.json();assert.ok(!result.ok);console.log('PASS: unconfigured delivery returns email fallback, not false success');
}else console.log('SKIP: valid enquiry test to avoid sending real email');
console.log('All HTTP checks passed. Browser/WebGL interaction is not covered by this suite.');

