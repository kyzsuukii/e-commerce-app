import { useCart } from "react-use-cart";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { BiCart } from "react-icons/bi";
import { FaDollarSign, FaStar } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Box } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export default function Detail({ product }: any) {
  const { addItem, removeItem } = useCart();

  return (
    <>
      <div className="grid items-center gap-6 xl:grid-cols-2 mb-8 mx-10">
        <Carousel className="w-full max-w-md border rounded">
          <CarouselContent>
            {product.images.map((image: any, index: number) => (
              <CarouselItem key={index}>
                <div className="aspect-w-16 aspect-h-12">
                  <LazyLoadImage
                    className="rounded-md object-fill"
                    src={image}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div>
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
            {product.title}
          </h1>
          <blockquote className="mt-6 border-l-2 pl-6 italic">
            {product.description}
          </blockquote>
          <ul className="my-6 ml-6 [&>li]:mt-2 font-semibold flex items-center gap-6">
            <li>
              <span className="inline-flex items-center gap-1">
                <FaDollarSign />
                <span>{product.price}</span>
              </span>
            </li>
            <li>
              <span className="inline-flex items-center gap-1 text-yellow-500">
                <FaStar />
                <span>{product.rating}</span>
              </span>
            </li>
            <li>
              <span className="inline-flex items-center gap-1">
                <Box />
                <span>{product.stock}</span>
              </span>
            </li>
          </ul>
          <div className="mb-6">
            <Button
              onClick={() => {
                addItem(product);
                toast.success("Product added to cart", {
                  description: "Check your cart",
                  action: {
                    label: "undo",
                    onClick: () => removeItem(product.id),
                  },
                });
              }}
              className="inline-flex gap-1 items-center font-semibold"
            >
              <BiCart style={{ fontSize: "1.4em" }} /> Add to cart
            </Button>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}
