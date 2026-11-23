"use client";
import { useState } from "react";

export function DemoForm({ email, topic }: { email?: string; topic?: string }) {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setState("loading");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const r = await fetch("/api/demo", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(data) });
    const j = await r.json().catch(() => ({}));
    if (r.ok) setState("done"); else { setState("error"); setMsg(j.error || "Something went wrong."); }
  }
  if (state === "done") return <div className="card p-10 text-center"><p className="text-2xl font-medium">Thanks, we have your request.</p><p className="mt-2 text-ink/60">We will reply by email shortly.</p></div>;
  return (
    <form onSubmit={submit} className="card space-y-4 p-8">
      <div className="grid gap-4 md:grid-cols-2"><input className="input" name="name" placeholder="Full name" required /><input className="input" name="company" placeholder="Company" required /></div>
      <input className="input" name="email" type="email" placeholder="Work email" defaultValue={email} required />
      <select className="input" name="volume" defaultValue="" required><option value="" disabled>Monthly ticket volume</option><option>Under 1,000</option><option>1,000 - 10,000</option><option>10,000 - 100,000</option><option>100,000+</option></select>
      <textarea className="input min-h-28" name="message" placeholder="What would you like to automate?" defaultValue={topic === "careers" ? "Interested in working with TicketTamer." : ""} />
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      {state === "error" && <p role="alert" className="text-sm text-red-600">{msg}</p>}
      <button disabled={state === "loading"} className="btn-dark w-full disabled:opacity-60">{state === "loading" ? "Sending..." : "Request a demo"}</button>
    </form>
  );
}
