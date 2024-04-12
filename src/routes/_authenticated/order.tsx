import Loading from "@/components/loading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { config } from "@/lib/config";
import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import useSWR from "swr";

export const Route = createFileRoute("/_authenticated/order")({
  component: Order,
});

async function getOrder(url: string, session: string) {
  const { data } = await axios.get(`${config.SERVER_API_URL}/v1/${url}`, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
  return data;
}

function Order() {
  const { session } = Route.useRouteContext();
  const { data, isLoading } = useSWR(["order/get", session], ([url, session]) =>
    getOrder(url, session)
  );

  if (isLoading) return <Loading />;

  return (
    <div className="my-12 container mx-auto">
      {data && data[0] ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <OrderList orders={data} />
        </div>
      ) : (
        <div className="font-bold text-2xl">Order list is empty</div>
      )}
    </div>
  );
}

function OrderList({ orders }: any) {
  return orders.map((order: any) => (
    <Card key={order.id}>
     <ScrollArea className="h-[calc(100vh-12rem)]">
        <CardHeader>
          <div className="text-xl font-semibold mb-3">Order ID: {order.id}</div>
          <div className="text-primary mb-2">
            Total Amount: ${order.total_amount}
          </div>
          <div className="text-primary mb-4">
            Shipping Address: {order.address}
          </div>
        </CardHeader>
        <CardContent>
            <div className="text-lg font-medium mb-2">Items:</div>
            {order.items.map((item: any, index: number) => (
              <div key={index} className="mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-primary font-bold">
                    {item.quantity} x {item.product_name}
                  </span>
                  <span className="text-primary">${item.price}</span>
                </div>
                <div className="text-sm text-primary">
                  {item.product_description}
                </div>
                <Badge className="mt-1">{item.order_status}</Badge>
              </div>
            ))}
        </CardContent>
     </ScrollArea>
    </Card>
  ));
}
