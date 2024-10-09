import { describe, it, expect, vi } from "vitest"
import { login, logout } from "./actions"
import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { headers, cookies } from "next/headers"
import {
  GITHUB_REFRESH_TOKEN_COOKIE,
  GITHUB_ACCESS_TOKEN_COOKIE,
} from "@/lib/supabase/cookies"

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}))

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}))

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}))

vi.mock("next/headers", () => ({
  headers: vi.fn(),
  cookies: vi.fn(),
}))

describe("login", () => {
  it("should redirect to GitHub OAuth URL", async () => {
    const mockOrigin = "http://localhost:3000"
    const mockData = { url: "https://github.com/login/oauth/authorize" }

    headers.mockReturnValue({
      get: vi.fn().mockReturnValue(mockOrigin),
    })

    createClient.mockReturnValue({
      auth: {
        signInWithOAuth: vi.fn().mockResolvedValue({ error: null, data: mockData }),
      },
    })

    await login()

    expect(revalidatePath).toHaveBeenCalledWith("/", "layout")
    expect(redirect).toHaveBeenCalledWith(mockData.url)
  })

  it("should redirect to error page if there is an error", async () => {
    const mockOrigin = "http://localhost:3000"
    const mockError = new Error("OAuth error")

    headers.mockReturnValue({
      get: vi.fn().mockReturnValue(mockOrigin),
    })

    createClient.mockReturnValue({
      auth: {
        signInWithOAuth: vi.fn().mockResolvedValue({ error: mockError, data: null }),
      },
    })

    await login()

    expect(redirect).toHaveBeenCalledWith("/error")
  })
})

describe("logout", () => {
  it("should sign out the user and clear cookies", async () => {
    const mockUser = { id: "user-id" }

    createClient.mockReturnValue({
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: mockUser } }),
        signOut: vi.fn().mockResolvedValue({}),
      },
    })

    const mockCookies = {
      delete: vi.fn(),
    }

    cookies.mockReturnValue(mockCookies)

    await logout()

    expect(createClient().auth.signOut).toHaveBeenCalled()
    expect(mockCookies.delete).toHaveBeenCalledWith(GITHUB_ACCESS_TOKEN_COOKIE)
    expect(mockCookies.delete).toHaveBeenCalledWith(GITHUB_REFRESH_TOKEN_COOKIE)
    expect(revalidatePath).toHaveBeenCalledWith("/", "layout")
    expect(redirect).toHaveBeenCalledWith("/")
  })

  it("should clear cookies even if user is not found", async () => {
    createClient.mockReturnValue({
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: null } }),
        signOut: vi.fn().mockResolvedValue({}),
      },
    })

    const mockCookies = {
      delete: vi.fn(),
    }

    cookies.mockReturnValue(mockCookies)

    await logout()

    expect(createClient().auth.signOut).not.toHaveBeenCalled()
    expect(mockCookies.delete).toHaveBeenCalledWith(GITHUB_ACCESS_TOKEN_COOKIE)
    expect(mockCookies.delete).toHaveBeenCalledWith(GITHUB_REFRESH_TOKEN_COOKIE)
    expect(revalidatePath).toHaveBeenCalledWith("/", "layout")
    expect(redirect).toHaveBeenCalledWith("/")
  })
})
