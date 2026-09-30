'use client';
import Link from 'next/link';
import {ArrowUpRight,Database,Network,Boxes,ShieldCheck,SquareTerminal} from 'lucide-react';
import VoxelScene from '../components/VoxelScene';
import TrialFlow from '../components/TrialFlow';
import PixelTerminal from '../components/PixelTerminal';
import FeatureAnatomy from '../components/FeatureAnatomy';
import PixelFAQ from '../components/PixelFAQ';

export default function Home(){return <>
<section className="pxHero pastelSand">
 <div className="pxWrap heroGrid">
  <div className="heroCopy">
   <div className="pxKicker">[ TRAINING DATA INTELLIGENCE ]</div>
   <h1>The data<br/>decision engine.</h1>
   <p>Rho compares candidate training datasets against your model and evals, then measures which one creates the most downstream performance for the next dollar.</p>
   <div className="heroActions"><Link href="/contact/" className="pxButton">Start a trial <ArrowUpRight size={12}/></Link><Link href="/product/" className="pxOutline">See Rho Trials</Link></div>
   <div className="heroMeta"><span>NO CREDIT CARD</span><i/> <span>PRIVATE BETA</span><i/> <span>ILLUSTRATIVE DEMO</span></div>
  </div>
  <VoxelScene/>
 </div>
</section>

<section className="logoBand">
 <div className="pxWrap"><span>BUILT FOR TEAMS MAKING REAL POST-TRAINING DECISIONS</span><div><b>MODEL LABS</b><b>AI PRODUCT TEAMS</b><b>DATA BUYERS</b><b>FINE-TUNING PLATFORMS</b><b>ENTERPRISE ML</b></div></div>
</section>

<section className="quoteChapter pastelLav">
 <div className="pxWrap"><div className="pxTag">[ THE PROBLEM ]</div><h2>“What should we train on next?” is still answered with intuition far too often.</h2><p>Rho exists to make that decision measurable.</p></div>
</section>

<section className="pxChapter darkChapter">
 <div className="pxWrap">
  <div className="chapterHead"><div><div className="pxTag">[ RHO TRIALS ]</div><h2>How Rho evaluates<br/>every dataset.</h2></div><p>Controlled small-scale trials turn a fuzzy data question into a comparable economic signal.</p></div>
  <TrialFlow/>
 </div>
</section>

<section className="pxChapter pastelBlue">
 <div className="pxWrap">
  <div className="chapterHead"><div><div className="pxTag">[ WHAT RHO RETURNS ]</div><h2>The anatomy of<br/>a data decision.</h2></div><p>Not a single “score.” A decision record your team can inspect, compare, and reuse.</p></div>
  <FeatureAnatomy/>
 </div>
</section>

<section className="pxChapter pastelMint">
 <div className="pxWrap">
  <div className="chapterHead"><div><div className="pxTag">[ RHO IN ACTION ]</div><h2>Three expensive decisions<br/>that should not be guesses.</h2></div><Link href="/examples/" className="pxInline">See more examples ↗</Link></div>
  <div className="bugGrid">
   <article><div className="bugTop"><span>CODING AGENT</span><b>01</b></div><div className="bugPixel peach"><i/><i/><i/><i/></div><h3>Production traces beat generic synthetic data.</h3><p>Low overlap and higher debugging alignment produced the strongest marginal lift.</p><div className="bugMeta"><span>+4.2 pts</span><span>13% overlap</span></div></article>
   <article><div className="bugTop"><span>SUPPORT MODEL</span><b>02</b></div><div className="bugPixel lav"><i/><i/><i/><i/></div><h3>Escalation transcripts beat raw chat volume.</h3><p>Expert examples generated more useful signal per training dollar than another large generic batch.</p><div className="bugMeta"><span>+3.6 pts</span><span>18% overlap</span></div></article>
   <article><div className="bugTop"><span>AGENT MODEL</span><b>03</b></div><div className="bugPixel blue"><i/><i/><i/><i/></div><h3>Recovery trajectories beat more successes.</h3><p>The winning candidate directly targeted the failure modes your eval weighted most heavily.</p><div className="bugMeta"><span>+5.1 pts</span><span>11% overlap</span></div></article>
  </div>
 </div>
</section>

<section className="pxChapter pastelPeach">
 <div className="pxWrap contextSplit">
  <div><div className="pxTag">[ CONTEXT + MEMORY ]</div><h2>Rho gets smarter about<br/>how your team trains.</h2><p>Your model, evals, corpus, policies, and historical outcomes become context for every future decision.</p><Link href="/context/" className="pxInline">Explore Rho Context ↗</Link></div>
  <div className="memoryPanel">
   <div className="memoryHead"><span>RHO / MEMORY</span><b>184 TRIALS</b></div>
   <div className="memoryRows">{[['debugging_eval','0.55'],['tool_use_eval','0.30'],['style_eval','0.15']].map(x=><div key={x[0]}><span>{x[0]}</span><b>{x[1]}</b></div>)}</div>
   <div className="memoryPixels">{Array.from({length:48}).map((_,i)=><i key={i} className={i%7===0?'hot':''}/>)}</div>
  </div>
 </div>
</section>

<section className="pxChapter stackChapter">
 <div className="pxWrap">
  <div className="chapterHead"><div><div className="pxTag">[ YOUR STACK ]</div><h2>The central decision layer<br/>for training data.</h2></div><p>Rho sits between data sources, training infrastructure, and evaluation systems without replacing them.</p></div>
  <div className="stackDiagram">
   <div className="stackSide">{[['DATA VENDORS',Database],['INTERNAL CORPUS',Boxes],['SYNTHETIC PIPELINES',Network]].map(([t,I])=><span key={t}><I size={14}/>{t}</span>)}</div>
   <div className="stackRho"><b>ρ</b><span>RHO</span><small>MEASURE · COMPARE · ALLOCATE</small></div>
   <div className="stackSide right">{[['TRAINING JOBS',Boxes],['EVAL SUITES',Network],['PROCUREMENT',Database]].map(([t,I])=><span key={t}>{t}<I size={14}/></span>)}</div>
  </div>
  <div className="integrationGrid">
   <article><SquareTerminal/><span>01</span><h3>CLI + SDK</h3><p>Run comparisons where ML engineers already work.</p></article>
   <article><Database/><span>02</span><h3>Experiment history</h3><p>Store data, model, eval, cost, recipe, and outcome together.</p></article>
   <article><Network/><span>03</span><h3>Model agnostic</h3><p>Fit around your existing fine-tuning and evaluation stack.</p></article>
   <article><ShieldCheck/><span>04</span><h3>Private deployment</h3><p>Keep proprietary models and corpora customer-controlled.</p></article>
  </div>
  <Link href="/integrations/" className="pxInline">Explore Rho Stack ↗</Link>
 </div>
</section>

<section className="terminalChapter">
 <div className="pxWrap terminalGrid">
  <div><div className="pxTag">[ RHO CLI ]</div><h2>Run a data decision<br/>from the terminal.</h2><p>Configure a comparison, launch controlled trials, and get the recommendation back without leaving the workflow.</p><Link href="/cli/" className="pxInline lightLink">Explore the CLI ↗</Link></div>
  <PixelTerminal/>
 </div>
</section>

<section className="indexChapter pastelYellow">
 <div className="indexTicker"><span>MEASURE · BENCHMARK · PRICE · MEASURE · BENCHMARK · PRICE ·</span><span>MEASURE · BENCHMARK · PRICE · MEASURE · BENCHMARK · PRICE ·</span></div>
 <div className="pxWrap indexGrid">
  <div><div className="pxTag">[ INTRODUCING RHO INDEX ]</div><h2>From private trials to<br/>a shared reference point.</h2><p>As Rho observes more measured outcomes, it can build neutral benchmarks for the economic value of data across tasks and model families.</p><Link href="/index/" className="pxInline">Explore Rho Index ↗</Link></div>
  <div className="indexCard">
   <div className="indexCardTop"><span>RDI / DATA VALUE</span><b>ILLUSTRATIVE</b></div>
   <strong>51.80</strong><em>+4.6%</em>
   <div className="pixelChart">{Array.from({length:44}).map((_,i)=><i key={i} style={{height:(18+((i*17)%62))+'%'}}/>)}</div>
   <div className="indexRows"><span>RDI-CODE <b>51.80</b></span><span>RDI-AGENT <b>63.20</b></span><span>RDI-EXPERT <b>67.40</b></span></div>
  </div>
 </div>
</section>

<section className="securityChapter">
 <div className="pxWrap">
  <div className="chapterHead"><div><div className="pxTag">[ SECURITY-FIRST ]</div><h2>Built for the data<br/>you cannot leak.</h2></div><Link href="/enterprise/" className="pxInline">Enterprise ↗</Link></div>
  <div className="securityCards">
   <article><span>01</span><div className="securityVoxel mint"><i/><i/></div><h3>Customer-controlled deployment</h3><p>Run the measurement plane close to sensitive models and corpora.</p></article>
   <article><span>02</span><div className="securityVoxel lav"><i/><i/></div><h3>Raw data stays private</h3><p>Benchmark participation can rely on scoped metadata rather than centralized raw datasets.</p></article>
   <article><span>03</span><div className="securityVoxel peach"><i/><i/></div><h3>Opt-in network effects</h3><p>Teams control what contributes to shared intelligence and what remains isolated.</p></article>
  </div>
 </div>
</section>

<section className="faqChapter pastelBlue">
 <div className="pxWrap faqSplit"><div><div className="pxTag">[ FAQ ]</div><h2>The obvious<br/>questions.</h2></div><PixelFAQ/></div>
</section>

<section className="closingChapter pastelPink">
 <div className="pxWrap"><div className="pxTag">[ PRIVATE BETA ]</div><h2>Stop guessing what your<br/>training data is worth.</h2><div className="heroActions"><Link href="/contact/" className="pxButton">Become a design partner <ArrowUpRight size={12}/></Link><Link href="/examples/" className="pxOutline">See examples</Link></div></div>
</section>
</>}