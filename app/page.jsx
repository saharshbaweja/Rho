'use client';
import {useRef,useState} from 'react';
import Link from 'next/link';
import {Activity,AlertTriangle,ArrowUpRight,BookOpen,Check,CloudSun,FileCheck2,FileText,MapPin,Plane,Plus,RadioTower,SearchCheck,ShieldCheck,Sparkles,UsersRound,Wrench} from 'lucide-react';

const missions=[
 ['AO-1842','KTEB → EGLL','Ready','16:20Z'],
 ['AO-1841','KJFK → LSGG','Review','18:05Z'],
 ['AO-1840','KLAX → RJTT','Ready','09:30Z'],
 ['AO-1839','EBBR → KJFK','Planning','11:15Z'],
 ['AO-1838','OMDB → LFPG','Ready','04:10Z']
];
const statuses=[['Weather','CLEAR','good'],['NOTAMs','2 REVIEW','warn'],['Rules','COMPLIANT','good'],['Crew','LEGAL','good'],['Aircraft','READY','good'],['Destination','CLEAR','good']];
const findings=[
 ['!','Arrival runway construction','Runway 27R construction overlaps the planned arrival window. Review runway options and fuel.','NOTAM A1234/24','warn'],
 ['!','Moderate convective activity','Forecast guidance shows a convective band along the current North Atlantic track.','NOAA SIGWX','warn'],
 ['✓','Crew rest within limits','Assigned crew remains inside reviewed duty and rest requirements.','Crew duty record','good']
];

function OrbitSystem(){
 const ref=useRef(null);
 const move=(e)=>{const r=ref.current?.getBoundingClientRect();if(!r)return;const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;ref.current.style.transform=`rotateX(${y*-8}deg) rotateY(${x*10}deg)`};
 const leave=()=>{if(ref.current)ref.current.style.transform='rotateX(0deg) rotateY(0deg)'};
 return <div className="studio-orbit-stage" onMouseMove={move} onMouseLeave={leave}>
  <div className="studio-orbit" ref={ref}>
   <div className="studio-orbit-ring"/><div className="studio-orbit-ring two"/><div className="studio-orbit-ring three"/>
   <div className="studio-orbit-core"/>
   <div className="studio-orbit-plane">✈</div>
   <div className="studio-orbit-node n1"><b>OpSpecs + manuals</b><span>Operator-specific authorizations and procedures.</span><strong>✓ source controlled</strong></div>
   <div className="studio-orbit-node n2"><b>Live environment</b><span>Weather, NOTAMs, airports and charts.</span><strong>● live</strong></div>
   <div className="studio-orbit-node n3"><b>Crew + aircraft</b><span>Legality, duty, maintenance and tail state.</span><strong>✓ mission matched</strong></div>
   <div className="studio-orbit-node n4"><b>Mission brief</b><span>One review surface with evidence attached.</span><strong>→ ready to review</strong></div>
  </div>
  <div className="studio-hero-caption">OPERATOR RULES × LIVE DATA × MISSION STATE</div>
 </div>
}

function ProductWindow({mode}){
 const [mission,setMission]=useState(0);
 const m=missions[mission];
 return <div className="studio-browser">
  <div className="studio-browser-top"><div className="studio-browser-brand"><i>A</i>AEROS</div><div className="studio-browser-search">⌘ K&nbsp;&nbsp; Search missions, airports, crew, rules or ask Aeros</div><div className="studio-browser-user">Prestige Aviation · Ops</div></div>
  <div className="studio-app">
   <aside className="studio-app-nav"><small>OPERATE</small>{['Missions','Mission Brief','Change Monitor','Live Data'].map((x,i)=><button className={i===0?'active':''} key={x}>{x}</button>)}<small>KNOWLEDGE</small>{['Rules & Manuals','Crew','Aircraft','Compliance'].map(x=><button key={x}>{x}</button>)}</aside>
   <aside className="studio-missions"><div className="studio-missions-head"><b>Missions</b><button><Plus size={12}/></button></div>{missions.map((x,i)=><div className={'studio-mission-card '+(mission===i?'active':'')} onClick={()=>setMission(i)} key={x[0]}><div><b>{x[0]}</b><span>{x[3]}</span></div><strong>{x[1]}</strong><span>{x[2]}</span></div>)}</aside>
   <main className="studio-mainpane">
    <div className="studio-mission-head"><div><small>MISSION {m[0]} · PART 135</small><h3>{m[1]}</h3><p>Gulfstream G650 · N650AB · Chen / Russo · 4 passengers</p></div><span className="studio-pill">{m[2].toUpperCase()}</span></div>
    {mode==='changes'?<ChangeView/>:mode==='rules'?<RulesView/>:<><div className="studio-status-row">{statuses.map(([a,b,t])=><div className={'studio-status '+t} key={a}><span>{a}</span><b>{b}</b></div>)}</div><MissionMap/><DecisionStack/></>}
   </main>
   <aside className="studio-sidecar"><div className="studio-ai-head"><i><Sparkles size={12}/></i><div><b>Aeros Intelligence</b><span>Grounded in {m[0]}</span></div></div><div className="studio-ai-question">Why does this mission need review?</div><div className="studio-ai-answer">Two current conditions could materially affect the planned arrival. Aeros traced both to the live sources below and kept the rest of the mission state unchanged.</div><div className="studio-ai-source"><b>NOTAM EGLL A1234/24</b><span>Runway 27R construction · arrival impact</span></div><div className="studio-ai-source"><b>NOAA SIGWX Forecast</b><span>Convective activity · current route</span></div><div className="studio-ai-source"><b>Operator rule set</b><span>Relevant approval requirements matched</span></div></aside>
  </div>
 </div>
}

function MissionMap(){return <div className="studio-map"><div className="studio-map-city a"><b>KTEB</b><span>Teterboro</span></div><div className="studio-map-city b"><b>EGLL</b><span>London Heathrow</span></div><svg viewBox="0 0 1000 350" preserveAspectRatio="none"><path className="path" d="M95 250 C340 145 620 150 905 85"/></svg><div className="studio-map-plane">✈</div><div className="studio-map-metrics">{[['Distance','5,973 km'],['Flight time','5h 52m'],['Altitude','FL410'],['ETA','22:15'],['Fuel','28,400 lb']].map(([a,b])=><div key={a}><span>{a}</span><b>{b}</b></div>)}</div></div>}
function DecisionStack(){return <div className="studio-decision"><div className="studio-decision-head"><b>Decision stack</b><span>2 items need attention</span></div>{findings.map(([icon,t,b,s,tone])=><div className={'studio-finding '+(tone==='good'?'good':'')} key={t}><i>{icon}</i><div><b>{t}</b><p>{b}</p></div><span>{s}</span></div>)}</div>}
function ChangeView(){return <div className="studio-decision"><div className="studio-decision-head"><b>Changes since previous review</b><span>3 material deltas</span></div>{[['18:42Z','NOTAM','Runway closure window extended','Airport review affected'],['18:40Z','Weather','Destination forecast amended','Alternate planning affected'],['18:34Z','Aircraft','MEL record refreshed','No new restriction']].map((x,i)=><div className={'studio-finding '+(i===2?'good':'')} key={x[1]}><i>{i===2?'✓':'!'}</i><div><b>{x[1]} · {x[2]}</b><p>{x[3]} · {x[0]}</p></div><span>{i===2?'clear':'review'}</span></div>)}</div>}
function RulesView(){return <div className="studio-decision"><div className="studio-decision-head"><b>Applicable operator knowledge</b><span>7 rules matched</span></div>{[['C070','Special airport authorization','Destination requires company review before acceptance.'],['GOM §4.12','Alternate planning','Destination forecast triggers company planning criteria.'],['MEL 32-01','Deferred item','No restriction identified for this mission.'],['Company minima','Arrival review','Crew must review winds and runway status.']].map((x,i)=><div className={'studio-finding '+(i===2?'good':'')} key={x[0]}><i>{i===2?'✓':'!'}</i><div><b>{x[0]} · {x[1]}</b><p>{x[2]}</p></div><span>source</span></div>)}</div>}

const productModes=[
 {key:'mission',title:'Mission intelligence',sub:'The operating picture for one flight.'},
 {key:'rules',title:'Operator knowledge',sub:'Rules matched to the mission.'},
 {key:'changes',title:'Change monitor',sub:'Only the deltas that matter.'}
];

function KnowledgeGraph(){return <div className="studio-knowledge"><div className="studio-knowledge-grid"/><svg viewBox="0 0 1000 650" preserveAspectRatio="none"><path d="M180 150 C330 215 400 270 500 325"/><path d="M820 130 C690 205 610 250 500 325"/><path d="M825 515 C690 450 610 390 500 325"/><path d="M180 500 C315 440 390 380 500 325"/><path d="M500 70 C500 170 500 235 500 325"/></svg><div className="studio-knowledge-core">MISSION<br/>CONTEXT</div><div className="studio-knowledge-node k1"><b>OpSpecs + GOM</b><span>Approved authorizations, procedures, company minimums.</span></div><div className="studio-knowledge-node k2"><b>Weather + NOTAMs</b><span>Live conditions filtered against timing and route.</span></div><div className="studio-knowledge-node k3"><b>Aircraft state</b><span>MEL/CDL, inspection windows, dispatch availability.</span></div><div className="studio-knowledge-node k4"><b>Crew legality</b><span>Qualification, currency, duty and operator requirements.</span></div><div className="studio-knowledge-node k5"><b>Airport + charts</b><span>Runways, procedures, restrictions and current references.</span></div></div>}

export default function Home(){
 const [mode,setMode]=useState('mission');
 return <div className="studio-home">
  <section className="studio-hero"><div className="studio-wrap studio-hero-grid"><div><div className="studio-kicker">MISSION INTELLIGENCE FOR PART 135</div><h1 className="studio-title">Operational complexity,<br/><em>made obvious.</em></h1><p className="studio-lede">Aeros connects operator rules, crew and aircraft state, weather, NOTAMs, airports and charts—then turns them into one mission-specific review surface with evidence attached.</p><div className="studio-hero-actions"><Link className="studio-btn-dark" href="/contact/">Request a demo <ArrowUpRight size={13}/></Link><Link className="studio-btn-light" href="/dashboard/">Explore the live workspace</Link></div><div className="studio-proof"><span><i>✓</i>Part 135 focused</span><span><i>✓</i>Source-backed</span><span><i>✓</i>Human-controlled</span></div></div><OrbitSystem/></div></section>

  <div className="studio-band"><div className="studio-band-inner"><span>ONE MISSION · EVERY RELEVANT SOURCE</span><div className="studio-band-items">{['OPSPECS','GOM','MEL / CDL','CREW','AIRCRAFT','WEATHER','NOTAMS','CHARTS'].map(x=><b key={x}>{x}</b>)}</div></div></div>

  <section className="studio-section white"><div className="studio-wrap"><div className="studio-section-head"><div><div className="studio-kicker">THE PRODUCT</div><h2>See the mission first. Drill into evidence second.</h2></div><p>The interface is intentionally structured like an operations desk, not a chat window. Status is stable, changes are explicit, and every material conclusion can be traced to the exact source that caused it.</p></div><div className="studio-product-stage"><div className="studio-product-nav">{productModes.map(x=><button className={mode===x.key?'active':''} onClick={()=>setMode(x.key)} key={x.key}><span><b>{x.title}</b><small>{x.sub}</small></span><span>↗</span></button>)}</div><ProductWindow mode={mode}/></div></div></section>

  <section className="studio-section"><div className="studio-wrap"><div className="studio-section-head"><div><div className="studio-kicker">AVIATION, VISUALLY EXPLAINED</div><h2>Every screen answers one operational question.</h2></div><p>The design system uses hierarchy, motion and state—not decoration—to make dense aviation information faster to understand. The goal is fewer tabs, fewer rereads and less memory-dependent coordination.</p></div><div className="studio-gallery"><div className="studio-photo"><img src="https://images.pexels.com/photos/10070371/pexels-photo-10070371.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Aircraft cockpit above clouds"/><div className="studio-photo-copy"><small>MISSION CONTEXT</small><h3>Built around how operators actually review a flight.</h3></div></div><div className="studio-stack"><article className="studio-stack-card"><div className="studio-kicker">CHANGE INTELLIGENCE</div><h3>What changed—not everything again.</h3><p>Weather, NOTAMs, arrival timing, aircraft and crew updates are converted into an impact review instead of another full manual scan.</p><div className="studio-stack-visual"><div className="studio-stack-line"/><div className="studio-stack-line"/><div className="studio-stack-line"/><div className="studio-stack-line"/></div></article><article className="studio-stack-card dark"><div className="studio-kicker">SOURCE TRACEABILITY</div><h3>Every answer keeps its evidence.</h3><p>Operators see the rule, live fact and resulting conclusion together. AI explains; the structured workspace remains the operational record.</p><div className="studio-stack-visual"><div className="studio-stack-line"/><div className="studio-stack-line"/><div className="studio-stack-line"/><div className="studio-stack-line"/></div></article></div></div></div></section>

  <section className="studio-section dark"><div className="studio-wrap"><div className="studio-section-head"><div><div className="studio-kicker">THE KNOWLEDGE LAYER</div><h2>Your manuals and live operating environment become one mission graph.</h2></div><p>Aeros does not rely on generic aviation knowledge. Each operator has a controlled rule layer and connected data sources that are evaluated against the specific aircraft, crew, route, airport and timing of the mission.</p></div><KnowledgeGraph/></div></section>

  <section className="studio-section white"><div className="studio-wrap"><div className="studio-section-head"><div><div className="studio-kicker">FROM REQUEST TO WHEELS UP</div><h2>One continuous review loop.</h2></div><p>Start beside the tools the operator already uses. Aeros structures the mission, evaluates the relevant context, prepares the brief, then keeps monitoring until departure.</p></div><div className="studio-workflow">{[[FileText,'01','Request','Create or import a mission request.'],[SearchCheck,'02','Evaluate','Match operator rules and live sources.'],[FileCheck2,'03','Brief','Prepare a cited review surface.'],[Activity,'04','Monitor','Surface only meaningful changes.']].map(([Icon,n,t,d])=><article key={n}><span>{n}</span><i><Icon size={14}/></i><h3>{t}</h3><p>{d}</p></article>)}</div></div></section>

  <section className="studio-section"><div className="studio-wrap"><div className="studio-section-head"><div><div className="studio-kicker">WHAT EXPANDS FROM HERE</div><h2>Mission intelligence first. The operating layer follows.</h2></div><p>Once Aeros understands the mission, the same context can power scheduling recovery, maintenance impact, targeted crew messaging, post-flight reconciliation and operational analytics without bloating the day-one product.</p></div><div className="studio-gallery"><div className="studio-stack"><article className="studio-stack-card"><Wrench size={20}/><h3>Maintenance impact</h3><p>When tail status changes, identify exactly which missions and approvals need to be revisited.</p></article><article className="studio-stack-card"><UsersRound size={20}/><h3>Crew coordination</h3><p>Route mission changes only to the people whose work or legality is actually affected.</p></article></div><div className="studio-photo"><img src="https://images.unsplash.com/photo-1738465403259-d330d61dfa69?auto=format&fit=crop&w=1800&q=85" alt="Aircraft flying through clouds"/><div className="studio-photo-copy"><small>THE LONG ARC</small><h3>An operating layer that understands the flight before it automates around it.</h3></div></div></div></div></section>

  <section className="studio-footer-cta"><div className="studio-wrap studio-footer-grid"><div><div className="studio-kicker">PART 135 DESIGN PARTNERS</div><h2>Bring us one mission your team still reviews by hand.</h2></div><div className="studio-footer-actions"><Link className="studio-btn-dark" href="/contact/">Work with Aeros</Link><Link className="studio-btn-light" href="/dashboard/">Open product</Link></div></div></section>
 </div>
}
