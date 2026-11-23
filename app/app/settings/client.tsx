"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowser } from "@/lib/supabase/client";

export function SettingsForm({ name, company }: { name: string; company: string }) {
  const r = useRouter(); const [msg, setMsg] = useState(""); const [pw, setPw] = useState("");
  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); const f = new FormData(e.currentTarget); const sb = createBrowser(); const { data: { user } } = await sb.auth.getUser();
    const { error } = await sb.from("profiles").update({ full_name: f.get("name"), company: f.get("company") }).eq("id", user!.id);
    setMsg(error ? error.message : "Saved."); r.refresh();
  }
  async function changePw(e: React.FormEvent) {
    e.preventDefault(); if (pw.length < 8) return setMsg("Password must be at least 8 characters.");
    const { error } = await createBrowser().auth.updateUser({ password: pw }); setMsg(error ? error.message : "Password updated."); setPw("");
  }
  return (
    <>
      <form onSubmit={save} className="card space-y-3 p-6"><p className="font-semibold">Profile</p><input className="input" name="name" defaultValue={name} placeholder="Full name" /><input className="input" name="company" defaultValue={company} placeholder="Company" /><button className="btn-dark">Save</button></form>
      <form onSubmit={changePw} className="card space-y-3 p-6"><p className="font-semibold">Password</p><input className="input" type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="New password" autoComplete="new-password" /><button className="btn-ghost">Update password</button></form>
      {msg && <p role="status" className="text-sm">{msg}</p>}
    </>
  );
}
