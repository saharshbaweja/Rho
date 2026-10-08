import Link from 'next/link';
import {getCurrentUserAndWorkspace} from '../../lib/workspace';

export default async function SettingsPage(){
  const {user,workspace,membership,subscription}=await getCurrentUserAndWorkspace();
  return <div className="aeros-site"><section className="as-page-hero"><div><div className="as-eyebrow">ACCOUNT & WORKSPACE</div><h1>Operator settings.</h1></div><div><p>Manage the user, workspace, plan and security context around Aeros.</p><div className="as-actions"><Link href="/dashboard/" className="as-btn">Back to dashboard</Link><Link href="/billing/" className="as-btn dark">Billing</Link></div></div></section><section className="as-section alt"><div className="as-inner" style={{maxWidth:900,display:'grid',gap:12}}>{[
    ['User',user?.email||'Demo mode'],
    ['Organization',workspace?.name||'Demo operator workspace'],
    ['Role',membership?.role||'owner'],
    ['Plan',subscription?.plan||'trial'],
    ['Subscription status',subscription?.status||'evaluation']
  ].map(([a,b])=><div key={a} style={{display:'grid',gridTemplateColumns:'220px 1fr',gap:20,padding:'18px 20px',border:'1px solid #deddd7',background:'#fff',borderRadius:12}}><span style={{fontSize:10,color:'#7b807b'}}>{a}</span><b style={{fontSize:12}}>{b}</b></div>)}<form action="/auth/signout" method="post" style={{marginTop:8}}><button className="as-btn dark">Sign out</button></form></div></section></div>;
}
