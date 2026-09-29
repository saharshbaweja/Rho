'use client';
import {motion} from 'framer-motion';

export default function Orb(){
 const labels=['MODEL','EVAL','CORPUS','DATA A','DATA B','DATA C'];
 return <div className="orb productOrb">
  <motion.div className="orbRing r1" animate={{rotate:360}} transition={{duration:18,repeat:Infinity,ease:'linear'}}/>
  <motion.div className="orbRing r2" animate={{rotate:-360}} transition={{duration:24,repeat:Infinity,ease:'linear'}}/>
  <motion.div className="orbRing r3" animate={{rotate:360}} transition={{duration:32,repeat:Infinity,ease:'linear'}}/>
  <motion.div className="rhoCore" animate={{scale:[1,1.035,1]}} transition={{duration:3,repeat:Infinity}}>
    <span>ρ</span><small>TRIAL ENGINE</small>
  </motion.div>
  {labels.map((label,i)=><motion.div className={'orbitNode node'+i} key={label} style={{transform:`rotate(${i*60}deg) translateX(154px) rotate(-${i*60}deg)`}} animate={{opacity:[.45,1,.45]}} transition={{duration:2.5,repeat:Infinity,delay:i*.22}}><b>{label}</b></motion.div>)}
  <div className="orbReadout"><span>COMPARE</span><i/> <span>MEASURE</span><i/> <span>DECIDE</span></div>
 </div>
}