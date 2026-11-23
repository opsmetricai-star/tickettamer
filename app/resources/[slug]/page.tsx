import { notFound } from "next/navigation";
import { Shell, PageHero } from "@/components/Page";
import { resources } from "@/lib/content";

export function generateStaticParams() { return resources.map((p) => ({ slug: p.slug })); }

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = resources.find((x) => x.slug === slug); if (!r) notFound();
  return (
    <Shell>
      <PageHero eyebrow={`${r.type} · ${r.date}`} title={r.title} />
      <article className="container-x max-w-[760px] space-y-6 py-20 text-lg leading-relaxed text-ink/75">
        <p>Support teams are adopting AI agents faster than their processes can keep up. The teams that succeed treat the agent like a new hire: they give it clear procedures, real knowledge and honest feedback.</p>
        <h2 className="pt-4 text-3xl font-medium tracking-tight text-ink">Start from your own history</h2>
        <p>Resolved tickets contain how your company actually solves problems. Import them, cluster them by topic and let the agent cite the closest precedent when it answers.</p>
        <h2 className="pt-4 text-3xl font-medium tracking-tight text-ink">Measure before you widen</h2>
        <p>Track resolution, escalation and satisfaction per topic. Expand automation only where the numbers hold up under simulation and in live traffic.</p>
      </article>
    </Shell>
  );
}
