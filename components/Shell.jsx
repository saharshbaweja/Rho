'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {ArrowUpRight,BookOpen,BriefcaseBusiness,ChevronDown,CloudSun,FileCheck2,Gauge,GitBranch,MessagesSquare,Plane,RadioTower,SearchCheck,ShieldCheck,Sparkles,UsersRound} from 'lucide-react';

const platformGroups=[
 {label:'INTELLIGENCE + DECISION',items:[
  ['/product/mission-intelligence','Mission Intelligence','Turn every flight into a continuously evaluated operational state.',SearchCheck],
  ['/dashboard/','Operational Options','Compare viable paths forward when conditions change.',Sparkles],
  ['/product/briefing','Mission Briefs','Generate dispatcher and pilot briefs from the same reviewed evidence.',FileCheck2],
  ['/product/alerts','Change Monitoring','Re-evaluate only the conclusions affected by new conditions.',RadioTower]
 ]},
 {label:'OPERATING CONTEXT',items:[
  ['/product/operator-rules','OpSpecs & Manuals','Structure authorizations, procedures, MEL/CDL and company minima.',BookOpen],
  ['/product/live-data','Live Operational Data','Weather, NOTAMs, airports, charts and flight data in context.',CloudSun],
  ['/product/crew-aircraft','Crew & Aircraft','Qualifications, duty, currency, maintenance and aircraft limits.',UsersRound],
  ['/product/integrations','Integrations & API','Connect scheduling, OCC, maintenance, crew and flight systems.',GitBranch]
 ]}
];
const solutionGroups=[
 {label:'BY OPERATOR',items:[
  ['/solutions/part-135','Part 135 Charter','Mission acceptance and review for lean commercial operators.',Plane],
  ['/solutions/air-ambulance','Air Ambulance','Compress time-critical review without losing operational control.',BriefcaseBusiness],
  ['/solutions/corporate','Corporate Flight','Unify company policy, aircraft, crew and live trip context.',Gauge]
 ]},
 {label:'BY ROLE',items:[
  ['/solutions/dispatchers','Dispatch & OCC','Manage by exception instead of repeatedly assembling flight context.',SearchCheck],
  ['/solutions/directors-of-operations','Directors of Operations','Turn approved policy into a controlled operating layer.',BookOpen],
  ['/solutions/chief-pilots','Chief Pilots','Keep crew eligibility and company requirements in mission context.',UsersRound],
  ['/solutions/pilots','Pilots','Receive concise, current, source-backed operational briefs.',Plane]
 ]}
];
const resourceGroups=[
 {label:'LEARN',items:[
  ['/resources','Resource Center','Understand the product, architecture and operating model.',BookOpen],
  ['/product/','Platform Overview','See the complete intelligence, decision and monitoring stack.',Gauge],
  ['/dashboard/','Interactive Product','Open the live workspace and inspect the decision trace.',Plane]
 ]},
 {label:'DEPLOY',items:[
  ['/enterprise/','Trust & Control','Human approval, provenance, permissions and durable review state.',ShieldCheck],
  ['/implementation','Implementation','Start beside current systems and validate one real workflow.',GitBranch],
  ['/pricing/','Design Partner Program','Run real missions side-by-side before expanding scope.',MessagesSquare]
 ]}
];
function MegaMenu({groups,feature}){return <div className="mega-menu">{groups.map(group=><div className="mega-col" key={group.label}><div className="mega-label">{group.label}</div>{group.items.map(([href,title,desc,Icon])=><Link href={href} className="mega-item" key={href}><span className="mega-icon"><Icon size={14}/></span><span><b>{title}</b><span>{desc}</span></span></Link>)}</div>)}<div className="mega-feature"><div><small>{feature.eyebrow}</small><h3>{feature.title}</h3><p>{feature.body}</p></div><Link href={feature.href}>{feature.cta} <ArrowUpRight size={11}/></Link></div></div>}

export default function Shell({children}){
 const pathname=usePathname();
 if(pathname?.startsWith('/dashboard')) return <main className="product-only-shell">{children}</main>;
 return <>
  <div className="hv-announcement">Aeros is building the AI intelligence + operations layer for flight operations.<Link href="/dashboard/">See the live product →</Link></div>
  <header className="site-nav hv-nav">
   <Link href="/" className="hv-brand"><span><Plane size={14}/></span><b>AEROS</b></Link>
   <nav className="hv-nav-center">
    <div className="nav-menu"><Link href="/product/">Platform <ChevronDown size={11}/></Link><MegaMenu groups={platformGroups} feature={{eyebrow:'LIVE PRODUCT',title:'Conditions change. Aeros shows what remains possible.',body:'Open a mission to see operator rules, live conditions, impact analysis and ranked operational options on one surface.',href:'/dashboard/',cta:'Open Mission Workspace'}}/></div>
    <div className="nav-menu"><Link href="/solutions/">Solutions <ChevronDown size={11}/></Link><MegaMenu groups={solutionGroups} feature={{eyebrow:'START PART 135',title:'Deploy on real missions. Expand toward OCC automation.',body:'Begin with mission acceptance and review, then extend the same intelligence layer into planning, monitoring and recovery.',href:'/solutions/part-135',cta:'Explore Part 135'}}/></div>
    <div className="nav-menu"><Link href="/resources/">Resources <ChevronDown size={11}/></Link><MegaMenu groups={resourceGroups} feature={{eyebrow:'IMPLEMENTATION',title:'Integrate before you replace.',body:'Run Aeros beside the current stack, validate the operational reasoning layer, and expand only where it earns trust.',href:'/implementation',cta:'See implementation'}}/></div>
    <Link href="/enterprise/">Trust & Control</Link><Link href="/pricing/">Design Partners</Link>
   </nav>
   <div className="hv-nav-actions"><Link href="/login/" className="hv-login">Log in</Link><Link href="/contact/" className="hv-demo">Request a demo</Link></div>
  </header>
  <main>{children}</main>
  <footer className="hv-footer">
   <div className="footer-top"><div><Link href="/" className="hv-brand footer-brand"><span><Plane size={15}/></span><b>AEROS</b></Link><h2>The AI intelligence + operations layer for flight operations.</h2></div><Link href="/contact/" className="hv-demo">Request a demo <ArrowUpRight size={12}/></Link></div>
   <div className="footer-grid">
    <div><b>DECISION</b><Link href="/dashboard/">Mission Workspace</Link><Link href="/product/mission-intelligence">Mission Intelligence</Link><Link href="/dashboard/">Operational Options</Link><Link href="/product/briefing">Mission Briefs</Link></div>
    <div><b>CONTEXT</b><Link href="/product/operator-rules">OpSpecs & Manuals</Link><Link href="/product/live-data">Weather, NOTAMs & Charts</Link><Link href="/product/crew-aircraft">Crew & Aircraft</Link><Link href="/product/alerts">Change Monitoring</Link></div>
    <div><b>SOLUTIONS</b><Link href="/solutions/part-135">Part 135 Charter</Link><Link href="/solutions/air-ambulance">Air Ambulance</Link><Link href="/solutions/corporate">Corporate Flight</Link><Link href="/solutions/dispatchers">Dispatch & OCC</Link></div>
    <div><b>PLATFORM</b><Link href="/product/integrations">Integrations & API</Link><Link href="/implementation">Implementation</Link><Link href="/enterprise/">Trust & Control</Link><Link href="/pricing/">Design Partners</Link></div>
    <div><b>COMPANY</b><Link href="/about/">About</Link><Link href="/resources/">Resources</Link><Link href="/contact/">Contact</Link><Link href="/dashboard/">Product Demo</Link></div>
   </div>
   <div className="footer-bottom"><span>© 2026 Aeros</span><span>Decision-support prototype. Operational authority remains with authorized personnel.</span></div>
  </footer>
 </>;
}
