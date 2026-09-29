 'use client';
import {useState} from 'react';
import {motion} from 'framer-motion';
import Reveal from './Reveal';

const candidates=[
 {name:'Production traces',lift:'+4.2 pts',cost:'$97 / pt',overlap:'13%'},
 {name:'Customer bugs',lift:'+3.1 pts',cost:'$71 / pt',overlap:'19%'},
 {name:'Synthetic traces',lift:'+0.9 pts',cost:'$211 / pt',overlap:'68%'}
];

export default function MacProduct(){
 const [mode,setMode]=useState('overview');
 const [running,setRunning]=useState(false);
 const [tick,setTick]=useState(0);
 const logs=['Loading candidate datasets…','Sampling 25,000 rows / candidate','Embedding current corpus','Estimating overlap matrix','Launching trial: production_traces','Launching trial: customer_bugs','Launching trial: synthetic_traces','Evaluating debugging benchmark','Fitting learning curves','Computing marginal lift / $','Recommendation ready'];
 function start(){setRunning(true);setTick(0);logs.forEach((_,i)=>setTimeout(()=>setTick(i+1),i*280));setTimeout(()=>setRunning(false),logs.length*280+400)}
 return <section className="productStage"><div className="wrap">
  <Reveal><p className="eyebrow">Live product</p><h2 className="display">Watch Rho make the <span>data decision.</span></h2></Reveal>
  <Reveal delay={.08}><div className="macScene"><div className="macGlow"/>
    <div className="macbook">
      <div className="macTop"><div className="macDots"><i/><i/><i/></div><div className="macTitle">Rho / Coding Agent / Trial 0184</div><button onClick={start}>{running?'RUNNING…':'RUN TRIAL'}</button></div>
      <div className="macTabs">{['overview','logs','analysis'].map(t=><button key={t} onClick={()=>setMode(t)} className={mode===t?'active':''}>{t}</button>)}</div>
      <div className="macBody">
        <aside><small>PROJECT</small><strong>Coding Agent v4</strong><small>MODEL</small><strong>Qwen 3B</strong><small>EVAL</small><strong>Debugging Eval</strong><small>BASELINE</small><strong>51.8%</strong><small>CANDIDATES</small><span>3 datasets</span></aside>
        <div className="macMain">
          {mode==='overview'&&<div className="overviewPane">
            <div className="kpis"><div><small>BEST LIFT</small><strong>+4.2 pts</strong><span>Production traces</span></div><div><small>COMPUTE SAVED</small><strong>71%</strong><span>vs. full comparison</span></div><div><small>LOWEST OVERLAP</small><strong>13%</strong><span>Production traces</span></div></div>
            <div className="datasetRank"><div className="rankHead"><span>DATASET</span><span>LIFT</span><span>$/PT</span><span>OVERLAP</span></div>{candidates.map((x,i)=><div className={i===0?'rankRow top':'rankRow'} key={x.name}><span>{i+1}. {x.name}</span><b>{x.lift}</b><span>{x.cost}</span><span>{x.overlap}</span></div>)}</div>
            <div className="sparkPanel"><div><small>LEARNING CURVE</small><strong>Production traces</strong></div><svg viewBox="0 0 500 120" preserveAspectRatio="none"><polyline points="0,105 75,88 145,71 210,53 280,39 360,31 430,27 500,25" fill="none" stroke="currentColor" strokeWidth="2"/></svg></div>
          </div>}
          {mode==='logs'&&<div className="logsPane">{logs.map((l,i)=><motion.div key={l} animate={{opacity:tick>i||!running?1:.18}}><span>{String(i+1).padStart(2,'0')}</span><code>{l}</code>{tick>i||!running?<b>✓</b>:<i/>}</motion.div>)}</div>}
          {mode==='analysis'&&<div className="analysisPane"><div><small>WHY THIS WON</small><h3>Production traces add the most new task-relevant information.</h3><p>Low corpus overlap, strong alignment with debugging failures, and a steeper early learning curve create the highest expected marginal return.</p></div><div className="analysisGrid"><div><small>REDUNDANCY</small><strong>13%</strong></div><div><small>TARGET ALIGNMENT</small><strong>0.84</strong></div><div><small>SATURATION</small><strong>~110k</strong></div><div><small>CONFIDENCE</small><strong>87%</strong></div></div></div>}
        </div>
      </div>
    </div><div className="macBase"><i/></div>
  </div></Reveal>
 </div></section>
}