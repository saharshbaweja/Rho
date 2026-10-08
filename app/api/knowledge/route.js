import {NextResponse} from 'next/server';
import {getCurrentUserAndWorkspace} from '../../../lib/workspace';
import {createClient} from '../../../lib/supabase/server';

export const dynamic='force-dynamic';

export async function GET(){
  const auth=await getCurrentUserAndWorkspace();
  if(!auth.user||!auth.workspace) return NextResponse.json({error:'Authentication required'},{status:401});
  const supabase=await createClient();
  const [{data:documents,error:docError},{data:rules,error:ruleError}]=await Promise.all([
    supabase.from('operator_documents').select('id,title,document_type,revision,effective_date,status,metadata,processed_at,processing_error,created_at').eq('organization_id',auth.workspace.id).order('created_at',{ascending:false}),
    supabase.from('operator_rules').select('id,source_document_id,code,category,title,rule_json,source_excerpt,source_locator,validation_status,confidence,validated_at,created_at').eq('organization_id',auth.workspace.id).order('created_at',{ascending:false})
  ]);
  if(docError||ruleError) return NextResponse.json({error:docError?.message||ruleError?.message||'Could not load knowledge base'},{status:500});
  return NextResponse.json({workspace:auth.workspace,documents:documents||[],rules:rules||[]});
}

export async function PATCH(request){
  const auth=await getCurrentUserAndWorkspace();
  if(!auth.user||!auth.workspace) return NextResponse.json({error:'Authentication required'},{status:401});
  const body=await request.json().catch(()=>({}));
  const status=String(body.status||'');
  if(!['validated','rejected','draft'].includes(status)) return NextResponse.json({error:'Invalid rule status'},{status:400});
  if(!body.ruleId) return NextResponse.json({error:'ruleId is required'},{status:400});
  const supabase=await createClient();
  const update={validation_status:status,updated_at:new Date().toISOString()};
  if(status==='validated'){update.validated_by=auth.user.id;update.validated_at=new Date().toISOString();}
  else{update.validated_by=null;update.validated_at=null;}
  const {data,error}=await supabase.from('operator_rules').update(update).eq('id',body.ruleId).eq('organization_id',auth.workspace.id).select().single();
  if(error) return NextResponse.json({error:error.message},{status:500});
  return NextResponse.json({rule:data});
}
