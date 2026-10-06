'use client';
import {useState} from 'react';

export default function Contact(){
 const [sent,setSent]=useState(false);
 return <div className="aeros-site">
  <section className="a-page-hero"><div><div className="a-eyebrow">DESIGN PARTNERS</div><h1>Show us how your team reviews a mission today.</h1></div><div><p>We are looking for Part 135 operators where dispatchers, Chief Pilots or Directors of Operations still cross-check OpSpecs, manuals, crew legality, aircraft state, weather, NOTAMs, airport information and trip details across multiple systems.</p></div></section>
  <section className="a-contact"><div className="a-contact-card">{sent?<div><div className="a-eyebrow">RECEIVED</div><h2 style={{fontSize:34,letterSpacing:'-.04em'}}>Thanks. This prototype form is complete.</h2><p style={{color:'#74756d',fontSize:11,lineHeight:1.7}}>No data leaves the browser yet. Before public launch, connect the form to a production backend and route qualified design-partner requests to the team.</p></div>:<form className="a-form" onSubmit={e=>{e.preventDefault();setSent(true)}}>
   <label>WORK EMAIL<input required type="email" placeholder="you@operator.com"/></label>
   <label>OPERATOR / COMPANY<input required placeholder="Part 135 operator name"/></label>
   <label>YOUR ROLE<select defaultValue=""><option value="" disabled>Select</option><option>Dispatcher / Flight Coordinator</option><option>Director of Operations</option><option>Chief Pilot</option><option>Pilot</option><option>Owner / Executive</option><option>Other</option></select></label>
   <label>FLEET SIZE<select defaultValue=""><option value="" disabled>Select</option><option>1–5 aircraft</option><option>6–15 aircraft</option><option>16–30 aircraft</option><option>31+ aircraft</option></select></label>
   <label>PRIMARY OPERATING SYSTEM<input placeholder="FL3XX, Avianis, spreadsheets, internal tools..."/></label>
   <label>MISSION VOLUME<input placeholder="Approx. trips / flights per week"/></label>
   <label className="wide">HOW DO YOU REVIEW A MISSION TODAY?<textarea placeholder="What comes in with the trip request? Which manuals and systems do you check? Where do weather, NOTAMs, crew, aircraft, and approvals live? What takes the most time?"/></label>
   <label className="wide">WHAT WOULD MAKE A PILOT WORTH RUNNING?<textarea placeholder="For example: reduce a 30-minute review to 10 minutes, surface changes automatically, standardize briefings, reduce duplicate checks..."/></label>
   <button className="a-btn-dark">Request a design-partner conversation →</button>
  </form>}</div></section>
 </div>
}
