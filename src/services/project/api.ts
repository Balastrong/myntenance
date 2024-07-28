import { SupabaseClient } from "@supabase/supabase-js";

export const getProject = async (projectId: string, client: SupabaseClient) => {
  const { data: project } = await client
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .single();

  return project;
};
