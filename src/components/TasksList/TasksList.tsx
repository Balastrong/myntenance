"use server";

import { createTask, getOwnTasks } from "@/services/tasks/api";
import { revalidateTag } from "next/cache";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Task } from "./Task";

type Props = {
  projectId: string;
};

export default async function TasksList({ projectId }: Props) {
  const { data } = await getOwnTasks({ projectId });

  // TODO Optimistic
  async function createTaskAction(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;

    await createTask({ title, projectId });

    revalidateTag("tasks");
  }

  return (
    <div className="max-w-[600px]">
      <ul className="flex flex-col gap-2 mb-4">
        {data?.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </ul>
      <form
        action={createTaskAction}
        // onSubmit={async (e) => {
        //   e.preventDefault();

        //   const formData = new FormData(e.currentTarget);
        //   const title = formData.get("title") as string;

        //   //mutate({ title, projectId });
        //   e.currentTarget.reset();
        // }}
        className="flex gap-2"
      >
        <Input name="title" placeholder="Add a task" />
        <Button type="submit" className="w-40">
          Add
        </Button>
      </form>
    </div>
  );
}
