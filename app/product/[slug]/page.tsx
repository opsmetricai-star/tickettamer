import { notFound } from "next/navigation";
import Link from "next/link";
import { Shell, PageHero, Demo } from "@/components/Page";
import { Reveal } from "@/components/Reveal";
import { products } from "@/lib/content";

export function generateStaticParams() { return products.map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const p = products.find((x) => x.slug === slug);
  return { title: p ? `${p.name} | TicketTamer` : "TicketTamer" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug); if (!p) notFound();
  const others = products.filter((x) => x.slug !== p.slug && x.slug !== "overview").slice(0, 3);
  return (
    <Shell>
      <PageHero eyebrow={p.group === "Duet" ? "Duet" : p.group} title={p.tagline} body={p.hero} actions={<><Demo /><Link href="/pricing" className="btn-ghost">See pricing</Link></>} />
      <section className="py-24"><div className="container-x grid gap-5 md:grid-cols-2">
        {p.features.map((f, i) => (
          <Reveal key={f.title} delay={i * 80}><div className="card h-full p-8"><span className="font-mono text-xs text-brand-500">0{i + 1}</span><h3 className="mt-10 text-2xl font-medium tracking-tight">{f.title}</h3><p className="mt-3 text-ink/65">{f.body}</p></div></Reveal>
        ))}
      </div></section>
      <section className="bg-ink py-24 text-white"><div className="container-x grid gap-12 lg:grid-cols-2">
        <Reveal><p className="text-sm text-white/50">{p.name} in numbers</p><p className="mt-4 text-[clamp(4rem,10vw,8rem)] font-medium leading-none tracking-tightest">{p.stat.value}</p><p className="mt-2 text-lg text-white/60">{p.stat.label}</p><p className="mt-6 text-xs text-white/35">Modeled target, not a guarantee.</p></Reveal>
        <Reveal delay={100}><h2 className="h-section">How it works</h2><ol className="mt-8 space-y-4">{p.steps.map((s, i) => <li key={s} className="flex gap-4 border-t border-white/10 pt-4"><span className="font-mono text-sm text-mint">0{i + 1}</span><span className="text-lg">{s}</span></li>)}</ol></Reveal>
      </div></section>
      <section className="bg-soft py-24"><div className="container-x"><h2 className="h-section">Explore more</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">{others.map((o) => <Link key={o.slug} href={`/product/${o.slug}`} className="card p-6 transition hover:-translate-y-1"><p className="text-xs text-black/50">{o.group}</p><p className="mt-6 text-2xl font-medium tracking-tight">{o.name}</p><p className="mt-1 text-sm text-ink/60">{o.tagline}</p></Link>)}</div>
      </div></section>
    </Shell>
  );
}
