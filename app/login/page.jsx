'use client';
import Link from 'next/link';
import {useRouter} from 'next/navigation';

export default function Login(){
 const router=useRouter();
 return <section className="auth-page"><div className="auth-card"><div className="eyebrow">WELCOME BACK</div><h1>Log in to Aeros.</h1><p>Open your operations workspace and pick up where your team left off.</p><form onSubmit={e=>{e.preventDefault();router.push('/dashboard/')}}><label>WORK EMAIL<input required type="email" placeholder="you@operator.com"/></label><label>PASSWORD<input required type="password" placeholder="••••••••"/></label><button>Log in →</button></form><div className="auth-alt">New to Aeros? <Link href="/signup/">Create an account</Link></div></div></section>
}