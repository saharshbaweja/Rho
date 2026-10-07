'use client';
import Link from 'next/link';
import {useMemo,useState} from 'react';
import {AlertTriangle,Check,ChevronRight,RefreshCw,Sparkles} from 'lucide-react';
import {applyOption,compareOptions,evaluateMission} from '../../lib/aeros/engine.mjs';
import {demoOperator,scenarios} from '../../lib/aeros/demo-data.mjs';
import styles from './engine.module.css';

const tone=s=>s==='PASS'?'pass':s==='REVIEW'?'review':'action';

export default function EngineLab(){
  const [index,setIndex]=useState(0);
  const [applied,setApplied]=useState(null);
  const [station,setStation]=useState('KPDK');
  const [live,setLive]=useState(null);
  const [loading,setLoading]=useState(false);
  const [liveError,setLiveError]=useState('');
  const scenario=scenarios[index];
  const current=applied||{mission:scenario.mission,context:scenario.context};
  const evaluation=useMemo(()=>evaluateMission(current.mission,current.context,demoOperator),[current]);
  const options=useMemo(()=>compareOptions(current.mission,current.context,demoOperator,evaluation),[current,evaluation]);
  const changeScenario=i=>{setIndex(i);setApplied(null);setLive(null);setLiveError('')};
  const choose=o=>setApplied(applyOption(current.mission,current.context,o));
  const expectedPassed=evaluation.verdict===scenario.expectedVerdict && scenario.expectedCodes.every(code=>evaluation.findings.some(f=>f.code===code&&f.status!=='PASS'));
  const loadWeather=async()=>{
    setLoading(true);setLiveError('');
    try{
      const res=await fetch(`/api/weather?station=${encodeURIComponent(station)}`,{cache:'no-store'});
      const data=await res.json();
      if(!res.ok)throw new Error(data.error||'Weather unavailable');
      setLive(data);
      const w=data.weather||{};
      setApplied({
        mission:{...current.mission,destination:station.toUpperCase()},
        context:{...current.context,weather:{...current.context.weather,ceilingFt:w.ceilingFt??current.context.weather?.ceilingFt,visibilitySm:w.visibilitySm??current.context.weather?.visibilitySm,windDir:w.windDir,windSpeedKt:w.windSpeedKt,rawMetar:w.raw}}
      });
    }catch(e){setLiveError(e.message||'Unable to load live weather')}finally{setLoading(false)}
  };

  return <div className={styles.page}><div className={styles.shell}>
    <header className={styles.top}><div className={styles.brand}><span>A</span><div><b>Aeros Engine Lab</b><small>Deterministic mission reasoning · public-source v0.1</small></div></div><Link href="/dashboard/">Open product <ChevronRight size={11}/></Link></header>
    <section className={styles.hero}><div><small>WORKING MODEL</small><h1>Conditions change.<br/>Aeros recalculates the mission.</h1></div><p>This is the first real reasoning layer underneath the UI: Part 135 rules, operator-specific limits, crew state, aircraft state and weather are evaluated as structured constraints. Aeros then generates operational options and re-runs each option through the same engine.</p></section>

    <section className={styles.workspace}>
      <aside className={styles.rail}><div className={styles.railHead}><b>Backtest scenarios</b><p>Historical weather where available, plus controlled synthetic cases for crew, operator-policy and runway changes.</p></div>{scenarios.map((s,i)=><button key={s.id} className={`${styles.scenario} ${i===index?styles.active:''}`} onClick={()=>changeScenario(i)}><b>{s.label}</b><small>{s.description}</small><span>{s.expectedVerdict} expected</span></button>)}</aside>

      <main className={styles.main}>
        <div className={styles.mainHead}><div><small>{scenario.id}</small><h2>{current.mission.origin} → {current.mission.destination}</h2><p>{current.mission.aircraft?.type||'Aircraft'} · {current.mission.crew?.map(x=>x.name).join(' / ')}</p></div><span className={`${styles.verdict} ${styles[tone(evaluation.verdict)]}`}>{evaluation.verdict}</span></div>
        <div className={styles.content}>
          <div className={styles.liveBar}><div><small>LIVE FAA WEATHER</small><b>Evaluate any current METAR through the same mission engine</b></div><div className={styles.liveControls}><input value={station} onChange={e=>setStation(e.target.value.toUpperCase().slice(0,4))} placeholder="KPDK"/><button onClick={loadWeather} disabled={loading}><RefreshCw size={11}/>{loading?'Loading…':'Load + evaluate'}</button></div>{live&&<span className={styles.liveResult}>● {live.station} · {live.weather?.raw||'METAR loaded'}</span>}{liveError&&<span className={styles.liveError}>{liveError}</span>}</div>
          {applied&&<div className={styles.applied}><Sparkles size={11}/> Mission state changed. The engine automatically re-ran every dependent check.</div>}
          <div className={styles.meta}><div><span>Historical / scenario input</span><b>{live?.weather?.raw||scenario.metar||scenario.source}</b></div><div><span>Pass</span><b>{evaluation.summary.pass}</b></div><div><span>Review</span><b>{evaluation.summary.review}</b></div><div><span>Action</span><b>{evaluation.summary.action}</b></div></div>

          <section className={styles.panel}><div className={styles.panelHead}><b>Decision trace</b><span>condition → rule → result</span></div>{evaluation.findings.map(f=><div className={styles.finding} key={f.code}><span className={`${styles.icon} ${styles[tone(f.status)]}`}>{f.status==='PASS'?<Check size={11}/>:<AlertTriangle size={11}/>}</span><div><b>{f.area}</b><p>{f.condition}</p><small>{f.source}</small></div><div className={styles.rule}>{f.rule}<br/>{f.impact}</div><span className={`${styles.verdict} ${styles[tone(f.status)]}`}>{f.status}</span></div>)}</section>

          <section><div className={styles.panelHead} style={{border:'1px solid #deddd7',borderRadius:'12px 12px 0 0'}}><b>Operational options</b><span>Each option is re-evaluated before ranking</span></div><div className={styles.options}>{options.map((o,i)=><article className={`${styles.option} ${i===0?styles.recommended:''}`} key={o.id}><div className={styles.optionTop}><span>OPTION {i+1}</span>{i===0&&<em>Recommended</em>}</div><h3>{o.title}</h3><p>{o.description}</p><div className={styles.metrics}><div><span>Delay</span><b>{o.metrics.delayMin||0}m</b></div><div><span>Risk</span><b>{o.metrics.risk}</b></div><div><span>After change</span><b>{o.result.verdict}</b></div></div><button onClick={()=>choose(o)}>Apply and re-run</button></article>)}</div></section>

          <div className={styles.backtest}><div><span>Expectation</span><b>{scenario.expectedVerdict}</b></div><div><span>Actual</span><b>{evaluation.verdict}</b></div><div><span>Backtest state</span><b>{expectedPassed?'PASS':'CHECK'}</b></div><div><span>Scenario source</span><b style={{fontSize:10}}>{live?'FAA Aviation Weather Center':scenario.source}</b></div></div>
          <div className={styles.sourceNote}>This v0.1 is decision-support software, not an operational approval system. Public regulations and public aviation data can validate the architecture, but company-specific OpSpecs, GOM rules, training policy, MEL procedures and approved data sources must be loaded and validated by the actual operator before real-world use.</div>
        </div>
      </main>
    </section>
  </div></div>;
}
