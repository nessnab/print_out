interface OrdersListProps {
  orders: any[]
}

import { Card } from "@/components/ui/card"


export default function OrdersList({
  orders,
}: OrdersListProps) {

  function formatDate(date: string) {
    return new Intl.DateTimeFormat("id-ID", {
      dateStyle: "medium",
    }).format(new Date(date))
  }
  console.log(orders)

  return (
    <Card className="p-5 space-y-3">
      <h2 className="font-semibold">
        Today's Orders
      </h2>

      {orders.length === 0 && (
        <p>No orders yet.</p>
      )}

      {orders.map((order) => (
        
        <div
          key={order.id}
          className="flex justify-between border-b pb-2"
        >
          <div>
            <p className="font-medium">
              {order.customer_name || `Order #${order.id}`}
            </p>

            <p className="text-xs text-muted-foreground">
              {formatDate(order.order_date)}
            </p>
          </div>

          <p className="font-semibold">
            Rp{Number(order.total).toLocaleString("id-ID")}
          </p>
        </div>
      ))}
    </Card>
  )
}