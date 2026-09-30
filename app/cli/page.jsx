import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import PixelTerminal from '../../components/PixelTerminal';
import FeatureAnatomy from '../../components/FeatureAnatomy';

export default function CLI(){return <>
<section className="featureHero pastelBlue"><div className="pxWrap featureHeroGrid">
 <div><div className="pxKicker">[ RHO CLI ]</div><h1>Data decisions<br/>in your terminal.</h1><p>Run a full Rho comparison from the same environment you use to train and evaluate models.</p><div className="installTabs"><button>pip</button><button>uv</button><button>poetry</button></div><code className="installCmd">$ pip install rho-ai</code><div className="heroMeta"><span>PRIVATE BETA</span><i/><span>LOCAL WORKFLOW</span><i/><span>SDK + CLI</span></div></div>
 <PixelTerminal/>
</div></section>

<section className="pxChapter pastelSand"><div className="pxWrap">
 <div className="chapterHead"><div><div className="pxTag">[ CLI ]</div><h2>Compare data without<br/>leaving the terminal.</h2></div><Link href="/contact/" className="pxInline">Request CLI access ↗</Link></div>
 <div className="waysGrid">
  <article><div className="cmdBox">$ rho compare</div><span>01</span><h3>Compare candidate datasets</h3><p>Point Rho at a model, eval, corpus, and candidate set.</p></article>
  <article><div className="cmdBox">$ rho trial --resume</div><span>02</span><h3>Resume experiment state</h3><p>Continue a trial and preserve the full decision lineage.</p></article>
  <article><div className="cmdBox">$ rho report --json</div><span>03</span><h3>Machine-readable output</h3><p>Pipe rankings, metrics, and recommended allocation into other tooling.</p></article>
 </div>
</div></section>

<section className="pxChapter darkChapter"><div className="pxWrap terminalLoop">
 <div><div className="pxTag">[ AGENT MODE ]</div><h2>From trial to action<br/>in one loop.</h2><p>Use structured output so an internal training agent can launch, inspect, and react to Rho trial results programmatically.</p></div>
 <div className="loopGraphic"><span>TRAINING AGENT</span><i>→</i><span>RHO CLI</span><i>→</i><span>TRIALS</span><i>→</i><span>RECOMMENDATION</span><i>↺</i></div>
</div></section>

<section className="pxChapter pastelLav"><div className="pxWrap"><div className="chapterHead"><div><div className="pxTag">[ ANATOMY OF A RESULT ]</div><h2>Same decision record.<br/>Any surface.</h2></div></div><FeatureAnatomy/></div></section>

<section className="featureClose pastelMint"><div className="pxWrap"><div className="pxTag">[ RHO CLI ]</div><h2>Measure before<br/>the full run.</h2><div className="heroActions"><Link href="/contact/" className="pxButton">Request access <ArrowUpRight size={12}/></Link><Link href="/product/" className="pxOutline">Explore Rho Trials</Link></div></div></section>
</>}