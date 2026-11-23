import Link from "next/link";
import { LayoutDashboard, Inbox, BookOpen, MessageSquare, BarChart3, CreditCard, Settings, Bell, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/Logo";
import { requireUser, isAdmin } from "@/lib/app";
import { SignOut } from "./signout";

export const dynamic = "force-dynamic";
const nav = [["/app", "Dashboard", LayoutDashboard], ["/app/tickets", "Tickets", Inbox], ["/app/knowledge", "Knowledge", BookOpen], ["/app/playground", "Playground", MessageSquare], ["/app/analytics", "Analytics", BarChart3], ["/app/billing", "Billing", CreditCard], ["/app/settings", "Settings", Settings]] as const;

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const { sb, user, profile, plan, limits } = await requireUser();
  const { count } = await sb.from("notifications").select("id", { count: "exact", head: true }).eq("read", false);
  const used = profile?.credits_used ?? 0; const pct = Math.min(100, Math.round((used / limits.credits) * 100));
  return (
    <div className="min-h-screen bg-soft lg:grid lg:grid-cols-[250px_1fr]">
      <aside className="border-b border-black/5 bg-white p-4 lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r lg:p-5">
        <div className="flex items-center justify-between"><Link href="/"><Logo /></Link><Link href="/app/notifications" className="relative lg:hidden"><Bell size={20} /></Link></div>
        <nav className="mt-4 flex gap-1 overflow-x-auto lg:mt-8 lg:flex-col">
          {nav.map(([h, l, I]) => <Link key={h} href={h} className="flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-black/70 hover:bg-black/[.05] hover:text-black"><I size={17} />{l}</Link>)}
          <Link href="/app/notifications" className="hidden items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-black/70 hover:bg-black/[.05] lg:flex"><Bell size={17} />Notifications{!!count && <span className="ml-auto rounded-full bg-brand-500 px-2 text-xs text-white">{count}</span>}</Link>
          {isAdmin(user.email) && <Link href="/app/admin" className="flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-black/70 hover:bg-black/[.05]"><ShieldCheck size={17} />Admin</Link>}
        </nav>
        <div className="mt-6 hidden rounded-xl bg-soft p-4 lg:absolute lg:inset-x-5 lg:bottom-5 lg:block">
          <p className="text-xs text-black/50">{plan === "free" ? "Free trial" : `${plan[0].toUpperCase()}${plan.slice(1)} plan`}</p>
          <p className="mt-1 text-sm font-semibold">{used} / {limits.credits} resolutions</p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/10"><div className="h-full bg-brand-500" style={{ width: `${pct}%` }} /></div>
          <p className="mt-3 truncate text-xs text-black/50">{user.email}</p><SignOut />
        </div>
      </aside>
      <div className="min-w-0 p-5 md:p-8">{children}</div>
    </div>
  );
}
