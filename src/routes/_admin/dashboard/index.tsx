import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Box, Store, User } from "lucide-react";

export const Route = createFileRoute("/_admin/dashboard/")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="my-12 container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Admin Dashboard
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Link to="/dashboard/products">
          <Card className="hover:scale-105 transition-transform duration-200">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Store strokeWidth={1} size={54} className="text-gray-500" />
                <div>
                  <CardTitle>Products</CardTitle>
                  <CardDescription>Manage product in database</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Link>
        <div>
          <Link to="/dashboard/users">
            <Card className="hover:scale-105 transition-transform duration-200">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <User strokeWidth={1} size={54} className="text-gray-500" />
                  <div>
                    <CardTitle>Users</CardTitle>
                    <CardDescription className="truncate">
                      Manage user roles and access
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>
        </div>
        <div>
          {/* <Link to="/dashboard/users"> */}
          <Card className="cursor-not-allowed hover:scale-105 transition-transform duration-200">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Box strokeWidth={1} size={54} className="text-gray-500" />
                <div>
                  <CardTitle>Order</CardTitle>
                  <CardDescription className="truncate">
                    Manage Order
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
}
