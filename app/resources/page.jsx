import Link from 'next/link';
import {ArrowUpRight,BookOpen,FileCheck2,GitBranch,Plane,ShieldCheck,SearchCheck} from 'lucide-react';

const resources=[
 [SearchCheck,'Product walkthrough','/dashboard/','Open the interactive mission workspace and see how rules, live data and review state come together.'],
 [BookOpen,'Mission intelligence guide','/product/mission-intelligence','Understand the mission-review workflow Aeros is designed to compress.'],
 [ShieldCheck,'Trust & control','/enterprise/','See the human-approval model, source traceability, permissions and audit principles.'],
 [GitBranch,'Implementation','/implementation','Learn how Aeros can begin beside your current scheduling, charter and maintenance systems.'],
 [FileCheck2,'Design partner program','/pricing/','How we scope one real workflow with an operator before expanding.'],
 [Plane,'Part 135 use case','/solutions/part-135','See the initial customer profile and the operating problem Aeros is built around.']
];

export default function Resources(){return <div className="aeros-site">
 <section className="a-page-hero"><div><div className="a-eyebrow">RESOURCE CENTER</div><h1>Understand the product before the pitch.</h1></div><div><p>Explore the mission workflow, product architecture, trust model and implementation strategy behind Aeros. The goal is to make the product concrete enough that an operator can decide quickly whether the workflow is relevant.</p><div className="a-actions"><Link href="/dashboard/" className="a-btn-dark">Open product <ArrowUpRight size={11}/></Link><Link href="/contact/" className="a-btn-light">Talk to us</Link></div></div></section>
 <section className="a-section alt"><div className="a-section-head"><div><div className="a-eyebrow">EXPLORE</div><h2>Product, workflow, trust and deployment.</h2></div><p>These pages are intentionally specific. Aeros is not being sold as generic aviation AI; each resource explains the exact operating surface we are trying to improve.</p></div><div className="a-resource-list">{resources.map(([I,t,h,d])=><Link href={h} className="a-resource" key={t}><span className="a-card-icon"><I size={17}/></span><h3>{t}</h3><p>{d}</p><span>Open →</span></Link>)}</div></section>
 <section className="a-final"><div><div className="a-eyebrow">DESIGN PARTNERS</div><h2>Have a mission-review workflow worth mapping?</h2></div><Link href="/contact/" className="a-btn-dark">Bring us the workflow</Link></section>
 </div>}
