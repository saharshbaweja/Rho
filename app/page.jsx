import Link from 'next/link';
import {Activity,ArrowUpRight,BookOpen,Check,CloudSun,FileCheck2,GitBranch,Plane,RadioTower,ShieldCheck,Sparkles,UsersRound,Wrench} from 'lucide-react';
import MissionDecisionDemo from '../components/MissionDecisionDemo';
import HomeProductStories from '../components/HomeProductStories';

const scope=[
 [BookOpen,'Operator rules','OpSpecs, GOM, company minima, MEL/CDL, training requirements and controlled procedures.'],
 [CloudSun,'Live environment','Weather, NOTAMs, airport/runway state, approach data, charts and changing operational conditions.'],
 [UsersRound,'Crew + aircraft','Qualification, currency, duty, assigned tail, maintenance state and mission-specific aircraft limits.'],
 [Activity,'Impact analysis','Aeros continuously determines what changed, what it affects and which conclusion must be revisited.'],
 [Sparkles,'Operational options','Ranked, source-backed paths forward based on company rules and the current state of the flight.'],
 [FileCheck2,'Briefing + monitoring','One reviewed brief for dispatch and crew, continuously updated as the operation changes.']
];

const story=[
 {n:'01',eyebrow:'MISSION INTAKE',title:'Turn the request into an operational mission.',body:'A trip request, schedule feed or dispatcher entry becomes a structured flight with route, timing, passengers, aircraft and crew. Aeros immediately attaches the operator knowledge and live sources that matter.',type:'intake'},
 {n:'02',eyebrow:'IMPACT ANALYSIS',title:'See what the conditions actually mean.',body:'Instead of separate weather, NOTAM, crew, aircraft and document tabs, Aeros evaluates them against the operator’s rules and shows the exact constraint, current condition, source and review state.',type:'impact',flip:true},
 {n:'03',eyebrow:'THE AEROS DIFFERENCE',title:'When the plan breaks, get viable options—not another alert.',body:'Aeros does not stop at “weather changed” or “runway unavailable.” It generates and compares the operational paths that remain possible under the company’s procedures, aircraft, crew and live environment.',type:'options'},
 {n:'04',eyebrow:'BRIEFING',title:'Turn the reviewed decision into a flight-ready brief.',body:'Dispatch keeps the full evidence trail while the crew receives the concise operating picture: restrictions, actions, changes, sources and what still needs acknowledgement.',type:'brief',flip:true},
 {n:'05',eyebrow:'CONTINUOUS MONITORING',title:'Re-evaluate what changed instead of starting over.',body:'Aeros keeps watching the flight. When weather, NOTAMs, timing, crew or aircraft state changes, it identifies the affected conclusions and tells the team exactly what needs another look.',type:'monitor'}
];

export default function Home(){return <div className="aeros-site final-home">
 <section className="as-hero final-hero">
  <div className="final-hero-copy">
   <div className="as-kicker">THE AI INTELLIGENCE + OPERATIONS LAYER FOR FLIGHT OPERATIONS</div>
   <h1>Understand the flight.<br/>Know what to do next.</h1>
   <p className="as-hero-copy">Aeros connects operator-specific procedures with live flight conditions to continuously evaluate operational impact, surface the evidence, and generate viable options for dispatchers and pilots.</p>
   <div className="as-actions"><Link href="/contact/" className="as-btn dark">Request a demo <ArrowUpRight size={12}/></Link><Link href="/dashboard/" className="as-btn">Explore the product</Link></div>
   <div className="hero-proof"><span><i/> Operator-specific reasoning</span><span><i/> Source-backed decisions</span><span><i/> Continuous re-evaluation</span></div>
  </div>
  <div className="as-product-stage final-product-stage"><div className="product-frame-label"><span>LIVE PRODUCT</span><b>AO-1842 · KTEB → EGLL</b></div><MissionDecisionDemo compact/></div>
 </section>

 <section className="scope-strip"><div className="scope-strip-inner"><span>Aeros connects</span>{['OpSpecs','GOM','MEL / CDL','Crew','Aircraft','Weather','NOTAMs','Charts','Airport data'].map(x=><b key={x}>{x}</b>)}</div></section>

 <section className="as-section story-intro"><div className="as-section-head"><div><div className="as-eyebrow">FROM INFORMATION TO OPERATIONAL INTELLIGENCE</div><h2>The data already exists. The missing layer understands how it changes the flight.</h2></div><p>Pilots and dispatchers do not need another weather app, NOTAM viewer, PDF search tool or chatbot. They need a trusted system that can continuously combine those sources with the operator’s own rules and explain the operational consequence.</p></div><div className="story-principle-grid"><article><span>01</span><h3>What is true?</h3><p>Collect the operator rules, flight state and live environment.</p></article><article><span>02</span><h3>What does it affect?</h3><p>Evaluate every material condition against the specific mission.</p></article><article><span>03</span><h3>What can we do?</h3><p>Generate viable, ranked paths forward with source evidence.</p></article></div></section>

 <section className="product-story-shell">{story.map((s,i)=><article className={'product-story-row '+(s.flip?'flip':'')} key={s.n}><div className="product-story-copy"><span className="story-index">{s.n}</span><div className="as-eyebrow">{s.eyebrow}</div><h2>{s.title}</h2><p>{s.body}</p><Link href={s.type==='options'?'/dashboard/':'/product/'}>{s.type==='options'?'Open the option workflow':'Explore the platform'} <ArrowUpRight size={12}/></Link></div><div className="product-story-media"><HomeProductStories type={s.type}/></div></article>)}</section>

 <section className="as-section alt platform-scope"><div className="as-inner"><div className="as-section-head"><div><div className="as-eyebrow">ONE INTELLIGENCE LAYER</div><h2>Every operational source stays attached to the mission.</h2></div><p>Aeros is designed as the connective reasoning layer above the systems an operator already trusts. It does not need to replace scheduling, maintenance or crew systems on day one to make the operation more intelligent.</p></div><div className="as-grid-3">{scope.map(([I,t,d])=><article className="as-card scope-card" key={t}><span className="as-icon"><I size={17}/></span><h3>{t}</h3><p>{d}</p></article>)}</div></div></section>

 <section className="architecture-stage"><div className="architecture-image"><div className="architecture-copy"><div className="as-eyebrow">THE OPERATING MODEL</div><h2>Static rules. Dynamic conditions. One continuously updated decision.</h2><p>The mission stays in the center while Aeros continuously connects company procedures, flight state and the live environment.</p></div><div className="architecture-stack"><div><small>DATA FOUNDATION</small><b>Rules + operational truth</b><span>OpSpecs · Manuals · Crew · Aircraft · Weather · NOTAMs · Charts</span></div><div><small>AEROS INTELLIGENCE</small><b>Reason across the mission</b><span>Normalize · Match · Evaluate · Explain · Generate options</span></div><div><small>OPERATIONAL OUTPUT</small><b>Decision + action</b><span>Mission review · Option table · Briefing · Monitoring · Exception management</span></div></div></div></section>

 <section className="as-section future-scope"><div className="as-section-head"><div><div className="as-eyebrow">PART 135 FIRST. OCC NEXT.</div><h2>A narrow entry point into a much larger operating layer.</h2></div><p>Start where mission review is still manually assembled. As Aeros earns trust, the same reasoning system can expand into planning, monitoring, recovery and eventually OCC-wide orchestration.</p></div><div className="future-rail"><div><span>NOW</span><h3>Part 135 mission intelligence</h3><p>Mission acceptance, operator rules, live conditions, option generation and briefing.</p></div><i>→</i><div><span>NEXT</span><h3>Dispatch + flight monitoring</h3><p>Manage more flights by exception with continuous automated reasoning.</p></div><i>→</i><div><span>LONG TERM</span><h3>AI operating layer for the OCC</h3><p>Coordinate dispatch, aircraft, crew, maintenance and disruption decisions across the operation.</p></div></div></section>

 <section className="visual-cta"><div className="visual-cta-image"><div><div className="as-eyebrow">BUILD WITH THE OPERATION</div><h2>Bring one real flight. We’ll show you what the intelligence layer should know.</h2><p>The fastest way to prove Aeros is to run the same mission your team reviews today and compare the search, interpretation and re-review work side by side.</p><div className="as-actions"><Link href="/contact/" className="as-btn">Become a design partner</Link><Link href="/dashboard/" className="as-btn dark">Open live product</Link></div></div></div></section>
 </div>}
