import { Shell, PageHero, Demo } from "@/components/Page";

export default function About() {
  const v = [["Outcomes over activity", "We measure ourselves on resolution rate, cost per contact and time to resolution, the numbers operators answer for."], ["Transparent by design", "Every procedure is readable and every AI decision is traceable to a source, so leaders can audit what the system does."], ["Measured, not assumed", "Simulation, experiments and continuous monitoring turn quality into a number that can be proven and improved."], ["Humans where judgment matters", "The AI absorbs repetitive volume so specialists spend their time on the cases that need them."]];
  return (
    <Shell>
      <PageHero eyebrow="Company" title="We build the AI engine for customer operations" body="TicketTamer turns a company's knowledge and resolved tickets into an AI system that analyzes demand, decides the next action and automates resolution at enterprise scale." actions={<Demo />} />
      <section className="py-24"><div className="container-x grid gap-5 md:grid-cols-2">{v.map(([t, b]) => <div key={t} className="card p-8"><h3 className="text-2xl font-medium tracking-tight">{t}</h3><p className="mt-3 text-ink/70">{b}</p></div>)}</div></section>
    </Shell>
  );
}
