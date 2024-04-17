import { createFileRoute } from "@tanstack/react-router";
import Loading from "../../components/loading";
import ListProducts from "../../components/ListProducts";
import axios from "axios";
import { config } from "@/lib/config";
import useSWR from "swr";

export const Route = createFileRoute("/_authenticated/products")({
  component: Products,
});

function Products() {
  const { session } = Route.useRouteContext();

  async function getAllProduct([url]: string[]) {
    const { data } = await axios.get(`${config.SERVER_API_URL}/v1/${url}`, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
    return data;
  }

  const { data, isLoading } = useSWR(["product/all"], getAllProduct);

  if (isLoading) return <Loading />;

  return (
    <div className="my-12 container mx-auto">
      {data && data[0] ? (
        <ListProducts products={data} />
      ) : (
        <div className="flex justify-center text-2xl">No Items</div>
      )}
    </div>
  );
}
