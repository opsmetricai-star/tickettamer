import Link from "next/link";
import { Logo } from "./Logo";
import { products, industries } from "@/lib/content";

export function Footer() {
  const col = (title: string, items: [string, string][]) => (
    <div>
      <p className="mb-4 text-sm font-semibold">{title}</p>
      <ul className="space-y-2.5">{items.map(([l, h]) => <li key={l + h}><Link href={h} className="text-sm text-black/60 transition hover:text-black">{l}</Link></li>)}</ul>
    </div>
  );
  return (
    <footer className="border-t border-black/5 bg-white">
      <div className="container-x grid gap-10 py-16 md:grid-cols-[1.3fr_repeat(4,1fr)]">
        <div>
          <Logo />
          <p className="mt-4 max-w-[240px] text-sm text-black/60">The AI engine for customer operations. It learns from your knowledge and your resolved tickets.</p>
        </div>
        {col("Product", products.filter((p) => p.slug !== "overview").slice(0, 8).map((p) => [p.name, `/product/${p.slug}`]))}
        {col("Industries", industries.map((i) => [i.name, `/industry/${i.slug}`]))}
        {col("Resources", [["Customers", "/case-studies"], ["Resource hub", "/resources"], ["Glossary", "/glossary"]])}
        {col("Company", [["About", "/about"], ["Pricing", "/pricing"], ["Partnerships", "/partnerships"], ["Security", "/security"], ["Privacy", "/legal/privacy"]])}
      </div>
      <div className="container-x flex flex-col justify-between gap-2 border-t border-black/5 py-6 text-xs text-black/50 md:flex-row">
        <span>Copyright {new Date().getFullYear()} TicketTamer. All rights reserved.</span>
        <span><Link href="/legal/privacy" className="hover:text-black">Privacy</Link> · <Link href="/security" className="hover:text-black">Security</Link></span>
      </div>
    </footer>
  );
}
