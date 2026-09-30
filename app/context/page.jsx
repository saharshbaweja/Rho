import Link from 'next/link';

export default function Context(){return <>
<section className="featureHero pastelPeach"><div className="pxWrap featureHeroGrid">
 <div><div className="pxKicker">[ RHO CONTEXT ]</div><h1>Training decisions<br/>that learn over time.</h1><p>Every team, model, and eval suite is different. Rho stores the context around each trial so future decisions start with more evidence.</p><div className="heroActions"><Link href="/contact/" className="pxButton">Request access ↗</Link><Link href="/methodology/" className="pxOutline">Methodology</Link></div></div>
 <div className="contextHeroViz"><div className="ctxCore">ρ</div>{['MODEL','EVAL','CORPUS','HISTORY','BUDGET','RULES'].map((x,i)=><span className={'ctxNode c'+i} key={x}>{x}</span>)}</div>
</div></section>

<section className="pxChapter pastelMint"><div className="pxWrap">
 <div className="chapterHead"><div><div className="pxTag">[ DEEP CONTEXT ]</div><h2>Full experiment<br/>context.</h2></div><p>Rho understands a trial in relation to the model, task, current corpus, recipe, prior runs, and budget assumptions.</p></div>
 <div className="contextGraphLarge"><div className="graphCenter">ρ</div>{['MODEL FAMILY','CHECKPOINT','EVAL SUITE','FAILURE MODES','CURRENT CORPUS','DATA POLICY','TRAINING RECIPE','PRIOR TRIALS'].map((x,i)=><span key={x} className={'g'+i}>{x}</span>)}</div>
</div></section>

<section className="pxChapter pastelBlue"><div className="pxWrap">
 <div className="chapterHead"><div><div className="pxTag">[ CONFIGURED FOR YOUR TEAM ]</div><h2>Rules that match<br/>how you train.</h2></div></div>
 <div className="contextRules">
  <article><div className="ruleFile">rho.yaml</div><span>01</span><h3>Eval weighting</h3><p>Define which benchmarks matter and how strongly they influence the decision.</p></article>
  <article><div className="ruleFile">budget.json</div><span>02</span><h3>Economic assumptions</h3><p>Set compute, labeling, generation, or licensing costs for your environment.</p></article>
  <article><div className="ruleFile">trial.policy</div><span>03</span><h3>Experiment guardrails</h3><p>Control sample sizes, stopping rules, and confidence thresholds.</p></article>
 </div>
</div></section>

<section className="pxChapter darkChapter"><div className="pxWrap memoryDeep">
 <div><div className="pxTag">[ LEARNS FROM RESULTS ]</div><h2>Every trial leaves<br/>the next one smarter.</h2><p>Historical outcomes can become priors for dataset selection, saturation estimates, and expected return.</p></div>
 <div className="deepMemory"><div className="deepMemTop"><span>EXPERIMENT MEMORY</span><b>184 RUNS</b></div><div className="deepMemGrid">{Array.from({length:80}).map((_,i)=><i key={i} className={i%9===0||i%13===0?'hot':''}/>)}</div></div>
</div></section>

<section className="moreFeatures pastelLav"><div className="pxWrap"><div className="chapterHead"><div><div className="pxTag">[ MORE RHO ]</div><h2>Explore the rest<br/>of the system.</h2></div></div><div className="moreGrid"><Link href="/product/"><span>RHO TRIALS</span><h3>Controlled comparisons for candidate datasets.</h3><b>Learn more ↗</b></Link><Link href="/integrations/"><span>RHO STACK</span><h3>Fits across model and training environments.</h3><b>Learn more ↗</b></Link><Link href="/index/"><span>RHO INDEX</span><h3>The reference layer Rho is building toward.</h3><b>Learn more ↗</b></Link></div></div></section>
</>}