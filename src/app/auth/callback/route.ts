import {
  GITHUB_REFRESH_TOKEN_COOKIE,
  GITHUB_TOKEN_COOKIE,
} from "@/lib/supabase/cookies";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          },
        },
      },
    );

    supabase.auth.onAuthStateChange((event, session) => {
      if (session && session.provider_token) {
        cookieStore.set(GITHUB_TOKEN_COOKIE, session.provider_token);
      }

      if (session && session.provider_refresh_token) {
        cookieStore.set(
          GITHUB_REFRESH_TOKEN_COOKIE,
          session.provider_refresh_token,
        );
      }

      if (event === "SIGNED_OUT") {
        cookieStore.delete(GITHUB_TOKEN_COOKIE);
        cookieStore.delete(GITHUB_REFRESH_TOKEN_COOKIE);
      }
    });

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
