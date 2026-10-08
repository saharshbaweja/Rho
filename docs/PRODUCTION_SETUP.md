# Aeros production setup

## Recommended v1 stack

- **Vercel Pro** — Next.js app, server routes, CI/CD and CDN.
- **Supabase Pro** — Postgres, authentication, row-level security and operator data.
- **Stripe Billing** — subscriptions, Checkout, customer portal and later invoicing/ACH.
- **xAI** — language/explanation layer. Deterministic Aeros rules remain the source of pass/review/action states.
- **FAA/public aviation feeds** — live weather now; NOTAM/chart adapters next.

## 1. Supabase

1. Create one production Supabase project.
2. Run `supabase/migrations/001_aeros_core.sql` in the SQL editor or via the Supabase CLI.
3. In Auth, enable email/password and configure the Site URL to the production Aeros URL.
4. Add the production callback URL: `https://YOUR_DOMAIN/auth/callback`.
5. Copy the project URL, anon key and service-role key into Vercel environment variables.

The migration creates organization-isolated RLS policies, an automatic workspace trigger for new users, subscriptions, operator documents/rules, missions, evaluations, AI usage and audit events.

## 2. Stripe

Create two recurring monthly Prices:

- Design Partner — recommended initial list price: **$750/month**
- Flight Operations — recommended initial list price: **$2,500/month**

Optional: create a one-time onboarding Price for the Flight Operations plan. The code adds it to the first Checkout invoice when `STRIPE_PRICE_ONBOARDING` is configured.

Add a webhook endpoint:

`https://YOUR_DOMAIN/api/stripe/webhook`

Subscribe to:

- `checkout.session.completed`
- `customer.subscription.updated`
- `customer.subscription.deleted`

Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`.

## 3. xAI

Create an xAI API key. Recommended model routing:

- `XAI_MODEL=grok-4.20-non-reasoning-latest` for mission explanations, briefs and Q&A.
- `XAI_REASONING_MODEL=grok-4.7` for offline rule/document extraction and difficult review tasks.

The `/api/intelligence` route explicitly treats Aeros structured findings as authoritative and records token/cost data when Supabase is configured.

## 4. Vercel environment variables

Copy `.env.example` and configure the same values in Production and Preview as appropriate.

Required for live auth:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Required for billing:

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_DESIGN_PARTNER`
- `STRIPE_PRICE_OPERATOR`
- `STRIPE_PRICE_ONBOARDING` (optional)

Required for intelligence:

- `XAI_API_KEY`
- `XAI_MODEL`
- `XAI_REASONING_MODEL`

App config:

- `NEXT_PUBLIC_APP_URL=https://YOUR_DOMAIN`
- `AEROS_DEMO_MODE=false` in production after Supabase is configured.

## 5. Deployment sequence

1. Leave `AEROS_DEMO_MODE=true` while validating the public prototype.
2. Configure Supabase and run the migration.
3. Test signup -> email verification -> login -> dashboard -> signout.
4. Configure Stripe in test mode and test Checkout + webhook + customer portal.
5. Add the xAI key and verify the dashboard intelligence panel returns a grounded response and records cost.
6. Set `AEROS_DEMO_MODE=false` and redeploy to require authentication for product routes.
7. Switch Stripe from test keys to live keys only after the complete flow is verified.

## Security / operational boundaries

- Never place Supabase service-role, Stripe secret, webhook secret or xAI keys in browser code.
- Keep operator data isolated by organization and RLS.
- Store source/revision/timestamp for every operational rule and mission evaluation.
- LLM output must never become an uncited legal/airworthiness/release determination.
- Human authorization remains required for real operational use until the applicable operator/regulatory approval path says otherwise.
