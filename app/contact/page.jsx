'use client';
import {useState} from 'react';
import Reveal from '../../components/Reveal';

export default function Contact(){const [sent,setSent]=useState(false);return <>
<section className="contactHero wrap"><Reveal><p className="eyebrow">CONTACT RHO</p><h1>Bring us your next<br/><em>expensive data decision.</em></h1><p>We are looking for AI teams already running post-training experiments and choosing between multiple data sources, generation strategies, or vendors.</p></Reveal></section>
<section className="contactSplit">
 <div className="contactChecklist"><div><span>GOOD DESIGN-PARTNER FIT</span><h2>You already have:</h2><ul><li>a model or checkpoint you can fine-tune</li><li>an eval suite that matters to the product</li><li>two or more candidate datasets</li><li>a real decision about where to spend the next training dollar</li></ul></div><div className="contactTrial"><small>THE DESIGN-PARTNER TRIAL</small><b>Give Rho two candidate datasets.</b><p>We structure the comparison, measure the result, and show you what decision evidence should look like.</p></div></div>
 <div>{sent?<div className="success"><span>ρ</span><h2>Received.</h2><p>This prototype form is complete. Connect a form backend before public launch.</p></div>:<form className="gContactForm" onSubmit={e=>{e.preventDefault();setSent(true)}}>
  <label>WORK EMAIL<input required type="email" placeholder="you@company.com"/></label>
  <label>COMPANY<input required placeholder="Company"/></label>
  <label>ROLE<input placeholder="ML engineer, Head of AI, Founder..."/></label>
  <label>WHAT ARE YOU DECIDING?<textarea rows="6" placeholder="Tell us about the model, eval, candidate datasets, or procurement decision."/></label>
  <button>REQUEST A TRIAL ↗</button><small>Prototype form — no data leaves the browser.</small>
 </form>}</div>
</section>
</>}