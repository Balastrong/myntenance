"use client"

import { Star } from "lucide-react"
import { Button } from "../ui/button"
import { toggleFavourite } from "./actions"
import { useOptimistic } from "react"

type Props = { repoId: string; isFavorite: boolean }

export function FavouriteRepoForm({ repoId, isFavorite }: Props) {
  const [optimisticIsFavourite, optimisticToggleFavourite] =
    useOptimistic(isFavorite)

  return (
    <form
      action={async (formData: FormData) => {
        optimisticToggleFavourite((curr) => !curr)
        toggleFavourite(formData)
      }}
    >
      <input type="hidden" name="id" value={repoId} />
      <input
        type="hidden"
        name="isFavorite"
        value={optimisticIsFavourite ? "true" : "false"}
      />
      <Button size={"icon"} variant={"secondary"}>
        <Star className={optimisticIsFavourite ? "text-yellow-400" : ""} />
      </Button>
    </form>
  )
}
