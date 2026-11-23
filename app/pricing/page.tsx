import Link from "next/link";
import { Check } from "lucide-react";
import { Shell, PageHero } from "@/components/Page";
import { plans, FREE_PLAN } from "@/lib/content";

const faqs = [
  ["What counts as an AI resolution?", "Each customer message the agent answers from your knowledge counts as one resolution credit."],
  ["How does checkout work?", "Create an account, then complete checkout for the plan you chose. Use the same email at checkout so the payment is matched to your workspace."],
  ["When does a plan activate?", "After payment is confirmed by a verified payment notification or by our team. A browser redirect alone never activates a plan."],
  ["What happens if a plan ends?", "Your workspace and data remain available on the free trial limits."],
];

export default function Pricing() {
  return (
    <Shell>
      <PageHero eyebrow="Pricing" title="Priced by resolutions, so cost tracks the value delivered" body="Start with a free workspace. Move to a paid plan when the AI is resolving production conversations." />
      <section className="py-24"><div className="container-x">
        <div className="grid gap-5 lg:grid-cols-4">
          <div className="card flex flex-col p-8"><p className="text-lg font-medium">{FREE_PLAN.name}</p><p className="mt-6 text-5xl font-medium tracking-tightest">$0</p><p className="mt-2 text-sm text-ink/70">Validate the AI on your own content.</p>
            <ul className="mt-8 flex-1 space-y-3 text-sm">{[`${FREE_PLAN.credits} AI resolutions`, `${FREE_PLAN.sources} knowledge sources`, "Chat playground"].map((f) => <li key={f} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-brand-500" />{f}</li>)}</ul>
            <Link href="/signup" className="btn-ghost mt-8">Sign up</Link></div>
          {plans.map((p) => (
            <div key={p.id} className={`card relative flex flex-col p-8 ${p.popular ? "ring-2 ring-brand-400" : ""}`}>
              {p.popular && <span className="absolute -top-3 left-8 rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-white">Most popular</span>}
              <p className="text-lg font-medium">{p.name}</p><p className="mt-6 text-5xl font-medium tracking-tightest">${p.price}<span className="text-base text-ink/50">/mo</span></p><p className="mt-2 text-sm text-ink/70">{p.blurb}</p>
              <ul className="mt-8 flex-1 space-y-3 text-sm">{p.features.map((f) => <li key={f} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-brand-500" />{f}</li>)}</ul>
              <Link href={`/signup?plan=${p.id}`} className="btn-dark mt-8">Sign up</Link>
            </div>
          ))}
        </div>
      </div></section>
      <section className="bg-soft py-24"><div className="container-x max-w-[800px]"><h2 className="h-section">Questions</h2>
        <div className="mt-10 divide-y divide-black/10">{faqs.map(([q, a]) => <details key={q} className="group py-5"><summary className="cursor-pointer text-lg font-medium">{q}</summary><p className="mt-3 text-ink/70">{a}</p></details>)}</div>
      </div></section>
    </Shell>
  );
}
