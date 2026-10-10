import Link from 'next/link';
import {ArrowUpRight,BookOpen,CloudSun,FileCheck2,Plane,RadioTower,SearchCheck,ShieldCheck,UsersRound} from 'lucide-react';

export function DmButton({href='/contact/',children,secondary=false}){return <Link href={href} className={secondary?'dm-btn dm-btn-secondary':'dm-btn dm-btn-primary'}>{children}{!secondary&&<ArrowUpRight size={14}/>}</Link>}

export function DmPageHero({eyebrow,title,body,primary='Request a demo',primaryHref='/contact/',secondary='Open Aeros',secondaryHref='/dashboard/',visual=true}){
 return <section className="dm-page-hero"><div className="dm-page-hero-copy"><div className="dm-eyebrow">{eyebrow}</div><h1>{title}</h1><p>{body}</p><div className="dm-actions"><DmButton href={primaryHref}>{primary}</DmButton><DmButton href={secondaryHref} secondary>{secondary} →</DmButton></div></div>{visual&&<MissionCanvas/>}</section>
}

export function MissionCanvas(){return <div className="dm-mission-canvas" aria-label="Aeros mission intelligence illustration">
 <div className="dm-canvas-grid"/>
 <div className="dm-flight-path"><span className="dm-airport a">KPDK</span><span className="dm-route-line"/><Plane size={19}/><span className="dm-route-line"/><span className="dm-airport b">KASE</span></div>
 <div className="dm-person p1"><span>DP</span><div><b>Dispatch</b><small>Reviewing change</small></div></div>
 <div className="dm-person p2"><span>CP</span><div><b>Chief Pilot</b><small>Crew current</small></div></div>
 <div className="dm-person p3"><span>AI</span><div><b>Aeros</b><small>Evaluating mission</small></div></div>
 <div className="dm-floating-card fc1"><small>WEATHER</small><b>KASE TAF amended</b><span>Ceiling trend ↓</span></div>
 <div className="dm-floating-card fc2"><small>OPERATOR RULE</small><b>Alternate review required</b><span>GOM §4.12</span></div>
 <div className="dm-floating-card fc3"><small>AIRCRAFT</small><b>N905CR · CJ3+</b><span>Available · MEL clear</span></div>
 <div className="dm-decision-card"><div><small>RECOMMENDED PATH</small><b>Add KDEN alternate</b><span>Preserve departure · +420 lb fuel</span></div><strong>92</strong></div>
 </div>}

export function DmTrustedStrip(){const labels=['Operator rules','Weather','NOTAMs','Aircraft','Crew','Airport state','Mission history','Source evidence'];return <section className="dm-trusted"><div className="dm-trusted-title">One operating context across the sources that already run the flight.</div><div className="dm-marquee"><div>{[...labels,...labels].map((x,i)=><span key={i}>{x}</span>)}</div></div></section>}

export function DmSplit({eyebrow,title,body,children,reverse=false,tone='white'}){return <section className={`dm-split ${reverse?'reverse':''} tone-${tone}`}><div className="dm-split-copy"><div className="dm-eyebrow">{eyebrow}</div><h2>{title}</h2><p>{body}</p></div><div className="dm-split-visual">{children||<DecisionTraceVisual/>}</div></section>}

export function DecisionTraceVisual(){return <div className="dm-trace-visual"><div className="dm-trace-head"><span>Mission AO-2418</span><em>Live evaluation</em></div><div className="dm-trace-row"><small>01</small><div><b>Condition</b><span>KASE ceiling forecast amended</span></div></div><div className="dm-trace-arrow">↓</div><div className="dm-trace-row"><small>02</small><div><b>Rule</b><span>Operator alternate planning criteria</span></div></div><div className="dm-trace-arrow">↓</div><div className="dm-trace-row dark"><small>03</small><div><b>Impact</b><span>Destination review required</span></div></div><div className="dm-trace-option"><small>OPTION</small><b>Add KDEN alternate</b><span>0 min delay · +420 lb fuel · crew legal</span></div></div>}

export function DmFeatureGrid({eyebrow,title,body,items}){return <section className="dm-features"><div className="dm-center-copy"><div className="dm-eyebrow">{eyebrow}</div><h2>{title}</h2><p>{body}</p></div><div className="dm-feature-grid">{items.map((item,i)=>{const [title,desc,accent='blue',Icon=SearchCheck]=item;return <article className={`dm-feature accent-${accent}`} key={title}><div className="dm-feature-number"><span>0{i+1}</span><i/></div><div className="dm-feature-icon"><Icon size={18}/></div><h3>{title}</h3><p>{desc}</p></article>})}</div></section>}

export function DmSteps({eyebrow,title,body,items,dark=false}){return <section className={`dm-steps ${dark?'dark':''}`}><div className="dm-steps-copy"><div className="dm-eyebrow">{eyebrow}</div><h2>{title}</h2><p>{body}</p></div><div className="dm-step-list">{items.map((item,i)=><article key={item[0]}><span>0{i+1}</span><div><h3>{item[0]}</h3><p>{item[1]}</p></div></article>)}</div></section>}

export function DmQuoteLike({title,body,label='THE OPERATING MODEL'}){return <section className="dm-quote-like"><div><div className="dm-eyebrow">{label}</div><h2>{title}</h2><p>{body}</p></div><div className="dm-quote-art"><div className="dm-quote-orbit one"/><div className="dm-quote-orbit two"/><div className="dm-quote-center"><Plane size={22}/><b>Aeros</b><span>Mission state</span></div><div className="dm-quote-node n1">Weather</div><div className="dm-quote-node n2">Rules</div><div className="dm-quote-node n3">Crew</div><div className="dm-quote-node n4">Aircraft</div></div></section>}

export function DmRoleBand(){const roles=[[RadioTower,'Dispatch & OCC','Manage by exception instead of rebuilding mission context.'],[BookOpen,'Directors of Operations','Turn approved procedures into a controlled decision layer.'],[UsersRound,'Chief pilots','Keep crew eligibility and company limits attached to the mission.'],[Plane,'Pilots','Receive concise briefs from the same reviewed evidence.']];return <section className="dm-role-band"><div className="dm-center-copy"><div className="dm-eyebrow">ONE OPERATING PICTURE</div><h2>Shared context for everyone responsible for the flight.</h2></div><div className="dm-role-grid">{roles.map(([Icon,title,desc])=><article key={title}><Icon size={18}/><div><h3>{title}</h3><p>{desc}</p></div><ArrowUpRight size={13}/></article>)}</div></section>}

export function DmSecurityBand(){return <section className="dm-security"><div><div className="dm-eyebrow">CONTROL BEFORE AUTONOMY</div><h2>Designed for decisions people have to stand behind.</h2><p>Aeros keeps source evidence, operator-specific rules, missing context and human review boundaries visible throughout the workflow.</p></div><div className="dm-security-grid">{[[ShieldCheck,'Human authority','Recommendations remain reviewable before action.'],[BookOpen,'Controlled knowledge','Operator documents retain source and revision context.'],[FileCheck2,'Decision trace','Material conclusions stay linked to evidence.'],[CloudSun,'Continuous state','Only changes that affect the mission are elevated.']].map(([Icon,t,d])=><article key={t}><Icon size={18}/><h3>{t}</h3><p>{d}</p></article>)}</div></section>}

export function DmFinalCTA({eyebrow='DESIGN PARTNERS',title='Bring one real mission. We’ll show you the decision trace.',body='Run Aeros beside your current workflow using the rules and operating context your team already trusts.',primary='Request a demo',primaryHref='/contact/'}){return <section className="dm-final"><div className="dm-eyebrow">{eyebrow}</div><h2>{title}</h2><p>{body}</p><div className="dm-actions"><DmButton href={primaryHref}>{primary}</DmButton><DmButton href="/dashboard/" secondary>Open the product →</DmButton></div></section>}

export function DmSimpleCards({items}){return <div className="dm-simple-grid">{items.map((item,i)=><article key={item[0]}><span>0{i+1}</span><h3>{item[0]}</h3><p>{item[1]}</p></article>)}</div>}
