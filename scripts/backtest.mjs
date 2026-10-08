import {evaluateMission,compareOptions} from '../lib/aeros/engine.mjs';
import {evaluateStructuredRules} from '../lib/aeros/rule-runtime.mjs';
import {demoOperator,scenarios} from '../lib/aeros/demo-data.mjs';

let failures=0;
for(const s of scenarios){
  const result=evaluateMission(s.mission,s.context,demoOperator);
  const activeCodes=result.findings.filter(f=>f.status!=='PASS').map(f=>f.code);
  const verdictOk=result.verdict===s.expectedVerdict;
  const codesOk=s.expectedCodes.every(code=>activeCodes.includes(code));
  if(!verdictOk||!codesOk) failures++;
  console.log(`\n${verdictOk&&codesOk?'✓':'✗'} ${s.label}`);
  console.log(`  verdict: ${result.verdict} (expected ${s.expectedVerdict})`);
  console.log(`  active: ${activeCodes.length?activeCodes.join(', '):'none'}`);
  console.log(`  summary: ${result.summary.pass} pass / ${result.summary.review} review / ${result.summary.action} action`);
  const options=compareOptions(s.mission,s.context,demoOperator,result);
  console.log(`  options: ${options.map(o=>`${o.rank}. ${o.title} → ${o.result.verdict}`).join(' | ')}`);
}

const structuredRules=[{
 id:'rule-crosswind',code:'GOM-XWIND',title:'Wet runway crosswind limit',source_locator:'GOM §7.3',source_excerpt:'Wet runway crosswind may not exceed 25 knots.',
 rule_json:{kind:'threshold',human_review_required:true,when:[{field:'context.weather.crosswindKt',operator:'gt',value:25},{field:'context.weather.runwayCondition',operator:'eq',value:'wet'}],then:{result:'ACTION',requirement:'Select a runway/airport or delay until the configured wet-runway crosswind limit is satisfied.'}}
}];
const structured=evaluateStructuredRules({origin:'KPDK',destination:'KASE'},{weather:{crosswindKt:31,runwayCondition:'wet'}},structuredRules);
const structuredOk=structured.verdict==='ACTION'&&structured.findings.some(f=>f.code==='GOM-XWIND');
if(!structuredOk) failures++;
console.log(`\n${structuredOk?'✓':'✗'} Validated operator rule runtime`);
console.log(`  verdict: ${structured.verdict} (expected ACTION)`);
console.log(`  source: ${structured.findings[0]?.source||'missing'}`);

const missing=evaluateStructuredRules({origin:'KPDK',destination:'KASE'},{weather:{runwayCondition:'wet'}},structuredRules);
const missingOk=missing.verdict==='REVIEW'&&missing.findings[0]?.condition?.includes('crosswindKt');
if(!missingOk) failures++;
console.log(`\n${missingOk?'✓':'✗'} Missing operator-rule input fails visibly`);
console.log(`  verdict: ${missing.verdict} (expected REVIEW)`);

console.log(`\nBacktest result: ${scenarios.length+2-failures}/${scenarios.length+2} scenarios passed expectations.`);
if(failures) process.exit(1);
