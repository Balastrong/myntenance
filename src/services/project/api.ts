import { DatabaseClient } from "@/lib/supabase/types";

export const getProject = async (projectId: string, client: DatabaseClient) => {
  const { data: project } = await client
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .single();

  return project;
};
