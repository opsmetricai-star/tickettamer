import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabase, createAdmin } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/app";
import { activatePlan } from "@/lib/billing";

const Body = z.object({ email: z.string().email(), plan: z.enum(["starter", "growth", "scale"]), reference: z.string().min(3).max(120) });

export async function POST(req: Request) {
  const sb = await createSupabase();
  const { data: { user } } = await sb.auth.getUser();
  if (!user || !isAdmin(user.email)) return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  const p = Body.safeParse(await req.json().catch(() => null));
  if (!p.success) return NextResponse.json({ error: "Invalid input." }, { status: 400 });
  const admin = createAdmin(); if (!admin) return NextResponse.json({ error: "Service role key missing." }, { status: 503 });
  const res = await activatePlan(admin, { ...p.data, email: p.data.email.toLowerCase(), raw: { by: user.email } });
  return NextResponse.json(res, { status: res.ok ? 200 : 202 });
}
