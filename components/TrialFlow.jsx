'use client';
import {useState} from 'react';
import {motion,AnimatePresence} from 'framer-motion';

const steps=[
 {k:'01',t:'Index the decision',d:'Connect the model, eval suite, current corpus, and candidate datasets.',v:'graph'},
 {k:'02',t:'Run controlled trials',d:'Standardize recipes and sample sizes so candidate datasets are actually comparable.',v:'bars'},
 {k:'03',t:'Measure marginal value',d:'Estimate lift, overlap, saturation, compute, and cost-per-point.',v:'metrics'}
];

export default function TrialFlow(){
 const [active,setActive]=useState(0);
 return <div className="trialFlow">
  <div className="flowSteps">{steps.map((s,i)=><button key={s.k} className={active===i?'active':''} onMouseEnter={()=>setActive(i)} onClick={()=>setActive(i)}><span>STEP {s.k}</span><b>{s.t}</b><p>{s.d}</p></button>)}</div>
  <div className="flowStage"><AnimatePresence mode="wait"><motion.div key={active} className="flowCanvas" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}}>
   <div className="flowTop"><span>RHO / TRIAL_0184</span><b>LIVE</b></div>
   {active===0&&<div className="flowGraph"><div className="flowCore">ρ</div>{['MODEL','EVAL','CORPUS','DATA A','DATA B','DATA C'].map((x,i)=><div className={'flowNode n'+i} key={x}>{x}</div>)}</div>}
   {active===1&&<div className="flowBars">{[['A',88,'+4.2'],['B',64,'+3.1'],['C',31,'+0.9']].map(([n,w,v])=><div key={n}><span>DATA {n}</span><i><b style={{width:w+'%'}}/></i><strong>{v} pts</strong></div>)}</div>}
   {active===2&&<div className="flowMetrics"><div><small>LIFT</small><strong>+4.2</strong></div><div><small>OVERLAP</small><strong>13%</strong></div><div><small>$/PT</small><strong>$97</strong></div><div><small>CONF.</small><strong>87%</strong></div><p>Allocate the next full run to <b>Production traces</b>.</p></div>}
  </motion.div></AnimatePresence></div>
 </div>
}