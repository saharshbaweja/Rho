'use client';
import {useMemo,useState} from 'react';
import {Plane,CalendarDays,Wrench,Users,BarChart3,Fuel,GraduationCap,Command,Search,CloudSun,Bell,ChevronRight,CheckCircle2,AlertTriangle,Map,Settings,MessageSquare,Building2,Radio} from 'lucide-react';

const baseFlights=[
 {time:'07:30',id:'AER101',route:'KAVL → KCLT',aircraft:'N905CR',crew:'Smith / Lopez',status:'Departed'},
 {time:'09:15',id:'FS0202',route:'KAVL → KJFK',aircraft:'N712AS',crew:'Chen / Davis',status:'Boarding'},
 {time:'10:30',id:'TNG301',route:'KAVL → KGSP',aircraft:'N172GT',crew:'Wilson / Patel',status:'In progress'},
 {time:'12:00',id:'CHAR77',route:'KCLT → KPBI',aircraft:'N905CR',crew:'Miller / Lopez',status:'Scheduled'},
 {time:'14:20',id:'TNG304',route:'KAVL → KCHA',aircraft:'N287MA',crew:'Brown / Kim',status:'Scheduled'},
 {time:'16:00',id:'AER108',route:'KCHA → KAVL',aircraft:'N712AS',crew:'Smith / Garcia',status:'Scheduled'},
 {time:'17:45',id:'CHAR82',route:'KAVL → KTEB',aircraft:'N560KT',crew:'Davis / Nguyen',status:'Scheduled'}
];

const scenarios={
 normal:{label:'Normal operation',title:'Operation running normally'},
 aircraft:{label:'Aircraft grounded',title:'N172GT grounded · oil pressure squawk'},
 weather:{label:'Weather deterioration',title:'VFR window closes at 14:20'}
};

function statusClass(status){
 const s=status.toLowerCase();
 if(s.includes('ground')||s.includes('critical')) return 'ground';
 if(s.includes('risk')||s.includes('delay')) return 'risk';
 if(s.includes('plan')||s.includes('suggest')) return 'plan';
 if(s.includes('progress')||s.includes('boarding')) return 'progress';
 return 'ready';
}

export default function Dashboard(){
 const [nav,setNav]=useState('Operations');
 const [selected,setSelected]=useState(2);
 const [scenario,setScenario]=useState('normal');
 const [aiOpen,setAiOpen]=useState(false);
 const [applied,setApplied]=useState(false);
 const [toast,setToast]=useState('');

 const flights=useMemo(()=>{
   if(scenario==='aircraft'&&!applied){
     return baseFlights.map((f,i)=>i===2?{...f,status:'Grounded'}:i===3?{...f,status:'At risk'}:f);
   }
   if(scenario==='weather'&&!applied){
     return baseFlights.map((f,i)=>i>=4?{...f,status:i===4?'At risk':'Weather risk'}:f);
   }
   if(applied&&scenario==='aircraft'){
     return baseFlights.map((f,i)=>i===2?{...f,aircraft:'N441CF',time:'11:10',status:'Replanned'}:i===3?{...f,time:'12:20',status:'Recovered'}:f);
   }
   if(applied&&scenario==='weather'){
     return baseFlights.map((f,i)=>i===4?{...f,time:'13:05',status:'Recovered'}:i===5?{...f,time:'14:05',status:'Recovered'}:f);
   }
   return baseFlights;
 },[scenario,applied]);

 const flight=flights[selected]||flights[0];
 const metrics=scenario==='normal'||applied
 ?[['On time','94%','+3.1% vs last week','good'],['Flights today','12','2 active · 5 upcoming',''],['Fleet ready','8 / 10','1 due soon',''],['Recovered','6','by Aeros this week','good'],['Utilization','81%','+7% vs baseline','good']]
 :scenario==='aircraft'
 ?[['On time','87%','3 flights impacted','warn'],['Flights at risk','3','requires recovery','warn'],['Fleet ready','7 / 10','N172GT grounded','warn'],['Aeros options','2','ranked plans ready','good'],['Utilization','74%','recoverable capacity','warn']]
 :[['On time','89%','4 flights weather-exposed','warn'],['Flights at risk','4','afternoon bank','warn'],['Fleet ready','8 / 10','aircraft unchanged',''],['Aeros options','3','weather-safe plans','good'],['Utilization','76%','weather constrained','warn']];

 function trigger(next){setScenario(next);setApplied(false);setSelected(next==='aircraft'?2:next==='weather'?4:2);setAiOpen(next!=='normal');setToast(next==='normal'?'Operation reset':'Aeros detected a new operational event');setTimeout(()=>setToast(''),1800)}
 function applyPlan(){setApplied(true);setAiOpen(false);setToast('Recovery plan applied to the live operation');setTimeout(()=>setToast(''),2200)}

 return <div className="ops-app">
   <aside className="ops-sidebar">
     <div className="ops-logo"><span className="ops-logo-mark"><Plane size={15}/></span><b>AEROS</b></div>
     <div className="ops-org"><small>ORGANIZATION</small><b>Prestige Aviation</b></div>
     <nav className="ops-nav">
       <div className="ops-nav-group"><span>OPERATIONS</span>{[[Command,'Operations'],[CalendarDays,'Schedule'],[Plane,'Flights'],[Map,'Fleet']].map(([I,t])=><button key={t} className={nav===t?'active':''} onClick={()=>setNav(t)}><I size={15}/><span>{t}</span></button>)}</div>
       <div className="ops-nav-group"><span>RESOURCES</span>{[[Wrench,'Maintenance'],[Users,'Crew'],[GraduationCap,'Training'],[Fuel,'Services']].map(([I,t])=><button key={t} className={nav===t?'active':''} onClick={()=>setNav(t)}><I size={15}/><span>{t}</span></button>)}</div>
       <div className="ops-nav-group"><span>INSIGHTS</span>{[[BarChart3,'Analytics'],[MessageSquare,'Aeros AI'],[Settings,'Settings']].map(([I,t])=><button key={t} className={nav===t?'active':''} onClick={()=>setNav(t)}><I size={15}/><span>{t}</span></button>)}</div>
     </nav>
     <div className="ops-sidebar-foot">Illustrative prototype environment</div>
   </aside>

   <main className="ops-main">
     <header className="ops-topbar">
       <div className="ops-breadcrumb"><Building2 size={14}/><span>Prestige Aviation</span><ChevronRight size={12}/><b>{nav}</b></div>
       <div className="ops-search"><Search size={14}/>&nbsp;&nbsp;Search flights, tail numbers, crew, students...</div>
       <div className="ops-top-actions"><span className="ops-live">● Live</span><span className="ops-weather"><CloudSun size={12}/> KAVL · 72°F · VFR</span><Bell size={16}/><span className="ops-avatar">JD</span></div>
     </header>

     <div className="ops-content">
       <div className="ops-heading"><div><small>MONDAY · OCT 5</small><h1>Good morning, Jordan.</h1></div><div className="ops-heading-actions"><button className="ops-btn" onClick={()=>setAiOpen(true)}>Ask Aeros</button><button className="ops-btn primary">+ New flight</button></div></div>

       <div className="scenario-strip"><button className={scenario==='normal'?'active':''} onClick={()=>trigger('normal')}>Normal day</button><button className={scenario==='aircraft'?'active':''} onClick={()=>trigger('aircraft')}><AlertTriangle size={11}/> Ground N172GT</button><button className={scenario==='weather'?'active':''} onClick={()=>trigger('weather')}><CloudSun size={11}/> Weather deteriorates</button></div>

       <section className="ops-overview">{metrics.map(([l,n,s,t])=><div className={'metric-card '+t} key={l}><small>{l}</small><b>{n}</b><span>{s}</span></div>)}</section>

       <div className="ops-workspace">
         <section className="ops-panel">
           <div className="ops-panel-head"><b>Today’s operation</b><span>{scenario==='normal'||applied?'Live schedule':'Impact detected · '+scenarios[scenario].label}</span></div>
           <div className="flight-toolbar"><button className="active">All flights</button><button>Departures</button><button>Arrivals</button><button>Training</button><button>Charter</button></div>
           <div className="flight-head"><span>Time</span><span>Flight</span><span>Route</span><span>Aircraft</span><span>Crew</span><span>Status</span><span/></div>
           {flights.map((r,i)=><button className={'flight-row '+(selected===i?'selected':'')} onClick={()=>setSelected(i)} key={r.id}><span>{r.time}</span><b>{r.id}</b><span className="route">{r.route}</span><span>{r.aircraft}</span><span>{r.crew}</span><span className={'status '+statusClass(r.status)}>{r.status}</span><ChevronRight size={12}/></button>)}
         </section>

         <div className="side-stack">
           <section className="ops-panel detail-card">
             <div className="flight-detail-top"><div><small>SELECTED FLIGHT</small><h3>{flight.id}</h3><span>{flight.status}</span></div><div className="tail-thumb"><Plane size={30}/></div></div>
             <div className="detail-route"><strong>{flight.route.split(' → ')[0]}</strong><i/><Plane size={15}/><i/><strong>{flight.route.split(' → ')[1]}</strong></div>
             <div className="detail-grid"><div><small>Aircraft</small><b>{flight.aircraft}</b></div><div><small>Crew</small><b>{flight.crew}</b></div><div><small>Departure</small><b>{flight.time}</b></div><div><small>Readiness</small><b>{statusClass(flight.status)==='ground'?'Blocked':'Operational'}</b></div></div>
           </section>

           <section className="ops-panel"><div className="ops-panel-head"><b>Weather & route</b><span>3 NOTAMs</span></div><div className="weather-map"><div className="weather-route"/><Plane className="wx-plane" size={21}/><span className="wx-airport wx-a">{flight.route.split(' → ')[0]}</span><span className="wx-airport wx-b">{flight.route.split(' → ')[1]}</span></div></section>
         </div>
       </div>

       <div className="ops-lower">
         <section className="ops-panel mini-table"><div className="ops-panel-head"><b>Aircraft readiness</b><span>View fleet</span></div><div className="item"><b>N905CR · Citation CJ3</b><span className="success">Available</span></div><div className="item"><b>N712AS · Cirrus SR22</b><span>In flight</span></div><div className="item"><b>N172GT · Cessna 172S</b><span className={scenario==='aircraft'&&!applied?'danger':''}>{scenario==='aircraft'&&!applied?'Grounded':'Available'}</span></div></section>
         <section className="ops-panel mini-table"><div className="ops-panel-head"><b>Maintenance control</b><span>5 open</span></div><div className="item"><b>N456CD</b><span>100-hr · 8 days</span></div><div className="item"><b>N905CR</b><span>Annual · 24 days</span></div><div className="item"><b>N712AS</b><span className="danger">ELT battery overdue</span></div></section>
         <section className="ops-panel mini-table"><div className="ops-panel-head"><b>Operations feed</b><span>Live</span></div><div className="item"><b>N905CR departed KAVL</b><span>10:32</span></div><div className="item"><b>Aeros checked 6 downstream conflicts</b><span>10:29</span></div><div className="item"><b>Weather window updated</b><span>10:18</span></div></section>
       </div>
       <div className="prototype-note"><CheckCircle2 size={12}/> Illustrative prototype data — interactions demonstrate the intended Aeros product workflow.</div>
     </div>

     {aiOpen&&<div className="ai-drawer">
       <div className="ai-drawer-head"><div><span className="ai-orb">A</span><div><small>AEROS AI · OPERATIONS AGENT</small><b>{scenario==='normal'?'What would you like to evaluate?':scenarios[scenario].title}</b></div></div><button className="ops-btn" onClick={()=>setAiOpen(false)}>Close</button></div>
       <div className="ai-body">
         {scenario==='normal'?<div className="ai-event-box"><small>SUGGESTED PROMPT</small><b>Try grounding N172GT or deteriorating weather above to see Aeros build a recovery plan.</b></div>:<>
           <div className="ai-event-box"><small>DETECTED EVENT</small><b>{scenarios[scenario].title}</b></div>
           <div className="ai-impact"><div><small>Flights impacted</small><b>{scenario==='aircraft'?'3':'4'}</b></div><div><small>Downstream conflicts</small><b>{scenario==='aircraft'?'6':'9'}</b></div><div><small>Plan confidence</small><b>{scenario==='aircraft'?'94%':'91%'}</b></div></div>
           <div className="ai-plan"><h4>Recommended recovery plan</h4>{scenario==='aircraft'?<><div className="ai-change"><b>TNG301</b><em>N172GT → N441CF</em><span>11:10</span></div><div className="ai-change"><b>CHAR77</b><em>Shift +20 min</em><span>12:20</span></div><div className="ai-change"><b>Training</b><em>Preserve Stage 2 prerequisite</em><span>OK</span></div></>:<><div className="ai-change"><b>TNG304</b><em>Move before weather window</em><span>13:05</span></div><div className="ai-change"><b>AER108</b><em>Move earlier</em><span>14:05</span></div><div className="ai-change"><b>CHAR82</b><em>Hold current slot</em><span>Safe</span></div></>}</div>
           <div className="ai-footer"><button onClick={()=>setAiOpen(false)}>Keep current plan</button><button className="primary" onClick={applyPlan}>Apply recovery plan</button></div>
         </>}
       </div>
     </div>}
     {toast&&<div className="toast">{toast}</div>}
   </main>
 </div>
}