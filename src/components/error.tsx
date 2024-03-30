import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { BiError } from "react-icons/bi";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="my-12 container mx-auto">
      <div className="flex flex-col items-center justify-center space-y-6">
        <BiError size={64} />
        <div className="text-center text-2xl font-semibold">{error.name}</div>
        <div className="italic">"{error.message}"</div>
        <Button asChild>
          <Link to="/">back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
