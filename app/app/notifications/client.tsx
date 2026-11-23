"use client";
import { useRouter } from "next/navigation";
import { createBrowser } from "@/lib/supabase/client";

export function MarkRead() {
  const r = useRouter();
  return <button className="btn-ghost" onClick={async () => { await createBrowser().from("notifications").update({ read: true }).eq("read", false); r.refresh(); }}>Mark all read</button>;
}
