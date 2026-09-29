'use client';
import {useState} from 'react';
import {motion,AnimatePresence} from 'framer-motion';
import Reveal from './Reveal';

const command = 'rho compare --model qwen-3b --eval debugging.jsonl --data prod_traces.jsonl customer_bugs.jsonl synthetic.jsonl';

export default function CliDemo(){
  const [running,setRunning]=useState(false);
  const [done,setDone]=useState(true);
  const [line,setLine]=useState(9);
  const logs=[
    ['01','resolving model','qwen-3b'],
    ['02','loading eval suite','debugging.jsonl'],
    ['03','fingerprinting corpus','current-corpus'],
    ['04','measuring overlap','3 candidates'],
    ['05','launching trial','prod_traces'],
    ['06','launching trial','customer_bugs'],
    ['07','launching trial','synthetic'],
    ['08','fitting learning curves','complete'],
    ['09','ranking marginal return','complete'],
  ];
  function run(){
    setRunning(true);setDone(false);setLine(0);
    logs.forEach((_,i)=>setTimeout(()=>setLine(i+1),340*(i+1)));
    setTimeout(()=>{setRunning(false);setDone(true)},340*(logs.length+1));
  }
  return <section className="cliSection"><div className="wrap cliGrid">
    <Reveal className="cliCopy">
      <p className="eyebrow">Developer workflow</p>
      <h2 className="display">One command in.<br/><span>A capital decision out.</span></h2>
      <p className="lede">Rho should feel native to an ML team: configure the comparison, run controlled trials, and get a ranked economic view without leaving the workflow.</p>
      <button className="cliRun" onClick={run}>{running?'RUNNING…':'RUN THE COMMAND ↗'}</button>
    </Reveal>
    <Reveal delay={.08}>
      <div className="terminalShell">
        <div className="terminalBar"><div><i/><i/><i/></div><span>rho — zsh — 118×36</span><b>SDK PREVIEW</b></div>
        <div className="terminalBody">
          <div className="promptLine"><span>~/models/coding-agent</span><b>›</b><code>{command}</code><i className="cursor"/></div>
          <div className="termDivider"/>
          <div className="termLogs">{logs.map((x,i)=><motion.div key={x[0]} animate={{opacity:line>i||done?1:.13}}><span>{x[0]}</span><code>{x[1]}</code><em>{line>i||done?x[2]:'waiting'}</em></motion.div>)}</div>
          <AnimatePresence>{done&&<motion.div className="termResult" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}}>
            <div><small>BEST CANDIDATE</small><strong>prod_traces.jsonl</strong></div>
            <div><small>EXPECTED LIFT</small><strong>+4.2 pts</strong></div>
            <div><small>OVERLAP</small><strong>13%</strong></div>
            <div><small>CONFIDENCE</small><strong>87%</strong></div>
            <p>Recommendation: allocate the next full training run to <b>prod_traces</b>. Estimated exploratory compute avoided: <b>71%</b>.</p>
          </motion.div>}</AnimatePresence>
        </div>
      </div>
    </Reveal>
  </div></section>
}