'use client';
import Link from 'next/link';
import {useEffect,useState} from 'react';
import {usePathname} from 'next/navigation';
import {ArrowUpRight,ChevronDown,Menu,Plane,X} from 'lucide-react';

const menus=[
 {label:'Product',items:[['Mission intelligence','/product/mission-intelligence'],['Operator knowledge','/product/operator-rules'],['Live operational data','/product/live-data'],['Crew & aircraft','/product/crew-aircraft'],['Mission briefs','/product/briefing'],['Change monitoring','/product/alerts'],['Integrations & API','/product/integrations']]},
 {label:'Solutions',items:[['Part 135 charter','/solutions/part-135'],['Air ambulance','/solutions/air-ambulance'],['Corporate flight','/solutions/corporate'],['Dispatch & OCC','/solutions/dispatchers'],['Directors of Operations','/solutions/directors-of-operations'],['Chief pilots','/solutions/chief-pilots'],['Pilots','/solutions/pilots']]},
 {label:'Resources',items:[['Resource center','/resources/'],['Implementation','/implementation'],['Trust & control','/enterprise/'],['Design partners','/pricing/']]}
];

export default function Shell({children}){
 const pathname=usePathname();
 const [scrolled,setScrolled]=useState(false);
 const [mobile,setMobile]=useState(false);
 useEffect(()=>{const f=()=>setScrolled(window.scrollY>8);f();window.addEventListener('scroll',f,{passive:true});return()=>window.removeEventListener('scroll',f)},[]);
 useEffect(()=>setMobile(false),[pathname]);
 if(pathname?.startsWith('/dashboard')) return <main className="product-only-shell">{children}</main>;
 return <div className="dm-shell">
  <header className={`dm-public-nav ${scrolled?'scrolled':''}`}>
   <div className="dm-nav-inner">
    <Link href="/" className="dm-logo"><span className="dm-logo-mark"><Plane size={14}/></span>Aeros</Link>
    <nav className="dm-nav-main" aria-label="Main navigation">
     {menus.map(menu=><div className="dm-nav-item" key={menu.label}>
      <button className="dm-nav-trigger">{menu.label}<ChevronDown size={12}/></button>
      <div className="dm-nav-drop"><div className="dm-nav-drop-inner"><small>{menu.label.toUpperCase()}</small>{menu.items.map(([label,href])=><Link href={href} key={href}>{label}</Link>)}</div></div>
     </div>)}
     <Link href="/enterprise/" className="dm-nav-link">Trust</Link>
     <Link href="/about/" className="dm-nav-link">Company</Link>
    </nav>
    <div className="dm-nav-actions"><Link href="/login/" className="dm-signin">Sign in</Link><Link href="/contact/" className="dm-outline">Request a demo</Link><Link href="/dashboard/" className="dm-solid">Open Aeros</Link></div>
    <button className="dm-mobile-toggle" aria-label="Toggle menu" onClick={()=>setMobile(v=>!v)}>{mobile?<X size={20}/>:<Menu size={20}/>}</button>
   </div>
   <div className={`dm-mobile-panel ${mobile?'open':''}`}>{menus.flatMap(m=>m.items.slice(0,2)).map(([l,h])=><Link href={h} key={h}>{l}</Link>)}<Link href="/enterprise/">Trust</Link><Link href="/about/">Company</Link><Link href="/contact/">Request a demo</Link><Link href="/dashboard/">Open Aeros</Link></div>
  </header>
  <main className="dm-main">{children}</main>
  <footer className="dm-footer">
   <div className="dm-footer-lead"><div><Link href="/" className="dm-logo"><span className="dm-logo-mark"><Plane size={14}/></span>Aeros</Link><h2>Operational intelligence for every flight.</h2></div><Link href="/contact/" className="dm-btn dm-btn-primary">Request a demo <ArrowUpRight size={13}/></Link></div>
   <div className="dm-footer-grid">
    <div><b>Product</b><Link href="/product/mission-intelligence">Mission intelligence</Link><Link href="/product/operator-rules">Operator knowledge</Link><Link href="/product/live-data">Live data</Link><Link href="/product/briefing">Briefing</Link></div>
    <div><b>Solutions</b><Link href="/solutions/part-135">Part 135</Link><Link href="/solutions/dispatchers">Dispatch & OCC</Link><Link href="/solutions/chief-pilots">Chief pilots</Link><Link href="/solutions/pilots">Pilots</Link></div>
    <div><b>Platform</b><Link href="/product/integrations">Integrations</Link><Link href="/implementation">Implementation</Link><Link href="/enterprise/">Trust & control</Link><Link href="/dashboard/">Product demo</Link></div>
    <div><b>Resources</b><Link href="/resources/">Resource center</Link><Link href="/pricing/">Design partners</Link><Link href="/contact/">Contact</Link><Link href="/login/">Sign in</Link></div>
    <div><b>Company</b><Link href="/about/">About Aeros</Link><Link href="/contact/">Work with us</Link><Link href="/signup/">Create workspace</Link></div>
   </div>
   <div className="dm-footer-bottom"><span>© 2026 Aeros</span><span>Decision-support software. Operational authority remains with authorized personnel.</span></div>
  </footer>
 </div>
}
