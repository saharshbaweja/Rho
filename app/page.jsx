'use client';
import Link from 'next/link';
import {ArrowUpRight,Check,Database,SquareTerminal,ShieldCheck,Boxes,Network} from 'lucide-react';
import Reveal from '../components/Reveal';
import RhoGraph3D from '../components/RhoGraph3D';
import HowRhoWorks from '../components/HowRhoWorks';
import ExampleFeed from '../components/ExampleFeed';
import RhoContext from '../components/RhoContext';
import MacProduct from '../components/MacProduct';
import CliDemo from '../components/CliDemo';
import MarketChart from '../components/MarketChart';
import RhoFAQ from '../components/RhoFAQ';

export default function Home(){return <>
 <section className="gHero">
  <div className="wrap gHeroGrid">
   <Reveal className="gHeroCopy">
    <p className="eyebrow">THE TRAINING DATA INTELLIGENCE LAYER</p>
    <h1>Know which data<br/><em>moves the model.</em></h1>
    <p className="heroLead">Rho runs controlled trials on candidate datasets and measures their marginal return before you commit to expensive full-scale training.</p>
    <div className="actions"><Link href="/contact/" className="btn">Start a trial <ArrowUpRight size={14}/></Link><Link href="/product/" className="ghost">See the product</Link></div>
    <div className="heroChecks"><span><Check size={12}/> Compare datasets</span><span><Check size={12}/> Measure lift + overlap</span><span><Check size={12}/> Allocate training spend</span></div>
   </Reveal>
   <Reveal delay={.08} className="gHeroVisual"><RhoGraph3D/></Reveal>
  </div>
 </section>

 <section className="proofStrip"><div className="wrap">
  <span>BUILT FOR TEAMS MAKING REAL POST-TRAINING DECISIONS</span>
  <div><b>MODEL LABS</b><b>AI PRODUCT TEAMS</b><b>DATA BUYERS</b><b>FINE-TUNING PLATFORMS</b><b>ENTERPRISE ML</b></div>
 </div></section>

 <section className="quoteBand"><div className="wrap">
  <Reveal><p>“What should we train on next?” is still answered with intuition far too often.</p><span>RHO / THE PROBLEM WE ARE BUILDING AROUND</span></Reveal>
 </div></section>

 <HowRhoWorks/>

 <ExampleFeed/>

 <RhoContext/>

 <section className="layerSection"><div className="wrap">
  <Reveal><p className="eyebrow">Your stack</p><h2 className="sectionTitle">The central decision layer<br/>for training data.</h2><p className="sectionLead">Rho does not replace your model stack. It sits between your data sources, training infrastructure, and evaluation layer so every dataset decision is measured the same way.</p></Reveal>
  <div className="layerGraphic">
    <div className="layerSide left"><span><Database size={15}/> DATA VENDORS</span><span><Boxes size={15}/> INTERNAL CORPUS</span><span><Network size={15}/> SYNTHETIC PIPELINES</span></div>
    <div className="layerCore"><b>ρ</b><strong>RHO</strong><small>MEASURE · COMPARE · ALLOCATE</small></div>
    <div className="layerSide right"><span>TRAINING JOBS <Boxes size={15}/></span><span>EVAL SUITES <Network size={15}/></span><span>PROCUREMENT <Database size={15}/></span></div>
  </div>
  <div className="plugGrid">
   <article><span>01</span><SquareTerminal size={20}/><h3>CLI + SDK</h3><p>Run dataset comparisons from the workflow your ML engineers already use.</p></article>
   <article><span>02</span><Database size={20}/><h3>Experiment history</h3><p>Keep a decision record linking data, model, eval, recipe, cost, and outcome.</p></article>
   <article><span>03</span><Network size={20}/><h3>Training integrations</h3><p>Connect to your existing model, experiment, and evaluation infrastructure.</p></article>
   <article><span>04</span><ShieldCheck size={20}/><h3>Private deployment</h3><p>Run near proprietary models and data in customer-controlled environments.</p></article>
  </div>
 </div></section>

 <MacProduct/>

 <CliDemo/>

 <section className="indexLaunch"><div className="wrap indexLaunchGrid">
  <Reveal><div><p className="eyebrow">Rho Index</p><h2 className="sectionTitle">From private trials to<br/>a shared reference point.</h2><p className="sectionLead">The long-term product is not just experiment tracking. Enough measured outcomes can become neutral benchmarks for the economic value of data categories across models and tasks.</p><Link href="/index/" className="ghost">Explore Rho Index ↗</Link></div></Reveal>
  <Reveal delay={.08}><MarketChart compact/></Reveal>
 </div></section>

 <section className="securitySection"><div className="wrap">
  <Reveal><p className="eyebrow">Security-first architecture</p><h2 className="sectionTitle">Built for the data<br/>you cannot leak.</h2></Reveal>
  <div className="securityGrid">
   <article><span>01</span><h3>Customer-controlled deployment</h3><p>The intended enterprise architecture keeps sensitive models and datasets close to the customer environment.</p></article>
   <article><span>02</span><h3>Raw data stays private</h3><p>Benchmark intelligence should rely on minimal experiment metadata, not centralized copies of proprietary corpora.</p></article>
   <article><span>03</span><h3>Opt-in network effects</h3><p>Teams control what contributes to shared benchmarks and what remains entirely private.</p></article>
  </div>
 </div></section>

 <section className="visionSection"><div className="wrap">
  <Reveal><p className="eyebrow">Where Rho goes</p><h2>Measure → Predict → Allocate → Benchmark → Transact</h2><p>Start with a useful decision tool. Earn a system of record. Build the benchmark layer. Only then build market infrastructure.</p><Link href="/about/">Read the thesis ↗</Link></Reveal>
 </div></section>

 <RhoFAQ/>

 <section className="finalCta"><div className="wrap">
   <Reveal><p className="eyebrow">PRIVATE BETA</p><h2>Stop guessing what<br/>your training data is worth.</h2><div className="actions"><Link href="/contact/" className="btn">Become a design partner <ArrowUpRight size={14}/></Link><Link href="/examples/" className="ghost">See examples</Link></div></Reveal>
 </div></section>
 </>}