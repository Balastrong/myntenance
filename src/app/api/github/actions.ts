"use server";
import { getOctokit } from "@/lib/github";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function storeRepository(fullName: string) {
  "use server";

  const [owner, repo] = fullName.split("/");

  const {
    data: { user },
  } = await createClient().auth.getUser();

  if (!user) {
    throw new Error("User not found");
  }

  const { data: existingRepo } = await createClient()
    .from("projects")
    .select("*")
    .eq("name", repo)
    .eq("ownerLogin", owner)
    .eq("user", user.id)
    .limit(1)
    .maybeSingle();

  if (existingRepo) {
    throw new Error("Repository already exists");
  }

  const octokit = await getOctokit();

  const { data } = await octokit.rest.repos.get({
    owner,
    repo,
  });

  await createClient()
    .from("projects")
    .insert({
      name: data.name,
      ownerLogin: data.owner.login,
      ownerType: data.owner.type,
      visibility: data.visibility ?? data.private ? "private" : "public",
      stars: data.stargazers_count,
      openIssues: data.open_issues_count,
    });

  revalidatePath("/", "layout");

  //return db("repositories").insert(repo);
}

// fullName: string;
// ownerLogin: string;
// ownerType: string;
// visibility: string;
// stars: number;
// openIssues: number;
