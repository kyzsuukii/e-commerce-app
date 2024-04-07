import { DataTable } from "@/components/data-table";
import Loading from "@/components/loading";
import { Toaster } from "@/components/ui/sonner";
import { config } from "@/lib/config";
import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import useSWR from "swr";

export const Route = createFileRoute("/_admin/dashboard/users")({
  component: Users,
});

async function getUsers(url: string, session: string) {
  const { data } = await axios.get(`${config.SERVER_API_URL}/v1/${url}`, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  return data.users;
}

function Users() {
  const { session } = Route.useRouteContext();
  const { data, isLoading } = useSWR(["user/all", session], ([url, session]) =>
    getUsers(url, session)
  );

  if (isLoading) return <Loading />;

  return (
    <div className="my-12 container mx-auto">
      <DataTable data={data} />
      <Toaster />
    </div>
  );
}
