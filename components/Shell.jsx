'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {ChevronDown,Plane,ArrowUpRight} from 'lucide-react';

const products=[['/product/','Platform overview'],['/dashboard/','Command Center'],['/product/schedule','Schedule'],['/product/dispatch','Dispatch'],['/product/maintenance','Maintenance'],['/product/training','Training'],['/product/network','Network']];

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
        <div className="nav-menu"><Link href="/solutions/">Solutions <ChevronDown size={11}/></Link><div className="nav-popover"><Link href="/solutions/">Flight schools<span>↗</span></Link><Link href="/solutions/">University aviation<span>↗</span></Link><Link href="/solutions/">Charter operators<span>↗</span></Link><Link href="/solutions/">FBOs & service providers<span>↗</span></Link></div></div>
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
        <div><b>PLATFORM</b><Link href="/dashboard/">Command Center</Link><Link href="/product/schedule">Schedule</Link><Link href="/product/dispatch">Dispatch</Link><Link href="/product/maintenance">Maintenance</Link><Link href="/product/training">Training</Link></div>
        <div><b>SOLUTIONS</b><Link href="/solutions/">Flight schools</Link><Link href="/solutions/">University aviation</Link><Link href="/solutions/">Charter operators</Link><Link href="/solutions/">FBOs</Link></div>
        <div><b>COMPANY</b><Link href="/about/">About</Link><Link href="/enterprise/">Enterprise</Link><Link href="/pricing/">Pricing</Link><Link href="/contact/">Contact</Link></div>
        <div><b>ACCOUNT</b><Link href="/login/">Log in</Link><Link href="/signup/">Sign up</Link><Link href="/dashboard/">Dashboard</Link></div>
      </div>
      <div className="footer-bottom"><span>© 2026 Aeros</span><span>Prototype product visuals and metrics are illustrative.</span></div>
    </footer>
  </>;
}