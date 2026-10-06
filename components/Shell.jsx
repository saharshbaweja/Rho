'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {ChevronDown,Plane,ArrowUpRight} from 'lucide-react';

const products=[
 ['/product/','Platform overview'],
 ['/dashboard/','Mission Workspace'],
 ['/product/mission-intelligence','Mission Intelligence'],
 ['/product/operator-rules','OpSpecs & Manuals'],
 ['/product/live-data','Live Operational Data'],
 ['/product/crew-aircraft','Crew & Aircraft Legality'],
 ['/product/briefing','Mission Briefs'],
 ['/product/alerts','Change Monitoring'],
 ['/product/integrations','Integrations & API']
];

export default function Shell({children}){
  const pathname=usePathname();
  const productOnly=pathname?.startsWith('/dashboard');
  if(productOnly) return <main className="product-only-shell">{children}</main>;

  return <>
    <div className="hv-announcement">Aeros is building the mission-intelligence layer for Part 135 operators. <Link href="/contact/">Apply to be a design partner →</Link></div>
    <header className="site-nav hex-nav hv-nav">
      <Link href="/" className="site-brand hv-brand"><span><Plane size={14}/></span><b>AEROS</b></Link>
      <nav className="hv-nav-center">
        <div className="nav-menu"><Link href="/product/">Platform <ChevronDown size={11}/></Link><div className="nav-popover">{products.map(([h,t])=><Link href={h} key={h}>{t}<span>↗</span></Link>)}</div></div>
        <div className="nav-menu"><Link href="/solutions/">Solutions <ChevronDown size={11}/></Link><div className="nav-popover"><Link href="/solutions/">Part 135 charter operators<span>↗</span></Link><Link href="/solutions/">Director of Operations<span>↗</span></Link><Link href="/solutions/">Chief Pilots<span>↗</span></Link><Link href="/solutions/">Dispatchers<span>↗</span></Link><Link href="/solutions/">Pilots<span>↗</span></Link></div></div>
        <Link href="/enterprise/">Trust & Control</Link>
        <Link href="/pricing/">Design Partners</Link>
        <Link href="/about/">Company</Link>
      </nav>
      <div className="hv-nav-actions"><Link href="/login/" className="hv-login">Log in</Link><Link href="/contact/" className="hv-demo">Request a demo</Link></div>
    </header>
    <main>{children}</main>
    <footer className="site-footer hv-footer">
      <div className="footer-top"><div><Link href="/" className="site-brand footer-brand"><span><Plane size={15}/></span><b>AEROS</b></Link><h2>Mission intelligence for Part 135 flight operations.</h2></div><Link href="/contact/" className="hv-demo">Request a demo <ArrowUpRight size={12}/></Link></div>
      <div className="footer-grid">
        <div><b>MISSION</b><Link href="/dashboard/">Mission Workspace</Link><Link href="/product/mission-intelligence">Mission Intelligence</Link><Link href="/product/briefing">Mission Briefs</Link><Link href="/product/alerts">Change Monitoring</Link></div>
        <div><b>KNOWLEDGE</b><Link href="/product/operator-rules">OpSpecs & Manuals</Link><Link href="/product/live-data">Weather, NOTAMs & Charts</Link><Link href="/product/crew-aircraft">Crew & Aircraft Legality</Link><Link href="/product/integrations">Integrations & API</Link></div>
        <div><b>BUILT FOR</b><Link href="/solutions/">Part 135 Operators</Link><Link href="/solutions/">Directors of Operations</Link><Link href="/solutions/">Chief Pilots</Link><Link href="/solutions/">Dispatchers & Pilots</Link></div>
        <div><b>COMPANY</b><Link href="/about/">About</Link><Link href="/enterprise/">Trust & Control</Link><Link href="/pricing/">Design Partners</Link><Link href="/contact/">Contact</Link></div>
      </div>
      <div className="footer-bottom"><span>© 2026 Aeros</span><span>Decision-support prototype. Operational approval remains with authorized personnel.</span></div>
    </footer>
  </>;
}
