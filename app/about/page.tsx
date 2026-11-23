import { Shell, PageHero, Demo } from "@/components/Page";

export default function About() {
  const v = [["Customers first", "Every design choice starts with what a customer experiences at the other end of the conversation."], ["Transparent by default", "You can read exactly what the agent is told to do and why it answered the way it did."], ["Measured, not magical", "We ship tools to test, experiment and monitor, so quality is something you can prove."], ["Humans in the loop", "Agents take the repetitive work so people can do the work that needs judgment."]];
  return (
    <Shell>
      <PageHero eyebrow="Company" title="We build support agents that actually learn" body="TicketTamer exists to help teams turn their knowledge and past tickets into reliable, on-brand AI support." actions={<Demo />} />
      <section className="py-24"><div className="container-x grid gap-5 md:grid-cols-2">{v.map(([t, b]) => <div key={t} className="card p-8"><h3 className="text-2xl font-medium tracking-tight">{t}</h3><p className="mt-3 text-ink/65">{b}</p></div>)}</div></section>
    </Shell>
  );
}
