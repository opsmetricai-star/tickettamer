import { notFound } from "next/navigation";
import { Shell, PageHero, Demo } from "@/components/Page";
import { caseStudies } from "@/lib/content";

export function generateStaticParams() { return caseStudies.map((p) => ({ slug: p.slug })); }

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = caseStudies.find((x) => x.slug === slug); if (!c) notFound();
  return (
    <Shell>
      <PageHero eyebrow={`${c.industry} · Illustrative scenario`} title={c.brand} body={c.summary} actions={<Demo />} />
      <section className="py-24"><div className="container-x grid gap-12 lg:grid-cols-[1fr_2fr]">
        <div><p className="text-7xl font-medium tracking-tightest">{c.metric}</p><p className="text-ink/60">{c.label}</p></div>
        <div className="space-y-8 text-lg text-ink/75">
          {[["The challenge", "Ticket volume grew faster than the team. Repetitive questions crowded out the cases that needed people."], ["The approach", "Knowledge articles and resolved tickets were imported, procedures were written as AOPs and every change was simulated before release."], ["The outcome", `The scenario models ${c.metric} ${c.label}, with humans focused on complex cases. This is a fictional example for illustration.`]].map(([h, b]) => <div key={h}><h3 className="text-2xl font-medium tracking-tight text-ink">{h}</h3><p className="mt-2">{b}</p></div>)}
        </div>
      </div></section>
    </Shell>
  );
}
