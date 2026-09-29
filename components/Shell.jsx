'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {AnimatePresence,motion,useScroll,useSpring} from 'framer-motion';
import {ArrowUpRight,Menu,X} from 'lucide-react';
import {useEffect,useState} from 'react';

const links=[['/product/','Rho Trials'],['/index/','Rho Index'],['/about/','Company']];
export default function Shell({children}){
 const path=usePathname(); const [open,setOpen]=useState(false); const [loaded,setLoaded]=useState(false);
 const {scrollYProgress}=useScroll(); const scaleX=useSpring(scrollYProgress,{stiffness:150,damping:28,mass:.2});
 useEffect(()=>{const t=setTimeout(()=>setLoaded(true),1100);return()=>clearTimeout(t)},[]);
 return <>
 <AnimatePresence>{!loaded&&<motion.div className="loader" exit={{opacity:0}} transition={{duration:.55}}><motion.div initial={{scale:.7,opacity:0}} animate={{scale:1,opacity:1}} className="loaderMark">ρ</motion.div><div className="loaderLine"><motion.i initial={{scaleX:0}} animate={{scaleX:1}} transition={{duration:.85,ease:[.76,0,.24,1]}}/></div><span>MEASURING THE DATA LAYER</span></motion.div>}</AnimatePresence>
 <motion.div className="scrollProgress" style={{scaleX}}/>
 <div className="announcement"><span>RHO / PRIVATE BETA</span><span>Measuring the marginal return of training data</span><Link href="/contact/">BECOME A DESIGN PARTNER ↗</Link></div>
 <header className="nav"><Link href="/" className="brand"><b>ρ</b><span>RHO</span></Link><nav>{links.map(([href,label])=><Link key={href} href={href} className={path===href?'active':''}>{label}</Link>)}</nav><Link className="navCta" href="/contact/">Join beta <ArrowUpRight size={13}/></Link><button className="menu" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></header>
 <AnimatePresence>{open&&<motion.div className="mobileNav" initial={{opacity:0,y:-12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}}>{links.map(([h,l])=><Link onClick={()=>setOpen(false)} href={h} key={h}>{l}</Link>)}</motion.div>}</AnimatePresence>
 <AnimatePresence mode="wait"><motion.main key={path} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.35}}>{children}</motion.main></AnimatePresence>
 <footer><div className="footerClaim"><span>Measure the data.</span><strong>Then build the market.</strong></div><div className="footerGrid"><div><Link href="/" className="brand"><b>ρ</b><span>RHO</span></Link><p>Rho measures which training data creates the most model performance for the next dollar.</p></div><div><b>PRODUCT</b><Link href="/product/">Platform</Link><Link href="/index/">Rho Index</Link></div><div><b>COMPANY</b><Link href="/about/">About</Link><Link href="/contact/">Contact</Link></div><div><b>STATUS</b><span>Private beta</span><span>Atlanta / SF</span></div></div><div className="footerBottom"><span>© 2026 Rho Labs, Inc. Prototype</span><span>Illustrative market data — not a live benchmark</span></div></footer>
 </>}