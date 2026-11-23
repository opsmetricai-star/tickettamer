import Link from "next/link";
import { Shell, PageHero } from "@/components/Page";
import { caseStudies } from "@/lib/content";

export default function CaseStudies() {
  return (
    <Shell>
      <PageHero eyebrow="Customers" title="Customer stories" body="Illustrative scenarios showing how teams in different industries use TicketTamer. Brand names are fictional." />
      <section className="py-24"><div className="container-x grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map((c) => <Link key={c.slug} href={`/case-studies/${c.slug}`} className="card group p-8 transition hover:-translate-y-1"><p className="text-xs font-medium text-black/50">{c.industry}</p><p className="mt-14 text-6xl font-medium tracking-tightest">{c.metric}</p><p className="text-sm text-ink/60">{c.label}</p><p className="mt-6 text-xl font-medium">{c.brand}</p><p className="mt-1 text-sm text-ink/60">{c.summary}</p></Link>)}
      </div></section>
    </Shell>
  );
}
