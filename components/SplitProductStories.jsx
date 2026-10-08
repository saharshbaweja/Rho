'use client';
import Link from 'next/link';
import {ArrowUpRight,Check,CloudSun,FileCheck2,Mail,RadioTower,Sparkles} from 'lucide-react';
import HomeProductStories from './HomeProductStories';

const stories=[
 {id:'intake',n:'01',eyebrow:'MISSION INTAKE',title:'Turn an incoming request into an operational mission.',body:'Aeros structures the trip, attaches the operator knowledge that applies, and begins evaluating live context before anyone starts hunting through tabs, inboxes, or PDFs.',points:['Email / schedule / API intake','Crew + aircraft attached','Relevant rules loaded automatically'],icon:Mail,href:'/product/mission-intelligence'},
 {id:'impact',n:'02',eyebrow:'IMPACT ANALYSIS',title:'Make the consequence of every change obvious.',body:'Weather, NOTAMs, crew state, aircraft state and operator policy are evaluated together. Every conclusion shows the current condition, the applied rule, the source, and the review state.',points:['Condition → rule → result','Source-backed evidence','Only material issues elevated'],icon:CloudSun,href:'/product/mission-intelligence',flip:true},
 {id:'options',n:'03',eyebrow:'OPERATIONAL OPTIONS',title:'Give the team viable paths forward—not another alert.',body:'When the current plan stops working, Aeros generates alternatives, re-checks each one against the same mission constraints, and ranks the tradeoffs across delay, fuel, crew, risk and approvals.',points:['Generate feasible alternatives','Re-run every constraint','Compare impact side by side'],icon:Sparkles,href:'/dashboard/'},
 {id:'brief',n:'04',eyebrow:'BRIEFING',title:'Turn reviewed intelligence into a flight-ready brief.',body:'Dispatch keeps the complete evidence trail while pilots receive the concise operating picture: restrictions, changes, required actions, acknowledgements and the sources behind them.',points:['Dispatcher + pilot views','Required actions upfront','Citations stay attached'],icon:FileCheck2,href:'/product/briefing',flip:true},
 {id:'monitor',n:'05',eyebrow:'CONTINUOUS MONITORING',title:'Re-evaluate what changed instead of starting over.',body:'Aeros watches the mission after the initial review. When a TAF, NOTAM, ETA, crew assignment or aircraft state changes, only the dependent conclusions are recalculated and surfaced.',points:['Dependency-aware monitoring','Changed conclusions only','Continuous mission state'],icon:RadioTower,href:'/product/alerts'}
];

function tilt(e){
 const el=e.currentTarget;
 const r=el.getBoundingClientRect();
 const x=(e.clientX-r.left)/r.width-.5;
 const y=(e.clientY-r.top)/r.height-.5;
 el.style.setProperty('--story-rx',`${(-y*1.8).toFixed(2)}deg`);
 el.style.setProperty('--story-ry',`${(x*2.7).toFixed(2)}deg`);
}
function reset(e){e.currentTarget.style.setProperty('--story-rx','0deg');e.currentTarget.style.setProperty('--story-ry','0deg')}

export default function SplitProductStories(){
 return <section className="split-product-stories">
   <div className="split-stories-intro"><div><span className="as-eyebrow">THE PRODUCT, END TO END</span><h2>Five operational moments. Five product surfaces.</h2></div><p>Each part of the workflow gets its own workspace because the job changes from intake to evaluation to recovery to briefing. The intelligence layer stays underneath all of them.</p></div>
   <div className="split-stories-list">{stories.map((s,i)=>{const Icon=s.icon;return <article className={`split-story-chapter ${s.flip?'flip':''}`} key={s.id}>
     <div className="split-story-copy">
       <div className="split-story-index">{s.n}</div>
       <div className="as-eyebrow">{s.eyebrow}</div>
       <h2>{s.title}</h2>
       <p>{s.body}</p>
       <div className="split-story-points">{s.points.map(point=><span key={point}><i><Check size={11}/></i>{point}</span>)}</div>
       <Link href={s.href}>Explore this workflow <ArrowUpRight size={12}/></Link>
     </div>
     <div className="split-story-visual">
       <div className="split-story-meta"><span><Icon size={13}/>{s.eyebrow}</span><b>Live product surface</b><em>Interactive</em></div>
       <div className="story-device" onPointerMove={tilt} onPointerLeave={reset}>
         <div className="story-device-lid"><div className="story-device-camera"/><div className="story-device-screen"><HomeProductStories type={s.id}/></div></div>
         <div className="story-device-base"><span/></div>
       </div>
       <div className="story-device-caption"><span>0{i+1}</span><b>{s.eyebrow}</b><p>{s.points[0]}</p></div>
     </div>
   </article>})}</div>
 </section>
}
