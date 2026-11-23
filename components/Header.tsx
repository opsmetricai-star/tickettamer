"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ChevronDown, Menu, X, AudioLines, MessageSquare, Mail, Sparkles, Cable, Compass, FlaskConical, ListChecks,
  LineChart, BarChart3, LayoutGrid, Landmark, Plane, HeartPulse, Code2, Store, Phone, CreditCard, ArrowRight, BookOpen,
} from "lucide-react";
import { Logo } from "./Logo";
import { products, industries } from "@/lib/content";

const pIcon: Record<string, React.ElementType> = {
  voice: AudioLines, chat: MessageSquare, email: Mail, aop: Sparkles, integrations: Cable, missions: Compass,
  experiments: FlaskConical, "testing-qa": ListChecks, "insights-and-reporting": LineChart, watchtower: BarChart3, suggestions: LayoutGrid,
};
const iIcon: Record<string, React.ElementType> = {
  "financial-services": Landmark, "travel-hospitality": Plane, healthcare: HeartPulse, technology: Code2, retail: Store,
  telecommunications: Phone, insurance: CreditCard,
};
const by = (g: string) => products.filter((p) => p.group === g);

function Item({ href, Icon, title, sub, onClick }: { href: string; Icon: React.ElementType; title: string; sub: string; onClick: () => void }) {
  return (
    <Link href={href} onClick={onClick} className="group flex items-start gap-3 rounded-xl p-2 transition hover:bg-black/[.04]">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600"><Icon size={18} /></span>
      <span><span className="block text-sm font-semibold leading-tight">{title}</span><span className="block text-xs text-black/55">{sub}</span></span>
    </Link>
  );
}

export function Header({ variant = "hero" }: { variant?: "hero" | "plain" }) {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const close = () => { setOpen(null); setMobile(false); };

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null); };
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("mousedown", h); document.addEventListener("keydown", k);
    return () => { document.removeEventListener("mousedown", h); document.removeEventListener("keydown", k); };
  }, []);

  const trig = (id: string, label: string) => (
    <button onClick={() => setOpen(open === id ? null : id)} onMouseEnter={() => setOpen(id)} aria-expanded={open === id}
      className="inline-flex items-center gap-1 py-2 text-[15px] font-medium">
      {label}<ChevronDown size={15} className={`transition ${open === id ? "rotate-180" : ""}`} />
    </button>
  );

  return (
    <header ref={ref} className={`${variant === "plain" ? "border-b border-black/5 bg-white" : ""} relative z-40`} onMouseLeave={() => setOpen(null)}>
      <div className="container-x flex h-[76px] items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" aria-label="TicketTamer home"><Logo /></Link>
          <nav className="hidden items-center gap-7 lg:flex">
            {trig("product", "Product")}
            {trig("industries", "Industries")}
            <Link href="/case-studies" className="py-2 text-[15px] font-medium">Customers</Link>
            {trig("resources", "Resources")}
            {trig("company", "Company")}
          </nav>
        </div>
        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/signin" className="btn-ghost !py-2">Sign in</Link>
          <Link href="/signup" className="btn-dark !py-2">Sign up</Link>
        </div>
        <button className="lg:hidden" onClick={() => setMobile(!mobile)} aria-label="Menu">{mobile ? <X /> : <Menu />}</button>
      </div>

      {/* Desktop mega menus */}
      <div className="pointer-events-none absolute inset-x-0 top-[68px] hidden lg:block">
        {open === "product" && (
          <div className="pointer-events-auto mx-auto w-[min(992px,92vw)] fade-up overflow-hidden rounded-2xl bg-white shadow-pop" style={{ animationDuration: ".2s" }}>
            <div className="grid grid-cols-[1fr_280px]">
              <div className="p-6">
                <Link href="/product/overview" onClick={close} className="mb-4 inline-flex items-center gap-1 border-b border-black/5 pb-4 text-sm font-semibold w-full">Product overview <ArrowRight size={14} /></Link>
                <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-black/50">Channels</p>
                <div className="grid grid-cols-3 gap-1 border-b border-black/5 pb-4">
                  {by("Channels").map((p) => <Item key={p.slug} href={`/product/${p.slug}`} Icon={pIcon[p.slug]} title={p.name} sub={p.tagline} onClick={close} />)}
                </div>
                <div className="mt-4 grid grid-cols-3 gap-x-1">
                  {(["Build", "Optimize", "Scale"] as const).map((g) => (
                    <div key={g}>
                      <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-black/50">{g}</p>
                      {by(g).filter((p) => p.slug !== "overview").map((p) => <Item key={p.slug} href={`/product/${p.slug}`} Icon={pIcon[p.slug]} title={p.name} sub={p.tagline} onClick={close} />)}
                    </div>
                  ))}
                </div>
                <Link href="/product/duet" onClick={close} className="mt-3 flex items-center justify-between rounded-xl bg-soft p-3">
                  <span className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-lg bg-white text-brand-600"><Sparkles size={18} /></span>
                    <span><span className="block text-sm font-semibold">Duet</span><span className="block text-xs text-black/55">AI partner to build self-improving agents</span></span></span>
                  <ArrowRight size={16} />
                </Link>
              </div>
              <Link href="/resources/customer-owned-agents-arriving" onClick={close} className="flex flex-col bg-soft p-6">
                <div className="grid aspect-[1.7] place-items-center rounded-lg text-center text-white" style={{ background: "linear-gradient(135deg,#6a7df0,#b476e8 60%,#f08bc5)" }}>
                  <div><p className="text-[9px] uppercase tracking-widest opacity-80">New research</p><p className="text-2xl font-medium leading-none">Agent<br />Gateway</p></div>
                </div>
                <p className="mt-4 text-sm font-semibold leading-snug">Customer-owned AI agents are arriving. Prepare your support operation.</p>
                <p className="mt-2 text-xs text-black/60">How to detect third-party agents and serve them through a governed channel with explicit permissions.</p>
                <ArrowRight size={16} className="mt-auto" />
              </Link>
            </div>
          </div>
        )}
        {open === "industries" && (
          <div className="pointer-events-auto mx-auto w-[min(860px,92vw)] fade-up rounded-2xl bg-white p-6 shadow-pop" style={{ animationDuration: ".2s" }}>
            <div className="grid grid-cols-3 gap-1">
              {industries.map((i) => <Item key={i.slug} href={`/industry/${i.slug}`} Icon={iIcon[i.slug]} title={i.name} sub={i.tagline} onClick={close} />)}
            </div>
          </div>
        )}
        {open === "resources" && (
          <div className="pointer-events-auto ml-[46%] w-[300px] fade-up rounded-2xl bg-white p-3 shadow-pop" style={{ animationDuration: ".2s" }}>
            {[["Resource hub", "/resources"], ["Glossary", "/glossary"], ["Case studies", "/case-studies"]].map(([l, h]) => (
              <Link key={l} href={h} onClick={close} className="flex items-center gap-3 rounded-xl p-2.5 text-sm font-semibold hover:bg-black/[.04]"><BookOpen size={16} className="text-brand-600" />{l}</Link>
            ))}
          </div>
        )}
        {open === "company" && (
          <div className="pointer-events-auto ml-[54%] w-[260px] fade-up rounded-2xl bg-white p-3 shadow-pop" style={{ animationDuration: ".2s" }}>
            {[["About", "/about"], ["Pricing", "/pricing"], ["Partnerships", "/partnerships"], ["Security", "/security"]].map(([l, h]) => (
              <Link key={l} href={h} onClick={close} className="block rounded-xl p-2.5 text-sm font-semibold hover:bg-black/[.04]">{l}</Link>
            ))}
          </div>
        )}
      </div>

      {/* Mobile drawer */}
      {mobile && (
        <div className="absolute inset-x-3 top-[72px] max-h-[80vh] overflow-auto rounded-2xl bg-white p-5 shadow-pop lg:hidden">
          {[["Product", products.map((p) => [p.name, `/product/${p.slug}`])], ["Industries", industries.map((i) => [i.name, `/industry/${i.slug}`])]].map(([t, items]) => (
            <details key={t as string} className="border-b border-black/5 py-3">
              <summary className="cursor-pointer text-base font-semibold">{t as string}</summary>
              <div className="mt-2 grid gap-1 pl-2">{(items as string[][]).map(([l, h]) => <Link key={h} href={h} onClick={close} className="py-1.5 text-sm text-black/70">{l}</Link>)}</div>
            </details>
          ))}
          {[["Customers", "/case-studies"], ["Resources", "/resources"], ["About", "/about"], ["Pricing", "/pricing"]].map(([l, h]) => (
            <Link key={h} href={h} onClick={close} className="block border-b border-black/5 py-3 text-base font-semibold">{l}</Link>
          ))}
          <div className="mt-4 flex gap-3"><Link href="/signin" className="btn-ghost flex-1" onClick={close}>Sign in</Link><Link href="/signup" className="btn-dark flex-1" onClick={close}>Sign up</Link></div>
        </div>
      )}
    </header>
  );
}
