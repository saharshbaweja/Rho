import {NextResponse} from 'next/server';
import {getCurrentUserAndWorkspace} from '../../../../lib/workspace';
import {createAdminClient} from '../../../../lib/supabase/admin';
import {getPriceId,getStripe,PLAN_CONFIG} from '../../../../lib/stripe';

export async function POST(request){
  const {user,workspace,subscription}=await getCurrentUserAndWorkspace();
  if(!user) return NextResponse.json({error:'Authentication required'}, {status:401});
  if(!workspace) return NextResponse.json({error:'No operator workspace found'}, {status:400});
  const body=await request.json().catch(()=>({}));
  const plan=body.plan;
  if(!PLAN_CONFIG[plan]) return NextResponse.json({error:'Invalid plan'}, {status:400});
  const stripe=getStripe();
  const price=getPriceId(plan);
  if(!stripe||!price) return NextResponse.json({error:'Billing is not configured yet'}, {status:503});
  const admin=createAdminClient();
  let customerId=subscription?.stripe_customer_id||null;
  if(!customerId){
    const customer=await stripe.customers.create({email:user.email,name:workspace.name,metadata:{organization_id:workspace.id,user_id:user.id}});
    customerId=customer.id;
    if(admin) await admin.from('subscriptions').upsert({organization_id:workspace.id,stripe_customer_id:customerId,plan:'trial',status:'trialing'},{onConflict:'organization_id'});
  }
  const appUrl=process.env.NEXT_PUBLIC_APP_URL||new URL(request.url).origin;
  const lineItems=[{price,quantity:1}];
  if(plan==='operator'&&process.env.STRIPE_PRICE_ONBOARDING) lineItems.push({price:process.env.STRIPE_PRICE_ONBOARDING,quantity:1});
  const session=await stripe.checkout.sessions.create({
    mode:'subscription',
    customer:customerId,
    line_items:lineItems,
    allow_promotion_codes:true,
    success_url:`${appUrl}/billing/?success=1&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url:`${appUrl}/billing/?canceled=1`,
    client_reference_id:workspace.id,
    metadata:{organization_id:workspace.id,plan},
    subscription_data:{metadata:{organization_id:workspace.id,plan}}
  });
  return NextResponse.json({url:session.url});
}
