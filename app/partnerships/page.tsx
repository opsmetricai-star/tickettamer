import { Shell, PageHero } from "@/components/Page";

export default function Partnerships() {
  const p = [["Technology partners", "Connect your platform so our agents can act inside it."], ["Implementation partners", "Help customers design procedures, tests and rollouts."], ["Referral partners", "Introduce teams that need better support automation."]];
  return (
    <Shell>
      <PageHero eyebrow="Company" title="Partnerships" body="We work with platforms and consultancies that help support teams succeed." />
      <section className="py-24"><div className="container-x grid gap-5 md:grid-cols-3">{p.map(([t, b]) => <div key={t} className="card p-8"><h3 className="text-2xl font-medium tracking-tight">{t}</h3><p className="mt-3 text-ink/65">{b}</p></div>)}</div></section>
    </Shell>
  );
}
