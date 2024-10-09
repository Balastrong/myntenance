import { describe, it, expect, vi } from "vitest"
import { GET } from "./route"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}))

vi.mock("next/headers", () => ({
  cookies: vi.fn(),
}))

vi.mock("next/server", () => ({
  NextResponse: {
    redirect: vi.fn(),
  },
}))

describe("GET", () => {
  it("should redirect to the next URL if code is valid", async () => {
    const mockRequest = {
      url: "http://localhost:3000/auth/callback?code=valid-code&next=/dashboard",
    }

    const mockSupabase = {
      auth: {
        exchangeCodeForSession: vi.fn().mockResolvedValue({ error: null }),
        onAuthStateChange: vi.fn(),
      },
    }

    const mockCookies = {
      set: vi.fn(),
      delete: vi.fn(),
    }

    createClient.mockReturnValue(mockSupabase)
    cookies.mockReturnValue(mockCookies)

    await GET(mockRequest)

    expect(mockSupabase.auth.exchangeCodeForSession).toHaveBeenCalledWith(
      "valid-code",
    )
    expect(NextResponse.redirect).toHaveBeenCalledWith(
      "http://localhost:3000/dashboard",
    )
  })

  it("should redirect to error page if code is invalid", async () => {
    const mockRequest = {
      url: "http://localhost:3000/auth/callback?code=invalid-code",
    }

    const mockSupabase = {
      auth: {
        exchangeCodeForSession: vi.fn().mockResolvedValue({ error: new Error("Invalid code") }),
        onAuthStateChange: vi.fn(),
      },
    }

    const mockCookies = {
      set: vi.fn(),
      delete: vi.fn(),
    }

    createClient.mockReturnValue(mockSupabase)
    cookies.mockReturnValue(mockCookies)

    await GET(mockRequest)

    expect(mockSupabase.auth.exchangeCodeForSession).toHaveBeenCalledWith(
      "invalid-code",
    )
    expect(NextResponse.redirect).toHaveBeenCalledWith(
      "http://localhost:3000/auth/auth-code-error",
    )
  })
})
