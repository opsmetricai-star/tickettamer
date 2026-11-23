import { NextResponse } from "next/server";
import { createSupabase } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next");
  const safe = next && next.startsWith("/") && !next.startsWith("//") ? next : "/app";
  if (code) {
    const sb = await createSupabase();
    const { error } = await sb.auth.exchangeCodeForSession(code);
    if (error) return NextResponse.redirect(new URL("/signin?error=callback", url.origin));
  }
  return NextResponse.redirect(new URL(safe, url.origin));
}
