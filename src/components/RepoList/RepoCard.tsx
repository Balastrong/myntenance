import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import { FavouriteRepoForm } from "./FavouriteRepoForm";
import { RepoWithTasks } from "./RepoCards";

type Props = {
  repo: RepoWithTasks[number];
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
      <CardContent>
        Open Tasks:{" "}
        {repo.tasks.filter(({ isCompleted }) => !isCompleted).length}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Link href={`/dashboard/${repo.id}`}>
          <Button>View -&gt;</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
