'use client';
import {motion,useMotionValue,useSpring,useTransform} from 'framer-motion';

const cubes=[
 {x:8,y:15,z:0,label:'MODEL',c:'mint'},
 {x:72,y:12,z:1,label:'EVAL',c:'lav'},
 {x:12,y:70,z:2,label:'CORPUS',c:'blue'},
 {x:76,y:72,z:3,label:'DATA',c:'peach'},
 {x:42,y:4,z:4,label:'RUN',c:'yellow'},
 {x:44,y:82,z:5,label:'COST',c:'pink'}
];

export default function VoxelScene(){
 const mx=useMotionValue(0), my=useMotionValue(0);
 const sx=useSpring(mx,{stiffness:90,damping:18}), sy=useSpring(my,{stiffness:90,damping:18});
 const rx=useTransform(sy,[-1,1],[7,-7]), ry=useTransform(sx,[-1,1],[-9,9]);
 function move(e){const r=e.currentTarget.getBoundingClientRect();mx.set(((e.clientX-r.left)/r.width-.5)*2);my.set(((e.clientY-r.top)/r.height-.5)*2)}
 function leave(){mx.set(0);my.set(0)}
 return <div className="voxelScene" onMouseMove={move} onMouseLeave={leave}>
   <div className="pixelGrid"/>
   <motion.div className="sceneParallax" style={{rotateX:rx,rotateY:ry}}>
    <svg className="voxelLines" viewBox="0 0 100 100" preserveAspectRatio="none">
     {cubes.map((c,i)=><motion.line key={c.label} x1={c.x+6} y1={c.y+5} x2="50" y2="50" initial={{pathLength:0,opacity:0}} animate={{pathLength:1,opacity:.4}} transition={{delay:.25+i*.08,duration:.7}}/>)}
    </svg>
    <motion.div className="rhoVoxel" animate={{y:[0,-7,0],rotateZ:[0,1.2,0]}} transition={{duration:4,repeat:Infinity,ease:'easeInOut'}}>
     <div className="rhoVoxelTop"><span>ρ</span><i/><i/><i/></div><div className="rhoVoxelSide"/><div className="rhoVoxelBottom"/><small>TRIAL ENGINE</small>
    </motion.div>
    {cubes.map((c,i)=><motion.div key={c.label} className={'dataCube '+c.c} style={{left:c.x+'%',top:c.y+'%'}} initial={{opacity:0,scale:.8}} animate={{opacity:1,scale:1,y:[0,-4,0]}} transition={{opacity:{delay:.12+i*.08},scale:{delay:.12+i*.08},y:{duration:3+i*.2,repeat:Infinity,ease:'easeInOut'}}}><span>{c.label}</span><i>{String(i+1).padStart(2,'0')}</i><b className="cubeSignal">{i%2?'101':'010'}</b></motion.div>)}
   </motion.div>
   <div className="sceneInterference"><i/><i/><i/><i/><i/><i/></div>
   <div className="sceneReadout"><span>INPUTS</span><b>→</b><span>TRIALS</span><b>→</b><span>RETURN</span></div>
 </div>
}