'use client';
import {motion} from 'framer-motion';

const jobs=[
 {name:'trial_184',dataset:'production_traces',status:'MEASURED',lift:'+4.2',cost:'$97/pt'},
 {name:'trial_185',dataset:'customer_bugs',status:'MEASURED',lift:'+3.1',cost:'$71/pt'},
 {name:'trial_186',dataset:'synthetic_debug',status:'SATURATED',lift:'+0.9',cost:'$211/pt'}
];

export default function RuntimeScene(){
 return <div className="runtimeScene">
  <div className="runtimeTop"><span>RHO MONITOR / RUN GRAPH</span><b>LIVE</b></div>
  <div className="runtimeCanvas">
   <div className="runtimeGrid"/>
   <motion.div className="runtimeCore" animate={{scale:[1,1.035,1]}} transition={{duration:3,repeat:Infinity}}><span>ρ</span><small>MONITOR</small></motion.div>
   {['DATASET','TRAIN','EVAL','COST','RESULT'].map((x,i)=><motion.div key={x} className={'runtimeNode rn'+i} animate={{y:[0,i%2?-5:5,0]}} transition={{duration:3+i*.2,repeat:Infinity,ease:'easeInOut'}}>{x}</motion.div>)}
   <div className="runtimePulse p1"/><div className="runtimePulse p2"/><div className="runtimePulse p3"/>
  </div>
  <div className="runtimeJobs">{jobs.map((j,i)=><motion.div key={j.name} initial={{opacity:0,x:-8}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*.08}}><span>{j.name}</span><b>{j.dataset}</b><em>{j.status}</em><strong>{j.lift}</strong><i>{j.cost}</i></motion.div>)}</div>
 </div>
}