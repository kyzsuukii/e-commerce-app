import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/dashboard/products")({
  component: DashboardProduct,
});

function DashboardProduct() {
  return <div className="my-12 container mx-auto">Dashboard Products</div>;
}
