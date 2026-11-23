import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL, key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const path = req.nextUrl.pathname;
  const protectedPath = path.startsWith("/app");
  if (!url || !key) {
    // Supabase not configured: protected routes cannot be served.
    if (protectedPath) return NextResponse.redirect(new URL("/signin?error=config", req.url));
    return NextResponse.next();
  }
  let res = NextResponse.next({ request: req });
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => req.cookies.getAll(),
      setAll: (list: { name: string; value: string; options?: any }[]) => {
        list.forEach(({ name, value }) => req.cookies.set(name, value));
        res = NextResponse.next({ request: req });
        list.forEach(({ name, value, options }) => res.cookies.set(name, value, options));
      },
    },
  });
  const { data: { user } } = await supabase.auth.getUser();
  if (protectedPath && !user) {
    const r = new URL("/signin", req.url); r.searchParams.set("next", path);
    return NextResponse.redirect(r);
  }
  if (user && (path === "/signin" || path === "/signup")) return NextResponse.redirect(new URL("/app", req.url));
  return res;
}

export const config = { matcher: ["/app/:path*", "/signin", "/signup"] };
