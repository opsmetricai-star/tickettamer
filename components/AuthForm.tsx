"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Logo } from "./Logo";
import { createBrowser } from "@/lib/supabase/client";

type Mode = "signin" | "signup" | "forgot" | "reset";
const copy: Record<Mode, [string, string]> = {
  signin: ["Welcome back", "Sign in"], signup: ["Create your workspace", "Create account"],
  forgot: ["Reset your password", "Send reset link"], reset: ["Choose a new password", "Update password"],
};

export function AuthForm({ mode, configured }: { mode: Mode; configured: boolean }) {
  const router = useRouter(); const sp = useSearchParams();
  const [err, setErr] = useState(""); const [info, setInfo] = useState(""); const [busy, setBusy] = useState(false);
  const next = sp.get("next") || "/app";

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setErr(""); setInfo("");
    if (!configured) return setErr("Supabase is not configured yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email") || ""), password = String(f.get("password") || "");
    if (mode !== "forgot" && password.length < 8) return setErr("Password must be at least 8 characters.");
    setBusy(true);
    const sb = createBrowser(); const origin = window.location.origin;
    try {
      if (mode === "signin") {
        const { error } = await sb.auth.signInWithPassword({ email, password });
        if (error) throw error; router.replace(next); router.refresh();
      } else if (mode === "signup") {
        const { data, error } = await sb.auth.signUp({ email, password, options: { emailRedirectTo: `${origin}/auth/callback?next=/app`, data: { full_name: f.get("name"), company: f.get("company") } } });
        if (error) throw error;
        if (data.session) { router.replace("/app"); router.refresh(); } else setInfo("Check your email to confirm your account, then sign in.");
      } else if (mode === "forgot") {
        const { error } = await sb.auth.resetPasswordForEmail(email, { redirectTo: `${origin}/auth/callback?next=/reset-password` });
        if (error) throw error; setInfo("If that email has an account, a reset link is on its way.");
      } else {
        const { error } = await sb.auth.updateUser({ password });
        if (error) throw error; router.replace("/app");
      }
    } catch (x: any) { setErr(x?.message || "Something went wrong."); } finally { setBusy(false); }
  }

  const [title, cta] = copy[mode];
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-12 md:px-16">
        <Link href="/" className="mb-12"><Logo /></Link>
        <h1 className="text-4xl font-medium tracking-tightest">{title}</h1>
        {sp.get("error") === "config" && <p className="mt-4 rounded-xl bg-amber-50 p-3 text-sm text-amber-800">The backend is not configured yet, so the app is unavailable.</p>}
        <form onSubmit={submit} className="mt-8 max-w-[400px] space-y-4">
          {mode === "signup" && <><input className="input" name="name" placeholder="Full name" required /><input className="input" name="company" placeholder="Company" /></>}
          {mode !== "reset" && <input className="input" type="email" name="email" placeholder="Email" required autoComplete="email" />}
          {mode !== "forgot" && <input className="input" type="password" name="password" placeholder={mode === "reset" ? "New password" : "Password"} required minLength={8} autoComplete={mode === "signin" ? "current-password" : "new-password"} />}
          {err && <p role="alert" className="text-sm text-red-600">{err}</p>}
          {info && <p role="status" className="text-sm text-green-700">{info}</p>}
          <button disabled={busy} className="btn-dark w-full disabled:opacity-60">{busy ? "Please wait..." : cta}</button>
        </form>
        <div className="mt-6 space-y-2 text-sm text-black/60">
          {mode === "signin" && <><p><Link className="underline" href="/forgot-password">Forgot password?</Link></p><p>New here? <Link className="underline" href="/signup">Create an account</Link></p></>}
          {mode === "signup" && <p>Already have an account? <Link className="underline" href="/signin">Sign in</Link></p>}
          {mode === "forgot" && <p><Link className="underline" href="/signin">Back to sign in</Link></p>}
        </div>
      </div>
      <div className="hero-bg hidden lg:block" />
    </div>
  );
}
