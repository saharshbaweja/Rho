'use client';
import Link from 'next/link';
import {ChevronDown,Plane,ArrowUpRight} from 'lucide-react';

const products=[['/product/schedule','Scheduling'],['/product/dispatch','Dispatch'],['/product/maintenance','Maintenance'],['/product/training','Training'],['/product/network','Network']];

export default function Shell({children}){
  return <>
    <header className="site-nav hex-nav">
      <nav className="hex-nav-left">
        <div className="nav-menu"><Link href="/product/">Product <ChevronDown size={11}/></Link><div className="nav-popover">{products.map(([h,t])=><Link href={h} key={h}>{t}<span>↗</span></Link>)}</div></div>
        <Link href="/solutions/">Solutions</Link>
        <Link href="/enterprise/">Enterprise</Link>
      </nav>

      <Link href="/" className="site-brand hex-center-brand"><span><Plane size={14}/></span><b>AEROS</b></Link>

      <div className="hex-nav-right">
        <Link href="/about/">Resources</Link>
        <Link href="/pricing/">Pricing</Link>
        <Link href="/login/" className="text-link">Log in</Link>
        <Link href="/signup/" className="nav-primary">Get started <ArrowUpRight size={11}/></Link>
      </div>
    </header>
    <main>{children}</main>
    <footer className="site-footer">
      <div className="footer-top"><div><Link href="/" className="site-brand footer-brand"><span><Plane size={15}/></span><b>AEROS</b></Link><h2>AI operations software for modern aviation teams.</h2></div><Link href="/signup/" className="nav-primary">Get started <ArrowUpRight size={12}/></Link></div>
      <div className="footer-grid">
        <div><b>PRODUCT</b><Link href="/product/schedule">Scheduling</Link><Link href="/product/dispatch">Dispatch</Link><Link href="/product/maintenance">Maintenance</Link><Link href="/product/training">Training</Link><Link href="/product/network">Network</Link></div>
        <div><b>SOLUTIONS</b><Link href="/solutions/">Flight schools</Link><Link href="/solutions/">University aviation</Link><Link href="/solutions/">Charter operators</Link><Link href="/solutions/">FBOs</Link></div>
        <div><b>COMPANY</b><Link href="/about/">About</Link><Link href="/enterprise/">Enterprise</Link><Link href="/pricing/">Pricing</Link><Link href="/contact/">Contact</Link></div>
        <div><b>ACCOUNT</b><Link href="/login/">Log in</Link><Link href="/signup/">Sign up</Link><Link href="/dashboard/">Dashboard</Link></div>
      </div>
      <div className="footer-bottom"><span>© 2026 Aeros</span><span>Prototype product visuals are illustrative.</span></div>
    </footer>
  </>;
}