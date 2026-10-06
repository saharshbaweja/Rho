'use client';

import {useEffect,useMemo,useState} from 'react';
import {Activity,AlertTriangle,Bell,BookOpen,Check,ChevronDown,ChevronRight,CloudSun,Command,FileCheck2,FileText,GitBranch,History,Inbox,Map,MessageSquare,Plane,Plus,RadioTower,Search,SearchCheck,Send,Settings,ShieldCheck,UsersRound,Wrench,X} from 'lucide-react';
import styles from './dashboard.module.css';

const missions=[
 {id:'AER-2418',route:'KPDK → KASE',depart:'14:30Z',arrival:'21:08Z',aircraft:'N905CR',type:'Citation CJ3',crew:'Smith / Lopez',status:'Review required',statusTone:'amber',customer:'Private Client',pax:'4 pax',updated:'3 changes',base:'KPDK'},
 {id:'AER-2421',route:'KTEB → KPBI',depart:'16:10Z',arrival:'19:01Z',aircraft:'N712AS',type:'Gulfstream G280',crew:'Chen / Davis',status:'Clear',statusTone:'green',customer:'NorthStar Aviation',pax:'7 pax',updated:'Reviewed 6m ago',base:'KTEB'},
 {id:'AER-2424',route:'KOPF → KHPN',depart:'18:45Z',arrival:'21:32Z',aircraft:'N560KT',type:'Citation Latitude',crew:'Miller / Garcia',status:'Monitoring',statusTone:'blue',customer:'Corporate Account',pax:'5 pax',updated:'1 change',base:'KOPF'},
 {id:'AER-2429',route:'KAPA → KSDL',depart:'21:15Z',arrival:'23:06Z',aircraft:'N441CF',type:'Phenom 300',crew:'Brown / Kim',status:'Draft',statusTone:'gray',customer:'Broker Request',pax:'3 pax',updated:'Unreviewed',base:'KAPA'},
 {id:'AER-2432',route:'KDAL → KSDL',depart:'23:40Z',arrival:'01:09Z',aircraft:'N310PX',type:'Learjet 75',crew:'Patel / Wright',status:'Clear',statusTone:'green',customer:'Executive Travel',pax:'6 pax',updated:'Reviewed 14m ago',base:'KDAL'}
];

const missionChecks={
 'AER-2418':[
  {key:'opspec',label:'OpSpecs',status:'REVIEW',tone:'warn',title:'Mountain-airport review required',detail:'KASE falls inside the operator’s special-airport review workflow for this mission profile.',source:'OpSpec C070 §3.2',kind:'Operator rule',quote:'For listed special airports, the operator must complete the applicable company review before mission release.'},
  {key:'crew',label:'Crew',status:'CLEAR',tone:'good',title:'Assigned crew eligible',detail:'Smith / Lopez are current for assigned roles and within the reviewed duty window.',source:'Crew Qualification Record',kind:'Crew record',quote:'PIC and SIC qualifications current through the planned duty period.'},
  {key:'aircraft',label:'Aircraft',status:'CLEAR',tone:'good',title:'N905CR dispatchable',detail:'Tail is available. Open MEL 32-01 does not prohibit the planned mission based on current review.',source:'MEL 32-01',kind:'Aircraft record',quote:'Deferred indication item remains within approved deferral period; no restriction identified for planned mission.'},
  {key:'weather',label:'Weather',status:'REVIEW',tone:'warn',title:'Alternate planning needs another look',detail:'Latest KASE forecast trends below the operator’s planning threshold after 21Z.',source:'KASE TAF 061720Z AMD',kind:'Live weather',quote:'Forecast amendment introduces lower ceiling during the expected arrival window.'},
  {key:'notam',label:'NOTAMs',status:'ACTION',tone:'bad',title:'Runway closure overlaps arrival',detail:'A runway-related closure now overlaps the expected arrival window by approximately 20 minutes.',source:'KASE NOTAM 10/114',kind:'Live NOTAM',quote:'RWY 15/33 CLSD 06 2050-2130Z.'},
  {key:'charts',label:'Charts',status:'CLEAR',tone:'good',title:'Current chart cycle verified',detail:'Relevant airport diagram and approach procedures are current for the mission.',source:'Chart cycle 2610',kind:'Chart data',quote:'Current effective chart cycle confirmed for KASE procedures linked to this mission.'}
 ],
 'AER-2421':[
  {key:'opspec',label:'OpSpecs',status:'CLEAR',tone:'good',title:'Route and destination covered',detail:'No operator-specific authorization issue surfaced for this mission.',source:'OpSpecs active set',kind:'Operator rule',quote:'No special authorization conflict identified.'},
  {key:'crew',label:'Crew',status:'CLEAR',tone:'good',title:'Crew eligible',detail:'Chen / Davis current and within reviewed duty limits.',source:'Crew records',kind:'Crew record',quote:'Qualifications and currency current.'},
  {key:'aircraft',label:'Aircraft',status:'CLEAR',tone:'good',title:'Aircraft clear',detail:'N712AS available with no mission-relevant deferred item.',source:'Aircraft state',kind:'Aircraft record',quote:'Aircraft available and maintenance status current.'},
  {key:'weather',label:'Weather',status:'CLEAR',tone:'good',title:'Weather within reviewed criteria',detail:'Current destination and alternate picture remains within reviewed company planning criteria.',source:'KTEB/KPBI weather',kind:'Live weather',quote:'No threshold crossing detected since last review.'},
  {key:'notam',label:'NOTAMs',status:'CLEAR',tone:'good',title:'No material NOTAM conflict',detail:'Relevant notices reviewed; none require another action.',source:'NOTAM set',kind:'Live NOTAM',quote:'No material mission conflict detected.'},
  {key:'charts',label:'Charts',status:'CLEAR',tone:'good',title:'Charts current',detail:'Relevant airport and procedure references current.',source:'Chart cycle 2610',kind:'Chart data',quote:'Current chart cycle confirmed.'}
 ]
};

const defaultChecks=(id)=>missionChecks[id]||missionChecks['AER-2421'];

const changes=[
 {time:'18:43Z',type:'Mission',title:'Expected arrival moved +14 min',detail:'Updated trip timing now puts AER-2418 at KASE at 21:08Z.',impact:'Re-evaluate weather + runway timing',tone:'amber'},
 {time:'18:42Z',type:'NOTAM',title:'Runway closure window extended',detail:'Closure now ends 21:30Z, overlapping the current arrival estimate.',impact:'Airport review required',tone:'red'},
 {time:'18:40Z',type:'Weather',title:'KASE TAF amended',detail:'Ceiling forecast lowered during the expected arrival period.',impact:'Alternate planning review',tone:'amber'},
 {time:'18:29Z',type:'Airport',title:'FBO operating window confirmed',detail:'Service availability remains compatible with current arrival.',impact:'No action',tone:'green'}
];

const docs=[
 {name:'Operations Specifications',rev:'Rev 34',state:'Active',rules:'12 mission rules',review:'Reviewed Sep 28'},
 {name:'General Operations Manual',rev:'Rev 18',state:'Active',rules:'38 mission rules',review:'Reviewed Oct 2'},
 {name:'MEL / CDL',rev:'Rev 11',state:'Active',rules:'21 aircraft rules',review:'Reviewed Sep 30'},
 {name:'International Procedures',rev:'Rev 7',state:'Active',rules:'9 route rules',review:'Reviewed Sep 14'},
 {name:'Company Minimums',rev:'Rev 15',state:'Active',rules:'17 weather rules',review:'Reviewed Oct 4'}
];

const sources=[
 {name:'Weather',icon:CloudSun,count:'8 products',desc:'METAR, TAF, winds, hazards and forecast change monitoring',sync:'18:44Z'},
 {name:'NOTAMs',icon:RadioTower,count:'24 raw · 4 relevant',desc:'Mission-filtered airport, runway and procedure notices',sync:'18:44Z'},
 {name:'Airports',icon:Map,count:'6 active',desc:'Runways, operating windows, restrictions and airport context',sync:'18:43Z'},
 {name:'Charts',icon:FileText,count:'11 linked',desc:'Airport and procedure references attached to mission findings',sync:'Cycle 2610'},
 {name:'Crew',icon:UsersRound,count:'12 records',desc:'Qualifications, currency, duty state and operator requirements',sync:'18:31Z'},
 {name:'Aircraft',icon:Plane,count:'9 tails',desc:'Availability, maintenance, deferred items and inspection state',sync:'18:34Z'}
];

const nav=[
 {label:'OPERATE',items:[['Mission Workspace',Plane,5],['Mission Inbox',Inbox,3],['Briefings',FileCheck2,2],['Change Monitor',Activity,4]]},
 {label:'INTELLIGENCE',items:[['Rules & Manuals',BookOpen,8],['Live Data',CloudSun,6],['Crew & Aircraft',UsersRound,0]]},
 {label:'SYSTEM',items:[['Integrations',GitBranch,7],['Audit & Settings',Settings,0]]}
];

function ToneTag({tone='gray',children}){return <em className={`${styles.tag} ${styles[tone]}`}>{children}</em>}

function Sidebar({active,setActive}){
 return <aside className={styles.sidebar}>
  <div className={styles.brand}><span className={styles.brandMark}><Plane size={14}/></span><b>Aeros</b></div>
  <button className={styles.org}><div><small>Certificate holder</small><b>Prestige Aviation</b></div><ChevronDown size={11}/></button>
  {nav.map(group=><div className={styles.navGroup} key={group.label}><div className={styles.navLabel}>{group.label}</div><div className={styles.nav}>{group.items.map(([name,Icon,count])=><button key={name} onClick={()=>setActive(name)} className={active===name?styles.active:''}><Icon size={13}/><span>{name}</span>{count>0&&<i className={styles.navCount}>{count}</i>}</button>)}</div></div>)}
  <div className={styles.sidebarBottom}><div className={styles.sync}><span className={styles.syncDot}/>All connected sources synced</div></div>
 </aside>
}

function Topbar({openPalette}){
 return <header className={styles.topbar}>
  <div className={styles.topLeft}><ShieldCheck size={13}/><b>Prestige Aviation</b><span>Part 135 · Production workspace</span></div>
  <button className={styles.search} onClick={openPalette}><Search size={13}/>Search missions, rules, aircraft, crew, airports…<kbd>⌘ K</kbd></button>
  <div className={styles.topRight}><button className={styles.iconBtn}><Bell size={13}/></button><div className={styles.profile}><span className={styles.avatar}>DO</span><div><b>Operations</b><span>Director of Operations</span></div></div></div>
 </header>
}

function MissionRail({selected,setSelected,filter,setFilter}){
 const visible=missions.filter(m=>filter==='All'||(filter==='Review'?m.status.includes('Review'):filter==='Clear'?m.status==='Clear':m.status==='Monitoring'));
 return <aside className={styles.missionRail}>
  <div className={styles.railHead}><div className={styles.railHeadTop}><div><b>Today’s missions</b><small>5 active · October 6</small></div><button className={styles.newMission}><Plus size={12}/></button></div></div>
  <div className={styles.railFilters}>{['All','Review','Clear','Monitoring'].map(x=><button className={filter===x?styles.active:''} onClick={()=>setFilter(x)} key={x}>{x}</button>)}</div>
  <div className={styles.missionList}>{visible.map(m=>{const i=missions.findIndex(x=>x.id===m.id);return <button className={`${styles.missionCard} ${selected===i?styles.selected:''}`} onClick={()=>setSelected(i)} key={m.id}><div className={styles.missionTop}><span className={styles.missionId}>{m.id}</span><span className={styles.missionTime}>{m.depart}</span></div><div className={styles.missionRoute}>{m.route}</div><div className={styles.missionMeta}>{m.aircraft} · {m.crew} · {m.pax}</div><div className={styles.missionFoot}><ToneTag tone={m.statusTone}>{m.status}</ToneTag><span>{m.updated}</span></div></button>})}</div>
 </aside>
}

function MissionHeader({mission,tab,setTab,markReviewed,generateBrief}){
 return <div className={styles.missionHeader}>
  <div className={styles.crumb}>Missions <ChevronRight size={9}/> {mission.id}</div>
  <div className={styles.headerRow}><div className={styles.routeTitle}><small>{mission.id} · PART 135 MISSION</small><h1>{mission.route}</h1><p>{mission.depart} → {mission.arrival} · {mission.aircraft} / {mission.type} · {mission.crew} · {mission.pax}</p></div><div className={styles.headerActions}><ToneTag tone={mission.statusTone}>{mission.status}</ToneTag><button className={styles.btn} onClick={generateBrief}><FileCheck2 size={12}/>Generate brief</button><button className={`${styles.btn} ${styles.primary}`} onClick={markReviewed}><Check size={12}/>Mark reviewed</button></div></div>
  <div className={styles.segmented}>{['Overview','Rules','Live data','Changes','Brief'].map(x=><button className={tab===x?styles.active:''} onClick={()=>setTab(x)} key={x}>{x}</button>)}</div>
 </div>
}

function StatusStrip({checks,setFinding}){
 return <div className={styles.statusGrid}>{checks.map((c,i)=><button className={styles.statusCell} key={c.key} onClick={()=>setFinding(i)}><span>{c.label}</span><b className={styles[c.tone]}>{c.status}</b></button>)}</div>
}

function Findings({checks,selected,setSelected,openSource}){
 const attention=checks.filter(c=>c.status!=='CLEAR');
 return <section className={styles.section}><div className={styles.sectionHead}><div><AlertTriangle size={12}/><b>Decision stack</b><span>{attention.length} items need attention</span></div><button>Show all</button></div>{checks.map((c,i)=><div className={`${styles.finding} ${selected===i?styles.selected:''}`} onClick={()=>setSelected(i)} key={c.key}><span className={`${styles.findingIcon} ${c.tone==='good'?styles.green:c.tone==='bad'?styles.red:styles.amber}`}>{c.tone==='good'?<Check size={12}/>:<AlertTriangle size={12}/>}</span><span className={styles.findingBody}><b>{c.title}</b><p>{c.detail}</p></span><button className={styles.sourcePill} onClick={(e)=>{e.stopPropagation();openSource(c)}}>{c.source}</button><ChevronRight size={11} className={styles.findingArrow}/></div>)}</section>
}

function OverviewTab({mission,checks,finding,setFinding,openSource,setTab}){
 return <>
  <StatusStrip checks={checks} setFinding={setFinding}/>
  {mission.id==='AER-2418'&&<div className={styles.changeBanner}><div className={styles.changeMain}><span className={styles.changeIcon}><RadioTower size={12}/></span><span><b>3 meaningful changes since 18:05Z review</b><span>Weather, runway timing and arrival estimate affect previously reviewed conclusions.</span></span></div><button className={styles.textBtn} onClick={()=>setTab('Changes')}>Review changes →</button></div>}
  <Findings checks={checks} selected={finding} setSelected={setFinding} openSource={openSource}/>
  <div className={styles.twoCol}><section className={styles.infoCard}><div className={styles.sectionHead}><div><Plane size={12}/><b>Mission details</b></div></div><div className={styles.infoRows}>{[['Customer',mission.customer],['Aircraft',`${mission.aircraft} · ${mission.type}`],['Crew',mission.crew],['Passengers',mission.pax],['Departure',mission.depart],['Arrival',mission.arrival]].map(([l,v])=><div className={styles.infoRow} key={l}><div><span>{l}</span><b>{v}</b></div></div>)}</div></section><section className={styles.infoCard}><div className={styles.sectionHead}><div><FileCheck2 size={12}/><b>Required before release</b><span>{mission.id==='AER-2418'?'2 open':'No open action'}</span></div></div><div className={styles.infoRows}>{mission.id==='AER-2418'?<><div className={styles.infoRow}><div><b>Review alternate planning</b><span>Triggered by KASE forecast amendment</span></div><ToneTag tone="amber">Review</ToneTag></div><div className={styles.infoRow}><div><b>Acknowledge runway timing</b><span>NOTAM overlaps arrival estimate</span></div><ToneTag tone="red">Action</ToneTag></div></>:<div className={styles.infoRow}><div><b>No open item</b><span>Mission is in reviewed state</span></div><ToneTag tone="green">Clear</ToneTag></div>}</div></section></div>
 </>
}

function RulesTab({checks,openSource}){
 const rules=checks.filter(c=>['Operator rule','Aircraft record','Crew record'].includes(c.kind));
 return <><section className={styles.section}><div className={styles.sectionHead}><div><BookOpen size={12}/><b>Applicable operator knowledge</b><span>Matched to this mission</span></div></div>{rules.map((c,i)=><div className={styles.finding} key={c.key}><span className={`${styles.findingIcon} ${c.tone==='good'?styles.green:styles.amber}`}>{c.tone==='good'?<Check size={12}/>:<AlertTriangle size={12}/>}</span><span className={styles.findingBody}><b>{c.source}</b><p>{c.detail}</p></span><button className={styles.sourcePill} onClick={()=>openSource(c)}>Source</button><ChevronRight size={11} className={styles.findingArrow}/></div>)}</section><div className={styles.twoCol}><section className={styles.infoCard}><div className={styles.sectionHead}><div><ShieldCheck size={12}/><b>Knowledge state</b></div></div><div className={styles.infoRows}><div className={styles.infoRow}><div><b>97 active structured rules</b><span>Across 5 controlled source sets</span></div><ToneTag tone="green">Current</ToneTag></div><div className={styles.infoRow}><div><b>8 pending validation</b><span>Not used in active mission decisions</span></div><ToneTag tone="gray">Pending</ToneTag></div></div></section><section className={styles.infoCard}><div className={styles.sectionHead}><div><History size={12}/><b>Revision watch</b></div></div><div className={styles.infoRows}><div className={styles.infoRow}><div><b>No active revision conflict</b><span>Last document synchronization 17:55Z</span></div><ToneTag tone="green">Clear</ToneTag></div></div></section></div></>
}

function LiveDataTab({checks,openSource}){
 const live=checks.filter(c=>['Live weather','Live NOTAM','Chart data'].includes(c.kind));
 return <><div className={styles.dataGrid}>{sources.slice(0,4).map(s=>{const I=s.icon;return <article className={styles.dataCard} key={s.name}><span className={styles.dataCardIcon}><I size={14}/></span><h3>{s.name}</h3><p>{s.desc}</p><div className={styles.dataMeta}><span>{s.count}</span><b>{s.sync}</b></div></article>})}</div><section className={styles.section} style={{marginTop:10}}><div className={styles.sectionHead}><div><RadioTower size={12}/><b>Mission-relevant live items</b><span>{live.length} linked to current decision stack</span></div></div>{live.map(c=><div className={styles.finding} key={c.key}><span className={`${styles.findingIcon} ${c.tone==='good'?styles.green:c.tone==='bad'?styles.red:styles.amber}`}>{c.tone==='good'?<Check size={12}/>:<AlertTriangle size={12}/>}</span><span className={styles.findingBody}><b>{c.title}</b><p>{c.detail}</p></span><button className={styles.sourcePill} onClick={()=>openSource(c)}>{c.source}</button><ChevronRight size={11} className={styles.findingArrow}/></div>)}</section></>
}

function ChangesTab(){return <section className={styles.section}><div className={styles.sectionHead}><div><Activity size={12}/><b>Changes since 18:05Z review</b><span>Only meaningful deltas</span></div></div><div className={styles.timeline}>{changes.map((c,i)=><div className={styles.timelineRow} key={c.time+c.title}><span>{c.time}</span><span className={`${styles.timelineDot} ${styles[c.tone]}`}/><span><b>{c.type} · {c.title}</b><p>{c.detail}</p></span><ToneTag tone={c.tone}>{c.impact}</ToneTag></div>)}</div></section>}

function BriefTab({mission,checks}){
 return <><section className={styles.section}><div className={styles.sectionHead}><div><FileCheck2 size={12}/><b>Pilot / dispatcher mission brief</b><span>Generated from reviewed mission state</span></div><button>Export PDF</button></div><div className={styles.infoRows}><div className={styles.infoRow}><div><span>Mission</span><b>{mission.id} · {mission.route} · {mission.depart}</b></div><ToneTag tone={mission.statusTone}>{mission.status}</ToneTag></div>{checks.filter(c=>c.status!=='CLEAR').map(c=><div className={styles.infoRow} key={c.key}><div><b>{c.title}</b><span>{c.detail}</span></div><ToneTag tone={c.tone==='bad'?'red':'amber'}>{c.status}</ToneTag></div>)}</div></section><div className={styles.twoCol}><section className={styles.infoCard}><div className={styles.sectionHead}><div><BookOpen size={12}/><b>Sources included</b></div></div><div className={styles.infoRows}>{checks.map(c=><div className={styles.infoRow} key={c.key}><div><b>{c.source}</b><span>{c.kind}</span></div></div>)}</div></section><section className={styles.infoCard}><div className={styles.sectionHead}><div><Check size={12}/><b>Review state</b></div></div><div className={styles.infoRows}><div className={styles.infoRow}><div><b>Dispatcher review pending</b><span>Latest material change at 18:43Z</span></div><ToneTag tone="amber">Pending</ToneTag></div><div className={styles.infoRow}><div><b>Pilot acknowledgement</b><span>Available after dispatcher review</span></div><ToneTag tone="gray">Waiting</ToneTag></div></div></section></div></>
}

function MissionWorkspace({mission,tab,setTab,finding,setFinding,openSource,toast}){
 const checks=defaultChecks(mission.id);
 return <main className={styles.center}><MissionHeader mission={mission} tab={tab} setTab={setTab} markReviewed={()=>toast('Mission review recorded')} generateBrief={()=>{setTab('Brief');toast('Mission brief generated from current review state')}}/><div className={styles.content}>{tab==='Overview'&&<OverviewTab mission={mission} checks={checks} finding={finding} setFinding={setFinding} openSource={openSource} setTab={setTab}/>} {tab==='Rules'&&<RulesTab checks={checks} openSource={openSource}/>} {tab==='Live data'&&<LiveDataTab checks={checks} openSource={openSource}/>} {tab==='Changes'&&<ChangesTab/>} {tab==='Brief'&&<BriefTab mission={mission} checks={checks}/>}</div></main>
}

function EvidencePanel({mission,check,setCheck,openSource}){
 const checks=defaultChecks(mission.id);const c=checks[check]||checks[0];
 const prompts=['Why does this matter?','What changed since review?','Can we use a different aircraft?'];
 const [question,setQuestion]=useState('Why does this matter?');
 const answers={
  'Why does this matter?':`${c.title}. Aeros surfaced this because the current mission state intersects with ${c.source}. The item remains a decision-support finding until an authorized operator reviews it.`,
  'What changed since review?':'For AER-2418, the latest material deltas are the KASE TAF amendment, the runway-closure timing change, and a +14 minute arrival shift. Those changes affect weather and airport-review conclusions.',
  'Can we use a different aircraft?':'Aeros can compare candidate tails against the same mission rules, airport constraints, maintenance state and crew pairing. No replacement is applied until the operator reviews the alternative.'
 };
 return <aside className={styles.evidencePanel}><div className={styles.evidenceHead}><div className={styles.evidenceTitle}><div><span className={styles.aiMark}><SearchCheck size={13}/></span><span><b>Aeros</b><span>Grounded in {mission.id}</span></span></div><ToneTag tone="green">6 sources</ToneTag></div></div><div className={styles.contextStrip}><span className={styles.contextChip}>{mission.route}</span><span className={styles.contextChip}>{mission.aircraft}</span><span className={styles.contextChip}>{mission.crew}</span></div><div className={styles.evidenceBody}><div className={styles.assistantMsg}><b>{question}</b>{answers[question]}</div><div className={styles.citationBlock}><div className={styles.citationLabel}>Evidence used</div><div className={styles.citation} onClick={()=>openSource(c)}><div className={styles.citationTop}><b>{c.source}</b><em>{c.kind}</em></div><p>{c.quote}</p></div><div className={styles.citation}><div className={styles.citationTop}><b>Mission {mission.id}</b><em>Live state</em></div><p>{mission.route} · {mission.depart} · {mission.aircraft} · {mission.crew}</p></div></div><div className={styles.suggestions}>{prompts.map((p,i)=><button key={p} onClick={()=>{setQuestion(p);setCheck(Math.min(i,checks.length-1))}}>{p}</button>)}</div></div><div className={styles.composer}><div className={styles.composerBox}><input placeholder={`Ask about ${mission.id}…`}/><button><Send size={11}/></button></div></div></aside>
}

function KnowledgePage({type}){
 if(type==='Rules & Manuals') return <main className={styles.center}><div className={styles.missionHeader}><div className={styles.headerRow}><div className={styles.routeTitle}><small>OPERATOR KNOWLEDGE</small><h1>Rules & Manuals</h1><p>Controlled source documents and the structured rules derived from them.</p></div><div className={styles.headerActions}><button className={`${styles.btn} ${styles.primary}`}><Plus size={11}/>Upload revision</button></div></div></div><div className={styles.content}><section className={styles.section}><div className={styles.sectionHead}><div><BookOpen size={12}/><b>Active document set</b><span>5 controlled sources</span></div></div><div className={styles.docTable}>{docs.map(d=><div className={styles.docRow} key={d.name}><b>{d.name}</b><span>{d.rev}</span><ToneTag tone="green">{d.state}</ToneTag><span>{d.rules} · {d.review}</span><ChevronRight size={11}/></div>)}</div></section><div className={styles.twoCol}><section className={styles.infoCard}><div className={styles.sectionHead}><div><ShieldCheck size={12}/><b>Validation queue</b></div></div><div className={styles.infoRows}><div className={styles.infoRow}><div><b>8 extracted rules pending review</b><span>Not used in active mission evaluation</span></div><ToneTag tone="amber">Review</ToneTag></div></div></section><section className={styles.infoCard}><div className={styles.sectionHead}><div><History size={12}/><b>Revision watch</b></div></div><div className={styles.infoRows}><div className={styles.infoRow}><div><b>No unresolved revision conflict</b><span>Last source sync 17:55Z</span></div><ToneTag tone="green">Current</ToneTag></div></div></section></div></div></main>;
 if(type==='Live Data') return <main className={styles.center}><div className={styles.missionHeader}><div className={styles.headerRow}><div className={styles.routeTitle}><small>LIVE OPERATIONAL DATA</small><h1>Connected sources</h1><p>Authoritative live feeds filtered against active missions.</p></div></div></div><div className={styles.content}><div className={styles.dataGrid}>{sources.map(s=>{const I=s.icon;return <article className={styles.dataCard} key={s.name}><span className={styles.dataCardIcon}><I size={14}/></span><h3>{s.name}</h3><p>{s.desc}</p><div className={styles.dataMeta}><span>{s.count}</span><b>{s.sync}</b></div></article>})}</div></div></main>;
 if(type==='Crew & Aircraft') return <main className={styles.center}><div className={styles.missionHeader}><div className={styles.headerRow}><div className={styles.routeTitle}><small>MISSION ELIGIBILITY</small><h1>Crew & Aircraft</h1><p>Current qualification, duty, maintenance and mission-fit context.</p></div></div></div><div className={styles.content}><div className={styles.twoCol}><section className={styles.infoCard}><div className={styles.sectionHead}><div><UsersRound size={12}/><b>Crew on active missions</b></div></div><div className={styles.infoRows}>{missions.slice(0,4).map(m=><div className={styles.infoRow} key={m.id}><div><b>{m.crew}</b><span>{m.id} · {m.route}</span></div><ToneTag tone={m.id==='AER-2418'?'amber':'green'}>{m.id==='AER-2418'?'Review':'Clear'}</ToneTag></div>)}</div></section><section className={styles.infoCard}><div className={styles.sectionHead}><div><Plane size={12}/><b>Aircraft on active missions</b></div></div><div className={styles.infoRows}>{missions.slice(0,4).map(m=><div className={styles.infoRow} key={m.aircraft}><div><b>{m.aircraft} · {m.type}</b><span>{m.id} · {m.route}</span></div><ToneTag tone="green">Available</ToneTag></div>)}</div></section></div></div></main>;
 if(type==='Change Monitor') return <main className={styles.center}><div className={styles.missionHeader}><div className={styles.headerRow}><div className={styles.routeTitle}><small>CONTINUOUS MONITORING</small><h1>Change Monitor</h1><p>Meaningful deltas across active missions, ranked by operational impact.</p></div></div></div><div className={styles.content}><ChangesTab/></div></main>;
 if(type==='Briefings') return <main className={styles.center}><div className={styles.missionHeader}><div className={styles.headerRow}><div className={styles.routeTitle}><small>MISSION OUTPUT</small><h1>Briefings</h1><p>Dispatcher and pilot briefs generated from reviewed mission state.</p></div></div></div><div className={styles.content}><section className={styles.section}><div className={styles.sectionHead}><div><FileCheck2 size={12}/><b>Briefing queue</b><span>2 require updated acknowledgement</span></div></div><div className={styles.docTable}>{missions.slice(0,4).map(m=><div className={styles.docRow} key={m.id}><b>{m.id} · {m.route}</b><span>{m.depart}</span><ToneTag tone={m.statusTone}>{m.status}</ToneTag><span>Latest brief · {m.updated}</span><ChevronRight size={11}/></div>)}</div></section></div></main>;
 if(type==='Mission Inbox') return <main className={styles.center}><div className={styles.missionHeader}><div className={styles.headerRow}><div className={styles.routeTitle}><small>MISSION INTAKE</small><h1>Mission Inbox</h1><p>New requests waiting to be structured into an operational mission.</p></div><div className={styles.headerActions}><button className={`${styles.btn} ${styles.primary}`}><Plus size={11}/>New mission</button></div></div></div><div className={styles.content}><section className={styles.section}><div className={styles.sectionHead}><div><Inbox size={12}/><b>Unprocessed requests</b><span>3 new</span></div></div>{[['Broker email','KDAL → KASE','Requested 19:00Z','Trip details extracted'],['Client portal','KTEB → KMIA','Requested tomorrow 12:00Z','Aircraft preference included'],['Ops email','KOPF → MYNN','Requested tomorrow 15:20Z','International review likely']].map((x,i)=><div className={styles.finding} key={x[0]+i}><span className={`${styles.findingIcon} ${styles.blue}`}><Inbox size={12}/></span><span className={styles.findingBody}><b>{x[0]} · {x[1]}</b><p>{x[2]} · {x[3]}</p></span><button className={styles.sourcePill}>Create mission</button><ChevronRight size={11}/></div>)}</section></div></main>;
 return <main className={styles.center}><div className={styles.missionHeader}><div className={styles.headerRow}><div className={styles.routeTitle}><small>PLATFORM</small><h1>{type}</h1><p>Connection, audit and workspace controls for the mission-intelligence layer.</p></div></div></div><div className={styles.content}><div className={styles.dataGrid}>{[['FL3XX / charter system','Mission and schedule intake'],['Crew system','Qualifications, currency and duty context'],['Maintenance system','Aircraft state and deferred items'],['Weather provider','METAR / TAF / hazard context'],['NOTAM / airport data','Mission-filtered operational notices'],['Messaging','Briefing and acknowledgement delivery']].map(([t,d])=><article className={styles.dataCard} key={t}><span className={styles.dataCardIcon}><GitBranch size={14}/></span><h3>{t}</h3><p>{d}</p><div className={styles.dataMeta}><span>Integration</span><b>Configured</b></div></article>)}</div></div></main>;
}

function SourceDrawer({source,onClose}){
 if(!source)return null;
 return <div className={styles.drawerBackdrop} onMouseDown={onClose}><aside className={styles.drawer} onMouseDown={e=>e.stopPropagation()}><div className={styles.drawerHead}><b>Evidence detail</b><button onClick={onClose}><X size={13}/></button></div><div className={styles.crumb}>{source.kind} <ChevronRight size={9}/> Mission evidence</div><h2>{source.source}</h2><p>{source.detail}</p><div className={styles.drawerQuote}>{source.quote}</div><div className={styles.drawerMeta}><div><small>Mission status</small><b>{source.status}</b></div><div><small>Source type</small><b>{source.kind}</b></div><div><small>Review behavior</small><b>{source.status==='CLEAR'?'No action':'Human review'}</b></div><div><small>Traceability</small><b>Source linked</b></div></div><p style={{marginTop:18}}>Prototype note: in production this panel would open the controlled document section or authoritative live source used for the finding, including revision/time metadata.</p></aside></div>
}

function CommandPalette({open,onClose,setActive,setTab}){
 if(!open)return null;
 const items=[['Open Mission Workspace',Plane,()=>{setActive('Mission Workspace');setTab('Overview')}],['Go to Rules & Manuals',BookOpen,()=>setActive('Rules & Manuals')],['Open Change Monitor',Activity,()=>setActive('Change Monitor')],['Open Live Data',CloudSun,()=>setActive('Live Data')],['Generate mission brief',FileCheck2,()=>{setActive('Mission Workspace');setTab('Brief')}],['Open Integrations',GitBranch,()=>setActive('Integrations')]];
 return <div className={styles.paletteBackdrop} onMouseDown={onClose}><div className={styles.palette} onMouseDown={e=>e.stopPropagation()}><div className={styles.paletteSearch}><Search size={14}/><input autoFocus placeholder="Search Aeros or run a command…"/></div><div className={styles.paletteGroup}><small>QUICK ACTIONS</small>{items.map(([t,I,fn])=><button className={styles.paletteItem} onClick={()=>{fn();onClose()}} key={t}><I size={13}/>{t}</button>)}</div></div></div>
}

export default function Dashboard(){
 const [active,setActive]=useState('Mission Workspace');
 const [selected,setSelected]=useState(0);
 const [filter,setFilter]=useState('All');
 const [tab,setTab]=useState('Overview');
 const [finding,setFinding]=useState(0);
 const [drawer,setDrawer]=useState(null);
 const [palette,setPalette]=useState(false);
 const [toast,setToast]=useState('');
 const mission=missions[selected];
 useEffect(()=>{const fn=e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();setPalette(true)}if(e.key==='Escape'){setPalette(false);setDrawer(null)}};window.addEventListener('keydown',fn);return()=>window.removeEventListener('keydown',fn)},[]);
 function showToast(msg){setToast(msg);setTimeout(()=>setToast(''),1800)}
 function chooseMission(i){setSelected(i);setFinding(0);setTab('Overview');if(active!=='Mission Workspace')setActive('Mission Workspace')}
 const missionSections=['Mission Workspace','Mission Inbox','Briefings','Change Monitor'];
 return <div className={styles.app}>
  <Sidebar active={active} setActive={setActive}/>
  <div className={styles.main}><Topbar openPalette={()=>setPalette(true)}/><div className={styles.workspace}>
   <MissionRail selected={selected} setSelected={chooseMission} filter={filter} setFilter={setFilter}/>
   {active==='Mission Workspace'?<MissionWorkspace mission={mission} tab={tab} setTab={setTab} finding={finding} setFinding={setFinding} openSource={setDrawer} toast={showToast}/>:<KnowledgePage type={active}/>} 
   <EvidencePanel mission={mission} check={finding} setCheck={setFinding} openSource={setDrawer}/>
  </div></div>
  <SourceDrawer source={drawer} onClose={()=>setDrawer(null)}/>
  <CommandPalette open={palette} onClose={()=>setPalette(false)} setActive={setActive} setTab={setTab}/>
  {toast&&<div className={styles.toast}>{toast}</div>}
 </div>
}
