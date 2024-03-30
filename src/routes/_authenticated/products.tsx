import { createFileRoute } from "@tanstack/react-router";
import Loading from "../../components/loading";
import ListProducts from "../../components/ListProducts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const Route = createFileRoute("/_authenticated/products")({
  component: Products,
});

async function getAllProduct() {
  try {
    const response = await axios.get(`https://dummyjson.com/products?limit=0`);
    return response.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

function Products() {
  const { isLoading, data } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProduct,
  });

  return (
    <div className="my-12 container mx-auto">
      {isLoading ? <Loading /> : <ListProducts products={data.products} />}
    </div>
  );
}
