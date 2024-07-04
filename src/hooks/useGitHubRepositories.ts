import { getOctokit } from "@/lib/github";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedValue } from "./useDebouncedValue";

export const useGitHubRepositories = (query: string) => {
  const debouncedQuery = useDebouncedValue(query);

  return useQuery({
    queryKey: ["repo-search", debouncedQuery],
    enabled: debouncedQuery.length > 2,
    queryFn: async () => {
      const octokit = await getOctokit();

      const {
        data: { items, total_count },
      } = await octokit.rest.search.repos({
        q: query,
        per_page: 8,
      });

      return {
        items: items.map((f) => ({
          name: f.full_name,
          visi: f.visibility,
        })),
        total_count,
      };
    },
  });
};
