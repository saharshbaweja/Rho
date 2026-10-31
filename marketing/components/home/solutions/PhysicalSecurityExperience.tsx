
/* The image references below are from the Skydio physical-security page.
 * Client has represented that Aeros has permission to reuse the reference assets.
 * Replace remote media with supplied first-party asset files before final release,
 * to avoid depending on a third party's CDN or implying Aeros manufactures aircraft.
 */
/* eslint-disable @next/next/no-img-element */
import { PageMetadata } from "@marketing/components/home/PageMetadata";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import styles from "./PhysicalSecurityExperience.module.css";

const CDN = "https://cdn.sanity.io/images/mgxz50fq/production-v3-red/";
const media = {
  perimeter: CDN + "ba8ed4c6c8560e32d8fc0263d7931f7090d99613-1800x1152.png?auto=format&fit=max&w=1600",
  deter: CDN + "e5b2f063867da9bcfde7a0d31de90beec2c94364-1800x1152.png?auto=format&fit=max&w=1600",
  response: CDN + "55cecc797bbf47ee2102b1e20718e508d6fa4c21-1800x1152.png?auto=format&fit=max&w=1600",
  initiate: CDN + "51959601fcb364d0fee87626b90c15ef1865c8dc-2992x1684.png?auto=format&fit=max&w=1600",
  patrol: CDN + "59cf5cb7ba7ddbca89b47e89df136a2f4b63739b-2992x1684.png?auto=format&fit=max&w=1600",
  monitor: CDN + "958c6253902e383b07f3c6d97c5fecb18ef2ade7-2992x1684.png?auto=format&fit=max&w=1600",
  detect: CDN + "906c48f56caf3649157e1bae043502964145730f-2992x1684.png?auto=format&fit=max&w=1600",
  act: CDN + "abff2f23958e28c54267ea7db0c22843172a0d3d-2992x1684.png?auto=format&fit=max&w=1600",
  drone: CDN + "e1fa9f5d87f145d71638376d4fcabbf6ab4538ff-1172x1172.png?auto=format&fit=max&w=1200",
  site: CDN + "77fba914a746d64abd1c0db26460f1617263b9c3-8642x4672.png?auto=format&fit=max&w=1600",
  control: CDN + "b34fe6fc0eeb1e8cc85d56bed98bf76a63b0b21b-2992x1684.png?auto=format&fit=max&w=1400",
  fused: CDN + "654f34b94802d17ed4f28c255d7f038f1e980900-3840x2160.png?auto=format&fit=max&w=1400",
  night: CDN + "a89873b00c2527cf95c923da46a286516e13c4a6-2928x1520.png?auto=format&fit=max&w=1400",
  city: CDN + "dd1e9cc79d7ee7fee4dfc872a009c0f95fb38563-912x864.png?auto=format&fit=max&w=1000",
  vms: CDN + "d0f3dafdcb62457fa9e1979fa9546ba7ef7dc486-2992x2076.png?auto=format&fit=max&w=1400",
  security: CDN + "35c953a211b6bacfb130e2e8dbb63f92849ec639-2992x2076.png?auto=format&fit=max&w=1400",
} as const;

const outcomes = [
  { eyebrow: "01 / REPEATABLE COVERAGE", title: "Patrol.", text: "Create scheduled and on-demand patrol plans across complex properties. Keep objectives, coverage and available aircraft visible to the operators responsible for every mission.", image: media.perimeter, alt: "Aerial mission planning interface and perimeter patrol imagery" },
  { eyebrow: "02 / EARLIER AWARENESS", title: "Deter.", text: "Use aerial presence and live situational context to assess potential incidents before putting a response team in harm's way. Supported aircraft and payload features depend on the connected hardware.", image: media.deter, alt: "Aerial security mission imagery" },
  { eyebrow: "03 / DECISIONS WITH CONTEXT", title: "Respond.", text: "From sensor event to field response, make relevant footage, locations and mission status accessible in one operator-led workflow.", image: media.response, alt: "Aerial thermal security monitoring interface" },
];

const steps = [
  { title: "Initiate", label: "01 / TRIGGER", description: "Start with a scheduled patrol, a security event, or a request from your team. Aeros can assemble the available mission context for human review.", image: media.initiate, alt: "Event and operator verification workflow" },
  { title: "Patrol", label: "02 / MISSION", description: "Plan the route, confirm aircraft readiness, and assign the mission through connected flight infrastructure with explicit operator authority.", image: media.patrol, alt: "Patrol route and drone mission interface" },
  { title: "Monitor", label: "03 / VISIBILITY", description: "Bring mission telemetry, available camera views and the state of your operation into a common picture.", image: media.monitor, alt: "Live security operation monitor" },
  { title: "Detect", label: "04 / INTELLIGENCE", description: "Review imagery and sensor observations in their operational context. Proposed detection and video-reasoning workflows require supported providers and validation.", image: media.detect, alt: "Mapping and security detections interface" },
  { title: "Act", label: "05 / RESPONSE", description: "Give responders the relevant scene context and keep a traceable record of the decisions, approvals and mission outcome.", image: media.act, alt: "Operator response workflow" },
];

const platform = [
  { title: "Aeros Dispatch", subtitle: "Mission requests and approvals", image: media.initiate, text: "Turn an operational request into a reviewed mission plan. Keep constraints, operator approvals and handoffs explicit." },
  { title: "Aeros Fleet", subtitle: "Connected aircraft and readiness", image: media.drone, text: "A hardware-independent view of availability, status and assignments across supported drone platforms." },
  { title: "Aeros Control", subtitle: "A shared operating picture", image: media.control, text: "An operational interface that brings together mission status, live imagery where available, and the people responding." },
  { title: "Aeros Spatial", subtitle: "Environment and coverage", image: media.site, text: "Plan with geographic context and constraints, from complex perimeters to multi-site operations." },
  { title: "Aeros Vision", subtitle: "Video and evidence intelligence", image: media.night, text: "Develop searchable, reviewable mission evidence across sources, with human oversight and traceability." },
  { title: "Aeros Integrations", subtitle: "Your existing security stack", image: media.vms, text: "Connect to aircraft, sensors, and operational tools through supported APIs; integration scope is assessed per deployment." },
];

const industries = [
  { name: "Distribution centers", image: media.perimeter },
  { name: "Correction facilities", image: media.site },
  { name: "Storage yards", image: media.city },
  { name: "Schools and campuses", image: media.response },
  { name: "Parking lots", image: media.control },
  { name: "Industrial facilities", image: media.patrol },
  { name: "Utility plants and substations", image: "/static/landing/drone/alameda-aerial.jpg" },
  { name: "Shopping centers", image: media.monitor },
  { name: "Construction sites", image: media.fused },
  { name: "Stadiums and venues", image: media.night },
  { name: "Ports and terminals", image: media.initiate },
];

function Reveal({children,className=""}:{children:React.ReactNode;className?:string}) {
  return <div className={`${styles.reveal} ${className}`} data-aeros-reveal data-visible="true">{children}</div>;
}

function Photo({src,alt,className=""}:{src:string;alt:string;className?:string}) {
  return <img className={className} src={src} alt={alt} loading="lazy" decoding="async"/>;
}

export function PhysicalSecurityExperience() {
  const router = useRouter();
  const [stepIndex,setStepIndex] = useState(0);
  const [industryIndex,setIndustryIndex] = useState(0);
  const [selectedProduct,setSelectedProduct] = useState<number | null>(null);
  const [heroPaused,setHeroPaused] = useState(false);
  const heroRef = useRef<HTMLVideoElement>(null);
  const productCloseRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const elements = [...document.querySelectorAll<HTMLElement>("[data-aeros-reveal]")];
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        (entry.target as HTMLElement).dataset.visible="true";
        observer.unobserve(entry.target);
      }
    }, {threshold:.08,rootMargin:"0px 0px -35px 0px"});
    for(const el of elements){el.dataset.visible="false";observer.observe(el);}
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video=heroRef.current;
    if (!video) return;
    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
    if(reduced.matches){video.pause();return;}
    const observer=new IntersectionObserver(entries=>{
      if(entries.some(e=>e.isIntersecting)&&!heroPaused&&document.visibilityState!=="hidden"){
        void video.play().catch(()=>{});
      }else video.pause();
    },{threshold:.1});
    const onVisibility=()=>{if(document.visibilityState==="hidden")video.pause();else if(!heroPaused)void video.play().catch(()=>{});};
    observer.observe(video);
    document.addEventListener("visibilitychange",onVisibility);
    return ()=>{observer.disconnect();document.removeEventListener("visibilitychange",onVisibility);video.pause();};
  },[heroPaused]);

  useEffect(()=>{
    if(selectedProduct===null)return;
    const onKey=(event:KeyboardEvent)=>{if(event.key==="Escape")setSelectedProduct(null);};
    document.addEventListener("keydown",onKey);
    productCloseRef.current?.focus();
    return ()=>document.removeEventListener("keydown",onKey);
  },[selectedProduct]);

  const selected = selectedProduct===null?null:platform[selectedProduct];

  return (
    <>
      <PageMetadata title="Physical Security | Aeros" description="Explore the vision for Aeros physical security: coordinated drone patrols, mission operations, spatial awareness and video intelligence, built for existing fleets." pathname={router.asPath}/>
      <div className={`${styles.page} relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen`}>
        <div className={styles.subnav}>
          <span className={styles.subnavLabel}>AEROS / PHYSICAL SECURITY</span>
          <nav className={styles.subnavLinks} aria-label="Physical security sections">
            <a href="#security-overview">Overview</a><a href="#security-workflow">How it works</a><a href="#security-platform">Platform</a><a href="#security-applications">Applications</a><a href="/home/contact">Contact ↗</a>
          </nav>
        </div>
        <section id="security-overview" className={styles.hero} aria-labelledby="security-hero">
          <video ref={heroRef} className={styles.heroVideo} autoPlay muted loop playsInline preload="metadata" poster="/static/landing/drone/films/aeros-film-v4.jpg" aria-label="Aeros autonomous mission concept film">
            <source src="/static/landing/drone/films/aeros-film-v4.mp4" type="video/mp4"/>
          </video>
          <div className={styles.heroShade}/>
          <div className={`${styles.container} ${styles.heroBody}`}>
            <p className={styles.heroLabel}>Physical Security / Aeros Intelligence</p>
            <h1 id="security-hero">See the whole picture.<br/>From anywhere.</h1>
            <p>One intelligence layer for drone-enabled security. Coordinate patrols, understand what is happening, and put the right context in the hands of your operators.</p>
            <div className={styles.heroActions}>
              <Link href="/home/contact" className={styles.solidBtn}>Get started <span className={styles.arrow} aria-hidden>↗</span></Link>
              <a className={styles.outlineBtn} href="#security-workflow">Explore the workflow <span className={styles.arrow} aria-hidden>↗</span></a>
              <button className={styles.outlineBtn} type="button" onClick={()=>setHeroPaused(p=>!p)} aria-label={heroPaused?"Play background film":"Pause background film"}>{heroPaused?"Play film":"Pause film"} <span aria-hidden>{heroPaused?"▶":"Ⅱ"}</span></button>
            </div>
          </div>
          <div className={styles.heroCorner}>AUTONOMOUS OPERATIONS / 01</div>
        </section>
        <section className={styles.intro} aria-label="Physical security introduction">
          <div className={`${styles.container} ${styles.introGrid}`}>
            <Reveal><p className={styles.introLead}>Security needs more than another camera. It needs an understanding of the entire operation.</p></Reveal>
            <Reveal><p className={styles.introText}>Physical sites move faster than fixed surveillance can follow. Aeros is building an intelligence and orchestration layer for the drones, cameras, operators and systems you already use—so teams can plan, coordinate, and review operations with one shared source of context.</p></Reveal>
          </div>
        </section>
        <section className={styles.problem} aria-labelledby="security-problem">
          <div className={styles.container}>
            <Reveal className={styles.problemHeader}>
              <h2 id="security-problem" className={styles.heading}>Visibility where traditional security falls short.</h2>
              <p className={styles.copy}>Fixed viewpoints, fragmented workflows and slow handovers create gaps when every decision matters.</p>
            </Reveal>
            <div className={styles.problemGrid}>
              <Reveal className={styles.problemItem}>
                <span>01</span><h3>Fixed blind spots.</h3><p>Stationary cameras are limited to the perspective where they are installed. Aerial context can help assess what is happening elsewhere.</p>
              </Reveal>
              <Reveal className={styles.problemCenter}><Photo src={media.site} alt="Industrial site seen from an aerial perspective"/></Reveal>
              <Reveal className={styles.problemItem}>
                <span>02</span><h3>Disconnected response.</h3><p>When sensor alerts, aircraft status, and incident information sit in different systems, operators spend time reconstructing the scene.</p>
              </Reveal>
            </div>
          </div>
        </section>
        <section className={styles.trilogy} aria-labelledby="security-operations">
          <div className={styles.container}>
            <Reveal className={styles.centerHeading}>
              <h2 id="security-operations" className={styles.heading}>Security that stays ahead of the moment.</h2>
              <p>A connected operational picture, from routine patrol to unexpected incident—with human authorization at every critical step.</p>
            </Reveal>
            <div className={styles.featureRows}>
              {outcomes.map(item=>(
                <Reveal key={item.title} className={styles.featureRow}>
                  <div className={styles.featureText}>
                    <small>{item.eyebrow}</small>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                  <div className={styles.featureMedia}>
                    <Photo src={item.image} alt={item.alt}/><span className={styles.mediaLabel}>AERIAL OPERATIONS / AEROS</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        <section id="security-workflow" className={styles.workflow} aria-labelledby="security-workflow-heading">
          <div className={styles.container}>
            <Reveal className={styles.workflowHeader}>
              <h2 id="security-workflow-heading" className={styles.heading}>From alert to action. In one workflow.</h2>
              <p className={styles.copy}>A clear sequence for security operators, from mission initiation through reviewable response.</p>
            </Reveal>
            <div role="tablist" aria-label="Security mission workflow" className={styles.stepTabs}>
              {steps.map((step,index)=>(
                <button key={step.title} type="button" className={`${styles.stepTab} ${stepIndex===index?styles.stepTabActive:""}`} role="tab" id={`security-step-${index}`} aria-controls="security-step-panel" aria-selected={stepIndex===index} tabIndex={stepIndex===index?0:-1} onClick={()=>setStepIndex(index)} onKeyDown={e=>{
                  if(e.key==="ArrowRight"||e.key==="ArrowLeft"){e.preventDefault();const next=(index+(e.key==="ArrowRight"?1:steps.length-1))%steps.length;setStepIndex(next);document.getElementById(`security-step-${next}`)?.focus();}
                }}>{step.title}</button>
              ))}
            </div>
            <div role="tabpanel" id="security-step-panel" aria-labelledby={`security-step-${stepIndex}`} className={styles.stepView}>
              <div className={styles.stepDetail}>
                <div><small>{steps[stepIndex].label}</small><h3>{steps[stepIndex].title}.</h3><p>{steps[stepIndex].description}</p></div>
                <small>{String(stepIndex+1).padStart(2,"0")} / 05 — AEROS MISSION CYCLE</small>
              </div>
              <Photo key={steps[stepIndex].image} src={steps[stepIndex].image} alt={steps[stepIndex].alt}/>
            </div>
          </div>
        </section>
        <section id="security-platform" className={styles.cards} aria-labelledby="security-platform-heading">
          <div className={styles.container}>
            <Reveal>
              <p className={styles.kicker}>The platform / Software first</p>
              <h2 id="security-platform-heading" className={styles.heading}>A complete intelligence layer for physical security.</h2>
            </Reveal>
            <div className={styles.cardsGrid}>
              {platform.map((item,index)=>(
                <button key={item.title} type="button" className={styles.productCard} onClick={()=>setSelectedProduct(index)} aria-label={`Learn more about ${item.title}`}>
                  <Photo src={item.image} alt={item.subtitle}/>
                  <span className={styles.productInfo}><strong>{item.title}</strong><span>{item.subtitle}</span></span>
                  <span className={styles.productPlus} aria-hidden>+</span>
                </button>
              ))}
            </div>
          </div>
        </section>
        <section className={styles.metrics} aria-label="One platform vision">
          <Photo className={styles.metricsBg} src={media.site} alt=""/>
          <div className={`${styles.container} ${styles.metricsInner}`}>
            <Reveal><p className={styles.kicker}>One connected operation</p><h2>More context. Better coordination. Clearer decisions.</h2></Reveal>
            <Reveal className={styles.metricGrid}>
              <div><span className={styles.metricValue}>01</span><p className={styles.metricCaption}>Shared operating picture, rather than disconnected workflows.</p></div>
              <div><span className={styles.metricValue}>04</span><p className={styles.metricCaption}>Core layers: planning, orchestration, spatial context and visual intelligence.</p></div>
            </Reveal>
          </div>
        </section>
        <section className={styles.light} aria-label="Physical security intelligence features">
          <div className={`${styles.container} ${styles.lightCenter}`}>
            <Reveal><h2 className={styles.heading}>See every angle. Understand every moment.</h2><p>Move from isolated camera feeds to a more complete picture of what is happening on the ground.</p></Reveal>
          </div>
          <div className={`${styles.container} ${styles.deep}`}>
            <Reveal className={styles.deepGrid}>
              <div className={styles.deepText}><p className={styles.kicker}>Real-time operational context</p><h3>Bring the scene into focus.</h3><p>Present available live video, map positions, aircraft health and mission context in a shared operator interface. Make it easier to see what matters without switching between disconnected tools.</p></div>
              <Photo className={styles.deepMedia} src={media.control} alt="Aerial video and mapping command software"/>
            </Reveal>
            <Reveal className={styles.deepGrid}>
              <div className={styles.deepText}><p className={styles.kicker}>Intelligence in the footage</p><h3>More than a live feed.</h3><p>Our planned visual intelligence layer is designed to help teams organize observations, associate findings with locations, and revisit evidence with the context of the original mission.</p></div>
              <Photo className={styles.deepMedia} src={media.detect} alt="Geospatial detection and monitoring interface"/>
            </Reveal>
            <Reveal className={styles.deepGrid}>
              <div className={styles.deepText}><p className={styles.kicker}>Day / Night / Evolving conditions</p><h3>Understand the site in any light.</h3><p>Bring visible and thermal imagery from supported sensors into the same mission workflow. Aircraft capability, operating conditions and authorizations remain hardware and deployment dependent.</p></div>
              <Photo className={styles.deepMedia} src={media.night} alt="Thermal aerial imagery of a security perimeter"/>
            </Reveal>
          </div>
        </section>
        <section className={styles.darkDeep} aria-label="Airspace and response intelligence">
          <div className={styles.container}>
            <Reveal className={styles.deepGrid}>
              <div className={styles.deepText}><p className={styles.kicker}>A more complete operational layer</p><h3>Coordinate across the environment.</h3><p>Plan with the site, route constraints, weather, airspace, aircraft state and active missions in view. Provide operators with the information needed to approve and adjust the plan.</p></div>
              <Photo className={styles.deepMedia} src={media.fused} alt="Complex flight and environmental visualization"/>
            </Reveal>
            <Reveal className={styles.deepGrid}>
              <div className={styles.deepText}><p className={styles.kicker}>Operator led / Human accountable</p><h3>Keep decisions traceable.</h3><p>Give teams a clear path from the first alert to an approved action and a reviewable record. Aeros augments qualified operators; it does not substitute for regulatory authorization or flight safety procedures.</p></div>
              <Photo className={styles.deepMedia} src={media.security} alt="Secure operational overview interface"/>
            </Reveal>
          </div>
        </section>
        <section className={styles.whiteSection} aria-labelledby="security-support">
          <div className={styles.container}>
            <Reveal><p className={styles.kicker}>Build on what you already operate</p><h2 id="security-support" className={styles.title} style={{maxWidth:900,marginBottom:54}}>Connected to the tools and teams already on site.</h2></Reveal>
            <div className={styles.supportGrid}>
              {[
                {title:"Existing aircraft",description:"Integrate supported drone fleets instead of replacing hardware you have already invested in.",src:media.drone},
                {title:"Security systems",description:"Evaluate connections to alerts, access events and video systems based on supported interfaces.",src:media.vms},
                {title:"Operational teams",description:"Make mission context available to dispatchers, supervisors and responders in the right workflows.",src:media.act},
                {title:"Ongoing deployment",description:"Define approvals, retention, safety limits and integration scope with each customer.",src:media.initiate},
              ].map(item=>(
                <Reveal className={styles.supportCard} key={item.title}>
                  <Photo src={item.src} alt={item.title}/><h3>{item.title}</h3><p>{item.description}</p><Link href="/home/contact">Discuss integration ↗</Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        <section id="security-applications" className={styles.industries} aria-labelledby="security-applications-heading">
          <div className={styles.container}>
            <Reveal><p className={styles.kicker}>Designed for real sites</p><h2 id="security-applications-heading" className={styles.title}>Physical security wherever the world needs eyes.</h2></Reveal>
            <div className={styles.industryCloud} aria-label="Physical security applications">
              {industries.map((item,index)=>(
                <button className={`${styles.industryWord} ${index===industryIndex?styles.industryWordActive:""}`} key={item.name} onMouseEnter={()=>setIndustryIndex(index)} onFocus={()=>setIndustryIndex(index)} onClick={()=>setIndustryIndex(index)} type="button" aria-pressed={industryIndex===index}>{item.name}</button>
              ))}
            </div>
            <div className={styles.industryPreview} aria-live="off"><Photo src={industries[industryIndex].image} alt={`Illustrative aerial context for ${industries[industryIndex].name.toLowerCase()}`}/></div>
          </div>
        </section>
        <section className={styles.footCta} aria-label="Get started with Aeros physical security">
          <div className={`${styles.container} ${styles.footCtaInner}`}>
            <Reveal><p className={styles.kicker}>Aeros / Physical Security</p><h2>See the operation.<br/>Change the outcome.</h2></Reveal>
            <Link className={styles.solidBtn} href="/home/contact">Talk to Aeros <span className={styles.arrow} aria-hidden>↗</span></Link>
          </div>
        </section>
        <section className={styles.resources} aria-labelledby="security-resources">
          <div className={styles.container}>
            <h2 id="security-resources" className={styles.title}>Explore the platform.</h2>
            <div className={styles.resourcesGrid}>
              {[
                {title:"Watch the Aeros mission walkthrough",image:"/static/landing/drone/films/aeros-demo-boston.jpg",link:"/home#mission-control",label:"View demo"},
                {title:"Infrastructure and inspection workflows",image:"/static/landing/drone/alameda-aerial.jpg",link:"/home/solutions/infrastructure-inspection",label:"Explore solution"},
                {title:"Connect an existing drone fleet",image:"/static/landing/drone/films/fleet-readiness.jpg",link:"/home/solutions/fleet-service-providers",label:"Explore integrations"},
              ].map(item=>(
                <article key={item.title} className={styles.resourceCard}>
                  <Photo src={item.image} alt="Aeros operational imagery"/><div><h3>{item.title}</h3><Link href={item.link}>{item.label} ↗</Link></div>
                </article>
              ))}
            </div>
          </div>
        </section>
        {selected&&(
          <div className={styles.modalBackdrop} role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)setSelectedProduct(null)}}>
            <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="aeros-product-modal">
              <button ref={productCloseRef} className={styles.modalClose} type="button" aria-label="Close product details" onClick={()=>setSelectedProduct(null)}>×</button>
              <Photo src={selected.image} alt={selected.subtitle}/>
              <div className={styles.modalText}><p className={styles.kicker}>The Aeros platform</p><h2 id="aeros-product-modal">{selected.title}</h2><p>{selected.text}</p><Link className={styles.solidBtn} href="/home/contact" onClick={()=>setSelectedProduct(null)}>Discuss this capability ↗</Link></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
