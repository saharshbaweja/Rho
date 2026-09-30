'use client';
import {useState} from 'react';
import {motion,AnimatePresence} from 'framer-motion';
import Reveal from './Reveal';

const steps=[
 {n:'01',title:'Index the decision',copy:'Rho fingerprints your current corpus, candidate datasets, model, eval suite, and training recipe to understand what is already represented and what each candidate could add.',label:'CONTEXT GRAPH'},
 {n:'02',title:'Run controlled trials',copy:'Small standardized fine-tuning runs compare each dataset under the same recipe. Rho records downstream lift, compute, overlap, learning curves, and uncertainty.',label:'TRIAL SWARM'},
 {n:'03',title:'Learn what is worth it',copy:'Rho ranks the candidates by marginal performance per dollar and stores the full decision record so future trials begin with more context.',label:'ECONOMIC MEMORY'}
];

export default function HowRhoWorks(){
 const [active,setActive]=useState(0);
 return <section className="howSection"><div className="wrap">
  <Reveal><p className="eyebrow">Rho Trials</p><h2 className="sectionTitle">How Rho evaluates<br/>every dataset.</h2><p className="sectionLead">A controlled system for turning a training-data decision into measurable evidence.</p></Reveal>
  <div className="howGrid">
   <div className="howSteps">{steps.map((s,i)=><button onMouseEnter={()=>setActive(i)} onClick={()=>setActive(i)} className={active===i?'active':''} key={s.n}><span>STEP {s.n}</span><b>{s.title}</b><p>{s.copy}</p></button>)}</div>
   <div className="howVisual">
    <AnimatePresence mode="wait"><motion.div key={active} className={'howCanvas state'+active} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}} transition={{duration:.3}}>
      <div className="howCanvasTop"><span>{steps[active].label}</span><b>RHO / LIVE</b></div>
      {active===0&&<div className="contextGraph">
        {['MODEL','EVAL','CORPUS','DATA A','DATA B','DATA C'].map((x,i)=><motion.div key={x} className={'cgNode cg'+i} animate={{scale:[1,1.04,1]}} transition={{duration:2+i*.15,repeat:Infinity}}>{x}</motion.div>)}
        <div className="cgCore">ρ</div>
      </div>}
      {active===1&&<div className="trialSwarm">{['A','B','C'].map((x,i)=><div key={x} className="swarmRow"><span>DATA {x}</span><div><motion.i initial={{width:0}} animate={{width:[88,64,33][i]+'%'}} transition={{duration:.8,delay:i*.12}}/></div><b>{['+4.2','+3.1','+0.9'][i]} pts</b></div>)}</div>}
      {active===2&&<div className="memoryViz"><div className="memWinner"><small>RECOMMENDED</small><strong>Production traces</strong><span>+4.2 pts / 13% overlap</span></div><div className="memGrid"><div><small>CONFIDENCE</small><b>87%</b></div><div><small>COMPUTE SAVED</small><b>71%</b></div><div><small>$/POINT</small><b>$97</b></div><div><small>HISTORY</small><b>184 trials</b></div></div></div>}
    </motion.div></AnimatePresence>
   </div>
  </div>
 </div></section>
}