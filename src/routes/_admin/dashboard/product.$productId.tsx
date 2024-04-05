import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { config } from "@/lib/config.ts";
import Loading from "@/components/loading.tsx";
import useSWR from "swr";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FaDollarSign } from "react-icons/fa6";
import { Box, SquarePen, Trash } from "lucide-react";
import { Toaster } from "@/components/ui/sonner.tsx";
import { Button } from "@/components/ui/button.tsx";

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
      <div className="grid items-center gap-4 xl:grid-cols-2 mb-8 mx-10">
        <div className="max-w-sm min-h- aspect-w-16 aspect-h-9">
          <LazyLoadImage
            className="rounded-md object-fill"
            src={`${config.SERVER_API_URL}/${data.thumbnail}`}
          />
        </div>
        <div>
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
            {data.name}
          </h1>
          <blockquote className="mt-6 border-l-2 pl-6 italic">
            {data.description}
          </blockquote>
          <ul className="my-6 [&>li]:mt-2 font-semibold flex items-center gap-6">
            <li>
              <span className="inline-flex items-center gap-1">
                <FaDollarSign />
                <span>{data.price}</span>
              </span>
            </li>
            {/*<li>*/}
            {/*<span className="inline-flex items-center gap-1 text-yellow-500">*/}
            {/*  <FaStar />*/}
            {/*  <span>{data.rating}</span>*/}
            {/*</span>*/}
            {/*</li>*/}
            <li>
              <span className="inline-flex items-center gap-1">
                <Box />
                <span>{data.stock}</span>
              </span>
            </li>
          </ul>
          <div className="flex items-center gap-4">
            <Button variant="secondary" size="icon">
              <SquarePen />
            </Button>
            <Button variant="destructive" size="icon">
              <Trash />
            </Button>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
