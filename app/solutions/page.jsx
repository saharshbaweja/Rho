import Link from 'next/link';
import {ArrowUpRight,Plane,ShieldCheck,Users,Radio,FileText} from 'lucide-react';

const roles=[
 [Plane,'Part 135 operators','Reduce the manual effort required to evaluate each trip against certificate-specific rules, aircraft state, crew legality, weather, NOTAMs, airports, and changing conditions.'],
 [ShieldCheck,'Director of Operations','See which missions need attention, why they need attention, and which source or operator rule is driving the review item.'],
 [Users,'Chief Pilots','Review pilot eligibility, qualification, duty, company restrictions, and mission-specific considerations without hunting across systems and documents.'],
 [Radio,'Dispatchers','Turn an incoming charter request into a structured mission brief with the relevant rules, live conditions, required actions, and citations already attached.'],
 [FileText,'Pilots','Receive a concise operational brief with the changes and restrictions that actually matter to the flight instead of another pile of disconnected information.']
];

export default function Solutions(){return <div className="fsp-site">
 <section className="fsp-hero"><div><div className="fsp-kicker">SOLUTIONS</div><h1>Built around the Part 135 mission-review workflow.</h1></div><div className="fsp-hero-copy"><p>Aeros is designed for operators that carry real regulatory complexity without airline-sized internal systems. The same mission context serves operations leadership, dispatchers, Chief Pilots, and flight crews.</p><div className="fsp-actions"><Link href="/contact/" className="fsp-primary">Discuss your workflow <ArrowUpRight size={12}/></Link><Link href="/dashboard/" className="fsp-secondary">Open mission workspace</Link></div></div></section>

 <section className="fsp-section"><div className="fsp-section-head"><div><div className="fsp-kicker">WHO IT SERVES</div><h2>One mission. Different responsibilities.</h2></div><p>Aeros should not force every role into the same generic screen. It keeps one shared mission state underneath, then surfaces the evidence and actions each person needs.</p></div><div className="fsp-solutions">{roles.map(([I,t,d])=><article className="fsp-solution" key={t}><div className="fsp-cap-icon"><I size={20}/></div><h3>{t}</h3><p>{d}</p><Link href="/contact/" className="fsp-secondary">Talk through this workflow →</Link></article>)}</div></section>

 <section className="fsp-section"><div className="fsp-section-head"><div><div className="fsp-kicker">BEST INITIAL FIT</div><h2>Operators with enough complexity to feel the pain—and small enough to still do too much by hand.</h2></div><p>The initial design-partner profile is a Part 135 certificate holder with a small-to-mid-sized fleet, meaningful mission variety, and a team that still cross-checks rules, live aviation data, crew legality, and aircraft state across multiple tools.</p></div><div className="fsp-cap-grid">{[['3–30 aircraft','Enough mission volume and variation to create recurring review work.'],['Lean operations team','A smaller dispatcher/ops team where time saved is visible immediately.'],['Document-heavy review','OpSpecs, GOM, MEL/CDL, company minimums, authorizations, and internal procedures matter to acceptance and release.'],['Existing software stack','Aeros can sit above the current charter/scheduling system instead of demanding replacement on day one.']].map(([t,d])=><article className="fsp-cap-card" key={t}><h3>{t}</h3><p>{d}</p></article>)}</div></section>

 <section className="fsp-final"><div><div className="fsp-kicker">DESIGN PARTNERS</div><h2>Show us how your team reviews a mission today.</h2></div><Link href="/contact/" className="fsp-primary">Work with Aeros <ArrowUpRight size={12}/></Link></section>
 </div>}
