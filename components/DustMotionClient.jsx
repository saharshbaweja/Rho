'use client';

import {useEffect,useRef,useState} from 'react';
import {Plane} from 'lucide-react';

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

export function HomeReveal({children,delay=0,className='',as='div',variant='up',threshold=.15}){
 const ref=useRef(null);const[visible,setVisible]=useState(false);
 useEffect(()=>{const el=ref.current;if(!el)return;
  if(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches){setVisible(true);return}
  const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){setVisible(true);observer.disconnect()}},{threshold});
  observer.observe(el);return()=>observer.disconnect();
 },[threshold]);
 const Tag=as;
 return <><style dangerouslySetInnerHTML={{__html:REVEAL_CSS}}/><Tag ref={ref} className={`home-reveal home-reveal-${variant} ${visible?'home-reveal-in':''} ${className}`.trim()} style={{transitionDelay:visible?`${delay}ms`:undefined}}>{children}</Tag></>
}

function useReducedMotionPref(){
 const[reduced,setReduced]=useState(false);
 useEffect(()=>{const mq=window.matchMedia('(prefers-reduced-motion: reduce)');setReduced(mq.matches);const h=e=>setReduced(e.matches);mq.addEventListener('change',h);return()=>mq.removeEventListener('change',h)},[]);
 return reduced;
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

function FeatureHoverVisual({index}){
 if(index===0)return <div className="dm-hover-scene scene-context"><div className="hv-aeros">A</div><div className="hv-source s1">WX</div><div className="hv-source s2">NOTAM</div><div className="hv-source s3">RULES</div><div className="hv-source s4">CREW</div><span className="hv-line l1"/><span className="hv-line l2"/><span className="hv-line l3"/><span className="hv-line l4"/></div>;
 if(index===1)return <div className="dm-hover-scene scene-change"><div className="hv-mini-title">Mission AO-2418</div><div className="hv-change-row"><span>14:04</span><b>TAF amended</b><em>MATERIAL</em></div><div className="hv-change-row"><span>14:05</span><b>Runway NOTAM</b><em>REVIEW</em></div><div className="hv-change-row mute"><span>14:07</span><b>Ramp note</b><em>IGNORE</em></div><div className="hv-pulse"/></div>;
 if(index===2)return <div className="dm-hover-scene scene-evidence"><div className="hv-evidence-card"><small>CONDITION</small><b>KASE ceiling ↓</b></div><div className="hv-evidence-arrow">↓</div><div className="hv-evidence-card"><small>OPERATOR RULE</small><b>GOM §4.12</b></div><div className="hv-evidence-arrow">↓</div><div className="hv-evidence-card dark"><small>RESULT</small><b>Alternate review</b></div></div>;
 return <div className="dm-hover-scene scene-options"><div className="hv-option active"><span>01</span><div><b>Add KDEN alternate</b><small>0 min · +420 lb fuel</small></div><strong>92</strong></div><div className="hv-option"><span>02</span><div><b>Delay 45 min</b><small>+45 min · no fuel change</small></div><strong>84</strong></div><div className="hv-option"><span>03</span><div><b>KEGE recovery</b><small>+180 lb fuel</small></div><strong>71</strong></div></div>;
}

export function InteractiveFeatureCard({index,title,desc,accent='blue',icon}){
 const wrapperRef=useRef(null),trackerRef=useRef(null),rafRef=useRef(null),pendingRef=useRef(null);
 const[active,setActive]=useState(false);const reduced=useReducedMotionPref();
 const write=()=>{rafRef.current=null;const t=trackerRef.current,n=pendingRef.current;if(t&&n)t.style.transform=`translate3d(${n.x}px,${n.y}px,0)`};
 const move=(x,y)=>{pendingRef.current={x,y};if(rafRef.current===null)rafRef.current=requestAnimationFrame(write)};
 useEffect(()=>()=>{if(rafRef.current!==null)cancelAnimationFrame(rafRef.current)},[]);
 const enter=e=>{const w=wrapperRef.current,t=trackerRef.current;if(!w||!t)return;const r=w.getBoundingClientRect();const x=e.clientX-r.left,y=e.clientY-r.top;t.style.transform=`translate3d(${x}px,${y}px,0)`;pendingRef.current={x,y};setActive(true)};
 const leave=()=>setActive(false);
 const mouse=e=>{const w=wrapperRef.current;if(!w)return;const r=w.getBoundingClientRect();move(e.clientX-r.left,e.clientY-r.top)};
 return <div ref={wrapperRef} className="dm-feature-wrap" onMouseEnter={enter} onMouseLeave={leave} onMouseMove={mouse}>
  <HomeReveal as="article" delay={index*80} className={`dm-feature accent-${accent}`}>
   <div className="dm-feature-number"><span>0{index+1}</span><i/></div>
   <div className="dm-feature-icon">{icon}</div><h3>{title}</h3><p>{desc}</p>
  </HomeReveal>
  {!reduced&&<div ref={trackerRef} aria-hidden="true" className="dm-feature-tracker"><div className={`dm-feature-float ${active?'active':''}`}><FeatureHoverVisual index={index}/></div></div>}
 </div>
}
