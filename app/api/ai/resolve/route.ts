import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabase, createAdmin, supabaseConfigured } from "@/lib/supabase/server";
import { retrieve, resolveWithGemini, type Source } from "@/lib/ai";
import { planLimits } from "@/lib/content";

export const runtime = "nodejs";
const Body = z.object({ message: z.string().min(2).max(6000), subject: z.string().max(300).optional(), ticketId: z.string().uuid().optional() });

export async function POST(req: Request) {
  if (!supabaseConfigured()) return NextResponse.json({ error: "Service temporarily unavailable." }, { status: 503 });
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  const { message, subject, ticketId } = parsed.data;

  const sb = await createSupabase();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not signed in." }, { status: 401 });

  const admin = createAdmin();
  if (!admin) return NextResponse.json({ error: "Server is missing SUPABASE_SERVICE_ROLE_KEY, so usage cannot be tracked." }, { status: 503 });

  // Usage limits
  const { data: prof } = await admin.from("profiles").select("plan,plan_status,credits_used,period_start").eq("id", user.id).single();
  if (!prof) return NextResponse.json({ error: "Profile not found." }, { status: 404 });
  let used = prof.credits_used;
  if (Date.now() - new Date(prof.period_start).getTime() > 30 * 864e5 && prof.plan !== "free") {
    used = 0; await admin.from("profiles").update({ credits_used: 0, period_start: new Date().toISOString() }).eq("id", user.id);
  }
  const effective = prof.plan !== "free" && prof.plan_status === "active" ? prof.plan : "free";
  const limit = planLimits(effective).credits;
  if (used >= limit) return NextResponse.json({ error: `You have used all ${limit} resolutions on your plan. Upgrade in Billing.` }, { status: 402 });

  // Ground on the user's own knowledge (RLS-scoped client)
  const { data: rows } = await sb.from("knowledge_sources").select("id,title,kind,content").limit(500);
  const ctx = retrieve(`${subject || ""} ${message}`, (rows || []) as Source[], 5);

  const t0 = Date.now();
  try {
    const out = await resolveWithGemini(message, subject, ctx);
    await admin.from("profiles").update({ credits_used: used + 1 }).eq("id", user.id);
    const sources = ctx.filter((c) => out.cited_source_ids.includes(c.id)).map((c) => ({ id: c.id, title: c.title }));
    await admin.from("ai_runs").insert({ user_id: user.id, ticket_id: ticketId ?? null, input: message, output: { ...out, sources }, ok: true, latency_ms: Date.now() - t0 });
    if (ticketId) {
      await sb.from("tickets").update({
        ai_reply: out.reply, ai_confidence: out.confidence, ai_sources: sources, category: out.category, sentiment: out.sentiment,
        status: out.needs_human || out.confidence < 0.5 ? "needs_human" : "ai_resolved", resolved_at: out.needs_human ? null : new Date().toISOString(),
      }).eq("id", ticketId);
    }
    if (out.needs_human) await admin.from("notifications").insert({ user_id: user.id, title: "Ticket needs a human", body: (subject || message).slice(0, 120) });
    return NextResponse.json({ ...out, sources, creditsUsed: used + 1, creditsLimit: limit });
  } catch (e) {
    await admin.from("ai_runs").insert({ user_id: user.id, ticket_id: ticketId ?? null, input: message, output: { error: String(e).slice(0, 300) }, ok: false, latency_ms: Date.now() - t0 });
    return NextResponse.json({ error: "The AI request failed. No credit was used.", detail: String(e).slice(0, 200) }, { status: 502 });
  }
}
