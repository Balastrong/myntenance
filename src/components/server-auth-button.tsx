import { login, logout } from "@/app/auth/actions";
import { createClient } from "@/lib/supabase/server";
import { Button } from "./ui/button";

export default async function ServerAuthButton() {
  const {
    data: { user },
  } = await createClient().auth.getUser();

  return (
    <div>
      {user ? (
        <>
          <form action={logout}>
            <p>Hey {user.user_metadata.user_name}</p>
            <Button>Sign Out</Button>
          </form>
        </>
      ) : (
        <form action={login}>
          <Button formAction={login}>Sign In</Button>
        </form>
      )}
    </div>
  );
}
