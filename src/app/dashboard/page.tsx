import { RepoSelector } from "@/components/RepoSelector";

export default async function Dashboard() {
  return (
    <main>
      <h2 className="text-xl font-medium mb-2">Dashboard</h2>
      <RepoSelector />
    </main>
  );
}
