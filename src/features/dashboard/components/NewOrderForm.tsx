import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { getServices } from "../api"
import type { Service } from "@/types/service"

export default function NewOrderForm() {
  const [services, setServices] = useState<Service[]>([])
  const [customerName, setCustomerName] = useState("")

  // const [quantity, setQuantity] = useState(1)
  const [isPaid, setIsPaid] = useState(true)

  const [item, setItem] = useState({
    serviceId: "",
    quantity: "",
  })

  useEffect(() => {
    loadServices()
  }, [])

  async function loadServices() {
  try {
    const data = await getServices()

    console.log("Services:", data)

    setServices(data)
  } catch (error) {
    console.error(error)
  }
  }

  const selectedService = services.find(
    (service) => service.id === item.serviceId
  )
  
  const subtotal = selectedService
    ? Math.ceil(item.quantity / selectedService.every) *
      selectedService.price
    : 0

  return (
    <Card className="p-5">
      <h2 className="font-semibold">
        New Order
      </h2>
      <Input
        placeholder="Customer name (optional)"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
      />

      <select
        className="w-full rounded-md border p-2"
        value={item.serviceId}
        onChange={(e) =>
          setItem({
            ...item,
            serviceId: e.target.value,
          })
        }
      >
        <option value="">Select Service</option>

        {services.map((service) => (
          <option
            key={service.id}
            value={service.id}
          >
            {service.name}
          </option>
        ))}
      </select>

      <Input
        type="number" placeholder="Quantity"
        min={1}
        value={item.quantity}
        onChange={(e) =>
          setItem({
            ...item,
            quantity: Number(e.target.value),
          })
        }
      />
      <div className="rounded-lg bg-muted p-4">
        <div className="flex justify-between">
          <span>Subtotal</span>

          <span className="font-bold">
            Rp{subtotal.toLocaleString("id-ID")}
          </span>
        </div>
      </div>
    </Card>
  )
}