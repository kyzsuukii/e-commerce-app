import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/dashboard/upload")({
  component: DashboardUpload,
});

function DashboardUpload() {
  return <div className="my-12 container mx-auto">Dashboard Upload</div>;
}
