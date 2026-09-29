'use client';
import {useState} from 'react';
import {motion} from 'framer-motion';
const sets={
 '1W':[48,48.5,47.8,49.2,49.8,50.1,51.8],
 '1M':[45,44.5,46,45.2,47.1,46.7,48.9,48.4,49.7,50.2,49.8,51,51.8],
 '3M':[42,43.1,42.7,44.4,43.8,45.2,46.4,45.9,47.6,46.9,48.1,49.5,48.8,50.2,49.8,51.1,50.7,51.8]
};
function pts(vals,w=760,h=300){const min=Math.min(...vals)-1,max=Math.max(...vals)+1;return vals.map((v,i)=>`${(i/(vals.length-1))*w},${h-((v-min)/(max-min))*h}`).join(' ')}
export default function MarketChart({compact=false}){const [range,setRange]=useState('1M');const p=pts(sets[range]);return <div className={'marketWidget '+(compact?'compact':'')}>
 <div className="marketHead"><div><span>RHO DATA INDEX</span><strong>RDI-CODE</strong></div><div className="quote"><b>51.80</b><em>+4.6% / 30D</em></div></div>
 <div className="ranges">{Object.keys(sets).map(r=><button className={r===range?'on':''} onClick={()=>setRange(r)} key={r}>{r}</button>)}</div>
 <div className="svgWrap"><svg viewBox="0 0 760 300" preserveAspectRatio="none"><defs><linearGradient id="fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#d8ff45" stopOpacity=".18"/><stop offset="1" stopColor="#d8ff45" stopOpacity="0"/></linearGradient></defs>{[60,120,180,240].map(y=><line key={y} x1="0" x2="760" y1={y} y2={y} stroke="#d6d2c8" strokeWidth="1"/>)}<motion.polyline key={range+'a'} initial={{pathLength:0}} animate={{pathLength:1}} transition={{duration:1.2,ease:[.16,1,.3,1]}} fill="none" stroke="#0c0d0b" strokeWidth="2" points={p}/><motion.polygon key={range+'b'} initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.6}} fill="url(#fill)" points={`0,300 ${p} 760,300`}/></svg></div>
 <div className="marketMeta"><span>AUG 29</span><span>SEP 29</span><span>PROTOTYPE / NORMALIZED LIFT INDEX</span></div></div>}
