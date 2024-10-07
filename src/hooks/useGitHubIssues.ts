import { keepPreviousData, useQuery, useMutation } from "@tanstack/react-query"
import { useDebouncedValue } from "./useDebouncedValue"
import { getClientOctokit } from "@/lib/github/client"

export const useGitHubIssues = (query: string, baseQuery?: string) => {
  const { debouncedValue: debouncedQuery } = useDebouncedValue(query)

  return useQuery({
    queryKey: ["issue-search", baseQuery, debouncedQuery],
    enabled: debouncedQuery.length > 0,
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const octokit = getClientOctokit()

      const {
        data: { items },
      } = await octokit.rest.search.issuesAndPullRequests({
        q: `${baseQuery} "${debouncedQuery}"`,
        per_page: 8,
      })

      return { items }
    },
  })
}

export const useCreateGitHubIssue = () => {
  return useMutation(async ({ owner, repo, title, body }: { owner: string, repo: string, title: string, body: string }) => {
    try {
      const octokit = getClientOctokit()
      const response = await octokit.rest.issues.create({
        owner,
        repo,
        title,
        body,
      })
      return { message: "Issue created successfully", issue: response.data, error: false }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred"
      return { message: errorMessage, error: true }
    }
  })
}
