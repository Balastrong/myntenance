"use client";
import { login } from "@/app/auth/actions";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export const SignInButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button formAction={login} disabled={pending}>
      Sign In
    </Button>
  );
};
