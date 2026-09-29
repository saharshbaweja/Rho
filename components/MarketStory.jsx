'use client';
import {motion,useScroll,useTransform} from 'framer-motion';
import Reveal from './Reveal';

const chapters=[
 {n:'01',tag:'TODAY',title:'Measure',copy:'Run controlled trials to learn which candidate dataset creates the most downstream performance for the next dollar.',metric:'Dataset → lift / cost'},
 {n:'02',tag:'NEXT',title:'Predict',copy:'Use accumulated trial history to estimate which data is likely to work before spending on a full training run.',metric:'History → expected return'},
 {n:'03',tag:'SYSTEM',title:'Allocate',copy:'Turn training-data budgets into a portfolio problem: where should the next dollar of generation, licensing, or labeling go?',metric:'Budget → data portfolio'},
 {n:'04',tag:'NETWORK',title:'Benchmark',copy:'Aggregate enough measured outcomes to create neutral reference indices across data categories, model families, and tasks.',metric:'Outcomes → Rho Index'},
 {n:'05',tag:'MARKET',title:'Transact',copy:'Once value is measurable and comparable, Rho can become infrastructure for procurement, pricing, and eventually risk transfer.',metric:'Index → market rails'}
];

export default function MarketStory(){
 const {scrollYProgress}=useScroll();
 const x=useTransform(scrollYProgress,[.38,.8],['-8%','8%']);
 return <section className="storySection">
  <div className="storyPrism" />
  <div className="wrap storyIntro">
   <Reveal><p className="eyebrow">The full Rho thesis</p><h2 className="display">Start with one expensive decision.<br/><span>Build the market around it.</span></h2></Reveal>
   <Reveal delay={.08}><p className="lede">Rho does not begin as a marketplace. It begins as a measurement product useful on day one. Each stage earns the next.</p></Reveal>
  </div>
  <motion.div className="storyRail" style={{x}}>
   {chapters.map((c,i)=><article key={c.n} className="storyCard">
    <div className="storyNum">{c.n}</div>
    <div className="storyTag">{c.tag}</div>
    <h3>{c.title}</h3>
    <p>{c.copy}</p>
    <div className="storyMetric">{c.metric}</div>
    <div className="storyBeam" />
   </article>)}
  </motion.div>
  <div className="wrap storyBottom">
   <Reveal><div className="marketEquation"><span>PRIVATE EXPERIMENTS</span><i>→</i><span>SHARED INTELLIGENCE</span><i>→</i><span>REFERENCE PRICING</span><i>→</i><span>MARKET INFRASTRUCTURE</span></div></Reveal>
  </div>
 </section>
}