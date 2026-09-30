'use client';
import {useState} from 'react';
import {motion} from 'framer-motion';

const lines=['resolve model qwen-3b','load eval debugging.jsonl','fingerprint current corpus','measure overlap matrix','launch candidate A','launch candidate B','launch candidate C','fit learning curves','rank marginal return'];

export default function PixelTerminal(){
 const [run,setRun]=useState(false);
 return <div className="pixelTerminal">
   <div className="termHead"><span>RHO CLI</span><button onClick={()=>setRun(true)}>RUN</button></div>
   <div className="termCmd"><b>$</b> rho compare --model qwen-3b --eval debugging --candidates ./data/*</div>
   <div className="termRows">{lines.map((l,i)=><motion.div key={l} animate={{opacity:run?1:.35}} transition={{delay:run?i*.12:0}}><span>{String(i+1).padStart(2,'0')}</span><code>{l}</code><b>{run?'done':'idle'}</b></motion.div>)}</div>
   <motion.div className="termDecision" animate={{opacity:run?1:.25}} transition={{delay:1.2}}><small>RECOMMENDED</small><strong>production_traces.jsonl</strong><span>+4.2 pts · 13% overlap · 87% confidence</span></motion.div>
 </div>
}