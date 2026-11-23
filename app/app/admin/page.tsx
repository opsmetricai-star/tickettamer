import { notFound } from "next/navigation";
import { requireUser, isAdmin } from "@/lib/app";
import { createAdmin } from "@/lib/supabase/server";
import { Title } from "../ui";
import { ActivateForm } from "./client";

export default async function Admin() {
  const { user } = await requireUser();
  if (!isAdmin(user.email)) notFound();
  const admin = createAdmin();
  const { data } = admin ? await admin.from("payments").select("id,email,plan,status,created_at").order("created_at", { ascending: false }).limit(20) : { data: [] };
  return (
    <div className="max-w-[700px] space-y-6">
      <Title title="Admin" sub="Manually activate a plan after you confirm payment in Selar." />
      {!admin && <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-800">SUPABASE_SERVICE_ROLE_KEY is not set.</p>}
      <ActivateForm />
      <div className="card p-6"><p className="font-semibold">Recent payments</p><ul className="mt-3 divide-y divide-black/5 text-sm">{(data || []).map((p: any) => <li key={p.id} className="flex justify-between py-2"><span>{p.email} · {p.plan} · {p.status}</span><span className="text-black/50">{new Date(p.created_at).toLocaleDateString()}</span></li>)}</ul></div>
    </div>
  );
}
