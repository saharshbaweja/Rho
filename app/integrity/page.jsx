import Link from 'next/link';

const findings=[
 ['CONTAMINATION','Eval examples overlap with training candidates.','11.8% suspected overlap'],
 ['PII','Candidate corpus includes high-risk personal fields.','342 flagged rows'],
 ['DUPLICATION','Near-duplicate clusters inflate apparent data volume.','27% redundant'],
 ['LICENSE','Source metadata is incomplete for part of the corpus.','3 unresolved sources']
];

export default function Integrity(){return <>
<section className="featureHero pastelPink"><div className="pxWrap featureHeroGrid">
 <div><div className="pxKicker">[ RHO INTEGRITY ]</div><h1>Know what is inside<br/>the data you train on.</h1><p>Rho Integrity is the quality-control layer for candidate training data: contamination, duplication, risky metadata, and provenance signals before the data enters a full run.</p><div className="heroActions"><Link href="/contact/" className="pxButton">Request access ↗</Link><Link href="/product/" className="pxOutline">Explore Trials</Link></div></div>
 <div className="integrityHero"><div className="integrityCore">ρ</div>{['PII','DUP','EVAL','LICENSE','SOURCE','HASH'].map((x,i)=><span className={'ig'+i} key={x}>{x}</span>)}</div>
</div></section>

<section className="pxChapter pastelSand"><div className="pxWrap">
 <div className="chapterHead"><div><div className="pxTag">[ WHAT RHO CHECKS ]</div><h2>Data quality before<br/>training quality.</h2></div><p>Bad training data can look valuable until it creates leakage, false lift, or unnecessary compute spend.</p></div>
 <div className="integrityFindings">{findings.map((x,i)=><article key={x[0]}><span>{String(i+1).padStart(2,'0')}</span><h3>{x[0]}</h3><p>{x[1]}</p><b>{x[2]}</b></article>)}</div>
</div></section>

<section className="pxChapter darkChapter"><div className="pxWrap">
 <div className="chapterHead"><div><div className="pxTag">[ IN THE TRIAL LOOP ]</div><h2>Integrity signals become<br/>part of the decision.</h2></div><p>Rho can discount misleading lift when a candidate overlaps with the eval, is highly redundant, or carries unresolved provenance risk.</p></div>
 <div className="deploymentFlow"><span>CANDIDATE DATA</span><i>→</i><span>INTEGRITY CHECK</span><i>→</i><span>CONTROLLED TRIAL</span><i>→</i><span>RISK-ADJUSTED DECISION</span></div>
</div></section>

<section className="featureClose pastelMint"><div className="pxWrap"><div className="pxTag">[ RHO INTEGRITY ]</div><h2>Measure value.<br/>Discount bad signal.</h2><div className="heroActions"><Link href="/contact/" className="pxButton">Request access ↗</Link><Link href="/methodology/" className="pxOutline">Methodology</Link></div></div></section>
</>}