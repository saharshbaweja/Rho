import Link from 'next/link';

export default function Index(){return <>
<section className="featureHero pastelYellow"><div className="pxWrap featureHeroGrid">
 <div><div className="pxKicker">[ RHO INDEX ]</div><h1>The reference layer<br/>for AI data value.</h1><p>Rho Index is the long-term benchmark layer: measured outcomes aggregated into neutral reference points across tasks, model families, and data categories.</p><div className="heroActions"><Link href="/methodology/" className="pxButton">View methodology ↗</Link><Link href="/contact/" className="pxOutline">Join private beta</Link></div><div className="heroMeta"><span>ILLUSTRATIVE TODAY</span><i/><span>OUTCOME-BASED</span><i/><span>REFERENCE LAYER</span></div></div>
 <div className="heroIndexCard"><div className="indexCardTop"><span>RDI / DATA VALUE</span><b>PROTOTYPE</b></div><strong>51.80</strong><em>+4.6%</em><div className="pixelChart big">{Array.from({length:50}).map((_,i)=><i key={i} style={{height:(20+((i*19)%68))+'%'}}/>)}</div><div className="indexRows"><span>RDI-CODE <b>51.80</b></span><span>RDI-AGENT <b>63.20</b></span><span>RDI-EXPERT <b>67.40</b></span><span>RDI-SYNTH <b>34.90</b></span></div></div>
</div></section>

<section className="pxChapter pastelSand"><div className="pxWrap">
 <div className="chapterHead"><div><div className="pxTag">[ WHY AN INDEX ]</div><h2>Private measurements.<br/>Shared reference points.</h2></div><p>One company can see its own experiments. A benchmark layer can reveal broader relative value patterns no single buyer can observe alone.</p></div>
 <div className="indexLogic"><span>PRIVATE TRIALS</span><i>→</i><span>NORMALIZED OUTCOMES</span><i>→</i><span>CATEGORY BENCHMARKS</span><i>→</i><span>REFERENCE PRICING</span></div>
</div></section>

<section className="pxChapter darkChapter"><div className="pxWrap">
 <div className="chapterHead"><div><div className="pxTag">[ INDEX FAMILY ]</div><h2>Different data.<br/>Different economics.</h2></div></div>
 <div className="indexFamily"><article><span>RDI-CODE</span><b>51.80</b><em>+4.6%</em><p>Coding and debugging datasets.</p></article><article><span>RDI-AGENT</span><b>63.20</b><em>+6.1%</em><p>Agent trajectories and tool-use data.</p></article><article><span>RDI-EXPERT</span><b>67.40</b><em>+7.8%</em><p>Human expert and reviewed data.</p></article><article><span>RDI-SYNTH</span><b>34.90</b><em>-1.2%</em><p>Generated and synthetic datasets.</p></article></div>
</div></section>

<section className="pxChapter pastelMint"><div className="pxWrap">
 <div className="chapterHead"><div><div className="pxTag">[ FROM INDEX TO MARKET ]</div><h2>Measurement earns<br/>the right to transact.</h2></div><p>Rho does not start as a marketplace. The sequence matters: measure first, benchmark second, procurement and transaction infrastructure later.</p></div>
 <div className="marketPath"><div><span>01</span><b>MEASURE</b><p>Controlled trials.</p></div><div><span>02</span><b>PREDICT</b><p>Expected value before full runs.</p></div><div><span>03</span><b>ALLOCATE</b><p>Optimize the data budget.</p></div><div><span>04</span><b>BENCHMARK</b><p>Shared reference indices.</p></div><div><span>05</span><b>TRANSACT</b><p>Procurement and market rails.</p></div></div>
</div></section>

<section className="featureClose pastelBlue"><div className="pxWrap"><div className="pxTag">[ RHO INDEX ]</div><h2>Build the benchmark<br/>from measured outcomes.</h2><div className="heroActions"><Link href="/contact/" className="pxButton">Join private beta ↗</Link><Link href="/product/" className="pxOutline">Explore Trials</Link></div></div></section>
</>}