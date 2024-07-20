import DeleteRepoForm from "@/components/RepoList/DeleteRepoForm";
import Tasks from "@/components/TasksList/Tasks";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
        <Link href={"./"}>
          <Button variant={"ghost"}>&lt;-</Button>
        </Link>
        <h1 className="text-xl font-semibold">{repository.full_name}</h1>
      </div>
      <h3 className="text-lg">Tasks</h3>
      <Tasks projectId={projectId} />
      <Card className="max-w-[800px]">
        <CardHeader>
          <CardTitle>Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            <div>
              <h5 className="font-semibold">Delete Project</h5>
              Deleting the project will permanently remove all associated data!
            </div>
            <DeleteRepoForm repoId={projectId} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
