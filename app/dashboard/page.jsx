'use client';
import {useEffect,useMemo,useState} from 'react';
import {Activity,AlertTriangle,ArrowUpRight,Bell,BookOpen,Check,ChevronRight,CloudSun,Command,FileCheck2,FileText,GitBranch,Layers3,Plane,Plus,RadioTower,Search,Send,Settings,ShieldCheck,Sparkles,UsersRound,Wrench,X} from 'lucide-react';
import styles from './dashboard.module.css';

const missions=[
 {id:'AO-2418',route:'KPDK → KASE',from:'Atlanta / PDK',to:'Aspen / ASE',time:'14:30Z',eta:'18:52Z',tail:'N905CR',type:'Citation CJ3+',crew:'Smith / Lopez',status:'Review',tone:'amber',changes:3,pax:4},
 {id:'AO-2421',route:'KTEB → KPBI',from:'Teterboro',to:'Palm Beach',time:'16:05Z',eta:'19:18Z',tail:'N712AS',type:'Challenger 350',crew:'Chen / Davis',status:'Clear',tone:'green',changes:0,pax:6},
 {id:'AO-2424',route:'KDAL → KAPA',from:'Dallas Love',to:'Centennial',time:'17:20Z',eta:'19:11Z',tail:'N441CF',type:'Citation Latitude',crew:'Brown / Kim',status:'Clear',tone:'green',changes:1,pax:5},
 {id:'AO-2427',route:'KLAX → KSDL',from:'Los Angeles',to:'Scottsdale',time:'20:10Z',eta:'21:18Z',tail:'N310PX',type:'Gulfstream G550',crew:'Garcia / Reed',status:'Planning',tone:'gray',changes:0,pax:7},
 {id:'AO-2429',route:'KOPF → MYNN',from:'Miami Opa-locka',to:'Nassau',time:'22:40Z',eta:'23:32Z',tail:'N650AB',type:'Citation X+',crew:'Miller / Shaw',status:'Action',tone:'red',changes:4,pax:8}
];

const checks=[
 {area:'Destination authorization',condition:'KASE special-airport workflow applies',limit:'Operator authorization + briefing required',result:'REVIEW',tone:'amber',source:'OpSpec C070 · Demo operator',impact:'The mission remains viable, but the operator-specific special-airport review must be completed before release.'},
 {area:'Destination weather',condition:'Ceiling trends below planning threshold after 21Z',limit:'Company planning minima §4.12',result:'REVIEW',tone:'amber',source:'KASE TAF · 071720Z AMD',impact:'The forecast increases alternate-planning exposure during the arrival window.'},
 {area:'Crew legality',condition:'8h 12m projected duty',limit:'Current operator duty window',result:'PASS',tone:'green',source:'Crew qualification + duty record',impact:'Assigned PIC and SIC remain current and inside the configured duty window.'},
 {area:'Aircraft state',condition:'MEL 32-01 deferred indication',limit:'No route-specific restriction',result:'PASS',tone:'green',source:'MEL 32-01 · Demo operator',impact:'The deferred item remains inside the configured deferral window and does not block this mission.'},
 {area:'Runway / wind fit',condition:'28 kt peak crosswind forecast',limit:'Company dry-runway max 30 kt',result:'PASS',tone:'green',source:'Company minima §7.3 · Demo operator',impact:'Current modeled crosswind remains within the configured dry-runway operating limit.'}
];

const options=[
 {id:'alternate',title:'Add KDEN alternate',label:'Recommended',tone:'green',summary:'Preserve the departure and add fuel / alternate planning margin.',delay:'0 min',fuel:'+420 lb',crew:'Legal',risk:'Low',actions:2,score:92,changes:['Add KDEN alternate','Recalculate release fuel','Pilot acknowledgement']},
 {id:'delay',title:'Delay departure 45 min',label:'Lower weather exposure',tone:'amber',summary:'Move the arrival window later while keeping the assigned aircraft and crew.',delay:'+45 min',fuel:'No change',crew:'Legal',risk:'Low',actions:1,score:84,changes:['Move departure to 15:15Z','Recheck duty margin']},
 {id:'destination',title:'Plan KEGE as recovery',label:'Operational fallback',tone:'gray',summary:'Keep departure timing but prepare a destination change and ground-transfer path.',delay:'0 min',fuel:'+180 lb',crew:'Legal',risk:'Medium',actions:3,score:71,changes:['Add KEGE performance check','Ground transport plan','Chief Pilot review']}
];

const nav=[
 ['Flights',Plane],['Changes',Activity],['Briefs',FileCheck2],['Rules',BookOpen],['Live Data',CloudSun],['Crew',UsersRound],['Aircraft',Wrench],['Integrations',GitBranch],['Settings',Settings]
];

const liveChanges=[
 {type:'Weather',title:'KASE TAF amended',detail:'Ceiling lower during arrival window',time:'12m',tone:'amber'},
 {type:'NOTAM',title:'Runway restriction updated',detail:'Arrival configuration review triggered',time:'21m',tone:'red'},
 {type:'Aircraft',title:'MEL record synchronized',detail:'No mission impact detected',time:'44m',tone:'green'}
];

function Pill({tone='gray',children}){return <span className={`${styles.pill} ${styles[tone]}`}>{children}</span>}

function Sidebar({view,setView}){
  return <aside className={styles.sidebar}>
    <div className={styles.brand}><span>A</span><b>Aeros</b></div>
    <div className={styles.operator}><small>OPERATOR WORKSPACE</small><b>Prestige Aviation</b><span>Part 135 · Evaluation</span></div>
    <div className={styles.navLabel}>OPERATIONS</div>
    <nav>{nav.map(([name,Icon])=><button key={name} className={view===name?styles.active:''} onClick={()=>name==='Settings'?window.location.href='/settings/':setView(name)}><Icon size={16}/><span>{name}</span>{name==='Changes'&&<em>3</em>}</button>)}</nav>
    <div className={styles.sideFoot}>
      <div className={styles.systemHealth}><i/><span><b>All sources healthy</b><small>Weather · rules · aircraft · crew</small></span></div>
      <button onClick={()=>window.location.href='/billing/'}><ShieldCheck size={15}/><span><b>Evaluation plan</b><small>12 days remaining</small></span><ChevronRight size={13}/></button>
    </div>
  </aside>
}

function Topbar({openPalette}){
  return <header className={styles.topbar}>
    <button className={styles.newFlight}><Plus size={14}/>New mission</button>
    <button className={styles.search} onClick={openPalette}><Search size={14}/><span>Search missions, airports, rules, crew or ask Aeros</span><kbd>⌘K</kbd></button>
    <div className={styles.topRight}><div className={styles.utc}><i/>LIVE · 20:17 UTC</div><button className={styles.iconButton}><Bell size={15}/><i/></button><button className={styles.avatar} onClick={()=>window.location.href='/settings/'}>SC</button></div>
  </header>
}

function MissionRail({selected,setSelected}){
  const[filter,setFilter]=useState('All');
  const visible=missions.filter(m=>filter==='All'||m.status===filter);
  return <aside className={styles.flightRail}>
    <div className={styles.railHead}><div><small>TODAY</small><h2>Mission queue</h2></div><span>{missions.length}</span></div>
    <div className={styles.filters}>{['All','Review','Clear','Action'].map(x=><button key={x} className={filter===x?styles.active:''} onClick={()=>setFilter(x)}>{x}</button>)}</div>
    <div className={styles.railSearch}><Search size={13}/><input placeholder="Find a mission"/></div>
    <div className={styles.flightList}>{visible.map(m=>{const i=missions.findIndex(x=>x.id===m.id);return <button key={m.id} className={`${styles.flightCard} ${selected===i?styles.selected:''}`} onClick={()=>setSelected(i)}>
      <div className={styles.cardTop}><span>{m.id}</span><time>{m.time}</time></div>
      <strong>{m.route}</strong><p>{m.type} · {m.tail}</p>
      <div className={styles.cardBottom}><Pill tone={m.tone}>{m.status}</Pill><span>{m.changes?`${m.changes} changes`:'Reviewed'}</span></div>
    </button>})}</div>
  </aside>
}

function RouteMap(){
  const[layer,setLayer]=useState('Route');
  return <section className={styles.mapCard}>
    <div className={styles.mapToolbar}><div className={styles.layerTabs}>{['Route','Weather','NOTAMs','Airspace'].map(x=><button key={x} className={layer===x?styles.active:''} onClick={()=>setLayer(x)}>{x}</button>)}</div><div className={styles.mapMeta}><Layers3 size={13}/><span>Mission-aware layers</span></div></div>
    <div className={styles.mapCanvas}>
      <div className={styles.terrainGrid}/>
      {layer==='Weather'&&<><div className={`${styles.wx} ${styles.wx1}`}/><div className={`${styles.wx} ${styles.wx2}`}/><div className={`${styles.wx} ${styles.wx3}`}/></>}
      {layer==='NOTAMs'&&<><span className={`${styles.pin} ${styles.pin1}`}>!</span><span className={`${styles.pin} ${styles.pin2}`}>!</span></>}
      {layer==='Airspace'&&<><div className={`${styles.airspace} ${styles.a1}`}/><div className={`${styles.airspace} ${styles.a2}`}/></>}
      <svg viewBox="0 0 1000 420" preserveAspectRatio="none" aria-hidden="true"><path className={styles.shadowRoute} d="M110 316 C 315 170 602 206 885 108"/><path className={styles.route} d="M110 316 C 315 170 602 206 885 108"/><circle cx="110" cy="316" r="8" className={styles.routeDot}/><circle cx="885" cy="108" r="8" className={styles.routeDot}/><g className={styles.plane}><text>✈</text><animateMotion dur="10s" repeatCount="indefinite" path="M110 316 C 315 170 602 206 885 108"/></g></svg>
      <div className={`${styles.airport} ${styles.origin}`}><b>KPDK</b><span>Atlanta</span></div><div className={`${styles.airport} ${styles.destination}`}><b>KASE</b><span>Aspen</span></div>
      <div className={styles.mapOverlay}><span>{layer.toUpperCase()}</span><b>{layer==='Weather'?'1 material weather change':layer==='NOTAMs'?'1 material NOTAM · 14 informational':layer==='Airspace'?'No blocking airspace constraints':'Planned route · FL410'}</b><p>{layer==='Route'?'Aeros evaluates every live input against this exact mission state.':'Only information that can affect the mission is elevated here.'}</p></div>
    </div>
    <div className={styles.metrics}>{[['ETE','3h 22m'],['Distance','1,083 nm'],['Cruise','FL410'],['ETA','18:52Z'],['Fuel','7,420 lb']].map(([a,b])=><div key={a}><span>{a}</span><b>{b}</b></div>)}</div>
  </section>
}

function DecisionTrace({selected,setSelected,openSource}){
  return <section className={styles.tracePanel}>
    <div className={styles.panelHead}><div><ShieldCheck size={15}/><div><b>Decision trace</b><span>Condition → operator rule → result</span></div></div><Pill tone="amber">2 review</Pill></div>
    <div className={styles.traceRows}>{checks.map((c,i)=><button key={c.area} className={selected===i?styles.selected:''} onClick={()=>setSelected(i)}>
      <span className={`${styles.resultIcon} ${styles[c.tone]}`}>{c.tone==='green'?<Check size={13}/>:<AlertTriangle size={13}/>}</span>
      <span className={styles.checkMain}><b>{c.area}</b><small>{c.condition}</small></span>
      <span className={styles.limit}>{c.limit}</span>
      <Pill tone={c.tone}>{c.result}</Pill>
      <span className={styles.source} onClick={e=>{e.stopPropagation();openSource(c)}}>{c.source}<ArrowUpRight size={11}/></span>
    </button>)}</div>
  </section>
}

function OptionsTable({applied,setApplied}){
  return <section className={styles.optionsPanel}>
    <div className={styles.panelHead}><div><Sparkles size={15}/><div><b>Operational options</b><span>Feasible paths re-checked against the same mission constraints</span></div></div><span className={styles.rankLabel}>RANKED BY OPERATIONAL IMPACT</span></div>
    <div className={styles.optionGrid}>{options.map((o,i)=><article key={o.id} className={`${styles.optionCard} ${i===0?styles.recommended:''} ${applied===o.id?styles.applied:''}`}>
      <div className={styles.optionTop}><span>0{i+1}</span><Pill tone={o.tone}>{o.label}</Pill></div>
      <h3>{o.title}</h3><p>{o.summary}</p>
      <div className={styles.optionStats}><div><span>Delay</span><b>{o.delay}</b></div><div><span>Fuel</span><b>{o.fuel}</b></div><div><span>Risk</span><b>{o.risk}</b></div><div><span>Score</span><b>{o.score}</b></div></div>
      <ul>{o.changes.map(x=><li key={x}><Check size={11}/>{x}</li>)}</ul>
      <button onClick={()=>setApplied(applied===o.id?null:o.id)}>{applied===o.id?'Applied to simulation':'Simulate option'}<ChevronRight size={12}/></button>
    </article>)}</div>
  </section>
}

function Briefing(){return <section className={styles.briefPanel}><div className={styles.panelHead}><div><FileCheck2 size={15}/><div><b>Mission briefing</b><span>One reviewed view for dispatch and crew</span></div></div><button className={styles.smallAction}>Generate PDF</button></div><div className={styles.briefBody}><div className={styles.briefVerdict}><small>CURRENT STATE</small><h3>Conditional go</h3><p>The mission is viable after destination authorization and alternate-planning review are resolved.</p></div><div className={styles.briefColumns}><div><small>REQUIRED BEFORE RELEASE</small><ol><li>Complete KASE special-airport review</li><li>Confirm alternate strategy against latest forecast</li></ol></div><div><small>UNCHANGED / CLEAR</small><ol><li>Crew legality remains valid</li><li>Aircraft / MEL state remains eligible</li><li>Crosswind remains within company limit</li></ol></div></div></div></section>}

function MissionHeader({mission,surface,setSurface,applied}){
  return <><div className={styles.flightHead}><div><div className={styles.kicker}><span>{mission.id}</span><span>PART 135 MISSION</span><Pill tone={mission.tone}>{applied?'SIMULATING':mission.status}</Pill></div><h1>{mission.route}</h1><p>{mission.from} → {mission.to}</p><div className={styles.flightMeta}><span>{mission.type}</span><span>{mission.tail}</span><span>{mission.crew}</span><span>{mission.pax} pax</span></div></div><div className={styles.headActions}><button>Share</button><button className={styles.primary}><FileCheck2 size={14}/>Generate brief</button></div></div>
  <div className={styles.tabs}>{[['Overview','Overview'],['Decision trace','Trace'],['Operational options','Options'],['Briefing','Brief']].map(([label,key])=><button key={key} className={surface===key?styles.active:''} onClick={()=>setSurface(key)}>{label}</button>)}</div></>
}

function MainMission({mission,selectedCheck,setSelectedCheck,openSource}){
  const[surface,setSurface]=useState('Overview');
  const[applied,setApplied]=useState(null);
  useEffect(()=>{setSurface('Overview');setApplied(null)},[mission.id]);
  const reviewCount=checks.filter(c=>c.result==='REVIEW').length;
  return <main className={styles.center}>
    <MissionHeader mission={mission} surface={surface} setSurface={setSurface} applied={applied}/>
    <div className={styles.content}>
      <div className={styles.statusStrip}>{[['Decision',applied?'Simulated':'Review','amber'],['Weather','Monitor','amber'],['Rules','7 matched','green'],['Crew','Legal','green'],['Aircraft','Ready','green'],['Changes','3 material','red']].map(([a,b,t])=><div key={a}><span>{a}</span><b className={styles[t]}>{b}</b></div>)}</div>
      {surface==='Overview'&&<><RouteMap/><div className={styles.overviewBottom}><div className={styles.summaryCard}><div className={styles.summaryIcon}><AlertTriangle size={16}/></div><div><small>MISSION STATE</small><h2>{reviewCount} items need review</h2><p>Live conditions changed the destination and alternate-planning picture. Crew and aircraft eligibility are unchanged.</p><button onClick={()=>setSurface('Trace')}>Open decision trace <ChevronRight size={12}/></button></div></div><div className={styles.changeCard}><div className={styles.changeHead}><span>WHAT CHANGED</span><Pill tone="green">● Monitoring</Pill></div>{liveChanges.map(x=><div className={styles.changeRow} key={x.title}><i className={styles[x.tone]}/><span><b>{x.title}</b><small>{x.detail}</small></span><time>{x.time}</time></div>)}</div></div></>}
      {surface==='Trace'&&<DecisionTrace selected={selectedCheck} setSelected={setSelectedCheck} openSource={openSource}/>} 
      {surface==='Options'&&<OptionsTable applied={applied} setApplied={setApplied}/>} 
      {surface==='Brief'&&<Briefing/>}
    </div>
  </main>
}

function localFallback(question,c){
  if(question.startsWith('What changed')) return 'The latest KASE forecast and a runway restriction changed two previously reviewed conclusions. Crew and aircraft state remain unchanged.';
  if(question.startsWith('Compare')) return 'Option 1 preserves departure time with the lowest modeled operational impact. Option 2 reduces weather exposure but adds 45 minutes of delay. Option 3 is a viable recovery path with more coordination.';
  if(question.startsWith('Show')) return 'Complete the special-airport review, confirm an alternate strategy, then regenerate the mission brief. No crew or aircraft substitution is currently required.';
  return `The selected check is ${c.result.toLowerCase()}: ${c.impact} Source: ${c.source}.`;
}

function Intelligence({selected,openSource,mission}){
  const c=checks[selected];
  const[q,setQ]=useState('Why does this mission need review?');
  const[answer,setAnswer]=useState(localFallback(q,c));
  const[input,setInput]=useState('');
  const[loading,setLoading]=useState(false);
  const[usage,setUsage]=useState(null);
  useEffect(()=>{setAnswer(localFallback(q,c));setUsage(null);setQ('Why does this mission need review?')},[selected,mission.id]);
  const ask=async question=>{
    const next=question||input.trim();if(!next)return;
    setQ(next);setInput('');setLoading(true);setUsage(null);
    try{
      const response=await fetch('/api/intelligence',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({purpose:'mission_qna',question:next,mission:{id:mission.id,route:mission.route,tail:mission.tail,type:mission.type,crew:mission.crew,status:mission.status},selectedFinding:c,evaluation:{verdict:mission.status,findings:checks,options}})});
      const data=await response.json();if(!response.ok)throw new Error(data.error||'Unavailable');setAnswer(data.answer);setUsage(data.usage||null);
    }catch{setAnswer(localFallback(next,c));}finally{setLoading(false)}
  };
  return <aside className={styles.intel}>
    <div className={styles.intelHead}><div className={styles.aiMark}><Sparkles size={15}/></div><div><b>Aeros Intelligence</b><small>{mission.id} · grounded in mission evidence</small></div><span className={styles.liveBadge}><i/>LIVE</span></div>
    <div className={styles.intelBody}>
      <div className={styles.question}>{q}</div><div className={styles.answer}>{loading?<span className={styles.thinking}>Evaluating mission evidence…</span>:answer}</div>
      {usage?.cost_usd!=null&&<div className={styles.usage}>Grok · ${usage.cost_usd.toFixed(4)} · {usage.input_tokens||0} in / {usage.output_tokens||0} out</div>}
      <div className={styles.focus}><small>SELECTED EVIDENCE</small><b>{c.area}</b><p>{c.impact}</p><button onClick={()=>openSource(c)}><FileText size={13}/><span>{c.source}</span><ArrowUpRight size={11}/></button></div>
      <div className={styles.quickActions}><button onClick={()=>ask('What changed since last review?')} disabled={loading}>What changed?<ChevronRight size={11}/></button><button onClick={()=>ask('Compare operational options')} disabled={loading}>Compare options<ChevronRight size={11}/></button><button onClick={()=>ask('Show recommended actions')} disabled={loading}>Next actions<ChevronRight size={11}/></button></div>
      <div className={styles.timeline}><div className={styles.timelineHead}><b>Live monitoring</b><span>3 material changes</span></div>{liveChanges.map(x=><div key={x.title} className={styles.timelineRow}><i className={styles[x.tone]}/><span><b>{x.title}</b><small>{x.type} · {x.detail}</small></span><time>{x.time}</time></div>)}</div>
    </div>
    <form className={styles.composer} onSubmit={e=>{e.preventDefault();ask(input)}}><input value={input} onChange={e=>setInput(e.target.value)} placeholder="Ask about this mission…"/><button disabled={loading}><Send size={14}/></button></form>
  </aside>
}

function Secondary({view}){
  return <div className={styles.secondary}><div className={styles.secondaryHead}><small>OPERATIONS WORKSPACE</small><h1>{view}</h1><p>This workspace shares the same mission state, evidence, permissions, and audit trail as the decision surface.</p></div><div className={styles.secondaryGrid}>{checks.map((c,i)=><article key={c.area}><span>0{i+1}</span><b>{c.area}</b><p>{c.impact}</p><Pill tone={c.tone}>{c.result}</Pill></article>)}</div></div>
}

function Drawer({source,onClose}){
  if(!source)return null;
  return <div className={styles.drawerBackdrop} onClick={onClose}><aside className={styles.drawer} onClick={e=>e.stopPropagation()}><div className={styles.drawerTop}><div><small>EVIDENCE TRACE</small><h2>{source.source}</h2></div><button onClick={onClose}><X size={15}/></button></div><div className={styles.drawerState}><Pill tone={source.tone}>{source.result}</Pill><span>Last evaluated 2m ago</span></div><div className={styles.drawerBlock}><span>Operational check</span><b>{source.area}</b><p>{source.impact}</p></div><div className={styles.drawerBlock}><span>Observed condition</span><b>{source.condition}</b></div><div className={styles.drawerBlock}><span>Applied operator rule</span><b>{source.limit}</b></div><div className={styles.drawerBlock}><span>Traceability</span><p>This demo preserves the exact source used for the conclusion. In production the source revision, effective date, ingestion timestamp, and reviewer are stored with each evaluation.</p></div><button className={styles.drawerAction}>Open source document <ArrowUpRight size={12}/></button></aside></div>
}

function Palette({open,onClose,setView}){
  useEffect(()=>{const f=e=>e.key==='Escape'&&onClose();window.addEventListener('keydown',f);return()=>window.removeEventListener('keydown',f)},[onClose]);if(!open)return null;
  return <div className={styles.paletteBackdrop} onClick={onClose}><div className={styles.palette} onClick={e=>e.stopPropagation()}><div><Search size={15}/><input autoFocus placeholder="Search Aeros or jump to a workspace…"/><kbd>ESC</kbd></div>{nav.map(([n,I])=><button key={n} onClick={()=>{if(n==='Settings')window.location.href='/settings/';else setView(n);onClose()}}><I size={14}/><span>{n}</span><kbd>↵</kbd></button>)}</div></div>
}

export default function Dashboard(){
  const[view,setView]=useState('Flights');
  const[selectedMission,setSelectedMission]=useState(0);
  const[selectedCheck,setSelectedCheck]=useState(0);
  const[source,setSource]=useState(null);
  const[palette,setPalette]=useState(false);
  useEffect(()=>{const f=e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();setPalette(true)}};window.addEventListener('keydown',f);return()=>window.removeEventListener('keydown',f)},[]);
  const mission=missions[selectedMission];
  return <div className={styles.app}><Sidebar view={view} setView={setView}/><div className={styles.main}><Topbar openPalette={()=>setPalette(true)}/>{view==='Flights'?<div className={styles.workspace}><MissionRail selected={selectedMission} setSelected={i=>{setSelectedMission(i);setSelectedCheck(0)}}/><MainMission mission={mission} selectedCheck={selectedCheck} setSelectedCheck={setSelectedCheck} openSource={setSource}/><Intelligence selected={selectedCheck} openSource={setSource} mission={mission}/></div>:<Secondary view={view}/>}</div><Drawer source={source} onClose={()=>setSource(null)}/><Palette open={palette} onClose={()=>setPalette(false)} setView={setView}/></div>
}
