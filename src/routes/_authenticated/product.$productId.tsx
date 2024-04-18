import { createFileRoute } from "@tanstack/react-router";
import Loading from "@/components/loading";
import Detail from "@/components/Detail";
import axios from "axios";
import { config } from "@/lib/config";
import useSWR from "swr";

export const Route = createFileRoute("/_authenticated/product/$productId")({
  component: ProductDetail,
});

function ProductDetail() {
  const { productId } = Route.useParams();
  const { session } = Route.useRouteContext();

  async function getProductDetails([url]: string[]) {
    const { data } = await axios.get(`${config.SERVER_API_URL}/v1/${url}`, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
    return data;
  }

  const { data, isLoading } = useSWR(
    ["product/get/" + productId],
    getProductDetails
  );

  if (isLoading) return <Loading />;

  return (
    <div className="mt-12 container mx-auto">
      <Detail product={data} />
    </div>
  );
}
