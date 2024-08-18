import { keepPreviousData, useQuery } from "@tanstack/react-query"
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
