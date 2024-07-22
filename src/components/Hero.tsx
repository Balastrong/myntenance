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
    <main className="flex flex-col items-center text-center">
      <h2 className="mt-16 max-w-[700px] text-5xl font-bold leading-normal">
        Your next{" "}
        <span className="bg-gradient-to-r from-primary to-green-300 bg-clip-text text-transparent">
          side project
        </span>{" "}
        won&apos;t <span className="text-red-500 line-through">fail</span>{" "}
        <span className="bg-gradient-to-r from-primary to-green-300 bg-clip-text text-transparent">
          this time
        </span>{" "}
        💡
      </h2>
      <p className="my-8 max-w-[800px] leading-normal">
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
