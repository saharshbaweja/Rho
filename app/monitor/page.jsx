import Link from 'next/link';
import RuntimeScene from '../../components/RuntimeScene';

export default function Monitor(){return <>
<section className="featureHero pastelYellow"><div className="pxWrap featureHeroGrid">
 <div><div className="pxKicker">[ RHO MONITOR ]</div><h1>Every training run<br/>becomes evidence.</h1><p>Rho Monitor is the system-of-record layer that links dataset, recipe, model, eval, cost, and outcome so teams can learn across runs instead of starting from scratch.</p><div className="heroActions"><Link href="/contact/" className="pxButton">Request access ↗</Link><Link href="/product/" className="pxOutline">Explore Trials</Link></div></div>
 <RuntimeScene/>
</div></section>

<section className="pxChapter pastelSand"><div className="pxWrap">
 <div className="chapterHead"><div><div className="pxTag">[ SYSTEM OF RECORD ]</div><h2>One graph for<br/>the entire data loop.</h2></div><p>Every dataset decision becomes a connected object: what data was used, how it was trained, what it cost, what changed, and what happened next.</p></div>
 <div className="monitorFlow"><span>DATASET</span><i>→</i><span>TRIAL</span><i>→</i><span>MODEL</span><i>→</i><span>EVAL</span><i>→</i><span>COST</span><i>→</i><span>OUTCOME</span></div>
</div></section>

<section className="pxChapter darkChapter"><div className="pxWrap">
 <div className="chapterHead"><div><div className="pxTag">[ LIVE RUN STATE ]</div><h2>See where your data<br/>is paying off.</h2></div><p>Monitor exposes what changed, what saturated, and which datasets are still earning the next training dollar.</p></div>
 <RuntimeScene/>
</div></section>

<section className="pxChapter pastelBlue"><div className="pxWrap">
 <div className="chapterHead"><div><div className="pxTag">[ WHY IT MATTERS ]</div><h2>Stop losing experiment<br/>context between runs.</h2></div></div>
 <div className="waysGrid"><article><span>01</span><h3>Persistent lineage</h3><p>Keep dataset, recipe, eval, cost, and outcome tied together across the lifecycle.</p></article><article><span>02</span><h3>Saturation memory</h3><p>Know when a data category has stopped producing useful marginal lift.</p></article><article><span>03</span><h3>Portfolio visibility</h3><p>See where the data budget is creating return and where it is being wasted.</p></article></div>
</div></section>

<section className="moreFeatures pastelLav"><div className="pxWrap"><div className="chapterHead"><div><div className="pxTag">[ MORE RHO ]</div><h2>From measurement<br/>to market intelligence.</h2></div></div><div className="moreGrid"><Link href="/product/"><span>RHO TRIALS</span><h3>Measure candidate datasets before full-scale training.</h3><b>Learn more ↗</b></Link><Link href="/context/"><span>RHO CONTEXT</span><h3>Let experiment memory compound across decisions.</h3><b>Learn more ↗</b></Link><Link href="/index/"><span>RHO INDEX</span><h3>Turn enough outcomes into neutral reference benchmarks.</h3><b>Learn more ↗</b></Link></div></div></section>
</>}