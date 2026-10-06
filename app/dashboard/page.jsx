'use client';
import {useEffect,useMemo,useState} from 'react';
import {Activity,AlertTriangle,Bell,BookOpen,Check,ChevronRight,CloudSun,FileCheck2,FileText,Globe2,MapPin,Plane,Plus,RadioTower,Search,Send,ShieldCheck,Sparkles,UsersRound,Wrench,X} from 'lucide-react';
import styles from './dashboard.module.css';

const missions=[
 {id:'AO-1842',route:'KTEB → EGLL',date:'Jul 16, 2024',depart:'16:20Z',duration:'5h 52m',aircraft:'N650AB',type:'Gulfstream G650',crew:'Chen / Russo',status:'Ready',tone:'green'},
 {id:'AO-1841',route:'KJFK → LSGG',date:'Jul 16, 2024',depart:'18:05Z',duration:'7h 10m',aircraft:'N905CR',type:'Citation CJ3',crew:'Smith / Lopez',status:'Review',tone:'amber'},
 {id:'AO-1840',route:'KLAX → RJTT',date:'Jul 17, 2024',depart:'09:30Z',duration:'11h 45m',aircraft:'N441CF',type:'Gulfstream G600',crew:'Brown / Kim',status:'Ready',tone:'green'},
 {id:'AO-1839',route:'EBBR → KJFK',date:'Jul 17, 2024',depart:'11:15Z',duration:'8h 04m',aircraft:'N712AS',type:'Challenger 350',crew:'Miller / Davis',status:'Planning',tone:'gray'},
 {id:'AO-1838',route:'OMDB → LFPG',date:'Jul 18, 2024',depart:'04:10Z',duration:'7h 08m',aircraft:'N560KT',type:'Global 6000',crew:'Patel / Wright',status:'Ready',tone:'green'},
 {id:'AO-1837',route:'KSEA → YSSY',date:'Jul 18, 2024',depart:'22:20Z',duration:'15h 51m',aircraft:'N310PX',type:'Gulfstream G550',crew:'Garcia / Chen',status:'Action',tone:'red'}
];

const statusCards=[
 {title:'Weather',state:'Clear',detail:'No significant risks',tone:'green',icon:CloudSun},
 {title:'NOTAMs',state:'2 Review',detail:'Affects arrival',tone:'amber',icon:RadioTower},
 {title:'Operator Rules',state:'Compliant',detail:'All requirements met',tone:'green',icon:BookOpen},
 {title:'Crew Legality',state:'Legal',detail:'Duty limits OK',tone:'green',icon:UsersRound},
 {title:'Aircraft Status',state:'Ready',detail:'No open defects',tone:'green',icon:Plane},
 {title:'Destination',state:'Clear',detail:'EGLL operating normal',tone:'green',icon:MapPin}
];

const decisions=[
 {title:'Arrival airport has active construction NOTAMs',body:'Runway 27R construction may create a 15–30 minute arrival delay. Consider alternate runway options and additional fuel.',source:'NOTAM EGLL A1234/24',meta:'Effective Jul 10 – Jul 25, 2024',tone:'red',state:'Action'},
 {title:'Moderate convective activity en route',body:'Scattered storms are forecast over the North Atlantic between 53N–60N. Consider a northern routing option.',source:'NOAA SIGWX',meta:'Valid Jul 16 · 18:00–00:00Z',tone:'amber',state:'Review'},
 {title:'Crew rest within limits',body:'All crew members are within reviewed duty and rest requirements for this mission.',source:'Crew Duty Record',meta:'Checked Jul 16 · 08:12 ET',tone:'green',state:'Clear'}
];

const updates=[
 ['NOTAM','New NOTAM affects EGLL','A1234/24 · Runway 27R construction','12 min ago','red'],
 ['Weather','Weather update','Convective activity increased en route','28 min ago','amber'],
 ['Aircraft','Aircraft MEL status change','N650AB · minor item deferred','1 hour ago','gray'],
 ['Crew','Crew duty time update','All crew within limits','2 hours ago','green']
];

const nav=[
 ['Missions',Plane],['Mission Brief',FileCheck2],['Change Monitor',Activity],['Live Data',CloudSun],['Crew',UsersRound],['Aircraft',Plane],['Compliance',ShieldCheck],['Reports',Globe2],['Ask Aeros',Sparkles]
];

function Tag({tone='gray',children}){return <span className={`${styles.tag} ${styles[tone]}`}>{children}</span>}

function RouteMap(){return <div className={styles.routeMap}>
 <div className={styles.mapToolbar}><button className={styles.active}>Route</button><button>Weather</button><button>NOTAMs</button><button>Airspace</button><span>● Live</span></div>
 <div className={`${styles.mapCity} ${styles.origin}`}><b>KTEB</b><span>Teterboro</span><small>12:20 ET</small></div>
 <div className={`${styles.mapCity} ${styles.destination}`}><b>EGLL</b><span>London</span><small>22:15 BST</small></div>
 <svg viewBox="0 0 1000 380" preserveAspectRatio="none" aria-hidden="true"><path className={styles.routeShadow} d="M90 280 C 330 180 620 165 910 105"/><path className={styles.routeLine} d="M90 280 C 330 180 620 165 910 105"/><circle className={styles.routeDot} cx="90" cy="280" r="7"/><circle className={styles.routeDot} cx="910" cy="105" r="7"/><g className={styles.routePlane}><text x="0" y="0">✈</text><animateMotion dur="7s" repeatCount="indefinite" path="M90 280 C 330 180 620 165 910 105"/></g></svg>
 <div className={styles.mapMetrics}>{[['Distance','5,973 km'],['Flight Time','5h 52m'],['Cruise Altitude','FL410'],['ETA (BST)','22:15'],['Fuel Burn','28,400 lb']].map(([a,b])=><div key={a}><span>{a}</span><b>{b}</b></div>)}</div>
 </div>}

function Sidebar({view,setView}){return <aside className={styles.sidebar}>
 <div className={styles.brand}><span><Plane size={16}/></span><b>Aeros</b></div>
 <nav>{nav.map(([n,I],i)=><button key={n} className={view===n?styles.active:''} onClick={()=>setView(n)}><I size={15}/><span>{n}</span>{n==='Change Monitor'&&<em>3</em>}{n==='Ask Aeros'&&<small>Beta</small>}</button>)}</nav>
 <div className={styles.sideArt}><div className={styles.sideAi}><span><Sparkles size={14}/></span><b>Aeros Intelligence</b><p>Get instant answers, analysis and recommendations against the active mission.</p><button onClick={()=>setView('Ask Aeros')}>Ask a question <ChevronRight size={11}/></button></div></div>
 </aside>}

function Topbar({openPalette}){return <header className={styles.topbar}><button className={styles.newMission}><Plus size={13}/>New mission</button><button className={styles.globalSearch} onClick={openPalette}><Search size={13}/>Search missions, flights, airports, crew, NOTAMs…<kbd>⌘K</kbd></button><div className={styles.topActions}><button><Bell size={14}/><i/></button><span className={styles.userAvatar}>SC</span><div><b>Sarah Chen</b><small>Operations Lead</small></div></div></header>}

function MissionList({selected,setSelected}){const[t,setT]=useState('Active');return <aside className={styles.missionRail}><div className={styles.railTitle}><div><h2>Missions</h2><small>Operator mission queue</small></div><button><Plus size={13}/>New Mission</button></div><div className={styles.railTabs}>{['Active','Upcoming','Completed'].map(x=><button className={t===x?styles.active:''} onClick={()=>setT(x)} key={x}>{x}{x==='Active'&&<span>8</span>}</button>)}</div><div className={styles.railSearch}><Search size={12}/><input placeholder="Search missions…"/></div><div className={styles.missionCards}>{missions.map((m,i)=><button className={`${styles.missionCard} ${selected===i?styles.selected:''}`} onClick={()=>setSelected(i)} key={m.id}><div><b>{m.id}</b><Tag tone={m.tone}>{m.status}</Tag></div><strong>{m.route}</strong><span>{m.date} · {i===0?'In 5h 52m':i===1?'In 2h 10m':i===2?'In 18h':i===3?'In 21h':i===4?'In 1d':'In 1d 4h'}</span><ChevronRight size={11}/></button>)}</div></aside>}

function StatusStrip(){return <div className={styles.statusStrip}>{statusCards.map(({title,state,detail,tone,icon:I})=><button key={title}><div><I size={13}/><b>{title}</b></div><Tag tone={tone}>{state}</Tag><span>{detail}</span></button>)}</div>}

function DecisionStack({selected,setSelected}){return <section className={styles.decision}><div className={styles.panelHead}><div><ShieldCheck size={14}/><b>Decision Stack</b><Tag tone="red">2 items need attention</Tag></div><button>View all →</button></div>{decisions.map((d,i)=><button className={`${styles.decisionRow} ${selected===i?styles.selected:''}`} onClick={()=>setSelected(i)} key={d.title}><span className={`${styles.decisionIcon} ${styles[d.tone]}`}>{d.tone==='green'?<Check size={12}/>:<AlertTriangle size={12}/>}</span><div><b>{d.title}</b><p>{d.body}</p><small>Source: {d.source} · {d.meta}</small></div><Tag tone={d.tone}>{d.state}</Tag><ChevronRight size={12}/></button>)}</section>}

function MissionCenter({mission,selectedDecision,setSelectedDecision,tab,setTab}){return <main className={styles.center}><div className={styles.missionHeader}><div className={styles.missionTop}><div><div className={styles.missionLabel}>MISSION {mission.id} <Tag tone={mission.tone}>{mission.status}</Tag></div><h1>{mission.route}</h1><p>Teterboro (KTEB) → London Heathrow (EGLL)</p><small>{mission.date} · {mission.type} ({mission.aircraft}) · Executive Charter</small></div><div className={styles.headerButtons}><button>Share</button><button>•••</button></div></div><div className={styles.missionTabs}>{['Overview','Mission Brief','Weather','NOTAMs','Crew','Aircraft','Compliance','Files'].map(x=><button key={x} className={tab===x?styles.active:''} onClick={()=>setTab(x)}>{x}</button>)}</div></div>
 {tab==='Overview'?<div className={styles.content}><StatusStrip/><RouteMap/><DecisionStack selected={selectedDecision} setSelected={setSelectedDecision}/></div>:<DetailView tab={tab}/>}</main>}

function DetailView({tab}){const data={
 'Mission Brief':['Mission brief','Current mission state prepared for dispatcher and pilot review.',['Route overview','Weather & significant risks','NOTAMs & airspace','Alternates & contingencies','Crew, aircraft & compliance']],
 'Weather':['Weather','Mission-relevant weather only.',['KTEB · VFR at departure','North Atlantic convective band · Review','EGLL · destination conditions stable','Alternate forecast remains within criteria']],
 'NOTAMs':['NOTAMs','Relevant notices ranked by mission impact.',['EGLL A1234/24 · Runway 27R construction','KTEB 07/188 · Taxiway restriction','NAT HLA advisory · informational']],
 'Crew':['Crew legality','Qualification, duty and company requirements.',['Captain · Legal · 8h12m duty','First Officer · Legal · 6h20m duty','International qualification · Current','Company route requirement · Met']],
 'Aircraft':['Aircraft status','Tail-specific operational state.',['N650AB · Available','MEL · 1 minor deferred item','Inspection state · Current','Fuel planning · 28,400 lb estimated']],
 'Compliance':['Compliance','Operator-specific rules and approvals.',['OpSpecs · Compliant','Company procedures · 1 review item','Crew records · Complete','Aircraft documents · Current']],
 'Files':['Mission files','Documents linked to AO-1842.',['Trip request.pdf','Current flight release draft','EGLL airport brief','Crew qualification packet']]
 }[tab]||['Workspace','Mission detail',['No data']];return <div className={styles.detail}><div className={styles.detailHero}><small>{tab.toUpperCase()}</small><h2>{data[0]}</h2><p>{data[1]}</p></div><div className={styles.detailGrid}>{data[2].map((x,i)=><article key={x}><span>{String(i+1).padStart(2,'0')}</span><b>{x}</b><p>Source-backed mission context is available from the connected operator and live-data systems.</p><button>Open details <ChevronRight size={11}/></button></article>)}</div></div>}

function Intelligence({selectedDecision,setSelectedDecision}){const d=decisions[selectedDecision];const[q,setQ]=useState('Why does this mission need review?');const answers={
 'Why does this mission need review?':'Two current conditions could materially affect the planned arrival: EGLL runway construction and en-route convective activity. Both are linked below with the source Aeros used.',
 'What changed since the last review?':'A new EGLL runway construction notice was added and the North Atlantic convective forecast increased. Crew legality and aircraft status remain clear.',
 'Show recommended actions':'Review alternate arrival runway options, compare the northern routing option, and add a fuel margin before final dispatcher review.'
 };return <aside className={styles.intelligence}><div className={styles.intelHead}><div><span><Sparkles size={14}/></span><b>Aeros Intelligence</b></div><Tag tone="green">AI</Tag></div><div className={styles.intelScroll}><div className={styles.question}>{q}</div><div className={styles.answer}><p>{answers[q]||answers['Why does this mission need review?']}</p><b>1. {d.title}</b><p>{d.body}</p><button className={styles.sourceCard}><FileText size={12}/><span><b>{d.source}</b><small>{d.meta}</small></span><ChevronRight size={11}/></button><b>2. En Route Weather</b><p>NOAA guidance indicates moderate convective activity along the current track. Aeros recommends comparing a northern routing option.</p><button className={styles.sourceCard}><CloudSun size={12}/><span><b>NOAA SIGWX Forecast</b><small>Valid 18:00–00:00Z</small></span><ChevronRight size={11}/></button></div><div className={styles.intelButtons}>{['What changed since the last review?','Show recommended actions'].map(x=><button key={x} onClick={()=>setQ(x)}>{x}<ChevronRight size={10}/></button>)}</div><div className={styles.updates}><div className={styles.updateHead}><b>Live Updates</b><Tag tone="green">● Live</Tag></div>{updates.map(([type,title,detail,time,tone])=><button key={title} onClick={()=>setSelectedDecision(type==='NOTAM'?0:type==='Weather'?1:2)}><span className={`${styles.updateIcon} ${styles[tone]}`}>{type==='Weather'?<CloudSun size={11}/>:type==='NOTAM'?<RadioTower size={11}/>:type==='Aircraft'?<Wrench size={11}/>:<UsersRound size={11}/>}</span><div><b>{title}</b><small>{detail}</small></div><em>{time}</em></button>)}</div></div><div className={styles.composer}><input placeholder="Ask Aeros about this mission…"/><button><Send size={12}/></button></div></aside>}

function SecondaryView({view}){const map={
 'Change Monitor':['Change Monitor','3 mission changes require attention.',Activity,updates.map(x=>[x[1],x[2],x[3]])],
 'Live Data':['Live Data','Mission-relevant sources are connected and current.',CloudSun,[['Weather products','8 connected','Live'],['NOTAM feed','24 raw · 4 relevant','Live'],['Airport sources','6 airports','Live'],['Charts','Cycle 2610','Current']]],
 'Crew':['Crew','Crew legality and duty state across active missions.',UsersRound,[['Sarah Chen · PIC','Legal','8h 12m duty'],['Marco Russo · SIC','Legal','6h 20m duty'],['David Smith · PIC','Review','Special airport requirement']]],
 'Aircraft':['Aircraft','Tail-specific mission readiness.',Plane,[['N650AB · G650','Ready','1 MEL item deferred'],['N905CR · CJ3','Ready','11.4h to inspection'],['N441CF · G600','Ready','No open defects']]],
 'Compliance':['Compliance','Operator rules, approvals and controlled documents.',ShieldCheck,[['Operations Specifications','Rev 34','Active'],['General Operations Manual','Rev 18','Active'],['MEL / CDL','Rev 11','Active'],['Company Minimums','Rev 15','Active']]],
 'Reports':['Reports','Mission review load, recurring friction and operator trends.',Globe2,[['Missions reviewed','142','30 days'],['Average review time','8m 42s','-18%'],['Change events','67','30 days'],['Manual lookups avoided','418','Estimated']]],
 'Mission Brief':['Mission Briefs','Prepared and reviewed mission briefs.',FileCheck2,[['AO-1842 · KTEB → EGLL','Draft','2 open review items'],['AO-1841 · KJFK → LSGG','Ready','Reviewed 14m ago'],['AO-1840 · KLAX → RJTT','Ready','Reviewed 1h ago']]],
 'Ask Aeros':['Ask Aeros','Ask across operator rules and live mission data.',Sparkles,[['Why does C070 apply to KASE?','Operator rules','Mission grounded'],['What changed on AO-1842?','Change monitor','Mission grounded'],['Which aircraft can replace N650AB?','Aircraft eligibility','Mission grounded']]]
 }[view];if(!map)return null;const[title,sub,I,rows]=map;return <main className={styles.secondary}><div className={styles.secondaryHero}><span><I size={20}/></span><div><small>WORKSPACE</small><h1>{title}</h1><p>{sub}</p></div></div><section className={styles.secondaryTable}><div className={styles.panelHead}><div><b>{title}</b><span>Live operational context</span></div><button>Filter</button></div>{rows.map((r,i)=><button key={r[0]}><span className={styles.rowIndex}>{String(i+1).padStart(2,'0')}</span><div><b>{r[0]}</b><small>{r[1]}</small></div><Tag tone={String(r[1]).toLowerCase().includes('review')?'amber':String(r[1]).toLowerCase().includes('ready')||String(r[1]).toLowerCase().includes('legal')||String(r[1]).toLowerCase().includes('active')||String(r[1]).toLowerCase().includes('live')?'green':'gray'}>{r[2]}</Tag><ChevronRight size={12}/></button>)}</section></main>}

function CommandPalette({close,setView}){return <div className={styles.paletteBackdrop} onClick={close}><div className={styles.palette} onClick={e=>e.stopPropagation()}><div className={styles.paletteSearch}><Search size={14}/><input autoFocus placeholder="Search Aeros or run a command…"/><kbd>ESC</kbd></div><small>JUMP TO</small>{nav.map(([n,I])=><button key={n} onClick={()=>{setView(n);close()}}><I size={14}/><span>{n}</span><ChevronRight size={11}/></button>)}</div></div>}

export default function Dashboard(){const[selected,setSelected]=useState(0);const[view,setView]=useState('Missions');const[decision,setDecision]=useState(0);const[tab,setTab]=useState('Overview');const[palette,setPalette]=useState(false);useEffect(()=>{const h=e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();setPalette(true)}if(e.key==='Escape')setPalette(false)};window.addEventListener('keydown',h);return()=>window.removeEventListener('keydown',h)},[]);const mission=missions[selected];return <div className={styles.app}><Sidebar view={view} setView={v=>{setView(v);if(v==='Missions')setTab('Overview')}}/><div className={styles.main}><Topbar openPalette={()=>setPalette(true)}/>{view==='Missions'?<div className={styles.workspace}><MissionList selected={selected} setSelected={i=>{setSelected(i);setDecision(0)}}/><MissionCenter mission={mission} selectedDecision={decision} setSelectedDecision={setDecision} tab={tab} setTab={setTab}/><Intelligence selectedDecision={decision} setSelectedDecision={setDecision}/></div>:<SecondaryView view={view}/>}</div>{palette&&<CommandPalette close={()=>setPalette(false)} setView={setView}/>}</div>}
