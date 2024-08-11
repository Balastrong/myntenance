import { updateSession } from "@/lib/supabase/middleware"
import { type NextRequest } from "next/server"
import { refreshToken } from "./lib/github/middleware"

export async function middleware(request: NextRequest) {
  const supabaseResponse = await updateSession(request)

  if (supabaseResponse.redirected) return supabaseResponse

  return await refreshToken(request, supabaseResponse)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
