import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  await createClient().auth.signOut()

  const { origin } = new URL(request.url)

  return NextResponse.redirect(origin)
}
