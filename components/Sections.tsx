import Link from "next/link";
import { ArrowRight, AudioLines, MessageSquare, Mail, ArrowDown } from "lucide-react";
import { Header } from "./Header";
import { HeroArt } from "./HeroArt";
import { Reveal } from "./Reveal";
import { caseStudies, resources } from "@/lib/content";

export function Hero() {
  return (
    <section className="p-2 md:p-3">
      <div className="hero-bg relative overflow-hidden rounded-[28px] md:rounded-[36px]">
        <Header />
        <div className="container-x relative grid min-h-[560px] grid-cols-1 items-center pb-24 pt-8 md:min-h-[640px] lg:grid-cols-[1.2fr_1fr]">
          <div className="relative z-10 min-w-0 fade-up">
            <h1 className="h-display max-w-[760px]">The AI engine that resolves customer conversations at scale</h1>
            <p className="mt-6 max-w-[560px] text-lg text-ink/70">TicketTamer analyzes every ticket, predicts intent, decides the next action and automates the resolution across chat, voice and email. Lower cost per contact. Faster response. Fewer escalations.</p>
            <form action="/signup" className="mt-9 flex max-w-[530px] items-center rounded-full bg-white/45 p-2 backdrop-blur">
              <input name="email" type="email" required aria-label="Work email" placeholder="Work email" className="w-0 min-w-0 flex-1 bg-transparent px-4 text-base outline-none placeholder:text-ink/45 md:px-5" />
              <button className="btn-dark shrink-0 !px-5 !py-3 md:!px-6 md:!py-3.5">Sign up</button>
            </form>
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[52%] items-end lg:flex"><div className="h-[520px] w-full translate-y-6"><HeroArt /></div></div>
        </div>
        <div className="hero-floor absolute inset-x-0 bottom-0 h-24" />
        <a href="#coverage" aria-label="Scroll to next section" className="absolute bottom-0 left-1/2 grid h-14 w-14 -translate-x-1/2 translate-y-1/2 place-items-center rounded-full bg-white shadow-card"><ArrowDown size={20} /></a>
      </div>
    </section>
  );
}

const systems = ["Chat", "Voice", "Email", "Help desks", "Order management", "Billing", "CRM", "Knowledge bases", "Identity checks", "Analytics"];
export function Logos() {
  return (
    <section id="coverage" className="pb-20 pt-28">
      <div className="container-x text-center">
        <p className="mx-auto max-w-[700px] text-xl font-medium tracking-tight md:text-2xl">One decision engine, connected to every channel and system your support operation runs on.</p>
      </div>
      <div className="relative mt-12 overflow-hidden">
        <div className="marquee flex w-max gap-16 pr-16">
          {[...systems, ...systems].map((b, i) => <span key={i} className="whitespace-nowrap text-2xl font-semibold tracking-tight text-black/30">{b}</span>)}
        </div>
      </div>
    </section>
  );
}

export function Difference() {
  return (
    <section className="bg-soft py-24 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <p className="eyebrow">The TicketTamer difference</p>
          <h2 className="h-section mt-4">Replace brittle decision trees with AI that executes written policy.</h2>
          <p className="mt-6 max-w-[540px] text-lg text-ink/70">Configuration languages slow iteration, inflate cost and consume engineering time. Agent Operating Procedures let operators define workflows in plain language, and the AI carries them out. Policy changes ship in hours, not sprints.</p>
          <Link href="/signup" className="btn-dark mt-8">Sign up <ArrowRight size={16} /></Link>
        </Reveal>
        <Reveal delay={120}>
          <div className="card overflow-hidden p-0">
            <div className="flex items-center gap-2 border-b border-black/5 px-5 py-3 text-xs font-medium text-black/50"><span className="h-2.5 w-2.5 rounded-full bg-red-300" /><span className="h-2.5 w-2.5 rounded-full bg-amber-300" /><span className="h-2.5 w-2.5 rounded-full bg-green-300" /><span className="ml-3">refund-request.aop</span></div>
            <pre className="whitespace-pre-wrap p-6 font-mono text-[13px] leading-relaxed text-ink/80">{`When a customer requests a refund:
1. Look up the order and confirm ownership.
2. If the order is under 30 days old and under $100,
   issue the refund and state the 3-5 day timeline.
3. If it is older or larger, capture the reason and
   escalate to billing with a summary.
Never promise a refund before the lookup succeeds.`}</pre>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Platform() {
  const items = [
    ["01", "Build", "Define policy in natural language. The AI decides, acts and explains every step, so teams reach production faster and audit every outcome.", "/product/aop"],
    ["02", "Optimize", "Simulate hundreds of customers before each release and test variants on live traffic. Quality is measured, not assumed.", "/product/testing-qa"],
    ["03", "Scale", "Analyze every conversation for demand, sentiment and cost. The AI surfaces the next improvement before the metric moves.", "/product/insights-and-reporting"],
  ];
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <Reveal><p className="eyebrow text-center">One platform from first deployment to full scale</p></Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {items.map(([n, t, b, h], i) => (
            <Reveal key={n} delay={i * 100}>
              <Link href={h} aria-label={t} className="card group flex h-full min-h-[320px] flex-col p-8 transition hover:-translate-y-1">
                <span className="text-sm font-medium text-brand-500">{n}</span>
                <h3 className="mt-auto text-3xl font-medium tracking-tight">{t}</h3>
                <p className="mt-3 text-ink/70">{b}</p>
                <ArrowRight size={18} className="mt-6 transition group-hover:translate-x-1" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Timeline() {
  const steps = [["Import", "Index articles and resolved tickets."], ["Define", "Write procedures in plain language."], ["Test", "Simulate hundreds of customers."], ["Launch", "Deploy to chat, voice and email."], ["Improve", "Let insight drive each release."]];
  return (
    <section className="bg-ink py-24 text-white md:py-32">
      <div className="container-x">
        <Reveal>
          <h2 className="h-section max-w-[800px]">Your business changes weekly.<br /><span className="text-white/45">Your AI should keep pace.</span></h2>
          <p className="mt-6 max-w-[600px] text-lg text-white/65">Policy updates should not wait on an engineering sprint or a vendor ticket. TicketTamer shortens the cycle from insight to improvement across the full agent lifecycle, so resolution rates rise as your business evolves.</p>
          <Link href="/signup" className="btn-light mt-8">Sign up <ArrowRight size={16} /></Link>
        </Reveal>
        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-white/10 md:grid-cols-5">
          {steps.map(([t, b], i) => (
            <Reveal key={t} delay={i * 80} className="bg-ink p-6">
              <span className="font-mono text-xs text-mint">0{i + 1}</span>
              <p className="mt-10 text-xl font-medium">{t}</p><p className="mt-2 text-sm text-white/60">{b}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Channels() {
  const c = [
    [AudioLines, "Voice", "Voice agents that handle natural dialog, act on live systems and match your brand, around the clock.", "/product/voice"],
    [MessageSquare, "Chat", "Chat that verifies identity, executes multi-step workflows and closes the ticket in one thread.", "/product/chat"],
    [Mail, "Email", "Email agents that read the full thread, check the account and send a complete resolution.", "/product/email"],
  ] as const;
  return (
    <section className="bg-soft py-24 md:py-32">
      <div className="container-x">
        <Reveal className="mx-auto max-w-[760px] text-center">
          <p className="eyebrow">Omnichannel by design</p>
          <h2 className="h-section mt-4">Build once.<br />Resolve everywhere.</h2>
          <p className="mt-6 text-lg text-ink/70">Chat, voice and email run on a single intelligence layer with one policy set and one customer history, so quality and cost stay consistent on every channel.</p>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {c.map(([Icon, t, b, h], i) => (
            <Reveal key={t} delay={i * 100}>
              <Link href={h} aria-label={t} className="card group flex h-full flex-col p-8 transition hover:-translate-y-1">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600"><Icon size={22} /></span>
                <h3 className="mt-16 text-2xl font-medium tracking-tight">{t}</h3>
                <p className="mt-3 flex-1 text-ink/70">{b}</p>
                <ArrowRight size={18} className="mt-6 transition group-hover:translate-x-1" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Outcomes() {
  const m = [["70%", "chat and voice resolution"], ["95%", "cost reduction on routine contacts"], ["$1M", "revenue from AI-handled conversations"], ["3x", "increase in CSAT"], ["80%", "deflection rate"], ["65%", "reduction in support cost"], ["50%+", "resolution on voice"], ["32%", "increase in deflection"]];
  return (
    <section className="py-24 md:py-32" id="outcomes">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">Outcomes</p><h2 className="h-section mt-4 max-w-[760px]">Measurable return on the metrics operators are held to.</h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-black/10 md:grid-cols-4">
          {m.map(([v, l], i) => (
            <Reveal key={l} delay={i * 50} className="bg-white p-6 md:p-8"><p className="text-5xl font-medium tracking-tightest md:text-6xl">{v}</p><p className="mt-3 text-sm text-ink/70">{l}</p></Reveal>
          ))}
        </div>
        <p className="mt-4 text-xs text-black/50">Figures are modeled targets, not guaranteed results.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {caseStudies.slice(0, 3).map((c) => (
            <Link key={c.slug} href={`/case-studies/${c.slug}`} className="card group p-6 transition hover:-translate-y-1">
              <p className="text-xs font-medium text-black/50">{c.industry}</p><p className="mt-8 text-4xl font-medium tracking-tight">{c.metric}</p>
              <p className="text-sm text-ink/70">{c.label}</p><p className="mt-4 font-semibold">{c.brand}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ResourceHub() {
  return (
    <section className="pb-24 md:pb-32">
      <div className="container-x">
        <Reveal>
          <h2 className="h-section">Research for support and operations leaders</h2><p className="mt-4 max-w-[640px] text-lg text-ink/70">Playbooks, benchmarks and analysis on automating customer operations with AI.</p>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {resources.slice(0, 3).map((r, i) => (
            <Reveal key={r.slug} delay={i * 100}>
              <Link href={`/resources/${r.slug}`} className="card group block overflow-hidden transition hover:-translate-y-1">
                <div className="aspect-[16/10]" style={{ background: `linear-gradient(135deg, hsl(${225 + i * 30} 75% 78%), hsl(${290 + i * 20} 70% 84%))` }} />
                <div className="p-6"><p className="text-xs font-medium text-black/50">{r.type} · {r.date}</p><p className="mt-2 text-xl font-medium leading-snug tracking-tight">{r.title}</p></div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BottomCTA() {
  return (
    <section className="p-2 md:p-3">
      <div className="relative overflow-hidden rounded-[28px] bg-ink px-6 py-24 text-center text-white md:rounded-[36px] md:py-32">
        <div className="pointer-events-none absolute inset-0 opacity-60" style={{ background: "radial-gradient(60% 80% at 50% 120%, #5f6fe0 0%, transparent 70%)" }} />
        <h2 className="h-section relative mx-auto max-w-[760px]">Put an AI engine behind every customer conversation.</h2>
        <div className="relative mt-10 flex justify-center gap-3"><Link href="/signup" className="btn-light">Sign up</Link><Link href="/signin" className="btn-ghost !border-white/40 !text-white hover:!bg-white hover:!text-ink">Sign in</Link></div>
      </div>
    </section>
  );
}
