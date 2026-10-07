export const demoOperator={
  id:'AEROS-DEMO-135',
  name:'Aeros Demo Part 135 Operator',
  maxCrosswindDryKt:35,
  maxCrosswindWetKt:25,
  note:'Crosswind values are demo operator policy, not FAA universal limits. Replace with validated operator GOM/company minima before operational use.'
};

export const baseMission={
  id:'AO-PDK-01',
  date:'2026-10-06',
  origin:'KPDK',
  destination:'KWDR',
  ifr:true,
  plannedFlightHours:0.6,
  alternate:null,
  destinationNoAlternateCeilingFt:2000,
  destinationNoAlternateVisibilitySm:3,
  approachMinima:{ceilingFt:500,visibilitySm:1},
  aircraft:{tail:'N905CR',type:'Citation CJ3'},
  crew:[
    {name:'Alex Smith',role:'PIC',flightHours24hBefore:3.2,projectedDutyHours:8.4,recurrentValidThrough:'2026-12-31'},
    {name:'Jamie Lopez',role:'SIC',flightHours24hBefore:2.1,projectedDutyHours:7.8,recurrentValidThrough:'2027-01-31'}
  ],
  deferredItems:[]
};

export const scenarios=[
  {
    id:'real-kwdr-fog-2026-10-06',
    label:'Historical weather · KWDR fog',
    description:'Uses a real 2026-10-06 METAR snapshot for Winder/Barrow, GA. Weather is intentionally poor enough to exercise alternate and approach logic.',
    source:'NWS METAR mirror; production source should be FAA AviationWeather/NCEI archive',
    metar:'KWDR 060655Z AUTO 00000KT 1/4SM FG OVC001 16/16 A3012 RMK AO2',
    mission:{...baseMission},
    context:{
      weather:{ceilingFt:100,visibilitySm:0.25,crosswindKt:0,runwayCondition:'wet'},
      destination:{runways:[{id:'13',open:true},{id:'31',open:true}],source:'Modeled airport state'},
      forecastImprovesAt:'10:00Z',suggestedDelayMin:90,
      improvedWeather:{ceilingFt:2500,visibilitySm:6,crosswindKt:4,runwayCondition:'wet'},
      recommendedAlternate:'KATL',alternateFuelLb:320,
      recommendedAlternateDestination:'KATL',divertFuelDeltaLb:180
    },
    expectedVerdict:'ACTION',
    expectedCodes:['IFR_ALTERNATE','APPROACH_MINIMA']
  },
  {
    id:'real-kpdk-mist-2026-10-06',
    label:'Historical weather · KPDK mist',
    description:'Uses a real 2026-10-06 KPDK METAR snapshot with 5 SM visibility and clear sky to exercise a non-blocking weather case.',
    source:'NWS METAR mirror; production source should be FAA AviationWeather/NCEI archive',
    metar:'KPDK 060653Z AUTO 00000KT 5SM BR CLR 18/17 A3009 RMK AO2 SLP177 T01780167',
    mission:{...baseMission,destination:'KPDK',destinationNoAlternateCeilingFt:2000,destinationNoAlternateVisibilitySm:3,approachMinima:{ceilingFt:400,visibilitySm:1}},
    context:{weather:{ceilingFt:12000,visibilitySm:5,crosswindKt:0,runwayCondition:'dry'},destination:{runways:[{id:'03R',open:true},{id:'21L',open:true}],source:'Modeled airport state'}},
    expectedVerdict:'PASS',
    expectedCodes:[]
  },
  {
    id:'crew-duty-overrun',
    label:'Crew duty overrun',
    description:'Synthetic operational state to test Part 135 crew flight/duty logic.',
    source:'14 CFR §135.267',
    mission:{...baseMission,crew:[
      {name:'Alex Smith',role:'PIC',flightHours24hBefore:9.7,projectedDutyHours:14.4,recurrentValidThrough:'2026-12-31'},
      {name:'Jamie Lopez',role:'SIC',flightHours24hBefore:2.1,projectedDutyHours:8.0,recurrentValidThrough:'2027-01-31'}
    ]},
    context:{weather:{ceilingFt:5000,visibilitySm:10,crosswindKt:5,runwayCondition:'dry'},destination:{runways:[{id:'13',open:true}],source:'Modeled airport state'},replacementCrewAvailable:true,crewSwapDelayMin:20,replacementCrew:[
      {name:'Morgan Reed',role:'PIC',flightHours24hBefore:1.1,projectedDutyHours:5.0,recurrentValidThrough:'2027-04-30'},
      {name:'Jamie Lopez',role:'SIC',flightHours24hBefore:2.1,projectedDutyHours:8.0,recurrentValidThrough:'2027-01-31'}
    ]},
    expectedVerdict:'ACTION',
    expectedCodes:['CREW_FLIGHT_TIME_0','CREW_DUTY_0']
  },
  {
    id:'expired-recurrent',
    label:'Expired recurrent check',
    description:'Synthetic crew-record state to verify recurrent qualification gating.',
    source:'14 CFR §135.293',
    mission:{...baseMission,crew:[
      {name:'Alex Smith',role:'PIC',flightHours24hBefore:1.0,projectedDutyHours:5.0,recurrentValidThrough:'2026-09-30'},
      {name:'Jamie Lopez',role:'SIC',flightHours24hBefore:2.1,projectedDutyHours:7.0,recurrentValidThrough:'2027-01-31'}
    ]},
    context:{weather:{ceilingFt:5000,visibilitySm:10,crosswindKt:5,runwayCondition:'dry'},destination:{runways:[{id:'13',open:true}],source:'Modeled airport state'},replacementCrewAvailable:true,replacementCrew:[
      {name:'Morgan Reed',role:'PIC',flightHours24hBefore:1.1,projectedDutyHours:5.0,recurrentValidThrough:'2027-04-30'},
      {name:'Jamie Lopez',role:'SIC',flightHours24hBefore:2.1,projectedDutyHours:7.0,recurrentValidThrough:'2027-01-31'}
    ]},
    expectedVerdict:'ACTION',
    expectedCodes:['CREW_RECURRENT_0']
  },
  {
    id:'wet-crosswind',
    label:'Wet runway + crosswind',
    description:'Synthetic company-policy case. Demonstrates how operator-specific minima can turn the same weather into a different conclusion.',
    source:'Demo operator policy',
    mission:{...baseMission,alternate:'KATL'},
    context:{weather:{ceilingFt:4000,visibilitySm:10,crosswindKt:31,runwayCondition:'wet'},destination:{runways:[{id:'13',open:true},{id:'31',open:true}],source:'Modeled airport state'},forecastImprovesAt:'14:00Z',suggestedDelayMin:55,improvedWeather:{ceilingFt:4000,visibilitySm:10,crosswindKt:18,runwayCondition:'wet'},recommendedAlternateDestination:'KATL'},
    expectedVerdict:'ACTION',
    expectedCodes:['CROSSWIND']
  },
  {
    id:'runway-closure',
    label:'Destination runway closure',
    description:'Synthetic NOTAM-state case used to test runway availability and alternate-destination options.',
    source:'Modeled NOTAM event',
    mission:{...baseMission,alternate:'KATL'},
    context:{weather:{ceilingFt:5000,visibilitySm:10,crosswindKt:7,runwayCondition:'dry'},destination:{runways:[{id:'13',open:false},{id:'31',open:false}],source:'Modeled NOTAM closure'},forecastImprovesAt:'12:00Z',suggestedDelayMin:75,destinationAfterDelay:{runways:[{id:'13',open:true},{id:'31',open:true}],source:'Modeled NOTAM closure ended'},recommendedAlternateDestination:'KATL'},
    expectedVerdict:'ACTION',
    expectedCodes:['RUNWAY_AVAILABILITY']
  }
];
