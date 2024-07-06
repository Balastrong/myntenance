import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Tables } from "@/lib/supabase/types.gen";
import DeleteRepoForm from "./DeleteRepoForm";
import { FavouriteRepoForm } from "./FavouriteRepoForm";

type Props = {
  repo: Tables<"projects">;
};

export const RepoCard = ({ repo }: Props) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <div>{repo.ownerLogin}</div>
            <div className="text-lg">{repo.name}</div>
          </div>
          <FavouriteRepoForm repoId={repo.id} isFavorite={repo.isFavourite} />
        </div>
        <CardDescription>
          Visibility: <span className="capitalize">{repo.visibility}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>[Myntenance Data]</CardContent>
      <CardFooter className="flex justify-end">
        <DeleteRepoForm repoId={repo.id} />
      </CardFooter>
    </Card>
  );
};
