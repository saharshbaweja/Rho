'use client';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import {createClient,hasSupabaseBrowserConfig} from '../../lib/supabase/client';
import styles from '../auth-form.module.css';

export default function Login(){
  const router=useRouter();
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [loading,setLoading]=useState(false);
  const [message,setMessage]=useState('');
  const configured=hasSupabaseBrowserConfig();
  const submit=async e=>{
    e.preventDefault();setMessage('');
    if(!configured){setMessage('Authentication is ready in code, but Supabase environment variables have not been added to this deployment yet.');return;}
    setLoading(true);
    const supabase=createClient();
    const {error}=await supabase.auth.signInWithPassword({email,password});
    setLoading(false);
    if(error){setMessage(error.message);return;}
    const next=new URLSearchParams(window.location.search).get('next')||'/dashboard/';
    router.push(next);router.refresh();
  };
  return <div className={styles.page}>
    <section className={styles.story}><div><small>AEROS OPERATIONS</small><h1>One operational state. Every relevant source.</h1><p>Return to the mission workspace where operator rules, live conditions, crew and aircraft state converge into a reviewable decision trace.</p></div><div className={styles.trace}>{[['Weather','KASE TAF amended','MONITORING'],['Rules','OpSpec C070 matched','CURRENT'],['Aircraft','MEL 32-01 evaluated','CLEAR'],['Decision','2 review items','LIVE']].map(([a,b,c])=><div key={a}><span>{a}</span><b>{b}</b><em>{c}</em></div>)}</div></section>
    <section className={styles.formWrap}><form className={styles.card} onSubmit={submit}><div className={styles.eyebrow}>WELCOME BACK</div><h2>Log in to Aeros.</h2><p>Access your operator workspace, mission reviews and intelligence history.</p>{!configured&&<div className={`${styles.message} ${styles.config}`}>Supabase is not configured on this deployment yet. Add the production keys and this form becomes live.</div>}{message&&<div className={`${styles.message} ${styles.error}`}>{message}</div>}<div className={styles.fields}><div className={styles.field}><label>Work email</label><input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@operator.com" autoComplete="email"/></div><div className={styles.field}><label>Password</label><input required type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" autoComplete="current-password"/></div></div><button className={styles.button} disabled={loading}>{loading?'Signing in…':'Log in →'}</button><div className={styles.foot}>New to Aeros? <Link href="/signup/">Create an operator workspace</Link></div></form></section>
  </div>;
}
