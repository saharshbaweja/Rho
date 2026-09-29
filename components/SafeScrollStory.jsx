'use client';
import {motion,useScroll,useTransform} from 'framer-motion';
import {useRef} from 'react';
import Reveal from './Reveal';

const steps=[
 {tag:'CONNECT',title:'Bring the decision into Rho.',copy:'Model checkpoint, target eval, current corpus, and candidate datasets.',metric:'Inputs locked'},
 {tag:'TRIAL',title:'Run controlled comparisons.',copy:'Standardized sample sizes and recipes keep each dataset on equal footing.',metric:'3 candidates'},
 {tag:'MEASURE',title:'Quantify what each dataset adds.',copy:'Lift, overlap, cost-per-point, and saturation become comparable signals.',metric:'+4.2 pts'},
 {tag:'DECIDE',title:'Allocate the next full run.',copy:'Rho ranks the candidates and records the reasoning behind the recommendation.',metric:'87% confidence'}
];

export default function SafeScrollStory(){
 const ref=useRef(null);
 const {scrollYProgress}=useScroll({target:ref,offset:['start start','end end']});
 const idx=useTransform(scrollYProgress,[0,.33,.66,1],[0,1,2,3]);
 return <section ref={ref} className="safeStory">
   <div className="safeStoryInner wrap">
    <Reveal className="safeStoryCopy"><p className="eyebrow">How Rho works</p><h2 className="display">A data decision,<br/><span>made measurable.</span></h2><p className="lede">Scroll through one Rho Trial. The content changes; the layout stays stable.</p></Reveal>
    <div className="safeStoryStage">
      <motion.div className="safeProgress" style={{scaleY:scrollYProgress}}/>
      {steps.map((s,i)=><motion.article key={s.tag} className="safeStep" style={{opacity:useTransform(idx,[i-.45,i,i+.45],[0,1,0]),y:useTransform(idx,[i-.45,i,i+.45],[24,0,-24])}}>
        <div><span>{String(i+1).padStart(2,'0')} / {s.tag}</span><h3>{s.title}</h3><p>{s.copy}</p></div>
        <strong>{s.metric}</strong>
      </motion.article>)}
      <div className="safeMock">
        <div className="safeMockTop"><span>RHO TRIAL / 0184</span><b>LIVE</b></div>
        <div className="safeMockGrid">
          <div><small>MODEL</small><strong>Qwen 3B</strong></div>
          <div><small>EVAL</small><strong>Debugging</strong></div>
          <div><small>CANDIDATES</small><strong>3</strong></div>
        </div>
        <div className="safeBars"><i style={{'--w':'86%'}}/><i style={{'--w':'61%'}}/><i style={{'--w':'28%'}}/></div>
        <div className="safeWinner"><small>BEST MARGINAL RETURN</small><strong>Production traces</strong></div>
      </div>
    </div>
   </div>
 </section>
}