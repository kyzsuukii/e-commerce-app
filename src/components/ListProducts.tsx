import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FaDollarSign, FaStar } from "react-icons/fa6";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function ListProducts({ products }: { products: any }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product: any) => (
        <Card key={product.id}>
          <Link
            to="/product/$productId"
            params={{
              productId: product.id,
            }}
          >
            <CardHeader>
              <CardTitle className="truncate">{product.title}</CardTitle>
              <CardDescription className="truncate">
                {product.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-w-16 aspect-h-12 object-cover">
                <LazyLoadImage
                  className="rounded"
                  src={product.thumbnail}
                  alt={product.title}
                />
              </div>
            </CardContent>
            <CardFooter className="gap-4 flex-wrap">
              <span className="inline-flex items-center gap-1">
                <FaDollarSign />
                <span>{product.price}</span>
              </span>
              <span className="inline-flex items-center gap-1 text-yellow-500">
                <FaStar />
                <span>{product.rating}</span>
              </span>
              <Badge variant="outline">{product.category}</Badge>
            </CardFooter>
          </Link>
        </Card>
      ))}
    </div>
  );
}
