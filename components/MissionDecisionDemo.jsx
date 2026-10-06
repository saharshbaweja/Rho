'use client';
import {useState} from 'react';
import {AlertTriangle,BookOpen,Check,CloudSun,FileText,MapPin,Plane,RadioTower,ShieldCheck,UsersRound,Wrench} from 'lucide-react';

const rows=[
 {label:'Runway availability',input:'RWY 27R construction',rule:'Airport / NOTAM',result:'REVIEW',tone:'warn'},
 {label:'Crosswind',input:'31 kt forecast',rule:'Company limit 35 kt',result:'PASS',tone:'good'},
 {label:'Crew legality',input:'8h 12m duty',rule:'Operator duty window',result:'PASS',tone:'good'},
 {label:'Aircraft eligibility',input:'MEL 32-01 open',rule:'No route restriction',result:'PASS',tone:'good'},
 {label:'Destination minima',input:'Ceiling trending lower',rule:'Company minima §7.3',result:'REVIEW',tone:'warn'},
];

const layers={
 Route:{title:'Route',subtitle:'KTEB → EGLL',note:'Mission geometry, airports and timing.'},
 Weather:{title:'Weather',subtitle:'Convective band · 18:00–00:00Z',note:'Only mission-relevant conditions are highlighted.'},
 NOTAMs:{title:'NOTAMs',subtitle:'2 material · 17 informational',note:'Aeros ranks operational impact instead of showing a raw list.'},
 Rules:{title:'Operator rules',subtitle:'7 rules matched',note:'OpSpecs, GOM, MEL/CDL and company minima applied to this flight.'}
};

export default function MissionDecisionDemo({compact=false}){
 const [layer,setLayer]=useState('Route');
 const [selected,setSelected]=useState(0);
 const [ack,setAck]=useState(false);
 return <div className={'studio-demo '+(compact?'compact':'')}>
  <div className="studio-demo-top">
   <div className="studio-demo-brand"><span>A</span><b>Aeros Ops</b></div>
   <div className="studio-demo-tabs"><button className="active">Flights</button><button>Changes <i>3</i></button><button>Rules</button><button>Briefs</button></div>
   <div className="studio-demo-live"><i/>20:17:41 UTC</div>
  </div>
  <div className="studio-demo-body">
   <aside className="studio-demo-rail">
    <div className="studio-rail-title">ACTIVE MISSIONS <span>6</span></div>
    {[['AO-1842','KTEB → EGLL','Review'],['AO-1841','KJFK → LSGG','Clear'],['AO-1840','KLAX → RJTT','Clear'],['AO-1837','KSEA → YSSY','Action']].map((m,i)=><button className={i===0?'active':''} key={m[0]}><small>{m[0]}</small><b>{m[1]}</b><em className={m[2].toLowerCase()}>{m[2]}</em></button>)}
   </aside>
   <section className="studio-demo-map">
    <div className="studio-map-head"><div><small>MISSION AO-1842</small><b>KTEB → EGLL</b><span>G650 · N650AB · Chen / Russo</span></div><em>REVIEW REQUIRED</em></div>
    <div className="studio-map-layer-tabs">{Object.keys(layers).map(x=><button className={layer===x?'active':''} onClick={()=>setLayer(x)} key={x}>{x}</button>)}</div>
    <div className={'studio-map-canvas '+layer.toLowerCase()}>
      <div className="studio-glow g1"/><div className="studio-glow g2"/>
      {layer==='Weather'&&<><div className="studio-weather w1"/><div className="studio-weather w2"/></>}
      {layer==='NOTAMs'&&<><span className="studio-notam n1">!</span><span className="studio-notam n2">!</span></>}
      {layer==='Rules'&&<div className="studio-rule-cloud"><span>OpSpec C070</span><span>GOM §4.12</span><span>MEL 32-01</span><span>Company Minima §7.3</span></div>}
      <svg viewBox="0 0 1000 420" preserveAspectRatio="none" aria-hidden="true"><path className="studio-route-shadow" d="M90 320 C 300 190 620 185 910 100"/><path className="studio-route-line" d="M90 320 C 300 190 620 185 910 100"/><circle cx="90" cy="320" r="7" className="studio-route-dot"/><circle cx="910" cy="100" r="7" className="studio-route-dot"/><g className="studio-plane"><text x="0" y="0">✈</text><animateMotion dur="8s" repeatCount="indefinite" path="M90 320 C 300 190 620 185 910 100"/></g></svg>
      <div className="studio-airport origin"><b>KTEB</b><span>Teterboro</span></div><div className="studio-airport destination"><b>EGLL</b><span>London</span></div>
      <div className="studio-layer-caption"><small>{layers[layer].title}</small><b>{layers[layer].subtitle}</b><span>{layers[layer].note}</span></div>
    </div>
    <div className="studio-map-metrics">{[['ETE','5h 52m'],['Distance','5,973 km'],['Cruise','FL410'],['ETA','22:15 BST'],['Fuel','28,400 lb']].map(([a,b])=><div key={a}><span>{a}</span><b>{b}</b></div>)}</div>
   </section>
   <section className="studio-demo-decision">
    <div className="studio-decision-head"><div><small>MISSION DECISION</small><h3>2 items need review</h3></div><span className="review-dot">● Live</span></div>
    <div className="studio-status-row">{[[CloudSun,'Weather','REVIEW'],[RadioTower,'NOTAMs','ACTION'],[BookOpen,'Rules','CLEAR'],[UsersRound,'Crew','CLEAR'],[Plane,'Aircraft','CLEAR']].map(([I,t,s])=><div key={t}><I size={12}/><span>{t}</span><b className={s==='CLEAR'?'good':'warn'}>{s}</b></div>)}</div>
    <div className="studio-action-card"><div><AlertTriangle size={13}/><span><small>ACTION REQUIRED</small><b>Arrival runway availability needs review</b></span></div><p>Construction and the latest arrival estimate overlap the reviewed operating window.</p><div className="studio-sources"><span>NOTAM EGLL A1234/24</span><span>Company Minima §7.3</span></div></div>
    <div className="studio-impact-head"><span>IMPACT ANALYSIS</span><b>DECISION TRACE</b></div>
    <div className="studio-impact-list">{rows.map((r,i)=><button className={selected===i?'active':''} onClick={()=>setSelected(i)} key={r.label}><span className={'result-icon '+r.tone}>{r.tone==='good'?<Check size={11}/>:<AlertTriangle size={11}/>}</span><span><b>{r.label}</b><small>{r.input}</small></span><span className="rule-col">{r.rule}</span><em className={r.tone}>{r.result}</em></button>)}</div>
    <div className="studio-verdict"><small>VERDICT</small><h4>Mission may proceed after 2 review items are resolved.</h4><p>{rows[selected].label}: {rows[selected].input} · {rows[selected].rule}.</p><div><button className="secondary" onClick={()=>setAck(!ack)}>{ack?'Acknowledged':'Acknowledge'}</button><button className="primary">Open review</button></div></div>
   </section>
  </div>
 </div>
}
