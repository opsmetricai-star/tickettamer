import { Shell, PageHero } from "@/components/Page";
import { glossary } from "@/lib/content";

export default function Glossary() {
  return (
    <Shell>
      <PageHero eyebrow="Resources" title="Glossary" body="Plain-language definitions for AI customer support." />
      <section className="py-20"><dl className="container-x max-w-[800px] divide-y divide-black/10">{glossary.map(([t, d]) => <div key={t} className="py-6"><dt className="text-2xl font-medium tracking-tight">{t}</dt><dd className="mt-2 text-ink/65">{d}</dd></div>)}</dl></section>
    </Shell>
  );
}
