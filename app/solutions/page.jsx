import {BookOpen,BriefcaseBusiness,Gauge,Plane,RadioTower,SearchCheck,UsersRound} from 'lucide-react';
import {DmFeatureGrid,DmFinalCTA,DmPageHero,DmQuoteLike,DmRoleBand,DmSplit,DmSteps,DecisionTraceVisual} from '../../components/DustMarketing';

const solutions=[['Part 135 charter','Mission acceptance and continuous review for lean commercial operators.','blue',Plane],['Dispatch & OCC','Manage by exception instead of rebuilding flight context.','rose',RadioTower],['Directors of Operations','Turn controlled company policy into an active operating layer.','gold',BookOpen],['Chief pilots','Keep crew eligibility and company requirements attached to the flight.','green',UsersRound]];

export default function Solutions(){return <div className="dm-site">
 <DmPageHero eyebrow="SOLUTIONS" title="One operating context, shaped for each role." body="Aeros keeps the underlying mission state consistent while changing the density, controls and review surface for dispatchers, operations leadership, chief pilots and crews."/>
 <DmSplit reverse eyebrow="PART 135 FIRST" title="Start where a single mission already requires multiple systems and judgment calls." body="Part 135 operators are a strong first wedge because mission acceptance and continuous review combine operator-specific rules, live conditions, crew, aircraft and airport constraints."><DecisionTraceVisual/></DmSplit>
 <DmFeatureGrid eyebrow="BY WORKFLOW" title="Built around the people making the operational decision." body="Different roles see the same evidence through the controls they actually need." items={solutions}/>
 <DmQuoteLike label="SHARED STATE" title="Different interfaces. Same operational truth." body="The dispatcher should not have one interpretation while the pilot brief contains another. Aeros keeps all role-specific outputs attached to one reviewed mission state."/>
 <DmSteps eyebrow="DEPLOYMENT PATH" title="Prove value in one workflow, then expand." body="Aeros should earn broader operational responsibility by showing measurable value on real missions first." items={[["Mission review","Start with one acceptance or disruption workflow."],["Continuous monitoring","Keep approved missions under exception-based review."],["Cross-role briefing","Generate role-appropriate outputs from the same evidence."],["Broader OCC coordination","Expand into recovery, crew, aircraft and maintenance workflows."]]}/>
 <DmRoleBand/>
 <DmFinalCTA title="Bring us the workflow your team still assembles by hand."/>
 </div>}
