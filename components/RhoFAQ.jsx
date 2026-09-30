'use client';
import {useState} from 'react';
const items=[
 ['What does Rho actually do?','Rho compares candidate training datasets against your model and evals using controlled small-scale runs, then measures downstream lift, redundancy, compute cost, saturation, and confidence.'],
 ['Is Rho a data marketplace?','Not initially. The wedge is measurement. The long-term thesis is that reliable measurement can support benchmarking, procurement, and eventually market infrastructure.'],
 ['Why would a team not build this internally?','Internal tooling sees only one company’s experiments. Rho aims to combine workflow automation with cross-trial benchmark intelligence and a maintained decision system that compounds across use cases.'],
 ['Does Rho need access to raw proprietary data?','The intended architecture supports customer-controlled environments so raw datasets and models can remain private. Benchmark participation should be opt-in and based on minimal metadata.'],
 ['Is the Rho Index live today?','No. Current index values on this prototype are illustrative. A real index requires enough measured outcomes and transaction context to support a credible reference signal.']
];
export default function RhoFAQ(){const [open,setOpen]=useState(0);return <section className="faqSection"><div className="wrap faqGrid"><div><p className="eyebrow">FAQ</p><h2 className="sectionTitle">The obvious<br/>questions.</h2></div><div className="faqList">{items.map((x,i)=><button key={x[0]} onClick={()=>setOpen(open===i?-1:i)} className={open===i?'open':''}><div><b>{x[0]}</b><span>{open===i?'−':'+'}</span></div>{open===i&&<p>{x[1]}</p>}</button>)}</div></div></section>}