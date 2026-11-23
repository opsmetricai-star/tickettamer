import { requireUser } from "@/lib/app";
import { Title, Stat } from "../ui";
import { Charts } from "./charts";

export default async function Analytics() {
  const { sb } = await requireUser();
  const since = new Date(Date.now() - 14 * 864e5).toISOString();
  const { data: tickets } = await sb.from("tickets").select("status,category,sentiment,created_at,ai_confidence").gte("created_at", since);
  const t = tickets || [];
  const days: Record<string, { day: string; tickets: number; resolved: number }> = {};
  for (let i = 13; i >= 0; i--) { const d = new Date(Date.now() - i * 864e5).toISOString().slice(5, 10); days[d] = { day: d, tickets: 0, resolved: 0 }; }
  t.forEach((x) => { const d = x.created_at.slice(5, 10); if (days[d]) { days[d].tickets++; if (x.status === "ai_resolved") days[d].resolved++; } });
  const cat: Record<string, number> = {}; t.forEach((x) => { const c = x.category || "Uncategorized"; cat[c] = (cat[c] || 0) + 1; });
  const sent = { positive: 0, neutral: 0, negative: 0 } as Record<string, number>; t.forEach((x) => x.sentiment && sent[x.sentiment]++);
  const conf = t.filter((x) => x.ai_confidence != null); const avg = conf.length ? Math.round((conf.reduce((a, x) => a + Number(x.ai_confidence), 0) / conf.length) * 100) : 0;
  const resolved = t.filter((x) => x.status === "ai_resolved").length;
  return (
    <div className="space-y-6">
      <Title title="Analytics" sub="Last 14 days." />
      <div className="grid gap-4 sm:grid-cols-3"><Stat label="Tickets" value={t.length} /><Stat label="AI resolution rate" value={`${t.length ? Math.round((resolved / t.length) * 100) : 0}%`} /><Stat label="Avg. confidence" value={`${avg}%`} /></div>
      <Charts days={Object.values(days)} cats={Object.entries(cat).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value).slice(0, 8)} sent={Object.entries(sent).map(([name, value]) => ({ name, value }))} />
    </div>
  );
}
