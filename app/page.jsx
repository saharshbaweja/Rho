import Link from 'next/link';
import {Activity,ArrowUpRight,BookOpen,CloudSun,FileCheck2,Sparkles,UsersRound} from 'lucide-react';
import MissionDecisionDemo from '../components/MissionDecisionDemo';
import SplitProductStories from '../components/SplitProductStories';
import IntelligenceLayerDemo from '../components/IntelligenceLayerDemo';

const scope=[
 [BookOpen,'Operator knowledge','OpSpecs, GOM, MEL/CDL, training requirements, company minima and controlled procedures become validated mission context.'],
 [CloudSun,'Live environment','Weather, NOTAMs, airport/runway state, approach data, charts and changing operational conditions stay attached to the flight.'],
 [UsersRound,'Crew + aircraft','Qualification, currency, duty, assigned tail, maintenance state and mission-specific aircraft limits are evaluated together.'],
 [Activity,'Decision engine','Aeros continuously determines what changed, what it affects and which conclusion must be revisited.'],
 [Sparkles,'Operational options','Viable, source-backed paths forward are generated and re-evaluated against the same operator rules.'],
 [FileCheck2,'Briefing + monitoring','One reviewed operational state becomes the dispatcher brief, pilot brief and continuous change monitor.']
];

export default function Home(){return <div className="aeros-site final-home">
 <section className="as-hero final-hero premium-hero">
  <div className="final-hero-copy premium-hero-copy">
   <div className="as-kicker">AI OPERATIONAL INTELLIGENCE FOR FLIGHT OPERATIONS</div>
   <h1>The flight changes.<br/>Aeros already knows what it affects.</h1>
   <p className="as-hero-copy">Aeros combines operator-specific procedures with the live state of a flight to continuously evaluate operational impact, explain the evidence, and generate viable options for dispatchers and pilots.</p>
   <div className="as-actions"><Link href="/contact/" className="as-btn dark">Request a demo <ArrowUpRight size={12}/></Link><Link href="/dashboard/" className="as-btn">Open the live product</Link></div>
   <div className="hero-proof"><span><i/> Operator-specific knowledge</span><span><i/> Deterministic decision trace</span><span><i/> AI explanation + option generation</span></div>
  </div>
  <div className="hero-product-wrap">
   <div className="hero-product-meta"><span>LIVE MISSION WORKSPACE</span><b>AO-1842 · KTEB → EGLL</b><em>Interactive</em></div>
   <div className="hero-laptop"><div className="hero-laptop-lid"><div className="hero-camera"/><div className="hero-laptop-screen"><MissionDecisionDemo compact/></div></div><div className="hero-laptop-base"><span/></div></div>
  </div>
 </section>

 <section className="scope-strip"><div className="scope-strip-inner"><span>Aeros connects</span>{['OpSpecs','GOM','MEL / CDL','Crew','Aircraft','Weather','NOTAMs','Charts','Airport data'].map(x=><b key={x}>{x}</b>)}</div></section>

 <section className="as-section story-intro premium-intro"><div className="as-section-head"><div><div className="as-eyebrow">THE INTELLIGENCE LAYER</div><h2>The information already exists. The hard part is understanding the consequence.</h2></div><p>Pilots and dispatchers already have weather, NOTAMs, charts, manuals and flight data. Aeros is the layer that keeps those sources connected to the operator's own rules and continuously answers: what changed, what does it affect, and what can we do now?</p></div><div className="story-principle-grid premium-principles"><article><span>01</span><h3>Understand the mission</h3><p>Build one structured operating state from trip, crew, aircraft, company knowledge and live data.</p></article><article><span>02</span><h3>Evaluate the impact</h3><p>Run deterministic checks against the rules that actually apply to this operator and flight.</p></article><article><span>03</span><h3>Generate the next move</h3><p>Use AI to explain the trace, compare viable options and communicate the reviewed decision.</p></article></div></section>

 <IntelligenceLayerDemo/>
 <SplitProductStories/>

 <section className="as-section alt platform-scope"><div className="as-inner"><div className="as-section-head"><div><div className="as-eyebrow">ONE OPERATING CONTEXT</div><h2>Every source stays attached to the mission—and to the reason it matters.</h2></div><p>Aeros sits above the systems an operator already trusts. It can add operational intelligence before it replaces a scheduler, maintenance platform, crew system or flight-planning engine.</p></div><div className="as-grid-3">{scope.map(([I,t,d])=><article className="as-card scope-card premium-scope-card" key={t}><span className="as-icon"><I size={17}/></span><h3>{t}</h3><p>{d}</p><Link href="/product/">See the workflow <ArrowUpRight size={11}/></Link></article>)}</div></div></section>

 <section className="architecture-stage premium-architecture"><div className="architecture-image"><div className="architecture-copy"><div className="as-eyebrow">THE OPERATING MODEL</div><h2>Knowledge on the left. Live state on the right. A continuously updated decision in the middle.</h2><p>We intentionally separate source retrieval, deterministic constraint evaluation and generative AI. The model explains and orchestrates; validated operator rules remain the source of truth.</p></div><div className="architecture-stack"><div><small>OPERATOR KNOWLEDGE</small><b>Validated rules + provenance</b><span>OpSpecs · Manuals · MEL/CDL · Training · Company minima</span></div><div><small>AEROS ENGINE</small><b>Evaluate the active mission</b><span>Match · Calculate · Detect dependencies · Generate feasible options</span></div><div><small>AI INTELLIGENCE</small><b>Explain + orchestrate</b><span>Ask Aeros · Option comparison · Briefing · Change summary · Workflow actions</span></div></div></div></section>

 <section className="as-section future-scope"><div className="as-section-head"><div><div className="as-eyebrow">PART 135 FIRST. OCC NEXT.</div><h2>A narrow entry point into a much larger intelligence layer.</h2></div><p>Start where mission review is still manually assembled. As Aeros earns trust, the same operating model expands into dispatch, flight monitoring, recovery and ultimately OCC-wide orchestration.</p></div><div className="future-rail"><div><span>NOW</span><h3>Part 135 mission intelligence</h3><p>Mission acceptance, operator rules, live conditions, options and briefing.</p></div><i>→</i><div><span>NEXT</span><h3>Dispatch + flight monitoring</h3><p>Manage more flights by exception with continuous automated reasoning.</p></div><i>→</i><div><span>LONG TERM</span><h3>AI operating layer for the OCC</h3><p>Coordinate dispatch, aircraft, crew, maintenance and disruption decisions across the operation.</p></div></div></section>

 <section className="visual-cta premium-cta"><div className="visual-cta-image"><div><div className="as-eyebrow">PROVE THE INTELLIGENCE LAYER</div><h2>Bring one real mission and the rules your team uses to review it.</h2><p>Aeros is designed to learn the operator's approved context without hiding it inside a black box. Load the documents, validate the extracted rules, run the mission side-by-side, and compare the decision trace.</p><div className="as-actions"><Link href="/contact/" className="as-btn">Become a design partner</Link><Link href="/dashboard/" className="as-btn dark">Open live product</Link></div></div></div></section>
 </div>}
