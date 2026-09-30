'use client';
import {useState} from 'react';
import Reveal from './Reveal';

const examples=[
 {domain:'CODING',model:'Qwen 3B',winner:'Production traces',lift:'+4.2 pts',overlap:'13%',finding:'Generic synthetic data looked cheap, but most of it duplicated patterns already present in the corpus.'},
 {domain:'SUPPORT',model:'Llama 3B',winner:'Escalation transcripts',lift:'+3.6 pts',overlap:'18%',finding:'Raw chat volume was high, but expert escalation examples delivered 2.1× more lift per training dollar.'},
 {domain:'AGENTS',model:'Small agent model',winner:'Recovery trajectories',lift:'+5.1 pts',overlap:'11%',finding:'Successful trajectories saturated early. Recovery examples improved the failure modes the eval actually measured.'}
];

export default function ExampleFeed(){
 const [active,setActive]=useState(0);
 return <section className="examplesSection"><div className="wrap">
  <Reveal><p className="eyebrow">Rho in action</p><h2 className="sectionTitle">Three expensive decisions<br/>that should not be guesses.</h2></Reveal>
  <div className="exampleTabs">{examples.map((e,i)=><button onClick={()=>setActive(i)} className={active===i?'active':''} key={e.domain}>{e.domain}</button>)}</div>
  <div className="examplePanel">
   <div className="exampleMeta"><span>{examples[active].domain} / TRIAL</span><b>Illustrative</b></div>
   <div className="exampleMain">
    <div><small>MODEL</small><strong>{examples[active].model}</strong></div>
    <div><small>BEST DATASET</small><strong>{examples[active].winner}</strong></div>
    <div><small>LIFT</small><strong>{examples[active].lift}</strong></div>
    <div><small>OVERLAP</small><strong>{examples[active].overlap}</strong></div>
   </div>
   <div className="exampleFinding"><small>WHAT RHO FOUND</small><p>{examples[active].finding}</p><span>Open trial record ↗</span></div>
  </div>
 </div></section>
}