'use client';
import {useEffect,useState} from 'react';
import {ArrowUpRight,ChevronDown,Plane,CloudSun,Wrench,Users,Route,Radio,Clock3,Fuel,ShieldCheck,RefreshCcw} from 'lucide-react';

const incidents=[
  {tag:'AIRCRAFT',title:'N172GT grounded',detail:'Oil pressure squawk · 3 lessons affected',action:'Rebalanced 3 flights',tone:'pink'},
  {tag:'WEATHER',title:'Ceiling dropping',detail:'VFR window closes at 14:20 · 8 flights at risk',action:'Moved 6 flights earlier',tone:'blue'},
  {tag:'CREW',title:'Instructor unavailable',detail:'CFI Sarah out · 4 students affected',action:'Reassigned 4 lessons',tone:'lav'}
];

const flights=[
  ['08:00','N172GT','JOHN / SARAH','XC STAGE 2','READY'],
  ['09:30','N551SP','EMILY / ALEX','IFR LESSON 4','READY'],
  ['11:00','N183GT','CHRIS / MIKE','CHECKRIDE PREP','AT RISK'],
  ['13:30','N882SP','MAYA / SARAH','PATTERN WORK','HOLD']
];

const faq=[
  ['What is Aeros?','Aeros is an AI-native operations system for flight schools and general aviation operators. It coordinates scheduling, aircraft, instructors, maintenance, weather, training requirements, and disruptions in one live operating layer.'],
  ['Is Aeros replacing Flight Schedule Pro immediately?','No. The practical wedge is to sit beside existing systems first, import the operation, and automate the decisions that legacy systems still leave to schedulers and dispatchers. Over time Aeros can become the system of record.'],
  ['What does the first product do?','The first product continuously builds and repairs the operating schedule. When an aircraft goes down, weather changes, or crew availability shifts, Aeros proposes a new plan and lets an operator approve it.'],
  ['Does Aeros make decisions automatically?','Initially Aeros is human-in-the-loop: it detects constraints, proposes actions, explains why, and waits for approval. Higher-trust workflows can become more autonomous over time.'],
  ['Who is Aeros for first?','Flight schools, university aviation programs, charter operators, and other general aviation teams with enough aircraft, instructors, maintenance constraints, and daily schedule changes that manual coordination is expensive.'],
  ['How big can Aeros become?','Scheduling is the wedge. The broader goal is an operating network connecting aircraft operators with FBOs, maintenance, fuel, ground services, payments, procurement, and eventually market intelligence across general aviation.']
];

function Frame({children,className=''}){return <div className={'a-frame '+className}><i/><i/><i/><i/>{children}</div>}

function HeroOps({scenario,onCycle}){
  return <div className="hero-ops">
    <div className="ops-top"><span>LIVE OPS / ATLANTA</span><b><i/> SYSTEM ACTIVE</b></div>
    <div className="airspace">
      <div className="radar-ring rr1"/><div className="radar-ring rr2"/><div className="radar-ring rr3"/>
      <div className="runway rw1"/><div className="runway rw2"/>
      <div className="plane-dot pd1"><Plane size={15}/><span>N172GT</span></div>
      <div className="plane-dot pd2"><Plane size={14}/><span>N551SP</span></div>
      <div className="plane-dot pd3"><Plane size={13}/><span>N183GT</span></div>
      <div className="plane-dot pd4"><Plane size={12}/><span>N882SP</span></div>
      <div className={'incident-card '+scenario.tone}>
        <small>{scenario.tag}</small>
        <strong>{scenario.title}</strong>
        <p>{scenario.detail}</p>
        <div><RefreshCcw size={11}/>{scenario.action}</div>
      </div>
      <div className="signal-path sp1"/><div className="signal-path sp2"/><div className="signal-path sp3"/>
    </div>
    <button className="simulate" onClick={onCycle}>SIMULATE NEXT DISRUPTION ↻</button>
  </div>
}

function ScheduleBoard(){
 return <div className="schedule-board">
   <div className="sb-head"><span>TODAY / OPTIMIZED</span><b>183 FLIGHTS</b></div>
   {flights.map((f,i)=><div className="sb-row" key={f[0]} style={{animationDelay:(i*.12)+'s'}}>
      <time>{f[0]}</time><strong>{f[1]}</strong><span>{f[2]}</span><em>{f[3]}</em><b className={f[4]==='READY'?'ready':f[4]==='AT RISK'?'risk':'hold'}>{f[4]}</b>
   </div>)}
   <div className="sb-recovery"><span>AEROS ACTION</span><strong>8 conflicts resolved automatically</strong><button>REVIEW PLAN</button></div>
 </div>
}

function ConstraintScene(){
 return <div className="constraint-scene">
   <div className="constraint-core"><b>A</b><span>OPERATING PLAN</span></div>
   {[
    ['AIRCRAFT',Plane,'c1'],['CREW',Users,'c2'],['WEATHER',CloudSun,'c3'],['MAINTENANCE',Wrench,'c4'],['TRAINING',Route,'c5'],['TIME',Clock3,'c6']
   ].map(([t,I,c])=><div className={'constraint '+c} key={t}><I size={14}/><span>{t}</span></div>)}
   <svg viewBox="0 0 600 360" className="constraint-lines" aria-hidden="true">
     <line x1="300" y1="180" x2="100" y2="85"/><line x1="300" y1="180" x2="500" y2="85"/>
     <line x1="300" y1="180" x2="82" y2="270"/><line x1="300" y1="180" x2="520" y2="270"/>
     <line x1="300" y1="180" x2="300" y2="40"/><line x1="300" y1="180" x2="300" y2="322"/>
   </svg>
 </div>
}

function NetworkScene(){
 return <div className="network-scene">
   <div className="network-core"><b>AEROS</b><span>OPERATING NETWORK</span></div>
   {['OPERATORS','FBOs','MAINTENANCE','FUEL','HANGARS','PAYMENTS'].map((x,i)=><div className={'network-node nn'+i} key={x}><i/><b>{x}</b><span>{i%2===0?'DEMAND':'CAPACITY'}</span></div>)}
   <div className="network-ring nr1"/><div className="network-ring nr2"/><div className="network-ring nr3"/>
   {Array.from({length:7}).map((_,i)=><i className={'network-pulse np'+i} key={i}/>)}
 </div>
}

export default function Home(){
 const [incident,setIncident]=useState(0);
 const [open,setOpen]=useState(null);
 useEffect(()=>{const t=setInterval(()=>setIncident(v=>(v+1)%incidents.length),4400);return()=>clearInterval(t)},[]);
 return <div className="aeros-page">

  <section className="a-hero" id="product">
    <div className="a-hero-copy">
      <div className="a-kicker">[ GENERAL AVIATION / OPERATING SYSTEM ]</div>
      <h1>Run the entire<br/>flight operation.</h1>
      <div className="hero-bottom">
        <p>Aeros continuously coordinates aircraft, instructors, students, maintenance, weather, and daily disruptions — then tells your team what should happen next.</p>
        <div className="hero-buttons"><a className="btn-dark" href="#contact">Become a design partner</a><a className="btn-green" href="#operations">See how it works</a></div>
        <small>Human-in-the-loop today. Increasingly autonomous over time.</small>
      </div>
    </div>
    <HeroOps scenario={incidents[incident]} onCycle={()=>setIncident(v=>(v+1)%incidents.length)}/>
    <div className="hero-foot">FROM STATIC SCHEDULES → TO A LIVE OPERATING SYSTEM</div>
  </section>

  <section className="a-market-strip">
    {['FLIGHT SCHOOLS','UNIVERSITY AVIATION','CHARTER OPERATORS','FLEET MANAGERS','FBOs','MAINTENANCE TEAMS','DISPATCH','LINE OPERATIONS'].map(x=><span key={x}>{x}</span>)}
  </section>

  <section className="a-thesis">
    <div className="thesis-mark">A</div>
    <blockquote>Legacy aviation software records the plan. <b>Aeros continuously rebuilds the plan when reality changes.</b></blockquote>
    <div className="thesis-meta">THE WEDGE <span>Scheduling + recovery</span></div>
  </section>

  <section className="a-dark" id="operations">
    <div className="dark-intro">
      <div className="a-kicker">[ THE OPERATING LOOP ]</div>
      <h2>Every constraint. One live plan.</h2>
      <p>Aeros understands the operation as a connected system. When one thing changes, it reasons through the downstream impact and proposes the best recovery plan.</p>
      <a href="#how">See the operating loop <ArrowUpRight size={12}/></a>
    </div>

    <div className="how-label">HOW AEROS RUNS THE DAY</div>
    <div className="how-grid" id="how">
      {[
        ['STEP 01','Ingest the operation','Aircraft, crew, students, lessons, maintenance windows, weather, availability, and operating rules become one live state.'],
        ['STEP 02','Optimize the plan','Aeros continuously scores conflicts, utilization, training progression, deadlines, and operational cost.'],
        ['STEP 03','Recover in real time','When reality changes, Aeros produces a new plan, explains the tradeoffs, and lets the operator apply it.']
      ].map((s,i)=><article key={s[0]}>
        <Frame className={'diagram aeros-diagram d'+i}>
          <div className="wire"/>
          <div className="core">{i===0?<Radio size={30}/>:i===1?<Route size={30}/>:<RefreshCcw size={30}/>}</div>
          <span className="micro a">{i===0?'INPUTS':i===1?'SOLVER':'RECOVERY'}</span>
          <span className="micro b">{i===0?'LIVE':i===1?'OPTIMAL':'APPROVED'}</span>
          <b className="pixel p1"/><b className="pixel p2"/><b className="pixel p3"/>
        </Frame>
        <small>{s[0]}</small><h3>{s[1]}</h3><p>{s[2]}</p>
      </article>)}
    </div>

    <div className="catch-head"><span>THE MOMENT IT MATTERS</span><h3>A normal day becomes chaos in minutes.</h3></div>
    <div className="incident-grid">
      {[
        ['AIRCRAFT DOWN','N172GT','3 flights affected','Aeros finds two alternate aircraft and preserves all required lesson constraints.'],
        ['WEATHER MOVES IN','14:20','8 flights at risk','Aeros pulls qualified flights forward and automatically rebuilds the afternoon.'],
        ['CFI CALLS OUT','SARAH','4 students affected','Aeros reassigns compatible instructors without breaking currency or training requirements.']
      ].map((x,i)=><article key={x[0]}>
        <div className="incident-top"><span>{x[0]}</span><b>0{i+1}</b></div>
        <div className="incident-screen"><strong>{x[1]}</strong><span>{x[2]}</span><div className="pulse-line"/><div className="pulse-line short"/><em>RECOVERY READY</em></div>
        <h3>{x[3]}</h3>
      </article>)}
    </div>
  </section>

  <section className="a-personal">
    <div className="section-title"><div className="a-kicker">[ CONTINUOUS OPERATIONS ]</div><h2>A schedule that understands the business.</h2><p>Instead of forcing operators to rebuild the day manually, Aeros reasons across every constraint that makes a flight possible.</p></div>
    <div className="personal-grid">
      <article>
        <Frame className="schedule-frame"><ScheduleBoard/></Frame>
        <small>[ LIVE SCHEDULING ]</small><h3>Continuously optimize the day</h3>
        <p>Students, instructors, aircraft, lesson requirements, maintenance, and availability all move together instead of living in separate tabs and spreadsheets.</p>
      </article>
      <article>
        <Frame className="constraint-frame"><ConstraintScene/></Frame>
        <small>[ OPERATING CONTEXT ]</small><h3>Every decision has context</h3>
        <p>Aeros evaluates what can fly, what should fly, what is at risk, and what action preserves utilization and training progress.</p>
      </article>
    </div>
  </section>

  <section className="a-validation">
    <div className="validation-title"><div className="a-kicker">[ THE CENTRAL OPS LAYER ]</div><h2>One control plane for the operation.</h2><p>Aeros starts beside your existing stack, then gradually becomes the place where the operation actually gets run.</p></div>
    <div className="ways-label">THE MODULES AEROS GROWS INTO</div>
    <div className="ways-grid">
      {[
        ['01','SCHEDULE','Who flies what, with whom, and when.','calendar'],
        ['02','DISPATCH','Flight readiness, crew, aircraft, weather, and approvals.','dispatch'],
        ['03','MAINTAIN','Squawks, inspections, utilization, downtime, and availability.','maintain'],
        ['04','TRAIN','Student progression, lesson requirements, stage checks, and completion.','train']
      ].map((x,i)=><article key={x[0]}>
        <Frame className={'module-visual mv'+i}><div className="module-grid"/><div className="module-core">{i===0?<Clock3/>:i===1?<Plane/>:i===2?<Wrench/>:<Route/>}</div><span className="module-signal ms1"/><span className="module-signal ms2"/></Frame>
        <small>{x[0]}</small><h3>{x[1]}</h3><p>{x[2]}</p>
      </article>)}
    </div>
  </section>

  <section className="a-autotest">
    <div className="auto-copy">
      <div className="a-kicker">[ AUTONOMOUS RECOVERY ]</div>
      <h2>When the day breaks, rebuild it in seconds.</h2>
      <p>DISRUPTION → IMPACT GRAPH → NEW PLAN → HUMAN APPROVAL → OPERATION UPDATED</p>
      <a href="#contact">Pilot Aeros</a>
    </div>
    <div className="terrain" aria-hidden="true">
      <div className="terrain-lines">
        {Array.from({length:14}).map((_,i)=><i className={'ridge r'+i} key={i}/>)}
      </div>
      <div className="test-node n1"><span>01</span><b>EVENT</b></div>
      <div className="test-node n2"><span>02</span><b>IMPACT</b></div>
      <div className="test-node n3"><span>03</span><b>REPLAN</b></div>
      <div className="test-node n4"><span>04</span><b>APPLY</b></div>
      <div className="terrain-signal s1"/><div className="terrain-signal s2"/><div className="terrain-signal s3"/><div className="terrain-signal s4"/>
    </div>
  </section>

  <section className="a-security">
    <div className="security-head"><div><div className="a-kicker">[ TRUST + CONTROL ]</div><h2>Autonomy without losing command.</h2><p>Operators see the reasoning, lock constraints, approve changes, and retain a full audit trail.</p></div><a href="#contact">Talk to us</a></div>
    <div className="security-grid">
      <article><small>01</small><ShieldCheck size={22}/><h3>Human approval</h3><p>Start with recommendations. Automate only the workflows your team trusts.</p></article>
      <article><small>02</small><Route size={22}/><h3>Explainable tradeoffs</h3><p>See why Aeros moved a flight, swapped an aircraft, or held a departure.</p></article>
      <article><small>03</small><Radio size={22}/><h3>Live operating history</h3><p>Every change becomes part of the system of record for future decisions.</p></article>
    </div>
  </section>

  <section className="a-roadmap" id="roadmap">
    <div className="roadmap-head"><div className="a-kicker">[ FROM SOFTWARE TO NETWORK ]</div><h2>The flight operation is only the beginning.</h2><p>Once Aeros becomes the operating layer, the same system can coordinate the external services every aircraft needs.</p></div>
    <div className="roadmap-steps">
      {[
        ['NOW','OPS','Scheduling + recovery'],
        ['NEXT','SYSTEM OF RECORD','Dispatch + maintenance + training'],
        ['THEN','SERVICES','Fuel + FBO + hangar + maintenance'],
        ['LATER','PROCUREMENT','Route demand to the best capacity'],
        ['ENDGAME','NETWORK','Market + payments + operating intelligence']
      ].map((x,i)=><div className="roadmap-step" key={x[1]}><span>{x[0]}</span><b>{x[1]}</b><p>{x[2]}</p><i>{String(i+1).padStart(2,'0')}</i></div>)}
    </div>
  </section>

  <section className="a-network" id="network">
    <div className="network-copy">
      <div className="a-kicker">[ AEROS NETWORK ]</div>
      <h2>From running flights<br/>to routing the market.</h2>
      <p>If Aeros knows where aircraft are going, what they need, when they need it, and what capacity exists, the operating system can become the transaction network connecting the entire general-aviation ecosystem.</p>
      <div className="network-bullets"><span><Fuel size={14}/> Fuel + ground services</span><span><Wrench size={14}/> Maintenance capacity</span><span><Plane size={14}/> Aircraft demand</span><span><Route size={14}/> Market intelligence</span></div>
    </div>
    <NetworkScene/>
  </section>

  <section className="a-outcomes">
    <div className="outcome-intro"><div className="a-kicker">[ WHAT AEROS OPTIMIZES ]</div><h2>Not clicks. Operational outcomes.</h2></div>
    <div className="outcome-grid">
      <article><b>01</b><strong>MORE FLIGHT HOURS</strong><p>Recover capacity that would otherwise disappear into conflicts, cancellations, and idle aircraft.</p></article>
      <article><b>02</b><strong>FASTER RECOVERY</strong><p>Turn a 30-minute manual reshuffle into a reviewed operating plan in seconds.</p></article>
      <article><b>03</b><strong>BETTER UTILIZATION</strong><p>Coordinate aircraft, instructors, and demand as one constrained system.</p></article>
      <article><b>04</b><strong>ONE SOURCE OF TRUTH</strong><p>Replace fragmented schedule logic, texts, spreadsheets, and tribal knowledge with one live state.</p></article>
    </div>
  </section>

  <section className="a-faq">
    <div className="faq-grid-bg"/>
    <div className="faq-inner">
      <h2>FAQ</h2>
      <div className="faq-list">
        {faq.map((f,i)=><div className={'faq-row '+(open===i?'open':'')} key={f[0]}>
          <button onClick={()=>setOpen(open===i?null:i)}><span>{f[0]}</span><ChevronDown size={14}/></button>
          {open===i&&<p>{f[1]}</p>}
        </div>)}
      </div>
    </div>
  </section>

  <section className="a-closing" id="contact">
    <div className="closing-copy">
      <div className="a-kicker">[ DESIGN PARTNERS ]</div>
      <h2>Give Aeros one messy operation.<br/>Let it start running the day.</h2>
      <p>We are starting with flight schools and operators that already feel the pain of manual schedule recovery and fragmented daily operations.</p>
      <div><a className="btn-outline-light" href="#contact">Contact us</a><a className="btn-green" href="#contact">Become a design partner</a></div>
    </div>
    <div className="orbit">
      <div className="orbit-ring ring-a"/><div className="orbit-ring ring-b"/>
      <div className="orbit-core"><div className="mini-ops"><span>OPERATION RECOVERED</span><b>8 conflicts resolved</b><i/><i/><i/></div></div>
      <span className="orb o1"><Plane size={13}/></span><span className="orb o2"><Wrench size={13}/></span><span className="orb o3"><Users size={13}/></span><span className="orb o4"><Fuel size={13}/></span>
    </div>
  </section>

  <footer className="a-footer">
    <div className="footer-brand"><div className="big-logo">A</div><strong>AEROS</strong><p>The AI-native operating system for general aviation.</p></div>
    <div className="footer-cols">
      <div><b>PRODUCT</b><a href="#operations">Ops</a><a>Schedule</a><a>Dispatch</a><a>Maintain</a><a>Train</a></div>
      <div><b>NETWORK</b><a href="#network">Services</a><a>FBOs</a><a>Fuel</a><a>Maintenance</a><a>Payments</a></div>
      <div><b>COMPANY</b><a href="#roadmap">Roadmap</a><a href="#contact">Design partners</a><a>About</a><a>Careers</a></div>
      <div><b>BUILDING TOWARD</b><span>Operate</span><span>Coordinate</span><span>Procure</span><span>Route</span><span>Transact</span></div>
    </div>
    <div className="footer-blocks">{Array.from({length:22}).map((_,i)=><i key={i} className={i%4===0?'hot':''}>{i%3===0?'✈':'◇'}</i>)}</div>
  </footer>
 </div>;
}