import Link from 'next/link';
import Reveal from '../../components/Reveal';

const cases=[
 ['CODING AGENT','Production traces','+4.2 pts','13%','Synthetic data duplicated existing patterns; real production traces won on marginal lift.'],
 ['SUPPORT MODEL','Escalation transcripts','+3.6 pts','18%','Expert escalation examples produced more lift per dollar than high-volume raw chats.'],
 ['TOOL USE','Failure recoveries','+5.1 pts','11%','Recovery trajectories improved the exact failure modes the eval weighted most heavily.'],
 ['LEGAL EXTRACTION','Reviewed edge cases','+2.8 pts','16%','Small expert-reviewed edge cases outperformed a much larger generic corpus.'],
 ['VISION QA','Hard negatives','+3.3 pts','9%','Hard negatives created more new information than another batch of balanced examples.'],
 ['ENTERPRISE SEARCH','Permission failures','+4.0 pts','14%','Permission and retrieval failures had the highest gradient alignment with target errors.']
];

export default function Examples(){return <>
<section className="pageHero wrap"><Reveal><p className="eyebrow">RHO IN ACTION</p><h1>Decisions that should<br/><em>not be guesses.</em></h1><p>Illustrative trial records showing the kinds of training-data questions Rho is built to answer. These are product examples, not customer claims.</p></Reveal></section>
<section className="caseIndex wrap"><div className="caseIntro"><span>ILLUSTRATIVE TRIAL LIBRARY</span><b>{cases.length} records</b></div>
{cases.map((c,i)=><Reveal key={c[0]} delay={Math.min(i*.03,.12)}><article className="caseRow"><div className="caseNum">{String(i+1).padStart(2,'0')}</div><div><small>DOMAIN</small><h2>{c[0]}</h2></div><div><small>BEST DATASET</small><strong>{c[1]}</strong></div><div><small>LIFT</small><strong>{c[2]}</strong></div><div><small>OVERLAP</small><strong>{c[3]}</strong></div><div className="caseFinding"><small>RHO FOUND</small><p>{c[4]}</p></div></article></Reveal>)}
</section>
<section className="dark section"><div className="wrap"><Reveal><p className="eyebrow">A repeatable record</p><h2 className="display light">Every result links the dataset,<br/>model, eval, cost, and outcome.</h2><p className="lede lightLede">That lineage is what turns one-off experiments into a system that can learn across decisions.</p><Link href="/contact/" className="ghost">Run a design-partner trial ↗</Link></Reveal></div></section>
</>}