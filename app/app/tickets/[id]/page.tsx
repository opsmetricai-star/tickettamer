import { notFound } from "next/navigation";
import Link from "next/link";
import { requireUser } from "@/lib/app";
import { Title } from "../../ui";
import { TicketActions } from "./actions";

export default async function Ticket({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { sb } = await requireUser();
  const { data: t } = await sb.from("tickets").select("*").eq("id", id).maybeSingle();
  if (!t) notFound();
  return (
    <div className="max-w-[860px] space-y-6">
      <Link href="/app/tickets" className="text-sm underline">Back to tickets</Link>
      <Title title={t.subject} sub={`${t.customer_email || "Unknown customer"} · ${t.status.replace("_", " ")} · ${t.priority}`} />
      <div className="card p-6"><p className="text-xs text-black/50">Customer message</p><p className="mt-2 whitespace-pre-wrap">{t.body}</p></div>
      <div className="card p-6">
        <div className="flex flex-wrap items-center justify-between gap-2"><p className="text-xs text-black/50">AI reply</p>{t.ai_confidence != null && <p className="text-xs">Confidence {Math.round(Number(t.ai_confidence) * 100)}% · {t.category} · {t.sentiment}</p>}</div>
        {t.ai_reply ? <p className="mt-2 whitespace-pre-wrap">{t.ai_reply}</p> : <p className="mt-2 text-black/50">No AI reply yet.</p>}
        {Array.isArray(t.ai_sources) && t.ai_sources.length > 0 && <p className="mt-4 text-xs text-black/50">Sources: {t.ai_sources.map((s: any) => s.title).join(", ")}</p>}
      </div>
      <TicketActions id={t.id} subject={t.subject} body={t.body} status={t.status} reply={t.ai_reply} />
    </div>
  );
}
