'use client';
import {useState} from 'react';
import Link from 'next/link';
import {ArrowUpRight,Plane,CloudRain,Wrench,Users,Route,BarChart3,CheckCircle2,MapPin,ShieldCheck,ChevronRight,CalendarDays,Radio,Command,Clock3,Fuel,GraduationCap,Building2} from 'lucide-react';

const demoViews={
  operations:{label:'Operations',title:'Today',metrics:[['Flights','12'],['Aircraft in service','8 / 10'],['Live service','6'],['On time','94%']],rows:[['07:30','AER101','KAVL → KCLT','N905CR','Departed'],['09:15','FS0202','KAVL → KJFK','N712AS','Boarding'],['10:30','TNG301','KAVL → KGSP','N458CD','In progress'],['12:00','CHAR77','KCLT → KPBI','N905CR','Scheduled'],['14:20','TNG304','KAVL → KCHA','N287MA','Scheduled']]},
  schedule:{label:'Schedule',title:'Schedule recovery',metrics:[['Conflicts','6'],['Recovered','5'],['At risk','1'],['Utilization','81%']],rows:[['10:30','TNG301','Aircraft issue','N172GT','Replan'],['11:10','TNG301','Swap aircraft','N441CF','Suggested'],['12:00','FS0202','Crew conflict','Maya / Chris','Resolved'],['13:20','TNG304','Weather window','Move earlier','Suggested'],['15:10','CHAR77','Maintenance','Preserve','Ready']]},
  fleet:{label:'Aircraft',title:'Fleet status',metrics:[['Available','8'],['In flight','2'],['Due soon','2'],['Grounded','1']],rows:[['N905CR','Citation CJ3','78% utilization','142.6 hrs','Available'],['N712AS','Cirrus SR22','62% utilization','98.4 hrs','In flight'],['N456CD','Cessna 172S','71% utilization','86.1 hrs','Available'],['N287MA','Piper Archer','54% utilization','112.8 hrs','Due soon'],['N172GT','Cessna 172S','Oil pressure squawk','—','Grounded']]},
  maintenance:{label:'Maintenance',title:'Maintenance control',metrics:[['Open squawks','5'],['Due soon','2'],['Overdue','1'],['Avg downtime','1.8d']],rows:[['N456CD','100-hr inspection','Due in 8 days','Jul 31','Due soon'],['N905CR','Annual inspection','Due in 24 days','Aug 16','Ready'],['N712AS','ELT battery','Overdue by 3 days','Jul 21','Overdue'],['N287MA','Transponder check','Due in 12 days','Aug 4','Ready'],['N172GT','Oil pressure squawk','Grounded','Now','Critical']]}
};

function DashboardDemo(){
 const [view,setView]=useState('operations');
 const [selected,setSelected]=useState(2);
 const [aiOpen,setAiOpen]=useState(true);
 const v=demoViews[view];
 return <div className="mac-stage">
   <div className="float-card fc-status"><span>●</span><div><small>AIRCRAFT STATUS</small><b>8 / 10 ready</b></div></div>
   <div className="float-card fc-maint"><Wrench size={14}/><div><small>MAINTENANCE ALERT</small><b>N172GT · inspection due</b></div></div>
   <div className="float-card fc-crew"><Users size={14}/><div><small>CREW READY</small><b>2 qualified for KAVL → KTEB</b></div></div>
   <div className="macbook">
    <div className="mac-screen">
      <div className="dash-top"><div className="dash-brand"><Plane size={14}/><b>AEROS</b></div><div className="dash-search">Search flights, tail numbers, people...</div><div className="dash-weather">☀ KAVL · 72°F · VFR</div><div className="dash-avatar">JD</div></div>
      <div className="dash-layout">
        <aside className="dash-sidebar">
          {[["operations",Command,'Operations'],['schedule',CalendarDays,'Schedule'],['fleet',Plane,'Aircraft'],['maintenance',Wrench,'Maintenance']].map(([k,I,t])=><button key={k} onClick={()=>setView(k)} className={view===k?'active':''}><I size={14}/>{t}</button>)}
          <button><Users size={14}/>Crew</button><button><GraduationCap size={14}/>Students</button><button><Fuel size={14}/>Billing</button><button><BarChart3 size={14}/>Reports</button>
        </aside>
        <section className="dash-main">
          <div className="dash-title"><div><small>{v.label.toUpperCase()}</small><h3>{v.title}</h3></div><button className="new-flight">+ New flight</button></div>
          <div className="dash-metrics">{v.metrics.map(([l,n])=><div key={l}><small>{l}</small><b>{n}</b></div>)}</div>
          <div className="dash-grid-main">
            <div className="flight-table">
              <div className="table-head"><b>{view==='operations'?'Today’s flights':v.title}</b><span>Live</span></div>
              {v.rows.map((r,i)=><button key={i} onClick={()=>setSelected(i)} className={selected===i?'selected':''}><span>{r[0]}</span><b>{r[1]}</b><span>{r[2]}</span><span>{r[3]}</span><i>{r[4]}</i></button>)}
            </div>
            <div className="weather-card"><div className="weather-head"><b>Weather & NOTAMs</b><span>3 active</span></div><div className="map-surface"><div className="route-path"/><span className="airport ap1">KAVL</span><span className="airport ap2">KCLT</span><span className="airport ap3">KGSP</span><Plane className="map-plane" size={20}/></div></div>
          </div>
          <div className="mini-panels"><div><b>Aircraft</b><span>N905CR · Available</span><span>N712AS · In flight</span></div><div><b>Maintenance</b><span>N456CD · 100-hr inspection</span><span>N172GT · Grounded</span></div><div><b>Students</b><span>Emma Wilson · Ready</span><span>Liam Chen · Checkride</span></div></div>
          {aiOpen&&<div className="ai-recommend"><span className="ai-mark">A</span><div><small>AEROS ACTION</small><b>Recover 3 flights affected by N172GT.</b><p>Move two lessons to N441CF and shift one lesson 40 minutes while preserving prerequisites.</p></div><button onClick={()=>setAiOpen(false)}>Apply plan</button></div>}
        </section>
      </div>
    </div>
    <div className="mac-base"/>
   </div>
  </div>
}

function FeatureDemo(){
 const [step,setStep]=useState(0);
 const steps=[
  ['Plan & schedule',CalendarDays,'Assign aircraft, instructors, students, and constraints in one live schedule.'],
  ['Operate',Radio,'See flights, weather, NOTAMs, crew readiness, and live service status.'],
  ['Maintain',Wrench,'Track inspections, squawks, downtime, and aircraft availability in the operating plan.'],
  ['Analyze & grow',BarChart3,'Measure utilization, throughput, cancellations, and operational performance.']
 ];
 const [t,I,d]=steps[step];
 return <div className="flow-demo"><div className="flow-tabs">{steps.map((s,i)=><button key={s[0]} className={step===i?'active':''} onClick={()=>setStep(i)}><span>{i+1}</span>{s[0]}</button>)}</div><div className="flow-stage"><div className="flow-copy"><I size={24}/><h3>{t}</h3><p>{d}</p></div><div className={'flow-visual f'+step}><span className="fv-plane"><Plane size={24}/></span><span className="fv-card one">Aircraft N905CR</span><span className="fv-card two">Crew qualified</span><span className="fv-card three">Weather VFR</span><span className="fv-card four">Aeros ready</span></div></div></div>
}

export default function Home(){return <div className="hexish-site aeros-v2">
  <section className="home-hero product-first-hero">
    <div className="hero-glow glow-one"/><div className="hero-glow glow-two"/>
    <div className="home-hero-inner hero-two-col">
      <div className="hero-copy-block">
        <div className="eyebrow">OPERATIONS · SAFETY · PEOPLE · PROFITABILITY</div>
        <h1>Run aviation<br/><em>operations</em><br/>in one system.</h1>
        <p>Aeros is the AI operations platform for flight schools, charter operators, FBOs, and aviation teams. Schedule flights, manage aircraft, coordinate crew, track maintenance, and let AI help recover the day when reality changes.</p>
        <div className="hero-ctas"><Link href="/signup/" className="primary-cta dark-cta">Get started for free <ArrowUpRight size={13}/></Link><Link href="/contact/" className="ghost-box">Request a demo</Link></div>
        <div className="hero-audiences"><span><MapPin size={13}/> FBOs & airports</span><span><GraduationCap size={13}/> Flight schools</span><span><Plane size={13}/> Charter operators</span><span><Building2 size={13}/> Corporate flight departments</span></div>
      </div>
      <DashboardDemo/>
    </div>
  </section>

  <section className="industry-section section-pad">
    <div className="section-head-inline"><div><div className="eyebrow">BUILT FOR EVERY AVIATION OPERATION</div><h2>Powering a more connected aviation industry.</h2></div><p>From day-to-day operations to long-term growth, Aeros helps aviation teams work smarter, safer, and more profitably.</p></div>
    <div className="industry-grid">{[
      [MapPin,'FBOs & Airports','Manage line service, fuel, hangar, customer billing, and ramp operations.'],
      [GraduationCap,'Flight Schools','Schedule aircraft and instructors, track training progress, and simplify student management.'],
      [Plane,'Charter Operators','Coordinate fleets, crew, passenger services, and real-time operational visibility.'],
      [Building2,'Corporate Flight Departments','Streamline scheduling, compliance, maintenance, and trip coordination.']
    ].map(([I,t,d],i)=><Link href="/solutions/" className={'industry-card ic'+i} key={t}><div className="industry-art"><I size={34}/><span/><span/></div><div className="industry-title"><I size={15}/><h3>{t}</h3></div><p>{d}</p><b>Learn more →</b></Link>)}</div>
  </section>

  <section className="how-section section-pad">
    <div className="how-copy"><div className="eyebrow">HOW IT WORKS</div><h2>From plan to wheels up,<br/>Aeros keeps you ahead.</h2><p>A unified workflow for your people, aircraft, customers, and daily operation.</p><Link href="/dashboard/" className="primary-cta dark-cta">See the product in action <ArrowUpRight size={13}/></Link></div>
    <FeatureDemo/>
  </section>

  <section className="platform-list section-pad">
    <div className="platform-intro"><div className="eyebrow">ALL-IN-ONE PLATFORM</div><h2>Everything your aviation operation needs.</h2><p>Purpose-built for aviation. Flexible for how you operate.</p><Link href="/product/" className="primary-cta dark-cta">Explore all features <ArrowUpRight size={13}/></Link></div>
    <div className="platform-links">{[
      [CalendarDays,'Flight Operations','Scheduling, dispatch, flight following'],[Plane,'Aircraft Management','Availability, utilization, documents'],[Wrench,'Maintenance','Tracking, inspections, compliance'],[Users,'Crew Management','Currency, qualifications, scheduling'],[GraduationCap,'Training & Checkrides','Student progress, instructor tools'],[Fuel,'Line Service & Fuel','Tasks, inventory, billing'],[CloudRain,'Weather & NOTAMs','Real-time conditions and alerts'],[BarChart3,'Reporting & Analytics','Operations, revenue, utilization'],[Command,'Customer Management','Pilots, clients, billing, communications']
    ].map(([I,t,d])=><Link href="/product/" key={t}><I size={18}/><div><b>{t}</b><span>{d}</span></div><ChevronRight size={14}/></Link>)}</div>
  </section>

  <section className="ai-ops-section section-pad">
    <div className="ai-ops-copy"><div className="eyebrow">AEROS AI</div><h2>Software that doesn’t just record the operation. It helps run it.</h2><p>Aeros watches the live operating context across schedule, aircraft, crew, weather, training, and maintenance. When something changes, it can surface impact, generate options, and prepare the next plan for human approval.</p><div className="ai-bullets"><span><CheckCircle2 size={15}/> Detect operational conflicts early</span><span><CheckCircle2 size={15}/> Explain downstream impact</span><span><CheckCircle2 size={15}/> Generate recovery options</span><span><CheckCircle2 size={15}/> Keep humans in control</span></div></div>
    <div className="ai-sequence"><div className="ai-event"><b>EVENT</b><span>N172GT grounded</span></div><div className="ai-arrow">→</div><div className="ai-event"><b>IMPACT</b><span>3 lessons affected</span></div><div className="ai-arrow">→</div><div className="ai-event active"><b>AEROS</b><span>Recovery plan ready</span></div><div className="ai-arrow">→</div><div className="ai-event"><b>APPROVE</b><span>Operator reviews changes</span></div></div>
  </section>

  <section className="enterprise-showcase section-pad">
    <div><div className="eyebrow">ENTERPRISE</div><h2>Built for complex operations.</h2><p>Multi-base operations, custom workflows, SSO, role-based controls, audit history, dedicated implementation, and the flexibility to scale across teams.</p><div className="enterprise-points"><span><ShieldCheck size={15}/> Multi-location support</span><span><ShieldCheck size={15}/> Custom integrations</span><span><ShieldCheck size={15}/> Dedicated success team</span></div><Link href="/enterprise/" className="primary-cta dark-cta">Talk to our enterprise team <ArrowUpRight size={13}/></Link></div>
    <div className="enterprise-visual"><div className="ev-map"><span className="hub h1">ATL</span><span className="hub h2">AVL</span><span className="hub h3">CLT</span><span className="hub h4">TEB</span><i/><i/><i/></div></div>
  </section>

  <section className="pricing-preview section-pad"><div><div className="eyebrow">PRICING</div><h2>Simple plans that grow with your operation.</h2><p>Start small, prove the workflow, and expand as Aeros becomes part of the operation.</p></div><div className="price-cards"><article><small>STARTER</small><h3>Pilot</h3><p>For small teams evaluating Aeros.</p><Link href="/signup/">Get started →</Link></article><article className="featured"><small>PROFESSIONAL</small><h3>Custom</h3><p>For growing flight operations.</p><Link href="/contact/">Talk to us →</Link></article><article><small>ENTERPRISE</small><h3>Custom</h3><p>For complex multi-team operations.</p><Link href="/enterprise/">Contact sales →</Link></article></div></section>

  <section className="final-cta runway-cta section-pad"><div><div className="eyebrow">READY FOR TAKEOFF?</div><h2>Get started with Aeros today.</h2><p>Join aviation teams building a more intelligent operating layer.</p></div><div className="cta-pair"><Link href="/signup/" className="primary-cta dark-cta">Create your account <ArrowUpRight size={13}/></Link><Link href="/contact/" className="ghost-box">Request a demo</Link></div></section>
 </div>;
}