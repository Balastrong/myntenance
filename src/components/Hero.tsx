import { User } from "@supabase/supabase-js";
import { Button } from "./ui/button";
import Link from "next/link";
import { SignInButton } from "./SignInButton";
import { login } from "@/app/auth/actions";

type Props = {
  user: User | null;
};

export default function Hero({ user }: Props) {
  return (
    <main className="flex items-center flex-col text-center ">
      <h2 className="text-5xl font-bold mt-16 max-w-[700px] leading-normal">
        Your next{" "}
        <span className="from-red-200 to-blue-800 bg-gradient-to-r bg-clip-text text-transparent">
          side project
        </span>{" "}
        won&apos;t <span className="line-through text-red-500">fail</span>{" "}
        <span className="from-red-200 to-blue-800 bg-gradient-to-r bg-clip-text text-transparent">
          this time
        </span>{" "}
        💡
      </h2>
      <p className="max-w-[800px] my-8 leading-normal">
        Keep track of tasks and plans for your side projects, remain motivated
        and accountable.
        <br />
        Your next side project will be a success!
      </p>
      {user ? (
        <Button asChild>
          <Link href="/dashboard">Go to dashboard -&gt;</Link>
        </Button>
      ) : (
        <form action={login}>
          <SignInButton />
        </form>
      )}
    </main>
  );
}
