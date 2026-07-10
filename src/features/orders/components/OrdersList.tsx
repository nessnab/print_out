type OrdersListProps = {
  orders: any[]
  period: Period
  onDeleted: () => void
}
import type { Period } from "@/types/period"
import OrderDetailDialog from "./OrderDetailDialog"
import { Card } from "@/components/ui/card"

export default function OrdersList({
  orders,
  period,
  onDeleted
}: OrdersListProps) {

  return (
    <Card className="p-5 space-y-1">

      {orders.length === 0 && (
        <p>No orders yet.</p>
      )}

      {orders.map((order) => (

        <OrderDetailDialog
          key={order.id}
          order={order}
          onDeleted={onDeleted}
        />
        
      ))}
    </Card>
  )
}