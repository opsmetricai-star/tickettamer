import { Shell, PageHero } from "@/components/Page";

export default function Security() {
  const s = [["Tenant isolation", "Every record is protected by Postgres row-level security tied to the authenticated account."], ["Server-side secrets", "AI and payment credentials never reach the browser."], ["Verified access", "Application routes require an authenticated session."], ["Grounded AI", "Responses draw only on the sources in your workspace and escalate to a person when no source supports an answer."]];
  return (
    <Shell>
      <PageHero eyebrow="Company" title="Security" body="How TicketTamer protects business data and customer conversations." />
      <section className="py-24"><div className="container-x grid gap-5 md:grid-cols-2">{s.map(([t, b]) => <div key={t} className="card p-8"><h3 className="text-2xl font-medium tracking-tight">{t}</h3><p className="mt-3 text-ink/70">{b}</p></div>)}</div></section>
    </Shell>
  );
}
