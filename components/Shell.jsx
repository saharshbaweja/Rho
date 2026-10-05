'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {ChevronDown,Plane,ArrowUpRight} from 'lucide-react';

const products=[['/product/','Platform overview'],['/dashboard/','Command Center'],['/product/schedule','Scheduling'],['/product/dispatch','Dispatch'],['/product/maintenance','Maintenance'],['/product/training','Training'],['/product/billing','Billing & Payments'],['/product/reporting','Reporting & Analytics'],['/product/compliance','Compliance'],['/product/mobile','Mobile & Offline'],['/product/integrations','Integrations & API'],['/product/onboarding','Onboarding'],['/product/network','Aeros Network']];

export default function Shell({children}){
  const pathname=usePathname();
  const productOnly=pathname?.startsWith('/dashboard');
  if(productOnly) return <main className="product-only-shell">{children}</main>;

  return <>
    <div className="hv-announcement">Aeros is building the AI operating layer for modern aviation teams. <Link href="/contact/">Become a design partner →</Link></div>
    <header className="site-nav hex-nav hv-nav">
      <Link href="/" className="site-brand hv-brand"><span><Plane size={14}/></span><b>AEROS</b></Link>
      <nav className="hv-nav-center">
        <div className="nav-menu"><Link href="/product/">Platform <ChevronDown size={11}/></Link><div className="nav-popover">{products.map(([h,t])=><Link href={h} key={h}>{t}<span>↗</span></Link>)}</div></div>
        <div className="nav-menu"><Link href="/solutions/">Solutions <ChevronDown size={11}/></Link><div className="nav-popover"><Link href="/solutions/">Flight schools<span>↗</span></Link><Link href="/solutions/">Career pilot academies<span>↗</span></Link><Link href="/solutions/">Colleges & universities<span>↗</span></Link><Link href="/solutions/">Flying clubs<span>↗</span></Link><Link href="/solutions/">Charter operators<span>↗</span></Link></div></div>
        <Link href="/enterprise/">Enterprise</Link>
        <Link href="/pricing/">Pricing</Link>
        <Link href="/about/">Resources</Link>
      </nav>
      <div className="hv-nav-actions"><Link href="/login/" className="hv-login">Log in</Link><Link href="/contact/" className="hv-demo">Request a demo</Link></div>
    </header>
    <main>{children}</main>
    <footer className="site-footer hv-footer">
      <div className="footer-top"><div><Link href="/" className="site-brand footer-brand"><span><Plane size={15}/></span><b>AEROS</b></Link><h2>AI operations software for modern aviation teams.</h2></div><Link href="/contact/" className="hv-demo">Request a demo <ArrowUpRight size={12}/></Link></div>
      <div className="footer-grid">
        <div><b>OPERATE</b><Link href="/dashboard/">Command Center</Link><Link href="/product/schedule">Scheduling</Link><Link href="/product/dispatch">Dispatch</Link><Link href="/product/maintenance">Maintenance</Link></div>
        <div><b>TRAIN & RUN</b><Link href="/product/training">Training</Link><Link href="/product/compliance">Compliance</Link><Link href="/product/billing">Billing & Payments</Link><Link href="/product/reporting">Reporting</Link></div>
        <div><b>PLATFORM</b><Link href="/product/mobile">Mobile & Offline</Link><Link href="/product/integrations">Integrations & API</Link><Link href="/product/onboarding">Onboarding</Link><Link href="/product/network">Aeros Network</Link></div>
        <div><b>COMPANY</b><Link href="/solutions/">Solutions</Link><Link href="/enterprise/">Enterprise</Link><Link href="/pricing/">Pricing</Link><Link href="/contact/">Contact</Link></div>
      </div>
      <div className="footer-bottom"><span>© 2026 Aeros</span><span>Prototype product visuals and metrics are illustrative.</span></div>
    </footer>
  </>;
}