import { Star } from "lucide-react";
import { Button } from "../ui/button";
import { toggleFavourite } from "./actions";

type Props = { repoId: string; isFavorite: boolean };
export function FavouriteRepoForm({ repoId, isFavorite }: Props) {
  return (
    <form action={toggleFavourite}>
      <input type="hidden" name="id" value={repoId} />
      <input
        type="hidden"
        name="isFavorite"
        value={isFavorite ? "true" : "false"}
      />
      <Button size={"icon"}>
        <Star className={isFavorite ? "text-yellow-400" : ""} />
      </Button>
    </form>
  );
}
