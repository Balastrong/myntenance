import ServerAuthButton from "./server-auth-button";

export default async function Header() {
  return (
    <header className="flex gap-2 items-center">
      <h1>Header</h1>
      <ServerAuthButton />
    </header>
  );
}
