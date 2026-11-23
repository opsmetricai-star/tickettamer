import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { createAdmin } from "@/lib/supabase/server";
import { activatePlan } from "@/lib/billing";

/**
 * Payment notification endpoint (for Selar webhooks or any trusted sender).
 * Auth: shared secret in ?secret= or x-webhook-secret. Expects JSON containing a buyer email, an amount or plan, and a reference.
 * NOTE: Selar's exact payload fields were not verified. Field names are read defensively; confirm against a real test payment.
 * A browser redirect never activates a plan.
 */
const eq = (a: string, b: string) => { const x = Buffer.from(a), y = Buffer.from(b); return x.length === y.length && timingSafeEqual(x, y); };

export async function POST(req: Request) {
  const secret = process.env.BILLING_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ error: "Webhook not configured." }, { status: 503 });
  const given = new URL(req.url).searchParams.get("secret") || req.headers.get("x-webhook-secret") || "";
  if (!eq(given, secret)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const body: any = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Bad payload." }, { status: 400 });
  const d = body.data ?? body;
  const email = String(d.email ?? d.customer_email ?? d.buyer_email ?? d.customer?.email ?? "").toLowerCase();
  const reference = String(d.reference ?? d.order_id ?? d.id ?? d.transaction_id ?? "");
  const amount = Number(d.amount ?? d.price ?? d.total ?? 0);
  const status = String(d.status ?? "success").toLowerCase();
  const text = JSON.stringify(d).toLowerCase();
  const plan = ["starter", "growth", "scale"].includes(String(d.plan)) ? String(d.plan)
    : amount === 97 || text.includes("97plan") ? "scale" : amount === 57 || text.includes("57plan") ? "growth" : amount === 47 || text.includes("47plan") ? "starter" : "";
  if (!email || !reference || !plan) return NextResponse.json({ error: "Could not identify email, reference or plan." }, { status: 422 });
  if (!["success", "successful", "paid", "completed"].includes(status)) return NextResponse.json({ ok: true, ignored: status });

  const admin = createAdmin();
  if (!admin) return NextResponse.json({ error: "Server not configured." }, { status: 503 });
  const res = await activatePlan(admin, { email, plan, reference, raw: body });
  return NextResponse.json(res, { status: res.ok ? 200 : 202 });
}
