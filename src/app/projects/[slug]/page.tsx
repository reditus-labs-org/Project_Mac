import Link from 'next/link';
import {notFound} from 'next/navigation';
import {projects} from '@/data/projects';
import {Arrow,Mark} from '@/components/Icons';
export function generateStaticParams(){return projects.map(p=>({slug:p.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=projects.find(p=>p.slug===slug);return {title:p?p.name+' — MAC Engineering Services':'Project not found',description:p?p.system+' project for '+p.name+'. Explore the project details in MAC’s engineering portfolio.':undefined};}
export default async function ProjectPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const project=projects.find(p=>p.slug===slug);if(!project)notFound();
 const next=projects[(projects.indexOf(project)+1)%projects.length];
 return <><header className="project-page-header"><Link href="/"><Mark/></Link><Link href="/#work" className="text-link">All projects <Arrow/></Link></header>
 <main className="project-page"><div className="project-page-title section-pad"><span className="section-tag"><span className="dot"/>{project.sector.toUpperCase()} / COMPLETED PROJECT</span><h1>{project.name}</h1><p>{project.location}</p></div>
 <div className="project-page-photo"><img src={'/images/'+project.slug+'.webp'} alt={project.name+' project photograph'} width="1600" height="1050"/></div>
 <section className="project-page-details section-pad"><div><span className="mono">PROJECT SCOPE</span><h2>{project.system}.</h2><p>Engineering for {project.name}. This installation is part of MAC Engineering Services’ completed-project portfolio.</p>
 {project.slug==='stanley'&&<p>Stanley Government Hospital: a 950 TR installation delivered in 45 days.</p>}
 {project.slug==='srm'&&<p>The university project has a capacity of 425 tonnes. The separate Om Vinayaga Hostel Block installation delivered 400 TR in 15 days. These represent different project scopes.</p>}
 {project.slug==='relevantz'&&<p>The capacity covers phases I and II at Chennai One.</p>}
 <a href="/#contact" className="primary-button">Discuss a similar project <Arrow diagonal/></a></div>
 <dl><div><dt>Project site</dt><dd>{project.name}</dd></div><div><dt>Contracting client</dt><dd>{project.client}</dd></div><div><dt>Capacity</dt><dd>{project.capacity} tonnes*</dd></div></dl></section>
 <div className="project-page-note section-pad"><p className="fine-print">*Capacity is shown in tonnes. Project sites and contracting clients are identified separately.</p></div>
 <Link href={'/projects/'+next.slug} className="next-project section-pad"><span className="mono">NEXT PROJECT</span><span>{next.name}</span><Arrow diagonal/></Link>
 </main></>;
}
