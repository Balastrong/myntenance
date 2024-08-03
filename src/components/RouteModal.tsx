"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "./ui/dialog";

type Props = {
  children: React.ReactNode;
};
export function RouteModal({ children }: Props) {
  const router = useRouter();

  const handleOpenChange = () => {
    router.back();
  };

  return (
    <Dialog open={true} onOpenChange={handleOpenChange}>
      <DialogContent className="w-full">{children}</DialogContent>
    </Dialog>
  );
}
