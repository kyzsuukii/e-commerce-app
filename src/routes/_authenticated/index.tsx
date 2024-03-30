import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/")({
  component: Home,
});

function Home() {
  return (
    <div className="container mx-auto">
      <div className="max-w-7xl px-6 py-20">
        <div className="flex flex-col lg:flex-row lg:items-center">
          <div className="mb-10 lg:mb-0 lg:w-1/2">
            <h2 className="text-4xl font-bold mb-4">
              Welcome to our Web Ecommerce
            </h2>
            <p className="text-primary mb-6">
              Shop from the comfort of your home with our user-friendly
              interface and secure payment options.
            </p>
            <Button asChild>
              <Link to="/products">Products</Link>
            </Button>
          </div>
          <div className="mt-10 lg:mt-0 lg:w-1/2">
            <img
              src="/hero.jpg"
              alt="Hero image"
              className="w-full rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
