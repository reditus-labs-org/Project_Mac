'use client';
import Link from 'next/link';
import {useEffect,useRef,useState} from 'react';
import {projects,sectors,type Project} from '@/data/projects';
import {Arrow,Plus} from './Icons';
export default function Portfolio(){
 const [filter,setFilter]=useState('All');const [expanded,setExpanded]=useState(false);const [selected,setSelected]=useState<Project|null>(null);
 const modal=useRef<HTMLDialogElement>(null);
 useEffect(()=>{const d=modal.current;if(selected)d?.showModal();else d?.close();},[selected]);
 const filtered=projects.filter(p=>filter==='All'||p.sector===filter);
 return <section className="portfolio section-pad" id="work" aria-labelledby="work-heading">
 <div className="section-tag"><span className="dot"/> REAL SPACES. REAL SYSTEMS.</div>
 <div className="work-heading"><h2 id="work-heading" data-reveal>Proof.<br/><em>In practice.</em></h2><div><p>Behind places you know,<br/>engineering you can feel.</p><span className="mono">SELECTED PROJECTS / 01—04</span></div></div>
 <div className="featured-projects">{projects.slice(0,4).map((p,i)=><article key={p.slug} className="featured-project">
 <button className="project-visual" onClick={()=>setSelected(p)} aria-label={'Explore '+p.name}><img src={'/images/'+p.slug+'.webp'} alt={p.name+' project photograph from the MAC portfolio'} width="1280" height="850" loading="lazy"/><span className="project-corner mono">0{i+1} / {p.sector.toUpperCase()}</span><span className="project-open"><Arrow diagonal/></span></button>
 <div className="project-caption"><div><h3><button onClick={()=>setSelected(p)}>{p.name}</button></h3><p>{p.location}</p></div><span>{p.system}<small>VIEW PROJECT ↗</small></span></div></article>)}</div>
 <div className="project-index"><button className="index-toggle" onClick={()=>setExpanded(!expanded)} aria-expanded={expanded} aria-controls="full-project-index"><span>Explore the full portfolio <sup>13</sup></span><Plus open={expanded}/></button>
 {expanded&&<div id="full-project-index"><div className="project-filters" aria-label="Filter projects by sector">{sectors.map(s=><button key={s} onClick={()=>setFilter(s)} className={filter===s?'active':''} aria-pressed={filter===s}>{s}</button>)}</div><p className="sr-only" role="status">{filtered.length} projects shown</p><div className="index-rows">{filtered.map(p=><button onClick={()=>setSelected(p)} key={p.slug}><span>{p.name}</span><span>{p.sector}</span><span>{p.system}</span><Arrow diagonal/></button>)}</div></div>}</div>
 <dialog className="project-dialog" ref={modal} aria-label={selected?.name||'Project details'} onCancel={()=>setSelected(null)} onClick={e=>{if(e.target===e.currentTarget)setSelected(null);}}>
 {selected&&<><button className="dialog-close round-button" onClick={()=>setSelected(null)} aria-label="Close project details">×</button><img className="dialog-project-image" src={'/images/'+selected.slug+'.webp'} alt={selected.name+' from the MAC portfolio'} width="1200" height="700"/><div className="dialog-project-content"><span className="mono">{selected.sector.toUpperCase()} / COMPLETED PROJECT</span><h2>{selected.name}</h2><p>{selected.location}</p><dl><div><dt>System</dt><dd>{selected.system}</dd></div><div><dt>Contracting client</dt><dd>{selected.client}</dd></div><div><dt>Capacity listed</dt><dd>{selected.capacity} <small>tonnes*</small></dd></div></dl>
 {selected.slug==='stanley'&&<p className="project-note">The portfolio also records the milestone “950 TR in 45 days” for Stanley Government Hospital.</p>}
 {selected.slug==='srm'&&<p className="project-note">The separate Om Vinayaga Hostel Block milestone is 400 TR in 15 days. This project entry lists 425; the scopes are kept distinct.</p>}
 {selected.slug==='relevantz'&&<p className="project-note">Capacity covers phases I and II, as listed in the portfolio.</p>}
 <p className="fine-print">Source: MAC portfolio, PDF page {selected.page}. *Capacity terminology is preserved from the source. The project site and contracting client are shown separately.</p><Link className="text-link project-page-link" href={'/projects/'+selected.slug}>Open project page <Arrow diagonal/></Link><a href="#contact" className="primary-button" onClick={()=>setSelected(null)}>Discuss a similar project <Arrow diagonal/></a></div></>}
 </dialog></section>;
}
