export const STATUS={PASS:'PASS',REVIEW:'REVIEW',ACTION:'ACTION'};

const severity={PASS:0,REVIEW:1,ACTION:2};
const worst=(a,b)=>severity[a]>=severity[b]?a:b;
const round=n=>Math.round(n*10)/10;

function finding({code,area,status,condition,rule,source,impact,dependencies=[]}){
  return {code,area,status,condition,rule,source,impact,dependencies};
}

export function evaluateMission(mission, context, operator){
  const findings=[];
  const wx=context.weather||{};
  const airport=context.destination||{};
  const crew=mission.crew||[];

  // 14 CFR 135.223 is more nuanced than a generic 2,000/3 rule. We store the
  // chart/operator-derived no-alternate thresholds as mission metadata so the engine
  // can evaluate the exact threshold for the airport/procedure in production.
  if(mission.ifr){
    const ceilThreshold=mission.destinationNoAlternateCeilingFt;
    const visThreshold=mission.destinationNoAlternateVisibilitySm;
    if(Number.isFinite(ceilThreshold)&&Number.isFinite(visThreshold)&&Number.isFinite(wx.ceilingFt)&&Number.isFinite(wx.visibilitySm)){
      const alternateRequired=wx.ceilingFt<ceilThreshold || wx.visibilitySm<visThreshold;
      findings.push(finding({
        code:'IFR_ALTERNATE',
        area:'Alternate requirement',
        status:alternateRequired && !mission.alternate ? STATUS.REVIEW : STATUS.PASS,
        condition:`Forecast ${wx.ceilingFt} ft / ${wx.visibilitySm} SM`,
        rule:`No-alternate threshold ${ceilThreshold} ft / ${visThreshold} SM`,
        source:'14 CFR §135.223 + procedure-derived threshold',
        impact:alternateRequired
          ? (mission.alternate?'Alternate is required and already planned.':'Destination forecast requires an alternate; none is currently selected.')
          :'Forecast satisfies the mission-specific no-alternate threshold.',
        dependencies:['weather','destination','approach']
      }));
    }
  }

  if(mission.ifr && mission.approachMinima && Number.isFinite(wx.ceilingFt) && Number.isFinite(wx.visibilitySm)){
    const below=wx.ceilingFt<mission.approachMinima.ceilingFt || wx.visibilitySm<mission.approachMinima.visibilitySm;
    findings.push(finding({
      code:'APPROACH_MINIMA',
      area:'Approach weather',
      status:below?STATUS.ACTION:STATUS.PASS,
      condition:`Observed ${wx.ceilingFt} ft / ${wx.visibilitySm} SM`,
      rule:`Planned approach minima ${mission.approachMinima.ceilingFt} ft / ${mission.approachMinima.visibilitySm} SM`,
      source:'14 CFR §135.225 + published procedure minima',
      impact:below?'Latest weather is below the modeled authorized landing minima for the planned procedure.':'Latest weather remains at or above the modeled authorized landing minima.',
      dependencies:['weather','approach']
    }));
  }

  if(Number.isFinite(wx.crosswindKt)){
    const max=wx.runwayCondition==='wet'?operator.maxCrosswindWetKt:operator.maxCrosswindDryKt;
    if(Number.isFinite(max)) findings.push(finding({
      code:'CROSSWIND',
      area:'Crosswind',
      status:wx.crosswindKt>max?STATUS.ACTION:STATUS.PASS,
      condition:`${wx.crosswindKt} kt crosswind · ${wx.runwayCondition||'dry'} runway`,
      rule:`Demo operator limit ${max} kt`,
      source:'Demo operator policy — replace with validated GOM/company minima',
      impact:wx.crosswindKt>max?'Current crosswind exceeds the configured operator limit.':'Current crosswind is within the configured operator limit.',
      dependencies:['weather','operator-policy']
    }));
  }

  if(Array.isArray(airport.runways)){
    const open=airport.runways.filter(r=>r.open!==false);
    findings.push(finding({
      code:'RUNWAY_AVAILABILITY',
      area:'Runway availability',
      status:open.length===0?STATUS.ACTION:(open.length<airport.runways.length?STATUS.REVIEW:STATUS.PASS),
      condition:`${open.length} of ${airport.runways.length} modeled runways available`,
      rule:'Destination must retain a suitable runway under operator/aircraft constraints',
      source:airport.source||'Airport / NOTAM state',
      impact:open.length===0?'No modeled runway remains available for the current mission.':open.length<airport.runways.length?'Runway restrictions reduce available arrival options and require review.':'No modeled runway restriction affects the mission.',
      dependencies:['notams','airport','aircraft']
    }));
  }

  crew.forEach((pilot,index)=>{
    const label=pilot.role||`Pilot ${index+1}`;
    if(Number.isFinite(pilot.flightHours24hBefore)&&Number.isFinite(mission.plannedFlightHours)){
      const projected=pilot.flightHours24hBefore+mission.plannedFlightHours;
      const limit=crew.length>=2?10:8;
      findings.push(finding({
        code:`CREW_FLIGHT_TIME_${index}`,
        area:`${label} flight-time limit`,
        status:projected>limit?STATUS.ACTION:STATUS.PASS,
        condition:`Projected ${round(projected)} h in 24 h`,
        rule:`${limit} h modeled daily flight-time limit`,
        source:'14 CFR §135.267(b)',
        impact:projected>limit?'Projected assignment exceeds the modeled Part 135 flight-time limit.':'Projected assignment remains inside the modeled Part 135 flight-time limit.',
        dependencies:['crew','schedule']
      }));
    }
    if(Number.isFinite(pilot.projectedDutyHours)){
      findings.push(finding({
        code:`CREW_DUTY_${index}`,
        area:`${label} duty window`,
        status:pilot.projectedDutyHours>14?STATUS.ACTION:STATUS.PASS,
        condition:`Projected ${round(pilot.projectedDutyHours)} h duty`,
        rule:'14 h regularly assigned duty-period model',
        source:'14 CFR §135.267(c)',
        impact:pilot.projectedDutyHours>14?'Projected duty exceeds the modeled 14-hour assignment window.':'Projected duty remains inside the modeled assignment window.',
        dependencies:['crew','schedule']
      }));
    }
    if(pilot.recurrentValidThrough){
      const valid=new Date(pilot.recurrentValidThrough+'T23:59:59Z')>=new Date(mission.date+'T00:00:00Z');
      findings.push(finding({
        code:`CREW_RECURRENT_${index}`,
        area:`${label} recurrent check`,
        status:valid?STATUS.PASS:STATUS.ACTION,
        condition:`Valid through ${pilot.recurrentValidThrough}`,
        rule:'Required recurrent knowledge/competency checks must be current',
        source:'14 CFR §135.293',
        impact:valid?'Modeled recurrent check remains current for the mission date.':'Modeled recurrent check is expired for the mission date.',
        dependencies:['crew','training']
      }));
    }
  });

  for(const item of mission.deferredItems||[]){
    findings.push(finding({
      code:`MEL_${item.id}`,
      area:`Deferred item ${item.id}`,
      status:item.allowedForMission?STATUS.PASS:STATUS.ACTION,
      condition:item.description,
      rule:item.restriction||'Configured MEL/MMEL restriction',
      source:item.source||'Operator MEL / aircraft MMEL',
      impact:item.allowedForMission?'Configured deferral does not block this modeled mission.':'Configured deferral blocks this modeled mission or requires an unresolved condition.',
      dependencies:['aircraft','maintenance','mel']
    }));
  }

  if(mission.specialAirportReview){
    findings.push(finding({
      code:'SPECIAL_AIRPORT',
      area:'Special-airport review',
      status:mission.specialAirportReviewComplete?STATUS.PASS:STATUS.REVIEW,
      condition:`${mission.destination} is configured for special review`,
      rule:mission.specialAirportRule||'Operator special-airport procedure',
      source:mission.specialAirportSource||'Demo operator policy — replace with validated OpSpec/GOM',
      impact:mission.specialAirportReviewComplete?'Required special-airport review is complete.':'Required operator-specific airport review is still open.',
      dependencies:['operator-policy','airport','crew']
    }));
  }

  let verdict=STATUS.PASS;
  findings.forEach(f=>{verdict=worst(verdict,f.status)});
  return {verdict,findings,summary:{pass:findings.filter(f=>f.status===STATUS.PASS).length,review:findings.filter(f=>f.status===STATUS.REVIEW).length,action:findings.filter(f=>f.status===STATUS.ACTION).length}};
}

function option(id,title,description,changes,metrics={}){
  return {id,title,description,changes,metrics};
}

export function generateOptions(mission,context,operator,evaluation){
  const options=[];
  const codes=new Set(evaluation.findings.filter(f=>f.status!==STATUS.PASS).map(f=>f.code));

  if(codes.has('IFR_ALTERNATE')){
    options.push(option('add-alternate','Add planned alternate','Keep the departure time and add the configured alternate/fuel requirement.',{alternate:context.recommendedAlternate||'KATL'}, {delayMin:0,risk:'Low',actions:2,fuelDeltaLb:context.alternateFuelLb||350}));
  }
  if(codes.has('APPROACH_MINIMA')||codes.has('CROSSWIND')||codes.has('RUNWAY_AVAILABILITY')){
    if(context.forecastImprovesAt) options.push(option('delay','Delay until conditions improve',`Move departure to target the modeled improvement at ${context.forecastImprovesAt}.`,{departureDelayMin:context.suggestedDelayMin||60},{delayMin:context.suggestedDelayMin||60,risk:'Low',actions:1,fuelDeltaLb:0}));
    if(context.recommendedAlternateDestination) options.push(option('change-destination','Use alternate destination',`Operate to ${context.recommendedAlternateDestination} and coordinate onward transport.`,{destination:context.recommendedAlternateDestination},{delayMin:0,risk:'Medium',actions:3,fuelDeltaLb:context.divertFuelDeltaLb||180}));
  }
  if([...codes].some(c=>c.startsWith('CREW_')) && context.replacementCrewAvailable){
    options.push(option('swap-crew','Assign replacement crew','Preserve the mission while replacing the crew assignment that fails the modeled legality/currentness check.',{crew:'replacement'},{delayMin:context.crewSwapDelayMin||20,risk:'Low',actions:2,fuelDeltaLb:0}));
  }
  if([...codes].some(c=>c.startsWith('MEL_')) && context.spareAircraftAvailable){
    options.push(option('swap-aircraft','Swap aircraft','Re-run the mission on the configured spare aircraft and preserve the planned route.',{aircraft:'spare'},{delayMin:context.aircraftSwapDelayMin||30,risk:'Medium',actions:3,fuelDeltaLb:0}));
  }

  if(!options.length) options.push(option('continue','Continue current plan','No modeled blocking condition requires a plan change. Maintain monitoring.',{}, {delayMin:0,risk:'Low',actions:0,fuelDeltaLb:0}));

  return options.map((o,index)=>({...o,rank:index+1,score:100-(o.metrics.delayMin||0)*0.15-(o.metrics.actions||0)*5-(o.metrics.risk==='Medium'?12:o.metrics.risk==='High'?25:0)})).sort((a,b)=>b.score-a.score).map((o,i)=>({...o,rank:i+1}));
}

export function applyOption(mission,context,selected){
  const nextMission=JSON.parse(JSON.stringify(mission));
  const nextContext=JSON.parse(JSON.stringify(context));
  const c=selected.changes||{};
  if(c.alternate) nextMission.alternate=c.alternate;
  if(c.destination) nextMission.destination=c.destination;
  if(c.departureDelayMin){
    nextContext.weather={...nextContext.weather,...(nextContext.improvedWeather||{})};
    if(nextContext.destinationAfterDelay) nextContext.destination=nextContext.destinationAfterDelay;
  }
  if(c.crew==='replacement'&&nextContext.replacementCrew) nextMission.crew=nextContext.replacementCrew;
  if(c.aircraft==='spare'&&nextContext.spareAircraft){nextMission.aircraft=nextContext.spareAircraft;nextMission.deferredItems=[];}
  return {mission:nextMission,context:nextContext};
}

export function compareOptions(mission,context,operator,evaluation){
  return generateOptions(mission,context,operator,evaluation).map(o=>{
    const applied=applyOption(mission,context,o);
    const result=evaluateMission(applied.mission,applied.context,operator);
    return {...o,result};
  });
}
