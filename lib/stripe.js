import Stripe from 'stripe';

export function getStripe(){
  if(!process.env.STRIPE_SECRET_KEY) return null;
  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

export const PLAN_CONFIG={
  design_partner:{
    name:'Design Partner',
    priceEnv:'STRIPE_PRICE_DESIGN_PARTNER',
    publicPrice:'From $750 / month',
    description:'Founder-led deployment on real or historical missions with direct workflow mapping.'
  },
  operator:{
    name:'Flight Operations',
    priceEnv:'STRIPE_PRICE_OPERATOR',
    publicPrice:'From $2,500 / month',
    description:'Recurring operational use with live monitoring, rule management, briefs and team access.'
  }
};

export function getPriceId(plan){
  const config=PLAN_CONFIG[plan];
  return config?process.env[config.priceEnv]:null;
}
