import Link from 'next/link';
import {notFound} from 'next/navigation';
import {ArrowUpRight,Route,Plane,Wrench,Users,MapPin,CheckCircle2} from 'lucide-react';

const features={
 schedule:{label:'SCHEDULING',title:'A schedule that understands the operation.',desc:'Coordinate aircraft, students, instructors, maintenance, training requirements, availability, and weather in one live scheduling workspace.',icon:Route,points:['Constraint-aware scheduling','Automatic conflict detection','Disruption recovery plans','Utilization visibility','Human approval before changes'],next:'dispatch'},
 dispatch:{label:'DISPATCH',title:'Know what can fly before the day gets away from you.',desc:'Bring aircraft status, crew readiness, weather, schedule context, and operational exceptions into one dispatch view.',icon:Plane,points:['Flight readiness view','Aircraft + crew context','Weather-aware exceptions','Operational holds','Decision history'],next:'maintenance'},
 maintenance:{label:'MAINTENANCE',title:'Make aircraft availability part of the operating plan.',desc:'Connect squawks, inspections, downtime, and maintenance windows directly to scheduling and recovery decisions.',icon:Wrench,points:['Squawk visibility','Inspection countdowns','Downtime planning','Schedule impact','Utilization context'],next:'training'},
 training:{label:'TRAINING',title:'Keep progression connected to every scheduling decision.',desc:'Track lesson prerequisites, stage checks, instructor qualifications, and student progression without separating training from operations.',icon:Users,points:['Curriculum progression','Prerequisite awareness','Instructor qualification context','Stage-check planning','Completion bottlenecks'],next:'network'},
 network:{label:'AEROS NETWORK',title:'Connect the services around every flight.',desc:'Long term, Aeros can use operational demand to coordinate FBOs, fuel, maintenance, hangars, ground services, payments, and procurement.',icon:MapPin,points:['Service demand visibility','Capacity matching','Provider performance','Procurement workflows','Payments + market intelligence'],next:'schedule'}
};

export function generateStaticParams(){
 return Object.keys(features).map(slug=>({slug}));
}

export default async function FeaturePage({params}){const {slug}=await params;const f=features[slug];if(!f)notFound();const Icon=f.icon;return <>
<section className="page-hero"><div className="eyebrow">{f.label}</div><h1>{f.title}</h1><p>{f.desc}</p><div className="hero-ctas"><Link href="/contact/" className="primary-cta">Request a demo <ArrowUpRight size={12}/></Link><Link href="/product/" className="ghost-cta">All platform capabilities</Link></div></section>
<section className="page-section"><div className="page-head"><div className="eyebrow">WHAT IT DOES</div><h2>Built for the real operating workflow.</h2></div><div className="feature-grid">{f.points.map((x,i)=><article key={x}><CheckCircle2 size={21}/><h3>{x}</h3><p>{i===0?'Aeros keeps this capability connected to the rest of the operation instead of treating it as an isolated record.':'Changes flow through the same live operational context, so downstream conflicts are visible before they become problems.'}</p></article>)}</div></section>
<section className="page-section alt"><div className="mini-workspace"><div className="mini-core"><Icon size={27}/><b>{f.label}</b><span>LIVE OPERATION · AEROS</span></div></div></section>
<section className="page-section page-dark"><div className="page-head"><div className="eyebrow light">NEXT CAPABILITY</div><h2>The platform gets stronger as workflows connect.</h2><p>Aeros is designed so scheduling, dispatch, maintenance, training, and external services share the same operating context.</p></div><Link href={'/product/'+f.next} className="light-button">Explore next capability <ArrowUpRight size={12}/></Link></section>
</>}
