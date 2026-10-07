import {createClient} from './supabase/server';

export async function getCurrentUserAndWorkspace(){
  const supabase=await createClient();
  if(!supabase) return {configured:false,user:null,workspace:null,subscription:null};
  const {data:{user}}=await supabase.auth.getUser();
  if(!user) return {configured:true,user:null,workspace:null,subscription:null};
  const {data:membership}=await supabase
    .from('organization_members')
    .select('role, organization:organizations(id,name,slug,operator_type)')
    .eq('user_id',user.id)
    .limit(1)
    .maybeSingle();
  const workspace=membership?.organization||null;
  let subscription=null;
  if(workspace?.id){
    const {data}=await supabase.from('subscriptions').select('*').eq('organization_id',workspace.id).maybeSingle();
    subscription=data||null;
  }
  return {configured:true,user,workspace,membership,subscription};
}
