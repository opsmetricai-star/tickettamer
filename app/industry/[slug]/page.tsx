import { notFound } from "next/navigation";
import Link from "next/link";
import { Shell, PageHero, Demo } from "@/components/Page";
import { Reveal } from "@/components/Reveal";
import { Conversation, Faq, Related } from "@/components/Depth";
import { industries, caseStudies } from "@/lib/content";
import { industryDepth } from "@/lib/depth";

export function generateStaticParams() { return industries.map((p) => ({ slug: p.slug })); }

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = industries.find((x) => x.slug === slug); if (!i) notFound();
  const d = industryDepth[i.slug];
  const cs = caseStudies.filter((c) => c.industry === i.name);
  return (
    <Shell>
      <PageHero eyebrow="Industries" title={i.name} body={`${i.tagline}. ${i.body}`} actions={<Demo />} />

      <section className="py-24"><div className="container-x">
        <Reveal><p className="eyebrow">The challenge</p><h2 className="h-section mt-4 max-w-[720px]">What makes {i.name.toLowerCase()} support hard</h2></Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">{d.challenges.map((c, n) => <Reveal key={c.title} delay={n * 80}><div className="card h-full p-8"><span className="font-mono text-xs text-brand-500">0{n + 1}</span><h3 className="mt-10 text-2xl font-medium tracking-tight">{c.title}</h3><p className="mt-3 text-ink/65">{c.body}</p></div></Reveal>)}</div>
      </div></section>

      <section className="bg-soft py-24"><div className="container-x grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <Reveal><p className="eyebrow">In practice</p><h2 className="h-section mt-4">How a typical conversation flows</h2>
          <ol className="mt-8 space-y-4">{d.steps.map((s, n) => <li key={s} className="flex gap-4 border-t border-black/10 pt-4"><span className="font-mono text-sm text-brand-500">0{n + 1}</span><span className="text-lg">{s}</span></li>)}</ol></Reveal>
        <Reveal delay={100}><Conversation title={d.example.title} lines={d.example.lines} /></Reveal>
      </div></section>

      <section className="py-24"><div className="container-x">
        <Reveal><p className="eyebrow">Use cases</p><h2 className="h-section mt-4">Start with the highest-volume work</h2></Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">{i.points.map((p, n) => <Reveal key={p} delay={n * 80}><div className="card h-full p-8"><span className="font-mono text-xs text-brand-500">0{n + 1}</span><h3 className="mt-12 text-2xl font-medium tracking-tight">{p}</h3><p className="mt-3 text-ink/65">Write the procedure in plain language, connect the systems it needs, test it against past conversations and measure resolution from day one.</p></div></Reveal>)}</div>
      </div></section>

      <section className="bg-ink py-24 text-white"><div className="container-x grid gap-12 lg:grid-cols-2">
        <Reveal><p className="eyebrow !opacity-60">Built for the details</p><h2 className="h-section mt-4">Considerations we design around</h2></Reveal>
        <Reveal delay={100}><ul className="space-y-4">{d.considerations.map((c, n) => <li key={c} className="flex gap-4 border-t border-white/10 pt-4"><span className="font-mono text-sm text-mint">0{n + 1}</span><span className="text-lg">{c}</span></li>)}</ul></Reveal>
      </div></section>

      <section className="py-24"><div className="container-x"><Related slugs={d.products} heading="Products teams in this industry use" /></div></section>

      {cs.length > 0 && <section className="bg-soft py-20"><div className="container-x"><h2 className="h-section">Representative scenario</h2><div className="mt-8 grid gap-5 md:grid-cols-3">{cs.map((c) => <Link key={c.slug} href={`/case-studies/${c.slug}`} className="card p-6"><p className="text-4xl font-medium">{c.metric}</p><p className="text-sm text-ink/60">{c.label}</p><p className="mt-4 font-semibold">{c.brand}</p><p className="mt-1 text-sm text-ink/60">{c.summary}</p></Link>)}</div></div></section>}

      <section className="py-24"><div className="container-x grid gap-12 lg:grid-cols-[1fr_1.5fr]"><div><p className="eyebrow">FAQ</p><h2 className="h-section mt-4">Common questions</h2></div><Faq items={d.faq} /></div></section>
    </Shell>
  );
}
