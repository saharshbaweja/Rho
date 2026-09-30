import Link from 'next/link';

export default function Integrations(){return <>
<section className="featureHero pastelLav"><div className="pxWrap featureHeroGrid">
 <div><div className="pxKicker">[ RHO STACK ]</div><h1>The independent<br/>data decision layer.</h1><p>Rho is designed to work across model families, training frameworks, eval stacks, and data sources instead of locking you into one vendor.</p><div className="heroActions"><Link href="/contact/" className="pxButton">Request access ↗</Link><Link href="/cli/" className="pxOutline">Explore CLI</Link></div></div>
 <div className="agnosticViz"><div className="agnosticCore">ρ</div><span className="a1">PYTORCH</span><span className="a2">HF</span><span className="a3">PEFT</span><span className="a4">WANDB</span><span className="a5">MLFLOW</span><span className="a6">CUSTOM</span></div>
</div></section>

<section className="pxChapter pastelSand"><div className="pxWrap">
 <div className="chapterHead"><div><div className="pxTag">[ INDEPENDENT BY DESIGN ]</div><h2>Deeply integrated<br/>with your stack.</h2></div><p>Use Rho without changing the core model, eval, experiment, or storage systems your team already trusts.</p></div>
 <div className="waysGrid">
  <article><div className="integrationVoxel mint"><i/><i/><i/></div><span>01</span><h3>Framework agnostic</h3><p>Bring your training recipe rather than adopting a proprietary one.</p></article>
  <article><div className="integrationVoxel blue"><i/><i/><i/></div><span>02</span><h3>Eval agnostic</h3><p>Measure candidates against the benchmarks and internal suites that define success for you.</p></article>
  <article><div className="integrationVoxel peach"><i/><i/><i/></div><span>03</span><h3>Data-source agnostic</h3><p>Compare purchased, internal, synthetic, labeled, or generated datasets under one system.</p></article>
  <article><div className="integrationVoxel lav"><i/><i/><i/></div><span>04</span><h3>Deployment flexible</h3><p>Cloud, VPC, or customer-controlled environments for sensitive workflows.</p></article>
 </div>
</div></section>

<section className="pxChapter darkChapter"><div className="pxWrap">
 <div className="chapterHead"><div><div className="pxTag">[ WHY INDEPENDENCE MATTERS ]</div><h2>One neutral layer<br/>across every workflow.</h2></div></div>
 <div className="settingsGrid darkSettings"><div><span>01</span><h3>Model agnostic</h3><p>Compare data value without tying the result to a single model provider.</p></div><div><span>02</span><h3>Tool agnostic</h3><p>Integrate with the orchestration and tracking stack you already use.</p></div><div><span>03</span><h3>Focused on data economics</h3><p>Rho is built around measuring the data decision itself, not as a side feature.</p></div></div>
</div></section>

<section className="featureClose pastelMint"><div className="pxWrap"><div className="pxTag">[ RHO STACK ]</div><h2>One decision layer<br/>for every training stack.</h2><div className="heroActions"><Link href="/contact/" className="pxButton">Request access ↗</Link><Link href="/product/" className="pxOutline">Explore Trials</Link></div></div></section>
</>}