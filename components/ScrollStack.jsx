'use client';
import {motion,useScroll,useTransform} from 'framer-motion';
import {useRef} from 'react';
import Reveal from './Reveal';

const cards=[
 {n:'01',tag:'CONNECT',title:'Bring the decision into Rho.',copy:'Model checkpoint, target eval, current corpus, and the candidate datasets you are deciding between.',visual:'connect'},
 {n:'02',tag:'TRIAL',title:'Run smaller, controlled comparisons.',copy:'Rho standardizes sample size, recipe, compute, and evaluation so each candidate is measured on the same footing.',visual:'trial'},
 {n:'03',tag:'MEASURE',title:'See what each dataset actually adds.',copy:'Lift, overlap, learning-curve slope, saturation, and cost-per-point turn a fuzzy data question into an economic signal.',visual:'measure'},
 {n:'04',tag:'DECIDE',title:'Allocate the next full run with evidence.',copy:'Rho ranks the candidates, explains why, and records the result so every future decision starts smarter.',visual:'decide'}
];

function Viz({type}){
 if(type==='connect') return <div className="stackViz nodes"><span>MODEL</span><i>+</i><span>EVAL</span><i>+</i><span>DATA A</span><span>DATA B</span><span>DATA C</span><b>→ ρ</b></div>;
 if(type==='trial') return <div className="stackViz trials"><div><span>A</span><i style={{'--w':'76%'}}/></div><div><span>B</span><i style={{'--w':'58%'}}/></div><div><span>C</span><i style={{'--w':'31%'}}/></div><small>CONTROLLED RUNS / SAME RECIPE</small></div>;
 if(type==='measure') return <div className="stackViz metricViz"><div><small>Δ EVAL</small><strong>+4.2</strong></div><div><small>OVERLAP</small><strong>13%</strong></div><div><small>$/PT</small><strong>$97</strong></div><div><small>CONF.</small><strong>87%</strong></div></div>;
 return <div className="stackViz winnerViz"><small>RECOMMENDED DATASET</small><strong>Production traces</strong><p>Highest marginal return.<br/>Low redundancy. Steep early learning curve.</p><span>ALLOCATE NEXT FULL RUN →</span></div>;
}

function StackCard({c,i}){
 const ref=useRef(null);
 const {scrollYProgress}=useScroll({target:ref,offset:['start 85%','end 25%']});
 const scale=useTransform(scrollYProgress,[0,.5,1],[.965,1,.985]);
 const y=useTransform(scrollYProgress,[0,.5,1],[34,0,-10]);
 return <motion.article ref={ref} className={'stackCard stack'+i} style={{scale,y}}>
   <div className="stackCopy"><span>{c.n} / {c.tag}</span><h3>{c.title}</h3><p>{c.copy}</p></div>
   <Viz type={c.visual}/>
 </motion.article>
}

export default function ScrollStack(){
 return <section className="scrollStory">
   <div className="wrap stackIntro"><Reveal><p className="eyebrow">How Rho works</p><h2 className="display">A training-data decision,<br/><span>made visible.</span></h2></Reveal><Reveal delay={.08}><p className="lede">The product is the story. Scroll through a Rho Trial from inputs to allocation.</p></Reveal></div>
   <div className="wrap stackWrap">{cards.map((c,i)=><StackCard c={c} i={i} key={c.n}/>)}</div>
 </section>
}