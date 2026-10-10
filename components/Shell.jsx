'use client';
import Link from 'next/link';
import {useEffect,useState} from 'react';
import {usePathname} from 'next/navigation';
import {ArrowUpRight,Menu,Plane,X} from 'lucide-react';

const links=[
  ['/product/','Product'],
  ['/solutions/part-135','Part 135'],
  ['/enterprise/','Trust'],
  ['/resources/','Resources']
];

export default function Shell({children}){
  const pathname=usePathname();
  const [scrolled,setScrolled]=useState(false);
  const [mobileOpen,setMobileOpen]=useState(false);

  useEffect(()=>{
    const onScroll=()=>setScrolled(window.scrollY>12);
    onScroll();
    window.addEventListener('scroll',onScroll,{passive:true});
    return()=>window.removeEventListener('scroll',onScroll);
  },[]);

  useEffect(()=>setMobileOpen(false),[pathname]);

  if(pathname?.startsWith('/dashboard')){
    return <main className="product-only-shell">{children}</main>;
  }

  return <>
    <header className={`aeros-public-nav ${scrolled?'is-scrolled':''}`}>
      <div className="apn-inner">
        <Link href="/" className="apn-brand" aria-label="Aeros home">
          <span><Plane size={14}/></span><b>Aeros</b>
        </Link>

        <nav className="apn-links" aria-label="Primary navigation">
          {links.map(([href,label])=><Link href={href} key={href}>{label}</Link>)}
        </nav>

        <div className="apn-actions">
          <Link href="/login/" className="apn-login">Sign in</Link>
          <Link href="/contact/" className="apn-outline">Request a demo</Link>
          <Link href="/dashboard/" className="apn-solid">Open Aeros</Link>
        </div>

        <button className="apn-menu" onClick={()=>setMobileOpen(v=>!v)} aria-label="Toggle navigation" aria-expanded={mobileOpen}>
          {mobileOpen?<X size={19}/>:<Menu size={19}/>} 
        </button>
      </div>

      {mobileOpen&&<div className="apn-mobile">
        {links.map(([href,label])=><Link href={href} key={href}>{label}</Link>)}
        <div className="apn-mobile-actions">
          <Link href="/login/">Sign in</Link>
          <Link href="/contact/">Request a demo</Link>
          <Link href="/dashboard/">Open Aeros</Link>
        </div>
      </div>}
    </header>

    <main>{children}</main>

    <footer className="aeros-public-footer">
      <div className="apf-lead">
        <div>
          <Link href="/" className="apn-brand apf-brand"><span><Plane size={14}/></span><b>Aeros</b></Link>
          <h2>Operational intelligence for every flight.</h2>
          <p>One continuously reviewed operating context across rules, live conditions, aircraft and crew.</p>
        </div>
        <Link href="/contact/" className="apf-cta">Request a demo <ArrowUpRight size={13}/></Link>
      </div>

      <div className="apf-grid">
        <div><b>Product</b><Link href="/dashboard/">Mission workspace</Link><Link href="/product/mission-intelligence">Mission intelligence</Link><Link href="/product/briefing">Briefing</Link><Link href="/product/alerts">Change monitoring</Link></div>
        <div><b>Operations</b><Link href="/solutions/part-135">Part 135</Link><Link href="/solutions/dispatchers">Dispatch & OCC</Link><Link href="/solutions/chief-pilots">Chief pilots</Link><Link href="/product/crew-aircraft">Crew & aircraft</Link></div>
        <div><b>Platform</b><Link href="/product/operator-rules">Operator knowledge</Link><Link href="/product/live-data">Live data</Link><Link href="/product/integrations">Integrations</Link><Link href="/enterprise/">Trust & control</Link></div>
        <div><b>Company</b><Link href="/about/">About</Link><Link href="/resources/">Resources</Link><Link href="/contact/">Contact</Link><Link href="/pricing/">Design partners</Link></div>
      </div>

      <div className="apf-bottom">
        <span>© 2026 Aeros</span>
        <span>Decision support only. Operational authority remains with authorized personnel.</span>
      </div>
    </footer>
  </>;
}
