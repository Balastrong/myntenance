"use client";

import { Star } from "lucide-react";
import { Button } from "../ui/button";
import { toggleFavourite } from "./actions";
import { useOptimistic } from "react";

type Props = { repoId: string; isFavorite: boolean };

export function FavouriteRepoForm({ repoId, isFavorite }: Props) {
  const [optimisticIsFavourite, optimisticToggleFavourite] = useOptimistic<
    boolean,
    boolean
  >(isFavorite, (_, newIsFavourite) => newIsFavourite);

  return (
    <form
      action={async (formData: FormData) => {
        optimisticToggleFavourite(!optimisticIsFavourite);
        toggleFavourite(formData);
      }}
    >
      <input type="hidden" name="id" value={repoId} />
      <input
        type="hidden"
        name="isFavorite"
        value={optimisticIsFavourite ? "true" : "false"}
      />
      <Button size={"icon"}>
        <Star className={optimisticIsFavourite ? "text-yellow-400" : ""} />
      </Button>
    </form>
  );
}
