import Link from 'next/link';
import BillingClient from '../../components/BillingClient';
import {getCurrentUserAndWorkspace} from '../../lib/workspace';

export default async function Billing(){
  const {workspace,subscription}=await getCurrentUserAndWorkspace();
  const configured=Boolean(process.env.STRIPE_SECRET_KEY&&process.env.STRIPE_PRICE_DESIGN_PARTNER&&process.env.STRIPE_PRICE_OPERATOR);
  return <div className="aeros-site"><section className="as-page-hero"><div><div className="as-eyebrow">BILLING</div><h1>Turn the evaluation workspace into an operating deployment.</h1></div><div><p>{workspace?`Workspace: ${workspace.name}. `:''}Start small, prove one operational workflow, then expand only after Aeros earns trust inside the operator’s existing process.</p><div className="as-actions"><Link href="/dashboard/" className="as-btn">Back to product</Link><Link href="/implementation" className="as-btn dark">Implementation model</Link></div></div></section><section className="as-section alt"><div className="as-inner" style={{maxWidth:1000}}><BillingClient subscription={subscription} configured={configured}/></div></section></div>;
}
