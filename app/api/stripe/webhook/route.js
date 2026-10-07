import {NextResponse} from 'next/server';
import {getStripe} from '../../../../lib/stripe';
import {createAdminClient} from '../../../../lib/supabase/admin';

export const dynamic='force-dynamic';

export async function POST(request){
  const stripe=getStripe();
  const admin=createAdminClient();
  if(!stripe||!admin||!process.env.STRIPE_WEBHOOK_SECRET) return NextResponse.json({error:'Webhook not configured'}, {status:503});
  const signature=request.headers.get('stripe-signature');
  const body=await request.text();
  let event;
  try{event=stripe.webhooks.constructEvent(body,signature,process.env.STRIPE_WEBHOOK_SECRET);}catch(error){return NextResponse.json({error:`Invalid signature: ${error.message}`},{status:400});}

  try{
    if(event.type==='checkout.session.completed'){
      const session=event.data.object;
      const organizationId=session.metadata?.organization_id||session.client_reference_id;
      if(organizationId){
        await admin.from('subscriptions').upsert({
          organization_id:organizationId,
          stripe_customer_id:typeof session.customer==='string'?session.customer:null,
          stripe_subscription_id:typeof session.subscription==='string'?session.subscription:null,
          plan:session.metadata?.plan||'operator',
          status:'active',
          updated_at:new Date().toISOString()
        },{onConflict:'organization_id'});
      }
    }
    if(event.type==='customer.subscription.updated'||event.type==='customer.subscription.deleted'){
      const sub=event.data.object;
      let organizationId=sub.metadata?.organization_id||null;
      if(!organizationId){
        const {data}=await admin.from('subscriptions').select('organization_id').eq('stripe_subscription_id',sub.id).maybeSingle();
        organizationId=data?.organization_id||null;
      }
      if(organizationId){
        await admin.from('subscriptions').upsert({
          organization_id:organizationId,
          stripe_customer_id:typeof sub.customer==='string'?sub.customer:null,
          stripe_subscription_id:sub.id,
          plan:sub.metadata?.plan||'operator',
          status:sub.status,
          current_period_end:sub.current_period_end?new Date(sub.current_period_end*1000).toISOString():null,
          cancel_at_period_end:Boolean(sub.cancel_at_period_end),
          updated_at:new Date().toISOString()
        },{onConflict:'organization_id'});
      }
    }
    return NextResponse.json({received:true});
  }catch(error){
    console.error('Stripe webhook processing error',error);
    return NextResponse.json({error:'Webhook processing failed'},{status:500});
  }
}
