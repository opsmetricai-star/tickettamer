import { Shell, PageHero } from "@/components/Page";

export default function Privacy() {
  return (
    <Shell cta={false}>
      <PageHero title="Privacy policy" body="Template text. Have it reviewed by counsel before launch." />
      <article className="container-x max-w-[760px] space-y-5 py-16 text-ink/75">
        <p>We collect the account details you provide, the knowledge and tickets you upload, and usage data needed to run and bill the service.</p>
        <p>Content you upload is processed by our AI provider to generate answers for you. We do not sell your data.</p>
        <p>You can request export or deletion of your workspace data at any time through the contact page.</p>
      </article>
    </Shell>
  );
}
