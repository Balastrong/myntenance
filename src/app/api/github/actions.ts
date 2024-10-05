"use server"
import { getServerOctokit } from "@/lib/github/server"
import { createClient } from "@/lib/supabase/server"
import { revalidatePath, unstable_cache } from "next/cache"
import { Octokit } from "octokit"

export async function storeRepository(fullName: string) {
  try {
    const [repoOwner, repoName] = fullName.split("/")

    const {
      data: { user },
    } = await createClient().auth.getUser()

    if (!user) {
      throw new Error("User not found")
    }

    const { data: existingRepo } = await createClient()
      .from("projects")
      .select("*")
      .eq("name", repoName)
      .eq("ownerLogin", repoOwner)
      .eq("user", user.id)
      .limit(1)
      .maybeSingle()

    if (existingRepo) {
      throw new Error("Repository already exists")
    }

    const { data: githubRepository } = await getServerOctokit().rest.repos.get({
      owner: repoOwner,
      repo: repoName,
    })

    await createClient()
      .from("projects")
      .insert({
        name: githubRepository.name,
        ownerLogin: githubRepository.owner.login,
        ownerType: githubRepository.owner.type,
        visibility: githubRepository.private ? "private" : "public",
        stars: githubRepository.stargazers_count,
        openIssues: githubRepository.open_issues_count,
        showInPublicProfile: !githubRepository.private,
      })

    revalidatePath("/", "layout")
    return { message: "Repository stored", error: false }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error?.message : "An error occurred"

    return { message: errorMessage, error: true }
  }
}

export const getUserRepoStats = unstable_cache(
  (
    octokit: Octokit,
    userLogin: string,
    repoOwner: string,
    repoName: string,
    days: number = 365,
  ) => {
    const today = new Date()
    return octokit.rest.repos.listCommits({
      owner: repoOwner,
      repo: repoName,
      author: userLogin,
      per_page: 100,
      since: new Date(today.setDate(today.getDate() - days)).toISOString(),
    })
  },
  undefined,
  { revalidate: 600 },
)
