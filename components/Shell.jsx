'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {AnimatePresence,motion,useScroll,useSpring} from 'framer-motion';
import {ArrowUpRight,ChevronDown,Menu,X} from 'lucide-react';
import {useEffect,useState} from 'react';

const featureLinks=[
 ['/product/','Rho Trials','Compare candidate datasets before the full run'],
 ['/index/','Rho Index','Benchmark the economic value of AI data'],
 ['/enterprise/','Enterprise','Private deployment and controls']
];
const resourceLinks=[
 ['/examples/','Examples','See Rho-style decisions in practice'],
 ['/about/','About','Why the data layer needs market infrastructure'],
 ['/contact/','Contact','Become a design partner']
];

export default function Shell({children}){
 const path=usePathname();
 const [open,setOpen]=useState(false);
 const [menu,setMenu]=useState(null);
 const [loaded,setLoaded]=useState(false);
 const {scrollYProgress}=useScroll();
 const scaleX=useSpring(scrollYProgress,{stiffness:140,damping:30,mass:.22});
 useEffect(()=>{const t=setTimeout(()=>setLoaded(true),850);return()=>clearTimeout(t)},[]);
 return <>
  <AnimatePresence>{!loaded&&<motion.div className="loader" exit={{opacity:0}} transition={{duration:.45}}><motion.div initial={{scale:.75,opacity:0}} animate={{scale:1,opacity:1}} className="loaderMark">ρ</motion.div><div className="loaderLine"><motion.i initial={{scaleX:0}} animate={{scaleX:1}} transition={{duration:.7,ease:[.76,0,.24,1]}}/></div><span>INITIALIZING DATA INTELLIGENCE</span></motion.div>}</AnimatePresence>
  <motion.div className="scrollProgress" style={{scaleX}}/>
  <div className="announcement"><span>RHO / PRIVATE BETA</span><span>Measure the marginal return of training data before the full run.</span><Link href="/contact/">JOIN DESIGN PARTNERS ↗</Link></div>
  <header className="nav">
   <Link href="/" className="brand"><b>ρ</b><span>RHO</span></Link>
   <nav className="desktopNav">
    <div className="navDrop" onMouseEnter={()=>setMenu('features')} onMouseLeave={()=>setMenu(null)}>
      <button>Product <ChevronDown size={12}/></button>
      <AnimatePresence>{menu==='features'&&<motion.div className="megaMenu" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:8}} transition={{duration:.18}}>
        <small>PRODUCT</small>{featureLinks.map(([href,title,copy])=><Link href={href} key={href}><b>{title}</b><span>{copy}</span></Link>)}
      </motion.div>}</AnimatePresence>
    </div>
    <Link href="/examples/" className={path==='/examples/'?'active':''}>Examples</Link>
    <Link href="/index/" className={path==='/index/'?'active':''}>Index</Link>
    <div className="navDrop" onMouseEnter={()=>setMenu('resources')} onMouseLeave={()=>setMenu(null)}>
      <button>Company <ChevronDown size={12}/></button>
      <AnimatePresence>{menu==='resources'&&<motion.div className="megaMenu rightMenu" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:8}} transition={{duration:.18}}>
        <small>RHO</small>{resourceLinks.map(([href,title,copy])=><Link href={href} key={href}><b>{title}</b><span>{copy}</span></Link>)}
      </motion.div>}</AnimatePresence>
    </div>
   </nav>
   <div className="navActions"><Link className="textCta" href="/contact/">Contact</Link><Link className="navCta" href="/contact/">Start a trial <ArrowUpRight size={13}/></Link></div>
   <button className="menu" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
  </header>
  <AnimatePresence>{open&&<motion.div className="mobileNav" initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}>
    {[...featureLinks,...resourceLinks].map(([h,l])=><Link onClick={()=>setOpen(false)} href={h} key={h}>{l}</Link>)}
  </motion.div>}</AnimatePresence>
  <AnimatePresence mode="wait"><motion.main key={path} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.25}}>{children}</motion.main></AnimatePresence>
  <footer className="megaFooter">
   <div className="footerTop">
    <div><Link href="/" className="brand footerBrand"><b>ρ</b><span>RHO</span></Link><h2>The economic layer<br/>for AI training data.</h2><p>Measure what data adds. Learn what it is worth. Build the market around it.</p></div>
    <div><b>PRODUCT</b><Link href="/product/">Rho Trials</Link><Link href="/index/">Rho Index</Link><Link href="/enterprise/">Enterprise</Link></div>
    <div><b>COMPANY</b><Link href="/about/">About</Link><Link href="/examples/">Examples</Link><Link href="/contact/">Contact</Link></div>
    <div><b>BUILDING TOWARD</b><span>Measure</span><span>Predict</span><span>Allocate</span><span>Benchmark</span><span>Transact</span></div>
   </div>
   <div className="footerMarquee"><span>MEASURE · COMPARE · ALLOCATE · BENCHMARK ·</span><span>MEASURE · COMPARE · ALLOCATE · BENCHMARK ·</span></div>
   <div className="footerBottom"><span>© 2026 Rho Labs — prototype</span><span>Illustrative product and index data</span></div>
  </footer>
 </>;
}
