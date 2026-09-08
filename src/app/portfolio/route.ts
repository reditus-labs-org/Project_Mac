import {createReadStream} from 'node:fs';
import {stat} from 'node:fs/promises';
import path from 'node:path';
import {Readable} from 'node:stream';
export const runtime='nodejs';
export async function GET(){
 try{const file=path.join(process.cwd(),'MAC.pdf');const info=await stat(file);
 return new Response(Readable.toWeb(createReadStream(file)) as ReadableStream,{headers:{'Content-Type':'application/pdf','Content-Length':String(info.size),'Content-Disposition':'inline; filename="MAC-Engineering-Portfolio.pdf"','Cache-Control':'public, max-age=86400'}});
 }catch{return new Response('Portfolio unavailable. Please contact info@maceng.in for a copy.',{status:404});}
}
