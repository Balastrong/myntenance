import HeaderUser from "./header-user";

export default async function Header() {
  return (
    <header className="flex gap-2 items-center justify-between max-w-[1000px] m-auto w-full p-4">
      <h1 className="text-2xl font-semibold">Myntenance</h1>
      <HeaderUser />
    </header>
  );
}
