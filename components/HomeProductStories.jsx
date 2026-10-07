import {AlertTriangle,BookOpen,Check,ChevronRight,CloudSun,FileCheck2,Mail,Plane,RadioTower,RefreshCw,ShieldCheck,UsersRound,Wrench} from 'lucide-react';

const Status=({tone='good',children})=><span className={'story-status '+tone}>{children}</span>;

function IntakeVisual(){return <div className="story-ui intake-ui">
 <div className="story-windowbar"><span/><span/><span/><b>Mission intake</b></div>
 <div className="intake-grid">
  <div className="intake-inbox"><small>INCOMING REQUEST</small><div className="mail-card"><div><Mail size={14}/><b>Charter request · Aspen</b><span>ops@broker.com · 2 min ago</span></div><p>4 passengers · KPDK → KASE · tomorrow 14:30Z · return same day</p><div className="mail-meta"><span>PDF itinerary</span><span>Passenger manifest</span></div></div><div className="parse-line"><span>Parsing mission context</span><b>Complete</b></div></div>
  <div className="intake-arrow">→</div>
  <div className="mission-created"><small>MISSION CREATED</small><h4>AO-2418</h4><strong>KPDK → KASE</strong><p>Citation CJ3 · N905CR</p><div className="created-facts"><span><b>14:30Z</b> departure</span><span><b>4</b> passengers</span><span><b>Smith / Lopez</b> assigned crew</span></div><div className="source-pills"><span>OpSpecs</span><span>GOM</span><span>Weather</span><span>NOTAMs</span><span>Crew</span><span>Aircraft</span></div></div>
 </div>
</div>}

function ImpactVisual(){const rows=[
 ['Runway suitability','RWY 33 closed · RWY 15 works active','Airport + NOTAM','review'],
 ['Destination minima','Ceiling trending below company threshold','GOM §4.12','review'],
 ['Crew legality','8h 12m projected duty','Crew record','good'],
 ['Aircraft eligibility','MEL 32-01 open · no route restriction','MEL 32-01','good'],
 ['Approach authorization','RNAV (GPS) Y RWY 15 available','OpSpec C052','good']
];return <div className="story-ui impact-ui"><div className="story-windowbar"><span/><span/><span/><b>Impact analysis</b></div><div className="impact-head"><div><small>AO-2418 · KPDK → KASE</small><h4>2 items need review</h4></div><Status tone="review">REVIEW REQUIRED</Status></div><div className="impact-table"><div className="impact-cols"><span>CHECK</span><span>CURRENT CONDITION</span><span>APPLIED RULE</span><span>STATE</span></div>{rows.map(([a,b,c,t])=><div className="impact-row" key={a}><span className={'impact-icon '+t}>{t==='good'?<Check size={12}/>:<AlertTriangle size={12}/>}</span><span><b>{a}</b><small>{b}</small></span><span>{c}</span><Status tone={t}>{t==='good'?'PASS':'REVIEW'}</Status></div>)}</div></div>}

function OptionsVisual(){const options=[
 ['01','Add KDEN alternate','Preserves departure · revised release','0m','+420 lb','Low','Recommended'],
 ['02','Delay departure 55 min','Wait for forecast improvement','+55m','—','Low',''],
 ['03','Use KEGE + ground transfer','Avoid destination weather issue','0m','+180 lb','Medium','']
];return <div className="story-ui options-ui"><div className="story-windowbar"><span/><span/><span/><b>Operational options</b></div><div className="options-head"><div><small>AI OPTION TABLE</small><h4>Three viable paths forward.</h4><p>Ranked against operator rules, crew legality, aircraft state and current conditions.</p></div><span className="recalc"><RefreshCw size={12}/> Live</span></div><div className="option-table"><div className="option-cols"><span>OPTION</span><span>DELAY</span><span>FUEL</span><span>RISK</span><span/></div>{options.map(([n,t,d,delay,fuel,risk,rec],i)=><div className={'option-row '+(i===0?'recommended':'')} key={n}><span className="option-number">{n}</span><span><b>{t}{rec&&<em>{rec}</em>}</b><small>{d}</small></span><span><small>Delay</small><b>{delay}</b></span><span><small>Fuel</small><b>{fuel}</b></span><span><small>Risk</small><b>{risk}</b></span><ChevronRight size={13}/></div>)}</div><div className="option-footer"><span><ShieldCheck size={13}/> Each option preserves the supporting source trail.</span><button>Compare options</button></div></div>}

function BriefVisual(){return <div className="story-ui brief-ui"><div className="story-windowbar"><span/><span/><span/><b>Dispatcher + pilot brief</b></div><div className="brief-grid"><aside><div className="brief-title"><small>AO-2418</small><h4>KPDK → KASE</h4><Status tone="review">CONDITIONAL</Status></div><div className="brief-meta"><span><Plane size={12}/> N905CR · CJ3</span><span><UsersRound size={12}/> Smith / Lopez</span><span><CloudSun size={12}/> KASE MVFR</span></div><div className="brief-actions"><b>2 actions before release</b><label><span>01</span><p>Confirm alternate selection</p><Check size={11}/></label><label><span>02</span><p>Chief Pilot review of special-airport requirement</p><span className="open-dot"/></label></div></aside><section><small>MISSION BRIEF</small><h5>What the crew needs to know</h5><div className="brief-block"><span className="amber-line"/><div><b>Destination weather</b><p>Forecast trends below company planning threshold after 21Z. Alternate required under GOM §4.12.</p><em>GOM §4.12 · KASE TAF 071720Z</em></div></div><div className="brief-block"><span className="red-line"/><div><b>Runway notice</b><p>RWY 33 closure overlaps the expected arrival window. Review arrival procedure and taxi impact.</p><em>KASE NOTAM 10/114</em></div></div><div className="brief-block"><span className="green-line"/><div><b>Crew + aircraft</b><p>Assigned crew legal. Current deferred item does not restrict this mission.</p><em>Crew record · MEL 32-01</em></div></div></section></div></div>}

function MonitorVisual(){const items=[['18:40Z','Weather','KASE TAF amended','Ceiling forecast lowered during expected arrival.','review'],['18:42Z','NOTAM','RWY 33 closure extended','Arrival runway plan needs another review.','danger'],['18:43Z','Mission','ETA +14m','Weather + runway conclusions recalculated.','review'],['18:44Z','Aeros','2 conclusions changed','Crew and aircraft state remain clear.','good']];return <div className="story-ui monitor-ui"><div className="story-windowbar"><span/><span/><span/><b>Continuous monitoring</b></div><div className="monitor-head"><div><small>CHANGE MONITOR</small><h4>Only show what changed.</h4></div><span><i/> Monitoring AO-2418</span></div><div className="monitor-body"><div className="change-feed">{items.map(([time,type,title,detail,tone])=><div className="change-item" key={time+title}><span className={'change-dot '+tone}/><time>{time}</time><div><small>{type}</small><b>{title}</b><p>{detail}</p></div></div>)}</div><aside><small>RE-EVALUATION</small><h5>2 mission conclusions changed</h5><div className="mini-result"><span><RadioTower size={12}/><b>Runway suitability</b></span><Status tone="review">REVIEW</Status></div><div className="mini-result"><span><CloudSun size={12}/><b>Destination minima</b></span><Status tone="review">REVIEW</Status></div><div className="mini-result"><span><UsersRound size={12}/><b>Crew legality</b></span><Status tone="good">CLEAR</Status></div><button>Open updated decision</button></aside></div></div>}

export default function HomeProductStories({type}){
 if(type==='intake')return <IntakeVisual/>;
 if(type==='impact')return <ImpactVisual/>;
 if(type==='options')return <OptionsVisual/>;
 if(type==='brief')return <BriefVisual/>;
 return <MonitorVisual/>;
}
