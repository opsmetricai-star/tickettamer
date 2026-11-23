import Link from "next/link";
import { requireUser } from "@/lib/app";
import { Stat, Title } from "./ui";

export default async function Dashboard() {
  const { sb, profile, limits } = await requireUser();
  const [{ count: total }, { count: aiRes }, { count: human }, { count: src }, { data: recent }] = await Promise.all([
    sb.from("tickets").select("id", { count: "exact", head: true }),
    sb.from("tickets").select("id", { count: "exact", head: true }).eq("status", "ai_resolved"),
    sb.from("tickets").select("id", { count: "exact", head: true }).eq("status", "needs_human"),
    sb.from("knowledge_sources").select("id", { count: "exact", head: true }),
    sb.from("tickets").select("id,subject,status,created_at").order("created_at", { ascending: false }).limit(6),
  ]);
  const rate = total ? Math.round(((aiRes || 0) / total) * 100) : 0;
  return (
    <div className="space-y-8">
      <Title title={`Welcome${profile?.full_name ? `, ${profile.full_name.split(" ")[0]}` : ""}`} sub="Here is how your agent is doing." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Tickets" value={total ?? 0} /><Stat label="AI resolution rate" value={`${rate}%`} /><Stat label="Needs a human" value={human ?? 0} /><Stat label="Resolutions used" value={`${profile?.credits_used ?? 0}/${limits.credits}`} />
      </div>
      {!src && <div className="card p-6"><p className="font-semibold">Start by teaching your agent</p><p className="mt-1 text-sm text-black/60">Add help articles or past tickets so answers are grounded in your content.</p><Link href="/app/knowledge" className="btn-dark mt-4">Add knowledge</Link></div>}
      <div className="card p-6"><div className="flex items-center justify-between"><p className="font-semibold">Recent tickets</p><Link href="/app/tickets" className="link-arrow">View all</Link></div>
        <ul className="mt-4 divide-y divide-black/5">{(recent || []).map((t) => <li key={t.id} className="flex items-center justify-between py-3 text-sm"><Link href={`/app/tickets/${t.id}`} className="font-medium hover:underline">{t.subject}</Link><span className="rounded-full bg-soft px-2.5 py-1 text-xs">{t.status.replace("_", " ")}</span></li>)}{!recent?.length && <li className="py-6 text-sm text-black/50">No tickets yet.</li>}</ul></div>
    </div>
  );
}
