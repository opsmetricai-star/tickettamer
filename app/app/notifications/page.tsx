import { requireUser } from "@/lib/app";
import { Title } from "../ui";
import { MarkRead } from "./client";

export default async function Notifications() {
  const { sb } = await requireUser();
  const { data } = await sb.from("notifications").select("*").order("created_at", { ascending: false }).limit(50);
  return (
    <div className="max-w-[700px] space-y-6">
      <Title title="Notifications"><MarkRead /></Title>
      <div className="card divide-y divide-black/5">{(data || []).map((n) => <div key={n.id} className="p-5"><p className={`font-medium ${n.read ? "text-black/50" : ""}`}>{n.title}</p>{n.body && <p className="mt-1 text-sm text-black/55">{n.body}</p>}<p className="mt-2 text-xs text-black/40">{new Date(n.created_at).toLocaleString()}</p></div>)}{!data?.length && <p className="p-10 text-center text-black/50">Nothing yet.</p>}</div>
    </div>
  );
}
