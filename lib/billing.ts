import type { SupabaseClient } from "@supabase/supabase-js";

/** Activates a plan for the profile with this email. Idempotent on `reference`. */
export async function activatePlan(admin: SupabaseClient, a: { email: string; plan: string; reference: string; raw?: unknown }) {
  const { data: dup } = await admin.from("payments").select("id,status").eq("reference", a.reference).maybeSingle();
  if (dup?.status === "applied") return { ok: true, duplicate: true };
  const { data: prof } = await admin.from("profiles").select("id").ilike("email", a.email).maybeSingle();
  await admin.from("payments").upsert({ user_id: prof?.id ?? null, email: a.email, plan: a.plan, reference: a.reference, status: prof ? "applied" : "unmatched", raw: a.raw ?? null }, { onConflict: "reference" });
  if (!prof) return { ok: false, error: "Payment recorded, but no account uses this email yet. It will be applied by an admin." };
  await admin.from("profiles").update({ plan: a.plan, plan_status: "active", credits_used: 0, period_start: new Date().toISOString() }).eq("id", prof.id);
  await admin.from("notifications").insert({ user_id: prof.id, title: `${a.plan[0].toUpperCase()}${a.plan.slice(1)} plan activated`, body: "Thanks for upgrading. Your new limits are live." });
  return { ok: true };
}
