import Link from 'next/link';
import Reveal from '../../components/Reveal';

export default function Methodology(){return <>
<section className="pageHero wrap pastelHero lavender"><Reveal><p className="eyebrow">METHODOLOGY</p><h1>Measure what data<br/><em>adds at the margin.</em></h1><p>Rho is built around a simple idea: the value of a dataset depends on what it adds to a specific model, task, corpus, and training recipe.</p></Reveal></section>
<section className="section wrap methodGrid">
 <Reveal><article><span>01</span><h2>Control the comparison</h2><p>Candidate datasets are evaluated under matched recipes, sample sizes, and target evals so observed differences are attributable to the data—not experiment drift.</p></article></Reveal>
 <Reveal delay={.05}><article><span>02</span><h2>Measure redundancy</h2><p>Embedding and corpus-similarity signals estimate how much of a candidate is already represented in the current training set.</p></article></Reveal>
 <Reveal delay={.1}><article><span>03</span><h2>Fit learning curves</h2><p>Multiple small runs estimate where each candidate saturates and how efficiently additional examples convert into downstream lift.</p></article></Reveal>
 <Reveal delay={.15}><article><span>04</span><h2>Normalize economics</h2><p>Rho combines measured lift, compute, acquisition or generation cost, overlap, and uncertainty into a comparable marginal-return view.</p></article></Reveal>
</section>
<section className="methodFormula mintPanel"><div className="wrap"><Reveal><p className="eyebrow">CONCEPTUAL MODEL</p><h2>Marginal data return</h2><div className="formula">RHO VALUE = f(Δ PERFORMANCE, REDUNDANCY, COMPUTE, DATA COST, CONFIDENCE)</div><p>This is a conceptual product framework, not a claimed universal pricing formula. The initial product is grounded in controlled empirical trials.</p></Reveal></div></section>
<section className="section wrap"><Reveal><p className="eyebrow">WHY SMALL RUNS</p><h2 className="sectionTitle">Spend a little compute<br/><span>to avoid wasting a lot.</span></h2></Reveal><div className="curveDemo"><div className="curveAxis"><span>MODEL PERFORMANCE</span><i/></div><div className="curveLines"><b className="curveA"/><b className="curveB"/><b className="curveC"/></div><div className="curveLabels"><span>DATA A / steep early lift</span><span>DATA B / moderate</span><span>DATA C / early saturation</span></div></div><Link href="/contact/" className="btn">Run a design-partner comparison ↗</Link></section>
</>}