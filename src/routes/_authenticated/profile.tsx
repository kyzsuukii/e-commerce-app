import Error from "@/components/error";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { config } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { UserCircle } from "lucide-react";

export const Route = createFileRoute("/_authenticated/profile")({
  component: Profile,
  loader: ({ context: { session } }) => session,
  pendingComponent: Loading,
});

async function getProfile(token: string) {
  try {
    const { data } = await axios.get(`${config.SERVER_API_URL}/v1/user/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error: any) {
    if (error.response.status == 401) {
      // delete session
      // redirect
    }
  }
}

function Profile() {
  const session = Route.useLoaderData();
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["profile", session],
    queryFn: () => getProfile(session),
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error error={error} />;
  }

  return (
    <div className="my-12 container mx-auto">
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Profile information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className=" flex items-center space-x-4 rounded-md border p-4">
            <UserCircle />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">{data.role}</p>
              <p className="text-sm text-muted-foreground">{data.email} </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link to="/change-password">Change Password</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
