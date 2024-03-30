import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import RegisterForm from "@/components/register-from";

export const Route = createFileRoute("/_auth/register")({
  component: Register,
});

function Register() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <RegisterForm />
      <Toaster position="top-right" />
    </div>
  );
}
