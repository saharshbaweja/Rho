import Link from 'next/link';
import {ArrowUpRight,BookOpen,CloudSun,FileCheck2,ShieldCheck} from 'lucide-react';
import MissionDecisionDemo from '../components/MissionDecisionDemo';

const operatingContext=[
  ['Operator knowledge','OpSpecs, GOM, MEL/CDL, SOPs and company minima'],
  ['Live conditions','Weather, NOTAMs, airport state and route constraints'],
  ['Mission state','Aircraft, crew, timing, fuel and operational dependencies'],
  ['Decision trace','What changed, what it affects and the evidence behind it']
];

const workflow=[
  ['01','Connect the operating context','Aeros brings the mission, operator procedures and live conditions into one continuously updated operational state.'],
  ['02','Detect what actually changed','New information is evaluated against the exact flight. Aeros elevates material changes instead of adding another alert feed.'],
  ['03','Understand the consequence','Every conclusion keeps its source and rule attached, so dispatchers can see why a mission moved from clear to review.'],
  ['04','Compare the next moves','Aeros generates viable paths forward with timing, fuel, crew, operational impact and required actions visible side by side.']
];

const principles=[
  [ShieldCheck,'Human authority stays in control','Aeros supports operational decisions. Authorized personnel review and approve the action.'],
  [BookOpen,'Operator rules stay visible','Source material and operator-specific constraints remain attached to every conclusion.'],
  [CloudSun,'Live data stays mission-specific','Weather and NOTAM changes matter only when they change the state of the flight.'],
  [FileCheck2,'One reviewed state becomes the brief','The same evidence used for the decision becomes the dispatcher and crew briefing.']
];

export default function Home(){
  return <div className="dust-home">
    <section className="dh-hero">
      <div className="dh-hero-inner">
        <div className="dh-kicker">AI OPERATIONS INTELLIGENCE FOR AVIATION</div>
        <h1>Every operational decision,<br/>in context.</h1>
        <p>Aeros connects operator knowledge, live flight conditions, aircraft and crew context so teams can understand what changed, what it affects, and which options remain viable.</p>
        <div className="dh-actions">
          <Link href="/contact/" className="dh-primary">Request a demo <ArrowUpRight size={14}/></Link>
          <Link href="/dashboard/" className="dh-secondary">Open the product</Link>
        </div>
      </div>
    </section>

    <section className="dh-context-strip" aria-label="Aeros operating context">
      <span>Aeros connects</span>
      <b>Operator rules</b><i/> <b>Weather</b><i/> <b>NOTAMs</b><i/> <b>Aircraft</b><i/> <b>Crew</b><i/> <b>Mission state</b>
    </section>

    <section className="dh-product" id="product">
      <div className="dh-section-copy centered">
        <span>SEE AEROS IN ACTION</span>
        <h2>One mission. One operating picture.</h2>
        <p>The product is organized around the decision, not the data source. Everything relevant to the mission stays on the same surface.</p>
      </div>
      <div className="dh-product-frame">
        <div className="dh-frame-top"><span>Mission workspace</span><b>AO-1842 · KTEB → EGLL</b><em>Live evaluation</em></div>
        <div className="dh-frame-body"><MissionDecisionDemo compact/></div>
      </div>
    </section>

    <section className="dh-statement">
      <div className="dh-statement-label">THE PROBLEM</div>
      <h2>The information already exists.<br/>The hard part is understanding the consequence.</h2>
      <p>Operators already have weather tools, NOTAMs, manuals, scheduling software, maintenance systems and crew records. Aeros is the reasoning layer that keeps those sources connected to the mission and to each other.</p>
    </section>

    <section className="dh-context" id="how-it-works">
      <div className="dh-section-copy">
        <span>ONE OPERATING CONTEXT</span>
        <h2>Built around the flight, not another dashboard.</h2>
      </div>
      <div className="dh-context-list">
        {operatingContext.map(([title,desc],index)=><div className="dh-context-row" key={title}><span>0{index+1}</span><h3>{title}</h3><p>{desc}</p></div>)}
      </div>
    </section>

    <section className="dh-workflow">
      <div className="dh-section-copy">
        <span>FROM SIGNAL TO DECISION</span>
        <h2>A clear operational workflow.</h2>
        <p>No agent theater. No hidden chain of tools. Aeros turns changing mission context into a reviewable decision process.</p>
      </div>
      <div className="dh-workflow-list">
        {workflow.map(([n,title,desc])=><article key={n}><span>{n}</span><div><h3>{title}</h3><p>{desc}</p></div></article>)}
      </div>
    </section>

    <section className="dh-dark">
      <div className="dh-dark-copy">
        <span>OPERATIONAL OPTIONS</span>
        <h2>When the flight changes, show what remains possible.</h2>
        <p>Instead of returning one opaque answer, Aeros compares feasible paths forward and keeps the tradeoffs visible: delay, fuel, crew legality, constraints, risk and required actions.</p>
        <Link href="/dashboard/">Explore the mission workspace <ArrowUpRight size={13}/></Link>
      </div>
      <div className="dh-option-list">
        <div><span>01</span><section><small>RECOMMENDED</small><h3>Add KDEN alternate</h3><p>Preserve departure time while adding planning margin.</p></section><b>0 min</b></div>
        <div><span>02</span><section><small>VIABLE</small><h3>Delay departure 45 min</h3><p>Move the arrival into the improved forecast window.</p></section><b>+45 min</b></div>
        <div><span>03</span><section><small>FALLBACK</small><h3>Plan KEGE recovery</h3><p>Maintain departure timing with a destination recovery plan.</p></section><b>Medium impact</b></div>
      </div>
    </section>

    <section className="dh-principles">
      <div className="dh-section-copy centered">
        <span>TRUST BY DESIGN</span>
        <h2>Built for decisions people have to stand behind.</h2>
      </div>
      <div className="dh-principle-grid">
        {principles.map(([Icon,title,desc])=><article key={title}><Icon size={18}/><h3>{title}</h3><p>{desc}</p></article>)}
      </div>
    </section>

    <section className="dh-platform">
      <div className="dh-platform-copy">
        <span>START NARROW. EXPAND WITH TRUST.</span>
        <h2>Mission intelligence first.<br/>The operations layer next.</h2>
        <p>Aeros starts with one high-value workflow: evaluate a real mission against operator rules and live conditions. From there, the same operating model can expand into dispatch, monitoring, disruption recovery and OCC-wide coordination.</p>
      </div>
      <div className="dh-platform-rail">
        <div><small>NOW</small><b>Part 135 mission intelligence</b><p>Acceptance, review, options and briefing.</p></div>
        <div><small>NEXT</small><b>Dispatch + monitoring</b><p>Manage more flights by exception.</p></div>
        <div><small>LONG TERM</small><b>Operational intelligence layer</b><p>Coordinate aircraft, crew, maintenance and recovery.</p></div>
      </div>
    </section>

    <section className="dh-final">
      <span>DESIGN PARTNERS</span>
      <h2>Bring one real mission.<br/>We'll show you the decision trace.</h2>
      <p>Run Aeros beside your current workflow using the rules and operating context your team already trusts.</p>
      <div className="dh-actions"><Link href="/contact/" className="dh-primary light">Become a design partner <ArrowUpRight size={14}/></Link><Link href="/dashboard/" className="dh-secondary dark">Open the product</Link></div>
    </section>
  </div>;
}
