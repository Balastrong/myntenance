import { getOctokit } from "@/lib/github";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebouncedValue } from "./useDebouncedValue";

export const useGitHubIssues = (query: string, baseQuery?: string) => {
  const { debouncedValue: debouncedQuery } = useDebouncedValue(query);

  return useQuery({
    queryKey: ["issue-search", debouncedQuery],
    enabled: debouncedQuery.length > 0,
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const octokit = await getOctokit();

      const {
        data: { items },
      } = await octokit.rest.search.issuesAndPullRequests({
        q: `${baseQuery} "${query}"`,
        per_page: 8,
      });

      return { items };
    },
  });
};
