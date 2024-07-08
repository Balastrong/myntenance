import DeleteRepoForm from "@/components/RepoList/DeleteRepoForm";
import Tasks from "@/components/TasksList/Tasks";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Octokit } from "octokit";

export default async function Page({
  params: { projectId },
}: {
  params: { projectId: string };
}) {
  const { data: project } = await createClient()
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .single();

  if (!project) {
    return <div>Repository not found</div>;
  }

  const {
    data: { session },
  } = await createClient().auth.getSession();

  const { data: repository } = await new Octokit({
    auth: session?.provider_token,
  }).rest.repos.get({
    owner: project.ownerLogin,
    repo: project.name,
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <Link href={"../dashboard"}>
          <Button variant={"ghost"}>&lt;-</Button>
        </Link>
        <h1 className="text-xl font-semibold">{repository.full_name}</h1>
      </div>
      <h3 className="text-lg">Tasks</h3>
      <Tasks projectId={projectId} />
      <DeleteRepoForm repoId={projectId} />
    </div>
  );
}
