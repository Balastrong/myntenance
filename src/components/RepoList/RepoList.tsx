import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import DeleteRepoForm from "./DeleteRepoForm";

export async function handleDelete(formData: FormData) {
  "use server";

  const id = formData.get("id")!;
  await createClient().from("projects").delete().eq("id", id);
  revalidatePath("/");
}

export default async function RepoList() {
  const supabase = createClient();
  const { data, error } = await supabase.from("projects").select("*");

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Repositories</h2>
      <ul>
        {data.map((repo) => (
          <li key={repo.id}>
            <h3>{repo.name}</h3>
            <p>Owner: {repo.ownerLogin}</p>
            <p>Visibility: {repo.visibility}</p>
            <p>Stars: {repo.stars}</p>
            <p>Open Issues: {repo.openIssues}</p>
            <DeleteRepoForm repoId={repo.id} />
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}
