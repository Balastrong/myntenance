"use client";
import { useGitHubRepositories } from "@/hooks/useGitHubRepositories";
import { useState } from "react";

export function RepoSelector() {
  const [query, setQuery] = useState("react-query");
  const { data } = useGitHubRepositories(query);
  return (
    <div>
      <h2>RepoSelector</h2>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      {data?.items.length} - {data?.total_count}
      <pre>{JSON.stringify(data?.items, null, 2)}</pre>
    </div>
  );
}
