"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowser } from "@/lib/supabase/client";

export function NewTicket() {
  const r = useRouter(); const [busy, setBusy] = useState(false); const [err, setErr] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setErr(""); setBusy(true);
    const form = e.currentTarget; const f = new FormData(form);
    const sb = createBrowser(); const { data: { user } } = await sb.auth.getUser();
    const { data, error } = await sb.from("tickets").insert({ user_id: user!.id, subject: f.get("subject"), body: f.get("body"), customer_email: f.get("email") || null, priority: f.get("priority") }).select("id").single();
    if (error || !data) { setErr(error?.message || "Could not create ticket."); setBusy(false); return; }
    if (f.get("auto")) {
      const res = await fetch("/api/ai/resolve", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ message: f.get("body"), subject: f.get("subject"), ticketId: data.id }) });
      if (!res.ok) setErr((await res.json().catch(() => ({}))).error || "AI resolution failed. The ticket was saved.");
    }
    form.reset(); setBusy(false); r.refresh();
  }
  return (
    <form onSubmit={submit} className="card grid gap-3 p-5 md:grid-cols-2">
      <input className="input" name="subject" placeholder="Subject" required maxLength={300} />
      <input className="input" name="email" type="email" placeholder="Customer email (optional)" />
      <textarea className="input min-h-24 md:col-span-2" name="body" placeholder="Customer message" required maxLength={6000} />
      <div className="flex flex-wrap items-center gap-4 md:col-span-2">
        <select name="priority" className="input !w-auto" defaultValue="normal"><option>low</option><option>normal</option><option>high</option><option>urgent</option></select>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="auto" defaultChecked /> Resolve with AI (uses 1 credit)</label>
        <button disabled={busy} className="btn-dark ml-auto disabled:opacity-60">{busy ? "Working..." : "Create ticket"}</button>
      </div>
      {err && <p role="alert" className="text-sm text-red-600 md:col-span-2">{err}</p>}
    </form>
  );
}
