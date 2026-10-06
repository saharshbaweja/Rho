'use client';
import {useState} from 'react';
import Link from 'next/link';
import {Activity,AlertTriangle,ArrowUpRight,Bell,BookOpen,Check,ChevronRight,CloudSun,FileCheck2,FileText,Globe2,MapPin,Plane,RadioTower,Route,Search,ShieldCheck,Sparkles,UsersRound,Wrench} from 'lucide-react';

const statusItems=[
 ['Weather','CLEAR','No significant risks','good',CloudSun],
 ['NOTAMs','2 REVIEW','Arrival impact','warn',RadioTower],
 ['Operator Rules','COMPLIANT','All requirements met','good',BookOpen],
 ['Crew Legality','LEGAL','Duty limits OK','good',UsersRound],
 ['Aircraft Status','READY','No open defects','good',Plane],
 ['Destination','CLEAR','Operating normally','good',MapPin]
];

const findings=[
 {tone:'bad',title:'Arrival airport construction NOTAM',body:'Runway 27R construction overlaps the planned arrival window. Review alternate runway options and fuel.',source:'NOTAM EGLL A1234/24'},
 {tone:'warn',title:'Moderate convective activity en route',body:'Scattered storms are forecast over the North Atlantic. A northern routing option may reduce exposure.',source:'NOAA SIGWX · 18:00Z'},
 {tone:'good',title:'Crew rest within limits',body:'Assigned crew remains within reviewed duty and rest limits for the mission.',source:'Crew duty record'}
];

function RouteMap({compact=false}){
 return <div className={'visual-map '+(compact?'compact':'')}>
   <div className="map-glow one"/><div className="map-glow two"/>
   <div className="map-label origin"><b>KTEB</b><span>Teterboro</span></div>
   <div className="map-label destination"><b>EGLL</b><span>London</span></div>
   <svg viewBox="0 0 1000 360" preserveAspectRatio="none" aria-hidden="true">
    <path className="route-shadow" d="M85 270 C 330 165, 630 150, 915 95"/>
    <path className="route-line" d="M85 270 C 330 165, 630 150, 915 95"/>
    <circle cx="85" cy="270" r="7" className="route-dot"/><circle cx="915" cy="95" r="7" className="route-dot"/>
    <g className="route-plane"><text x="0" y="0">✈</text><animateMotion dur="8s" repeatCount="indefinite" path="M85 270 C 330 165, 630 150, 915 95"/></g>
   </svg>
   {!compact&&<div className="map-metrics"><div><span>Distance</span><b>5,973 km</b></div><div><span>Flight time</span><b>5h 52m</b></div><div><span>Cruise</span><b>FL410</b></div><div><span>ETA</span><b>22:15 BST</b></div><div><span>Fuel</span><b>28,400 lb</b></div></div>}
 </div>
}

function ProductStage(){
 const [selected,setSelected]=useState(0);
 const item=findings[selected];
 return <div className="hero-product-shell">
  <div className="browser-chrome"><span/><span/><span/><div className="browser-url">app.aeros.com</div></div>
  <div className="product-frame">
   <aside className="product-nav"><div className="product-brand"><span><Plane size={13}/></span><b>Aeros</b></div>{['Missions','Mission Brief','Change Monitor','Live Data','Crew','Aircraft','Compliance','Reports'].map((x,i)=><button className={i===0?'active':''} key={x}><span>{i===0?<Route size={13}/>:i===1?<FileCheck2 size={13}/>:i===2?<Activity size={13}/>:i===3?<CloudSun size={13}/>:i===4?<UsersRound size={13}/>:i===5?<Plane size={13}/>:i===6?<ShieldCheck size={13}/>:<Globe2 size={13}/>}</span>{x}</button>)}</aside>
   <main className="product-main">
    <div className="product-topbar"><div className="mini-search"><Search size={12}/>Search missions, flights, airports, crew, NOTAMs…</div><div className="product-user"><Bell size={13}/><span>SC</span><b>Sarah Chen</b></div></div>
    <div className="mission-title"><div><small>MISSION AO-1842</small><h3>KTEB → EGLL</h3><p>Tue, Jul 16 · Gulfstream G650 (N650AB) · Executive Charter</p></div><div className="mission-actions"><span className="ready-chip">● Ready</span><button>Generate Brief <ArrowUpRight size={10}/></button></div></div>
    <div className="mission-tabs">{['Overview','Route','Weather','NOTAMs','Crew','Aircraft','Compliance','Files'].map((x,i)=><span className={i===0?'active':''} key={x}>{x}</span>)}</div>
    <div className="status-ribbon">{statusItems.map(([t,s,d,tone,I])=><div className="status-card" key={t}><I size={13}/><span>{t}</span><b className={tone}>{s}</b><small>{d}</small></div>)}</div>
    <RouteMap/>
    <section className="decision-card"><div className="decision-head"><div><b>Decision Stack</b><span>2 items need attention</span></div><button>View all →</button></div>{findings.map((f,i)=><button className={'decision-row '+(selected===i?'selected':'')} onClick={()=>setSelected(i)} key={f.title}><span className={'decision-icon '+f.tone}>{f.tone==='good'?<Check size={12}/>:<AlertTriangle size={12}/>}</span><span><b>{f.title}</b><small>{f.body}</small><em>{f.source}</em></span><strong className={f.tone}>{f.tone==='good'?'Clear':f.tone==='bad'?'Action':'Review'}</strong><ChevronRight size={11}/></button>)}</section>
   </main>
   <aside className="product-ai"><div className="ai-title"><span><Sparkles size={13}/></span><div><b>Aeros Intelligence</b><small>Grounded in AO-1842</small></div></div><div className="ai-question">Why does this mission need review?</div><div className="ai-response"><p>This mission needs review because two current conditions could affect the planned arrival:</p><b>1. Arrival airport construction</b><p>{item.title}. {item.body}</p><div className="ai-source"><FileText size={12}/><span><b>{item.source}</b><small>Primary evidence</small></span></div><b>2. En route weather</b><p>Latest forecast guidance shows convective activity along the planned track. Aeros recommends reviewing the northern routing option.</p></div><div className="ai-actions"><button>Show recommended actions <ArrowUpRight size={10}/></button><button>Compare routing options <ArrowUpRight size={10}/></button></div><div className="live-updates"><div className="live-head"><b>Live Updates</b><span>● Live</span></div>{[['NOTAM','New NOTAM affects EGLL','12 min'],['Weather','Convective activity increased','28 min'],['Aircraft','MEL state updated','1 hr'],['Crew','Duty time recalculated','2 hr']].map(([t,d,time])=><div key={d}><span>{t}</span><b>{d}</b><small>{time}</small></div>)}</div></aside>
  </div>
 </div>
}

const visualCards=[
 {icon:Route,title:'Mission Intelligence',copy:'Get a complete operational picture for every mission in seconds.',type:'map'},
 {icon:CloudSun,title:'Live Operational Data',copy:'Weather, NOTAMs, charts and current operational data in one place.',type:'weather'},
 {icon:UsersRound,title:'Crew & Aircraft',copy:'Verify crew legality, duty limits and aircraft state against operator rules.',type:'crew'},
 {icon:FileCheck2,title:'Mission Briefs',copy:'Generate a concise source-backed brief with risks and required actions.',type:'brief'},
 {icon:Bell,title:'Change Monitoring',copy:'Stay ahead when weather, NOTAMs, aircraft or crew state changes.',type:'alerts'}
];

function VisualCard({card}){
 const I=card.icon;
 return <article className="visual-feature-card"><div className="vf-head"><span><I size={16}/></span><div><h3>{card.title}</h3><p>{card.copy}</p></div></div>
 {card.type==='map'&&<RouteMap compact/>}
 {card.type==='weather'&&<div className="weather-visual"><div className="weather-cell w1"/><div className="weather-cell w2"/><div className="weather-cell w3"/><span><AlertTriangle size={11}/>Convective activity · FL350–FL450</span></div>}
 {card.type==='crew'&&<div className="crew-visual">{[['Captain','Legal','8h 12m'],['First Officer','Legal','6h 20m'],['G650 · N650AB','Available','No defects']].map(([a,b,c])=><div key={a}><span>{a}</span><b>{b}</b><small>{c}</small></div>)}</div>}
 {card.type==='brief'&&<div className="brief-visual"><div className="brief-top"><b>Mission Brief · AO-1842</b><span>PDF</span></div>{['Route overview','Weather & significant risks','NOTAMs & airspace','Alternates & contingencies'].map(x=><div key={x}><Check size={10}/>{x}</div>)}</div>}
 {card.type==='alerts'&&<div className="alerts-visual">{[['New NOTAM affects EGLL','12m'],['Weather degraded along route','28m'],['Crew duty time update','1h'],['Aircraft MEL state changed','2h']].map(([a,b],i)=><div key={a}><span className={i<2?'hot':''}>{i<2?'!':'•'}</span><b>{a}</b><small>{b}</small></div>)}</div>}
 </article>
}

export default function Home(){return <div className="aeros-site visual-home">
 <section className="visual-hero">
  <div className="hero-cloudscape"/>
  <div className="hero-copy-block"><div className="a-eyebrow">MISSION INTELLIGENCE FOR AVIATION OPERATIONS</div><h1>Know what matters<br/>before the flight moves.</h1><p>Aeros unifies operator rules, weather, NOTAMs, charts, aircraft status and crew legality into one mission-specific decision workspace.</p><div className="a-actions"><Link href="/contact/" className="a-btn-dark">Get a demo <ArrowUpRight size={11}/></Link><Link href="/dashboard/" className="a-btn-light">See how it works <ChevronRight size={11}/></Link></div><div className="hero-proof"><span><Check size={11}/>Built for operators</span><span><Check size={11}/>Live operational data</span><span><Check size={11}/>Source-backed decisions</span></div></div>
  <div className="hero-product-wrap"><ProductStage/></div>
 </section>

 <section className="visual-capabilities"><div className="visual-feature-grid">{visualCards.map(c=><VisualCard card={c} key={c.title}/>)}</div></section>

 <section className="visual-workflow"><div className="workflow-intro"><div className="a-eyebrow">A SIMPLE WORKFLOW</div><h2>From request to wheels up — with confidence.</h2><p>Turn fragmented operational information into a clear, mission-ready decision surface.</p></div><div className="workflow-steps">{[['01','Request','Create a mission or import a trip request.'],['02','Evaluate','Aeros checks rules, weather, NOTAMs, crew and aircraft.'],['03','Brief','Get a concise, source-backed operational brief.'],['04','Monitor','Stay informed when relevant conditions change.']].map(([n,t,d],i)=><div className="workflow-step" key={n}><span>{n}</span><div><b>{t}</b><p>{d}</p></div>{i<3&&<ChevronRight size={15}/>}</div>)}</div></section>

 <section className="visual-story alt"><div className="story-copy"><div className="a-eyebrow">THE PRODUCT IS THE INTERFACE</div><h2>Dense aviation information, structured so the next decision is obvious.</h2><p>The dispatcher should understand the mission state in seconds. Aeros keeps status structured, AI contextual, and evidence one click away.</p><div className="story-list"><span><ShieldCheck size={15}/>Clear / review / action states across every mission input.</span><span><FileText size={15}/>Every material conclusion linked to its source.</span><span><Activity size={15}/>Only meaningful changes surface after review.</span></div></div><div className="story-visual"><div className="story-window"><div className="story-top"><span>AO-1842 · KTEB → EGLL</span><b>REVIEW REQUIRED</b></div><div className="story-columns"><div><small>MISSION STATE</small>{statusItems.slice(0,4).map(([t,s,,tone])=><div key={t}><span>{t}</span><b className={tone}>{s}</b></div>)}</div><div><small>CHANGED SINCE REVIEW</small><strong>3</strong><p>Weather amendment<br/>Runway closure<br/>ETA moved +14m</p></div></div></div></div></section>

 <section className="visual-story photo-story"><div className="story-photo cockpit"/><div className="story-copy dark-copy"><div className="a-eyebrow">LIVE OPERATIONS</div><h2>Static rules and live reality finally share the same workspace.</h2><p>Aeros combines the operator-specific rule layer with weather, NOTAMs, airport data, crew state and aircraft status so the mission can be reviewed as one system.</p><Link href="/product/mission-intelligence" className="a-btn-light">Explore Mission Intelligence <ArrowUpRight size={11}/></Link></div></section>

 <section className="visual-modules"><div className="module-head"><div><div className="a-eyebrow">ONE OPERATING CONTEXT</div><h2>Every capability explains what you are looking at — and why it matters.</h2></div><p>Like the strongest aviation platforms, Aeros uses real product visuals throughout the site. Unlike a generic suite, every module stays tied to the same active mission and evidence layer.</p></div><div className="module-grid">{[[BookOpen,'OpSpecs & Manuals','Applicable authorizations, procedures and company rules are matched to the mission.'],[CloudSun,'Weather & NOTAMs','Raw feeds are filtered into the few changes that matter operationally.'],[UsersRound,'Crew & Aircraft','Qualification, duty, aircraft state and deferred items stay attached to mission context.'],[FileCheck2,'Mission Briefs','The latest reviewed state becomes a concise dispatcher and pilot brief.'],[Activity,'Change Monitor','Aeros highlights the delta instead of forcing a complete manual re-review.'],[Sparkles,'Aeros Intelligence','Ask questions against the mission while keeping evidence visible beside the answer.']].map(([I,t,d])=><article className="module-card" key={t}><div className="module-icon"><I size={18}/></div><h3>{t}</h3><p>{d}</p><Link href="/product/">Explore <ArrowUpRight size={10}/></Link></article>)}</div></section>

 <section className="visual-final"><div className="final-bg"/><div><div className="a-eyebrow">BUILT FOR REAL OPERATIONS</div><h2>One mission. Every relevant source. One place to decide what needs attention.</h2></div><div className="final-metrics"><div><b>Live</b><span>Operational context</span></div><div><b>Cited</b><span>Decision evidence</span></div><div><b>Human</b><span>Review boundaries</span></div></div><Link href="/contact/" className="a-btn-light">Request a demo <ArrowUpRight size={11}/></Link></section>
 </div>}
