import Link from 'next/link';
import {ArrowUpRight,BookOpen,CloudSun,FileCheck2,Plane,RadioTower,ShieldCheck,UsersRound,Wrench} from 'lucide-react';
import MissionDecisionDemo from '../components/MissionDecisionDemo';

const features=[
  ['01','Operator context','Bring OpSpecs, manuals, MEL/CDL, company minima and approved procedures into one validated operating context.','blue'],
  ['02','Live mission state','Keep weather, NOTAMs, aircraft, crew, airports and route constraints attached to the exact flight they affect.','rose'],
  ['03','Decision trace','Show the condition, operator rule, evidence and conclusion behind every review state instead of hiding logic in a black box.','gold'],
  ['04','Operational options','Compare viable next moves with timing, fuel, crew, risk, blockers and required actions visible side by side.','green']
];

const roles=[
  [RadioTower,'Dispatch & OCC','Manage by exception. Aeros elevates the flights whose operating state actually changed.'],
  [BookOpen,'Directors of Operations','Turn approved policy into a visible, reviewable operating layer.'],
  [UsersRound,'Chief pilots','Keep crew eligibility, currency and special-airport requirements in mission context.'],
  [Plane,'Pilots','Receive concise, current briefs built from the same evidence dispatch reviewed.']
];

function FloorScene(){
  return <div className="dx-floor" aria-label="Aeros operational intelligence scene">
    <div className="dx-grid"/>
    <div className="dx-floor-label">LIVE OPERATION · AO-2418</div>

    <div className="dx-route-line dx-line-a"/>
    <div className="dx-route-line dx-line-b"/>
    <div className="dx-route-line dx-line-c"/>
    <div className="dx-route-line dx-line-d"/>

    <div className="dx-person dx-person-a"><span>SC</span><small>Dispatcher</small></div>
    <div className="dx-person dx-person-b"><span>ML</span><small>Chief pilot</small></div>
    <div className="dx-person dx-person-c"><span>JR</span><small>Flight crew</small></div>

    <div className="dx-source dx-weather"><CloudSun size={15}/><div><small>WEATHER</small><b>KASE TAF amended</b></div></div>
    <div className="dx-source dx-rules"><BookOpen size={15}/><div><small>OPERATOR RULE</small><b>Alternate review required</b></div></div>
    <div className="dx-source dx-aircraft"><Wrench size={15}/><div><small>AIRCRAFT</small><b>N905CR · MEL eligible</b></div></div>
    <div className="dx-source dx-crew"><UsersRound size={15}/><div><small>CREW</small><b>Duty margin 01:48</b></div></div>

    <div className="dx-mission-card">
      <div className="dx-mission-top"><span><i/> LIVE MISSION</span><em>Review</em></div>
      <h3>KPDK <b>→</b> KASE</h3>
      <p>AO-2418 · Citation CJ3+ · 14:30Z</p>
      <div className="dx-change"><span>Material change</span><b>Arrival weather now affects alternate planning.</b></div>
      <div className="dx-recommend"><small>RECOMMENDED PATH</small><b>Add KDEN alternate</b><span>0 min delay · +420 lb fuel · crew legal</span></div>
    </div>

    <div className="dx-agent-card dx-agent-a"><span>A</span><div><small>AEROS</small><b>3 viable paths remain</b><p>Re-evaluated against operator rules.</p></div></div>
    <div className="dx-agent-card dx-agent-b"><FileCheck2 size={15}/><div><small>BRIEF READY</small><b>2 items need review</b></div></div>
  </div>;
}

function MissionVisual(){
  return <div className="dx-product-visual"><div className="dx-product-window"><div className="dx-product-bar"><span>Aeros</span><b>AO-1842 · KTEB → EGLL</b><em>Live</em></div><div className="dx-product-body"><MissionDecisionDemo compact/></div></div></div>;
}

export default function Home(){
  return <div className="dust-home dx-home">
    <section className="dx-hero">
      <div className="dx-hero-copy">
        <h1>Operational AI for<br/>flight operations</h1>
        <p>Aeros connects operator knowledge, live conditions, aircraft, crew and mission state so teams can understand what changed, what it affects, and what remains possible.</p>
        <div className="dx-actions"><Link href="/contact/" className="dx-btn primary">Request a demo</Link><Link href="/dashboard/" className="dx-btn ghost">Open Aeros →</Link></div>
      </div>
      <FloorScene/>
    </section>

    <section className="dx-trusted">
      <h2>Built for the teams responsible<br/>for <span>every operational decision</span></h2>
      <div className="dx-marquee-mask"><div className="dx-marquee-track">{['PART 135','DISPATCH','OCC','CHIEF PILOTS','FLIGHT CREW','MAINTENANCE','SAFETY','OPERATIONS','PART 135','DISPATCH','OCC','CHIEF PILOTS','FLIGHT CREW','MAINTENANCE','SAFETY','OPERATIONS'].map((item,i)=><b key={`${item}-${i}`}>{item}</b>)}</div></div>
    </section>

    <section className="dx-split dx-action-section">
      <div className="dx-split-visual"><MissionVisual/></div>
      <div className="dx-split-copy">
        <span>SEE AEROS IN ACTION</span>
        <h2>AI that uses the full mission context to do real operational work</h2>
        <p>Most aviation tools show one source at a time. Aeros brings the relevant operating context together across company procedures, weather, NOTAMs, aircraft and crew so teams can evaluate the whole mission and act with the full picture.</p>
      </div>
    </section>

    <section className="dx-feature-section">
      <div className="dx-centered-copy"><span>ONE OPERATING CONTEXT</span><h2>One system for the decision</h2><p>Aeros separates validated operator rules, deterministic checks and generative intelligence so the model can explain and orchestrate without becoming the source of truth.</p></div>
      <div className="dx-feature-grid">{features.map(([n,title,desc,tone])=><article key={n} className={`dx-feature ${tone}`}><div><span>{n}</span><i/></div><h3>{title}</h3><p>{desc}</p><div className="dx-feature-hover"><b>{title}</b><small>Mission-aware · source-backed · continuously evaluated</small></div></article>)}</div>
    </section>

    <section className="dx-collaboration">
      <div className="dx-collab-copy"><span>HUMAN + AI OPERATIONS</span><h2>Work that moves between people and intelligence</h2><p>Dispatchers stay in control. Aeros monitors the mission, surfaces consequential changes, prepares viable options and keeps the evidence attached. People review, decide and approve.</p></div>
      <div className="dx-collab-scene">
        <div className="dx-thread-row"><span className="dx-avatar">SC</span><div><small>DISPATCHER · 14:18</small><b>What changed on AO-2418?</b></div></div>
        <div className="dx-thread-agent"><span>A</span><div><small>AEROS · LIVE CONTEXT</small><p>KASE arrival weather moved below the configured planning threshold. Crew and aircraft remain eligible. Alternate review is now required.</p><div className="dx-mini-trace"><span>KASE TAF</span><i>→</i><span>Company minima §4.12</span><i>→</i><b>Review</b></div></div></div>
        <div className="dx-thread-row bottom"><span className="dx-avatar">ML</span><div><small>CHIEF PILOT · 14:21</small><b>Simulate a 45 minute delay.</b></div></div>
      </div>
    </section>

    <section className="dx-security">
      <div className="dx-security-copy"><span>BUILT FOR CONTROLLED OPERATIONS</span><h2>Use AI without giving up operational authority</h2><p>Aeros is designed around provenance, explicit missing context, human approval and durable review state. The system should make operational reasoning more inspectable, not less.</p><Link href="/enterprise/">Trust & control <ArrowUpRight size={13}/></Link></div>
      <div className="dx-security-grid">
        <div><b>01</b><h3>Source-backed reasoning</h3><p>Every material conclusion keeps the operator rule, live source and supporting evidence attached.</p></div>
        <div><b>02</b><h3>Human decision authority</h3><p>Aeros proposes and explains. Authorized personnel review and approve operational actions.</p></div>
        <div><b>03</b><h3>Operator-specific context</h3><p>Company manuals, minima and procedures stay isolated to the operator and mission they govern.</p></div>
      </div>
    </section>

    <section className="dx-roles">
      <div className="dx-centered-copy"><span>ONE PLATFORM, EVERY ROLE</span><h2>One mission state, compounding value</h2><p>The same reviewed operational context becomes more useful as more of the operation works from it.</p></div>
      <div className="dx-role-grid">{roles.map(([Icon,title,desc])=><article key={title}><Icon size={18}/><div><h3>{title}</h3><p>{desc}</p></div><ArrowUpRight size={13}/></article>)}</div>
    </section>

    <section className="dx-final">
      <div><span>DESIGN PARTNERS</span><h2>Bring one real mission.<br/>We’ll show you the decision trace.</h2><p>Run Aeros beside your current workflow using the procedures and operating context your team already trusts.</p></div>
      <Link href="/contact/" className="dx-btn primary light">Request a demo <ArrowUpRight size={13}/></Link>
    </section>
  </div>;
}
