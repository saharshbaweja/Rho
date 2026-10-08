const STATUS={PASS:'PASS',REVIEW:'REVIEW',ACTION:'ACTION'};
const severity={PASS:0,REVIEW:1,ACTION:2};

function getPath(root,path){
 if(!path)return undefined;
 const clean=String(path).replace(/^\$\.?/,'');
 return clean.split('.').filter(Boolean).reduce((value,key)=>value==null?undefined:value[key],root);
}
function resolve(field,mission,context){
 const name=String(field||'');
 if(name.startsWith('mission.')) return getPath(mission,name.slice(8));
 if(name.startsWith('context.')) return getPath(context,name.slice(8));
 const fromMission=getPath(mission,name);return fromMission!==undefined?fromMission:getPath(context,name);
}
function compare(actual,operator,expected){
 switch(operator){
  case 'exists': return expected===false?actual==null:actual!=null;
  case 'eq': return actual===expected || String(actual)===String(expected);
  case 'neq': return !(actual===expected || String(actual)===String(expected));
  case 'gt': return Number(actual)>Number(expected);
  case 'gte': return Number(actual)>=Number(expected);
  case 'lt': return Number(actual)<Number(expected);
  case 'lte': return Number(actual)<=Number(expected);
  case 'in': return Array.isArray(expected)?expected.map(String).includes(String(actual)):String(expected).split(',').map(x=>x.trim()).includes(String(actual));
  default: return false;
 }
}

export function evaluateStructuredRules(mission={},context={},rules=[]){
 const findings=[];
 for(const rule of rules||[]){
  const logic=rule.rule_json||rule.logic||{};
  const conditions=Array.isArray(logic.when)?logic.when:[];
  const missing=[];
  let applies=true;
  for(const condition of conditions){
   const actual=resolve(condition.field,mission,context);
   if(actual===undefined||actual===null){missing.push(condition.field);applies=false;continue;}
   if(!compare(actual,condition.operator||'eq',condition.value)){applies=false;break;}
  }
  if(missing.length){
   if(logic.human_review_required!==false){findings.push({
    code:rule.code||rule.id||'OPERATOR_RULE',area:rule.title||'Operator rule',status:STATUS.REVIEW,
    condition:`Missing mission input: ${missing.join(', ')}`,
    rule:logic.then?.requirement||rule.title||'Operator rule requires review',source:rule.source_locator||rule.source||'Validated operator knowledge',
    impact:'Aeros cannot execute this validated operator rule until the required mission or live-state input is available.',dependencies:missing,
    operator_rule_id:rule.id||null,source_excerpt:rule.source_excerpt||null
   });}
   continue;
  }
  if(!applies) continue;
  const requested=String(logic.then?.result||'REVIEW').toUpperCase();
  const status=STATUS[requested]||STATUS.REVIEW;
  findings.push({
   code:rule.code||rule.id||'OPERATOR_RULE',area:rule.title||'Operator rule',status,
   condition:conditions.length?conditions.map(c=>`${c.field} ${c.operator||'eq'} ${Array.isArray(c.value)?c.value.join('|'):c.value}`).join(' · '):'Rule applies to the active mission',
   rule:logic.then?.requirement||rule.title||'Validated operator rule',source:rule.source_locator||rule.source||'Validated operator knowledge',
   impact:logic.then?.requirement||'This operator-specific rule applies to the current mission.',dependencies:conditions.map(c=>c.field),
   operator_rule_id:rule.id||null,source_excerpt:rule.source_excerpt||null
  });
 }
 let verdict=STATUS.PASS;for(const f of findings){if(severity[f.status]>severity[verdict])verdict=f.status;}
 return {verdict,findings,summary:{pass:findings.filter(f=>f.status===STATUS.PASS).length,review:findings.filter(f=>f.status===STATUS.REVIEW).length,action:findings.filter(f=>f.status===STATUS.ACTION).length}};
}

export function mergeEvaluations(...evaluations){
 const findings=evaluations.flatMap(x=>x?.findings||[]);let verdict=STATUS.PASS;for(const f of findings){if(severity[f.status]>severity[verdict])verdict=f.status;}
 return {verdict,findings,summary:{pass:findings.filter(f=>f.status===STATUS.PASS).length,review:findings.filter(f=>f.status===STATUS.REVIEW).length,action:findings.filter(f=>f.status===STATUS.ACTION).length}};
}
