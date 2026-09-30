import Link from 'next/link';

export default function Enterprise(){return <>
<section className="featureHero pastelPeach"><div className="pxWrap featureHeroGrid">
 <div><div className="pxKicker">[ ENTERPRISE ]</div><h1>Measure proprietary data.<br/>Keep it proprietary.</h1><p>Rho is designed toward customer-controlled deployment for teams whose models, evals, and training corpora cannot leave their environment.</p><div className="heroActions"><Link href="/contact/" className="pxButton">Contact Rho ↗</Link><Link href="/product/" className="pxOutline">Explore Trials</Link></div></div>
 <div className="enterpriseHeroViz"><div className="vault"><div className="vaultFace">ρ</div><span>PRIVATE VPC</span></div>{['MODEL','EVAL','CORPUS','RESULTS'].map((x,i)=><span className={'vaultNode v'+i} key={x}>{x}</span>)}</div>
</div></section>

<section className="pxChapter pastelSand"><div className="pxWrap">
 <div className="chapterHead"><div><div className="pxTag">[ SECURITY-FIRST ]</div><h2>Your environment.<br/>Rho’s measurement layer.</h2></div></div>
 <div className="securityCards">
  <article><span>01</span><div className="securityVoxel mint"><i/><i/></div><h3>Customer-controlled deployment</h3><p>Run the measurement plane close to sensitive models and datasets.</p></article>
  <article><span>02</span><div className="securityVoxel lav"><i/><i/></div><h3>Raw data stays private</h3><p>Shared benchmarks should use scoped metadata rather than centralized raw corpora.</p></article>
  <article><span>03</span><div className="securityVoxel blue"><i/><i/></div><h3>Audit-ready lineage</h3><p>Link each recommendation to dataset, recipe, eval, compute, and measured outcome.</p></article>
 </div>
</div></section>

<section className="pxChapter darkChapter"><div className="pxWrap">
 <div className="chapterHead"><div><div className="pxTag">[ DEPLOYMENT ]</div><h2>Private by default.<br/>Networked by choice.</h2></div><p>Organizations should control what remains local and what can contribute to a shared benchmark layer.</p></div>
 <div className="deploymentFlow"><span>PRIVATE DATA</span><i>→</i><span>RHO TRIALS</span><i>→</i><span>LOCAL RESULT</span><i>→</i><span>OPTIONAL METADATA</span></div>
</div></section>

<section className="pxChapter pastelBlue"><div className="pxWrap">
 <div className="chapterHead"><div><div className="pxTag">[ BUILT FOR ]</div><h2>Teams where a wrong data bet<br/>costs more than the measurement.</h2></div></div>
 <div className="waysGrid"><article><span>01</span><h3>Model labs</h3><p>Recurring post-training programs with expensive compute and proprietary evals.</p></article><article><span>02</span><h3>Enterprise AI</h3><p>Sensitive internal data that cannot be uploaded to a generic SaaS workflow.</p></article><article><span>03</span><h3>Data procurement</h3><p>Teams evaluating whether licensed or generated corpora justify their price.</p></article></div>
</div></section>

<section className="featureClose pastelMint"><div className="pxWrap"><div className="pxTag">[ ENTERPRISE ]</div><h2>Measure sensitive data<br/>without centralizing it.</h2><div className="heroActions"><Link href="/contact/" className="pxButton">Talk to Rho ↗</Link><Link href="/pricing/" className="pxOutline">Pricing</Link></div></div></section>
</>}