import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import LoginForm from "@/components/login-form";

export const Route = createFileRoute("/_auth/login")({
  component: Login,
});

function Login() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <LoginForm />
      <Toaster position="top-right" />
    </div>
  );
}
