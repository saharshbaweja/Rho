'use client';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import {createClient,hasSupabaseBrowserConfig} from '../../lib/supabase/client';
import styles from '../auth-form.module.css';

export default function Signup(){
  const router=useRouter();
  const [form,setForm]=useState({name:'',email:'',password:'',organization:'',role:'Dispatcher / OCC'});
  const [loading,setLoading]=useState(false);
  const [message,setMessage]=useState('');
  const [success,setSuccess]=useState(false);
  const configured=hasSupabaseBrowserConfig();
  const set=(key,value)=>setForm(v=>({...v,[key]:value}));
  const submit=async e=>{
    e.preventDefault();setMessage('');setSuccess(false);
    if(!configured){setMessage('Authentication is ready in code, but Supabase environment variables have not been added to this deployment yet.');return;}
    setLoading(true);
    const supabase=createClient();
    const plan=new URLSearchParams(window.location.search).get('plan')||'trial';
    const redirect=`${window.location.origin}/auth/callback?next=${encodeURIComponent(plan==='trial'?'/dashboard/':`/billing/?plan=${plan}`)}`;
    const {data,error}=await supabase.auth.signUp({
      email:form.email,
      password:form.password,
      options:{emailRedirectTo:redirect,data:{full_name:form.name,organization_name:form.organization,role:form.role,requested_plan:plan}}
    });
    setLoading(false);
    if(error){setMessage(error.message);return;}
    if(data.session){router.push(plan==='trial'?'/dashboard/':`/billing/?plan=${plan}`);router.refresh();return;}
    setSuccess(true);setMessage('Check your email to verify the account. Your operator workspace will be created automatically when verification completes.');
  };
  return <div className={styles.page}>
    <section className={styles.story}><div><small>CREATE AN OPERATOR WORKSPACE</small><h1>Bring one flight. Build the operating context around it.</h1><p>Aeros begins with a 14-day evaluation workspace. Load missions, validate rules, run live weather through the decision engine, then move into a design-partner deployment when the workflow proves value.</p></div><div className={styles.trace}>{[['Workspace','Operator-isolated data','PRIVATE'],['Rules','Source-backed validation','TRACEABLE'],['Mission','Continuous re-evaluation','LIVE'],['Authority','Human review retained','CONTROLLED']].map(([a,b,c])=><div key={a}><span>{a}</span><b>{b}</b><em>{c}</em></div>)}</div></section>
    <section className={styles.formWrap}><form className={styles.card} onSubmit={submit}><div className={styles.eyebrow}>GET STARTED</div><h2>Create your workspace.</h2><p>Start in evaluation mode, then activate billing when you are ready to run a design-partner deployment.</p>{!configured&&<div className={`${styles.message} ${styles.config}`}>Supabase is not configured on this deployment yet. Add the production keys and account creation becomes live.</div>}{message&&<div className={`${styles.message} ${success?styles.success:styles.error}`}>{message}</div>}<div className={`${styles.fields} ${styles.grid}`}><div className={styles.field}><label>Name</label><input required value={form.name} onChange={e=>set('name',e.target.value)} placeholder="Your name"/></div><div className={styles.field}><label>Work email</label><input required type="email" value={form.email} onChange={e=>set('email',e.target.value)} placeholder="you@operator.com"/></div><div className={styles.field}><label>Organization</label><input required value={form.organization} onChange={e=>set('organization',e.target.value)} placeholder="Operator or flight department"/></div><div className={styles.field}><label>Role</label><select value={form.role} onChange={e=>set('role',e.target.value)}><option>Dispatcher / OCC</option><option>Director of Operations</option><option>Chief Pilot</option><option>Pilot</option><option>Safety / Compliance</option><option>Founder / Administrator</option></select></div></div><div className={styles.fields}><div className={styles.field}><label>Password</label><input required minLength={8} type="password" value={form.password} onChange={e=>set('password',e.target.value)} placeholder="At least 8 characters" autoComplete="new-password"/></div></div><button className={styles.button} disabled={loading||success}>{loading?'Creating workspace…':success?'Verification sent':'Create workspace →'}</button><p className={styles.terms}>By creating a workspace you acknowledge that Aeros is decision-support software and operational authority remains with authorized personnel.</p><div className={styles.foot}>Already have an account? <Link href="/login/">Log in</Link></div></form></section>
  </div>;
}
