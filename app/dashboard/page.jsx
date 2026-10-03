'use client';
import {useState} from 'react';
import {Plane,CalendarDays,Wrench,Users,BarChart3,CloudRain,Fuel,GraduationCap,Command,ChevronRight,CheckCircle2} from 'lucide-react';

const rows=[['07:30','AER101','KAVL → KCLT','N905CR','Departed'],['09:15','FS0202','KAVL → KJFK','N712AS','Boarding'],['10:30','TNG301','KAVL → KGSP','N458CD','In progress'],['12:00','CHAR77','KCLT → KPBI','N905CR','Scheduled'],['14:20','TNG304','KAVL → KCHA','N287MA','Scheduled'],['16:00','AER108','KCHA → KAVL','N712AS','Scheduled']];

export default function Dashboard(){
 const [nav,setNav]=useState('Operations');
 const [selected,setSelected]=useState(2);
 const [notice,setNotice]=useState(true);
 return <div className="app-shell-full">
   <aside className="app-side"><div className="app-logo"><Plane size={16}/><b>AEROS</b></div>{[[Command,'Operations'],[CalendarDays,'Schedule'],[Plane,'Aircraft'],[Wrench,'Maintenance'],[Users,'Crew'],[GraduationCap,'Students'],[Fuel,'Billing'],[BarChart3,'Reports']].map(([I,t])=><button className={nav===t?'active':''} onClick={()=>setNav(t)} key={t}><I size={15}/>{t}</button>)}</aside>
   <main className="app-main"><div className="app-top"><div><small>{nav.toUpperCase()}</small><h1>{nav==='Operations'?'Today':nav}</h1></div><div className="app-top-actions"><span>☀ KAVL · 72°F · VFR</span><button>+ New flight</button><i>JD</i></div></div>
   <div className="app-kpis"><div><small>Today’s flights</small><b>12</b><span>2 in progress · 5 upcoming</span></div><div><small>Aircraft utilization</small><b>68%</b><span>↑ 12% from last week</span></div><div><small>Revenue MTD</small><b>$284,620</b><span>↑ 18% from last month</span></div><div><small>On-time performance</small><b>96%</b><span>↑ 4% this month</span></div></div>
   <div className="app-content-grid"><section className="app-table"><div className="panel-head"><b>Today’s Flights</b><span>● Live</span></div>{rows.map((r,i)=><button className={selected===i?'selected':''} onClick={()=>setSelected(i)} key={i}><span>{r[0]}</span><b>{r[1]}</b><span>{r[2]}</span><span>{r[3]}</span><i>{r[4]}</i></button>)}</section><section className="app-weather"><div className="panel-head"><b>Weather & NOTAMs</b><span>3 active</span></div><div className="dashboard-map"><span className="dm1">KAVL</span><span className="dm2">KCLT</span><span className="dm3">KGSP</span><Plane size={24}/><div className="wx-cell"/></div></section></div>
   <div className="app-lower"><section><div className="panel-head"><b>Aircraft</b><span>View all →</span></div><p>N905CR <b>Available</b></p><p>N712AS <b>In flight</b></p><p>N456CD <b>Available</b></p></section><section><div className="panel-head"><b>Maintenance</b><span>View all →</span></div><p>N456CD <b>100-hr inspection</b></p><p>N905CR <b>Annual inspection</b></p><p>N712AS <b className="danger">Overdue</b></p></section><section><div className="panel-head"><b>Students</b><span>View all →</span></div><p>Emma Wilson <b>Ready</b></p><p>Liam Chen <b>In progress</b></p><p>Sophia Martinez <b>Scheduled</b></p></section></div>
   {notice&&<div className="dashboard-ai"><span>A</span><div><small>AEROS AI</small><b>N172GT is grounded. I found a recovery plan for 3 affected flights.</b><p>Swap two lessons to N441CF and delay one by 40 minutes while preserving training prerequisites.</p></div><button onClick={()=>setNotice(false)}>Apply plan <ChevronRight size={13}/></button></div>}
   <div className="dashboard-proof"><CheckCircle2 size={14}/> Prototype dashboard — illustrative operational data.</div>
   </main>
 </div>
}