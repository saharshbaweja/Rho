import {NextResponse} from 'next/server';
import {getCurrentUserAndWorkspace} from '../../../lib/workspace';
import {createAdminClient} from '../../../lib/supabase/admin';

export const dynamic='force-dynamic';

const SYSTEM=`You are Aeros Intelligence, the explanation layer for flight-operations decision support.
The structured mission state, findings, rules, and sources supplied by Aeros are authoritative for this response.
You do not independently determine legality, dispatch authority, airworthiness, or flight release.
Never invent a rule, source, weather observation, NOTAM, qualification, or aircraft limitation.
If the supplied evidence is incomplete, state that the evidence is insufficient and name what is missing.
Explain the operational consequence concisely. When referring to a rule or observation, cite the exact source label supplied in the context in square brackets, for example [Source: 14 CFR §135.267(b)].
Prefer a short answer with: conclusion, why it matters, and next review action.`;

export async function POST(request){
  const auth=await getCurrentUserAndWorkspace();
  const demo=process.env.AEROS_DEMO_MODE==='true';
  if(!auth.user&&!demo) return NextResponse.json({error:'Authentication required'},{status:401});
  if(!process.env.XAI_API_KEY) return NextResponse.json({error:'xAI is not configured yet'},{status:503});

  const body=await request.json().catch(()=>({}));
  const question=String(body.question||'Explain the current mission state.').slice(0,4000);
  const context={mission:body.mission||{},evaluation:body.evaluation||{},selectedFinding:body.selectedFinding||null};
  const serialized=JSON.stringify(context).slice(0,120000);
  const model=process.env.XAI_MODEL||'grok-4.20-non-reasoning-latest';

  const response=await fetch('https://api.x.ai/v1/chat/completions',{
    method:'POST',
    headers:{'Authorization':`Bearer ${process.env.XAI_API_KEY}`,'Content-Type':'application/json'},
    body:JSON.stringify({
      model,
      temperature:0.1,
      max_tokens:900,
      messages:[{role:'system',content:SYSTEM},{role:'user',content:`Question: ${question}\n\nAeros structured context:\n${serialized}`}]
    })
  });
  const data=await response.json();
  if(!response.ok) return NextResponse.json({error:data?.error?.message||'xAI request failed'},{status:502});
  const answer=data?.choices?.[0]?.message?.content||'No response returned.';
  const usage=data?.usage||{};
  const costTicks=usage.cost_in_usd_ticks??null;
  const costUsd=typeof costTicks==='number'?costTicks/10000000000:null;

  const admin=createAdminClient();
  if(admin&&auth.workspace?.id){
    await admin.from('intelligence_usage').insert({
      organization_id:auth.workspace.id,
      user_id:auth.user?.id||null,
      model,
      purpose:body.purpose||'mission_explanation',
      input_tokens:usage.prompt_tokens??usage.input_tokens??null,
      output_tokens:usage.completion_tokens??usage.output_tokens??null,
      cost_usd:costUsd,
      metadata:{mission_id:body.mission?.id||null}
    });
  }
  return NextResponse.json({answer,model,usage:{input_tokens:usage.prompt_tokens??usage.input_tokens??null,output_tokens:usage.completion_tokens??usage.output_tokens??null,cost_usd:costUsd}});
}
