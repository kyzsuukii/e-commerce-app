import { Button } from "./ui/button";
import { useRouter } from "@tanstack/react-router";
import { BiHome } from "react-icons/bi";

export default function DashboardHeader() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Button
            onClick={() => router.navigate({ to: "/" })}
            variant="ghost"
            className="mr-6 flex items-center gap-2"
          >
            <BiHome size={20} />
            Home
          </Button>
        </div>
      </div>
    </header>
  );
}
