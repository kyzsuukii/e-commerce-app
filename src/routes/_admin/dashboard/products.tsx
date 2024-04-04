import { Button } from "@/components/ui/button";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { config } from "@/lib/config.ts";
import Loading from "@/components/loading.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const Route = createFileRoute("/_admin/dashboard/products")({
  component: DashboardProduct,
});

async function getAllProduct(session: string) {
  const { data } = await axios.get(`${config.SERVER_API_URL}/v1/product/all`, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  return data;
}

function DashboardProduct() {
  const { session } = Route.useRouteContext();
  const { data, isLoading } = useQuery({
    queryKey: ["product"],
    queryFn: () => getAllProduct(session),
  });

  if (isLoading) return <Loading />;

  return (
    <div className="my-12 container mx-auto">
      <div className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Products Management
      </div>
      <div className="mt-6">
        <Button asChild>
          <Link to="/dashboard/upload">Add Product</Link>
        </Button>
      </div>
      {data ? (
        <div className="my-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.map((product: any) => (
            <Card key={product.id}>
              <CardHeader>
                <CardTitle className="truncate">{product.name}</CardTitle>
                <CardDescription className="truncate">
                  {product.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-w-16 aspect-h-12 object-cover">
                  <LazyLoadImage
                    className="rounded"
                    src={`${config.SERVER_API_URL}/${product.thumbnail}`}
                    alt={product.title}
                  />
                </div>
              </CardContent>
              <CardFooter className="gap-4 flex-wrap">
                <Button variant="outline" asChild>
                  <Link
                    to="/dashboard/product/$productId"
                    params={{
                      productId: product.id,
                    }}
                  >
                    More Info
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex justify-center text-2xl">No Items</div>
      )}
    </div>
  );
}
