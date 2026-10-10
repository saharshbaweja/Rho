'use client';

import Link from 'next/link';
import {useEffect,useRef,useState} from 'react';
import {ArrowUpRight,BookOpen,CloudSun,FileCheck2,Plane,RadioTower,SearchCheck,ShieldCheck,UsersRound} from 'lucide-react';

const REVEAL_CSS=`
.home-reveal{opacity:0;transition-property:opacity,transform,letter-spacing;transition-duration:500ms;transition-timing-function:cubic-bezier(.215,.61,.355,1)}
.home-reveal-up{transform:translate3d(0,14px,0)}
.home-reveal-right{transform:translate3d(-6px,0,0)}
.home-reveal-photo{opacity:0;transform:scale(1.04);transition-duration:700ms}
.home-reveal-running{opacity:.35;letter-spacing:.06em;transition-duration:700ms;transition-timing-function:cubic-bezier(.165,.84,.44,1)}
.home-reveal-in.home-reveal-up,.home-reveal-in.home-reveal-right,.home-reveal-in.home-reveal-photo{opacity:1;transform:none}
.home-reveal-in.home-reveal-running{opacity:1;letter-spacing:normal}
@media(prefers-reduced-motion:reduce){.home-reveal,.home-reveal-up,.home-reveal-right,.home-reveal-photo,.home-reveal-running{opacity:1;transform:none;letter-spacing:normal;transition:none}}
`;

function HomeReveal({children,delay=0,className='',as='div',variant='up',threshold=.15}){
 const ref=useRef(null);const[visible,setVisible]=useState(false);
 useEffect(()=>{const el=ref.current;if(!el)return;
  if(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches){setVisible(true);return}
  const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){setVisible(true);observer.disconnect()}},{threshold});
  observer.observe(el);return()=>observer.disconnect();
 },[threshold]);
 const Tag=as;
 return <Tag ref={ref} className={`home-reveal home-reveal-${variant} ${visible?'home-reveal-in':''} ${className}`.trim()} style={{transitionDelay:visible?`${delay}ms`:undefined}}>{children}</Tag>
}

function useReducedMotionPref(){
 const[reduced,setReduced]=useState(false);
 useEffect(()=>{const mq=window.matchMedia('(prefers-reduced-motion: reduce)');setReduced(mq.matches);const h=e=>setReduced(e.matches);mq.addEventListener('change',h);return()=>mq.removeEventListener('change',h)},[]);
 return reduced;
}

export function DmButton({href='/contact/',children,secondary=false}){return <Link href={href} className={secondary?'dm-btn dm-btn-secondary':'dm-btn dm-btn-primary'}>{children}{!secondary&&<ArrowUpRight size={14}/>}</Link>}

export function DmPageHero({eyebrow,title,body,primary='Request a demo',primaryHref='/contact/',secondary='Open Aeros',secondaryHref='/dashboard/',visual=true}){
 return <section className="dm-page-hero"><style dangerouslySetInnerHTML={{__html:REVEAL_CSS}}/><div className="dm-page-hero-copy"><HomeReveal><div className="dm-eyebrow">{eyebrow}</div><h1>{title}</h1></HomeReveal><HomeReveal delay={80}><p>{body}</p></HomeReveal><HomeReveal delay={160}><div className="dm-actions"><DmButton href={primaryHref}>{primary}</DmButton><DmButton href={secondaryHref} secondary>{secondary} →</DmButton></div></HomeReveal></div>{visual&&<HomeReveal delay={80} className="dm-hero-reveal" variant="photo"><MissionCanvas/></HomeReveal>}</section>
}

export function MissionCanvas(){
 const ref=useRef(null);
 const onMove=e=>{const r=ref.current?.getBoundingClientRect();if(!r)return;const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;ref.current.style.setProperty('--px',`${x*12}px`);ref.current.style.setProperty('--py',`${y*10}px`)};
 const onLeave=()=>{ref.current?.style.setProperty('--px','0px');ref.current?.style.setProperty('--py','0px')};
 return <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className="dm-mission-canvas" aria-label="Aeros mission intelligence illustration">
 <div className="dm-canvas-grid"/>
 <div className="dm-flight-path"><span className="dm-airport a">KPDK</span><span className="dm-route-line"/><Plane size={19}/><span className="dm-route-line"/><span className="dm-airport b">KASE</span></div>
 <div className="dm-person p1"><span>DP</span><div><b>Dispatch</b><small>Reviewing change</small></div></div>
 <div className="dm-person p2"><span>CP</span><div><b>Chief Pilot</b><small>Crew current</small></div></div>
 <div className="dm-person p3"><span>AI</span><div><b>Aeros</b><small>Evaluating mission</small></div></div>
 <div className="dm-floating-card fc1"><small>WEATHER</small><b>KASE TAF amended</b><span>Ceiling trend ↓</span></div>
 <div className="dm-floating-card fc2"><small>OPERATOR RULE</small><b>Alternate review required</b><span>GOM §4.12</span></div>
 <div className="dm-floating-card fc3"><small>AIRCRAFT</small><b>N905CR · CJ3+</b><span>Available · MEL clear</span></div>
 <div className="dm-decision-card"><div><small>RECOMMENDED PATH</small><b>Add KDEN alternate</b><span>Preserve departure · +420 lb fuel</span></div><strong>92</strong></div>
 </div>
}

export function DmTrustedStrip(){const labels=['Operator rules','Weather','NOTAMs','Aircraft','Crew','Airport state','Mission history','Source evidence'];return <section className="dm-trusted"><HomeReveal><div className="dm-trusted-title">One operating context across the sources that already run the flight.</div></HomeReveal><div className="dm-marquee"><div>{[...labels,...labels].map((x,i)=><span key={i}>{x}</span>)}</div></div></section>}

export function DmSplit({eyebrow,title,body,children,reverse=false,tone='white'}){return <section className={`dm-split ${reverse?'reverse':''} tone-${tone}`}><HomeReveal className="dm-split-copy"><div className="dm-eyebrow">{eyebrow}</div><h2>{title}</h2><p>{body}</p></HomeReveal><HomeReveal delay={100} className="dm-split-visual" variant="photo">{children||<DecisionTraceVisual/>}</HomeReveal></section>}

export function DecisionTraceVisual(){return <div className="dm-trace-visual"><div className="dm-trace-head"><span>Mission AO-2418</span><em>Live evaluation</em></div><div className="dm-trace-row"><small>01</small><div><b>Condition</b><span>KASE ceiling forecast amended</span></div></div><div className="dm-trace-arrow">↓</div><div className="dm-trace-row"><small>02</small><div><b>Rule</b><span>Operator alternate planning criteria</span></div></div><div className="dm-trace-arrow">↓</div><div className="dm-trace-row dark"><small>03</small><div><b>Impact</b><span>Destination review required</span></div></div><div className="dm-trace-option"><small>OPTION</small><b>Add KDEN alternate</b><span>0 min delay · +420 lb fuel · crew legal</span></div></div>}

function FeatureHoverVisual({index}){
 if(index===0)return <div className="dm-hover-scene scene-context"><div className="hv-aeros">A</div><div className="hv-source s1">WX</div><div className="hv-source s2">NOTAM</div><div className="hv-source s3">RULES</div><div className="hv-source s4">CREW</div><span className="hv-line l1"/><span className="hv-line l2"/><span className="hv-line l3"/><span className="hv-line l4"/></div>;
 if(index===1)return <div className="dm-hover-scene scene-change"><div className="hv-mini-title">Mission AO-2418</div><div className="hv-change-row"><span>14:04</span><b>TAF amended</b><em>MATERIAL</em></div><div className="hv-change-row"><span>14:05</span><b>Runway NOTAM</b><em>REVIEW</em></div><div className="hv-change-row mute"><span>14:07</span><b>Ramp note</b><em>IGNORE</em></div><div className="hv-pulse"/></div>;
 if(index===2)return <div className="dm-hover-scene scene-evidence"><div className="hv-evidence-card"><small>CONDITION</small><b>KASE ceiling ↓</b></div><div className="hv-evidence-arrow">↓</div><div className="hv-evidence-card"><small>OPERATOR RULE</small><b>GOM §4.12</b></div><div className="hv-evidence-arrow">↓</div><div className="hv-evidence-card dark"><small>RESULT</small><b>Alternate review</b></div></div>;
 return <div className="dm-hover-scene scene-options"><div className="hv-option active"><span>01</span><div><b>Add KDEN alternate</b><small>0 min · +420 lb fuel</small></div><strong>92</strong></div><div className="hv-option"><span>02</span><div><b>Delay 45 min</b><small>+45 min · no fuel change</small></div><strong>84</strong></div><div className="hv-option"><span>03</span><div><b>KEGE recovery</b><small>+180 lb fuel</small></div><strong>71</strong></div></div>;
}

function HoverFeatureCard({item,index}){
 const wrapperRef=useRef(null),trackerRef=useRef(null),rafRef=useRef(null),pendingRef=useRef(null);
 const[active,setActive]=useState(false);const reduced=useReducedMotionPref();
 const write=()=>{rafRef.current=null;const t=trackerRef.current,n=pendingRef.current;if(t&&n)t.style.transform=`translate3d(${n.x}px,${n.y}px,0)`};
 const move=(x,y)=>{pendingRef.current={x,y};if(rafRef.current===null)rafRef.current=requestAnimationFrame(write)};
 useEffect(()=>()=>{if(rafRef.current!==null)cancelAnimationFrame(rafRef.current)},[]);
 const enter=e=>{const w=wrapperRef.current,t=trackerRef.current;if(!w||!t)return;const r=w.getBoundingClientRect();const x=e.clientX-r.left,y=e.clientY-r.top;t.style.transform=`translate3d(${x}px,${y}px,0)`;pendingRef.current={x,y};setActive(true)};
 const leave=()=>setActive(false);
 const mouse=e=>{const w=wrapperRef.current;if(!w)return;const r=w.getBoundingClientRect();move(e.clientX-r.left,e.clientY-r.top)};
 const [title,desc,accent='blue',Icon=SearchCheck]=item;
 return <div ref={wrapperRef} className="dm-feature-wrap" onMouseEnter={enter} onMouseLeave={leave} onMouseMove={mouse}>
  <HomeReveal as="article" delay={index*80} className={`dm-feature accent-${accent}`}>
   <div className="dm-feature-number"><span>0{index+1}</span><i/></div>
   <div className="dm-feature-icon"><Icon size={18}/></div><h3>{title}</h3><p>{desc}</p>
  </HomeReveal>
  {!reduced&&<div ref={trackerRef} aria-hidden="true" className="dm-feature-tracker"><div className={`dm-feature-float ${active?'active':''}`}><FeatureHoverVisual index={index}/></div></div>}
 </div>
}

export function DmFeatureGrid({eyebrow,title,body,items}){return <section className="dm-features"><div className="dm-center-copy"><HomeReveal><div className="dm-eyebrow">{eyebrow}</div><h2>{title}</h2></HomeReveal><HomeReveal delay={100}><p>{body}</p></HomeReveal></div><div className="dm-feature-grid">{items.map((item,i)=><HoverFeatureCard key={item[0]} item={item} index={i}/>)}</div></section>}

export function DmSteps({eyebrow,title,body,items,dark=false}){return <section className={`dm-steps ${dark?'dark':''}`}><HomeReveal className="dm-steps-copy"><div className="dm-eyebrow">{eyebrow}</div><h2>{title}</h2><p>{body}</p></HomeReveal><div className="dm-step-list">{items.map((item,i)=><HomeReveal as="article" delay={i*70} key={item[0]}><span>0{i+1}</span><div><h3>{item[0]}</h3><p>{item[1]}</p></div></HomeReveal>)}</div></section>}

export function DmQuoteLike({title,body,label='THE OPERATING MODEL'}){return <section className="dm-quote-like"><HomeReveal><div className="dm-eyebrow">{label}</div><h2>{title}</h2><p>{body}</p></HomeReveal><HomeReveal variant="photo" delay={100} className="dm-quote-art"><div className="dm-quote-orbit one"/><div className="dm-quote-orbit two"/><div className="dm-quote-center"><Plane size={22}/><b>Aeros</b><span>Mission state</span></div><div className="dm-quote-node n1">Weather</div><div className="dm-quote-node n2">Rules</div><div className="dm-quote-node n3">Crew</div><div className="dm-quote-node n4">Aircraft</div></HomeReveal></section>}

export function DmRoleBand(){const roles=[[RadioTower,'Dispatch & OCC','Manage by exception instead of rebuilding mission context.'],[BookOpen,'Directors of Operations','Turn approved procedures into a controlled decision layer.'],[UsersRound,'Chief pilots','Keep crew eligibility and company limits attached to the mission.'],[Plane,'Pilots','Receive concise briefs from the same reviewed evidence.']];return <section className="dm-role-band"><div className="dm-center-copy"><HomeReveal><div className="dm-eyebrow">ONE OPERATING PICTURE</div><h2>Shared context for everyone responsible for the flight.</h2></HomeReveal></div><div className="dm-role-grid">{roles.map(([Icon,title,desc],i)=><HomeReveal as="article" delay={i*65} key={title}><Icon size={18}/><div><h3>{title}</h3><p>{desc}</p></div><ArrowUpRight size={13}/></HomeReveal>)}</div></section>}

export function DmSecurityBand(){return <section className="dm-security"><HomeReveal><div className="dm-eyebrow">CONTROL BEFORE AUTONOMY</div><h2>Designed for decisions people have to stand behind.</h2><p>Aeros keeps source evidence, operator-specific rules, missing context and human review boundaries visible throughout the workflow.</p></HomeReveal><div className="dm-security-grid">{[[ShieldCheck,'Human authority','Recommendations remain reviewable before action.'],[BookOpen,'Controlled knowledge','Operator documents retain source and revision context.'],[FileCheck2,'Decision trace','Material conclusions stay linked to evidence.'],[CloudSun,'Continuous state','Only changes that affect the mission are elevated.']].map(([Icon,t,d],i)=><HomeReveal as="article" delay={i*70} key={t}><Icon size={18}/><h3>{t}</h3><p>{d}</p></HomeReveal>)}</div></section>}

export function DmFinalCTA({eyebrow='DESIGN PARTNERS',title='Bring one real mission. We’ll show you the decision trace.',body='Run Aeros beside your current workflow using the rules and operating context your team already trusts.',primary='Request a demo',primaryHref='/contact/'}){return <section className="dm-final"><HomeReveal><div className="dm-eyebrow">{eyebrow}</div><h2>{title}</h2><p>{body}</p><div className="dm-actions"><DmButton href={primaryHref}>{primary}</DmButton><DmButton href="/dashboard/" secondary>Open the product →</DmButton></div></HomeReveal></section>}

export function DmSimpleCards({items}){return <div className="dm-simple-grid">{items.map((item,i)=><HomeReveal as="article" delay={i*60} key={item[0]}><span>0{i+1}</span><h3>{item[0]}</h3><p>{item[1]}</p></HomeReveal>)}</div>}
