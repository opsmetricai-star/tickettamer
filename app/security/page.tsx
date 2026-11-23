import { Shell, PageHero } from "@/components/Page";

export default function Security() {
  const s = [["Tenant isolation", "Every record is protected by Postgres row-level security tied to the signed-in user."], ["Secrets stay server-side", "AI and payment credentials are never sent to the browser."], ["Scoped access", "Protected routes require a verified session."], ["Honest status", "We do not claim certifications we have not completed."]];
  return (
    <Shell>
      <PageHero eyebrow="Company" title="Security" body="How we protect your data and your customers' conversations." />
      <section className="py-24"><div className="container-x grid gap-5 md:grid-cols-2">{s.map(([t, b]) => <div key={t} className="card p-8"><h3 className="text-2xl font-medium tracking-tight">{t}</h3><p className="mt-3 text-ink/65">{b}</p></div>)}</div></section>
    </Shell>
  );
}
