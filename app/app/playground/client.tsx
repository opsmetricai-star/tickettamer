"use client";
import { useRef, useState, useEffect } from "react";

type Msg = { role: "user" | "agent"; text: string; meta?: string };

export function Playground() {
  const [msgs, setMsgs] = useState<Msg[]>([]); const [busy, setBusy] = useState(false); const [text, setText] = useState("");
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => end.current?.scrollIntoView({ behavior: "smooth" }), [msgs]);
  async function send(e: React.FormEvent) {
    e.preventDefault(); const m = text.trim(); if (!m || busy) return;
    setText(""); setMsgs((x) => [...x, { role: "user", text: m }]); setBusy(true);
    try {
      const res = await fetch("/api/ai/resolve", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ message: m }) });
      const j = await res.json();
      if (!res.ok) setMsgs((x) => [...x, { role: "agent", text: j.error || "Request failed.", meta: "error" }]);
      else setMsgs((x) => [...x, { role: "agent", text: j.reply, meta: `${Math.round(j.confidence * 100)}% confidence${j.needs_human ? " · needs human" : ""}${j.sources?.length ? " · " + j.sources.map((s: any) => s.title).join(", ") : ""}` }]);
    } catch { setMsgs((x) => [...x, { role: "agent", text: "Network error.", meta: "error" }]); }
    setBusy(false);
  }
  return (
    <div className="card flex h-[65vh] max-w-[760px] flex-col">
      <div className="flex-1 space-y-4 overflow-y-auto p-5">
        {!msgs.length && <p className="text-sm text-black/50">Ask something a customer would ask.</p>}
        {msgs.map((m, i) => <div key={i} className={m.role === "user" ? "ml-auto max-w-[80%] rounded-2xl bg-ink px-4 py-2.5 text-sm text-white" : "max-w-[85%]"}>
          {m.role === "agent" ? <div className={`rounded-2xl px-4 py-3 text-sm ${m.meta === "error" ? "bg-red-50 text-red-700" : "bg-soft"}`}><p className="whitespace-pre-wrap">{m.text}</p>{m.meta && m.meta !== "error" && <p className="mt-2 text-xs text-black/45">{m.meta}</p>}</div> : m.text}
        </div>)}
        {busy && <p className="text-sm text-black/50">Thinking...</p>}<div ref={end} />
      </div>
      <form onSubmit={send} className="flex gap-2 border-t border-black/5 p-3"><input className="input" value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a customer message" maxLength={2000} /><button disabled={busy} className="btn-dark disabled:opacity-60">Send</button></form>
    </div>
  );
}
