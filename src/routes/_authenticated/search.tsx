import { createFileRoute } from "@tanstack/react-router";
import Loading from "../../components/loading";
import { useState } from "react";
import ListProducts from "../../components/ListProducts";
import { useDebounce } from "@uidotdev/usehooks";
import { Input } from "@/components/ui/input";
import axios from "axios";
import useSWR from "swr";
import { config } from "@/lib/config";

export const Route = createFileRoute("/_authenticated/search")({
  component: Search,
  pendingComponent: Loading,
});

async function searchProduct(url: string, session: string) {
  const { data } = await axios.get(`${config.SERVER_API_URL}/v1/${url}`, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  return data;
}

function Search() {
  const { session } = Route.useRouteContext();
  const [query, setQuery] = useState<string>("");
  const q = useDebounce(query, 500);

  const { isLoading, data } = useSWR(
    [`product/search?q=${q}`, session],
    ([url, session]) => searchProduct(url, session)
  );

  return (
    <div className="mt-12 container px-4 mx-auto">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder="Search Product"
        className="max-w-3xl mx-auto"
      />
      <div className="my-12">
        {q ? (
          !isLoading && data ? (
            <ListProducts products={data} />
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
    </div>
  );
}
