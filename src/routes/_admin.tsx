import { Button } from "@/components/ui/button";
import { Link, Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { Box, Store, Upload, User } from "lucide-react";

export const Route = createFileRoute("/_admin")({
  beforeLoad: async ({ context: { session, isAdmin } }) => {
    if (!session || !isAdmin) {
      throw redirect({ to: "/" });
    }
  },
  component: () => (
    <div className="block lg:grid lg:grid-cols-[230px,1fr]">
      <Sidebar />
      <div>
        <Outlet />
      </div>
    </div>
  ),
});

export function Sidebar() {
  return (
    <div className="pb-12 hidden lg:block">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Dashboard
          </h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start" asChild>
             <Link to="/dashboard/products">
                <Store className="mr-2 h-4 w-4" />
                Products
             </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link to="/dashboard/users">
                <User className="mr-2 h-4 w-4" />
                Users
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link to="/dashboard/orders">
                <Box className="mr-2 h-4 w-4" />
                Orders
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link to="/dashboard/upload">
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
