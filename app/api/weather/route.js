import {NextResponse} from 'next/server';
import {normalizeAviationWeatherMetar} from '../../../lib/aeros/metar.mjs';

export const dynamic='force-dynamic';

export async function GET(request){
  const {searchParams}=new URL(request.url);
  const station=(searchParams.get('station')||'KPDK').toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,4);
  if(station.length<3)return NextResponse.json({error:'Invalid station'}, {status:400});
  try{
    const url=`https://aviationweather.gov/api/data/metar?ids=${encodeURIComponent(station)}&format=json&hours=3`;
    const response=await fetch(url,{headers:{'User-Agent':'Aeros-Ops/0.1 contact: product@aeros.ai'},cache:'no-store'});
    if(!response.ok)throw new Error(`AviationWeather returned ${response.status}`);
    const data=await response.json();
    const record=Array.isArray(data)?data[0]:null;
    if(!record)return NextResponse.json({station,error:'No METAR available'}, {status:404});
    const normalized=normalizeAviationWeatherMetar(record);
    return NextResponse.json({source:'FAA Aviation Weather Center',station,weather:normalized,receivedAt:new Date().toISOString()});
  }catch(error){
    return NextResponse.json({station,error:error.message||'Unable to load weather'}, {status:502});
  }
}
