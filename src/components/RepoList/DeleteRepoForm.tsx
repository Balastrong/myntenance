import { handleDelete } from "./actions";
import { Button } from "../ui/button";

export default function DeleteRepoForm({ repoId }: { repoId: string }) {
  return (
    <form action={handleDelete}>
      <input type="hidden" name="id" value={repoId} />
      <Button size={"sm"} variant={"destructive"}>
        Delete
      </Button>
    </form>
  );
}
