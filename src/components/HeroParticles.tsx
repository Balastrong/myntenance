"use client";

import { useTheme } from "next-themes";
import Particles from "./magicui/particles";

export function HeroParticles() {
  const { theme } = useTheme();

  return (
    <Particles
      className="pointer-events-none absolute inset-0 z-0"
      quantity={250}
      ease={100}
      color={theme === "dark" ? "#ffffff" : "#000000"}
      refresh
    />
  );
}
