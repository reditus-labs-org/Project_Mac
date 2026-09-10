'use client';
import {useEffect,useRef,type RefObject} from 'react';
import * as THREE from 'three';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import gsap from 'gsap';

type Props={progress:RefObject<number>;view:'auto'|'assembled'|'exploded';rotate:boolean;onReady:()=>void;onFailure:()=>void};
type Part={object:THREE.Object3D;origin:THREE.Vector3;offset:THREE.Vector3};
const clamp=THREE.MathUtils.clamp;
export default function Equipment(props:Props){
 const mount=useRef<HTMLDivElement>(null);const current=useRef(props);current.current=props;
 useEffect(()=>{
  const host=mount.current;if(!host)return;
  let renderer:THREE.WebGLRenderer;
  try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'high-performance'});}catch{current.current.onFailure();return;}
  const scene=new THREE.Scene();
  renderer.setClearColor(0x000000,0);renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.6));
  renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;
  host.appendChild(renderer.domElement);renderer.domElement.setAttribute('aria-hidden','true');
  const camera=new THREE.PerspectiveCamera(33,1,.1,100);camera.position.set(7,4.6,9);
  const pmrem=new THREE.PMREMGenerator(renderer);const room=new RoomEnvironment();
  const env=pmrem.fromScene(room,.04);scene.environment=env.texture;room.dispose();pmrem.dispose();
  scene.add(new THREE.AmbientLight(0xffffff,.65));
  const key=new THREE.DirectionalLight(0xfffaf0,3.8);key.position.set(4,7,5);scene.add(key);
  const rim=new THREE.DirectionalLight(0xb8c8ff,2.6);rim.position.set(-5,2,-3);scene.add(rim);
  const fill=new THREE.DirectionalLight(0xffffff,1.3);fill.position.set(-3,4,7);scene.add(fill);
  const mat=(color:number,metalness=.65,roughness=.32)=>new THREE.MeshStandardMaterial({color,metalness,roughness});
  const silver=mat(0xb8bfbc,.88,.29),edge=mat(0x7c8982,.88,.28),dark=mat(0x202a27,.7,.33);
  const black=mat(0x101917,.5,.4),copper=mat(0xc58152,.87,.25),blue=mat(0x254fff,.45,.26),paper=mat(0xd8ddd6,.5,.36);
  const allMaterials:THREE.Material[]=[silver,edge,dark,black,copper,blue,paper];
  const assembly=new THREE.Group();scene.add(assembly);
  const parts:Part[]=[];const fans:THREE.Group[]=[];
  // Reuse identical geometry without changing the shape or placement of any part.
  const geometryCache=new Map<string,THREE.BufferGeometry>();
  function geometry(key:string,create:()=>THREE.BufferGeometry){
   let value=geometryCache.get(key);if(!value){value=create();geometryCache.set(key,value);}return value;
  }
  function box(parent:THREE.Object3D,w:number,h:number,d:number,x:number,y:number,z:number,m:THREE.Material){
   const o=new THREE.Mesh(geometry(`box:${w}:${h}:${d}`,()=>new THREE.BoxGeometry(w,h,d)),m);o.position.set(x,y,z);parent.add(o);return o;
  }
  function cylinder(parent:THREE.Object3D,r:number,len:number,x:number,y:number,z:number,m:THREE.Material,axis:'x'|'y'|'z'='z'){
   const o=new THREE.Mesh(geometry(`cylinder:${r}:${len}`,()=>new THREE.CylinderGeometry(r,r,len,40)),m);if(axis==='z')o.rotation.x=Math.PI/2;if(axis==='x')o.rotation.z=Math.PI/2;o.position.set(x,y,z);parent.add(o);return o;
  }
  function pipe(parent:THREE.Object3D,points:number[][],r:number,m:THREE.Material){
   const curve=new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p as [number,number,number])),false,'catmullrom',.2);
   const mesh=new THREE.Mesh(new THREE.TubeGeometry(curve,48,r,10,false),m);parent.add(mesh);return mesh;
  }
  function part(offset:THREE.Vector3){const group=new THREE.Group();assembly.add(group);parts.push({object:group,origin:group.position.clone(),offset});return group;}
  // Base, frame and isolated vibration feet.
  box(assembly,5.3,.18,2.15,0,-1.3,0,dark);
  for(const x of [-2.35,2.35])for(const z of [-.85,.85]){
   cylinder(assembly,.17,.14,x,-1.45,z,black,'y');box(assembly,.29,2.5,.16,x,0,z,silver);
  }
  for(const z of [-1,1]){box(assembly,5.3,.11,.12,0,1.22,z,edge);box(assembly,5.3,.13,.12,0,-1.19,z,edge);}
  // Rear panel separates away from the frame.
  const rear=part(new THREE.Vector3(0,.12,-1.65));box(rear,5,.03,2,0,-1.13,0,silver);box(rear,5,2.27,.075,0,0,-.97,paper);
  for(let i=0;i<26;i++)box(rear,.025,2.1,.03,-2.42+i*.194,0,-1.025,edge);
  // A pair of independently moving top panels.
  for(const x of [-1.28,1.28]){
   const top=part(new THREE.Vector3(x*.26,1.5,0));box(top,2.5,.09,2.05,x,1.25,0,silver);
   for(const z of [-.86,.86])for(const dx of [-1.08,1.08]){const bolt=cylinder(top,.035,.02,x+dx,1.307,z,dark,'y');bolt.rotation.y=Math.PI/6;}
  }
  // Dense heat exchanger fins; instanced to keep the scene light.
  const coil=part(new THREE.Vector3(-1.7,0,.08));
  const finGeo=new THREE.BoxGeometry(.018,2.13,1.58);const fins=new THREE.InstancedMesh(finGeo,silver,64);const matrix=new THREE.Matrix4();
  for(let i=0;i<64;i++){matrix.makeTranslation(-2.17+i*.032,0,-.02);fins.setMatrixAt(i,matrix);}coil.add(fins);
  for(const y of [-.88,-.48,-.08,.32,.72]){
   pipe(coil,[[-2.23,y,.83],[-2.4,y,.95],[-2.47,y+.12,.95],[-2.4,y+.25,.95],[-2.23,y+.25,.83]],.04,copper);
   box(coil,1.98,.025,.07,-1.18,y,.84,edge);
  }
  for(const z of [-.84,.84]){box(coil,2.15,.09,.09,-1.19,1.08,z,edge);box(coil,2.15,.09,.09,-1.19,-1.08,z,edge);}
  // Twin axial fan group, sculpted individual blades.
  const fanPanel=part(new THREE.Vector3(.45,0,1.7));
  box(fanPanel,2.5,2.21,.08,1.12,0,.87,dark);
  const bladeShape=new THREE.Shape();bladeShape.moveTo(.08,-.03);bladeShape.bezierCurveTo(.26,-.16,.46,-.11,.43,.08);bladeShape.bezierCurveTo(.4,.22,.19,.22,.10,.09);bladeShape.closePath();
  const bladeGeometry=new THREE.ExtrudeGeometry(bladeShape,{depth:.018,bevelEnabled:true,bevelSegments:1,steps:1,bevelSize:.012,bevelThickness:.01});
  for(const x of [.57,1.72]){
   const ring=new THREE.Mesh(new THREE.TorusGeometry(.49,.055,12,64),silver);ring.position.set(x,.24,.99);fanPanel.add(ring);
   const innerRing=new THREE.Mesh(new THREE.TorusGeometry(.44,.023,8,64),black);innerRing.position.set(x,.24,1.045);fanPanel.add(innerRing);
   cylinder(fanPanel,.44,.08,x,.24,.96,black);
   const fan=new THREE.Group();fan.position.set(x,.24,1.03);fanPanel.add(fan);fans.push(fan);
   for(let i=0;i<7;i++){
    const blade=new THREE.Mesh(bladeGeometry,edge);
    blade.rotation.z=i/7*Math.PI*2;fan.add(blade);
   }
   cylinder(fan,.115,.12,0,0,.075,silver);cylinder(fan,.045,.125,0,0,.085,blue);
   // Stationary concentric safety rings.
   for(const r of [.19,.29,.39]){
    const grill=new THREE.Mesh(new THREE.TorusGeometry(r,.006,4,48),silver);grill.position.set(x,.24,1.15);fanPanel.add(grill);
   }
   for(let i=0;i<4;i++){const bar=box(fanPanel,.93,.01,.01,x,.24,1.155,edge);bar.rotation.z=i*Math.PI/4;}
  }
  for(let i=0;i<12;i++)box(fanPanel,2.14,.014,.025,1.12,-.53+i*.034,.933,edge);
  // Product label, authored directly as part of the model.
  const labelCanvas=document.createElement('canvas');labelCanvas.width=768;labelCanvas.height=160;
  const ctx=labelCanvas.getContext('2d');
  if(ctx){ctx.fillStyle='#202a27';ctx.fillRect(0,0,768,160);ctx.fillStyle='#e5e8e2';ctx.font='bold 66px Arial';ctx.fillText('MAC',24,79);ctx.font='19px monospace';ctx.fillText('ENGINEERING SERVICES',220,61);ctx.font='15px monospace';ctx.fillStyle='#a2ada7';ctx.fillText('AIR HANDLING / SYSTEM 01',220,94);ctx.fillStyle='#254fff';ctx.fillRect(24,115,715,7);}
  const labelTexture=new THREE.CanvasTexture(labelCanvas);labelTexture.colorSpace=THREE.SRGBColorSpace;
  const labelMaterial=new THREE.MeshBasicMaterial({map:labelTexture});allMaterials.push(labelMaterial);
  const label=new THREE.Mesh(new THREE.PlaneGeometry(1.96,.4),labelMaterial);label.position.set(1.1,-.83,.931);fanPanel.add(label);
  // Side grille and copper supply/return pipes.
  const side=part(new THREE.Vector3(1.35,.05,0));box(side,.085,2.22,1.94,2.48,0,0,paper);
  for(let i=0;i<15;i++)box(side,.02,.04,1.55,2.533,-.92+i*.128,0,dark);
  for(const y of [-.76,.78]){
   pipe(assembly,[[2.3,y,-.7],[2.8,y,-.7],[2.94,y,-.52],[2.94,y,.46],[3.09,y,.63]],.067,copper);
   cylinder(assembly,.115,.22,3.08,y,.63,silver,'x');cylinder(assembly,.13,.06,3.22,y,.63,blue,'x');
  }
  // Grounding shadow texture; no costly shadow pass on every frame.
  const shadowCanvas=document.createElement('canvas');shadowCanvas.width=128;shadowCanvas.height=128;
  const sc=shadowCanvas.getContext('2d');
  if(sc){const gradient=sc.createRadialGradient(64,64,8,64,64,64);gradient.addColorStop(0,'rgba(27,36,27,0.27)');gradient.addColorStop(.45,'rgba(27,36,27,0.12)');gradient.addColorStop(1,'rgba(27,36,27,0)');sc.fillStyle=gradient;sc.fillRect(0,0,128,128);}
  const shadowTexture=new THREE.CanvasTexture(shadowCanvas);const shadowMaterial=new THREE.MeshBasicMaterial({map:shadowTexture,transparent:true,depthWrite:false});allMaterials.push(shadowMaterial);
  const shadow=new THREE.Mesh(new THREE.PlaneGeometry(10,6),shadowMaterial);shadow.rotation.x=-Math.PI/2;shadow.position.y=-1.57;scene.add(shadow);
  // A schematic building, revealed in the third scroll chapter.
  const building=new THREE.Group();building.visible=false;scene.add(building);
  let buildingBuilt=false;
  function buildBuilding(){
  if(buildingBuilt)return;buildingBuilt=true;
  const slabMat=mat(0xc5cbc4,.35,.55);const glassMat=new THREE.MeshPhysicalMaterial({color:0x9cafa4,metalness:.1,roughness:.1,transparent:true,opacity:.17,depthWrite:false});
  const pathMat=new THREE.MeshStandardMaterial({color:0x254fff,emissive:0x254fff,emissiveIntensity:.25,metalness:.25,roughness:.4});
  allMaterials.push(slabMat,glassMat,pathMat);
  box(building,5.3,.17,3.1,0,-1.4,0,slabMat);
  for(let floor=0;floor<4;floor++){
   const y=-1.15+floor*.82;
   box(building,4.8,.1,2.7,0,y,0,slabMat);
   for(const x of [-2.28,-.78,.78,2.28])for(const z of [-1.25,1.25])box(building,.075,.74,.075,x,y+.42,z,edge);
   box(building,4.5,.69,.02,0,y+.40,1.27,glassMat);
   for(const x of [-1.8,-.6,.6,1.8]){
    pipe(building,[[2,y+.54,-.65],[x,y+.54,-.65],[x,y+.54,.6]],.025,pathMat);
    box(building,.32,.035,.22,x,y+.53,.65,silver);
   }
  }
  box(building,4.95,.15,2.84,0,2.2,0,silver);
  for(let i=0;i<3;i++){box(building,.6,.4,.55,-1.35+i*.9,2.46,0,dark);cylinder(building,.17,.04,-1.35+i*.9,2.68,0,edge,'y');}
  pipe(building,[[2.45,-1.25,-.65],[2.45,2.6,-.65],[.4,2.6,-.65]],.045,pathMat);
  }
  // Airflow tracers travel along a legible circuit around the equipment.
  const flowPath=new THREE.CatmullRomCurve3([new THREE.Vector3(-3.7,-.4,.4),new THREE.Vector3(-2,-.25,.4),new THREE.Vector3(0,.18,.4),new THREE.Vector3(2.6,.38,.4),new THREE.Vector3(3.8,.62,-.1)]);
  const points=new Float32Array(72*3);const flowGeo=new THREE.BufferGeometry();flowGeo.setAttribute('position',new THREE.BufferAttribute(points,3));
  const flowMat=new THREE.PointsMaterial({color:0x254fff,size:.035,transparent:true,opacity:.65,depthWrite:false});allMaterials.push(flowMat);
  const flow=new THREE.Points(flowGeo,flowMat);assembly.add(flow);
  const pointer=new THREE.Vector2();let visible=true;let paused=document.hidden;let last=0,elapsed=0,explosion=0,spin=0;let lastRendered=-1;
  let width=0,height=0,ready=false;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const resize=()=>{width=host.clientWidth;height=host.clientHeight;if(!width||!height)return;renderer.setSize(width,height,false);camera.aspect=width/height;camera.fov=width<700?40:33;camera.updateProjectionMatrix();lastRendered=-1;};
  const ro=new ResizeObserver(resize);ro.observe(host);resize();
  const io=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;last=0;},{rootMargin:'100px'});io.observe(host);
  const move=(e:PointerEvent)=>{if(e.pointerType==='touch')return;const r=host.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width-.5,(e.clientY-r.top)/r.height-.5);};
  const reset=()=>pointer.set(0,0);
  host.addEventListener('pointermove',move);host.addEventListener('pointerleave',reset);
  const visibility=()=>{paused=document.hidden;last=0;};document.addEventListener('visibilitychange',visibility);
  const lost=(e:Event)=>{e.preventDefault();current.current.onFailure();};renderer.domElement.addEventListener('webglcontextlost',lost);
  const render=(time:number)=>{
   if(!visible||paused||!width||!height)return;
   const delta=last?Math.min(time-last,.05):1/60;last=time;elapsed+=delta;
   const state=current.current;const p=state.progress.current;const mobile=width<700;
   let target=state.view==='exploded'?1:state.view==='assembled'?0:clamp((p-.2)/.30,0,1);
   if(reduced.matches)target=state.view==='exploded'?1:0;
   explosion=THREE.MathUtils.damp(explosion,target,5,delta);
   const buildingPhase=state.view==='auto'&&!reduced.matches?clamp((p-.65)/.18,0,1):0;
   // Prepare the later chapter only as the visitor approaches it, including restored scroll positions.
   if(state.view==='auto'&&!reduced.matches&&p>.5)buildBuilding();
   assembly.visible=buildingPhase<.99;building.visible=buildingPhase>.01;
   assembly.scale.setScalar((mobile?.83:1)*(1-buildingPhase*.8));
   building.scale.setScalar((mobile?.9:1.12)*(.6+.4*buildingPhase));
   assembly.position.set(mobile?0:.25,-.08-buildingPhase*.5,0);
   building.position.y=-.45;
   for(const part of parts)part.object.position.copy(part.origin).addScaledVector(part.offset,explosion);
   if(state.rotate&&!reduced.matches)spin+=delta*.28;
   const rot=state.rotate?spin:-.20+(reduced.matches?0:pointer.x*.15);
   assembly.rotation.y=THREE.MathUtils.damp(assembly.rotation.y,rot,4,delta);
   assembly.rotation.x=THREE.MathUtils.damp(assembly.rotation.x,reduced.matches?0:pointer.y*.055,4,delta);
   building.rotation.y=THREE.MathUtils.damp(building.rotation.y,state.rotate?spin:-.35+pointer.x*.12,4,delta);
   if(!reduced.matches){
    for(const fan of fans)fan.rotation.z-=delta*(1.6+explosion*.6);
    for(let i=0;i<72;i++){const t=(i/72+elapsed*.12)%1;const v=flowPath.getPoint(t);points[i*3]=v.x;points[i*3+1]=v.y+Math.sin(i*9.7)*.20;points[i*3+2]=v.z+Math.cos(i*6.1)*.15;}flowGeo.attributes.position.needsUpdate=true;
   }
   flow.visible=explosion>.12;
   const distance=mobile?1.3:1.05;
   camera.position.set(7*distance,4.3*distance,9*distance);
   camera.lookAt(mobile?0:-.2,.02,0);
   if(reduced.matches&&Math.abs(explosion-target)<.001&&lastRendered===target)return;
   renderer.render(scene,camera);lastRendered=target;
   if(!ready){ready=true;current.current.onReady();}
  };
  gsap.ticker.add(render);render(0);
  return()=>{
   gsap.ticker.remove(render);ro.disconnect();io.disconnect();document.removeEventListener('visibilitychange',visibility);
   host.removeEventListener('pointermove',move);host.removeEventListener('pointerleave',reset);renderer.domElement.removeEventListener('webglcontextlost',lost);
   const geometries=new Set<THREE.BufferGeometry>();
   scene.traverse(o=>{if(o instanceof THREE.Mesh||o instanceof THREE.Points)geometries.add(o.geometry);});
   geometries.forEach(g=>g.dispose());geometryCache.clear();
   allMaterials.forEach(m=>m.dispose());labelTexture.dispose();shadowTexture.dispose();env.dispose();renderer.dispose();renderer.domElement.remove();
  };
 },[]);
 return <div ref={mount} className="equipment-canvas" role="img" aria-label="Interactive illustrative HVAC assembly with fan, coil, casing and pipework. Use the controls to explore the model."/>;
}
