import Link from 'next/link';
import {ArrowUpRight,Check} from 'lucide-react';

const plans=[
 ['DESIGN PARTNER','Pilot','For early operators working directly with us to prove the first workflow.',['Hands-on workflow mapping','Scheduling + recovery pilot','Direct product feedback loop','Migration assistance']],
 ['OPERATIONS','Custom','For teams ready to run recurring daily operations through Aeros.',['Live scheduling workspace','Aeros recovery recommendations','Fleet + crew context','Operational analytics']],
 ['ENTERPRISE','Custom','For larger programs with advanced controls and rollout needs.',['Role-based access','Audit history','Custom integrations','Dedicated implementation support']]
];
export default function Pricing(){return <>
<section className="page-hero"><div className="eyebrow">PRICING</div><h1>Start with one workflow.</h1><p>Aeros is still being shaped with design partners, so we are not pretending there is a polished public pricing grid yet. Commercial terms should follow the value of the workflow we prove together.</p></section>
<section className="page-section"><div className="pricing-grid">{plans.map((p,i)=><article className={i===1?'featured':''} key={p[0]}><span className="eyebrow">{p[0]}</span><h3>{p[1]}</h3><div className="price-tag">{i===0?'Pilot':'Talk to us'}<small>{i===0?' program':''}</small></div><div className="check-list">{p[3].map(x=><span key={x}><Check size={13}/>{x}</span>)}</div><Link href="/contact/" className="inline-link">Get in touch →</Link></article>)}</div></section>
<section className="page-section alt"><div className="page-head"><div className="eyebrow">PRICING PRINCIPLE</div><h2>Aeros should pay for itself in recovered operational capacity.</h2><p>The long-term model should align price with the value Aeros creates through time saved, higher utilization, fewer lost flight hours, and less manual coordination.</p></div><Link href="/contact/" className="primary-cta">Discuss a pilot <ArrowUpRight size={12}/></Link></section>
</>}
