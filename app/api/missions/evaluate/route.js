import {NextResponse} from 'next/server';
import {getCurrentUserAndWorkspace} from '../../../../lib/workspace';
import {createClient} from '../../../../lib/supabase/server';
import {evaluateMission,compareOptions} from '../../../../lib/aeros/engine.mjs';
import {evaluateStructuredRules,mergeEvaluations} from '../../../../lib/aeros/rule-runtime.mjs';

export const dynamic='force-dynamic';

export async function POST(request){
 const auth=await getCurrentUserAndWorkspace();
 const demo=process.env.AEROS_DEMO_MODE==='true';
 if(!auth.user&&!demo) return NextResponse.json({error:'Authentication required'},{status:401});
 const body=await request.json().catch(()=>({}));
 const mission=body.mission||{};
 const context=body.context||{};
 const operator=body.operator||{maxCrosswindWetKt:null,maxCrosswindDryKt:null};
 if(!mission.origin||!mission.destination) return NextResponse.json({error:'mission.origin and mission.destination are required'},{status:400});

 let structured=[];
 if(auth.workspace?.id){
  const supabase=await createClient();
  const {data,error}=await supabase.from('operator_rules').select('id,code,title,category,rule_json,source_excerpt,source_locator').eq('organization_id',auth.workspace.id).eq('validation_status','validated');
  if(error) return NextResponse.json({error:error.message},{status:500});
  structured=data||[];
 }
 const base=evaluateMission(mission,context,operator);
 const operatorEval=evaluateStructuredRules(mission,context,structured);
 const evaluation=mergeEvaluations(base,operatorEval);
 const options=compareOptions(mission,context,operator,evaluation);
 return NextResponse.json({evaluation,options,operator_rule_count:structured.length,engine_version:'0.2'});
}
