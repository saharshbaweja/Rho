'use client';
import {useEffect,useMemo,useState} from 'react';
import {Plane,CloudRain,Users,Wrench,Fuel,Clock3,Route,Radio,ShieldCheck,ArrowUpRight,Check,RefreshCcw,MapPin,Activity,ChevronDown} from 'lucide-react';

const disruptions=[
  {
    type:'AIRCRAFT',
    title:'N172GT grounded',
    body:'Oil pressure squawk detected before the 10:30 departure.',
    impact:'3 flights impacted',
    action:'Moved two students, reassigned one aircraft, preserved all lesson prerequisites.'
  },
  {
    type:'WEATHER',
    title:'VFR window closes at 14:20',
    body:'Ceilings deteriorate across the afternoon training block.',
    impact:'8 flights at risk',
    action:'Pulled six flights forward and protected two instrument lessons.'
  },
  {
    type:'CREW',
    title:'CFI unavailable',
    body:'Instructor removed from the operation with four assigned students.',
    impact:'4 lessons impacted',
    action:'Matched qualified instructors while preserving aircraft and curriculum constraints.'
  }
];

const schedule=[
  ['08:00','N551SP','Emily / Alex','IFR 4','READY'],
  ['09:30','N183GT','Chris / Maya','Stage 2 XC','READY'],
  ['10:30','N172GT','Jordan / Sam','Pattern','REPLAN'],
  ['12:00','N882SP','Noah / Maya','Checkride Prep','READY'],
  ['13:30','N441CF','Ava / Chris','Stage Check','WEATHER']
];

const faqs=[
  ['What does Aeros actually do?','Aeros keeps a live model of the operation and continuously coordinates aircraft, instructors, students, maintenance, weather, and schedule constraints. When reality changes, it proposes the best recovery plan.'],
  ['What do we replace first?','Not your entire system. Aeros starts with scheduling and disruption recovery beside the software you already use. Once operators trust it, Aeros can expand into dispatch, maintenance, training records, billing, and external services.'],
  ['Why is this different from a scheduler?','A scheduler stores reservations. Aeros reasons about the operation. It knows what each flight requires, what resources are available, what is changing, and what downstream conflicts a decision creates.'],
  ['Who is the first customer?','Flight schools, university aviation programs, charter operators, and other general-aviation teams that run enough aircraft and people for daily schedule changes to become expensive.'],
  ['Where does Aeros go long term?','The operating system becomes a network. If Aeros knows where aircraft are going and what they need, it can coordinate FBOs, maintenance, fuel, hangars, services, payments, procurement, and market intelligence.']
];

function StatusPill({children,tone='ok'}){return <span className={'status-pill '+tone}>{children}</span>}

function LiveOperation({active,setActive}){
  const d=disruptions[active];
  return <div className="ops-console">
    <div className="console-top">
      <div><span className="live-dot"/> LIVE OPERATION</div>
      <span>PDK · ATLANTA</span>
      <span>08:42:19</span>
    </div>
    <div className="console-body">
      <div className="airspace-panel">
        <div className="airspace-grid"/>
        <div className="weather-cell w1"/><div className="weather-cell w2"/>
        <div className="route-line rl1"/><div className="route-line rl2"/>
        {[
          ['N551SP','p1'],['N183GT','p2'],['N172GT','p3'],['N882SP','p4']
        ].map(([n,c])=><div className={'aircraft '+c} key={n}><Plane size={15}/><b>{n}</b></div>)}
        <div className="ops-event">
          <small>{d.type}</small>
          <h3>{d.title}</h3>
          <p>{d.body}</p>
          <div className="event-impact">{d.impact}</div>
          <div className="event-action"><RefreshCcw size={13}/><span>{d.action}</span></div>
        </div>
      </div>
      <div className="ops-sidebar">
        <div className="sidebar-title">Aeros recovery</div>
        <div className="recovery-score"><span>PLAN CONFIDENCE</span><strong>94%</strong></div>
        <div className="recovery-list">
          <div><Check size={12}/><span>Resource conflicts resolved</span></div>
          <div><Check size={12}/><span>Maintenance constraints preserved</span></div>
          <div><Check size={12}/><span>Training sequence preserved</span></div>
          <div><Check size={12}/><span>Operator approval required</span></div>
        </div>
        <button className="apply-btn">Review new plan</button>
      </div>
    </div>
    <div className="scenario-tabs">
      {disruptions.map((x,i)=><button onClick={()=>setActive(i)} className={active===i?'active':''} key={x.type}><span>0{i+1}</span>{x.type}</button>)}
    </div>
  </div>
}

function Timeline(){
 return <div className="timeline-board">
  <div className="timeline-head"><span>TODAY</span><b>LIVE SCHEDULE</b><StatusPill>176 ACTIVE</StatusPill></div>
  <div className="timeline-ruler">{['08','09','10','11','12','13','14','15'].map(x=><span key={x}>{x}:00</span>)}</div>
  <div className="timeline-rows">
    {schedule.map((r,i)=><div className="timeline-row" key={r[0]}>
      <div className="flight-meta"><b>{r[1]}</b><span>{r[2]}</span></div>
      <div className="flight-bar" style={{'--left':(i*8+5)+'%','--width':(20+(i%2)*7)+'%'}}>
        <span>{r[3]}</span>
        <StatusPill tone={r[4]==='READY'?'ok':r[4]==='REPLAN'?'warn':'weather'}>{r[4]}</StatusPill>
      </div>
    </div>)}
  </div>
  <div className="timeline-action"><Activity size={14}/><span>Aeros found 6 hours of recoverable capacity in today's schedule.</span><button>View decisions</button></div>
 </div>
}

function ConstraintGraph(){
 const nodes=[
  ['Aircraft',Plane,'n1'],['Crew',Users,'n2'],['Weather',CloudRain,'n3'],['Maintenance',Wrench,'n4'],['Training',Route,'n5'],['Time',Clock3,'n6']
 ];
 return <div className="constraint-graph">
   <svg viewBox="0 0 700 440" aria-hidden="true">
    <line x1="350" y1="220" x2="115" y2="98"/><line x1="350" y1="220" x2="585" y2="100"/>
    <line x1="350" y1="220" x2="100" y2="338"/><line x1="350" y1="220" x2="600" y2="338"/>
    <line x1="350" y1="220" x2="350" y2="50"/><line x1="350" y1="220" x2="350" y2="392"/>
   </svg>
   <div className="graph-core"><span>A</span><b>OPERATING PLAN</b><small>LIVE STATE</small></div>
   {nodes.map(([t,I,c],i)=><div className={'graph-node '+c} key={t}><I size={14}/><b>{t}</b><span>{i%2===0?'INPUT':'CONSTRAINT'}</span></div>)}
   {Array.from({length:6}).map((_,i)=><i className={'graph-pulse gp'+i} key={i}/>)}
 </div>
}

function NetworkMap(){
 return <div className="network-map">
   <div className="network-map-bg"/>
   <div className="network-center"><span>AEROS</span><b>NETWORK</b></div>
   {[
    ['OPERATORS','nm1'],['FBOs','nm2'],['FUEL','nm3'],['MAINTENANCE','nm4'],['HANGARS','nm5'],['PAYMENTS','nm6']
   ].map(([t,c])=><div className={'network-card '+c} key={t}><i/><b>{t}</b><small>CONNECTED CAPACITY</small></div>)}
   {Array.from({length:8}).map((_,i)=><span className={'network-beacon nb'+i} key={i}/>)}
 </div>
}

export default function Home(){
 const [active,setActive]=useState(0);
 const [open,setOpen]=useState(null);
 useEffect(()=>{const t=setInterval(()=>setActive(v=>(v+1)%disruptions.length),5200);return()=>clearInterval(t)},[]);
 const metrics=useMemo(()=>[
  ['24','aircraft modeled'],['37','instructors connected'],['183','flights today'],['11','constraints live']
 ],[]);
 return <div className="site">

  <section className="hero">
    <div className="hero-copy">
      <div className="eyebrow">GENERAL AVIATION / LIVE OPERATIONS</div>
      <h1>The operating system<br/>for every flight.</h1>
      <p>Aeros turns a static schedule into a live operating plan. It understands the aircraft, people, maintenance, weather, and training rules behind every flight — and continuously decides what should happen next.</p>
      <div className="hero-actions"><a href="#contact" className="primary">Become a design partner <ArrowUpRight size={14}/></a><a href="#platform" className="secondary">See the platform</a></div>
      <div className="hero-note">Starting with scheduling + disruption recovery.</div>
    </div>
    <div className="hero-visual"><LiveOperation active={active} setActive={setActive}/></div>
    <div className="hero-metrics">{metrics.map(([n,l])=><div key={l}><strong>{n}</strong><span>{l}</span></div>)}</div>
  </section>

  <section className="manifesto">
    <span className="section-number">01</span>
    <div>
      <div className="eyebrow">THE PROBLEM</div>
      <h2>Aviation software knows what was scheduled.<br/><em>It does not know what should happen now.</em></h2>
    </div>
    <p>Every day changes: aircraft go down, weather moves in, instructors call out, students cancel, maintenance comes due. Operators still rebuild the day manually across calendars, calls, texts, whiteboards, and spreadsheets.</p>
  </section>

  <section className="platform" id="platform">
    <div className="section-head">
      <div><span className="section-number">02</span><div className="eyebrow">AEROS OPS</div><h2>One live model of the operation.</h2></div>
      <p>Aeros connects the resources and constraints behind every flight so the software can reason about the whole operation instead of storing isolated records.</p>
    </div>
    <ConstraintGraph/>
    <div className="principles">
      {[
        ['UNDERSTAND','Build a live operating state from aircraft, crew, training, maintenance, weather, availability, and rules.'],
        ['DECIDE','Continuously score utilization, conflicts, deadlines, training progression, and downstream impact.'],
        ['ACT','Propose a new plan when reality changes, explain the tradeoffs, and let the operator approve it.']
      ].map((x,i)=><article key={x[0]}><span>0{i+1}</span><h3>{x[0]}</h3><p>{x[1]}</p></article>)}
    </div>
  </section>

  <section className="recovery" id="recovery">
    <div className="recovery-copy">
      <span className="section-number light">03</span>
      <div className="eyebrow light">CONTINUOUS RECOVERY</div>
      <h2>The moment the day breaks,<br/>Aeros starts rebuilding it.</h2>
      <p>Instead of waiting for a scheduler to manually untangle every downstream conflict, Aeros computes the impact and generates a new operating plan in seconds.</p>
      <div className="recovery-chain">
        {['EVENT','IMPACT','OPTIONS','PLAN','APPROVAL','UPDATE'].map((x,i)=><div key={x}><span>0{i+1}</span><b>{x}</b></div>)}
      </div>
    </div>
    <div className="recovery-machine">
      <div className="machine-ring mr1"/><div className="machine-ring mr2"/><div className="machine-ring mr3"/>
      <div className="machine-core"><RefreshCcw size={28}/><b>REPLAN</b><span>6 conflicts</span></div>
      <div className="machine-card mc1"><Plane size={14}/><b>N172GT</b><span>GROUND</span></div>
      <div className="machine-card mc2"><Users size={14}/><b>4 CFI</b><span>AVAILABLE</span></div>
      <div className="machine-card mc3"><CloudRain size={14}/><b>14:20</b><span>WX LIMIT</span></div>
      <div className="machine-card mc4"><Wrench size={14}/><b>7.2 HRS</b><span>TO INSPECTION</span></div>
      {Array.from({length:6}).map((_,i)=><i className={'machine-signal ms'+i} key={i}/>)}
    </div>
  </section>

  <section className="schedule-section">
    <div className="section-head">
      <div><span className="section-number">04</span><div className="eyebrow">LIVE SCHEDULING</div><h2>Not a calendar.<br/>A control surface.</h2></div>
      <p>Scheduling is where Aeros enters the operation. The product continuously coordinates demand, availability, aircraft, instructors, lessons, maintenance, and weather.</p>
    </div>
    <Timeline/>
  </section>

  <section className="modules">
    <div className="section-head compact">
      <div><span className="section-number">05</span><div className="eyebrow">THE OPERATING SYSTEM</div><h2>Scheduling is the wedge.<br/>The operation is the product.</h2></div>
    </div>
    <div className="module-grid">
      {[
        ['SCHEDULE',Clock3,'Who flies what, with whom, and when.'],
        ['DISPATCH',Plane,'Flight readiness, crew legality, aircraft status, weather, approvals.'],
        ['MAINTAIN',Wrench,'Squawks, inspections, downtime, parts, utilization, aircraft availability.'],
        ['TRAIN',Route,'Student progression, lesson requirements, stage checks, completion.'],
        ['CREW',Users,'Availability, qualifications, assignments, workload, duty constraints.'],
        ['SERVICES',Fuel,'Fuel, parking, hangar, ground support, catering, and external services.']
      ].map(([t,I,d],i)=><article key={t}>
        <div className="module-icon"><I size={21}/><i/><i/></div>
        <span>0{i+1}</span><h3>{t}</h3><p>{d}</p>
      </article>)}
    </div>
  </section>

  <section className="trust">
    <div>
      <span className="section-number">06</span>
      <div className="eyebrow">HUMAN-IN-THE-LOOP</div>
      <h2>Autonomy that earns trust.</h2>
      <p>Aeros starts by recommending. Operators can lock constraints, inspect the reasoning, approve changes, and maintain a complete operating history.</p>
    </div>
    <div className="trust-cards">
      <article><ShieldCheck size={22}/><h3>Approval boundaries</h3><p>Decide which actions Aeros may suggest, require approval for, or eventually automate.</p></article>
      <article><Activity size={22}/><h3>Explainable decisions</h3><p>See what changed, which flights were affected, and why the new plan was selected.</p></article>
      <article><Radio size={22}/><h3>Operating memory</h3><p>Every decision becomes context for future scheduling, recovery, and capacity planning.</p></article>
    </div>
  </section>

  <section className="vision" id="vision">
    <div className="vision-intro">
      <span className="section-number light">07</span>
      <div className="eyebrow light">THE LONG ARC</div>
      <h2>Own the operating layer.<br/>Then connect the market.</h2>
      <p>If Aeros becomes the system that knows where aircraft are going, what they need, and what capacity exists, it can coordinate the external market around every flight.</p>
    </div>
    <div className="vision-rail">
      {[
        ['NOW','OPS','Schedule + recover the day'],
        ['01','SYSTEM','Dispatch + maintain + train'],
        ['02','SERVICES','Fuel + FBO + hangar + maintenance'],
        ['03','PROCUREMENT','Route demand to available capacity'],
        ['04','NETWORK','Payments + market intelligence + transactions']
      ].map(x=><div key={x[1]}><span>{x[0]}</span><b>{x[1]}</b><p>{x[2]}</p></div>)}
    </div>
  </section>

  <section className="network" id="network">
    <div className="network-copy">
      <span className="section-number">08</span>
      <div className="eyebrow">AEROS NETWORK</div>
      <h2>The operating network<br/>for general aviation.</h2>
      <p>The end state is larger than SaaS. Operators create demand. Service providers create capacity. Aeros sits between them with live operational context, routing, pricing, procurement, and eventually settlement.</p>
      <div className="network-list"><span><MapPin size={14}/> Know where demand is forming</span><span><Fuel size={14}/> Match services to aircraft</span><span><Wrench size={14}/> Surface maintenance capacity</span><span><Route size={14}/> Build real market intelligence</span></div>
    </div>
    <NetworkMap/>
  </section>

  <section className="northstar">
    <div><span className="section-number">09</span><div className="eyebrow">THE NORTH STAR</div><h2>More flying.<br/>Less coordination.</h2></div>
    <div className="northstar-grid">
      {[
        ['UTILIZATION','Keep aircraft and instructors productive.'],
        ['RECOVERY','Turn disruptions into a new operating plan quickly.'],
        ['THROUGHPUT','Move more students and flights through the same physical resources.'],
        ['CLARITY','Give the entire operation one shared live state.']
      ].map((x,i)=><article key={x[0]}><span>0{i+1}</span><h3>{x[0]}</h3><p>{x[1]}</p></article>)}
    </div>
  </section>

  <section className="faq">
    <div className="faq-head"><span className="section-number">10</span><div><div className="eyebrow">FAQ</div><h2>What Aeros is — and isn't.</h2></div></div>
    <div className="faq-list">
      {faqs.map((f,i)=><div className={'faq-item '+(open===i?'open':'')} key={f[0]}><button onClick={()=>setOpen(open===i?null:i)}><span>{f[0]}</span><ChevronDown size={16}/></button>{open===i&&<p>{f[1]}</p>}</div>)}
    </div>
  </section>

  <section className="contact" id="contact">
    <div className="contact-copy">
      <div className="eyebrow light">DESIGN PARTNERS</div>
      <h2>Bring us the messiest<br/>part of your operation.</h2>
      <p>We're starting with operators that already feel the pain of manual scheduling, aircraft downtime, instructor conflicts, weather recovery, and fragmented daily coordination.</p>
      <a className="contact-button" href="#contact">Talk to Aeros <ArrowUpRight size={15}/></a>
    </div>
    <div className="contact-visual">
      <div className="flight-card fc1"><span>ARRIVAL</span><b>N551SP</b><small>08:52</small></div>
      <div className="flight-card fc2"><span>MAINT</span><b>N172GT</b><small>HOLD</small></div>
      <div className="flight-card fc3"><span>CREW</span><b>CFI 14</b><small>READY</small></div>
      <div className="flight-card fc4"><span>WEATHER</span><b>VFR</b><small>UNTIL 14:20</small></div>
      <div className="contact-core"><Plane size={28}/><b>AEROS</b><span>OPERATION ACTIVE</span></div>
      <div className="contact-orbit co1"/><div className="contact-orbit co2"/>
    </div>
  </section>

  <footer className="footer">
    <div className="footer-brand"><span className="brand-icon large"><Plane size={22}/></span><b>AEROS</b><p>The operating system for general aviation.</p></div>
    <div className="footer-cols">
      <div><strong>PLATFORM</strong><a href="#platform">Ops</a><a href="#recovery">Recovery</a><a>Schedule</a><a>Dispatch</a><a>Maintain</a></div>
      <div><strong>NETWORK</strong><a href="#network">Services</a><a>FBOs</a><a>Fuel</a><a>Maintenance</a><a>Payments</a></div>
      <div><strong>COMPANY</strong><a href="#vision">Vision</a><a href="#contact">Design partners</a><a>About</a><a>Careers</a></div>
    </div>
    <div className="footer-line"><span>OPERATE → COORDINATE → ROUTE → TRANSACT</span><span>© 2026 AEROS</span></div>
  </footer>
 </div>
}