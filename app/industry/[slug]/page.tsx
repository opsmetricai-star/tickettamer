import { notFound } from "next/navigation";
import Link from "next/link";
import { Shell, PageHero, Demo } from "@/components/Page";
import { Reveal } from "@/components/Reveal";
import { industries, caseStudies } from "@/lib/content";

export function generateStaticParams() { return industries.map((p) => ({ slug: p.slug })); }

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = industries.find((x) => x.slug === slug); if (!i) notFound();
  const cs = caseStudies.filter((c) => c.industry === i.name);
  return (
    <Shell>
      <PageHero eyebrow="Industries" title={i.name} body={`${i.tagline}. ${i.body}`} actions={<Demo />} />
      <section className="py-24"><div className="container-x grid gap-5 md:grid-cols-3">
        {i.points.map((p, n) => <Reveal key={p} delay={n * 80}><div className="card h-full p-8"><span className="font-mono text-xs text-brand-500">0{n + 1}</span><h3 className="mt-12 text-2xl font-medium tracking-tight">{p}</h3><p className="mt-3 text-ink/65">Automate it with an AOP, connect the systems it needs and measure resolution on every conversation.</p></div></Reveal>)}
      </div></section>
      {cs.length > 0 && <section className="bg-soft py-20"><div className="container-x"><h2 className="h-section">In practice</h2><div className="mt-8 grid gap-5 md:grid-cols-3">{cs.map((c) => <Link key={c.slug} href={`/case-studies/${c.slug}`} className="card p-6"><p className="text-4xl font-medium">{c.metric}</p><p className="text-sm text-ink/60">{c.label}</p><p className="mt-4 font-semibold">{c.brand}</p></Link>)}</div></div></section>}
    </Shell>
  );
}
