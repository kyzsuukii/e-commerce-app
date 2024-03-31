import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Store, User } from "lucide-react";

export const Route = createFileRoute("/_admin/dashboard/")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="my-12 container mx-auto">
      <div className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Admin Dashboard
      </div>
      <div className="mt-12 border p-2 rounded grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Link to="/dashboard/products">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Store strokeWidth={1} size={54} />
                <div>
                  <CardTitle>Products</CardTitle>
                  <CardDescription>Manage product in database</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Link>
        <Card className="hover:cursor-not-allowed">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <User strokeWidth={1} size={54} />
              <div>
                <CardTitle>User Role</CardTitle>
                <CardDescription>Manage user role</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
