'use client';
import {useMemo,useState} from 'react';
import Link from 'next/link';
import {ArrowUpRight,Plane,CloudRain,Wrench,Users,CalendarDays,Radio,BarChart3,ShieldCheck,MapPin,GraduationCap,Building2,Command,CheckCircle2,ChevronRight,Fuel,Clock3,Route} from 'lucide-react';

const scenarios={
  normal:{title:'Today’s operation',tag:'LIVE',note:'12 flights · 8 aircraft · 94% on time',rows:[['07:30','AER101','KAVL → KCLT','N905CR','Departed'],['09:15','FS0202','KAVL → KJFK','N712AS','Boarding'],['10:30','TNG301','KAVL → KGSP','N458CD','In progress'],['12:00','CHAR77','KCLT → KPBI','N905CR','Scheduled'],['14:20','TNG304','KAVL → KCHA','N287MA','Scheduled']]},
  aircraft:{title:'Aircraft disruption',tag:'AI RECOVERY',note:'N172GT grounded · 3 flights impacted',rows:[['10:30','TNG301','Aircraft unavailable','N172GT','At risk'],['11:10','TNG301','Swap aircraft','N441CF','Suggested'],['12:00','FS0202','Preserve crew','Maya / Chris','Ready'],['13:20','TNG304','Shift 40 minutes','N882SP','Suggested'],['15:10','CHAR77','No impact','N905CR','Ready']]},
  weather:{title:'Weather recovery',tag:'AI RECOVERY',note:'VFR window closes 14:20 · 8 flights checked',rows:[['09:15','FS0202','Move earlier','N712AS','Suggested'],['10:30','TNG301','Keep slot','N458CD','Ready'],['12:00','CHAR77','IFR capable','N905CR','Ready'],['13:20','TNG304','Move earlier','N287MA','Suggested'],['15:10','FS0220','Hold until VFR','N441CF','At risk']]}
};

function MacCommandCenter(){
  const [mode,setMode]=useState('normal');
  const [selected,setSelected]=useState(2);
  const s=scenarios[mode];
  const metrics=useMemo(()=>mode==='normal'?[['Flights','12'],['Aircraft ready','8 / 10'],['On time','94%'],['Utilization','81%']]:mode==='aircraft'?[['Impacted','3'],['Recovered','3'],['Aircraft swap','1'],['Conflicts checked','6']]:[['Impacted','8'],['Moved earlier','3'],['IFR preserved','2'],['At risk','1']],[mode]);
  return <div className="hv-mac-stage">
    <div className="hv-float hv-float-a"><span>AI</span><div><small>AEROS ACTION</small><b>{mode==='normal'?'Operation healthy':mode==='aircraft'?'Recovery plan ready':'Weather plan ready'}</b></div></div>
    <div className="hv-float hv-float-b"><Wrench size={14}/><div><small>MAINTENANCE</small><b>N172GT · grounded</b></div></div>
    <div className="hv-float hv-float-c"><CloudRain size={14}/><div><small>WEATHER</small><b>KAVL · VFR until 14:20</b></div></div>
    <div className="hv-macbook">
      <div className="hv-screen">
        <div className="hv-topbar"><div className="hv-appbrand"><Plane size={14}/><b>AEROS</b></div><div className="hv-search">Search flights, aircraft, people, actions...</div><div className="hv-weather">☀ KAVL · 72°F · VFR</div><div className="hv-avatar">SB</div></div>
        <div className="hv-app">
          <aside className="hv-sidebar"><button className="active"><Command size={14}/>Command Center</button><button><CalendarDays size={14}/>Schedule</button><button><Plane size={14}/>Aircraft</button><button><Users size={14}/>Crew</button><button><Wrench size={14}/>Maintenance</button><button><GraduationCap size={14}/>Training</button><button><Fuel size={14}/>Services</button><button><BarChart3 size={14}/>Analytics</button></aside>
          <section className="hv-main">
            <div className="hv-title-row"><div><small>OPERATIONS</small><h3>{s.title}</h3><span>{s.note}</span></div><button>+ New flight</button></div>
            <div className="hv-mode-row">{[['normal','Live operation'],['aircraft','Aircraft down'],['weather','Weather event']].map(([k,t])=><button key={k} className={mode===k?'active':''} onClick={()=>setMode(k)}>{t}</button>)}</div>
            <div className="hv-metrics">{metrics.map(([l,v])=><div key={l}><small>{l}</small><b>{v}</b></div>)}</div>
            <div className="hv-workgrid">
              <div className="hv-table"><div className="hv-table-head"><b>{s.title}</b><span>{s.tag}</span></div>{s.rows.map((r,i)=><button key={i} onClick={()=>setSelected(i)} className={selected===i?'selected':''}><span>{r[0]}</span><b>{r[1]}</b><span>{r[2]}</span><span>{r[3]}</span><i>{r[4]}</i></button>)}</div>
              <div className="hv-map"><div className="hv-map-head"><b>Weather & NOTAMs</b><span>3 active</span></div><div className="hv-map-body"><span className="hv-airport a1">KAVL</span><span className="hv-airport a2">KCLT</span><span className="hv-airport a3">KGSP</span><span className="hv-airport a4">KATL</span><Plane size={20} className="hv-map-plane"/><i className="hv-route r1"/><i className="hv-route r2"/></div></div>
            </div>
            <div className="hv-lower"><div><b>Aircraft</b><span>N905CR · Available</span><span>N712AS · In flight</span></div><div><b>Maintenance</b><span>N456CD · 100-hr due</span><span>N172GT · Grounded</span></div><div><b>Training</b><span>Emma Wilson · Ready</span><span>Liam Chen · Checkride</span></div></div>
            {mode!=='normal'&&<div className="hv-ai-plan"><span>A</span><div><small>AEROS RECOMMENDATION</small><b>{mode==='aircraft'?'Recover all 3 impacted flights with one aircraft swap.':'Move three VFR flights earlier and preserve two IFR-capable missions.'}</b></div><button>Review plan <ChevronRight size={12}/></button></div>}
          </section>
        </div>
      </div>
      <div className="hv-mac-base"/>
    </div>
  </div>;
}

function AgentDemo(){
  const [active,setActive]=useState(0);
  const prompts=[
    ['Recover the day','N172GT is grounded before the 10:30 block.','Aeros found 3 affected flights, 1 qualified substitute aircraft, and a plan that preserves every training prerequisite.'],
    ['Crew coverage','Sarah is unavailable this afternoon.','Aeros found two qualified instructors with matching availability and no downstream duty conflicts.'],
    ['Maintenance risk','Which aircraft is closest to inspection?','N456CD reaches its 100-hour inspection first. Aeros can reduce disruption by shifting two training flights to N882SP.']
  ];
  const p=prompts[active];
  return <div className="hv-agent-demo"><div className="hv-agent-side">{prompts.map((x,i)=><button onClick={()=>setActive(i)} className={active===i?'active':''} key={x[0]}><span>0{i+1}</span><b>{x[0]}</b></button>)}</div><div className="hv-agent-main"><div className="hv-agent-head"><span>A</span><div><b>Aeros Ops AI</b><small>Grounded in your live operation</small></div></div><div className="hv-user-msg">{p[1]}</div><div className="hv-ai-msg"><p>{p[2]}</p><div className="hv-checks"><span><CheckCircle2 size={13}/> Aircraft</span><span><CheckCircle2 size={13}/> Crew</span><span><CheckCircle2 size={13}/> Maintenance</span><span><CheckCircle2 size={13}/> Training</span></div><button>Open recovery plan <ArrowUpRight size={12}/></button></div></div></div>;
}

export default function Home(){return <div className="harvey-aeros">
  <section className="hv-hero">
    <div className="hv-hero-copy"><div className="hv-kicker">AI OPERATIONS SOFTWARE FOR AVIATION</div><h1>Build a frontier<br/>flight operation.</h1><p>Aeros gives aviation teams one intelligent operating layer for scheduling, aircraft, crew, maintenance, training, services, and day-of-operation recovery.</p><div className="hv-actions"><Link href="/signup/" className="hv-primary">Get started <ArrowUpRight size={13}/></Link><Link href="/contact/" className="hv-secondary">Request a demo</Link></div><div className="hv-proofline">Built for flight schools, charter operators, FBOs, and corporate flight departments.</div></div>
    <MacCommandCenter/>
  </section>

  <section className="hv-trust-strip"><span>ONE PLATFORM FOR THE ENTIRE OPERATION</span><div>{['SCHEDULE','DISPATCH','AIRCRAFT','CREW','MAINTENANCE','TRAINING','SERVICES','ANALYTICS'].map(x=><b key={x}>{x}</b>)}</div></section>

  <section className="hv-intro hv-section"><div className="hv-section-label">ONE PLATFORM FOR AVIATION WORK</div><div className="hv-intro-grid"><h2>Run every operational decision from the same context.</h2><p>Most aviation software records pieces of the operation in separate places. Aeros connects the resources and constraints behind each flight so teams can see what is happening, what is at risk, and what should happen next.</p></div><div className="hv-solution-cards"><Link href="/solutions/"><span>FOR FLIGHT SCHOOLS</span><h3>Coordinate students, instructors, aircraft, maintenance, and weather in one system.</h3><b>Explore flight schools →</b></Link><Link href="/solutions/"><span>FOR OPERATORS</span><h3>Run aircraft, crew, trips, readiness, and live disruptions from one shared operating picture.</h3><b>Explore operators →</b></Link></div></section>

  <section className="hv-release hv-section"><div className="hv-release-copy"><div className="hv-section-label">AEROS INTELLIGENCE</div><h2>The operating system that can reason about the day.</h2><p>Purpose-built AI watches the live operation, understands constraints, and prepares actions when aircraft, crew, weather, maintenance, or training requirements change.</p><Link href="/dashboard/" className="hv-primary">See Aeros in action <ArrowUpRight size={13}/></Link></div><AgentDemo/></section>

  <section className="hv-products hv-section"><div className="hv-products-head"><div className="hv-section-label">PRODUCT INNOVATION FOR AVIATION TEAMS</div><h2>Every workflow gets stronger when it shares the same operating context.</h2></div><div className="hv-product-grid">{[
    [CalendarDays,'Schedule','Build and continuously repair the schedule across aircraft, instructors, students, maintenance, and weather.','/product/schedule'],
    [Plane,'Dispatch','Know what can fly, what is ready, and what needs attention before wheels up.','/product/dispatch'],
    [Wrench,'Maintenance','Connect squawks, inspections, downtime, and utilization directly to the operating plan.','/product/maintenance'],
    [GraduationCap,'Training','Keep progression, lesson prerequisites, stage checks, and qualifications attached to every scheduling decision.','/product/training'],
    [Command,'Command Center','See the entire operation, surface exceptions, and coordinate actions across teams.','/dashboard/'],
    [MapPin,'Network','Connect external services around every flight: FBOs, fuel, maintenance, hangars, and eventually payments.','/product/network']
  ].map(([I,t,d,h],i)=><Link href={h} className={'hv-product-card pc'+i} key={t}><div className="hv-product-art"><I size={31}/><span/><span/></div><div className="hv-product-copy"><h3>{t}</h3><p>{d}</p><b>Learn more →</b></div></Link>)}</div></section>

  <section className="hv-impact hv-section"><div className="hv-impact-head"><div className="hv-section-label">HELPING TEAMS STAY FOCUSED</div><h2>Measure the operation in outcomes, not clicks.</h2></div><div className="hv-impact-grid"><div><span>Flights coordinated</span><strong>1,000+</strong><small>North-star product goal</small></div><div><span>Recovery workflow</span><strong>Seconds</strong><small>Solver-generated plan for review</small></div><div><span>Operating picture</span><strong>1</strong><small>Shared state across teams</small></div><div><span>AI actions</span><strong>Human</strong><small>Approval remains in control</small></div></div></section>

  <section className="hv-enterprise hv-section"><div className="hv-enterprise-copy"><div className="hv-section-label">ENTERPRISE-GRADE CONTROL</div><h2>Operational software has to earn the right to act.</h2><p>Aeros is designed around clear permissions, approval boundaries, durable operating history, and integrations with the systems your organization already depends on.</p><Link href="/enterprise/" className="hv-primary">Explore enterprise <ArrowUpRight size={13}/></Link></div><div className="hv-control-grid">{[[ShieldCheck,'Approval boundaries','Choose what Aeros may suggest, prepare, or eventually apply.'],[Users,'Role-based access','Give schedulers, instructors, maintenance teams, and leaders the right controls.'],[Route,'Decision history','Keep a durable record of what changed, why, and who approved it.'],[BarChart3,'Operational analytics','Understand utilization, throughput, cancellations, and where capacity is being lost.']].map(([I,t,d])=><article key={t}><I size={20}/><h3>{t}</h3><p>{d}</p></article>)}</div></section>

  <section className="hv-pricing hv-section"><div><div className="hv-section-label">PLANS THAT SCALE WITH THE OPERATION</div><h2>Start with one workflow. Expand from proof.</h2></div><div className="hv-price-grid"><article><span>DESIGN PARTNER</span><h3>Pilot</h3><p>For teams proving scheduling, recovery, or another high-friction workflow.</p><Link href="/signup/">Get started →</Link></article><article className="featured"><span>OPERATIONS</span><h3>Custom</h3><p>For teams ready to run recurring daily operations through Aeros.</p><Link href="/contact/">Talk to us →</Link></article><article><span>ENTERPRISE</span><h3>Custom</h3><p>For complex organizations with advanced controls, rollout, and integration needs.</p><Link href="/enterprise/">Contact sales →</Link></article></div></section>

  <section className="hv-final hv-section"><div><div className="hv-section-label">PROFESSIONAL-CLASS AI FOR AVIATION OPERATIONS</div><h2>Give your team more time to operate.</h2></div><div className="hv-actions"><Link href="/signup/" className="hv-primary">Create your account <ArrowUpRight size={13}/></Link><Link href="/contact/" className="hv-secondary">Request a demo</Link></div></section>
 </div>;}
