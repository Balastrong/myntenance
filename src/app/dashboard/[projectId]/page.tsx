import DeleteRepoForm from "@/components/RepoList/DeleteRepoForm";
import Tasks from "@/components/TasksList/Tasks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { getRepositoryDetails } from "@/lib/github";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import Image from "next/image";

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

  const repository = await getRepositoryDetails(
    project.ownerLogin,
    project.name
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href={"./"}>
            <Button variant={"ghost"}>&lt;-</Button>
          </Link>
          <Image
            width={100}
            height={100}
            src={`https://github.com/${repository.owner.login}.png?size=80`}
            alt={repository.owner.login}
            className={`size-8 bg-gray-300 mr-2 ${
              repository.owner.type === "User" ? "rounded-full" : "rounded-md"
            }`}
          />
          <h1 className="text-xl font-semibold">{repository.full_name}</h1>
          <Badge variant={"outline"} className="ml-2">
            {repository.private ? "Private" : "Public"}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <DetailItem
            label="Last Commit"
            value={
              repository.lastCommit.commit.author?.date
                ? new Date(
                    repository.lastCommit.commit.author.date
                  ).toLocaleDateString()
                : ""
            }
          />
          <DetailItem
            label="Stars"
            value={repository.stargazers_count.toString()}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <DetailItem label="Forks" value={repository.forks_count.toString()} />
        <DetailItem
          label="Issues"
          value={repository.open_issues_count.toString()}
        />
        <DetailItem label="Language" value={repository.language?.toString()} />
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

const DetailItem = ({
  label,
  value,
}: {
  label: string;
  value: string | undefined;
}) => (
  <div className="flex items-center gap-1">
    <Label className="font-semibold">{label}:</Label>
    <small>{value}</small>
  </div>
);
