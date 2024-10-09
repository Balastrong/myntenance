import { describe, it, expect, vi } from "vitest"
import { storeRepository, getUserRepoStats } from "./actions"
import { getServerOctokit } from "@/lib/github/server"
import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

vi.mock("@/lib/github/server", () => ({
  getServerOctokit: vi.fn(),
}))

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}))

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}))

describe("storeRepository", () => {
  it("should store a repository successfully", async () => {
    const mockUser = { id: "user-id" }
    const mockRepo = {
      name: "repo-name",
      owner: { login: "repo-owner", type: "User" },
      private: false,
      stargazers_count: 10,
      open_issues_count: 5,
    }

    createClient.mockReturnValue({
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: mockUser } }),
      },
      from: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      maybeSingle: vi.fn().mockResolvedValue({ data: null }),
      insert: vi.fn().mockResolvedValue({}),
    })

    getServerOctokit.mockReturnValue({
      rest: {
        repos: {
          get: vi.fn().mockResolvedValue({ data: mockRepo }),
        },
      },
    })

    const result = await storeRepository("repo-owner/repo-name")

    expect(result).toEqual({ message: "Repository stored", error: false })
    expect(revalidatePath).toHaveBeenCalledWith("/", "layout")
  })

  it("should return an error if the user is not found", async () => {
    createClient.mockReturnValue({
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: null } }),
      },
    })

    const result = await storeRepository("repo-owner/repo-name")

    expect(result).toEqual({ message: "User not found", error: true })
  })

  it("should return an error if the repository already exists", async () => {
    const mockUser = { id: "user-id" }
    const mockExistingRepo = { id: "existing-repo-id" }

    createClient.mockReturnValue({
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: mockUser } }),
      },
      from: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      maybeSingle: vi.fn().mockResolvedValue({ data: mockExistingRepo }),
    })

    const result = await storeRepository("repo-owner/repo-name")

    expect(result).toEqual({ message: "Repository already exists", error: true })
  })
})

describe("getUserRepoStats", () => {
  it("should return user repository stats", async () => {
    const mockOctokit = {
      rest: {
        repos: {
          listCommits: vi.fn().mockResolvedValue({ data: [] }),
        },
      },
    }

    const result = await getUserRepoStats(
      mockOctokit,
      "user-login",
      "repo-owner",
      "repo-name",
    )

    expect(result).toEqual({ data: [] })
  })
})
