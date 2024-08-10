import { login } from "@/app/auth/actions";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import BlurFade from "./magicui/blur-fade";
import { BorderBeam } from "./magicui/border-beam";
import SparklesText from "./magicui/sparkles-text";
import { SignInButton } from "./SignInButton";
import { Button } from "./ui/button";

type Props = {
  user: User | null;
};

export default async function Hero({ user }: Props) {
  return (
    <div className="mt-10 flex flex-col items-center gap-10 px-4">
      <BlurFade delay={0.1}>
        <h2 className="max-w-[700px] text-4xl font-bold leading-normal md:text-6xl">
          Your next{" "}
          <span className="bg-gradient-to-r from-primary to-green-300 bg-clip-text text-transparent">
            side project
          </span>{" "}
          won&apos;t <span className="text-red-500 line-through">fail</span>{" "}
          <SparklesText>
            <span className="bg-gradient-to-r from-primary to-green-300 bg-clip-text text-transparent">
              this time
            </span>
          </SparklesText>
          💡
        </h2>
      </BlurFade>
      <BlurFade delay={0.25}>
        <p className="mb-6 max-w-[800px] text-base leading-normal md:text-xl">
          Keep track of tasks and plans for your side projects, remain motivated
          and accountable.
          <br />
          Your next side project will be a success!
        </p>
        {user ? (
          <Button asChild>
            <Link href="/dashboard" className="relative">
              Go to dashboard -&gt;
              <BorderBeam size={55} borderWidth={2} duration={4} />
            </Link>
          </Button>
        ) : (
          <form action={login} className="mx-auto w-32">
            <SignInButton />
          </form>
        )}
      </BlurFade>
    </div>
  );
}
