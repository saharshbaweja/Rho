'use client';
import Link from 'next/link';
import {ChevronDown,Plane,ArrowUpRight} from 'lucide-react';

const products=[['/product/schedule','Scheduling'],['/product/dispatch','Dispatch'],['/product/maintenance','Maintenance'],['/product/training','Training'],['/product/network','Network']];

export default function Shell({children}){
  return <>
    <header className="site-nav">
      <Link href="/" className="site-brand"><span><Plane size={15}/></span><b>AEROS</b></Link>
      <nav className="site-links">
        <div className="nav-menu"><Link href="/product/">Platform <ChevronDown size={11}/></Link><div className="nav-popover">{products.map(([h,t])=><Link href={h} key={h}>{t}<span>↗</span></Link>)}</div></div>
        <Link href="/solutions/">Solutions</Link>
        <Link href="/enterprise/">Enterprise</Link>
        <Link href="/pricing/">Pricing</Link>
        <Link href="/about/">Company</Link>
      </nav>
      <div className="site-actions"><Link href="/contact/" className="text-link">Sign in</Link><Link href="/contact/" className="nav-primary">Request a demo <ArrowUpRight size={12}/></Link></div>
    </header>
    <main>{children}</main>
    <footer className="site-footer">
      <div className="footer-top"><div><Link href="/" className="site-brand footer-brand"><span><Plane size={15}/></span><b>AEROS</b></Link><h2>Make every flight operation<br/>feel intelligently coordinated.</h2></div><Link href="/contact/" className="nav-primary">Become a design partner <ArrowUpRight size={12}/></Link></div>
      <div className="footer-grid">
        <div><b>PLATFORM</b><Link href="/product/schedule">Scheduling</Link><Link href="/product/dispatch">Dispatch</Link><Link href="/product/maintenance">Maintenance</Link><Link href="/product/training">Training</Link><Link href="/product/network">Network</Link></div>
        <div><b>SOLUTIONS</b><Link href="/solutions/">Flight schools</Link><Link href="/solutions/">University aviation</Link><Link href="/solutions/">Charter operators</Link><Link href="/solutions/">FBOs</Link></div>
        <div><b>COMPANY</b><Link href="/about/">About</Link><Link href="/enterprise/">Enterprise</Link><Link href="/pricing/">Pricing</Link><Link href="/contact/">Contact</Link></div>
        <div><b>VISION</b><span>Operate</span><span>Coordinate</span><span>Connect</span><span>Transact</span></div>
      </div>
      <div className="footer-bottom"><span>© 2026 Aeros</span><span>Prototype product visuals are illustrative.</span></div>
    </footer>
  </>;
}