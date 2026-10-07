import {NextResponse} from 'next/server';
import {getCurrentUserAndWorkspace} from '../../../../lib/workspace';
import {getStripe} from '../../../../lib/stripe';

export async function POST(request){
  const {user,subscription}=await getCurrentUserAndWorkspace();
  if(!user) return NextResponse.json({error:'Authentication required'}, {status:401});
  if(!subscription?.stripe_customer_id) return NextResponse.json({error:'No Stripe customer found'}, {status:400});
  const stripe=getStripe();
  if(!stripe) return NextResponse.json({error:'Billing is not configured yet'}, {status:503});
  const appUrl=process.env.NEXT_PUBLIC_APP_URL||new URL(request.url).origin;
  const session=await stripe.billingPortal.sessions.create({customer:subscription.stripe_customer_id,return_url:`${appUrl}/billing/`});
  return NextResponse.json({url:session.url});
}
