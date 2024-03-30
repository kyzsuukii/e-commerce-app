import { Input } from "@/components/ui/input";
import { createFileRoute } from "@tanstack/react-router";
import { FaDollarSign } from "react-icons/fa6";
import { FiMinus, FiPlus, FiTrash } from "react-icons/fi";
import { useCart } from "react-use-cart";

export const Route = createFileRoute("/_authenticated/cart")({
  component: Cart,
});

function Cart() {
  const { isEmpty, items, updateItemQuantity, removeItem } = useCart();

  return (
    <div className="my-12 container mx-auto">
      {!isEmpty ? (
        <>
          <div className="flex justify-between mb-4">
            <button
              onClick={() => items.forEach((item) => removeItem(item.id))}
            >
              Delete All
            </button>
          </div>
          <ul className="space-y-4">
            {items.map((item: any) => (
              <li
                key={item.id}
                className="grid grid-cols-[120px_1fr_120px_80px_80px] gap-6 border-b py-4 items-center"
              >
                {/* image */}
                <div className="aspect-h-10 aspect-w-7">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="truncate">
                  <div className="font-bold">{item.title}</div>
                  <div className="text-primary text-sm">{item.description}</div>
                  {item.quantity > item.stock && (
                    <div className="text-red-600 text-sm">
                      Out of Stock. Max purchase: {item.stock}
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      updateItemQuantity(item.id, item.quantity - 1)
                    }
                    disabled={item.quantity === 0}
                  >
                    <FiMinus />
                  </button>
                  <Input
                    type="number"
                    className="text-primary text-center"
                    min={0}
                    max={item.stock}
                    value={item.quantity}
                    onChange={(e) => {
                      if (e.target.valueAsNumber < 0) return;
                      updateItemQuantity(item.id, e.target.valueAsNumber);
                    }}
                  />
                  <button
                    onClick={() =>
                      updateItemQuantity(item.id, item.quantity + 1)
                    }
                  >
                    <FiPlus />
                  </button>
                </div>

                <div className="text-primary inline-flex items-center gap-1 truncate">
                  <FaDollarSign />
                  {item.quantity > 0
                    ? item.quantity > item.stock
                      ? item.price * item.stock
                      : item.price * item.quantity
                    : 0}
                </div>
                <button onClick={() => removeItem(item.id)}>
                  <FiTrash className="text-gray-500" />
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="font-bold text-2xl">Carts is Empty</div>
      )}
    </div>
  );
}
