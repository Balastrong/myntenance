"use client";

import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
import { updateProjectNotes } from "../RepoList/actions";

type Props = {
  projectId: string;
  projectNotes: string;
};
export function Notes({ projectNotes, projectId }: Props) {
  const [title, setTitle] = useState(projectNotes);
  const { debouncedValue: debouncedTitle } = useDebouncedValue(title, 500);

  useEffect(() => {
    if (debouncedTitle !== projectNotes) {
      updateProjectNotes(projectId, debouncedTitle);
    }
  }, [debouncedTitle, projectId, projectNotes]);

  return <Textarea onChange={(e) => setTitle(e.target.value)} value={title} />;
}
