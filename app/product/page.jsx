import Link from 'next/link';
import {Activity,ArrowUpRight,BookOpen,CloudSun,FileCheck2,GitBranch,MessageSquare,Plane,SearchCheck,ShieldCheck,UsersRound,Wrench,BarChart3} from 'lucide-react';

const mission=[
 [SearchCheck,'Mission Intelligence','/product/mission-intelligence','Structure each trip and identify the rules, live facts and operational state that matter.'],
 [BookOpen,'OpSpecs & Manuals','/product/operator-rules','Turn controlled operator documents into a validated, source-linked operating layer.'],
 [CloudSun,'Live Operational Data','/product/live-data','Filter weather, NOTAMs, airports, charts and flight data to the planned mission.'],
 [UsersRound,'Crew & Aircraft','/product/crew-aircraft','Evaluate qualifications, duty, currency, tail status, deferred items and operator restrictions.'],
 [FileCheck2,'Mission Briefs','/product/briefing','Give dispatchers and pilots one concise brief with status, actions, changes and evidence.'],
 [Activity,'Change Monitoring','/product/alerts','Keep watching after review and surface only mission conclusions that need another look.'],
 [GitBranch,'Integrations & API','/product/integrations','Connect the systems already holding trip, crew, aircraft, maintenance and flight data.']
];
const expansion=[
 [Plane,'Scheduling & Trip Coordination','/product/scheduling','Use the same mission context to protect schedules and coordinate downstream changes.'],
 [Wrench,'Maintenance Impact','/product/maintenance-impact','Translate a tail-status change into the missions, approvals and people that must be revisited.'],
 [MessageSquare,'Operational Messaging','/product/messaging','Turn meaningful mission changes into targeted, acknowledgement-aware communication.'],
 [BarChart3,'Operations Analytics','/product/analytics','Measure review load, recurring friction, mission changes and where teams spend manual time.']
];

export default function Product(){return <div className="aeros-site">
 <section className="a-page-hero"><div><div className="a-eyebrow">AEROS PLATFORM</div><h1>One intelligence layer around every mission.</h1></div><div><p>Start with the mission-review workflow: combine operator rules, live aviation data, crew and aircraft state into a source-backed operational brief. Then expand into the coordination work around the flight only where Aeros proves useful.</p><div className="a-actions"><Link href="/contact/" className="a-btn-dark">Request a demo <ArrowUpRight size={11}/></Link><Link href="/dashboard/" className="a-btn-light">Open product</Link></div></div></section>
 <div className="a-subnav"><div className="a-subnav-inner">{mission.map(([,t,h])=><Link href={h} key={h}>{t}</Link>)}<Link href="#extensions">Ops extensions</Link></div></div>

 <section className="a-section alt"><div className="a-section-head"><div><div className="a-eyebrow">CORE PLATFORM</div><h2>What matters for this mission, and why?</h2></div><p>Each module exists to make the mission review faster without hiding the source. The stable dashboard communicates status; the AI interface handles questions and explanation.</p></div><div className="a-data-grid">{mission.map(([I,t,h,d])=><Link href={h} className="a-resource" key={t}><span className="a-card-icon"><I size={17}/></span><h3>{t}</h3><p>{d}</p><span>Explore →</span></Link>)}</div></section>

 <section className="a-section"><div className="a-section-head"><div><div className="a-eyebrow">PRODUCT ARCHITECTURE</div><h2>Static knowledge + live state + reviewable action.</h2></div><p>Aeros is not one giant prompt. Operator knowledge is controlled and versioned. Live sources are continuously refreshed. Mission-specific checks combine both and preserve evidence for human review.</p></div><div className="a-flow">{[['01','Operator knowledge','OpSpecs, GOM, MEL/CDL, limits and policies.'],['02','Mission state','Route, airports, timing, passengers, aircraft and crew.'],['03','Live environment','Weather, NOTAMs, charts, airport and flight data.'],['04','Decision layer','Clear, review and action-required findings with citations.'],['05','Continuous delta','Re-evaluate only what changed through departure.']].map(([n,t,d])=><div className="a-flow-step" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}</div></section>

 <section className="a-section dark"><div className="a-section-head"><div><div className="a-eyebrow" style={{color:'#9b9c95'}}>DESIGNED FOR TRUST</div><h2>Never make the operator guess where the answer came from.</h2></div><p>The UI keeps each material finding tied to a source, document revision, live observation or structured operational record. Authorized users remain responsible for operational approval.</p></div><div className="a-3col">{[[ShieldCheck,'Evidence first','Material findings show the rule and fact that produced them.'],[BookOpen,'Controlled knowledge','Document versions and operator validation matter before rules become active.'],[Activity,'Durable review state','See what was reviewed, what changed and what still needs acknowledgement.']].map(([I,t,d])=><article className="a-card darkcard" key={t}><span className="a-card-icon"><I size={18}/></span><h3>{t}</h3><p>{d}</p></article>)}</div></section>

 <section className="a-section alt" id="extensions"><div className="a-section-head"><div><div className="a-eyebrow">OPS EXTENSIONS</div><h2>Keep the bigger Aeros vision—after the wedge works.</h2></div><p>Mission intelligence gives Aeros context that can later automate adjacent workflows. These are expansion surfaces, not a promise that customers must replace their current stack on day one.</p></div><div className="a-3col">{expansion.map(([I,t,h,d])=><Link href={h} className="a-resource" key={t}><span className="a-card-icon"><I size={17}/></span><h3>{t}</h3><p>{d}</p><span>Explore vision →</span></Link>)}</div></section>

 <section className="a-final"><div><div className="a-eyebrow">START WITH ONE MISSION</div><h2>Prove the review workflow before replacing anything else.</h2></div><div className="a-actions"><Link href="/contact/" className="a-btn-dark">Become a design partner</Link><Link href="/implementation" className="a-btn-light">See implementation</Link></div></section>
 </div>}
