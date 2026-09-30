import Link from 'next/link';
import Reveal from '../../components/Reveal';

export default function Pricing(){return <>
<section className="pageHero wrap pastelHero peach"><Reveal><p className="eyebrow">PRICING</p><h1>Pay for the decisions<br/><em>you actually measure.</em></h1><p>Rho is in private beta. These tiers describe the intended commercial model, not final public pricing.</p></Reveal></section>
<section className="pricingGrid wrap">
 <Reveal><article><span>DESIGN PARTNER</span><h2>Private beta</h2><strong>Custom</strong><p>For teams helping shape Rho Trials with real post-training decisions.</p><ul><li>Controlled dataset comparisons</li><li>Hands-on experiment setup</li><li>Decision report + trial lineage</li><li>Direct product feedback loop</li></ul><Link href="/contact/">Apply ↗</Link></article></Reveal>
 <Reveal delay={.06}><article className="featured"><span>TEAM</span><h2>Trials</h2><strong>$1k–$3k<small>/mo + compute</small></strong><p>Working hypothesis for AI startups running recurring post-training experiments.</p><ul><li>CLI + SDK + dashboard</li><li>Experiment history</li><li>Dataset comparison workflows</li><li>Usage-based GPU pass-through</li></ul><Link href="/contact/">Talk to Rho ↗</Link></article></Reveal>
 <Reveal delay={.12}><article><span>ENTERPRISE</span><h2>Private deployment</h2><strong>Custom</strong><p>For organizations with sensitive models, proprietary corpora, and deployment constraints.</p><ul><li>Customer-controlled environment</li><li>Access controls + audit lineage</li><li>Custom integrations</li><li>Dedicated support</li></ul><Link href="/enterprise/">Explore enterprise ↗</Link></article></Reveal>
</section>
<section className="pricingNote bluePanel"><div className="wrap"><Reveal><p className="eyebrow">HOW WE THINK ABOUT PRICING</p><h2>Rho should cost less than the bad training run it prevents.</h2><p>The commercial model will likely combine software access with transparent compute usage. The pricing above is intentionally labeled as a hypothesis until design-partner usage gives us enough evidence.</p></Reveal></div></section>
</>}