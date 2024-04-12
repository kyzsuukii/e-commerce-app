import Loading from "@/components/loading";
import { OrderTable } from "@/components/order-table";
import { config } from "@/lib/config";
import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import useSWR from "swr";

export const Route = createFileRoute("/_admin/dashboard/orders")({
  component: Order,
});

async function getOrder(url: string, session: string) {
  const { data } = await axios.get(`${config.SERVER_API_URL}/v1/${url}`, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  return data;
}

function Order() {
  const { session } = Route.useRouteContext();
  const { data, isLoading } = useSWR(["order/get", session], ([url, session]) =>
    getOrder(url, session)
  );

  if (isLoading) return <Loading />;

  return (
    <div className="my-12 container mx-auto">
      {data && data[0] ? (
        <OrderTable data={data} />
      ) : (
        <div className="font-bold text-2xl">Order list is empty</div>
      )}
    </div>
  );
}
