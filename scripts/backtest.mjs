import {evaluateMission,compareOptions} from '../lib/aeros/engine.mjs';
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
console.log(`\nBacktest result: ${scenarios.length-failures}/${scenarios.length} scenarios passed expectations.`);
if(failures) process.exit(1);
