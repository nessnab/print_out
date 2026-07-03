interface OrdersListProps {
  orders: any[]
}

import { Card } from "@/components/ui/card"


export default function OrdersList({
  orders,
}: OrdersListProps) {

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
              {order.customer_name || "Walk-in"}
            </p>

            <p className="text-sm text-muted-foreground">
              {order.is_paid ? "Paid" : "Unpaid"}
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