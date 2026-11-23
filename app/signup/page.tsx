import { Suspense } from "react";
import { AuthForm } from "@/components/AuthForm";
import { supabaseConfigured } from "@/lib/supabase/server";
export const dynamic = "force-dynamic";
export default function Page() { return <Suspense><AuthForm mode="signup" configured={supabaseConfigured()} /></Suspense>; }
