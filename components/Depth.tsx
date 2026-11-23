import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import { Reveal } from "./Reveal";
import { products } from "@/lib/content";
import type { Line } from "@/lib/depth";

export function Conversation({ title, lines }: { title: string; lines: Line[] }) {
  return (
    <div className="card overflow-hidden">
      <div className="flex items-center gap-2 border-b border-black/5 px-5 py-3 text-xs font-medium text-black/50"><span className="h-2.5 w-2.5 rounded-full bg-red-300" /><span className="h-2.5 w-2.5 rounded-full bg-amber-300" /><span className="h-2.5 w-2.5 rounded-full bg-green-300" /><span className="ml-3">{title}</span></div>
      <div className="space-y-3 p-5">
        {lines.map(([who, text], i) => who === "System"
          ? <p key={i} className="rounded-lg bg-brand-50 px-3 py-2 font-mono text-xs text-brand-600">{text}</p>
          : <div key={i} className={who === "Customer" ? "flex justify-end" : "flex"}><p className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${who === "Customer" ? "bg-ink text-white" : "bg-soft"}`}>{text}</p></div>)}
      </div>
    </div>
  );
}

export function BeforeAfter({ before, after }: { before: string[]; after: string[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <Reveal><div className="card h-full p-8"><p className="text-sm font-medium text-black/50">Without it</p><ul className="mt-6 space-y-4">{before.map((b) => <li key={b} className="flex gap-3"><X size={18} className="mt-1 shrink-0 text-red-400" />{b}</li>)}</ul></div></Reveal>
      <Reveal delay={100}><div className="card h-full bg-brand-50/60 p-8"><p className="text-sm font-medium text-brand-600">With TicketTamer</p><ul className="mt-6 space-y-4">{after.map((b) => <li key={b} className="flex gap-3"><Check size={18} className="mt-1 shrink-0 text-brand-500" />{b}</li>)}</ul></div></Reveal>
    </div>
  );
}

export function Faq({ items }: { items: [string, string][] }) {
  return <div className="divide-y divide-black/10">{items.map(([q, a]) => <details key={q} className="py-5"><summary className="cursor-pointer text-lg font-medium">{q}</summary><p className="mt-3 max-w-[680px] text-ink/65">{a}</p></details>)}</div>;
}

export function Related({ slugs, heading = "Explore related products" }: { slugs: string[]; heading?: string }) {
  const items = slugs.map((s) => products.find((p) => p.slug === s)).filter(Boolean) as typeof products;
  return (
    <div><h2 className="h-section">{heading}</h2>
      <div className="mt-10 grid gap-5 md:grid-cols-3">{items.map((o) => <Link key={o.slug} href={`/product/${o.slug}`} className="card group p-6 transition hover:-translate-y-1"><p className="text-xs text-black/50">{o.group}</p><p className="mt-10 text-2xl font-medium tracking-tight">{o.name}</p><p className="mt-1 text-sm text-ink/60">{o.tagline}</p><ArrowRight size={18} className="mt-5 transition group-hover:translate-x-1" aria-hidden /></Link>)}</div>
    </div>
  );
}
