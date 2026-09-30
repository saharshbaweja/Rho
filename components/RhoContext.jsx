import Reveal from './Reveal';
export default function RhoContext(){return <section className="contextSection"><div className="wrap">
 <Reveal><p className="eyebrow">Context + learning</p><h2 className="sectionTitle">Rho adapts to<br/>how your team trains.</h2><p className="sectionLead">Your model, evals, data policies, and historical outcomes become context for every future decision.</p></Reveal>
 <div className="contextCards">
  <Reveal><article><span>01 / EVAL CONTEXT</span><h3>Your objective, not a generic benchmark.</h3><p>Rho measures candidates against the eval suite and failure modes your team actually cares about.</p><div className="miniUI"><small>debugging_eval</small><b>weight 0.55</b><small>tool_use_eval</small><b>weight 0.30</b><small>style_eval</small><b>weight 0.15</b></div></article></Reveal>
  <Reveal delay={.08}><article><span>02 / MEMORY</span><h3>Every trial compounds.</h3><p>Historical experiments become priors for future dataset selection, saturation estimates, and budget allocation.</p><div className="historyDots">{Array.from({length:36}).map((_,i)=><i key={i} className={i%5===0?'hot':''}/>)}</div></article></Reveal>
 </div>
 </div></section>}