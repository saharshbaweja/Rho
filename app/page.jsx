import Link from 'next/link';
import {Activity,ArrowUpRight,BookOpen,Check,CloudSun,FileCheck2,GitBranch,Plane,RadioTower,ShieldCheck,Sparkles,UsersRound,Wrench} from 'lucide-react';
import MissionDecisionDemo from '../components/MissionDecisionDemo';

const capabilities=[
 [BookOpen,'Operator knowledge','OpSpecs, GOM, company minima, MEL/CDL and controlled procedures become a validated operating layer.'],
 [CloudSun,'Live operational data','Weather, NOTAMs, airport/runway state, charts and flight data are continuously evaluated in mission context.'],
 [UsersRound,'Crew + aircraft state','Qualifications, duty, currency, aircraft availability, maintenance and deferred items stay attached to the flight.'],
 [Activity,'Impact analysis','Aeros turns raw changes into operational consequences: what changed, which flight is affected and why it matters.'],
 [FileCheck2,'Decision trace','Every recommendation preserves the rule, observation, source and review state that produced it.'],
 [Sparkles,'Aeros Intelligence','Ask questions against the active mission while the structured dashboard remains the source of operational truth.']
];

export default function Home(){return <div className="aeros-site">
 <section className="as-hero">
  <div>
   <div className="as-kicker">OPERATIONAL INTELLIGENCE FOR FLIGHT OPERATIONS</div>
   <h1>Every mission,<br/>already filtered.</h1>
   <p className="as-hero-copy">Aeros matches every trip against operator rules, aircraft and crew state, weather, NOTAMs, airport data and charts—then tells the team what matters, why, and what to do next.</p>
   <div className="as-actions"><Link href="/contact/" className="as-btn dark">Request a demo <ArrowUpRight size={12}/></Link><Link href="/dashboard/" className="as-btn">Open the product</Link></div>
  </div>
  <div className="as-product-stage"><MissionDecisionDemo compact/></div>
 </section>

 <section className="as-section alt"><div className="as-inner">
  <div className="as-section-head"><div><div className="as-eyebrow">FROM RAW DATA TO AN OPERATIONAL DECISION</div><h2>Stop monitoring information. Start understanding impact.</h2></div><p>Traditional tools surface weather, NOTAMs, manuals and aircraft data separately. Aeros keeps the mission in the center and continuously evaluates each source against the operator’s actual limits and procedures.</p></div>
  <div className="as-flow">{[['01','Mission enters','A schedule feed, charter request or dispatcher creates the operational mission state.'],['02','Aeros checks','Rules, live data, crew and aircraft constraints are matched automatically.'],['03','Impact is explained','The UI shows the condition, applicable limit, pass/fail state and source.'],['04','Team acts','Authorized users review the evidence, resolve exceptions and issue the mission brief.']].map(([n,t,d])=><div key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}</div>
 </div></section>

 <section className="as-section"><div className="as-section-head"><div><div className="as-eyebrow">THE OPERATING CONTEXT</div><h2>One mission. Every relevant source.</h2></div><p>Aeros does not replace operational expertise with a black-box answer. It organizes the information experienced operators already use, applies it to the specific flight and exposes the reasoning chain behind every material finding.</p></div><div className="as-grid-3">{capabilities.map(([I,t,d])=><article className="as-card" key={t}><span className="as-icon"><I size={17}/></span><h3>{t}</h3><p>{d}</p></article>)}</div></section>

 <section className="as-section dark"><div className="as-inner"><div className="as-section-head"><div><div className="as-eyebrow">ONE STACK</div><h2>From controlled knowledge to flight-ready action.</h2></div><p>The long-term advantage is not one clever prompt. It is an operator-specific operational model that remains connected to changing flight state.</p></div><div className="as-stack">
  <div className="as-stack-card"><small>DATA FOUNDATION</small><h3>What is true?</h3><ul>{['OpSpecs + manuals','MEL / CDL','Crew + aircraft records','Weather + NOTAMs','Airport + chart data'].map(x=><li key={x}><Check size={11}/>{x}</li>)}</ul></div>
  <div className="as-stack-card"><small>AEROS INTELLIGENCE LAYER</small><h3>What matters for this flight?</h3><ul>{['Normalize operational data','Match operator-specific rules','Evaluate constraints','Explain impact','Track what changed'].map(x=><li key={x}><Check size={11}/>{x}</li>)}</ul></div>
  <div className="as-stack-card"><small>DECISION LAYER</small><h3>What should the operation do next?</h3><ul>{['Mission acceptance','Dispatcher review','Pilot briefing','Continuous monitoring','Exception management'].map(x=><li key={x}><Check size={11}/>{x}</li>)}</ul></div>
 </div></div></section>

 <section className="as-section"><div className="as-section-head"><div><div className="as-eyebrow">PART 135 FIRST</div><h2>Start where the workflow is painful and the deployment can move fast.</h2></div><p>For Part 135 operators, Aeros begins with mission acceptance and review: can this certificate holder operate this trip, with this aircraft and crew, under current conditions? That creates the operational primitives needed to move upmarket.</p></div><div className="as-grid-3">{[[Plane,'Mission acceptance','Turn a request into an operationally reviewed mission before the team commits.'],[ShieldCheck,'Operator-specific compliance','Apply the certificate holder’s own authorizations, limitations and procedures.'],[RadioTower,'Continuous re-evaluation','When the environment changes, re-evaluate only the conclusions affected.']].map(([I,t,d])=><article className="as-card" key={t}><span className="as-icon"><I size={17}/></span><h3>{t}</h3><p>{d}</p></article>)}</div></section>

 <div className="as-banner"><div className="as-banner-copy"><div className="as-eyebrow" style={{color:'#aeb8b1'}}>THE LONG ARC</div><h2>From mission intelligence to an AI operating layer for the OCC.</h2><p>As Aeros earns trust, the same reasoning layer can expand into flight planning, monitoring, disruption recovery, maintenance impact, crew coordination and network operations—moving humans toward exception management instead of repetitive cross-checking.</p><div className="as-actions"><Link href="/product/" className="as-btn">Explore the platform</Link><Link href="/about/" className="as-btn dark">Why Aeros</Link></div></div></div>

 <section className="as-final"><div><div className="as-eyebrow">DESIGN PARTNERS</div><h2>Bring us one mission your team still reviews by hand.</h2></div><div className="as-actions"><Link href="/contact/" className="as-btn">Work with Aeros</Link><Link href="/dashboard/" className="as-btn dark">Open live product</Link></div></section>
 </div>}
