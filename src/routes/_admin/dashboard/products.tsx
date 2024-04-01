import { Button } from "@/components/ui/button";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/dashboard/products")({
  component: DashboardProduct,
});

function DashboardProduct() {
  return (
    <div className="my-12 container mx-auto">
      <div className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Products Management
      </div>
      <div className="mt-6">
        <Button variant="outline" asChild>
          <Link to="/dashboard/upload">Add Product</Link>
        </Button>
      </div>
      <div className="mt-12 flex justify-center">
        <div className="text-2xl">No Items</div>
      </div>
    </div>
  );
}
