import { createFileRoute } from "@tanstack/react-router";
import Loading from "../../components/loading";
import ListProducts from "../../components/ListProducts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const Route = createFileRoute("/_authenticated/category/$categoryName")({
  loader: ({ params: { categoryName } }) => categoryName,
  component: Category,
  pendingComponent: Loading,
});

async function getCategory(category: string) {
  try {
    const response = await axios.get(
      `https://dummyjson.com/products/category/${category}`
    );
    return response.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

function Category() {
  const categoryName = Route.useLoaderData();

  const { data, isLoading } = useQuery({
    queryKey: ["product", categoryName],
    queryFn: () => getCategory(categoryName),
  });

  return (
    <div className="container mx-auto my-12">
      {isLoading ? <Loading /> : <ListProducts products={data.products} />}
    </div>
  );
}
