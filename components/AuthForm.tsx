"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Logo } from "./Logo";
import { createBrowser } from "@/lib/supabase/client";

type Mode = "signin" | "signup" | "forgot" | "reset";
const copy: Record<Mode, [string, string, string]> = {
  signin: ["Sign in to TicketTamer", "Sign in", "Signing in..."],
  signup: ["Create your TicketTamer account", "Create account", "Creating account..."],
  forgot: ["Reset your password", "Reset password", "Sending..."],
  reset: ["Choose a new password", "Update password", "Updating..."],
};

export function AuthForm({ mode, configured }: { mode: Mode; configured: boolean }) {
  const router = useRouter(); const sp = useSearchParams();
  const [err, setErr] = useState(""); const [info, setInfo] = useState(""); const [busy, setBusy] = useState(false);
  const plan = sp.get("plan");
  const rawNext = sp.get("next");
  const safeNext = rawNext && rawNext.startsWith("/") && !rawNext.startsWith("//") ? rawNext : null;
  const next = plan && ["starter", "growth", "scale"].includes(plan) ? `/app/billing?checkout=${plan}` : safeNext || "/app";

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setErr(""); setInfo("");
    if (!configured) return setErr("Sign-in is temporarily unavailable. Please try again shortly.");
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email") || ""), password = String(f.get("password") || "");
    if (mode !== "forgot" && password.length < 8) return setErr("Password must be at least 8 characters.");
    setBusy(true);
    const sb = createBrowser(); const origin = window.location.origin;
    const timeout = new Promise<never>((_, rej) => setTimeout(() => rej(new Error("The request timed out. Check your connection and try again.")), 20000));
    try {
      await Promise.race([timeout, (async () => {
        if (mode === "signin") {
          const { error } = await sb.auth.signInWithPassword({ email, password });
          if (error) throw error; router.replace(next); router.refresh();
        } else if (mode === "signup") {
          const { data, error } = await sb.auth.signUp({ email, password, options: { emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}`, data: { full_name: f.get("name"), company: f.get("company") } } });
          if (error) throw error;
          if (data.session) { router.replace(next); router.refresh(); } else setInfo("Check your work email and confirm your account to continue.");
        } else if (mode === "forgot") {
          const { error } = await sb.auth.resetPasswordForEmail(email, { redirectTo: `${origin}/auth/callback?next=/reset-password` });
          if (error) throw error; setInfo("If that email has an account, a reset link is on its way.");
        } else {
          const { error } = await sb.auth.updateUser({ password });
          if (error) throw error; router.replace("/app");
        }
      })()]);
    } catch (x: any) { setErr(x?.message || "Something went wrong. Please try again."); } finally { setBusy(false); }
  }

  const [title, cta, loading] = copy[mode];
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-12 md:px-16">
        <Link href="/" className="mb-12" aria-label="TicketTamer home"><Logo /></Link>
        <h1 className="text-4xl font-medium tracking-tightest">{title}</h1>
        {sp.get("error") === "config" && <p role="alert" className="mt-4 rounded-xl bg-amber-50 p-3 text-sm text-amber-900">The workspace is temporarily unavailable. Please try again shortly.</p>}
        {sp.get("error") === "callback" && <p role="alert" className="mt-4 rounded-xl bg-amber-50 p-3 text-sm text-amber-900">That confirmation link has expired or was already used. Sign in, or request a new one.</p>}
        <form onSubmit={submit} className="mt-8 max-w-[400px] space-y-4">
          {mode === "signup" && <><input className="input" name="name" placeholder="Full name" aria-label="Full name" required /><input className="input" name="company" placeholder="Company" aria-label="Company" required /></>}
          {mode !== "reset" && <input className="input" type="email" name="email" placeholder="Work email" aria-label="Work email" defaultValue={sp.get("email") || ""} required autoComplete="email" />}
          {mode !== "forgot" && <input className="input" type="password" name="password" placeholder={mode === "reset" ? "New password" : "Password"} aria-label="Password" required minLength={8} autoComplete={mode === "signin" ? "current-password" : "new-password"} />}
          {err && <p role="alert" className="text-sm text-red-600">{err}</p>}
          {info && <p role="status" className="text-sm text-green-700">{info}</p>}
          <button disabled={busy} className="btn-dark w-full disabled:opacity-60">{busy ? loading : cta}</button>
        </form>
        <div className="mt-6 space-y-2 text-sm text-black/60">
          {mode === "signin" && <><p><Link className="underline" href="/forgot-password">Forgot your password?</Link></p><p>New to TicketTamer? <Link className="underline" href="/signup">Sign up</Link></p></>}
          {mode === "signup" && <p>Already have an account? <Link className="underline" href="/signin">Sign in</Link></p>}
          {mode === "forgot" && <p><Link className="underline" href="/signin">Back to sign in</Link></p>}
        </div>
      </div>
      <div className="hero-bg relative hidden items-end p-14 lg:flex">
        <div className="max-w-[460px]">
          <p className="text-4xl font-medium leading-tight tracking-tightest">The AI engine that resolves customer conversations at scale.</p>
          <p className="mt-4 text-ink/70">Analyze, decide and automate across chat, voice and email.</p>
        </div>
      </div>
    </div>
  );
}
