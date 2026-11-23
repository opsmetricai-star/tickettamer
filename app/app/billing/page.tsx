import { Check } from "lucide-react";
import { requireUser } from "@/lib/app";
import { plans } from "@/lib/content";
import { Title } from "../ui";

export default async function Billing() {
  const { sb, user, profile, plan, limits } = await requireUser();
  const { data: pays } = await sb.from("payments").select("id,plan,status,created_at,reference").order("created_at", { ascending: false }).limit(10);
  const pending = profile?.plan !== "free" && profile?.plan_status !== "active";
  return (
    <div className="space-y-6">
      <Title title="Billing" sub="Plan, usage and upgrades." />
      <div className="card grid gap-6 p-6 md:grid-cols-3">
        <div><p className="text-sm text-black/50">Current plan</p><p className="mt-1 text-2xl font-medium capitalize">{plan === "free" ? "Free trial" : plan}</p></div>
        <div><p className="text-sm text-black/50">Resolutions this period</p><p className="mt-1 text-2xl font-medium">{profile?.credits_used ?? 0} / {limits.credits}</p></div>
        <div><p className="text-sm text-black/50">Knowledge sources</p><p className="mt-1 text-2xl font-medium">up to {limits.sources}</p></div>
      </div>
      {pending && <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-800">Your plan is not active yet. It activates once the payment is confirmed.</p>}
      <div className="grid gap-5 lg:grid-cols-3">
        {plans.map((p) => (
          <div key={p.id} className={`card flex flex-col p-6 ${plan === p.id ? "ring-2 ring-brand-400" : ""}`}>
            <p className="font-medium">{p.name}</p><p className="mt-3 text-4xl font-medium tracking-tightest">${p.price}<span className="text-sm text-black/50">/mo</span></p>
            <ul className="mt-5 flex-1 space-y-2 text-sm">{p.features.map((f) => <li key={f} className="flex gap-2"><Check size={15} className="mt-0.5 text-brand-500" />{f}</li>)}</ul>
            {plan === p.id ? <p className="mt-6 text-sm font-semibold">Current plan</p> : <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn-dark mt-6">Upgrade to {p.name}</a>}
          </div>
        ))}
      </div>
      <p className="text-sm text-black/60">Use <strong>{user.email}</strong> at checkout so the payment can be matched to this account. Plans activate after confirmed payment, not on redirect.</p>
      <div className="card p-6"><p className="font-semibold">Payment history</p><ul className="mt-3 divide-y divide-black/5 text-sm">{(pays || []).map((p) => <li key={p.id} className="flex justify-between py-2"><span className="capitalize">{p.plan} · {p.status}</span><span className="text-black/50">{new Date(p.created_at).toLocaleDateString()}</span></li>)}{!pays?.length && <li className="py-3 text-black/50">No payments yet.</li>}</ul></div>
    </div>
  );
}
