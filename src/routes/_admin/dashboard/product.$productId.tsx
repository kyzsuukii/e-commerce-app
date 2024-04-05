import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { config } from "@/lib/config.ts";
import Loading from "@/components/loading.tsx";
import useSWR from "swr";

export const Route = createFileRoute("/_admin/dashboard/product/$productId")({
  component: ProductDetails,
});

async function getProductDetails(url: string, session: string) {
  const { data } = await axios.get(`${config.SERVER_API_URL}/v1/${url}`, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  return data;
}

function ProductDetails() {
  const { productId } = Route.useParams();
  const { session } = Route.useRouteContext();

  const { data, isLoading } = useSWR(
    ["product/get/" + productId, session],
    ([url, session]) => getProductDetails(url, session),
  );

  if (isLoading) return <Loading />;

  return (
    <div className="my-12 container mx-auto">
      <div className="bg-background shadow-md rounded-lg p-8 mx-auto max-w-md">
        <h1 className="text-3xl font-bold mb-4">{data.name}</h1>
        <p className="text-primary mb-4">{data.description}</p>
        <div className="flex items-center justify-between mb-4">
          <p className="text-primary">Price: ${data.price}</p>
          <p className="text-primary">Stock: {data.stock}</p>
        </div>
        <div className="w-full mx-auto aspect-w-16 aspect-h-12">
          <img
            src={`${config.SERVER_API_URL}/${data.thumbnail}`}
            alt={data.name}
            className="w-full rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
}
