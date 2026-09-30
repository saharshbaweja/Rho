const items=[
 ['01','Lift','Downstream performance gained against the target eval suite.'],
 ['02','Overlap','How much of the candidate is already represented in the current corpus.'],
 ['03','Saturation','Where more examples stop producing useful marginal improvement.'],
 ['04','Cost / point','What one point of eval improvement actually costs.'],
 ['05','Confidence','How stable the ranking is across controlled runs.'],
 ['06','Decision record','Dataset, model, eval, recipe, cost, and result stored together.']
];
export default function FeatureAnatomy(){return <div className="anatomyGrid">{items.map(x=><article key={x[0]}><span>{x[0]}</span><div className="miniVoxel"><i/><i/><i/></div><h3>{x[1]}</h3><p>{x[2]}</p></article>)}</div>}