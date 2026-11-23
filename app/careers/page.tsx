import { Shell, PageHero } from "@/components/Page";

export default function Careers() {
  return (
    <Shell cta={false}>
      <PageHero eyebrow="Company" title="Careers" body="We are not hiring for specific roles right now. Introduce yourself and we will be in touch when that changes." />
      <section className="container-x py-20"><a className="btn-dark" href="/get-a-demo?topic=careers">Introduce yourself</a></section>
    </Shell>
  );
}
