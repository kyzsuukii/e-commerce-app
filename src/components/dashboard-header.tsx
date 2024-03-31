import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "@tanstack/react-router";

export default function DashboardHeader() {
  const route = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Button
            onClick={() => route.history.back()}
            variant="ghost"
            className="mr-6 flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Back
          </Button>
        </div>
      </div>
    </header>
  );
}
