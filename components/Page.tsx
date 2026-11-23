import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BottomCTA } from "./Sections";

export function Shell({ children, cta = true }: { children: React.ReactNode; cta?: boolean }) {
  return <main><Header variant="plain" />{children}{cta && <BottomCTA />}<Footer /></main>;
}

export function PageHero({ eyebrow, title, body, actions }: { eyebrow?: string; title: string; body?: string; actions?: React.ReactNode }) {
  return (
    <section className="p-2 md:p-3">
      <div className="hero-bg relative overflow-hidden rounded-[28px] md:rounded-[36px]">
        <div className="container-x py-20 md:py-28">
          {eyebrow && <p className="eyebrow fade-up">{eyebrow}</p>}
          <h1 className="h-display mt-3 max-w-[900px] fade-up">{title}</h1>
          {body && <p className="mt-6 max-w-[620px] text-lg text-ink/65 fade-up">{body}</p>}
          {actions && <div className="mt-8 flex flex-wrap gap-3 fade-up">{actions}</div>}
        </div>
        <div className="hero-floor absolute inset-x-0 bottom-0 h-16" />
      </div>
    </section>
  );
}

export const Demo = () => <Link href="/get-a-demo" className="btn-dark">Get a demo <ArrowRight size={16} /></Link>;
