import {NextResponse} from 'next/server';
import {getCurrentUserAndWorkspace} from '../../../lib/workspace';
import {createAdminClient} from '../../../lib/supabase/admin';

export const dynamic='force-dynamic';

const SYSTEM=`You are Aeros Intelligence, the explanation and orchestration layer for flight-operations decision support.
The structured mission state, deterministic findings, validated operator rules, and source excerpts supplied by Aeros are authoritative for this response.
You do not independently determine legality, dispatch authority, airworthiness, or flight release.
Never invent a rule, source, weather observation, NOTAM, qualification, aircraft limitation, or conclusion.
If evidence is incomplete, say that the evidence is insufficient and name the missing input.
When a validated operator rule is relevant, cite its exact source_locator in square brackets. When a live observation is relevant, cite the source label supplied in the mission context.
For operational options, compare only options already evaluated by the Aeros engine unless the user explicitly asks for a hypothetical. Clearly label any hypothetical as requiring re-evaluation.
Prefer concise operational language: conclusion, evidence, consequence, next review action.`;

function modelFor(purpose){
 if(['rule_extraction','complex_option_analysis','brief_generation'].includes(purpose)) return process.env.XAI_REASONING_MODEL||'grok-4.7';
 return process.env.XAI_MODEL||'grok-4.3';
}

export async function POST(request){
  const auth=await getCurrentUserAndWorkspace();
  const demo=process.env.AEROS_DEMO_MODE==='true';
  if(!auth.user&&!demo) return NextResponse.json({error:'Authentication required'},{status:401});
  if(!process.env.XAI_API_KEY) return NextResponse.json({error:'xAI is not configured yet'},{status:503});

  const body=await request.json().catch(()=>({}));
  const purpose=String(body.purpose||'mission_explanation').slice(0,80);
  const question=String(body.question||'Explain the current mission state.').slice(0,4000);
  const admin=createAdminClient();
  let operatorKnowledge=[];
  if(admin&&auth.workspace?.id){
    const {data}=await admin.from('operator_rules')
      .select('id,code,category,title,rule_json,source_excerpt,source_locator,validated_at')
      .eq('organization_id',auth.workspace.id).eq('validation_status','validated').order('validated_at',{ascending:false}).limit(80);
    operatorKnowledge=(data||[]).map(r=>({id:r.id,code:r.code,category:r.category,title:r.title,logic:r.rule_json,source_locator:r.source_locator,source_excerpt:r.source_excerpt}));
  }
  const context={mission:body.mission||{},evaluation:body.evaluation||{},options:body.options||[],selectedFinding:body.selectedFinding||null,validated_operator_knowledge:operatorKnowledge};
  const serialized=JSON.stringify(context).slice(0,170000);
  const model=modelFor(purpose);

  const response=await fetch('https://api.x.ai/v1/chat/completions',{
    method:'POST',
    headers:{'Authorization':`Bearer ${process.env.XAI_API_KEY}`,'Content-Type':'application/json'},
    body:JSON.stringify({
      model,temperature:0.05,max_tokens:1100,
      messages:[{role:'system',content:SYSTEM},{role:'user',content:`Task: ${purpose}\nQuestion: ${question}\n\nAeros structured context:\n${serialized}`}]
    })
  });
  const data=await response.json();
  if(!response.ok) return NextResponse.json({error:data?.error?.message||'xAI request failed'},{status:502});
  const answer=data?.choices?.[0]?.message?.content||'No response returned.';
  const usage=data?.usage||{};
  const costTicks=usage.cost_in_usd_ticks??null;
  const costUsd=typeof costTicks==='number'?costTicks/10000000000:null;

  if(admin&&auth.workspace?.id){
    await admin.from('intelligence_usage').insert({
      organization_id:auth.workspace.id,user_id:auth.user?.id||null,model,purpose,
      input_tokens:usage.prompt_tokens??usage.input_tokens??null,output_tokens:usage.completion_tokens??usage.output_tokens??null,cost_usd:costUsd,
      metadata:{mission_id:body.mission?.id||null,validated_rule_count:operatorKnowledge.length}
    });
  }
  return NextResponse.json({answer,model,knowledge:{validated_rule_count:operatorKnowledge.length},usage:{input_tokens:usage.prompt_tokens??usage.input_tokens??null,output_tokens:usage.completion_tokens??usage.output_tokens??null,cost_usd:costUsd}});
}
