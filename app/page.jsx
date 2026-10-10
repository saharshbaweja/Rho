import {BookOpen,CloudSun,FileCheck2,GitBranch,RadioTower,SearchCheck,ShieldCheck,UsersRound} from 'lucide-react';
import {DmFeatureGrid,DmFinalCTA,DmPageHero,DmQuoteLike,DmRoleBand,DmSecurityBand,DmSplit,DmSteps,DmTrustedStrip,DecisionTraceVisual} from '../components/DustMarketing';

const features=[
 ['Mission context','Bring the exact flight, aircraft, crew, rules and live environment into one continuously reviewed state.','blue',SearchCheck],
 ['Material change detection','Separate operational consequences from another stream of raw alerts.','rose',CloudSun],
 ['Source-backed decisions','Keep the operator rule and live evidence attached to every material conclusion.','gold',BookOpen],
 ['Operational options','Compare viable paths forward with timing, fuel, crew, constraints and actions visible.','green',FileCheck2]
];

export default function Home(){return <div className="dm-site">
 <DmPageHero eyebrow="AI OPERATIONS INTELLIGENCE FOR AVIATION" title="Every operational decision, in context." body="Aeros connects operator knowledge, live flight conditions, aircraft and crew context so teams can understand what changed, what it affects, and which options remain viable." />
 <DmTrustedStrip/>
 <DmSplit reverse eyebrow="SEE AEROS IN ACTION" title="AI that uses the full mission context to do real operational work." body="Most aviation tools give you another source of information. Aeros brings the relevant sources together around the flight, evaluates the consequence and keeps the reasoning inspectable."><DecisionTraceVisual/></DmSplit>
 <DmQuoteLike title="The information already exists. The hard part is understanding the consequence." body="Weather, NOTAMs, manuals, MELs, crew records and scheduling systems already exist. Aeros is the reasoning layer that connects them to the mission and to each other."/>
 <DmFeatureGrid eyebrow="ONE SYSTEM FOR THE DECISION" title="From fragmented inputs to one operating picture." body="Aeros is organized around the mission, not the data source. The interface should explain the operation before the AI says a word." items={features}/>
 <DmSteps eyebrow="FROM SIGNAL TO DECISION" title="A clear operational workflow." body="No agent theater. Aeros turns changing mission context into a reviewable decision process." items={[["Connect the operating context","Bring the mission, operator procedures and live conditions into one operational state."],["Detect what actually changed","Elevate only changes that alter the mission decision."],["Understand the consequence","Keep source, rule and impact visible in the same trace."],["Compare the next moves","Generate viable options with tradeoffs and required actions visible."]]}/>
 <DmRoleBand/>
 <DmSecurityBand/>
 <DmSplit eyebrow="START NARROW. EXPAND WITH TRUST." title="Mission intelligence first. The operations layer next." body="Aeros starts with one high-value workflow: evaluate a real mission against operator rules and live conditions. From there, the same operating model expands into dispatch, monitoring, disruption recovery and OCC-wide coordination."><div className="dm-trace-visual"><div className="dm-trace-row"><small>NOW</small><div><b>Mission intelligence</b><span>Acceptance, review, options and briefing.</span></div></div><div className="dm-trace-arrow">↓</div><div className="dm-trace-row"><small>NEXT</small><div><b>Dispatch + monitoring</b><span>Manage more flights by exception.</span></div></div><div className="dm-trace-arrow">↓</div><div className="dm-trace-row dark"><small>LATER</small><div><b>Operations orchestration</b><span>Coordinate aircraft, crew, maintenance and recovery.</span></div></div></div></DmSplit>
 <DmFinalCTA/>
 </div>}
