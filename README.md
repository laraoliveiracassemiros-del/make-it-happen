# Make It Happen — Full-Stack MVP

Next.js foundation for an outcome-execution platform: customer Mission creation, intent parsing, quote generation, tracking simulation, Operator experience, Academy and Control Center.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy on Vercel

1. Push this folder to GitHub.
2. Import the repository in Vercel.
3. Framework preset: Next.js.
4. Add environment variables from `.env.example`.
5. Deploy.

## Supabase

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL Editor.
3. Add `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in Vercel environment variables.
4. Redeploy.

Without Supabase, the API runs in demo/in-memory mode.

## Payment

`POST /api/checkout` is a safe placeholder. It returns a demo URL unless Stripe or Mercado Pago is configured. Do not charge real clients until legal, responsible-adult and payment-account structure is clear.

## Built routes

- `/` — premium landing page.
- `/make` — Mission Engine demo.
- `/missions/[id]` — Mission status page.
- `/operator` — Operator product/career page.
- `/academy` — MIH Academy concept.
- `/control-center` — operations dashboard.
- `/business` — B2B page.

## What is intentionally not included yet

- Real authentication.
- Real checkout session creation.
- Real-time location.
- Legal agreements.
- Real Operator onboarding checks.
- Push notifications.

Those are next-stage integrations, not design blockers.
