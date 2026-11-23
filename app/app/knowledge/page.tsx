import { requireUser } from "@/lib/app";
import { Title } from "../ui";
import { KnowledgeForm, DeleteSource } from "./client";

export default async function Knowledge() {
  const { sb, limits } = await requireUser();
  const { data } = await sb.from("knowledge_sources").select("id,title,kind,content,created_at,file_path").order("created_at", { ascending: false });
  return (
    <div className="space-y-6">
      <Title title="Knowledge" sub={`${data?.length ?? 0} of ${limits.sources} sources used. The agent only answers from this content.`} />
      <KnowledgeForm />
      <div className="card divide-y divide-black/5">
        {(data || []).map((s) => (
          <div key={s.id} className="flex items-start justify-between gap-4 p-5">
            <div className="min-w-0"><p className="font-medium">{s.title} <span className="ml-2 rounded-full bg-soft px-2 py-0.5 text-xs font-normal">{s.kind}</span></p><p className="mt-1 line-clamp-2 text-sm text-black/55">{s.content}</p></div>
            <DeleteSource id={s.id} path={s.file_path} />
          </div>
        ))}
        {!data?.length && <p className="p-10 text-center text-black/50">No sources yet.</p>}
      </div>
    </div>
  );
}
