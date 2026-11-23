import { requireUser } from "@/lib/app";
import { Title } from "../ui";
import { SettingsForm } from "./client";

export default async function Settings() {
  const { profile, user } = await requireUser();
  return <div className="max-w-[560px] space-y-6"><Title title="Settings" sub={user.email ?? ""} /><SettingsForm name={profile?.full_name || ""} company={profile?.company || ""} /></div>;
}
