'use client';
import {useState} from 'react';
const qs=[
 ['What is Rho?','Rho is a training-data intelligence layer. It runs controlled trials on candidate datasets and measures which one creates the most downstream performance for the next dollar.'],
 ['Is Rho a marketplace?','Not at first. Trials are the wedge. The long-term thesis is that measured outcomes can support benchmarking, procurement, and eventually market infrastructure.'],
 ['Does Rho need my raw data?','The intended enterprise architecture keeps models and proprietary corpora in customer-controlled environments, with shared benchmark participation opt-in.'],
 ['Is the Rho Index live?','Not yet. Index values in this prototype are illustrative until there is enough measured outcome and transaction data to support a credible reference benchmark.']
];
export default function PixelFAQ(){const [open,setOpen]=useState(0);return <div className="pixelFaq">{qs.map((q,i)=><button key={q[0]} className={open===i?'open':''} onClick={()=>setOpen(open===i?-1:i)}><div><b>{q[0]}</b><span>{open===i?'−':'+'}</span></div>{open===i&&<p>{q[1]}</p>}</button>)}</div>}