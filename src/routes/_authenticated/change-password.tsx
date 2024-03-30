import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import ChangePasswordForm from "@/components/change-password-form";

export const Route = createFileRoute("/_authenticated/change-password")({
  component: ChangePassword,
  loader: ({ context: { session } }) => session,
});

function ChangePassword() {
  const session = Route.useLoaderData();
  return (
    <div className="my-12 container mx-auto">
      <ChangePasswordForm session={session} />
      <Toaster position="top-right" />
    </div>
  );
}
