'use client';
import {useState} from 'react';
import Link from 'next/link';
import {ArrowUpRight,Plane,CloudRain,Wrench,Users,Route,BarChart3,CheckCircle2,Command,MapPin,ShieldCheck,ChevronRight} from 'lucide-react';

const views={
  schedule:{title:'Today’s operation',metric:'176 flights',rows:[['08:00','N551SP','Emily / Alex','READY'],['09:30','N183GT','Chris / Maya','READY'],['10:30','N172GT','Jordan / Sam','REPLAN'],['12:00','N882SP','Noah / Maya','READY']]},
  recovery:{title:'Recovery plan',metric:'6 conflicts resolved',rows:[['AIRCRAFT','N172GT grounded','Swap to N441CF','DONE'],['CREW','Sarah unavailable','Reassign Maya','DONE'],['WEATHER','VFR closes 14:20','Move 3 flights','READY'],['TRAINING','Stage prerequisite','Preserve sequence','READY']]},
  fleet:{title:'Fleet status',metric:'22 / 24 available',rows:[['N551SP','12.4 hrs to inspection','AVAILABLE','READY'],['N183GT','No open squawks','AVAILABLE','READY'],['N172GT','Oil pressure squawk','GROUND','HOLD'],['N882SP','4.8 hrs to inspection','AVAILABLE','READY']]}
};

function ProductWorkspace(){
 const [tab,setTab]=useState('schedule'); const v=views[tab];
 return <div className="workspace-shell">
   <div className="workspace-top"><div className="ws-brand"><span><Plane size={13}/></span><b>Aeros Ops</b></div><div className="ws-status"><i/> LIVE · PDK</div></div>
   <div className="workspace-body">
    <aside className="workspace-side"><div className="operator-chip">Prestige Flight Ops <span>⌄</span></div>{[['schedule','Today'],['recovery','Aeros actions'],['fleet','Fleet']].map(([k,t])=><button key={k} className={tab===k?'active':''} onClick={()=>setTab(k)}>{k==='schedule'?<Route size={14}/>:k==='recovery'?<Command size={14}/>:<Plane size={14}/>} {t}</button>)}<div className="side-divider"/><button><Users size={14}/> Crew</button><button><Wrench size={14}/> Maintenance</button><button><BarChart3 size={14}/> Analytics</button></aside>
    <section className="workspace-main">
      <div className="workspace-head"><div><span>OPERATIONS</span><h3>{v.title}</h3></div><b>{v.metric}</b></div>
      <div className="workspace-summary"><div><span>ON TIME</span><strong>92%</strong></div><div><span>AT RISK</span><strong>8</strong></div><div><span>RECOVERED</span><strong>6</strong></div><div><span>UTILIZATION</span><strong>81%</strong></div></div>
      <div className="workspace-table">{v.rows.map((r,i)=><div className="workspace-row" key={i}><span>{r[0]}</span><b>{r[1]}</b><em>{r[2]}</em><i className={r[3]==='HOLD'?'hold':r[3]==='DONE'?'done':''}>{r[3]}</i></div>)}</div>
      <div className="aeros-assist"><span className="assist-icon">A</span><div><small>AEROS SUGGESTION</small><b>Move Jordan to N441CF at 11:10 and preserve the Stage 2 prerequisite.</b></div><button>Review plan <ChevronRight size={12}/></button></div>
    </section>
   </div>
 </div>
}

function AgentPanel(){
 const [q,setQ]=useState('What happens if N172GT goes down?');
 const prompts=['What happens if N172GT goes down?','Who can cover Sarah’s students?','Which aircraft is closest to maintenance?'];
 return <div className="agent-panel">
   <div className="agent-head"><span className="agent-orb">A</span><div><b>Ask Aeros</b><small>Operational answers with live context</small></div></div>
   <div className="agent-question">{q}</div>
   <div className="agent-thinking"><span/><span/><span/></div>
   <div className="agent-answer"><p><b>N172GT</b> affects 3 lessons between 10:30–13:45.</p><p>Aeros can preserve all prerequisites by moving two lessons to <b>N441CF</b> and delaying one by 40 minutes.</p><div className="answer-plan"><CheckCircle2 size={14}/><span>6 downstream conflicts checked</span></div></div>
   <div className="prompt-pills">{prompts.map(x=><button key={x} onClick={()=>setQ(x)}>{x}</button>)}</div>
 </div>
}

export default function Home(){return <div className="hexish-site">
  <section className="home-hero">
    <div className="hero-glow glow-one"/><div className="hero-glow glow-two"/>
    <div className="home-hero-inner">
      <div className="eyebrow">THE AI OPERATIONS PLATFORM FOR GENERAL AVIATION</div>
      <h1>Make every flight<br/>operation feel effortless.</h1>
      <p>Aeros gives flight schools and operators one intelligent workspace to schedule, recover, dispatch, maintain, and understand the operation — without the spreadsheet chaos.</p>
      <div className="hero-ctas"><Link href="/contact/" className="primary-cta">Request a demo <ArrowUpRight size={13}/></Link><Link href="/product/" className="ghost-cta">Explore the platform</Link></div>
      <div className="hero-trust">Built for flight schools · university aviation · charter operators</div>
      <ProductWorkspace/>
    </div>
  </section>

  <section className="logo-proof"><span>ONE CONNECTED SYSTEM FOR</span><div>{['SCHEDULING','DISPATCH','MAINTENANCE','TRAINING','CREW','GROUND SERVICES'].map(x=><b key={x}>{x}</b>)}</div></section>

  <section className="split-story section-pad">
    <div className="section-copy"><div className="eyebrow">A MODERN OPERATING LAYER</div><h2>Legacy systems store the schedule.<br/>Aeros understands the operation.</h2><p>Aircraft, instructors, students, maintenance, weather, training rules, and live changes all belong to the same decision. Aeros brings them into one shared operational context.</p><Link href="/product/" className="inline-link">See how the platform works <ArrowUpRight size={12}/></Link></div>
    <div className="context-visual"><div className="context-core"><span>A</span><b>LIVE OPERATION</b></div>{[[Plane,'AIRCRAFT','cv1'],[Users,'CREW','cv2'],[CloudRain,'WEATHER','cv3'],[Wrench,'MAINTENANCE','cv4'],[Route,'TRAINING','cv5'],[MapPin,'SERVICES','cv6']].map(([I,t,c])=><div className={'context-node '+c} key={t}><I size={14}/><span>{t}</span></div>)}<svg viewBox="0 0 600 420"><line x1="300" y1="210" x2="105" y2="95"/><line x1="300" y1="210" x2="495" y2="95"/><line x1="300" y1="210" x2="95" y2="320"/><line x1="300" y1="210" x2="505" y2="320"/><line x1="300" y1="210" x2="300" y2="48"/><line x1="300" y1="210" x2="300" y2="375"/></svg></div>
  </section>

  <section className="dark-section section-pad">
    <div className="dark-copy"><div className="eyebrow light">ASK THE OPERATION</div><h2>Answers that know what’s actually happening.</h2><p>Ask natural-language questions about the day and get answers grounded in the live schedule, fleet status, crew availability, maintenance, and training context.</p><Link href="/product/dispatch" className="inline-link light">Explore Aeros intelligence <ArrowUpRight size={12}/></Link></div>
    <AgentPanel/>
  </section>

  <section className="capabilities section-pad">
    <div className="center-head"><div className="eyebrow">ONE PLATFORM</div><h2>Run the operation from one place.</h2><p>Start with the workflow that hurts most. Expand into the rest of the operation without rebuilding the stack.</p></div>
    <div className="cap-grid">
      {[
        ['/product/schedule',Route,'Scheduling','Build and continuously repair the schedule around aircraft, crew, training, maintenance, and weather.'],
        ['/product/dispatch',Plane,'Dispatch','Know what can fly, what is ready, and what needs attention before departure.'],
        ['/product/maintenance',Wrench,'Maintenance','Tie squawks, inspections, downtime, and utilization directly into operational planning.'],
        ['/product/training',Users,'Training','Keep student progression, lesson prerequisites, stage checks, and instructor qualifications in context.']
      ].map(([h,I,t,d],i)=><Link className="cap-card" href={h} key={t}><div className={'cap-visual c'+i}><I size={26}/><span/><span/></div><small>0{i+1}</small><h3>{t}</h3><p>{d}</p><b>Learn more →</b></Link>)}
    </div>
  </section>

  <section className="role-section section-pad">
    <div className="center-head"><div className="eyebrow">BUILT AROUND THE PEOPLE RUNNING THE DAY</div><h2>One system. Different views.</h2></div>
    <div className="role-grid">
      <article><span>SCHEDULER</span><h3>Recover the day without rebuilding it by hand.</h3><p>See conflicts, options, and the downstream impact before applying changes.</p></article>
      <article><span>CHIEF INSTRUCTOR</span><h3>Keep training moving toward completion.</h3><p>Understand progression, instructor capacity, and curriculum bottlenecks.</p></article>
      <article><span>MAINTENANCE</span><h3>Make aircraft availability operationally visible.</h3><p>Connect inspection windows and squawks directly to the schedule.</p></article>
      <article><span>OWNER / GM</span><h3>Know where capacity and revenue are being lost.</h3><p>See utilization, cancellations, throughput, and recoverable capacity in one view.</p></article>
    </div>
    <Link href="/solutions/" className="center-link">Explore solutions <ArrowUpRight size={12}/></Link>
  </section>

  <section className="enterprise-band section-pad"><div><div className="eyebrow">BUILT FOR TRUST</div><h2>Operational software has to earn the right to act.</h2><p>Start human-in-the-loop. Lock critical rules. Review every recommendation. Build an audit trail as Aeros becomes more autonomous.</p><Link href="/enterprise/" className="inline-link">Enterprise controls <ArrowUpRight size={12}/></Link></div><div className="trust-stack"><div><ShieldCheck size={19}/><b>Approval boundaries</b><span>Choose what Aeros can suggest, prepare, or apply.</span></div><div><CheckCircle2 size={19}/><b>Explainable decisions</b><span>See exactly why a flight moved or an aircraft changed.</span></div><div><BarChart3 size={19}/><b>Operational history</b><span>Every action becomes reusable context for future decisions.</span></div></div></section>

  <section className="network-tease section-pad">
    <div className="network-copy"><div className="eyebrow light">WHERE AEROS GOES</div><h2>From operating software<br/>to an aviation network.</h2><p>Once Aeros knows where aircraft are going and what they need, it can coordinate the external services around every flight — FBOs, maintenance, fuel, hangars, payments, and eventually procurement.</p><Link href="/product/network" className="light-button">See the network vision <ArrowUpRight size={12}/></Link></div>
    <div className="network-orbit"><div className="network-center">AEROS</div>{['OPERATORS','FBOs','FUEL','MAINTENANCE','HANGARS','PAYMENTS'].map((x,i)=><span className={'orbit-item oi'+i} key={x}>{x}</span>)}<i className="orbit-ring r1"/><i className="orbit-ring r2"/></div>
  </section>

  <section className="final-cta section-pad"><div><div className="eyebrow">DESIGN PARTNERS</div><h2>Run one real workflow through Aeros.</h2><p>We’re working with operators that are tired of rebuilding the day across legacy software, calls, texts, and spreadsheets.</p></div><Link href="/contact/" className="primary-cta">Talk to Aeros <ArrowUpRight size={13}/></Link></section>
 </div>;
}