import { notFound } from "next/navigation";
import Link from "next/link";
import { Shell, PageHero, Demo } from "@/components/Page";
import { Reveal } from "@/components/Reveal";
import { Conversation, BeforeAfter, Faq, Related } from "@/components/Depth";
import { products } from "@/lib/content";
import { productDepth } from "@/lib/depth";

export function generateStaticParams() { return products.map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const p = products.find((x) => x.slug === slug);
  return { title: p ? `${p.name} | TicketTamer` : "TicketTamer" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug); if (!p) notFound();
  const d = productDepth[p.slug];
  return (
    <Shell>
      <PageHero eyebrow={p.group} title={p.tagline} body={p.hero} actions={<Demo />} />

      {/* Example conversation + capabilities */}
      <section className="py-24"><div className="container-x grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <Reveal><p className="eyebrow">See it in action</p><h2 className="h-section mt-4">{d.example.title}</h2><p className="mt-6 text-lg text-ink/65">A representative exchange showing what {p.name} does behind the scenes: it reads context, checks the rules, acts and explains.</p></Reveal>
        <Reveal delay={100}><Conversation title={d.example.title} lines={d.example.lines} /></Reveal>
      </div></section>

      <section className="bg-soft py-24"><div className="container-x">
        <Reveal><p className="eyebrow">Capabilities</p><h2 className="h-section mt-4 max-w-[720px]">Everything {p.name} does, and how</h2></Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {p.features.map((f, i) => (
            <Reveal key={f.title} delay={i * 80}><div className="card h-full p-8"><span className="font-mono text-xs text-brand-500">0{i + 1}</span><h3 className="mt-10 text-2xl font-medium tracking-tight">{f.title}</h3><p className="mt-3 text-ink/65">{f.body}</p></div></Reveal>
          ))}
        </div>
      </div></section>

      <section className="py-24"><div className="container-x">
        <Reveal><p className="eyebrow">The difference</p><h2 className="h-section mt-4 mb-12 max-w-[720px]">Before and after</h2></Reveal>
        <BeforeAfter before={d.before} after={d.after} />
      </div></section>

      <section className="bg-ink py-24 text-white"><div className="container-x grid gap-12 lg:grid-cols-2">
        <Reveal><p className="text-sm text-white/50">{p.name} in numbers</p><p className="mt-4 text-[clamp(4rem,10vw,8rem)] font-medium leading-none tracking-tightest">{p.stat.value}</p><p className="mt-2 text-lg text-white/60">{p.stat.label}</p><p className="mt-6 text-xs text-white/35">Modeled target, not a guarantee.</p></Reveal>
        <Reveal delay={100}><h2 className="h-section">How it works</h2><ol className="mt-8 space-y-4">{p.steps.map((s, i) => <li key={s} className="flex gap-4 border-t border-white/10 pt-4"><span className="font-mono text-sm text-mint">0{i + 1}</span><span className="text-lg">{s}</span></li>)}</ol></Reveal>
      </div></section>

      <section className="py-24"><div className="container-x">
        <Reveal><p className="eyebrow">Use cases</p><h2 className="h-section mt-4">Where teams start</h2></Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">{d.useCases.map((u, i) => <Reveal key={u.title} delay={i * 80}><div className="card h-full p-8"><h3 className="text-xl font-medium tracking-tight">{u.title}</h3><p className="mt-3 text-ink/65">{u.body}</p></div></Reveal>)}</div>
      </div></section>

      <section className="bg-soft py-24"><div className="container-x grid gap-12 lg:grid-cols-[1fr_1.5fr]">
        <div><p className="eyebrow">FAQ</p><h2 className="h-section mt-4">Common questions</h2></div>
        <Faq items={d.faq} />
      </div></section>

      <section className="py-24"><div className="container-x"><Related slugs={d.related} /></div></section>
    </Shell>
  );
}
