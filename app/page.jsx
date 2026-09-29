'use client';
import Link from 'next/link';
import {ArrowUpRight, Check, Play} from 'lucide-react';
import {motion,useScroll,useTransform,AnimatePresence} from 'framer-motion';
import {useState} from 'react';
import Reveal from '../components/Reveal';
import MarketChart from '../components/MarketChart';
import Orb from '../components/Orb';
import Ticker from '../components/Ticker';
import MacProduct from '../components/MacProduct';
import CliDemo from '../components/CliDemo';
import MarketStory from '../components/MarketStory';
import ScrollStack from '../components/ScrollStack';

const candidates=[
 {name:'Production traces',lift:'+4.2 pts',cost:'$97 / pt',overlap:'13%',score:88},
 {name:'Customer bugs',lift:'+3.1 pts',cost:'$71 / pt',overlap:'19%',score:68},
 {name:'Synthetic traces',lift:'+0.9 pts',cost:'$211 / pt',overlap:'68%',score:26},
];

export default function Home(){
 const {scrollYProgress}=useScroll(); const y=useTransform(scrollYProgress,[0,.28],[0,-72]);
 const [step,setStep]=useState(0); const [playing,setPlaying]=useState(false);
 function runDemo(){setPlaying(true);setStep(0);[1,2,3].forEach((s,i)=>setTimeout(()=>setStep(s),(i+1)*650));setTimeout(()=>setPlaying(false),2900)}
 return <>
 <Ticker/>
 <section className="hero wrap">
   <Reveal className="heroCopy"><p className="eyebrow">Training data intelligence</p><h1>Know which data<br/>is worth <em>training on.</em></h1><p className="lede">Rho compares candidate datasets against your model and evals, then measures the lift, cost, overlap, and saturation before you commit to a full training run.</p><div className="actions"><Link href="/product/" className="btn">See how Rho works <ArrowUpRight size={14}/></Link><Link href="/contact/" className="ghost">Join private beta ↗</Link></div><div className="heroProof"><span><b>01</b> CONNECT</span><i/><span><b>02</b> RUN TRIALS</span><i/><span><b>03</b> CHOOSE DATA</span></div></Reveal>
   <motion.div style={{y}} className="heroVisual"><Orb/></motion.div>
 </section>

 <section className="demoBand">
  <div className="wrap demoGrid">
   <Reveal className="demoCopy"><p className="eyebrow">Rho Trials</p><h2 className="display">One decision.<br/><span>Which dataset next?</span></h2><p>Instead of training every candidate at full scale, Rho runs controlled small-scale trials and compares the marginal return of each dataset.</p><button onClick={runDemo} className="playBtn"><Play size={14} fill="currentColor"/>{playing?'Running trial…':'Run demo trial'}</button></Reveal>
   <Reveal delay={.08} className="trialDemo">
     <div className="trialDemoTop"><span>TRIAL / CODING-AGENT-014</span><b><i/> {playing?'RUNNING':'READY'}</b></div>
     <div className="trialInputs"><div><small>MODEL</small><strong>Qwen 3B</strong></div><div><small>EVAL</small><strong>Internal debugging</strong></div><div><small>SAMPLE</small><strong>25k / candidate</strong></div></div>
     <div className="trialProgress"><span style={{width:`${playing?Math.min(100,(step+1)*25):100}%`}}/></div>
     <div className="trialTable"><div className="trialHeader"><span>DATASET</span><span>LIFT</span><span>$/PT</span><span>OVERLAP</span></div>{candidates.map((c,i)=><motion.div key={c.name} className={`trialLine ${i===0&&step>=3?'winner':''}`} animate={{opacity: playing && step < i + 1 ? .35 : 1}}><strong>{c.name}</strong><span>{step>=i+1||!playing?c.lift:'—'}</span><span>{step>=i+1||!playing?c.cost:'—'}</span><span>{step>=i+1||!playing?c.overlap:'—'}</span></motion.div>)}</div>
     <AnimatePresence>{(!playing||step>=3)&&<motion.div className="decision" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}}><div><small>RECOMMENDED</small><strong>Production traces</strong></div><p>Highest absolute lift with low overlap. Estimated <b>71% less exploratory compute</b> than full-run comparison.</p><Check size={20}/></motion.div>}</AnimatePresence>
   </Reveal>
  </div>
 </section>

 <ScrollStack/>

 <MacProduct/>

 <CliDemo/>

 <MarketStory/>

 <section className="dark era"><div className="wrap"><Reveal><p className="eyebrow">Why now</p><h2 className="display light">Models became measurable.<br/>Compute became priced.<br/><span>Data is next.</span></h2></Reveal><div className="eraGrid"><Reveal><article><small>2018—2022</small><h3>Models</h3><div className="matrix">{Array.from({length:40}).map((_,i)=><i key={i}/>)}</div><p>Benchmarks made model performance comparable.</p></article></Reveal><Reveal delay={.08}><article><small>2022—2025</small><h3>Compute</h3><div className="ringsViz"><i/><i/><i/><b>GPU</b></div><p>Capacity became a measurable economic input.</p></article></Reveal><Reveal delay={.16}><article><small>2026 →</small><h3>Data</h3><div className="rhoDisc"><span>ρ</span></div><p>Rho measures the marginal value of the data layer.</p></article></Reveal></div></div></section>

 <section className="section wrap"><Reveal><p className="eyebrow">Product</p><h2 className="display">Start with Trials.<br/><span>Earn the right to build the market.</span></h2></Reveal><div className="productGrid"><Reveal><Link href="/product/" className="productCard"><small>01 / RHO TRIALS</small><h3>Measure what moves the model.</h3><p>Compare candidate datasets against your exact model and evals before a full training run.</p><div className="bars"><i style={{'--w':'88%'}}/><i style={{'--w':'61%'}}/><i style={{'--w':'24%'}}/></div><b>Explore Trials ↗</b></Link></Reveal><Reveal delay={.08}><Link href="/index/" className="productCard darkCard"><small>02 / RHO INDEX</small><h3>A reference point for data value.</h3><p>Turn measured outcomes into benchmarks across data categories, tasks, and model families.</p><div className="miniIndex"><span>RDI-CODE</span><strong>51.80</strong><em>+4.6%</em></div><b>Explore the Index ↗</b></Link></Reveal></div></section>

 <section className="section wrap indexFeature"><Reveal className="stickyCopy"><p className="eyebrow">Long-term market layer</p><h2 className="display">From private trials to a <span>shared reference price.</span></h2><p className="lede">As Rho observes more experiments and transactions, it can turn isolated data decisions into market-wide intelligence no single buyer can reproduce alone.</p><Link href="/index/" className="ghost">See Rho Index ↗</Link></Reveal><Reveal><MarketChart/></Reveal></section>

 <section className="dark trust"><div className="wrap"><Reveal><h2 className="display light">Simple to understand.<br/>Hard to reproduce.<br/>Built to compound.</h2></Reveal><div className="trustGrid"><Reveal><article><span>01</span><h3>Transparent</h3><p>Every recommendation is grounded in actual controlled experiments, not a black-box score.</p></article></Reveal><Reveal delay={.07}><article><span>02</span><h3>Embedded</h3><p>Rho fits into the training workflow through cloud, SDK, and API surfaces.</p></article></Reveal><Reveal delay={.14}><article><span>03</span><h3>Networked</h3><p>Each observed trial improves the benchmark layer that an individual company cannot build alone.</p></article></Reveal></div></div></section>

 <section className="cta"><div className="wrap"><Reveal><p className="eyebrow">Private beta</p><h2>Know what your data<br/>is actually worth.</h2><Link href="/contact/" className="btn">Become a design partner <ArrowUpRight size={14}/></Link></Reveal></div></section>
 </>}