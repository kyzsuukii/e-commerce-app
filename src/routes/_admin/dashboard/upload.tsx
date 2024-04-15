import ProductUploadForm from "@/components/upload-form";
import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner.tsx";

export const Route = createFileRoute("/_admin/dashboard/upload")({
  component: DashboardUploadProduct,
});

function DashboardUploadProduct() {
  const { session } = Route.useRouteContext();
  return (
    <div className="my-12 container mx-auto">
      <ProductUploadForm session={session} />
      <Toaster />
    </div>
  );
}
