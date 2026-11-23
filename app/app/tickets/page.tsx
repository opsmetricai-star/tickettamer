import Link from "next/link";
import { requireUser } from "@/lib/app";
import { Title } from "../ui";
import { NewTicket } from "./new";

const badge: Record<string, string> = { open: "bg-blue-50 text-blue-700", ai_resolved: "bg-green-50 text-green-700", needs_human: "bg-amber-50 text-amber-700", closed: "bg-black/5 text-black/60" };

export default async function Tickets({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status } = await searchParams;
  const { sb } = await requireUser();
  let q = sb.from("tickets").select("id,subject,customer_email,status,priority,category,created_at").order("created_at", { ascending: false }).limit(100);
  if (status) q = q.eq("status", status);
  const { data } = await q;
  return (
    <div className="space-y-6">
      <Title title="Tickets" sub="Create tickets and let the agent draft grounded replies." />
      <NewTicket />
      <div className="flex flex-wrap gap-2 text-sm">{[["", "All"], ["open", "Open"], ["ai_resolved", "AI resolved"], ["needs_human", "Needs human"], ["closed", "Closed"]].map(([v, l]) => <Link key={v} href={v ? `/app/tickets?status=${v}` : "/app/tickets"} className={`rounded-full px-3.5 py-1.5 ${(status || "") === v ? "bg-ink text-white" : "bg-white"}`}>{l}</Link>)}</div>
      <div className="card overflow-x-auto"><table className="w-full min-w-[600px] text-left text-sm"><thead className="border-b border-black/5 text-xs text-black/50"><tr><th className="p-4">Subject</th><th>Customer</th><th>Category</th><th>Status</th><th>Created</th></tr></thead>
        <tbody className="divide-y divide-black/5">{(data || []).map((t) => <tr key={t.id} className="hover:bg-black/[.02]"><td className="p-4 font-medium"><Link href={`/app/tickets/${t.id}`} className="hover:underline">{t.subject}</Link></td><td>{t.customer_email || "-"}</td><td>{t.category || "-"}</td><td><span className={`rounded-full px-2.5 py-1 text-xs ${badge[t.status]}`}>{t.status.replace("_", " ")}</span></td><td className="text-black/50">{new Date(t.created_at).toLocaleDateString()}</td></tr>)}
          {!data?.length && <tr><td colSpan={5} className="p-10 text-center text-black/50">No tickets yet. Create one above.</td></tr>}</tbody></table></div>
    </div>
  );
}
