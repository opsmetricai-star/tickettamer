import Link from "next/link";
import { Shell, PageHero } from "@/components/Page";
import { resources } from "@/lib/content";

export default function Resources() {
  return (
    <Shell>
      <PageHero eyebrow="Resources" title="Resource hub" body="Research, guides and walkthroughs for support teams adopting AI." />
      <section className="py-24"><div className="container-x grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((r, i) => <Link key={r.slug} href={`/resources/${r.slug}`} className="card overflow-hidden transition hover:-translate-y-1"><div className="aspect-[16/10]" style={{ background: `linear-gradient(135deg, hsl(${215 + i * 22} 75% 78%), hsl(${280 + i * 14} 70% 85%))` }} /><div className="p-6"><p className="text-xs text-black/50">{r.type} · {r.date}</p><p className="mt-2 text-xl font-medium leading-snug tracking-tight">{r.title}</p></div></Link>)}
      </div></section>
    </Shell>
  );
}
