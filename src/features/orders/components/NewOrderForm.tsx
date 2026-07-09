interface NewOrderFormProps {
  onOrderCreated: () => void
}

import { useEffect, useMemo, useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

import { getServices } from "@/features/services/api"
import type { Service } from "@/types/service"

import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


import {
  createOrder,
  createOrderItems,
} from "@/features/orders/api"

type OrderItem = {
  serviceId: string
  quantity: number | ""
}

function calculateSubtotal(
  quantity: number,
  price: number,
  every: number
) {
  return Math.ceil(quantity / every) * price
}

export default function NewOrderForm({
  onOrderCreated,
}: NewOrderFormProps) {

  const [open, setOpen] = useState(false)
  
  const [services, setServices] = useState<Service[]>([])

  const [customerName, setCustomerName] = useState("")
  const [isPaid, setIsPaid] = useState(true)
  
  const [isSaving, setIsSaving] = useState(false)

  const [items, setItems] = useState<OrderItem[]>([
    {
      serviceId: "",
      quantity: "",
    },
  ])

  const [orderDate, setOrderDate] = useState(
    new Date().toISOString().split("T")[0]
  )

  useEffect(() => {
    loadServices()
  }, [])

  async function loadServices() {
    try {
      const data = await getServices()
      setServices(data)
    } catch (error) {
      console.error(error)
    }
  }

  function updateItem(
    index: number,
    field: keyof OrderItem,
    value: string | number | ""
  ) {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, [field]: value }
          : item
      )
    )
  }

  function addItem() {
    setItems((prev) => [
      ...prev,
      {
        serviceId: "",
        quantity: "",
      },
    ])
  }

  function removeItem(index: number) {
    if (items.length === 1) return

    setItems((prev) =>
      prev.filter((_, i) => i !== index)
    )
  }

  // ⭐ One source of truth
  const calculatedItems = useMemo(() => {
    return items
      .map((item) => {
        const service = services.find(
          (s) => s.id === item.serviceId
        )

        if (!service || item.quantity === "") {
          return null
        }

        return {
          ...item,
          service,
          subtotal: calculateSubtotal(
            item.quantity,
            service.price,
            service.every
          ),
        }
      })
      .filter(
        (item): item is NonNullable<typeof item> =>
          item !== null
      )
  }, [items, services])

  const total = calculatedItems.reduce(
    (sum, item) => sum + item.subtotal,
    0
  )

  async function handleSave() {
    try {
      if (calculatedItems.length === 0) {
        alert("Please add at least one service.")
        return
      }

      const now = new Date()

      const orderDateTime = new Date(
        `${orderDate}T${now.toTimeString().slice(0, 8)}`
      )

      const order = await createOrder({
        customer_name: customerName,
        order_date: orderDateTime.toISOString(),
        total,
        is_paid: isPaid,
      })
      
      await createOrderItems(
        calculatedItems.map((item) => ({
          order_id: order.id,
          service_id: item.service.id,
          quantity: item.quantity,
          unit_price: item.service.price,
          subtotal: item.subtotal,
        }))
      )

      onOrderCreated()
      setIsSaving(true)

      try {

      }
      finally{
          setIsSaving(false)
      }

      toast.success("Order saved!")

      setCustomerName("")
      setIsPaid(true)
      setItems([
        {
          serviceId: "",
          quantity: "",
        },
      ])
    } catch (err) {
      console.error(err)
      toast.error("Failed to save order")
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full"
        >
          + Order
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            New Order
          </DialogTitle>
        </DialogHeader>

        {/* <Card className="p-5"> */}

          <div className="space-y-1">
            <Input
              placeholder="Customer name (optional)"
              value={customerName}
              onChange={(e) =>
                setCustomerName(e.target.value)
              }
            />

            <Input
              type="date"
              value={orderDate}
              onChange={(e) =>
                setOrderDate(e.target.value)
              }
            />
          </div>

          {items.map((item, index) => {
            const calculated = calculatedItems.find(
              (c) => c.serviceId === item.serviceId
            )

            return (
              <div
                key={index}
                className="space-y-1 space-x-1 rounded-xl border p-4"
              >

                <div className="flex space-x-1">

                <Select
                  value={item.serviceId}
                  onValueChange={(value) =>
                    updateItem(index, "serviceId", value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Service" />
                  </SelectTrigger>

                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem
                        key={service.id}
                        value={service.id}
                      >
                        {service.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                  type="number"
                  placeholder="Quantity"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    updateItem(
                      index,
                      "quantity",
                      e.target.value === ""
                        ? ""
                        : Number(e.target.value)
                    )
                  }
                />
                </div>

                <div className="flex justify-between items-center px-1">
                  <span>Subtotal</span>

                  <div className="space-x-1">
                  <span className="font-semibold">
                    {calculated
                      ? `Rp${calculated.subtotal.toLocaleString("id-ID")}`
                      : "—"}
                  </span>
                  {items.length > 1 && (
                    <Button
                      variant="destructive"
                      onClick={() =>
                        removeItem(index)
                      }
                    >
                      <Trash2 />
                    </Button>
                  )}

                  </div>
                </div>

              </div>
            )
          })}

          <Button
            variant="outline"
            onClick={addItem}
          >
            + Add Service
          </Button>

          <div className="rounded-xl bg-muted p-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>

              <span>
                Rp{total.toLocaleString("id-ID")}
              </span>
            </div>
          </div>


          <Button
            disabled={isSaving}
            onClick={handleSave}
          >
            {isSaving ? "Saving..." : "Save Order"}
          </Button>
        {/* </Card> */}
      </DialogContent>
    </Dialog>
  )
}