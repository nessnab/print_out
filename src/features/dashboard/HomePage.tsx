import { useEffect, useState } from "react"

import SummaryCards from "./components/SummaryCards"
import NewOrderForm from "./components/NewOrderForm"
import OrdersList from "./components/OrdersList"

import { getOrders } from "@/features/orders/api"

export default function HomePage() {
  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
    loadOrders()
  }, [])

  async function loadOrders() {
    try {
      const data = await getOrders()
      setOrders(data)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <main className="mx-auto min-h-screen max-w-md space-y-6 bg-zinc-50 p-4">
      <header>
        <h1 className="text-3xl font-bold">
          PrintOut
        </h1>

        <p className="text-sm text-muted-foreground">
          Print Shop Dashboard
        </p>
      </header>

      <SummaryCards orders={orders} />

      <NewOrderForm
        onOrderCreated={loadOrders}
      />

      <OrdersList
        orders={orders}
        onDeleted={loadOrders}
      />
    </main>
  )
}