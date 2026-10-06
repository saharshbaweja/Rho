'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {ArrowUpRight,BookOpen,BriefcaseBusiness,ChevronDown,CloudSun,FileCheck2,Gauge,GitBranch,MessagesSquare,Plane,RadioTower,SearchCheck,ShieldCheck,UsersRound,Wrench} from 'lucide-react';

const platformGroups=[
 {label:'MISSION INTELLIGENCE',items:[
  ['/product/mission-intelligence','Mission Intelligence','Turn a trip request into a cited operational picture.',SearchCheck],
  ['/dashboard/','Mission Workspace','Review one mission from intake through dispatcher sign-off.',Gauge],
  ['/product/briefing','Mission Briefs','Generate dispatcher and pilot briefs from the same evidence.',FileCheck2],
  ['/product/alerts','Change Monitoring','See only what changed since the last review.',RadioTower]
 ]},
 {label:'OPERATING CONTEXT',items:[
  ['/product/operator-rules','OpSpecs & Manuals','Structure company approvals, limitations, MEL/CDL and procedures.',BookOpen],
  ['/product/live-data','Live Operational Data','Weather, NOTAMs, airports, charts and flight data in context.',CloudSun],
  ['/product/crew-aircraft','Crew & Aircraft','Qualifications, duty, currency, aircraft status and restrictions.',UsersRound],
  ['/product/integrations','Integrations & API','Connect scheduling, flight, maintenance, messaging and finance systems.',GitBranch]
 ]}
];

const solutionGroups=[
 {label:'BY OPERATOR',items:[
  ['/solutions/part-135','Part 135 Charter','Mission review and release support for lean charter teams.',Plane],
  ['/solutions/air-ambulance','Air Ambulance','Compress time-sensitive mission review without losing traceability.',BriefcaseBusiness],
  ['/solutions/corporate','Corporate Flight Departments','Bring company policy and live trip context into one operating brief.',Gauge]
 ]},
 {label:'BY ROLE',items:[
  ['/solutions/dispatchers','Dispatchers','Filter the mission to the issues that actually require attention.',SearchCheck],
  ['/solutions/directors-of-operations','Directors of Operations','Turn manuals and approvals into a structured operating layer.',BookOpen],
  ['/solutions/chief-pilots','Chief Pilots','Keep crew, training and company limitations visible before release.',UsersRound],
  ['/solutions/pilots','Pilots','Receive a concise mission brief with current changes and sources.',Plane]
 ]}
];

const resourceGroups=[
 {label:'LEARN',items:[
  ['/resources','Resource Center','Guides on mission review, implementation and product design.',BookOpen],
  ['/product/','Platform Overview','See how the full Aeros operating layer fits together.',Gauge],
  ['/dashboard/','Interactive Product','Open the live mission workspace prototype.',Plane]
 ]},
 {label:'DEPLOY',items:[
  ['/enterprise/','Trust & Control','Human approval, source traceability, permissions and audit history.',ShieldCheck],
  ['/implementation','Implementation','Connect your manuals, data sources and existing ops stack.',GitBranch],
  ['/pricing/','Design Partner Program','Start with one mission-review workflow and expand from there.',MessagesSquare]
 ]}
];

function MegaMenu({groups,feature}){
 return <div className="mega-menu">
  {groups.map(group=><div className="mega-col" key={group.label}><div className="mega-label">{group.label}</div>{group.items.map(([href,title,desc,Icon])=><Link href={href} className="mega-item" key={href}><span className="mega-icon"><Icon size={14}/></span><span><b>{title}</b><span>{desc}</span></span></Link>)}</div>)}
  <div className="mega-feature"><div><small>{feature.eyebrow}</small><h3>{feature.title}</h3><p>{feature.body}</p></div><Link href={feature.href}>{feature.cta} <ArrowUpRight size={11}/></Link></div>
 </div>
}

export default function Shell({children}){
 const pathname=usePathname();
 if(pathname?.startsWith('/dashboard')) return <main className="product-only-shell">{children}</main>;
 return <>
  <div className="hv-announcement">Aeros is working with Part 135 operators on a new mission-review workflow.<Link href="/pricing/">Join the design partner program →</Link></div>
  <header className="site-nav hv-nav">
   <Link href="/" className="hv-brand"><span><Plane size={14}/></span><b>AEROS</b></Link>
   <nav className="hv-nav-center">
    <div className="nav-menu"><Link href="/product/">Platform <ChevronDown size={11}/></Link><MegaMenu groups={platformGroups} feature={{eyebrow:'INTERACTIVE PRODUCT',title:'One mission. Every source. One review surface.',body:'Open the dashboard to see how Aeros compresses manuals, live data and operational state into a cited mission brief.',href:'/dashboard/',cta:'Open Mission Workspace'}}/></div>
    <div className="nav-menu"><Link href="/solutions/">Solutions <ChevronDown size={11}/></Link><MegaMenu groups={solutionGroups} feature={{eyebrow:'BUILT FOR PART 135',title:'Less searching. More informed decisions.',body:'Aeros is designed for operators carrying airline-level regulatory complexity without airline-sized software teams.',href:'/solutions/part-135',cta:'Explore Part 135'}}/></div>
    <div className="nav-menu"><Link href="/resources/">Resources <ChevronDown size={11}/></Link><MegaMenu groups={resourceGroups} feature={{eyebrow:'IMPLEMENTATION',title:'Start beside the systems you already use.',body:'Connect manuals and live sources first. Keep existing scheduling and dispatch tools until Aeros earns a larger role.',href:'/implementation',cta:'See implementation'}}/></div>
    <Link href="/enterprise/">Trust & Control</Link>
    <Link href="/pricing/">Design Partners</Link>
   </nav>
   <div className="hv-nav-actions"><Link href="/login/" className="hv-login">Log in</Link><Link href="/contact/" className="hv-demo">Request a demo</Link></div>
  </header>
  <main>{children}</main>
  <footer className="hv-footer">
   <div className="footer-top"><div><Link href="/" className="hv-brand footer-brand"><span><Plane size={15}/></span><b>AEROS</b></Link><h2>Mission intelligence for modern flight operations.</h2></div><Link href="/contact/" className="hv-demo">Request a demo <ArrowUpRight size={12}/></Link></div>
   <div className="footer-grid">
    <div><b>MISSION</b><Link href="/dashboard/">Mission Workspace</Link><Link href="/product/mission-intelligence">Mission Intelligence</Link><Link href="/product/briefing">Mission Briefs</Link><Link href="/product/alerts">Change Monitoring</Link></div>
    <div><b>CONTEXT</b><Link href="/product/operator-rules">OpSpecs & Manuals</Link><Link href="/product/live-data">Weather, NOTAMs & Charts</Link><Link href="/product/crew-aircraft">Crew & Aircraft</Link><Link href="/product/integrations">Integrations & API</Link></div>
    <div><b>SOLUTIONS</b><Link href="/solutions/part-135">Part 135 Charter</Link><Link href="/solutions/air-ambulance">Air Ambulance</Link><Link href="/solutions/corporate">Corporate Flight</Link><Link href="/solutions/dispatchers">Dispatchers</Link></div>
    <div><b>RESOURCES</b><Link href="/resources/">Resource Center</Link><Link href="/implementation">Implementation</Link><Link href="/enterprise/">Trust & Control</Link><Link href="/pricing/">Design Partners</Link></div>
    <div><b>COMPANY</b><Link href="/about/">About</Link><Link href="/contact/">Contact</Link><Link href="/login/">Log in</Link><Link href="/dashboard/">Product Demo</Link></div>
   </div>
   <div className="footer-bottom"><span>© 2026 Aeros</span><span>Decision-support prototype. Operational authority remains with authorized personnel.</span></div>
  </footer>
 </>;
}
