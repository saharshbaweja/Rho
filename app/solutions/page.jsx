import Link from 'next/link';
import {ArrowUpRight,BriefcaseBusiness,Gauge,Plane,SearchCheck,ShieldCheck,UsersRound} from 'lucide-react';

const operatorSolutions=[
 [Plane,'Part 135 Charter','/solutions/part-135','Compress mission review across OpSpecs, live aviation data, crew and aircraft state without hiding the evidence.'],
 [BriefcaseBusiness,'Air Ambulance','/solutions/air-ambulance','Move quickly on time-sensitive missions while keeping changing conditions, aircraft and crew requirements visible.'],
 [Gauge,'Corporate Flight Departments','/solutions/corporate','Bring company policy, aircraft state, crew rules and trip context into a single mission review surface.']
];
const roleSolutions=[
 [SearchCheck,'Dispatchers','/solutions/dispatchers','See what needs attention, why, and what changed—without hunting through manuals and browser tabs.'],
 [ShieldCheck,'Directors of Operations','/solutions/directors-of-operations','Turn approved operating policy into a structured, source-linked knowledge layer your team can actually use.'],
 [UsersRound,'Chief Pilots','/solutions/chief-pilots','Keep crew qualification, currency, training and company limitations in context for the planned mission.'],
 [Plane,'Pilots','/solutions/pilots','Receive a concise, current brief with relevant changes, restrictions, required actions and source references.']
];

export default function Solutions(){return <div className="aeros-site">
 <section className="a-page-hero"><div><div className="a-eyebrow">SOLUTIONS</div><h1>One mission. Different responsibilities.</h1></div><div><p>Aeros keeps a shared mission state underneath the operation, then gives each role the view it needs: full evidence for dispatch, controlled policy for leadership, crew context for Chief Pilots, and a concise brief for the flight deck.</p><div className="a-actions"><Link href="/contact/" className="a-btn-dark">Discuss your workflow <ArrowUpRight size={11}/></Link><Link href="/dashboard/" className="a-btn-light">Open the product</Link></div></div></section>

 <section className="a-section alt"><div className="a-section-head"><div><div className="a-eyebrow">BY OPERATOR</div><h2>Regulatory complexity without airline-sized software teams.</h2></div><p>The strongest early fit is an operator with real mission variation, controlled documents and multiple operational systems—but a lean team still responsible for cross-checking everything.</p></div><div className="a-solution-grid">{operatorSolutions.map(([I,t,h,d])=><Link href={h} className="a-solution" key={t}><span className="a-card-icon" style={{margin:0}}><I size={18}/></span><span><h3>{t}</h3><p>{d}</p></span><ul><li>Mission-specific review</li><li>Operator rules</li><li>Live change monitoring</li><li>Source-backed briefs</li></ul></Link>)}</div></section>

 <section className="a-section"><div className="a-section-head"><div><div className="a-eyebrow">BY ROLE</div><h2>The same mission, communicated at the right level.</h2></div><p>A generic dashboard forces everyone to translate the operation themselves. Aeros uses the same evidence layer but changes the density, actions and briefing format for the person reviewing it.</p></div><div className="a-data-grid">{roleSolutions.map(([I,t,h,d])=><Link href={h} className="a-resource" key={t}><span className="a-card-icon"><I size={17}/></span><h3>{t}</h3><p>{d}</p><span>Explore workflow →</span></Link>)}</div></section>

 <section className="a-section dark"><div className="a-section-head"><div><div className="a-eyebrow" style={{color:'#9b9c95'}}>BEST DESIGN-PARTNER FIT</div><h2>Enough complexity to hurt. Small enough to move quickly.</h2></div><p>We are most interested in teams where the mission review still depends on experienced people stitching together company documents, crew records, aircraft state and live aviation sources by hand.</p></div><div className="a-3col">{[['3–30 aircraft','A fleet large enough for recurring operational variation without an airline-sized internal software organization.'],['Lean ops team','Time saved in mission review, change monitoring and briefing is visible immediately.'],['Existing stack','Aeros can sit above current scheduling, charter and maintenance tools while proving the intelligence layer.']].map(([t,d])=><article className="a-card darkcard" key={t}><h3>{t}</h3><p>{d}</p></article>)}</div></section>

 <section className="a-final"><div><div className="a-eyebrow">DESIGN PARTNERS</div><h2>Show us one real mission-review workflow.</h2></div><div className="a-actions"><Link href="/contact/" className="a-btn-dark">Work with Aeros</Link><Link href="/pricing/" className="a-btn-light">Design partner program</Link></div></section>
 </div>}
