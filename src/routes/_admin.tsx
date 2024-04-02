import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin")({
  beforeLoad: async ({ context: { session, isAdmin } }) => {
    if (!session || !isAdmin) {
      throw redirect({ to: "/" });
    }
  },
});
