'use client';
import Link from 'next/link';
import {useEffect,useMemo,useRef,useState} from 'react';
import {ArrowLeft,BookOpen,Check,ChevronRight,FileText,Loader2,Plane,Search,Sparkles,Upload,UsersRound,X} from 'lucide-react';
import styles from './knowledge.module.css';

const demoDocs=[
 {id:'demo-1',title:'General Operations Manual',document_type:'gom',revision:'Rev 18',status:'review',metadata:{summary:'Company operating policy and mission review procedures.',candidate_rule_count:14}},
 {id:'demo-2',title:'Operations Specifications',document_type:'opspec',revision:'Rev 24',status:'review',metadata:{summary:'FAA-approved operator authorizations and limitations.',candidate_rule_count:9}},
 {id:'demo-3',title:'CJ3 MEL',document_type:'mel',revision:'Rev 11',status:'review',metadata:{summary:'Deferred equipment and dispatch condition guidance.',candidate_rule_count:7}}
];
const demoRules=[
 {id:'r1',source_document_id:'demo-1',category:'weather',title:'Alternate required below company planning threshold',source_locator:'GOM §4.12',source_excerpt:'An alternate airport must be designated when destination weather is forecast below the company planning threshold.',validation_status:'validated',confidence:.97,rule_json:{kind:'requirement',human_review_required:false}},
 {id:'r2',source_document_id:'demo-2',category:'airport',title:'Special airport review applies to Aspen mission profile',source_locator:'OpSpec C070',source_excerpt:'Operations into listed special airports require the approved qualification or review process.',validation_status:'draft',confidence:.91,rule_json:{kind:'authorization',human_review_required:true}},
 {id:'r3',source_document_id:'demo-3',category:'mel',title:'Deferred indication item has no route restriction',source_locator:'MEL 32-01',source_excerpt:'Item may be inoperative provided associated procedures are completed and no dispatch restriction is introduced.',validation_status:'validated',confidence:.96,rule_json:{kind:'eligibility',human_review_required:false}}
];

function Badge({status}){return <span className={`${styles.badge} ${styles[status]||''}`}>{status}</span>}

export default function KnowledgeWorkspace(){
 const [documents,setDocuments]=useState(demoDocs);
 const [rules,setRules]=useState(demoRules);
 const [selectedDoc,setSelectedDoc]=useState('demo-1');
 const [loading,setLoading]=useState(true);
 const [demo,setDemo]=useState(false);
 const [uploading,setUploading]=useState(false);
 const [message,setMessage]=useState('');
 const [query,setQuery]=useState('');
 const fileRef=useRef(null);

 const load=async()=>{setLoading(true);try{const r=await fetch('/api/knowledge',{cache:'no-store'});if(r.status===401){setDemo(true);return}const data=await r.json();if(!r.ok)throw new Error(data.error||'Could not load knowledge base');setDocuments(data.documents||[]);setRules(data.rules||[]);setDemo(false);if(data.documents?.length&&!data.documents.some(d=>d.id===selectedDoc))setSelectedDoc(data.documents[0].id)}catch(e){setMessage(e.message)}finally{setLoading(false)}};
 useEffect(()=>{load()},[]);
 const doc=documents.find(d=>d.id===selectedDoc)||documents[0];
 const visibleRules=useMemo(()=>rules.filter(r=>(!selectedDoc||r.source_document_id===selectedDoc)&&(!query||`${r.title} ${r.source_locator} ${r.category}`.toLowerCase().includes(query.toLowerCase()))),[rules,selectedDoc,query]);
 const counts=useMemo(()=>({validated:rules.filter(r=>r.validation_status==='validated').length,draft:rules.filter(r=>r.validation_status==='draft').length,documents:documents.length}),[rules,documents]);

 const upload=async e=>{const file=e.target.files?.[0];if(!file)return;setUploading(true);setMessage('');try{const form=new FormData();form.append('file',file);form.append('document_type','manual');const r=await fetch('/api/knowledge/ingest',{method:'POST',body:form});const data=await r.json();if(!r.ok)throw new Error(data.error||'Document processing failed');setMessage(`${data.rules?.length||0} candidate rules extracted. Review them before they become operational.`);await load();if(data.document?.id)setSelectedDoc(data.document.id)}catch(err){setMessage(err.message)}finally{setUploading(false);if(fileRef.current)fileRef.current.value=''}};
 const review=async(ruleId,status)=>{if(demo){setRules(v=>v.map(r=>r.id===ruleId?{...r,validation_status:status}:r));return}const r=await fetch('/api/knowledge',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({ruleId,status})});const data=await r.json();if(!r.ok){setMessage(data.error||'Could not update rule');return}setRules(v=>v.map(x=>x.id===ruleId?data.rule:x))};

 return <div className={styles.app}>
  <aside className={styles.sidebar}>
   <Link href="/dashboard/" className={styles.brand}><span>A</span><b>Aeros</b></Link>
   <div className={styles.sideLabel}>INTELLIGENCE</div>
   <Link href="/dashboard/"><Plane size={15}/>Mission workspace</Link>
   <button className={styles.active}><BookOpen size={15}/>Operator knowledge</button>
   <Link href="/dashboard/"><Sparkles size={15}/>Aeros Intelligence</Link>
   <div className={styles.sideFoot}><span><i/> Knowledge engine online</span><small>Every validated rule keeps its source.</small></div>
  </aside>
  <main className={styles.main}>
   <header className={styles.topbar}><Link href="/dashboard/"><ArrowLeft size={14}/>Back to mission</Link><div><b>Operator Knowledge</b><span>{demo?'Demo workspace':'Live operator workspace'}</span></div><button onClick={()=>fileRef.current?.click()} disabled={uploading||demo}>{uploading?<Loader2 size={13} className={styles.spin}/>:<Upload size={13}/>} {uploading?'Extracting rules…':'Upload document'}</button><input ref={fileRef} type="file" hidden accept=".pdf,.txt,.md,.json,.csv,.docx" onChange={upload}/></header>
   <section className={styles.hero}>
    <div><small>OPERATOR-SPECIFIC INTELLIGENCE</small><h1>Teach Aeros how this operator actually flies.</h1><p>Upload approved operational documents. Aeros extracts candidate rules, preserves the source, and waits for operator validation before those rules can influence a mission.</p></div>
    <div className={styles.stats}><div><span>Documents</span><b>{counts.documents}</b></div><div><span>Validated rules</span><b>{counts.validated}</b></div><div><span>Need review</span><b>{counts.draft}</b></div></div>
   </section>
   {demo&&<div className={styles.notice}><Sparkles size={13}/><span>You are viewing a demo knowledge base. <Link href="/login/">Log in</Link> to upload an operator document and run real extraction.</span></div>}
   {message&&<div className={styles.notice}><span>{message}</span><button onClick={()=>setMessage('')}><X size={12}/></button></div>}
   <section className={styles.workspace}>
    <aside className={styles.documents}>
     <div className={styles.panelTitle}><span>CONTROLLED SOURCES</span><b>{documents.length}</b></div>
     {loading&&<div className={styles.loading}><Loader2 size={15} className={styles.spin}/>Loading knowledge…</div>}
     {!loading&&documents.map(d=><button key={d.id} onClick={()=>setSelectedDoc(d.id)} className={d.id===selectedDoc?styles.selected:''}><span className={styles.docIcon}><FileText size={14}/></span><span><b>{d.title}</b><small>{d.document_type?.toUpperCase()} · {d.revision||'No revision'}</small></span><Badge status={d.status}/></button>)}
     {!loading&&!documents.length&&<div className={styles.empty}>Upload the first controlled source to start the operator knowledge layer.</div>}
    </aside>
    <section className={styles.rules}>
     <div className={styles.rulesHead}><div><small>{doc?.document_type?.toUpperCase()||'SOURCE'}</small><h2>{doc?.title||'Operator knowledge'}</h2><p>{doc?.metadata?.summary||'Extracted rules remain candidates until an authorized operator validates them.'}</p></div><div className={styles.search}><Search size={13}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search extracted rules"/></div></div>
     <div className={styles.ruleHeader}><span>RULE</span><span>SOURCE</span><span>CONFIDENCE</span><span>STATE</span><span/></div>
     <div className={styles.ruleList}>{visibleRules.map(r=><article key={r.id}>
       <div className={styles.ruleMain}><span className={styles.ruleIcon}><BookOpen size={13}/></span><span><b>{r.title}</b><small>{r.category} · {r.rule_json?.kind||'rule'}</small></span></div>
       <button className={styles.source}><b>{r.source_locator||'Source'}</b><small>{r.source_excerpt||'Open source evidence'}</small></button>
       <div className={styles.confidence}><span style={{'--value':`${Math.round((r.confidence||0)*100)}%`}}/><b>{r.confidence!=null?`${Math.round(r.confidence*100)}%`:'—'}</b></div>
       <Badge status={r.validation_status}/>
       <div className={styles.actions}>{r.validation_status!=='validated'&&<button onClick={()=>review(r.id,'validated')}><Check size={12}/>Validate</button>}{r.validation_status!=='rejected'&&<button className={styles.secondary} onClick={()=>review(r.id,'rejected')}>Reject</button>}</div>
      </article>)}</div>
     {!visibleRules.length&&<div className={styles.empty}>No candidate rules match this source and search.</div>}
    </section>
   </section>
   <section className={styles.bottom}><div><small>HOW A RULE BECOMES OPERATIONAL</small><h3>Extracted by AI. Approved by the operator. Executed by the rules engine.</h3></div><div className={styles.flow}>{[['01','Extract','Grok finds candidate rules and exact source evidence.'],['02','Validate','An authorized operator confirms the interpretation.'],['03','Structure','The rule becomes machine-readable mission logic.'],['04','Evaluate','Aeros applies it only when mission conditions match.']].map(([n,t,d])=><div key={n}><span>{n}</span><b>{t}</b><p>{d}</p><ChevronRight size={12}/></div>)}</div></section>
  </main>
 </div>
}
