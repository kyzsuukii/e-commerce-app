import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { config } from "@/lib/config";
import { createFileRoute } from "@tanstack/react-router";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { FaDollarSign } from "react-icons/fa6";
import { FiMinus, FiPlus, FiTrash } from "react-icons/fi";
import { useCart } from "react-use-cart";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

export const Route = createFileRoute("/_authenticated/cart")({
  component: Cart,
});

async function createOrder([url, session]: any, { arg }: { arg: any }) {
  try {
    const { data, status } = await axios.post(
      `${config.SERVER_API_URL}/v1/${url}`,
      arg,
      {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      }
    );
    if (status === 200) {
      return toast.success(data.msg);
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status == 401) {
        localStorage.clear();
        window.location.reload();
      }
      return toast.error(error.response?.data.errors[0].msg);
    } else {
      return toast.error("An unexpected error occurred");
    }
  }
}

const Spinner = () => (
  <div className="border-background h-5 w-5 animate-spin rounded-full border-2 border-t-blue-600" />
);

function Cart() {
  const { session } = Route.useRouteContext();

  const { isEmpty, items, updateItemQuantity, removeItem } = useCart();

  const { trigger, isMutating } = useSWRMutation(
    ["order/create", session],
    createOrder
  );

  const [showAddressInput, setShowAddressInput] = useState(false);
  const [address, setAddress] = useState(localStorage.getItem("address") || "");

  const handleSaveAddress = () => {
    address && localStorage.setItem("address", address);
    setShowAddressInput(false);
  };

  const totalPrice = items.reduce((acc, item) => {
    return (
      acc +
      ((item.quantity ?? 0) > (item.stock ?? 0)
        ? (item.price ?? 0) * (item.stock ?? 0)
        : (item.price ?? 0) * (item.quantity ?? 0))
    );
  }, 0);

  function handleCheckout(
    totalAmount: number,
    address: string,
    items: any[]
  ): void {
    trigger({ totalAmount, address, items });
  }

  return (
    <div className="my-12 container mx-auto">
      {!isEmpty ? (
        <>
          <div className="mb-4">
            <div className="text-xl font-bold mb-4">shipping address</div>
            {showAddressInput ? (
              <div className="flex items-center space-x-4">
                <Input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your address"
                />
                <Button variant="outline" onClick={handleSaveAddress}>
                  Save
                </Button>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <span className="text-primary/50">
                  {address || "shipping address not set"}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowAddressInput(true)}
                >
                  {address ? "Edit Address" : "Add Address"}
                </Button>
              </div>
            )}
          </div>
          <Button
            disabled={isMutating}
            className="w-full md:w-auto disabled:opacity-75 disabled:cursor-not-allowed"
            variant="outline"
            onClick={() => handleCheckout(totalPrice, address, items)}
          >
            {isMutating ? <Spinner /> : "Checkout"}
          </Button>
          <div className="mt-6 flex justify-between mb-4">
            <button
              onClick={() => items.forEach((item) => removeItem(item.id))}
              className="text-red-500 font-semibold hover:underline"
            >
              Delete All
            </button>
            <div className="inline-flex items-center gap-2">
              Total Price: <FaDollarSign size={14} />
              {totalPrice.toFixed(2)}
            </div>
          </div>
          <ul className="space-y-4">
            {items.map((item: any) => (
              <li
                key={item.id}
                className="grid grid-cols-[120px_1fr_120px_80px_80px] gap-6 border-b py-4 items-center"
              >
                <div className="aspect-h-10 aspect-w-7">
                  <img
                    src={`${config.SERVER_API_URL}/${item.thumbnail}`}
                    alt={item.name}
                    className="object-cover rounded-md"
                  />
                </div>
                <div>
                  <div className="font-bold">{item.name}</div>
                  <div className="text-primary text-sm">{item.description}</div>
                  {item.quantity && item.quantity > item.stock && (
                    <div className="text-red-600 text-sm">
                      Out of Stock. Max purchase: {item.stock}
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      updateItemQuantity(item.id, (item.quantity ?? 0) - 1)
                    }
                    disabled={!item.quantity || item.quantity === 0}
                  >
                    <FiMinus />
                  </button>
                  <Input
                    type="number"
                    className="text-primary text-center"
                    min={0}
                    max={item.stock}
                    value={item.quantity ?? 0}
                    onChange={(e) => {
                      if (e.target.valueAsNumber < 0) return;
                      updateItemQuantity(item.id, e.target.valueAsNumber);
                    }}
                  />
                  <button
                    onClick={() =>
                      updateItemQuantity(item.id, (item.quantity ?? 0) + 1)
                    }
                  >
                    <FiPlus />
                  </button>
                </div>

                <div className="text-primary inline-flex items-center gap-1 truncate">
                  <FaDollarSign size={14} />
                  {(item.quantity ?? 0) > 0
                    ? (item.quantity ?? 0) > (item.stock ?? 0)
                      ? (item.price ?? 0) * (item.stock ?? 0)
                      : (item.price ?? 0) * (item.quantity ?? 0)
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
        <div className="font-bold text-2xl">Cart is Empty</div>
      )}
      <Toaster />
    </div>
  );
}
