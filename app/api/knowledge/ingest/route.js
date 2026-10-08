import {NextResponse} from 'next/server';
import {getCurrentUserAndWorkspace} from '../../../../lib/workspace';
import {createAdminClient} from '../../../../lib/supabase/admin';

export const dynamic='force-dynamic';
export const maxDuration=60;

const ACCEPTED=new Set([
 'application/pdf','text/plain','text/markdown','application/json','text/csv',
 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
]);

const EXTRACTION_PROMPT=`You are the operator-knowledge extraction stage for Aeros, a flight-operations decision-support system.
Read the attached operator document and extract ONLY rules that can materially affect mission acceptance, flight planning, dispatch review, crew eligibility, aircraft eligibility, airport/approach authorization, minima, MEL/CDL handling, weather decisions, required approvals, or operational monitoring.

Do not invent or generalize beyond the text. If wording is ambiguous, keep the candidate rule human_review_required=true and explain what must be clarified. Every rule MUST preserve a source locator and a short source excerpt so an operator can validate it.

Return JSON only, with this exact shape:
{
  "document_summary":"short description",
  "rules":[
    {
      "category":"authorization|weather|minima|crew|aircraft|mel|airport|approach|duty|procedure|approval|other",
      "title":"plain-English rule title",
      "source_locator":"section/page/paragraph reference if available",
      "source_excerpt":"short verbatim excerpt, maximum 35 words",
      "confidence":0.0,
      "human_review_required":true,
      "logic":{
        "kind":"threshold|requirement|authorization|prohibition|procedure|eligibility|other",
        "when":[{"field":"mission or live-state field","operator":"eq|neq|gt|gte|lt|lte|in|exists","value":"value or null"}],
        "then":{"result":"PASS|REVIEW|ACTION","requirement":"what the operator must check or do"},
        "variables":["named operational variables needed to execute this rule"]
      }
    }
  ]
}

Extract no more than 40 high-value candidate rules. If the document contains no executable operational rule, return an empty rules array.`;

function outputText(data){
 if(typeof data?.output_text==='string') return data.output_text;
 const out=data?.output||[];
 for(let i=out.length-1;i>=0;i--){for(const c of out[i]?.content||[]){if(typeof c?.text==='string') return c.text;}}
 return '';
}
function parseJson(text){
 const cleaned=String(text||'').trim().replace(/^```(?:json)?\s*/i,'').replace(/\s*```$/,'');
 try{return JSON.parse(cleaned)}catch{}
 const start=cleaned.indexOf('{'),end=cleaned.lastIndexOf('}');
 if(start>=0&&end>start){try{return JSON.parse(cleaned.slice(start,end+1))}catch{}}
 return null;
}
function safeName(name){return String(name||'document').replace(/[^a-zA-Z0-9._-]+/g,'-').replace(/-+/g,'-').slice(0,120)}
function costUsd(usage){const ticks=usage?.cost_in_usd_ticks;return typeof ticks==='number'?ticks/10000000000:null}

export async function POST(request){
 const auth=await getCurrentUserAndWorkspace();
 if(!auth.user||!auth.workspace) return NextResponse.json({error:'Authentication required'},{status:401});
 if(!process.env.XAI_API_KEY) return NextResponse.json({error:'xAI is not configured yet'},{status:503});
 const admin=createAdminClient();
 if(!admin) return NextResponse.json({error:'Supabase service role is not configured'},{status:503});

 const form=await request.formData();
 const file=form.get('file');
 const documentType=String(form.get('document_type')||'manual').slice(0,60);
 const revision=String(form.get('revision')||'').slice(0,80)||null;
 const effectiveDate=String(form.get('effective_date')||'').slice(0,10)||null;
 if(!(file instanceof File)) return NextResponse.json({error:'A document file is required'},{status:400});
 if(file.size<=0||file.size>50*1024*1024) return NextResponse.json({error:'File must be between 1 byte and 50 MB'},{status:400});
 if(file.type&&!ACCEPTED.has(file.type)) return NextResponse.json({error:`Unsupported file type: ${file.type}`},{status:400});

 const filename=safeName(file.name);
 const storagePath=`${auth.workspace.id}/${Date.now()}-${filename}`;
 const bytes=new Uint8Array(await file.arrayBuffer());
 const {error:storageError}=await admin.storage.from('operator-documents').upload(storagePath,bytes,{contentType:file.type||'application/octet-stream',upsert:false});
 if(storageError) return NextResponse.json({error:`Storage upload failed: ${storageError.message}`},{status:500});

 const {data:document,error:docError}=await admin.from('operator_documents').insert({
  organization_id:auth.workspace.id,title:filename,document_type:documentType,revision,effective_date:effectiveDate,
  storage_path:storagePath,status:'processing',created_by:auth.user.id,metadata:{size:file.size,mime_type:file.type||null}
 }).select().single();
 if(docError) return NextResponse.json({error:docError.message},{status:500});

 try{
  const uploadForm=new FormData();
  uploadForm.append('file',new Blob([bytes],{type:file.type||'application/octet-stream'}),filename);
  const upload=await fetch('https://api.x.ai/v1/files',{method:'POST',headers:{Authorization:`Bearer ${process.env.XAI_API_KEY}`},body:uploadForm});
  const uploaded=await upload.json();
  if(!upload.ok||!uploaded?.id) throw new Error(uploaded?.error?.message||'xAI file upload failed');

  await admin.from('operator_documents').update({xai_file_id:uploaded.id}).eq('id',document.id);
  const model=process.env.XAI_INGEST_MODEL||'grok-4.7';
  const response=await fetch('https://api.x.ai/v1/responses',{
   method:'POST',headers:{Authorization:`Bearer ${process.env.XAI_API_KEY}`,'Content-Type':'application/json'},
   body:JSON.stringify({model,input:[{role:'user',content:[{type:'input_text',text:EXTRACTION_PROMPT},{type:'input_file',file_id:uploaded.id}]}]})
  });
  const data=await response.json();
  if(!response.ok) throw new Error(data?.error?.message||'xAI document analysis failed');
  const parsed=parseJson(outputText(data));
  if(!parsed||!Array.isArray(parsed.rules)) throw new Error('xAI did not return a valid rule extraction payload');
  const candidates=parsed.rules.slice(0,40).map((r,i)=>({
    organization_id:auth.workspace.id,source_document_id:document.id,
    code:`${documentType}:${document.id.slice(0,8)}:${String(i+1).padStart(2,'0')}`,
    category:String(r.category||'other').slice(0,60),title:String(r.title||`Candidate rule ${i+1}`).slice(0,240),
    rule_json:{...(r.logic||{}),human_review_required:r.human_review_required!==false},
    source_excerpt:String(r.source_excerpt||'').slice(0,1200),source_locator:String(r.source_locator||'').slice(0,240),
    validation_status:'draft',confidence:Number.isFinite(Number(r.confidence))?Math.max(0,Math.min(1,Number(r.confidence))):null
  }));
  if(candidates.length){const {error:rulesError}=await admin.from('operator_rules').insert(candidates);if(rulesError) throw rulesError;}
  await admin.from('operator_documents').update({status:'review',processed_at:new Date().toISOString(),processing_error:null,metadata:{size:file.size,mime_type:file.type||null,summary:String(parsed.document_summary||'').slice(0,1200),candidate_rule_count:candidates.length}}).eq('id',document.id);

  const usage=data?.usage||{};
  await admin.from('intelligence_usage').insert({organization_id:auth.workspace.id,user_id:auth.user.id,model,purpose:'rule_extraction',input_tokens:usage.input_tokens??usage.prompt_tokens??null,output_tokens:usage.output_tokens??usage.completion_tokens??null,cost_usd:costUsd(usage),metadata:{document_id:document.id,candidate_rule_count:candidates.length}});
  await admin.from('audit_events').insert({organization_id:auth.workspace.id,user_id:auth.user.id,event_type:'operator_document_processed',payload:{document_id:document.id,xai_file_id:uploaded.id,candidate_rule_count:candidates.length}});
  return NextResponse.json({document:{...document,status:'review'},summary:parsed.document_summary||'',rules:candidates,usage:{input_tokens:usage.input_tokens??usage.prompt_tokens??null,output_tokens:usage.output_tokens??usage.completion_tokens??null,cost_usd:costUsd(usage)}});
 }catch(error){
  await admin.from('operator_documents').update({status:'error',processing_error:String(error?.message||error),processed_at:new Date().toISOString()}).eq('id',document.id);
  return NextResponse.json({error:String(error?.message||error),document_id:document.id},{status:502});
 }
}
