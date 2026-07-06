type OrdersListProps = {
  orders: any[]
  period: Period
  onDeleted: () => void
}
import type { Period } from "@/types/period"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { deleteOrder } from "@/features/orders/api"
import { toast } from "sonner"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Trash2 } from "lucide-react"


export default function OrdersList({
  orders,
  period,
  onDeleted
}: OrdersListProps) {

  const titles = {
    today: "Today's Orders",
    week: "This Week",
    month: "This Month",
    all: "All Orders",
  }

  function formatDate(date: string) {
    return new Intl.DateTimeFormat("id-ID", {
      dateStyle: "medium",
    }).format(new Date(date))
  }
  console.log(orders)


  async function handleDelete(id: string) {
    try {
      await deleteOrder(id)

      toast.success("Order deleted")

      onDeleted()

    } catch (err) {
      console.error(err)

      toast.error("Failed to delete order")
    }
  }
  
  

  return (
    <Card className="p-5 space-y-3">
      <h2 className="text-lg font-semibold">
        {titles[period]}
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
          <div className="flex items-center gap-2">
          <p className="font-semibold">
            Rp{Number(order.total).toLocaleString("id-ID")}
          </p>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="icon"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Delete this order?
                </AlertDialogTitle>

                <AlertDialogDescription>
                  This action cannot be undone.
                  <br />
                  All services in this order will also be deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>
                  Cancel
                </AlertDialogCancel>

                <AlertDialogAction
                  onClick={() =>
                    handleDelete(order.id)
                  }
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          </div>
        </div>
      ))}
    </Card>
  )
}