import { createFileRoute, Link } from "@tanstack/react-router";
import Loading from "../../components/loading";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ListProducts from "../../components/ListProducts";
import { useDebounce } from "@uidotdev/usehooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

export const Route = createFileRoute("/_authenticated/search")({
  loader: getCategories,
  component: Search,
  pendingComponent: Loading,
});

async function getCategories() {
  try {
    const response = await axios.get(
      `https://dummyjson.com/products/categories`
    );
    return response.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

async function searchProduct(product: string) {
  try {
    const response = await axios.get(
      `https://dummyjson.com/products/search?q=${encodeURIComponent(product)}`
    );
    return response.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

function Search() {
  const categories = Route.useLoaderData();

  const [query, setQuery] = useState<string>("");
  const q = useDebounce(query, 500);

  const { isLoading, data } = useQuery({
    queryKey: ["search", q],
    queryFn: () => searchProduct(q),
    staleTime: 500,
    enabled: !!q,
  });

  return (
    <div className="mt-12 container px-4 mx-auto">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder="Search Product"
        className="max-w-3xl mx-auto"
      />
      <div className="mt-8 flex items-center gap-2 flex-wrap">
        {categories.map((category: any, index: number) => (
          <Link
            to="/category/$categoryName"
            params={{
              categoryName: category,
            }}
            key={index}
          >
            <Button variant="outline">{category}</Button>
          </Link>
        ))}
      </div>
      {q ? (
        !isLoading && data.total > 0 ? (
          <ListProducts products={data.products} />
        ) : (
          <div className="mt-12 flex justify-center text-2xl font-bold">
            Items not found
          </div>
        )
      ) : (
        <div className="mt-12 flex justify-center text-2xl font-bold">
          No Items
        </div>
      )}
    </div>
  );
}
