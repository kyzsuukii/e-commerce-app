export default function ProductDetail({ product }: { product: any }) {
  return (
    <div>
      <h1 className="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-primary my-2">
        {product?.name}
      </h1>
      <p className="text-sm leading-none text-muted-foreground">
        {product?.description}
      </p>
      <div className="py-4 border-b border-muted flex items-center justify-between">
        <p className="text-base leading-4 text-primary">
          Price
          </p>
        <div className="flex items-center justify-center">
          <p className="text-sm leading-none text-primary mr-3">
            {product?.price}
          </p>
        </div>
      </div>
      <div className="py-4 border-b border-muted flex items-center justify-between">
        <p className="text-base leading-4 text-primary">Stock</p>
        <div className="flex items-center justify-center">
          <p className="text-sm leading-none text-primary mr-3">
            {product?.stock}
          </p>
        </div>
      </div>
      <div className="py-4 border-b border-muted flex items-center justify-between">
        <p className="text-base leading-4 text-primary">Category</p>
        <div className="flex items-center justify-center">
          <p className="text-sm leading-none text-primary mr-3">
            {product?.category}
          </p>
        </div>
      </div>
    </div>
  );
}
