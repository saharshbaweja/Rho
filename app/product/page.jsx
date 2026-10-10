import Link from 'next/link';
import {BookOpen,CloudSun,FileCheck2,GitBranch,SearchCheck,UsersRound} from 'lucide-react';
import {DmFeatureGrid,DmFinalCTA,DmPageHero,DmQuoteLike,DmSecurityBand,DmSplit,DmSteps,DecisionTraceVisual} from '../../components/DustMarketing';

const caps=[
 ['Mission intelligence','Turn each flight into a continuously evaluated operational state.','blue',SearchCheck],
 ['Operator knowledge','Structure OpSpecs, manuals, MEL/CDL and company limits with source traceability.','rose',BookOpen],
 ['Live operational data','Filter weather, NOTAMs and airport state against the exact mission.','gold',CloudSun],
 ['Crew & aircraft','Keep eligibility, maintenance state and operational limits in the same decision.','green',UsersRound]
];

export default function Product(){return <div className="dm-site">
 <DmPageHero eyebrow="THE AEROS PLATFORM" title="The intelligence layer across flight operations." body="Aeros brings operator knowledge, live aviation data, aircraft, crew and mission state into one decision surface—then keeps that operating context current as conditions change." primary="Request a demo" secondary="Open mission workspace"/>
 <DmSplit reverse eyebrow="THE CORE WORKFLOW" title="One flight. One disruption. Several viable paths forward." body="Aeros detects the material change, identifies the affected operator rules and constraints, and compares the operational options without losing the evidence behind them."><DecisionTraceVisual/></DmSplit>
 <DmFeatureGrid eyebrow="OPERATING CONTEXT" title="Everything relevant to the mission stays connected." body="Each capability contributes to the same operational state rather than creating another dashboard silo." items={caps}/>
 <DmQuoteLike label="WHY THIS ARCHITECTURE" title="Built around the decision, not the data source." body="Scheduling, maintenance, crew, weather and manuals remain systems of record. Aeros sits across them as the reasoning and coordination layer."/>
 <DmSteps eyebrow="THE PRODUCT LOOP" title="From intake to continuous review." body="The same mission representation supports acceptance, monitoring, briefing and recovery." items={[["Create mission context","Assemble route, airports, aircraft, crew, timing and operator profile."],["Apply operator knowledge","Match the exact procedures, limits and authorizations that govern the flight."],["Evaluate live state","Continuously compare weather, NOTAMs and operational changes against the mission."],["Generate and review options","Present feasible next actions with evidence, tradeoffs and required approvals."]]}/>
 <DmSecurityBand/>
 <section className="dm-features"><div className="dm-center-copy"><div className="dm-eyebrow">EXPLORE THE PLATFORM</div><h2>Go deeper into each operating layer.</h2></div><div className="dm-simple-grid">{[['Mission intelligence','/product/mission-intelligence'],['Operator rules','/product/operator-rules'],['Live data','/product/live-data'],['Crew & aircraft','/product/crew-aircraft'],['Mission briefs','/product/briefing'],['Change monitoring','/product/alerts'],['Integrations','/product/integrations'],['Planning + monitoring','/product/scheduling']].map(([t,h],i)=><Link href={h} key={h} style={{background:'#fff',padding:30,textDecoration:'none',color:'inherit',minHeight:180}}><span style={{fontFamily:'monospace',fontSize:11,color:'#999'}}>0{i+1}</span><h3 style={{marginTop:70,fontSize:19}}>{t}</h3><p style={{fontSize:12,color:'#777'}}>Explore capability →</p></Link>)}</div></section>
 <DmFinalCTA title="Bring us the flight your team still reviews across six tabs."/>
 </div>}
