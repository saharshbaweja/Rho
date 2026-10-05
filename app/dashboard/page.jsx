'use client';

import {useMemo,useState} from 'react';
import {
  Activity, AlertTriangle, BarChart3, Bell, CalendarDays, Check, ChevronDown,
  ChevronRight, CloudSun, Command, Fuel, GraduationCap, Map, MessageSquare,
  Plane, Plus, Search, Settings, Sparkles, Users, Wrench
} from 'lucide-react';
import styles from './dashboard.module.css';

const flightsBase=[
  {time:'08:00',id:'L-101',route:'KAVL → KCLT',aircraft:'N172GT',type:'Lesson',crew:'Dan Miller',customer:'Alex Chen',status:'Departed'},
  {time:'09:30',id:'L-102',route:'KAVL → KGSP',aircraft:'N441CF',type:'Lesson',crew:'Sarah Park',customer:'Jamie Wilson',status:'In Progress'},
  {time:'11:00',id:'L-103',route:'KAVL → KHKY',aircraft:'N739PD',type:'Lesson',crew:'Mike Torres',customer:'Taylor Kim',status:'Scheduled'},
  {time:'12:30',id:'C-325',route:'KAVL → KPDK',aircraft:'N905JE',type:'Charter',crew:'Chris Lang',customer:'NorthStar Aviation',status:'Scheduled'},
  {time:'14:00',id:'L-104',route:'KAVL → KCHA',aircraft:'N441CF',type:'Lesson',crew:'Sarah Park',customer:'Morgan Lee',status:'Scheduled'},
  {time:'15:30',id:'L-105',route:'KAVL → KCLT',aircraft:'N172GT',type:'Lesson',crew:'Dan Miller',customer:'Casey Nguyen',status:'Scheduled'},
  {time:'17:00',id:'L-106',route:'KAVL → KAVL',aircraft:'N618DA',type:'Checkride',crew:'Priya Shah',customer:'Jordan Smith',status:'Scheduled'}
];

const fleet=[
  {tail:'N172GT',type:'Cessna 172S',status:'Ready',fuel:'100%',hobbs:'1,245.6',util:'84%',maint:'100-hr due in 18h'},
  {tail:'N441CF',type:'Diamond DA40',status:'Ready',fuel:'80%',hobbs:'892.1',util:'79%',maint:'Annual due in 31d'},
  {tail:'N739PD',type:'Cessna 172S',status:'Maintenance',fuel:'—',hobbs:'1,401.2',util:'67%',maint:'Oil pressure squawk'},
  {tail:'N618DA',type:'Piper Archer',status:'Ready',fuel:'70%',hobbs:'2,103.7',util:'73%',maint:'50-hr due in 32h'},
  {tail:'N905JE',type:'Citation CJ3',status:'In flight',fuel:'61%',hobbs:'3,188.2',util:'76%',maint:'Annual due in 12d'},
  {tail:'N287MA',type:'Piper Archer',status:'Ready',fuel:'90%',hobbs:'1,788.9',util:'69%',maint:'Transponder due in 19d'}
];

const crew=[
  {name:'Dan Miller',role:'CFI / CFII',status:'Available',duty:'4h 12m',qual:'C172 · DA40',progress:78},
  {name:'Sarah Park',role:'CFII',status:'Flying',duty:'5h 01m',qual:'C172 · DA40 · PA28',progress:66},
  {name:'Mike Torres',role:'CFI',status:'Available',duty:'3h 42m',qual:'C172 · PA28',progress:51},
  {name:'Priya Shah',role:'Chief Instructor',status:'Available',duty:'2h 28m',qual:'C172 · DA40 · PA28 · MEI',progress:34},
  {name:'Chris Lang',role:'ATP / Charter',status:'Rest',duty:'6h 08m',qual:'CJ3 · SR22',progress:89},
  {name:'Alex Rivera',role:'CFI',status:'Available',duty:'1h 55m',qual:'C172',progress:27}
];

const students=[
  {name:'Alex Chen',program:'Private Pilot',next:'Solo XC',status:'Ready',progress:72},
  {name:'Jamie Wilson',program:'Instrument',next:'Stage 3',status:'In progress',progress:61},
  {name:'Taylor Kim',program:'Commercial',next:'Complex endorsement',status:'At risk',progress:48},
  {name:'Morgan Lee',program:'Private Pilot',next:'Stage 2',status:'Ready',progress:57},
  {name:'Casey Nguyen',program:'Instrument',next:'XC requirement',status:'Scheduled',progress:36},
  {name:'Jordan Smith',program:'Commercial',next:'Checkride',status:'Ready',progress:93}
];

const navGroups=[
  ['Operations',[[Command,'Command Center'],[CalendarDays,'Schedule'],[Plane,'Aircraft'],[Wrench,'Maintenance']]],
  ['People',[[Users,'Crew'],[GraduationCap,'Training']]],
  ['Intelligence',[[BarChart3,'Analytics'],[Sparkles,'Aeros AI'],[MessageSquare,'Messages']]],
  ['System',[[Settings,'Settings']]]
];

function statusClass(status){
  const s=status.toLowerCase();
  if(s.includes('risk')||s.includes('maintenance')||s.includes('ground')||s.includes('overdue')) return styles.red;
  if(s.includes('progress')||s.includes('flying')) return styles.blue;
  if(s.includes('reassign')) return styles.purple;
  if(s.includes('ready')||s.includes('departed')||s.includes('available')||s.includes('recovered')) return styles.green;
  return styles.gray;
}

function Header({active}){
  return <header className={styles.topbar}>
    <div className={styles.base}><Plane size={14}/><div><b>KAVL</b> <span>Asheville, NC</span></div><ChevronDown size={12}/></div>
    <div className={styles.search}><Search size={14}/>Search flights, aircraft, people, or ask Aeros…<span style={{marginLeft:'auto'}}>⌘ K</span></div>
    <div className={styles.topActions}><button className={styles.iconBtn}><Bell size={15}/></button><div className={styles.profile}><span className={styles.avatar}>SB</span><div><b>Saharsh</b><small>Operations Manager · {active}</small></div></div></div>
  </header>;
}

function Sidebar({active,setActive}){
  return <aside className={styles.sidebar}>
    <div className={styles.brand}><span className={styles.brandMark}><Plane size={16}/></span><b>Aeros</b></div>
    <div className={styles.org}><div><small>Organization</small><b>Prestige Aviation</b></div><ChevronDown size={12}/></div>
    {navGroups.map(([label,items])=><div key={label}><div className={styles.navLabel}>{label}</div><div className={styles.nav}>{items.map(([Icon,name])=><button key={name} onClick={()=>setActive(name)} className={active===name?styles.active:''}><Icon size={15}/><span>{name}</span>{name==='Aeros AI'&&<span className={styles.badge}>NEW</span>}</button>)}</div></div>)}
    <div className={styles.sideBottom}><div className={styles.weatherCard}><div className={styles.weatherTop}><div><small>GOOD DAY FOR FLYING</small><b>72°F</b></div><CloudSun size={26}/></div><span>Few clouds · VFR</span><small>KAVL · wind 210° at 8 kt</small></div><div className={styles.helpCard}><b>Aeros is watching the operation</b><p>3 risks are being monitored across weather, maintenance, and staffing.</p><button onClick={()=>setActive('Aeros AI')}>Open Aeros AI</button></div></div>
  </aside>;
}

function Kpis({scenario}){
  const cards=scenario==='normal'
    ?[['Flights Today','32','28 scheduled · 4 active','+12%',Plane],['Aircraft Ready','12 / 14','2 in maintenance','86%',Check],['Instructors Active','7 / 9','2 off duty','78%',Users],['Recovery Risk','3','Weather · MX · staffing','↑ 2',AlertTriangle],['On-time Rate','94%','Last 30 days','+6%',Activity]]
    :[['Flights Today','32','3 impacted','—',Plane],['Aircraft Ready','11 / 14','N739PD grounded','79%',Check],['Instructors Active','7 / 9','No crew impact','78%',Users],['Recovery Risk','6','3 require action','↑ 3',AlertTriangle],['On-time Rate','89%','Projected after disruption','-5%',Activity]];
  return <div className={styles.kpis}>{cards.map(([label,value,sub,trend,Icon],i)=><div className={styles.kpi} key={label}><div className={styles.kpiTop}><span className={styles.kpiIcon}><Icon size={14}/></span><span className={i===3&&scenario!=='normal'?styles.warnTrend:styles.trend}>{trend}</span></div><small>{label}</small><b>{value}</b><span className={i===3&&scenario!=='normal'?styles.warnTrend:styles.trend}>{sub}</span></div>)}</div>;
}

function CommandCenter({scenario,setScenario}){
  const [selected,setSelected]=useState(2);
  const [filter,setFilter]=useState('All Flights');
  const [applied,setApplied]=useState(false);
  const rows=useMemo(()=>{
    if(scenario==='normal'||applied) return flightsBase.map((f,i)=>applied&&i===2?{...f,aircraft:'N441CF',time:'11:10',status:'Reassigned'}:f);
    return flightsBase.map((f,i)=>i===2?{...f,status:'At Risk'}:i===4?{...f,status:'Reassigned'}:i===5?{...f,status:'At Risk'}:f);
  },[scenario,applied]);
  const visible=filter==='All Flights'?rows:rows.filter(r=>filter==='Lessons'?r.type==='Lesson':filter==='Charter'?r.type==='Charter':true);
  const selectedFlight=rows[selected]||rows[0];
  const trigger=()=>{setScenario('disruption');setApplied(false);setSelected(2)};
  const reset=()=>{setScenario('normal');setApplied(false);setSelected(2)};
  const apply=()=>{setApplied(true);setScenario('normal')};
  return <>
    <div className={styles.heading}><div><small>MONDAY · OCTOBER 5</small><h1>Today’s Operation</h1><p>32 flights · 18 students · 7 instructors · KAVL</p></div><div className={styles.actions}><button className={`${styles.btn} ${styles.primary}`} onClick={trigger}><Sparkles size={14}/>Plan with AI</button><button className={styles.btn}><Plus size={14}/>New Flight</button><button className={styles.btn}><Wrench size={14}/>Log Maintenance</button><button className={styles.btn}><MessageSquare size={14}/>Message Crew</button></div></div>
    <Kpis scenario={scenario}/>
    <div className={styles.grid}>
      <section className={styles.panel}><div className={styles.panelHead}><div><b>Today’s Schedule</b><span>{scenario==='normal'?'Live operation':'Operational disruption detected'}</span></div><div className={styles.tabs}>{['All Flights','Lessons','Charter'].map(x=><button key={x} className={filter===x?styles.active:''} onClick={()=>setFilter(x)}>{x}</button>)}</div></div><div className={styles.toolbar}><button className={styles.filter}>All ({rows.length})</button><button className={styles.filter}>On Time ({scenario==='normal'?24:21})</button><button className={styles.filter}>At Risk ({scenario==='normal'?1:3})</button><button className={styles.filter}>Maintenance (2)</button></div><div className={styles.tableHead}><span>Time</span><span>Flight #</span><span>Route</span><span>Aircraft</span><span>Instructor</span><span>Status</span><span/></div>{visible.map((r,i)=><button key={r.id} onClick={()=>setSelected(rows.findIndex(x=>x.id===r.id))} className={`${styles.row} ${selectedFlight.id===r.id?styles.selected:''}`}><span>{r.time}</span><b>{r.id}</b><span>{r.route}</span><span>{r.aircraft}</span><span>{r.crew}</span><em className={`${styles.status} ${statusClass(r.status)}`}>{r.status}</em><ChevronRight size={12}/></button>)}</section>
      <div className={styles.rightStack}>
        <section className={`${styles.panel} ${styles.aiPanel}`}><div className={styles.aiHeader}><div className={styles.aiTitle}><span className={styles.aiOrb}><Sparkles size={14}/></span><div><b>Aeros AI Assistant</b><small>Grounded in the live operation</small></div></div><span className={`${styles.status} ${styles.purple}`}>BETA</span></div>{scenario==='normal'&&!applied?<div className={styles.recommend}><div className={styles.recItem}><span className={styles.recNum}>1</span><div><b>No critical disruption active.</b><span>Click “Plan with AI” to simulate an aircraft grounding and see Aeros recover the day.</span></div><span className={styles.check}><Check size={10}/></span></div></div>:<><div className={styles.alert}><AlertTriangle size={16}/><div><b>Operational Disruption Detected</b><span>N739PD is grounded due to a maintenance issue. This affects 3 upcoming lessons.</span></div></div><div className={styles.recommend}><small>RECOMMENDED ACTIONS</small>{[['Reassign 3 lessons from N739PD','Move L-103, L-104, L-105 to N441CF and N618DA'],['Move L-104 to 14:10','Avoids instructor conflict and maintains duty limits'],['Notify affected students','Send automated notifications to 3 students'],['Update maintenance schedule','N739PD estimated return 16:00']].map((x,i)=><div className={styles.recItem} key={x[0]}><span className={styles.recNum}>{i+1}</span><div><b>{x[0]}</b><span>{x[1]}</span></div><span className={styles.check}>{i<2?<Check size={10}/>:''}</span></div>)}</div><div className={styles.aiFooter}><button className={styles.btn} onClick={reset}>Dismiss</button><button className={`${styles.btn} ${styles.primary}`} onClick={apply}>Apply all recommendations</button></div></>}</section>
        <section className={styles.panel}><div className={styles.panelHead}><div><b>Weather & NOTAMs</b><span>KAVL · 3 active</span></div></div><div className={styles.weather}><div className={styles.weatherHero}><div><b>72°F</b><span>Few clouds · VFR</span></div><CloudSun size={34}/></div><div className={styles.weatherStats}><div><small>Wind</small><b>210° at 8 kt</b></div><div><small>Visibility</small><b>10 sm</b></div><div><small>Altimeter</small><b>29.92 inHg</b></div></div></div></section>
      </div>
    </div>
    <div className={styles.lower}>
      <section className={styles.panel}><div className={styles.panelHead}><div><b>Aircraft Readiness</b><span>View fleet</span></div></div><div className={styles.list}>{fleet.slice(0,4).map(a=><div className={styles.listRow} key={a.tail}><div><b>{a.tail} · {a.type}</b><span>Fuel {a.fuel} · Hobbs {a.hobbs}</span></div><span className={`${styles.pill} ${statusClass(a.status)}`}>{a.status}</span></div>)}</div></section>
      <section className={styles.panel}><div className={styles.panelHead}><div><b>Maintenance Queue</b><span>5 open · 1 overdue</span></div></div><div className={styles.list}>{fleet.slice(1,5).map((a,i)=><div className={styles.listRow} key={a.tail}><div><b>{a.tail}</b><span>{a.maint}</span></div><span className={`${styles.pill} ${i===1?styles.red:styles.gray}`}>{i===1?'Overdue':'Upcoming'}</span></div>)}</div></section>
      <section className={styles.panel}><div className={styles.panelHead}><div><b>Selected Flight</b><span>{selectedFlight.id}</span></div></div><div className={styles.list}><div className={styles.listRow}><div><b>{selectedFlight.route}</b><span>{selectedFlight.time} · {selectedFlight.type}</span></div><span className={`${styles.pill} ${statusClass(selectedFlight.status)}`}>{selectedFlight.status}</span></div><div className={styles.listRow}><div><b>{selectedFlight.aircraft}</b><span>{selectedFlight.crew} · {selectedFlight.customer}</span></div><ChevronRight size={13}/></div></div></section>
    </div>
  </>;
}

function ScheduleView(){
  const [view,setView]=useState('Day');
  const times=['08','09','10','11','12','13','14','15','16'];
  return <><div className={styles.heading}><div><small>PLANNING</small><h1>Schedule</h1><p>Aircraft, instructors, students, maintenance, and weather on one planning surface.</p></div><div className={styles.actions}><button className={styles.btn}>Filters</button><button className={`${styles.btn} ${styles.primary}`}><Sparkles size={14}/>Optimize day</button></div></div><section className={styles.panel}><div className={styles.panelHead}><div><b>Monday, October 5</b><span>Live resource schedule</span></div><div className={styles.tabs}>{['Day','Week','Resource'].map(v=><button key={v} onClick={()=>setView(v)} className={view===v?styles.active:''}>{v}</button>)}</div></div><div className={styles.scheduleBoard}><div className={styles.scheduleDays}><span>Resource</span>{times.map(t=><b key={t}>{t}:00</b>)}</div>{fleet.slice(0,5).map((a,i)=><div className={styles.resourceRow} key={a.tail}><div className={styles.resourceMeta}><b>{a.tail}</b><span>{a.type}</span></div><div className={styles.timeline}>{[0,1,2].map((_,j)=><button key={j} className={`${styles.booking} ${[styles.bookPurple,styles.bookBlue,styles.bookGreen,styles.bookAmber][(i+j)%4]}`} style={{left:`${5+j*27+i*3}%`,width:`${18+(j%2)*7}%`}}><b>{j===0?'L-'+(101+i):j===1?'C-'+(320+i):'MX'}</b><span>{j===2?'Maintenance':'Assigned'}</span></button>)}</div></div>)}</div></section></>;
}

function AircraftView(){
  const [selected,setSelected]=useState(0);
  const a=fleet[selected];
  return <><div className={styles.heading}><div><small>FLEET</small><h1>Aircraft</h1><p>Readiness, utilization, maintenance exposure, fuel, documents, and current assignment.</p></div><div className={styles.actions}><button className={styles.btn}>Import Aircraft</button><button className={`${styles.btn} ${styles.primary}`}><Plus size={14}/>Add Aircraft</button></div></div><div className={styles.cards}>{fleet.map((x,i)=><button key={x.tail} onClick={()=>setSelected(i)} className={`${styles.aircraftCard} ${selected===i?styles.selected:''}`}><div className={styles.aircraftHero}><Plane size={48}/></div><h3>{x.tail}</h3><span>{x.type}</span><div className={styles.cardMetrics}><div><small>Utilization</small><b>{x.util}</b></div><div><small>Fuel</small><b>{x.fuel}</b></div></div><div className={styles.listRow}><div><span>{x.maint}</span></div><span className={`${styles.pill} ${statusClass(x.status)}`}>{x.status}</span></div></button>)}</div><section className={styles.panel} style={{marginTop:12}}><div className={styles.panelHead}><div><b>{a.tail} detail</b><span>{a.type}</span></div></div><div className={styles.lower} style={{padding:12,margin:0}}><div className={styles.kpi}><small>Status</small><b style={{fontSize:18}}>{a.status}</b><span className={styles.trend}>Dispatch state</span></div><div className={styles.kpi}><small>Hobbs</small><b style={{fontSize:18}}>{a.hobbs}</b><span className={styles.trend}>Current hours</span></div><div className={styles.kpi}><small>Next maintenance</small><b style={{fontSize:18}}>{a.maint}</b><span className={styles.trend}>Forecasted impact</span></div></div></section></>;
}

function MaintenanceView(){
  return <><div className={styles.heading}><div><small>MAINTENANCE</small><h1>Maintenance Control</h1><p>Squawks, inspections, downtime, and operational impact in one queue.</p></div><button className={`${styles.btn} ${styles.primary}`}><Plus size={14}/>New work item</button></div><section className={styles.panel}><div className={styles.panelHead}><div><b>Open work</b><span>7 items · 2 require action</span></div><div className={styles.tabs}><button className={styles.active}>Open</button><button>Upcoming</button><button>Completed</button></div></div><div className={styles.maintTable}>{fleet.map((a,i)=><div className={styles.maintRow} key={a.tail}><span className={`${styles.priority} ${i===2?styles.critical:i<2?styles.soon:''}`}/><b>{a.tail}</b><div><small>{a.type}</small><b>{a.maint}</b></div><span>{i===2?'3 flights impacted':i<2?'1 flight exposed':'No immediate impact'}</span><span className={`${styles.pill} ${i===2?styles.red:i<2?styles.purple:styles.gray}`}>{i===2?'Critical':i<2?'Due soon':'Planned'}</span><ChevronRight size={12}/></div>)}</div></section></>;
}

function PeopleView({training=false}){
  const data=training?students:crew;
  return <><div className={styles.heading}><div><small>{training?'TRAINING':'CREW'}</small><h1>{training?'Training Progress':'Crew & Qualifications'}</h1><p>{training?'Progress, prerequisites, stage checks, checkrides, and blockers.':'Availability, qualifications, duty exposure, and assignment readiness.'}</p></div><button className={`${styles.btn} ${styles.primary}`}><Plus size={14}/>Add {training?'Student':'Crew Member'}</button></div><div className={styles.peopleGrid}>{data.map(p=><article className={styles.person} key={p.name}><div className={styles.personTop}><span className={styles.personAvatar}>{p.name.split(' ').map(x=>x[0]).join('')}</span><div><b>{p.name}</b><span>{training?p.program:p.role}</span></div><span className={`${styles.pill} ${statusClass(p.status)}`} style={{marginLeft:'auto'}}>{p.status}</span></div><div className={styles.progress}><i style={{width:`${p.progress}%`}}/></div><div className={styles.listRow}><div><span>{training?'Next milestone':'Duty today'}</span><b>{training?p.next:p.duty}</b></div><span>{p.progress}%</span></div>{!training&&<div className={styles.listRow}><div><span>Qualifications</span><b>{p.qual}</b></div></div>}</article>)}</div></>;
}

function AnalyticsView(){
  const bars=[42,58,76,64,88,72,95,81,69,91,77,86];
  return <><div className={styles.heading}><div><small>INSIGHTS</small><h1>Operational Analytics</h1><p>Utilization, recovery, throughput, cancellations, and where capacity is being lost.</p></div><div className={styles.actions}><button className={styles.btn}>Last 30 days</button><button className={styles.btn}>Export</button></div></div><Kpis scenario="normal"/><div className={styles.analyticsGrid}><section className={styles.panel}><div className={styles.panelHead}><div><b>Aircraft Utilization</b><span>Daily utilization by fleet</span></div></div><div className={styles.chart}>{bars.map((h,i)=><div className={styles.bar} key={i}><i style={{height:`${h}%`}}/><i style={{height:`${Math.max(18,h-24)}%`}}/></div>)}</div></section><section className={styles.panel}><div className={styles.panelHead}><div><b>Recovery Outcomes</b><span>AI-assisted disruption handling</span></div></div><div className={styles.list}>{[['Flights recovered','43','+18%'],['Average recovery time','2m 14s','-41%'],['Manual changes avoided','126','+33%'],['At-risk revenue preserved','$18.4k','+12%']].map(x=><div className={styles.listRow} key={x[0]}><div><span>{x[0]}</span><b>{x[1]}</b></div><span className={styles.trend}>{x[2]}</span></div>)}</div></section></div></>;
}

function AerosAI(){
  const prompts=[['Recover today’s schedule','Ground N739PD and show me the least disruptive plan.'],['Protect tomorrow morning','Find weather, maintenance, or staffing risks before 10 AM.'],['Increase utilization','Where are we leaving aircraft capacity unused this week?'],['Training blockers','Which students are at risk of missing progression targets?']];
  const [active,setActive]=useState(0);
  return <><div className={styles.heading}><div><small>AEROS INTELLIGENCE</small><h1>Aeros AI</h1><p>An operations agent grounded in your schedule, aircraft, crew, maintenance, weather, and training state.</p></div></div><div className={styles.agentWorkspace}><section className={styles.panel}><div className={styles.panelHead}><div><b>Suggested workflows</b><span>Start with a real operational question</span></div></div><div className={styles.promptList}>{prompts.map((p,i)=><button key={p[0]} onClick={()=>setActive(i)} className={`${styles.promptBtn} ${active===i?styles.active:''}`}><b>{p[0]}</b><span>{p[1]}</span></button>)}</div></section><section className={styles.panel}><div className={styles.chat}><div className={styles.chatHead}><span className={styles.aiOrb}><Sparkles size={14}/></span><div><b>Aeros AI</b><div style={{fontSize:8,color:'#7b8294'}}>Grounded in Prestige Aviation’s live operation</div></div></div><div className={`${styles.chatBubble} ${styles.userBubble}`}>{prompts[active][1]}</div><div className={`${styles.chatBubble} ${styles.aiBubble}`}>I checked today’s schedule, aircraft readiness, instructor qualifications, maintenance limits, and current weather. I found a feasible plan that preserves the most flying while minimizing downstream disruption.<div className={styles.aiActions}><button className={styles.btn}>Show impact</button><button className={`${styles.btn} ${styles.primary}`}>Open recovery plan</button></div></div></div></section></div></>;
}

export default function Dashboard(){
  const [active,setActive]=useState('Command Center');
  const [scenario,setScenario]=useState('normal');
  const [toast,setToast]=useState('');
  function go(name){setActive(name);setToast(name==='Messages'?'Messaging workspace coming next':'');if(name==='Messages')setTimeout(()=>setToast(''),1800)}
  return <div className={styles.page}><Sidebar active={active} setActive={go}/><main className={styles.main}><Header active={active}/><div className={styles.content}>{active==='Command Center'&&<CommandCenter scenario={scenario} setScenario={setScenario}/>} {active==='Schedule'&&<ScheduleView/>} {active==='Aircraft'&&<AircraftView/>} {active==='Maintenance'&&<MaintenanceView/>} {active==='Crew'&&<PeopleView/>} {active==='Training'&&<PeopleView training/>} {active==='Analytics'&&<AnalyticsView/>} {active==='Aeros AI'&&<AerosAI/>} {active==='Messages'&&<AerosAI/>} {active==='Settings'&&<AircraftView/>}</div></main>{toast&&<div className={styles.toast}>{toast}</div>}</div>;
}
