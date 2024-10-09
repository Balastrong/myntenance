import { describe, it, expect, vi } from "vitest"
import { GET } from "./route"
import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}))

vi.mock("next/server", () => ({
  NextResponse: {
    redirect: vi.fn(),
  },
}))

describe("GET", () => {
  it("should sign out the user and redirect to the origin", async () => {
    const mockRequest = {
      url: "http://localhost:3000/auth/signout",
    }

    const mockSupabase = {
      auth: {
        signOut: vi.fn().mockResolvedValue({}),
      },
    }

    createClient.mockReturnValue(mockSupabase)

    await GET(mockRequest)

    expect(mockSupabase.auth.signOut).toHaveBeenCalled()
    expect(NextResponse.redirect).toHaveBeenCalledWith("http://localhost:3000")
  })
})
