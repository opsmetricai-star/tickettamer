import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdmin } from "@/lib/supabase/server";

const Body = z.object({
  name: z.string().min(1).max(120), company: z.string().min(1).max(160), email: z.string().email().max(200),
  volume: z.string().max(60).optional(), message: z.string().max(3000).optional(), website: z.string().optional(),
});

export async function POST(req: Request) {
  const p = Body.safeParse(await req.json().catch(() => null));
  if (!p.success) return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  if (p.data.website) return NextResponse.json({ ok: true }); // honeypot
  const admin = createAdmin();
  if (!admin) return NextResponse.json({ error: "Demo requests are not available until the backend is configured." }, { status: 503 });
  const { website: _w, ...row } = p.data;
  const { error } = await admin.from("demo_requests").insert(row);
  if (error) return NextResponse.json({ error: "Could not save your request." }, { status: 500 });
  return NextResponse.json({ ok: true });
}
