import { redirect } from "next/navigation";
import { createSupabase } from "@/lib/supabase/server";
import { planLimits } from "@/lib/content";

export async function requireUser() {
  const sb = await createSupabase();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) redirect("/signin");
  const { data: profile } = await sb.from("profiles").select("*").eq("id", user.id).single();
  const effective = profile && profile.plan !== "free" && profile.plan_status === "active" ? profile.plan : "free";
  const limits = planLimits(effective);
  return { sb, user, profile, plan: effective as string, limits };
}
export const isAdmin = (email?: string | null) => !!email && (process.env.ADMIN_EMAILS || "").toLowerCase().split(",").map((s) => s.trim()).includes(email.toLowerCase());
