'use client';
import {motion} from 'framer-motion';

const nodes=[
 {label:'MODEL',x:-140,y:-88,z:1},{label:'EVAL',x:132,y:-92,z:2},{label:'CORPUS',x:-154,y:92,z:3},
 {label:'DATA A',x:126,y:100,z:4},{label:'DATA B',x:0,y:-145,z:5},{label:'DATA C',x:0,y:148,z:6}
];

export default function RhoGraph3D(){
 return <div className="graphScene">
  <div className="graphGrid"/>
  <motion.div className="graphCore" animate={{rotateY:[-8,8,-8],rotateX:[5,-3,5]}} transition={{duration:10,repeat:Infinity,ease:'easeInOut'}}>
    <div className="coreCube">
      <div className="cubeFace front"><span>ρ</span><small>TRIAL ENGINE</small></div>
      <div className="cubeFace back"/>
      <div className="cubeFace left"/>
      <div className="cubeFace right"/>
      <div className="cubeFace top"/>
      <div className="cubeFace bottom"/>
    </div>
  </motion.div>
  <svg className="graphLines" viewBox="0 0 600 500" preserveAspectRatio="none">
   {nodes.map((n,i)=><motion.line key={n.label} x1={300+n.x*.78} y1={250+n.y*.72} x2="300" y2="250" initial={{pathLength:0,opacity:0}} animate={{pathLength:1,opacity:.45}} transition={{delay:.3+i*.08,duration:.8}}/>)}
  </svg>
  {nodes.map((n,i)=><motion.div key={n.label} className="graphNode" style={{left:'calc(50% + '+n.x+'px)',top:'calc(50% + '+n.y+'px)'}} initial={{opacity:0,scale:.7}} animate={{opacity:1,scale:1,y:[0,-6,0]}} transition={{opacity:{delay:.15+i*.06},scale:{delay:.15+i*.06},y:{duration:3+i*.2,repeat:Infinity,ease:'easeInOut'}}}><span>{n.label}</span><i>{String(n.z).padStart(2,'0')}</i></motion.div>)}
  <div className="graphLegend"><span><i/>INPUT</span><span><i/>MEASURED SIGNAL</span><span><i/>DECISION</span></div>
 </div>
}