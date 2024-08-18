import { getClientOctokit } from "@/lib/github/client"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useDebouncedValue } from "./useDebouncedValue"

export const useGitHubRepositories = (query: string) => {
  const { debouncedValue: debouncedQuery } = useDebouncedValue(query)

  return useQuery({
    queryKey: ["repo-search", debouncedQuery],
    enabled: debouncedQuery.length > 2,
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const octokit = getClientOctokit()

      const {
        data: { items, total_count },
      } = await octokit.rest.search.repos({
        q: query,
        per_page: 8,
      })

      return {
        items: items.map((f) => ({
          name: f.full_name,
          visi: f.visibility,
        })),
        total_count,
      }
    },
  })
}
