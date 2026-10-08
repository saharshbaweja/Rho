'use client';
import {useState} from 'react';
import {Check,ExternalLink} from 'lucide-react';

const plans=[
  {id:'design_partner',eyebrow:'DESIGN PARTNER',name:'Design Partner',price:'From $750 / month',description:'Founder-led implementation around one real mission-review workflow.',features:['14-day evaluation workspace','Historical + live mission testing','Rule and source mapping','Mission intelligence + option table','Direct implementation support']},
  {id:'operator',eyebrow:'OPERATOR',name:'Flight Operations',price:'From $2,500 / month',description:'Recurring operational deployment once the decision loop is validated.',features:['Everything in Design Partner','Live monitoring and change detection','Operator knowledge layer','Team access and audit history','Priority integrations and support']}
];

export default function BillingClient({subscription,configured}){
  const [loading,setLoading]=useState('');
  const [error,setError]=useState('');
  const checkout=async plan=>{
    setLoading(plan);setError('');
    try{const res=await fetch('/api/billing/checkout',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({plan})});const data=await res.json();if(!res.ok)throw new Error(data.error||'Checkout failed');window.location.href=data.url;}catch(e){setError(e.message)}finally{setLoading('')}
  };
  const portal=async()=>{
    setLoading('portal');setError('');
    try{const res=await fetch('/api/billing/portal',{method:'POST'});const data=await res.json();if(!res.ok)throw new Error(data.error||'Portal unavailable');window.location.href=data.url;}catch(e){setError(e.message)}finally{setLoading('')}
  };
  return <div style={{display:'grid',gap:18}}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:16,padding:'14px 16px',border:'1px solid #deddd7',borderRadius:12,background:'#fff'}}><div><small style={{fontSize:8,letterSpacing:'.13em',color:'#777'}}>CURRENT PLAN</small><div style={{fontSize:18,fontWeight:650,marginTop:4,textTransform:'capitalize'}}>{subscription?.plan?.replace('_',' ')||'Trial'}</div><div style={{fontSize:10,color:'#777',marginTop:2}}>{subscription?.status||'Evaluation mode'}</div></div>{subscription?.stripe_customer_id&&<button onClick={portal} disabled={loading==='portal'} style={{height:36,padding:'0 12px',border:'1px solid #d7d5ce',borderRadius:8,background:'#fff',fontSize:10,cursor:'pointer'}}>{loading==='portal'?'Opening…':'Manage billing'} <ExternalLink size={10}/></button>}</div>
    {!configured&&<div style={{padding:12,borderRadius:10,background:'#fff7e8',border:'1px solid #eeddb8',fontSize:10,color:'#8b611f'}}>Stripe is wired into the product but the production Stripe environment variables have not been added yet.</div>}
    {error&&<div style={{padding:12,borderRadius:10,background:'#fff0f2',border:'1px solid #f0cbd0',fontSize:10,color:'#a84956'}}>{error}</div>}
    <div style={{display:'grid',gridTemplateColumns:'repeat(2,minmax(0,1fr))',gap:12}}>{plans.map((p,i)=><article key={p.id} style={{border:'1px solid '+(i===1?'#1c211d':'#deddd7'),borderRadius:16,padding:24,background:i===1?'#111411':'#fff',color:i===1?'#fff':'#171917',minHeight:420,display:'flex',flexDirection:'column'}}><small style={{fontSize:8,letterSpacing:'.14em',color:i===1?'#8f9a92':'#858a85'}}>{p.eyebrow}</small><h2 style={{fontSize:30,letterSpacing:'-.045em',margin:'12px 0 5px'}}>{p.name}</h2><strong style={{fontSize:16}}>{p.price}</strong><p style={{fontSize:11,lineHeight:1.6,color:i===1?'#adb5af':'#737a74'}}>{p.description}</p><div style={{display:'grid',gap:9,margin:'24px 0'}}>{p.features.map(f=><div key={f} style={{fontSize:10,color:i===1?'#c8cec9':'#666d67'}}><Check size={11} style={{marginRight:7,verticalAlign:'middle'}}/>{f}</div>)}</div><button onClick={()=>checkout(p.id)} disabled={!configured||loading===p.id} style={{height:42,borderRadius:8,border:i===1?'1px solid #fff':'1px solid #111',background:i===1?'#fff':'#111',color:i===1?'#111':'#fff',fontSize:10,fontWeight:700,cursor:configured?'pointer':'not-allowed',marginTop:'auto'}}>{loading===p.id?'Opening checkout…':subscription?.plan===p.id?'Current plan':'Activate plan'}</button></article>)}</div>
  </div>;
}
