import { Button } from "@/components/ui/button";
import { Link, createFileRoute } from "@tanstack/react-router";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Info, SquarePen, Trash } from "lucide-react";
import useSWR from "swr";

export const Route = createFileRoute("/_admin/dashboard/products")({
  component: DashboardProduct,
});

async function getAllProduct(url: string, session: string) {
  const { data } = await axios.get(`${config.SERVER_API_URL}/v1/${url}`, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  return data;
}

async function deleteProduct(id: string, session: string) {
  await axios.delete(`${config.SERVER_API_URL}/v1/product/delete`, {
    data: {
      id,
    },
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  window.location.reload();
}

function DashboardProduct() {
  const { session } = Route.useRouteContext();
  const { data, isLoading } = useSWR(
    ["product/all", session],
    ([url, session]) => getAllProduct(url, session)
  );

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
      {data[0] ? (
        <div className="my-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.map((product: any) => (
            <Card
              key={product.id}
              className="hover:scale-105 transition-transform duration-200"
            >
              <CardHeader>
                <div className="aspect-w-16 aspect-h-12 object-cover">
                  <LazyLoadImage
                    className="rounded-sm"
                    src={`${config.SERVER_API_URL}/${product.thumbnail}`}
                    alt={product.title}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="truncate">{product.name}</CardTitle>
                <CardDescription className="truncate">
                  {product.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="gap-4 flex-wrap">
                <Button variant="secondary" size="icon" asChild>
                  <Link
                    to="/dashboard/product/$productId"
                    params={{
                      productId: product.id,
                    }}
                  >
                    <Info size={18} />
                  </Link>
                </Button>
                <Button variant="secondary" size="icon" asChild>
                  <Link
                    to="/dashboard/update/$productId/"
                    params={{
                      productId: product.id,
                    }}
                  >
                    <SquarePen size={18} />
                  </Link>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="icon">
                      <Trash size={18} />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={async () => {
                          await deleteProduct(product.id, session);
                        }}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
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
