import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import VoxelScene from '../../components/VoxelScene';
import TrialFlow from '../../components/TrialFlow';
import FeatureAnatomy from '../../components/FeatureAnatomy';

export default function Product(){return <>
<section className="featureHero pastelMint">
 <div className="pxWrap featureHeroGrid">
  <div><div className="pxKicker">[ RHO TRIALS ]</div><h1>The data evaluator<br/>that catches bad bets.</h1><p>Rho is purpose-built to surface the datasets that actually move your model—and expose the ones that only look useful on paper.</p><div className="heroActions"><Link className="pxButton" href="/contact/">Start a trial <ArrowUpRight size={12}/></Link><Link className="pxOutline" href="/methodology/">Methodology</Link></div><div className="heroMeta"><span>CONTROLLED RUNS</span><i/><span>MARGINAL VALUE</span><i/><span>DECISION RECORD</span></div></div>
  <VoxelScene/>
 </div>
</section>

<section className="pxChapter darkChapter"><div className="pxWrap">
 <div className="chapterHead"><div><div className="pxTag">[ HOW IT WORKS ]</div><h2>One decision.<br/>Three measured steps.</h2></div><p>Rho keeps the experiment controlled so the only thing changing is the candidate data.</p></div>
 <TrialFlow/>
</div></section>

<section className="pxChapter pastelBlue"><div className="pxWrap">
 <div className="chapterHead"><div><div className="pxTag">[ ANATOMY OF A TRIAL ]</div><h2>Everything you need<br/>to make the call.</h2></div><p>Each Rho trial creates a structured record linking the data to what happened downstream.</p></div>
 <FeatureAnatomy/>
</div></section>

<section className="pxChapter pastelLav"><div className="pxWrap">
 <div className="chapterHead"><div><div className="pxTag">[ YOUR HOUSE, YOUR RULES ]</div><h2>Measure against<br/>your actual objective.</h2></div><p>Rho is configurable around the evals, recipes, budgets, and guardrails your team already uses.</p></div>
 <div className="rulesGrid">
  <article><div className="ruleVoxel mint"><i/><i/><i/></div><span>01</span><h3>Custom eval weighting</h3><p>Set the exact evaluation mix that defines success for the product.</p></article>
  <article><div className="ruleVoxel blue"><i/><i/><i/></div><span>02</span><h3>Training recipe lock</h3><p>Hold optimizer, schedule, sample size, and checkpoint constant across candidates.</p></article>
  <article><div className="ruleVoxel peach"><i/><i/><i/></div><span>03</span><h3>Budget constraints</h3><p>Rank the best dataset under compute, generation, or procurement limits.</p></article>
 </div>
</div></section>

<section className="pxChapter stackChapter"><div className="pxWrap">
 <div className="chapterHead"><div><div className="pxTag">[ CUSTOMIZABLE ]</div><h2>Control exactly what<br/>a Rho Trial optimizes.</h2></div><Link href="/methodology/" className="pxInline">See methodology ↗</Link></div>
 <div className="settingsGrid">
  <div><span>01</span><h3>Confidence threshold</h3><p>Require stronger evidence before Rho recommends a full-scale run.</p></div>
  <div><span>02</span><h3>Cost model</h3><p>Include labeling, generation, licensing, storage, and compute assumptions.</p></div>
  <div><span>03</span><h3>Sample schedule</h3><p>Choose trial sizes and stopping rules for learning-curve estimation.</p></div>
 </div>
</div></section>

<section className="moreFeatures pastelPeach"><div className="pxWrap">
 <div className="chapterHead"><div><div className="pxTag">[ MORE RHO ]</div><h2>Explore the rest<br/>of the system.</h2></div></div>
 <div className="moreGrid">
  <Link href="/context/"><span>RHO CONTEXT</span><h3>Experiment memory that compounds over time.</h3><b>Learn more ↗</b></Link>
  <Link href="/integrations/"><span>RHO STACK</span><h3>A model-agnostic decision layer for your training workflow.</h3><b>Learn more ↗</b></Link>
  <Link href="/index/"><span>RHO INDEX</span><h3>The long-term reference layer for AI data value.</h3><b>Learn more ↗</b></Link>
 </div>
</div></section>

<section className="featureClose darkChapter"><div className="pxWrap"><div className="pxTag">[ RHO TRIALS ]</div><h2>Catch bad data bets<br/>before the full run.</h2><div className="heroActions"><Link href="/contact/" className="pxButton light">Request access <ArrowUpRight size={12}/></Link><Link href="/pricing/" className="pxOutline darkOutline">View pricing</Link></div></div></section>
</>}