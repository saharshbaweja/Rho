const rows=[
 ['RANKING ACCURACY','Did the small-trial ranking match the full-run ranking?','Primary research metric'],
 ['COMPUTE FRACTION','How much of full comparison compute was required?','Target: 5–15%'],
 ['LIFT ERROR','How far was predicted downstream lift from observed lift?','Model-specific'],
 ['CONFIDENCE CALIBRATION','When Rho says 80%, is it right about 80% of the time?','Calibration metric']
];
export default function Benchmarks(){return <>
<section className="featureHero pastelYellow"><div className="pxWrap"><div className="pxKicker">[ BENCHMARKS ]</div><h1>Measure the measurer.</h1><p>Rho should only be trusted if small controlled trials reliably predict the decisions a full-scale comparison would have produced.</p></div></section>
<section className="pxChapter pastelSand"><div className="pxWrap"><div className="chapterHead"><div><div className="pxTag">[ NORTH STAR ]</div><h2>Correctly rank the best dataset<br/>with a fraction of the compute.</h2></div><p>The initial research goal is not a universal data price. It is a reproducible decision system that can rank candidate datasets cheaply enough to be useful.</p></div>
<div className="benchmarkRows">{rows.map((x,i)=><article key={x[0]}><span>{String(i+1).padStart(2,'0')}</span><div><h3>{x[0]}</h3><p>{x[1]}</p></div><b>{x[2]}</b></article>)}</div></div></section>
<section className="pxChapter darkChapter"><div className="pxWrap"><div className="pxTag">[ EXPERIMENT DESIGN ]</div><h2 className="bigStatement">Public models.<br/>Objective evals.<br/>Repeatable trials.</h2><p className="wideLead">Coding is a strong initial domain because evaluation can be objective and candidate datasets can be constructed with meaningfully different properties.</p></div></section>
</>}