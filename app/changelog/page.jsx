const releases=[
 ['2026.09','Pixel system','Rebuilt the Rho product site around the training-data decision engine, Monitor, Context, Stack, and Index.'],
 ['2026.08','Rho Monitor concept','Added a persistent graph linking dataset, run, model, eval, cost, and result.'],
 ['2026.07','Rho CLI concept','Added terminal-first dataset comparisons and machine-readable trial outputs.'],
 ['2026.06','Rho Trials prototype','Established controlled candidate comparisons as the initial product wedge.']
];
export default function Changelog(){return <>
<section className="featureHero pastelLav"><div className="pxWrap"><div className="pxKicker">[ CHANGELOG ]</div><h1>Building the data layer<br/>one primitive at a time.</h1><p>Product and prototype updates from Rho.</p></div></section>
<section className="changelogList pxWrap">{releases.map((r,i)=><article key={r[0]}><span>{r[0]}</span><div className="changePixel"><i/><i/><i/></div><div><h2>{r[1]}</h2><p>{r[2]}</p></div></article>)}</section>
</>}