import RepoCards from "@/components/RepoList/RepoCards"
import { RepoSelector } from "@/components/RepoSelector"

export default async function Dashboard() {
  return (
    <main className="flex h-full flex-col gap-4">
      <h2 className="text-xl font-medium">Dashboard</h2>
      <RepoSelector />
      <RepoCards />
    </main>
  )
}
