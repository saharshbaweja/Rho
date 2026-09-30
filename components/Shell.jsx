'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {AnimatePresence,motion,useScroll,useSpring} from 'framer-motion';
import {ChevronDown,Menu,X,ArrowUpRight} from 'lucide-react';
import {useEffect,useState} from 'react';

const product=[
 ['/product/','Rho Trials','The training-data decision engine'],
 ['/cli/','Rho CLI','Run trials from the terminal'],
 ['/context/','Rho Context','Learning + experiment memory'],
 ['/integrations/','Rho Stack','Model-agnostic integration layer'],
 ['/index/','Rho Index','Reference benchmarks for data value']
];
const company=[
 ['/examples/','Examples','Illustrative Rho trial records'],
 ['/methodology/','Methodology','How Rho measures marginal value'],
 ['/enterprise/','Enterprise','Private deployment + controls'],
 ['/pricing/','Pricing','Private beta commercial model'],
 ['/about/','About','Why the data layer needs infrastructure']
];

export default function Shell({children}){
 const path=usePathname(); const [open,setOpen]=useState(false); const [menu,setMenu]=useState(null); const [loaded,setLoaded]=useState(false);
 const {scrollYProgress}=useScroll(); const scaleX=useSpring(scrollYProgress,{stiffness:150,damping:30});
 useEffect(()=>{const t=setTimeout(()=>setLoaded(true),700);return()=>clearTimeout(t)},[]);
 return <>
 <AnimatePresence>{!loaded&&<motion.div className="pxLoader" exit={{opacity:0}}><div className="pxLogo"><i/><i/><i/><i/><b>ρ</b></div><span>INDEXING THE DATA LAYER</span></motion.div>}</AnimatePresence>
 <motion.div className="pxProgress" style={{scaleX}}/>
 <div className="pxAnnouncement"><span>RHO / PRIVATE BETA</span><span>Measure training data before the expensive run.</span><Link href="/contact/">REQUEST ACCESS ↗</Link></div>
 <header className="pxNav">
   <Link href="/" className="pxBrand"><div><i/><i/><i/><i/></div><b>ρ</b><span>RHO</span></Link>
   <nav className="pxDesktop">
    <div className="pxDrop" onMouseEnter={()=>setMenu('product')} onMouseLeave={()=>setMenu(null)}><button>Product <ChevronDown size={12}/></button>
      <AnimatePresence>{menu==='product'&&<motion.div className="pxMega" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:8}}>
        <small>PRODUCT</small>{product.map(([h,t,d],i)=><Link href={h} key={h}><span>{String(i+1).padStart(2,'0')}</span><div><b>{t}</b><p>{d}</p></div></Link>)}
      </motion.div>}</AnimatePresence>
    </div>
    <Link href="/examples/">Examples</Link>
    <Link href="/pricing/">Pricing</Link>
    <div className="pxDrop" onMouseEnter={()=>setMenu('company')} onMouseLeave={()=>setMenu(null)}><button>Resources <ChevronDown size={12}/></button>
      <AnimatePresence>{menu==='company'&&<motion.div className="pxMega right" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:8}}>
        <small>RHO</small>{company.map(([h,t,d],i)=><Link href={h} key={h}><span>{String(i+1).padStart(2,'0')}</span><div><b>{t}</b><p>{d}</p></div></Link>)}
      </motion.div>}</AnimatePresence>
    </div>
   </nav>
   <div className="pxNavCtas"><Link href="/contact/" className="pxTextLink">Contact</Link><Link href="/contact/" className="pxButton">Start a trial <ArrowUpRight size={12}/></Link></div>
   <button className="pxMenu" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
 </header>
 <AnimatePresence>{open&&<motion.div className="pxMobile" initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}>{[...product,...company].map(([h,t])=><Link onClick={()=>setOpen(false)} href={h} key={h}>{t}</Link>)}</motion.div>}</AnimatePresence>
 <AnimatePresence mode="wait"><motion.main key={path} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.22}}>{children}</motion.main></AnimatePresence>
 <footer className="pxFooter">
  <div className="pxFooterCta"><div className="pxFootMark">ρ</div><h2>Measure the data.<br/>Then build the market.</h2><Link href="/contact/" className="pxButton light">Request access ↗</Link></div>
  <div className="pxFooterGrid">
   <div><Link href="/" className="pxBrand footer"><div><i/><i/><i/><i/></div><b>ρ</b><span>RHO</span></Link><p>The training-data intelligence layer.</p></div>
   <div><b>PRODUCT</b>{product.map(([h,t])=><Link href={h} key={h}>{t}</Link>)}</div>
   <div><b>COMPANY</b>{company.map(([h,t])=><Link href={h} key={h}>{t}</Link>)}</div>
   <div><b>BUILDING TOWARD</b><span>Measure</span><span>Predict</span><span>Allocate</span><span>Benchmark</span><span>Transact</span></div>
  </div>
  <div className="pxTicker"><span>MEASURE · COMPARE · ALLOCATE · BENCHMARK ·</span><span>MEASURE · COMPARE · ALLOCATE · BENCHMARK ·</span></div>
  <div className="pxFootBottom"><span>© 2026 Rho Labs — prototype</span><span>Illustrative product and index data</span></div>
 </footer>
 </>;
}