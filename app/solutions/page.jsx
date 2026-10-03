import Link from 'next/link';
import {ArrowUpRight,GraduationCap,Plane,Building2,MapPinned} from 'lucide-react';

export default function Solutions(){return <>
<section className="page-hero"><div className="eyebrow">SOLUTIONS</div><h1>Built around the people running the operation.</h1><p>Aeros gives each team the context and controls it needs without fragmenting the underlying operating picture.</p><div className="hero-ctas"><Link href="/contact/" className="primary-cta">Talk to Aeros <ArrowUpRight size={12}/></Link></div></section>
<section className="page-section"><div className="solution-grid">
<article><GraduationCap size={24}/><h3>Flight schools</h3><p>Coordinate students, instructors, aircraft, lesson prerequisites, maintenance, and weather without rebuilding the day manually.</p><Link href="/contact/" className="inline-link">Pilot Aeros →</Link></article>
<article><Building2 size={24}/><h3>University aviation</h3><p>Manage larger cohorts, curriculum progression, stage checks, aircraft availability, and institutional reporting from one system.</p><Link href="/contact/" className="inline-link">Talk to us →</Link></article>
<article><Plane size={24}/><h3>Charter operators</h3><p>Bring aircraft, crew, maintenance, trip requirements, and day-of-operation changes into one coordinated plan.</p><Link href="/contact/" className="inline-link">Explore fit →</Link></article>
<article><MapPinned size={24}/><h3>FBOs and service providers</h3><p>Longer term, Aeros connects operator demand with ground services, fuel, hangar, maintenance, and capacity.</p><Link href="/product/network" className="inline-link">See network vision →</Link></article>
</div></section>
<section className="page-section alt"><div className="page-head"><div className="eyebrow">ROLE-BASED WORKFLOWS</div><h2>Same operation. Different decisions.</h2><p>Schedulers care about conflicts. Maintenance cares about availability. Instructors care about progression. Owners care about throughput. Aeros lets every role work from the same live state.</p></div></section>
</>}
