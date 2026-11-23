import { Shell, PageHero } from "@/components/Page";

const sections: [string, string][] = [
  ["Information we collect", "Account details you provide (name, work email, company), the knowledge sources and tickets you upload, and usage data required to operate, secure and bill the service."],
  ["How we use it", "To run the service, generate AI responses grounded in your content, enforce plan limits, provide support and improve reliability. We do not sell customer data."],
  ["AI processing", "Content you submit for resolution is sent to our AI provider solely to generate the response you requested. Retrieval is restricted to the sources in your own workspace."],
  ["Data isolation and security", "Workspace data is isolated per account with row-level security. Credentials for AI and payment services are held server-side."],
  ["Retention and deletion", "You can delete tickets and knowledge sources at any time in the app."],
  ["Changes", "We will update this page when our practices change."],
];

export default function Privacy() {
  return (
    <Shell cta={false}>
      <PageHero title="Privacy policy" body="How TicketTamer collects, uses and protects business data." />
      <article className="container-x max-w-[760px] space-y-8 py-16 text-ink/80">
        {sections.map(([h, b]) => <section key={h}><h2 className="text-2xl font-medium tracking-tight text-ink">{h}</h2><p className="mt-2">{b}</p></section>)}
      </article>
    </Shell>
  );
}
