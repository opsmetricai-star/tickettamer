import { NextResponse } from "next/server";
import { createSupabase, supabaseConfigured } from "@/lib/supabase/server";
import { planLimits } from "@/lib/content";

export const runtime = "nodejs";
const TEXT_EXT = /\.(txt|md|csv|json|log)$/i;
const MAX_BYTES = 2 * 1024 * 1024;

export async function POST(req: Request) {
  if (!supabaseConfigured()) return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  const sb = await createSupabase();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not signed in." }, { status: 401 });

  const { data: prof } = await sb.from("profiles").select("plan,plan_status").eq("id", user.id).single();
  const plan = prof && prof.plan !== "free" && prof.plan_status === "active" ? prof.plan : "free";
  const { count } = await sb.from("knowledge_sources").select("id", { count: "exact", head: true });
  const max = planLimits(plan).sources;
  if ((count || 0) >= max) return NextResponse.json({ error: `Your plan allows ${max} knowledge sources. Upgrade in Billing.` }, { status: 402 });

  const form = await req.formData();
  const kind = String(form.get("kind") || "article");
  if (!["article", "ticket", "file"].includes(kind)) return NextResponse.json({ error: "Invalid kind." }, { status: 400 });
  let title = String(form.get("title") || "").trim(); let content = String(form.get("content") || "").trim(); let file_path: string | null = null;

  const file = form.get("file");
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_BYTES) return NextResponse.json({ error: "File is larger than 2 MB." }, { status: 413 });
    if (!TEXT_EXT.test(file.name)) return NextResponse.json({ error: "Only .txt, .md, .csv, .json and .log files are supported." }, { status: 415 });
    content = (await file.text()).trim();
    title = title || file.name;
    file_path = `${user.id}/${Date.now()}-${file.name.replace(/[^\w.\-]/g, "_")}`;
    const up = await sb.storage.from("knowledge-files").upload(file_path, file, { contentType: file.type || "text/plain" });
    if (up.error) return NextResponse.json({ error: `Upload failed: ${up.error.message}` }, { status: 500 });
  }
  if (!title || content.length < 10) return NextResponse.json({ error: "A title and at least 10 characters of content are required." }, { status: 400 });

  const { error } = await sb.from("knowledge_sources").insert({ user_id: user.id, title: title.slice(0, 200), kind: file_path ? "file" : kind, content: content.slice(0, 200000), file_path });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
