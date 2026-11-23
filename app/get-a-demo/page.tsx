import { Shell, PageHero } from "@/components/Page";
import { DemoForm } from "./form";

export default async function GetDemo({ searchParams }: { searchParams: Promise<{ email?: string; topic?: string }> }) {
  const sp = await searchParams;
  return (
    <Shell cta={false}>
      <PageHero eyebrow="Contact" title="See TicketTamer in action" body="Tell us about your support team and we will set up a walkthrough with your own use cases." />
      <section className="py-20"><div className="container-x max-w-[640px]"><DemoForm email={sp.email} topic={sp.topic} /></div></section>
    </Shell>
  );
}
