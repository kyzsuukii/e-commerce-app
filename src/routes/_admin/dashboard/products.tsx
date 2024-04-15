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
import { LazyLoadImage } from "react-lazy-load-image-component";
import useSWR from "swr";
import { ChevronDown, Edit, Info, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ProductUpdateForm from "@/components/update-form";
import { Toaster } from "@/components/ui/sonner";

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
  const [open, setOpen] = useState<boolean>(false);
  const [product, setProduct] = useState<object>({});

  const { data, isLoading } = useSWR(
    ["product/all", session],
    ([url, session]) => getAllProduct(url, session)
  );

  if (isLoading) return <Loading />;

  return (
    <div className="my-12 container mx-auto">
      {data && data[0] ? (
        <div className="my-12 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {data.map((product: any, index: number) => (
            <div key={index}>
              <Card>
                <CardHeader>
                  <div className="aspect-w-16 aspect-h-12 object-cover">
                    <LazyLoadImage
                      className="rounded-sm object-cover transition-all hover:scale-105"
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
                <CardFooter>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="h-8 w-8 p-0">
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="w-full justify-start text-muted-foreground"
                        asChild
                      >
                        <Link
                          to="/dashboard/product/$productId"
                          params={{
                            productId: product.id,
                          }}
                        >
                          <Info className="mr-2 h-4 w-4" />
                          Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="w-full justify-start text-muted-foreground"
                        onClick={() => {
                          setOpen(true);
                          setProduct(product);
                        }}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Update
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="w-full justify-start text-red-600"
                        onClick={() => deleteProduct(product.id, session)}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardFooter>
              </Card>
            </div>
          ))}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update product</DialogTitle>
                <DialogDescription>
                  Provide a new information about the product
                </DialogDescription>
              </DialogHeader>
              <ProductUpdateForm data={product} session={session} />
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <div className="font-bold text-2xl">No Items</div>
      )}
      <Toaster />
    </div>
  );
}
