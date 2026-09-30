import Link from 'next/link';
const rows=[
 ['CODING AGENT','Production traces','+4.2 pts','13%','Synthetic data duplicated patterns already in the corpus.'],
 ['SUPPORT MODEL','Escalation transcripts','+3.6 pts','18%','Expert examples created more lift per dollar than raw chat volume.'],
 ['TOOL USE','Failure recoveries','+5.1 pts','11%','Recovery trajectories targeted the eval failure modes directly.'],
 ['LEGAL EXTRACTION','Reviewed edge cases','+2.8 pts','16%','Small expert-reviewed edge cases outperformed a larger generic corpus.'],
 ['VISION QA','Hard negatives','+3.3 pts','9%','Hard negatives added more information than another balanced batch.'],
 ['ENTERPRISE SEARCH','Permission failures','+4.0 pts','14%','Permission and retrieval failures aligned best with target errors.']
];
export default function Examples(){return <>
<section className="featureHero pastelBlue"><div className="pxWrap featureHeroGrid"><div><div className="pxKicker">[ EXAMPLES ]</div><h1>Data decisions that<br/>should not be guesses.</h1><p>Illustrative Rho trial records showing the kinds of post-training questions the product is built to answer. These are product examples, not customer claims.</p><div className="heroActions"><Link href="/contact/" className="pxButton">Run a trial ↗</Link><Link href="/product/" className="pxOutline">How Rho works</Link></div></div><div className="exampleHeroPixels">{Array.from({length:64}).map((_,i)=><i key={i} className={i%7===0||i%11===0?'hot':''}/>)}</div></div></section>
<section className="exampleList pxWrap"><div className="listHead"><span>ILLUSTRATIVE TRIAL LIBRARY</span><b>{rows.length} RECORDS</b></div>{rows.map((r,i)=><article key={r[0]}><span className="rowNum">{String(i+1).padStart(2,'0')}</span><div><small>DOMAIN</small><h2>{r[0]}</h2></div><div><small>BEST DATASET</small><b>{r[1]}</b></div><div><small>LIFT</small><b>{r[2]}</b></div><div><small>OVERLAP</small><b>{r[3]}</b></div><div><small>RHO FOUND</small><p>{r[4]}</p></div></article>)}</section>
<section className="featureClose darkChapter"><div className="pxWrap"><div className="pxTag">[ EXAMPLES ]</div><h2>Every trial leaves<br/>a decision record.</h2><div className="heroActions"><Link href="/contact/" className="pxButton light">Become a design partner ↗</Link></div></div></section>
</>}