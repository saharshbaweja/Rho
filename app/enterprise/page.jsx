import Link from 'next/link';
import Reveal from '../../components/Reveal';
import {ShieldCheck,LockKeyhole,Network,Database} from 'lucide-react';

export default function Enterprise(){return <>
<section className="pageHero wrap"><Reveal><p className="eyebrow">ENTERPRISE</p><h1>Measure proprietary data.<br/><em>Without giving it away.</em></h1><p>Rho is designed toward customer-controlled deployment for teams whose models, evaluations, and training corpora cannot leave their environment.</p><div className="actions"><Link className="btn" href="/contact/">Talk to Rho <span>↗</span></Link></div></Reveal></section>
<section className="enterpriseGrid wrap">
<Reveal><article><ShieldCheck/><span>01</span><h2>Private deployment</h2><p>Run the measurement plane close to your models and data in a customer-controlled cloud or VPC architecture.</p></article></Reveal>
<Reveal delay={.05}><article><LockKeyhole/><span>02</span><h2>Raw data stays private</h2><p>Rho’s benchmark thesis does not require centralizing raw proprietary datasets. Shared intelligence can be built from carefully scoped metadata.</p></article></Reveal>
<Reveal delay={.1}><article><Network/><span>03</span><h2>Opt-in network effects</h2><p>Organizations decide which experiment metadata contributes to reference benchmarks and which stays entirely isolated.</p></article></Reveal>
<Reveal delay={.15}><article><Database/><span>04</span><h2>Decision audit trail</h2><p>Keep a structured lineage from dataset selection to training recipe, evaluation result, cost, and final allocation decision.</p></article></Reveal>
</section>
<section className="dark section"><div className="wrap enterpriseDark"><Reveal><div><p className="eyebrow">Architecture</p><h2 className="display light">Your environment.<br/>Rho’s measurement layer.</h2></div></Reveal><Reveal><div className="enterpriseFlow"><span>PRIVATE DATA</span><i>→</i><span>RHO TRIALS</span><i>→</i><span>LOCAL RESULTS</span><i>→</i><span>OPTIONAL BENCHMARK METADATA</span></div></Reveal></div></section>
<section className="section wrap"><Reveal><p className="eyebrow">Who this is for</p><h2 className="display">Teams where a wrong data decision<br/><span>costs more than the measurement.</span></h2></Reveal><div className="enterpriseUse"><div><b>MODEL LABS</b><p>Recurring post-training programs with expensive compute and proprietary evals.</p></div><div><b>ENTERPRISE AI</b><p>Sensitive internal datasets that cannot be uploaded into a generic SaaS workflow.</p></div><div><b>DATA PROCUREMENT</b><p>Teams evaluating whether licensed or generated corpora justify their price.</p></div></div></section>
</>}