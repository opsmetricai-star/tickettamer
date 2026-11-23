# TicketTamer

AI support agents that learn from your knowledge base and past tickets. Next.js 15, TypeScript, Tailwind, Supabase, Gemini.

## Setup
1. `npm install`
2. Copy `.env.example` to `.env.local` and fill every value.
3. Run `supabase/schema.sql` in the Supabase SQL editor (tables, RLS, storage bucket, signup trigger).
4. In Supabase Auth settings add `http://localhost:3000/auth/callback` and your production URL as redirect URLs.
5. `npm run dev`

## Deploy (Vercel)
Import the repo and add all variables from `.env.example`. `SUPABASE_SERVICE_ROLE_KEY`, `GEMINI_API_KEY` and `BILLING_WEBHOOK_SECRET` are server-only.

## Billing
Plans use Selar checkout links. Plans activate only via `POST /api/billing/webhook` (shared secret) or the `/app/admin` page (emails in `ADMIN_EMAILS`). A redirect never activates a plan. The Selar webhook payload mapping is defensive and unverified: test with a real payment.

## Known limitations
- Supabase credentials were not available when this was built, so auth, database, uploads and credit tracking are implemented but untested end to end.
- Retrieval is keyword (BM25-style), not vector search. File upload supports text formats only (txt, md, csv, json, log).
- Voice, email channel connectors, experiments, AOP editor and Duet are described on the marketing pages but are not built in the app.
- Case studies and logos are fictional placeholders; stats are modeled targets.
