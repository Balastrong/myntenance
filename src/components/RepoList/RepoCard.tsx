import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
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
            <div className="flex items-center gap-1">
              <Image
                width={100}
                height={100}
                src={`https://github.com/${repo.ownerLogin}.png?size=80`}
                alt={repo.ownerLogin}
                className={`size-8 bg-gray-300 ${
                  repo.ownerType === "User" ? "rounded-full" : "rounded-md"
                }`}
              />
              {repo.ownerLogin}
            </div>
            <div className="text-lg">
              <a
                href={`https://github.com/${repo.ownerLogin}/${repo.name}`}
                target="_blank"
                className="cursor-pointer"
              >
                {repo.name}
              </a>
            </div>
          </div>
          <FavouriteRepoForm repoId={repo.id} isFavorite={repo.isFavourite} />
        </div>
        <CardDescription>
          Visibility: <span className="capitalize">{repo.visibility}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        Open Tasks:{" "}
        {repo.tasks.filter(({ status }) => status === "todo").length}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Link href={`/dashboard/${repo.id}`}>
          <Button>View -&gt;</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
