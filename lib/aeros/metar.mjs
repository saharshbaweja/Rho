const fraction=s=>{if(!s)return null;const m=s.match(/^(\d+)?(?:\s)?(\d+)\/(\d+)$/);if(!m)return Number(s);return (m[1]?Number(m[1]):0)+Number(m[2])/Number(m[3]);};

export function parseMetar(raw){
  if(!raw||typeof raw!=='string')return {};
  const tokens=raw.trim().split(/\s+/);
  let windDir=null,windSpeedKt=null,windGustKt=null,visibilitySm=null,ceilingFt=null;
  for(const token of tokens){
    const w=token.match(/^(\d{3}|VRB)(\d{2,3})(?:G(\d{2,3}))?KT$/);
    if(w){windDir=w[1]==='VRB'?null:Number(w[1]);windSpeedKt=Number(w[2]);windGustKt=w[3]?Number(w[3]):null;continue;}
    if(token==='CAVOK'){visibilitySm=10;ceilingFt=12000;continue;}
    const vis=token.match(/^(M)?(\d+(?:\/\d+)?|\d+\s\d+\/\d+)SM$/);
    if(vis){visibilitySm=fraction(vis[2]);if(vis[1])visibilitySm=Math.min(visibilitySm,0.25);continue;}
    const cloud=token.match(/^(BKN|OVC|VV)(\d{3})/);
    if(cloud){const ft=Number(cloud[2])*100;if(ceilingFt===null||ft<ceilingFt)ceilingFt=ft;}
  }
  if(ceilingFt===null && /\bCLR\b|\bSKC\b|\bNSC\b/.test(raw))ceilingFt=12000;
  return {raw,windDir,windSpeedKt,windGustKt,visibilitySm,ceilingFt};
}

export function crosswindComponentKt(windDir,windSpeedKt,runwayHeading){
  if(!Number.isFinite(windDir)||!Number.isFinite(windSpeedKt)||!Number.isFinite(runwayHeading))return null;
  let diff=Math.abs(windDir-runwayHeading)%360;if(diff>180)diff=360-diff;
  return Math.round(Math.abs(windSpeedKt*Math.sin(diff*Math.PI/180))*10)/10;
}

export function normalizeAviationWeatherMetar(record){
  const raw=record?.rawOb||record?.raw_text||record?.raw||'';
  const parsed=parseMetar(raw);
  const clouds=Array.isArray(record?.clouds)?record.clouds:[];
  const awcCeiling=clouds.filter(c=>['BKN','OVC','OVX','VV'].includes(c.cover)).map(c=>Number(c.base)).filter(Number.isFinite).sort((a,b)=>a-b)[0];
  return {
    ...parsed,
    raw,
    station:record?.icaoId||record?.station_id||record?.station||null,
    observedAt:record?.reportTime||record?.observation_time||record?.obsTime||null,
    windDir:Number.isFinite(Number(record?.wdir))?Number(record.wdir):parsed.windDir,
    windSpeedKt:Number.isFinite(Number(record?.wspd))?Number(record.wspd):parsed.windSpeedKt,
    windGustKt:Number.isFinite(Number(record?.wgst))?Number(record.wgst):parsed.windGustKt,
    visibilitySm:Number.isFinite(Number(record?.visib))?Number(record.visib):parsed.visibilitySm,
    ceilingFt:Number.isFinite(awcCeiling)?awcCeiling:parsed.ceilingFt
  };
}
