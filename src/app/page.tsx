import Hero from "@/components/Hero";
import { HeroParticles } from "@/components/HeroParticles";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function Home() {
  const {
    data: { user },
  } = await createClient().auth.getUser();

  return (
    <>
      <HeroParticles />
      <Hero user={user} />
    </>
  );
}
