import { useCart } from "react-use-cart";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { BiCart } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { Box, DollarSign } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { config } from "@/lib/config";

export default function Detail({ product }: any) {
  const { addItem, removeItem } = useCart();

  return (
    <>
      <div className="grid items-center gap-6 xl:grid-cols-2 mb-8 mx-10">
        <div className="max-w-md aspect-w-16 aspect-h-9">
          <LazyLoadImage
            className="rounded-md object-fill"
            src={`${config.SERVER_API_URL}/${product.thumbnail}`}
          />
        </div>
        <div>
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
            {product.name}
          </h1>
          <blockquote className="mt-6 border-l-2 pl-6 italic">
            {product.description}
          </blockquote>
          <ul className="my-6 ml-6 [&>li]:mt-2 font-semibold flex items-center gap-6">
            <li>
              <span className="inline-flex items-center gap-1">
                <DollarSign size={16} />
                <span>{product.price}</span>
              </span>
            </li>
            <li>
              <span className="inline-flex items-center gap-1">
                <Box size={16} />
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
