import Link from 'next/link';
import {ArrowUpRight,Route,Plane,Wrench,Users,MapPin,BarChart3,CreditCard,ShieldCheck,Smartphone,Plug,Upload,Radio} from 'lucide-react';

const groups=[
 {label:'OPERATE',note:'Run the day',items:[
  [Route,'Scheduling','/product/schedule','Plan resources, recurring reservations, self-service booking, drag-and-drop changes, and continuous recovery.','Aeros continuously re-solves around disruptions instead of stopping at conflict detection.'],
  [Plane,'Dispatch','/product/dispatch','Check readiness, documents, balances, qualifications, aircraft state, and actual flight activity.','Aeros explains what is blocking a flight and recommends the next feasible action.'],
  [Wrench,'Maintenance','/product/maintenance','Manage squawks, work orders, inspections, parts, technician time, logbooks, and aircraft downtime.','Aeros converts maintenance changes into schedule impact and a ranked recovery plan.']
 ]},
 {label:'TRAIN',note:'Move students forward',items:[
  [Users,'Training','/product/training','Manage curricula, lesson records, prerequisites, progress, stage checks, grades, and graduation forecasts.','Aeros prioritizes students at risk of falling behind and protects progression when the schedule changes.'],
  [ShieldCheck,'Compliance','/product/compliance','Keep Part 61/141 records, signatures, qualifications, approvals, audit history, and documents attached to the workflow.','Aeros checks compliance impact before a proposed operational change is applied.'],
  [Smartphone,'Mobile & Offline','/product/mobile','Give instructors, students, members, and mechanics focused mobile workflows with offline training support and alerts.','Aeros automatically targets the people affected by a change instead of blasting generic reminders.']
 ]},
 {label:'MONETIZE',note:'Close the operational loop',items:[
  [CreditCard,'Billing & Payments','/product/billing','Turn completed flying into invoices, payments, packages, subscriptions, rate rules, and account controls.','Aeros reconciles the operational event before billing so mismatches are caught before money moves.'],
  [MapPin,'Aeros Network','/product/network','Coordinate fuel, FBO, maintenance, hangar, services, financing, payments, and procurement around real flight demand.','Aeros can eventually turn upcoming operational demand directly into service requests and transactions.']
 ]},
 {label:'UNDERSTAND & EXTEND',note:'Learn and connect',items:[
  [BarChart3,'Reporting & Analytics','/product/reporting','Track utilization, throughput, student pacing, instructor performance, downtime, revenue, and recovery outcomes.','Aeros explains what changed, why it changed, and which operational lever is driving the metric.'],
  [Plug,'Integrations & API','/product/integrations','Connect flight, weather, accounting, messaging, training, maintenance, and partner systems.','Aeros uses connected data to trigger decisions and workflows, not just to sync records.'],
  [Upload,'Onboarding & Migration','/product/onboarding','Map workflows, import records, configure permissions, and roll out module-by-module.','Aeros can start with CSVs and one painful workflow instead of demanding an all-at-once replacement.']
 ]}
];

export default function Product(){return <div className="fsp-site">
 <section className="fsp-hero"><div><div className="fsp-kicker">AEROS PLATFORM</div><h1>The operating system for the entire flight operation.</h1></div><div className="fsp-hero-copy"><p>Aeros brings scheduling, dispatch, training, maintenance, billing, reporting, compliance, mobile workflows, and connected services into one operating context—and adds an AI decision layer across all of them.</p><div className="fsp-actions"><Link href="/contact/" className="fsp-primary">Request a demo <ArrowUpRight size={12}/></Link><Link href="/dashboard/" className="fsp-secondary">Open the prototype</Link></div></div></section>

 <div className="fsp-band"><div className="fsp-band-inner"><span>ONE SHARED OPERATING STATE</span>{['SCHEDULE','AIRCRAFT','PEOPLE','TRAINING','MAINTENANCE','BILLING','REPORTING','COMPLIANCE'].map(x=><b key={x}>{x}</b>)}</div></div>

 <section className="fsp-section"><div className="fsp-section-head"><div><div className="fsp-kicker">FULL OPERATING SUITE</div><h2>Everything a modern flight school needs—connected instead of bolted together.</h2></div><p>Legacy flight-ops platforms already prove the market needs scheduling, training, maintenance, billing, reporting, compliance, and mobile access. Aeros is being built to cover that same operational surface area, but with automation that understands how a change in one system affects every other one.</p></div>
  {groups.map(g=><div className="fsp-group" key={g.label}><div className="fsp-group-label"><span>{g.label}</span><b>{g.note}</b></div><div className="fsp-cap-grid">{g.items.map(([I,t,h,d,a])=><Link href={h} className="fsp-cap-card" key={t}><div className="fsp-cap-icon"><I size={19}/></div><h3>{t}</h3><p>{d}</p><div className="fsp-automation"><Radio size={12} style={{verticalAlign:'middle',marginRight:6}}/>{a}</div><strong>Explore {t} →</strong></Link>)}</div></div>)}
 </section>

 <section className="fsp-section"><div className="fsp-section-head"><div><div className="fsp-kicker">THE AEROS DIFFERENCE</div><h2>Most systems tell you what happened. Aeros should help decide what happens next.</h2></div><p>The wedge is not another prettier database. The wedge is an operating layer that understands constraints, predicts downstream impact, generates feasible options, explains the tradeoffs, and lets a human approve the change.</p></div><div className="fsp-compare"><div><small>TRADITIONAL FLIGHT-OPS SOFTWARE</small><h3>Digitize the workflow.</h3><ul><li>Store reservations and training records</li><li>Track maintenance and billing state</li><li>Send reminders and reports</li><li>Surface conflicts and exceptions</li><li>Require staff to coordinate the recovery manually</li></ul></div><div><small>AEROS</small><h3>Operate the workflow.</h3><ul><li>Model the live relationship between every resource</li><li>Predict which flights, students, revenue, and milestones are exposed</li><li>Rank feasible recovery plans when the day changes</li><li>Automate targeted messages, reconciliations, and follow-up work</li><li>Keep people in control with reviewable actions and decision history</li></ul></div></div></section>

 <section className="fsp-final"><div><div className="fsp-kicker">START WITH ONE WORKFLOW</div><h2>Replace the painful part first. Expand when Aeros earns the right.</h2></div><Link href="/contact/" className="fsp-primary">Become a design partner <ArrowUpRight size={12}/></Link></section>
 </div>}
