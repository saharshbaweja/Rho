'use client';
import {useState} from 'react';
import Link from 'next/link';
import {ArrowUpRight,Plane,ShieldCheck,CloudSun,FileText,Users,Wrench,Radio,CheckCircle2,AlertTriangle,Search,ChevronRight,MapPin,BookOpen,Activity,Plug} from 'lucide-react';

const sources=[
 [BookOpen,'OpSpecs & manuals','Approved authorizations, company procedures, operating limitations, MEL/CDL guidance and internal policy.'],
 [CloudSun,'Live conditions','Weather, NOTAMs, airport status, runway changes, TFRs and operational alerts.'],
 [Plane,'Aircraft state','Tail-specific maintenance status, deferred items, performance context and aircraft eligibility.'],
 [Users,'Crew legality','Qualifications, currency, duty/rest, training status and company-specific crew requirements.'],
 [MapPin,'Airport & chart context','Relevant procedures, airport constraints and chart references for the planned mission.'],
 [Plug,'Connected systems','Trip requests, schedule, flight status and other operational systems already used by the operator.']
];

const checks=[
 {label:'Aircraft',status:'CLEAR',detail:'N905CR · Citation CJ3 · no blocking maintenance item'},
 {label:'Crew',status:'CLEAR',detail:'Smith / Lopez · current and within duty limits'},
 {label:'OpSpecs',status:'REVIEW',detail:'Destination requires mountain-airport review'},
 {label:'Weather',status:'REVIEW',detail:'Forecast deterioration after 21Z · alternate required'},
 {label:'NOTAMs',status:'CLEAR',detail:'3 relevant notices surfaced · 1 runway timing conflict'},
 {label:'Company procedure',status:'ACTION',detail:'Chief Pilot acknowledgement required before release'}
];

function MissionSurface(){
 const [active,setActive]=useState(2);
 return <div className="hf-product hero-product">
  <div className="hf-product-top"><div className="hf-brand"><Plane size={14}/><b>AEROS</b></div><div className="hf-search"><Search size={12}/> Ask about mission AER-2418…</div><div className="hf-weather"><CloudSun size={13}/> KPDK → KASE</div><span className="hf-avatar">DO</span></div>
  <div className="hf-product-body">
   <aside className="hf-side"><button className="active"><Radio size={14}/>Mission</button><button><FileText size={14}/>Rules</button><button><CloudSun size={14}/>Live data</button><button><Users size={14}/>Crew</button><button><Plane size={14}/>Aircraft</button><button><Activity size={14}/>Changes</button></aside>
   <main className="hf-work">
    <div className="hf-work-head"><div><small>MISSION AER-2418</small><h3>KPDK → KASE · 14:30Z</h3></div><button>Ready for review <ArrowUpRight size={12}/></button></div>
    <div className="hf-stat-row"><div><span>Mission state</span><b>CONDITIONAL</b></div><div><span>Blocking items</span><b>0</b></div><div><span>Actions required</span><b>2</b></div></div>
    <div className="hf-main-grid"><section className="hf-table"><div className="hf-table-title"><b>Mission checks</b><span>Live</span></div>{checks.map((r,i)=><button key={r.label} className={active===i?'selected':''} onClick={()=>setActive(i)}><span>{r.label}</span><b>{r.status}</b><span>{r.detail}</span><span>Source linked</span><em>{r.status}</em></button>)}</section><aside className="hf-inspector"><div className="hf-inspector-icon"><ShieldCheck size={20}/></div><small>WHY THIS MATTERS</small><h4>{checks[active].label}</h4><p>{checks[active].detail}. Aeros ties the conclusion back to the exact operator rule or live source used for the assessment.</p><button>View source <ChevronRight size={12}/></button></aside></div>
   </main>
  </div>
 </div>
}

export default function Home(){return <div className="hf-site">
 <section className="hf-hero"><div className="hf-hero-row"><div><div className="hf-eyebrow">AI MISSION INTELLIGENCE FOR PART 135</div><h1>Know what matters<br/>before the flight moves.</h1></div><div className="hf-hero-side"><p>Aeros connects OpSpecs, company manuals, MEL/CDL, crew and aircraft status with live weather, NOTAMs, airport information, charts, and trip data—then turns it into one cited mission brief for dispatcher and pilot review.</p><div><Link className="hf-dark-btn" href="/contact/">Request a demo</Link><Link className="hf-text-btn" href="/dashboard/">Open mission workspace →</Link></div></div></div><MissionSurface/></section>

 <section className="hf-cred"><h2>Built for regulated flight operations where the answer depends on the operator, aircraft, crew, airport, and mission.</h2><div>{['PART 135 OPERATORS','DIRECTORS OF OPERATIONS','CHIEF PILOTS','DISPATCHERS','FLIGHT CREWS'].map(x=><span key={x}>{x}</span>)}</div></section>

 <section className="fsp-section"><div className="fsp-section-head"><div><div className="fsp-kicker">ONE MISSION. MANY SOURCES.</div><h2>Stop searching across manuals, tabs, PDFs, and operational systems.</h2></div><p>Aeros builds a company-specific operating context, then filters the information for the mission in front of you. The goal is not to summarize aviation in general. It is to surface what is relevant to this operator and this flight.</p></div><div className="fsp-cap-grid">{sources.map(([I,t,d])=><article className="fsp-cap-card" key={t}><div className="fsp-cap-icon"><I size={19}/></div><h3>{t}</h3><p>{d}</p></article>)}</div></section>

 <section className="hf-introducing"><div className="hf-eyebrow">THE AEROS LOOP</div><h2>Request → evaluate → brief → monitor.</h2><p>A trip request becomes a structured mission. Aeros evaluates the applicable operator rules and live conditions, produces a reviewable brief, and keeps watching for changes until departure.</p><Link className="hf-dark-btn" href="/product/mission-intelligence">See mission intelligence</Link><div className="hf-intro-visual"><div className="hf-intro-node n1">OPSPECS</div><div className="hf-intro-node n2">CREW + AIRCRAFT</div><div className="hf-intro-node n3">WEATHER + NOTAMS</div><div className="hf-intro-node n4">AIRPORT + CHARTS</div><div className="hf-intro-core"><span>A</span><b>MISSION-SPECIFIC DECISION CONTEXT</b></div></div></section>

 <section className="fsp-section"><div className="fsp-section-head"><div><div className="fsp-kicker">WHAT AEROS PRODUCES</div><h2>A live mission brief, not another generic chatbot.</h2></div><p>The workspace shows status, issues, required actions, source citations, and what changed. The AI interface is there for questions; the dashboard remains the operational source of truth.</p></div><div className="fsp-compare"><div><small>BEFORE</small><h3>Manual operational review.</h3><ul><li>Search OpSpecs and manuals</li><li>Check weather and NOTAMs separately</li><li>Verify crew legality and aircraft state</li><li>Cross-reference airport and procedure restrictions</li><li>Recheck everything when the mission changes</li></ul></div><div><small>WITH AEROS</small><h3>Mission-specific intelligence.</h3><ul><li>Relevant rules surfaced automatically</li><li>Live data filtered to the planned mission</li><li>Issues ranked by operational significance</li><li>Every conclusion linked to evidence</li><li>Changes highlighted since the last review</li></ul></div></div></section>

 <section className="hf-ai-section"><div className="hf-ai-copy"><div className="hf-eyebrow">CONTINUOUS MONITORING</div><h2>Three things changed since your last review.</h2><p>Aeros keeps watching the live environment after the first brief. When weather deteriorates, a NOTAM appears, the aircraft changes, or crew legality shifts, it identifies exactly what needs another look.</p><div className="hf-checks">{['Runway status changed','Alternate no longer meets company criteria','Replacement aircraft carries a relevant deferred item','Crew duty window moved'].map(x=><span key={x}><CheckCircle2 size={14}/>{x}</span>)}</div><Link className="hf-dark-btn" href="/product/alerts">Explore change monitoring</Link></div><div className="fsp-cap-card" style={{alignSelf:'center'}}><div className="fsp-cap-icon"><AlertTriangle size={20}/></div><small>CHANGE DETECTED · 18:42Z</small><h3>KASE forecast changed</h3><p>The destination forecast now crosses the operator’s planning threshold after 21Z. Aeros marked the alternate selection for review and linked the applicable company procedure.</p><strong>Open impact review →</strong></div></section>

 <section className="hf-security"><div><div className="hf-eyebrow">HUMAN-IN-THE-LOOP BY DESIGN</div><h2>Decision support for regulated operations.</h2><p>Aeros does not replace the authorized person responsible for operational control. It reduces search, cross-checking, and repetitive review while keeping the evidence and approval trail visible.</p><Link className="hf-dark-btn" href="/enterprise/">Trust & control</Link></div><div className="hf-security-grid">{[[ShieldCheck,'Source-backed conclusions'],[FileText,'Versioned operator documents'],[Users,'Role-based review'],[Activity,'Durable decision history']].map(([I,t])=><article key={t}><I size={21}/><h3>{t}</h3><p>Designed so a dispatcher, Chief Pilot, or Director of Operations can see what Aeros used and why the item was surfaced.</p></article>)}</div></section>

 <section className="hf-final"><div><div className="hf-eyebrow">PART 135 DESIGN PARTNERS</div><h2>Bring us one mission-review workflow your team still does by hand.</h2></div><div><Link className="hf-dark-btn" href="/contact/">Apply as a design partner</Link><Link className="hf-text-btn" href="/product/">Explore the platform →</Link></div></section>
 </div>}
