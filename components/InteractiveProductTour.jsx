'use client';
import {useEffect,useRef,useState} from 'react';
import {Activity,BookOpen,ChevronRight,CloudSun,FileCheck2,Sparkles} from 'lucide-react';
import HomeProductStories from './HomeProductStories';

const features=[
 {id:'intake',n:'01',label:'Mission intake',title:'Turn the request into operational context.',body:'Aeros structures the trip, then attaches the operator knowledge and live sources that matter before anyone starts hunting through tabs.',icon:Sparkles,detail:'Email / schedule / API → structured mission'},
 {id:'impact',n:'02',label:'Impact analysis',title:'See exactly why the flight changed.',body:'Every conclusion keeps the current condition, applied company rule, source, and review state together so the operator can audit the reasoning.',icon:Activity,detail:'Condition → rule → operational impact'},
 {id:'options',n:'03',label:'Operational options',title:'Get viable paths forward, not another alert.',body:'Aeros generates options, re-runs each one against the same constraints, and compares delay, fuel, crew, risk and required approvals.',icon:CloudSun,detail:'Generate → evaluate → rank → compare'},
 {id:'brief',n:'04',label:'Briefing',title:'Turn reviewed intelligence into a usable brief.',body:'Dispatch keeps the evidence trail while pilots get the concise operating picture: restrictions, changes, actions and source-backed context.',icon:FileCheck2,detail:'One reviewed state → role-specific output'},
 {id:'monitor',n:'05',label:'Continuous monitoring',title:'Re-evaluate only what the new condition affects.',body:'When weather, NOTAMs, timing, aircraft or crew changes, Aeros identifies the dependent conclusions and updates the decision surface.',icon:BookOpen,detail:'Change detected → impacted rules re-run'}
];

export default function InteractiveProductTour(){
 const [active,setActive]=useState(0);
 const [paused,setPaused]=useState(false);
 const frame=useRef(null);
 useEffect(()=>{if(paused)return;const id=setInterval(()=>setActive(v=>(v+1)%features.length),7000);return()=>clearInterval(id)},[paused]);
 const f=features[active];
 const tilt=e=>{const el=frame.current;if(!el)return;const r=el.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;el.style.setProperty('--rx',`${(-y*2.3).toFixed(2)}deg`);el.style.setProperty('--ry',`${(x*3.4).toFixed(2)}deg`)};
 const reset=()=>{const el=frame.current;if(!el)return;el.style.setProperty('--rx','0deg');el.style.setProperty('--ry','0deg')};
 return <section className="intel-tour" onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)}>
   <div className="intel-tour-head"><div><div className="as-eyebrow">THE PRODUCT, END TO END</div><h2>One intelligence layer. Five moments that change the operation.</h2></div><p>Move through the workflow the way a dispatcher would. Every screen below is a product surface, not a marketing illustration.</p></div>
   <div className="intel-tour-grid">
    <aside className="intel-tour-nav">{features.map((item,i)=>{const Icon=item.icon;return <button key={item.id} className={i===active?'active':''} onClick={()=>setActive(i)}><span className="tour-number">{item.n}</span><span className="tour-icon"><Icon size={15}/></span><span className="tour-label"><b>{item.label}</b><small>{item.detail}</small></span><ChevronRight size={13}/></button>})}</aside>
    <div className="intel-tour-stage">
      <div className="tour-copy-mobile"><span>{f.n} · {f.label}</span><h3>{f.title}</h3><p>{f.body}</p></div>
      <div ref={frame} className="product-laptop" onPointerMove={tilt} onPointerLeave={reset}>
       <div className="laptop-lid"><div className="laptop-camera"/><div className="laptop-screen"><HomeProductStories type={f.id}/></div></div>
       <div className="laptop-base"><span/></div>
      </div>
      <div className="tour-caption"><div><span>{f.n} · {f.label.toUpperCase()}</span><h3>{f.title}</h3></div><p>{f.body}</p></div>
      <div className="tour-progress">{features.map((x,i)=><button key={x.id} className={i===active?'active':''} onClick={()=>setActive(i)} aria-label={`Show ${x.label}`}><span/></button>)}</div>
    </div>
   </div>
  </section>
}
