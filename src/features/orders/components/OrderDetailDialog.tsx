type Props = {
  order: Order
  onDeleted: () => void
}

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Card } from "@/components/ui/card"

import type {
  Order,
  OrderItemWithService,
} from "@/types/order"

import { getOrderItems } from "../api"

import { Button } from "@/components/ui/button"
import { deleteOrder } from "@/features/orders/api"
import { toast } from "sonner"
import { Trash2 } from "lucide-react"

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

export default function OrderDetailDialog({
  order,
  onDeleted
}: Props) {
  const [open, setOpen] = useState(false)

  const [items, setItems] = useState<
    OrderItemWithService[]
  >([])

  useEffect(() => {
    if (open) {
      loadItems()
    }
  }, [open])

  async function loadItems() {
    try {
      const data = await getOrderItems(order.id)
      setItems(data)
    } catch (err) {
      console.error(err)
    }
  }

  function formatDate(date: string) {
    return new Intl.DateTimeFormat("id-ID", {
      dateStyle: "medium",
    }).format(new Date(date))
  }

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
    <Card className="transition hover:bg-muted/50">
      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <div className="flex justify-between p-2">
          <DialogTrigger asChild>
              <div
                key={order.id}
                className="cursor-pointer w-full"
              >
                <div>
                  <p className="font-medium">
                    {order.customer_name || `Order #${order.id}`}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {formatDate(order.order_date)}
                  </p>
                </div>
              </div>
          </DialogTrigger>

          <div className="flex items-center gap-2">
            <p className="font-semibold text-emerald-600">
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


        <DialogContent>

          <DialogHeader>
            <DialogTitle>
              Order Detail
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3">

            <div>
              <p className="text-sm text-muted-foreground">
                Customer
              </p>

              <p className="font-medium">
                {order.customer_name || "Walk-in Customer"}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Date
              </p>

              <p>{formatDate(order.order_date)}</p>
            </div>

            <div className="space-y-2">
              {items.map((item) => (
                <Card
                key={item.id}
                  className="p-3"
                  >
                  <div className="flex justify-between">

                    <div>

                      <p className="font-medium">
                        {item.services.name}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity}
                      </p>

                    </div>

                    <p className="font-semibold">
                      Rp
                      {item.subtotal.toLocaleString(
                        "id-ID"
                      )}
                    </p>

                  </div>
                </Card>
              ))}
            </div>

            <div className="flex justify-between border-t pt-4">

              <span className="font-semibold">
                Total
              </span>

              <span className="text-lg font-bold">
                Rp{order.total.toLocaleString("id-ID")}
              </span>

            </div>

          </div>

        </DialogContent>

      </Dialog>
    </Card>
  )
}