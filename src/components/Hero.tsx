import { login } from "@/app/auth/actions";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { HeroParticles } from "./HeroParticles";
import { SignInButton } from "./SignInButton";
import { Button } from "./ui/button";
import SparklesText from "./magicui/sparkles-text";
import { FadeText } from "./magicui/fade-text";
import { BorderBeam } from "./magicui/border-beam";

type Props = {
  user: User | null;
};

export default async function Hero({ user }: Props) {
  return (
    <main className="relative flex h-full flex-col items-center text-center">
      <FadeText
        framerProps={{
          show: { transition: { duration: 0.8 } },
        }}
      >
        <h2 className="mt-16 max-w-[700px] text-5xl font-bold leading-normal">
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
      </FadeText>
      <FadeText
        framerProps={{
          show: { transition: { delay: 0.5, duration: 1 } },
        }}
      >
        <p className="my-8 max-w-[800px] leading-normal">
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
          <form action={login}>
            <SignInButton />
          </form>
        )}
      </FadeText>
    </main>
  );
}
