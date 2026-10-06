import Link from 'next/link';
import {ArrowUpRight,Check} from 'lucide-react';

const plans=[
 {eyebrow:'DESIGN PARTNER',title:'Mission Review Pilot',desc:'For Part 135 operators proving one mission-intelligence workflow with us.',features:['Map the current mission-review process','Ingest operator documents and rules','Connect or import trip, crew and aircraft data','Configure one live-data workflow','Cited mission brief prototype','Direct founder support']},
 {eyebrow:'OPERATOR DEPLOYMENT',title:'Operations',desc:'For teams ready to use Aeros on recurring missions.',features:['Mission workspace','Operator-specific rule layer','Live weather and NOTAM context','Crew and aircraft checks','Change monitoring','Role-based review and history','Priority integrations']},
 {eyebrow:'MULTI-BASE / ADVANCED',title:'Enterprise',desc:'For larger operators with more certificates, bases, aircraft types, and integration requirements.',features:['Everything in Operations','Advanced permissions and approval boundaries','Multiple manuals and rule sets','Custom integrations and data providers','Expanded audit and change history','Dedicated implementation support']}
];

export default function Pricing(){return <div className="fsp-site">
 <section className="fsp-hero"><div><div className="fsp-kicker">DESIGN PARTNERS</div><h1>Start with one mission-review workflow that is still too manual.</h1></div><div className="fsp-hero-copy"><p>Aeros is early. We are prioritizing operator fit, trust, onboarding depth, and measurable time savings over pretending the product already has standardized public SaaS pricing.</p><div className="fsp-actions"><Link href="/contact/" className="fsp-primary">Apply for a pilot <ArrowUpRight size={12}/></Link><Link href="/product/" className="fsp-secondary">Explore capabilities</Link></div></div></section>

 <section className="fsp-section"><div className="fsp-pricing-grid">{plans.map((p,i)=><article className={'fsp-plan '+(i===1?'featured':'')} key={p.title}><small>{p.eyebrow}</small><h3>{p.title}</h3><p>{p.desc}</p><ul>{p.features.map(x=><li key={x}><Check size={12} style={{marginRight:7,verticalAlign:'middle'}}/>{x}</li>)}</ul><Link href="/contact/" className={i===1?'fsp-secondary':'fsp-primary'}>{i===0?'Apply as design partner':'Talk to us'} <ArrowUpRight size={12}/></Link></article>)}</div><p className="fsp-note">Prototype-stage commercial terms are custom while we validate scope, data access, implementation effort, and ROI with operators.</p></section>

 <section className="fsp-section"><div className="fsp-section-head"><div><div className="fsp-kicker">ROI PRINCIPLE</div><h2>Aeros should save more operational review time than it costs.</h2></div><p>The initial value metric is simple: reduce repetitive search and cross-checking, shorten mission-review cycles, make changes easier to re-review, and reduce the chance that a relevant restriction or update is buried in another system.</p></div></section>

 <section className="fsp-final"><div><div className="fsp-kicker">PILOT SCOPE</div><h2>One operator. One workflow. Real missions. Measurable time saved.</h2></div><Link href="/contact/" className="fsp-primary">Model a pilot with us <ArrowUpRight size={12}/></Link></section>
 </div>}
