'use client';
import Link from 'next/link';
import {useRouter} from 'next/navigation';

export default function Signup(){
 const router=useRouter();
 return <section className="auth-page signup-page"><div className="auth-card wide"><div className="eyebrow">GET STARTED</div><h1>Create your Aeros workspace.</h1><p>Set up your operation and explore the live dashboard. This prototype routes directly into the product experience.</p><form onSubmit={e=>{e.preventDefault();router.push('/dashboard/')}}><label>NAME<input required placeholder="Your name"/></label><label>WORK EMAIL<input required type="email" placeholder="you@operator.com"/></label><label>ORGANIZATION<input required placeholder="Flight school, charter operator, FBO..."/></label><label>ROLE<select defaultValue=""><option value="" disabled>Select your role</option><option>Owner / GM</option><option>Scheduler / Dispatcher</option><option>Chief Instructor</option><option>Maintenance</option><option>Operations</option></select></label><button className="wide-button">Create workspace →</button></form><div className="auth-alt">Already have an account? <Link href="/login/">Log in</Link></div></div></section>
}