import { Shell, PageHero } from "@/components/Page";

export default function Partnerships() {
  const p = [["Technology partners", "Platforms that expose actions and data so the AI can resolve issues inside their systems."], ["Implementation partners", "Consultancies that design procedures, test suites and phased rollouts for enterprise support teams."], ["Channel partners", "Organizations that bring TicketTamer to the operations leaders they already advise."]];
  return (
    <Shell>
      <PageHero eyebrow="Company" title="Partnerships" body="We work with platforms and advisors who help enterprise support organizations deploy AI with confidence." />
      <section className="py-24"><div className="container-x grid gap-5 md:grid-cols-3">{p.map(([t, b]) => <div key={t} className="card p-8"><h3 className="text-2xl font-medium tracking-tight">{t}</h3><p className="mt-3 text-ink/70">{b}</p></div>)}</div></section>
    </Shell>
  );
}
