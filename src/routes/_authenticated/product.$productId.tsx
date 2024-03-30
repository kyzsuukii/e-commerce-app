import { createFileRoute } from "@tanstack/react-router";
import Loading from "@/components/loading";
import { useQuery } from "@tanstack/react-query";
import Detail from "@/components/Detail";
import axios from "axios";

export const Route = createFileRoute("/_authenticated/product/$productId")({
  loader: ({ params: { productId } }) => productId,
  component: ProductDetail,
});

async function getProduct(id: string) {
  try {
    const response = await axios.get(`https://dummyjson.com/product/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

function ProductDetail() {
  const productId = Route.useLoaderData();

  const { data, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId),
  });

  return (
    <div className="mt-12 container mx-auto">
      {isLoading ? <Loading /> : <Detail product={data} />}
    </div>
  );
}
