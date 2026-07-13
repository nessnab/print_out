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
        <div className="text-center">
          <p>No orders yet.</p>
          <p className="text-gray-400">Create your first order to get started.</p>
        </div>
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