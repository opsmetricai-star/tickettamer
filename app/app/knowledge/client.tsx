"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowser } from "@/lib/supabase/client";

export function KnowledgeForm() {
  const r = useRouter(); const [busy, setBusy] = useState(false); const [err, setErr] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setErr(""); setBusy(true);
    const form = e.currentTarget;
    const res = await fetch("/api/knowledge", { method: "POST", body: new FormData(form) });
    const j = await res.json().catch(() => ({}));
    if (!res.ok) setErr(j.error || "Failed to save."); else { form.reset(); r.refresh(); }
    setBusy(false);
  }
  return (
    <form onSubmit={submit} className="card grid gap-3 p-5">
      <div className="grid gap-3 md:grid-cols-[1fr_180px]"><input className="input" name="title" placeholder="Title (e.g. Refund policy)" /><select className="input" name="kind"><option value="article">Help article</option><option value="ticket">Past ticket</option></select></div>
      <textarea className="input min-h-32" name="content" placeholder="Paste article text or a resolved ticket with its answer..." />
      <div className="flex flex-wrap items-center gap-3"><input type="file" name="file" accept=".txt,.md,.csv,.json,.log" className="text-sm" /><span className="text-xs text-black/50">or upload a text file (max 2 MB)</span><button disabled={busy} className="btn-dark ml-auto disabled:opacity-60">{busy ? "Saving..." : "Add source"}</button></div>
      {err && <p role="alert" className="text-sm text-red-600">{err}</p>}
    </form>
  );
}

export function DeleteSource({ id, path }: { id: string; path: string | null }) {
  const r = useRouter();
  return <button className="shrink-0 text-sm text-red-600 underline" onClick={async () => {
    if (!confirm("Delete this source?")) return;
    const sb = createBrowser(); if (path) await sb.storage.from("knowledge-files").remove([path]);
    await sb.from("knowledge_sources").delete().eq("id", id); r.refresh();
  }}>Delete</button>;
}
