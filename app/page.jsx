'use client';
import {useState} from 'react';
import {ArrowUpRight,ChevronDown} from 'lucide-react';

const steps=[
  ['STEP 01','Indexes your codebase','Builds a graph of your repo - files, functions, and dependencies.'],
  ['STEP 02','Swarm of agents review the PR','Parallel agents review changes, assess their impact beyond the diff, and flag issues.'],
  ['STEP 03','Greptile learns your codebase over time','Reads other engineers’ comments to understand your coding standards.']
];

const bugs=[
  ['NVIDIA','Unbalanced CUDA release wipes context','8.6k Stars · 1.3k Forks'],
  ['Meta PyTorch','Undefined method breaks every step()','1.8k Stars · 350 Forks'],
  ['Solana','Mid-loop overflow leaves orphaned keys','174 Stars · 249 Forks']
];

const faq=[
  ['How does Greptile pricing work?','Starter is free for one active developer. Pro adds team features, more review capacity, and usage-based credits.'],
  ['Can Greptile be self-hosted?','Yes. Greptile can run inside customer-controlled cloud environments and can support private model providers.'],
  ['Are there free trials or discounts available for Greptile?','Qualified open-source projects and early-stage startups may receive discounted access.'],
  ['What programming languages does Greptile support?','Greptile supports the major languages used by modern software teams, with broad support beyond the core set.'],
  ['Which code providers does Greptile support?','GitHub, GitLab, Bitbucket and enterprise-hosted environments are supported.'],
  ['What is AI code review?','AI code review applies repository context to pull requests to find logic, syntax, security, and style issues.']
];

function TechFrame({children,className=''}){return <div className={'tech-frame '+className}><i/><i/><i/><i/>{children}</div>}

export default function Home(){
 const [open,setOpen]=useState(null);
 return <div className="greptile-page">
  <section className="g-hero">
    <div className="g-hero-copy">
      <h1>The AI Code<br/>Reviewer</h1>
      <div className="hero-bottom">
        <p>AI agents that review and test pull requests with<br/>full context of the codebase.</p>
        <div className="hero-buttons">
          <a className="btn-dark" href="#contact">Contact sales</a>
          <a className="btn-green" href="#start">Start now</a>
        </div>
        <a className="tiny-link" href="#agent">onboard with your agent →</a>
      </div>
    </div>
    <div className="g-lizard-wrap">
      <img src="https://www.greptile.com/lizard-mobile.png" alt="Greptile lizard"/>
    </div>
    <div className="hero-foot">OVER 22,000+ TEAMS USE GREPTILE</div>
  </section>

  <section className="g-logo-strip">
    {['NVIDIA','VANTA','SCALE','POSTHOG','SUBSTACK','WORKOS','BREX','KLAVIYO','RETOOL','MINTLIFY','ZAPIER','JOBY','COMPASS','BILT','CROSSMINT'].map(x=><span key={x}>{x}</span>)}
  </section>

  <section className="g-quote">
    <div className="quote-logo">BREX</div>
    <blockquote>“We've tried more code review tools than I can count. Greptile outperforms them all by a mile.”</blockquote>
    <div className="quote-person">James Reggio <span>CTO, Brex</span></div>
  </section>

  <section className="g-dark" id="agent">
    <div className="dark-intro">
      <div className="eyebrow">[ AGENT ]</div>
      <h2>How Greptile reviews every PR</h2>
      <p>Greptile constructs a graph index of your codebase, then uses a swarm of agents to catch potential issues that humans might miss</p>
      <a href="#how">Learn more <ArrowUpRight size={12}/></a>
    </div>
    <div className="how-label">HOW IT WORKS</div>
    <div className="how-grid" id="how">
      {steps.map((s,i)=><article key={s[0]}>
        <TechFrame className={'diagram d'+i}>
          <div className="wire"/>
          <div className="core">{i===0?'◎':i===1?'◈':'▰'}</div>
          <span className="micro a">INDEX</span><span className="micro b">AGENT</span>
          <b className="pixel p1"/><b className="pixel p2"/><b className="pixel p3"/>
        </TechFrame>
        <small>{s[0]}</small><h3>{s[1]}</h3><p>{s[2]}</p>
      </article>)}
    </div>
    <div className="catch-head"><span>CATCH THEM ALL</span><h3>Three bugs that should not hit prod.</h3></div>
    <div className="bug-grid" id="examples">
      {bugs.map((b,i)=><article key={b[0]}>
        <div className="bug-brand"><strong>{b[0]}</strong><span>{b[2]}</span></div>
        <div className="code-card">
          <div className="code-top">{i===0?'device_guard.cc':i===1?'repl_environment.py':'instruction_util.rs'}</div>
          <div className="code-lines"><i/><i/><i/><i/></div>
          <div className="review-line">greptile <span>commented</span></div>
          <p>{b[1]}</p>
        </div>
      </article>)}
    </div>
    <a className="see-more" href="#more">See more examples</a>
  </section>

  <section className="g-personal">
    <div className="section-title"><div className="eyebrow">[ PERSONALIZATION ]</div><h2>Reviews that adapt to your team</h2><p>From custom rules to continuous learning, Greptile gets smarter about your codebase with every review.</p></div>
    <div className="personal-grid">
      <article>
        <TechFrame><img src="https://www.greptile.com/features/agent/custom-rules.png" alt="Custom rules"/></TechFrame>
        <small>[ CUSTOM RULES ]</small><h3>Your house, your rules</h3>
        <p>Write standards in plain English, point Greptile at repo-specific context, and enforce the patterns your team actually cares about on every PR.</p>
        <a href="#rules">Set your rules</a>
      </article>
      <article>
        <TechFrame className="learning-art">
          <div className="wave w1"/><div className="wave w2"/><div className="chat c1">chameleon101<br/><b>We try not to put database query logic in the controller</b></div><div className="chat c2">greptile<br/><b>Making note of this...</b></div>
        </TechFrame>
        <small>[ LEARNING ]</small><h3>We're getting to know each other</h3>
        <p>Greptile learns your codebase and coding standards by reading your team's PR comments.</p>
        <a href="#learning">See learning</a>
      </article>
    </div>
  </section>

  <section className="g-validation">
    <div className="validation-title"><div className="eyebrow">[ YOUR STACK ]</div><h2>The Central Validation Layer.</h2><p>Designed to work seamlessly with every coding agent, Greptile serves as the unified validation agent for all code changes.</p></div>
    <div className="ways-label">WAYS GREPTILE PLUGS INTO YOUR WORKFLOW</div>
    <div className="ways-grid">
      {[
        ['https://www.greptile.com/features/agent/fix-in-x.png','01','Fix in your IDE','One-click send issue context to Claude Code, Cursor, Codex, or Devin'],
        ['https://www.greptile.com/features/agent/greptile-mcp.png','02','Greptile MCP','Connect Greptile to any AI agent to share comment context.'],
        ['https://www.greptile.com/features/agent/claude-code-plugin.png','03','Claude Code Plugin','Let Claude Code automatically read and resolve Greptile comments.'],
        ['https://www.greptile.com/features/agent/greploop.png','04','/greploop','Let any coding agent iterate with Greptile until all issues are resolved.']
      ].map(x=><article key={x[1]}><TechFrame><img src={x[0]} alt=""/></TechFrame><small>{x[1]}</small><h3>{x[2]}</h3><p>{x[3]}</p></article>)}
    </div>
  </section>

  <section className="g-security" id="enterprise">
    <div className="security-head"><div><h2>Security-First Design</h2><p>Built for enterprises across defense, healthcare, and financial services.</p></div><a href="#learn">Learn more</a></div>
    <div className="security-grid">
      <article><small>01</small><h3>Self-Hosted Deployment</h3><p>Host Greptile in your own air-gapped environment.</p></article>
      <article><small>02</small><h3>SOC 2 Compliance</h3><p>Independent audits, reports available on request.</p></article>
      <article><small>03</small><h3>Enterprise Ready</h3><p>SSO, audit logs, dedicated support.</p></article>
    </div>
  </section>

  <section className="g-testimonials">
    <div className="testimonial-grid">
      <article><b>JAMES REGGIO</b><span>CTO · BREX</span><p>We've tried more code review tools than I can count. Greptile outperforms them all by a mile.</p></article>
      <article><b>MARK TRAN</b><span>ENG. MANAGER · WORKOS</span><p>Greptile has tightened our feedback loops, improved consistency, and freed up engineers to focus on higher-level design.</p></article>
    </div>
  </section>

  <section className="g-faq">
    <div className="faq-grid-bg"/>
    <div className="faq-inner">
      <h2>FAQ</h2>
      <div className="faq-list">
        {faq.map((f,i)=><div className={'faq-row '+(open===i?'open':'')} key={f[0]}>
          <button onClick={()=>setOpen(open===i?null:i)}><span>{f[0]}</span><ChevronDown size={14}/></button>
          {open===i&&<p>{f[1]}</p>}
        </div>)}
        <div className="faq-contact">Can't find your answer here? <a href="#contact">Get in touch.</a></div>
      </div>
    </div>
  </section>

  <section className="g-closing" id="contact">
    <div className="closing-copy">
      <h2>Greptile is building the code<br/>validation layer so you can get<br/>back to shipping.</h2>
      <div><a className="btn-outline-light" href="#pricing">View Pricing</a><a className="btn-green" href="#start">Start now</a></div>
    </div>
    <div className="orbit">
      <div className="orbit-core">▰</div>
      <span className="orb o1"/><span className="orb o2"/><span className="orb o3"/><span className="orb o4"/>
    </div>
  </section>

  <footer className="g-footer" id="start">
    <div className="footer-brand">
      <div className="big-logo">◇</div><strong>greptile</strong>
    </div>
    <div className="footer-cols">
      <div><b>PRODUCT</b><a>Enterprise</a><a>Pricing</a><a>Docs</a><a>Zapier</a><span className="status">● VIEW STATUS</span></div>
      <div><b>COMPANY</b><a>Examples</a><a>Careers</a><a>Blog</a><a>Changelog</a><a>Case Studies</a><a>Podcast</a><a>Brand</a></div>
      <div><b>RESOURCES</b><a>Grepository</a><a>Content Library</a><a>What is AI code review?</a><a>Code review checklist</a><a>Benchmarks</a><a>Paste a PR</a></div>
      <div><b>SUPPORT</b><a>Contact us</a><a>Security</a><a>Privacy Policy</a><a>Terms of Service</a><a>Report Bugs</a></div>
    </div>
    <div className="footer-blocks">{Array.from({length:24}).map((_,i)=><i key={i} className={i%5===0?'hot':''}>◇</i>)}</div>
  </footer>
 </div>
}