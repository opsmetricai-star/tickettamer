"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function ActivateForm() {
  const r = useRouter(); const [msg, setMsg] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); const f = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch("/api/billing/activate", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(f) });
    const j = await res.json().catch(() => ({})); setMsg(res.ok && j.ok ? "Plan activated." : j.error || "Failed."); r.refresh();
  }
  return (
    <form onSubmit={submit} className="card grid gap-3 p-6 md:grid-cols-[1fr_140px_1fr_auto]">
      <input className="input" type="email" name="email" placeholder="Customer email" required />
      <select className="input" name="plan"><option value="starter">starter</option><option value="growth">growth</option><option value="scale">scale</option></select>
      <input className="input" name="reference" placeholder="Selar order reference" required />
      <button className="btn-dark">Activate</button>
      {msg && <p className="text-sm md:col-span-4" role="status">{msg}</p>}
    </form>
  );
}
