import { getOctokit } from "@/lib/github";

export async function RepoSelector() {
  const octokit = await getOctokit();

  const {
    data: { items, total_count },
  } = await octokit.rest.search.repos({
    q: "tanstack",
    per_page: 10,
  });

  return (
    <div>
      <h2>RepoSelector</h2>
      {items.length} - {total_count}
      <pre>
        {JSON.stringify(
          items.map((f) => ({
            name: f.full_name,
            visi: f.visibility,
          })),
          null,
          2
        )}
      </pre>
    </div>
  );
}
