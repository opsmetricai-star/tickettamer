"use client";
import { useRouter } from "next/navigation";
import { createBrowser } from "@/lib/supabase/client";

export function SignOut() {
  const r = useRouter();
  return <button className="mt-2 text-xs font-semibold underline" onClick={async () => { await createBrowser().auth.signOut(); r.replace("/signin"); r.refresh(); }}>Sign out</button>;
}
