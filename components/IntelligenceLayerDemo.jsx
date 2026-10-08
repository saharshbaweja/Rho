'use client';
import Link from 'next/link';
import {useState} from 'react';
import {BookOpen,Check,ChevronRight,CloudSun,FileText,Plane,Sparkles,UsersRound} from 'lucide-react';

const tabs={
 Knowledge:{title:'Operator knowledge becomes executable context.',body:'Aeros ingests OpSpecs, GOM, MEL/CDL and training material, extracts candidate operating rules, and keeps every rule tied to the exact source for operator validation.'},
 Reasoning:{title:'The model does not decide legality.',body:'Structured rules and live mission state produce deterministic PASS / REVIEW / ACTION checks. AI explains the result, finds related context, and generates the operational brief.'},
 Copilot:{title:'Ask the operation a question.',body:'Aeros answers inside the active mission using only the operator knowledge and live evidence attached to that flight. Every answer stays source-backed and reviewable.'}
};

export default function IntelligenceLayerDemo(){
 const [tab,setTab]=useState('Knowledge');
 const [selected,setSelected]=useState(0);
 const [query,setQuery]=useState('Why does this mission need review?');
 const rules=[
  ['GOM §4.12','Alternate required below planning threshold','Validated'],
  ['OpSpec C070','Special airport review applies','Validated'],
  ['MEL 32-01','Deferred item has no route restriction','Validated']
 ];
 return <section className="ai-intel-section">
   <div className="ai-intel-head"><div><div className="as-eyebrow">AEROS INTELLIGENCE</div><h2>Not a chatbot on top of PDFs. An operating intelligence layer.</h2></div><p>Company knowledge, live flight state, deterministic checks, and AI reasoning stay separated on purpose. That is how Aeros can be useful without becoming a black box.</p></div>
   <div className="ai-intel-tabs">{Object.keys(tabs).map(x=><button key={x} className={tab===x?'active':''} onClick={()=>setTab(x)}>{x}</button>)}</div>
   <div className="ai-intel-frame">
    <div className="ai-intel-copy"><span>0{Object.keys(tabs).indexOf(tab)+1}</span><h3>{tabs[tab].title}</h3><p>{tabs[tab].body}</p><div className="intel-principles"><b><Check size={12}/> Source-backed</b><b><Check size={12}/> Operator validated</b><b><Check size={12}/> Human review retained</b></div></div>
    <div className="ai-intel-product">
      {tab==='Knowledge'&&<div className="knowledge-surface">
        <div className="knowledge-top"><div><small>OPERATOR KNOWLEDGE</small><b>Prestige Aviation · Part 135</b></div><span><i/> 4 sources synced</span></div>
        <div className="knowledge-grid"><aside>{[['OpSpecs','Rev 24'],['General Operations Manual','Rev 18'],['CJ3 MEL','Rev 11'],['Crew Training Manual','Rev 7']].map(([a,b],i)=><button className={selected===i?'active':''} onClick={()=>setSelected(i)} key={a}><FileText size={13}/><span><b>{a}</b><small>{b}</small></span><ChevronRight size={11}/></button>)}</aside><section><small>EXTRACTED + VALIDATED RULES</small>{rules.map(([src,title,state])=><div className="rule-line" key={src}><span><BookOpen size={13}/></span><div><b>{title}</b><small>{src}</small></div><em>{state}</em></div>)}<Link className="knowledge-action" href="/dashboard/knowledge/"><Sparkles size={12}/> Open the knowledge workspace</Link></section></div>
      </div>}
      {tab==='Reasoning'&&<div className="reasoning-surface">
        <div className="reasoning-flow"><div><BookOpen size={15}/><b>Operator rules</b><small>GOM · OpSpecs · MEL</small></div><span>+</span><div><CloudSun size={15}/><b>Live state</b><small>Weather · NOTAM · airport</small></div><span>+</span><div><UsersRound size={15}/><b>Mission state</b><small>Crew · aircraft · timing</small></div><span>→</span><div className="reasoning-core"><Sparkles size={16}/><b>Aeros engine</b><small>evaluate dependencies</small></div></div>
        <div className="reasoning-table"><div><span>CHECK</span><span>EVIDENCE</span><span>RULE</span><span>RESULT</span></div>{[['Destination minima','KASE ceiling trending lower','GOM §4.12','REVIEW'],['Crew legality','8h 12m projected duty','Duty profile','PASS'],['Aircraft eligibility','MEL 32-01 open','MEL 32-01','PASS'],['Special airport','KASE mission profile','OpSpec C070','REVIEW']].map(r=><div key={r[0]}><b>{r[0]}</b><span>{r[1]}</span><span>{r[2]}</span><em className={r[3]==='PASS'?'pass':'review'}>{r[3]}</em></div>)}</div>
      </div>}
      {tab==='Copilot'&&<div className="copilot-surface">
        <div className="copilot-context"><div><Plane size={14}/><span><small>ACTIVE MISSION</small><b>AO-2418 · KPDK → KASE</b></span></div><em>2 REVIEW</em></div>
        <div className="copilot-thread"><div className="copilot-question">{query}</div><div className="copilot-answer"><span><Sparkles size={13}/></span><div><b>Aeros</b><p>The mission needs review because destination weather now intersects the operator's alternate-planning threshold and KASE triggers the approved special-airport review workflow.</p><div className="copilot-sources"><button>GOM §4.12</button><button>OpSpec C070</button><button>KASE TAF 071720Z</button></div></div></div></div>
        <div className="copilot-prompts">{['What changed since review?','Compare viable options','Draft the pilot brief'].map(x=><button key={x} onClick={()=>setQuery(x)}>{x}<ChevronRight size={10}/></button>)}</div>
      </div>}
    </div>
   </div>
  </section>
}
