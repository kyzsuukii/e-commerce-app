import Loading from "@/components/loading";
import { Toaster } from "@/components/ui/sonner";
import ProductUpdateForm from "@/components/update-form";
import { config } from "@/lib/config";
import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import useSWR from "swr";

export const Route = createFileRoute("/_admin/dashboard/update/$productId")({
  component: UpdateProduct,
});

async function getProductDetails(url: string, session: string) {
  const { data } = await axios.get(`${config.SERVER_API_URL}/v1/${url}`, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  delete data.thumbnail;
  return data;
}

function UpdateProduct() {
  const { productId } = Route.useParams();
  const { session } = Route.useRouteContext();

  const { data, isLoading } = useSWR(
    ["product/get/" + productId, session],
    ([url, session]) => getProductDetails(url, session),
  );

  if (isLoading) return <Loading />;

  return <div className="my-12 container mx-auto">
    <ProductUpdateForm data={data} session={session} />
    <Toaster />
  </div>;
}
