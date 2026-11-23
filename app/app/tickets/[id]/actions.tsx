"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowser } from "@/lib/supabase/client";

export function TicketActions({ id, subject, body, status, reply }: { id: string; subject: string; body: string; status: string; reply: string | null }) {
  const r = useRouter(); const [busy, setBusy] = useState(""); const [err, setErr] = useState("");
  async function ai() {
    setBusy("ai"); setErr("");
    const res = await fetch("/api/ai/resolve", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ message: body, subject, ticketId: id }) });
    if (!res.ok) setErr((await res.json().catch(() => ({}))).error || "Failed.");
    setBusy(""); r.refresh();
  }
  async function set(s: string) {
    setBusy(s); setErr("");
    const { error } = await createBrowser().from("tickets").update({ status: s, resolved_at: s === "closed" ? new Date().toISOString() : null }).eq("id", id);
    if (error) setErr(error.message); setBusy(""); r.refresh();
  }
  async function del() {
    if (!confirm("Delete this ticket permanently?")) return;
    await createBrowser().from("tickets").delete().eq("id", id); r.replace("/app/tickets"); r.refresh();
  }
  return (
    <div className="flex flex-wrap gap-3">
      <button className="btn-dark disabled:opacity-60" disabled={!!busy} onClick={ai}>{busy === "ai" ? "Thinking..." : reply ? "Regenerate with AI" : "Resolve with AI"}</button>
      {reply && <button className="btn-ghost" onClick={() => navigator.clipboard.writeText(reply)}>Copy reply</button>}
      {status !== "closed" && <button className="btn-ghost" disabled={!!busy} onClick={() => set("closed")}>Mark closed</button>}
      {status === "closed" && <button className="btn-ghost" disabled={!!busy} onClick={() => set("open")}>Reopen</button>}
      <button className="btn-ghost !border-red-300 !text-red-600 hover:!bg-red-600 hover:!text-white" onClick={del}>Delete</button>
      {err && <p role="alert" className="w-full text-sm text-red-600">{err}</p>}
    </div>
  );
}
