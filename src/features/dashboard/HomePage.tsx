type Period =
| "today"
| "week"
| "month"
| "all"
import { useEffect, useState } from "react"

import SummaryCards from "./components/SummaryCards"
import NewOrderForm from "./components/NewOrderForm"
import OrdersList from "./components/OrdersList"
import SettingsSheet from "../services/SettingsSheet"

import { getOrders } from "@/features/orders/api"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function HomePage() {
  const [orders, setOrders] = useState<any[]>([])

  const [period, setPeriod] = useState<Period>("today")

  useEffect(() => {
    loadOrders()
  }, [])
    useState<Period>("today")

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

  // Filter orders based on the selected period
  const now = new Date()

  const filteredOrders = orders.filter(
    (order) => {
      const orderDate = new Date(order.order_date)

      switch (period) {
        case "today":
          return (
            orderDate.toDateString() ===
            now.toDateString()
          )

        case "week": {
          const weekAgo = new Date()
          weekAgo.setDate(now.getDate() - 7)

          return orderDate >= weekAgo
        }

        case "month":
          return (
            orderDate.getMonth() ===
              now.getMonth() &&
            orderDate.getFullYear() ===
              now.getFullYear()
          )

        case "all":
          return true
      }
    }
  )

  return (
    <main className="mx-auto min-h-screen max-w-md space-y-6 bg-zinc-50 p-4">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            PrintOut
          </h1>

          <p className="text-sm text-muted-foreground">
            Print Shop Dashboard
          </p>
        </div>
        <div className="flex">
          <Select
            value={period}
            onValueChange={(value) =>
              setPeriod(value as Period)
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="today">
                Today
              </SelectItem>

              <SelectItem value="week">
                This Week
              </SelectItem>

              <SelectItem value="month">
                This Month
              </SelectItem>

              <SelectItem value="all">
                All Time
              </SelectItem>
            </SelectContent>
          </Select>

          <SettingsSheet />
        </div>
      </header>


      <SummaryCards orders={filteredOrders} />

      <NewOrderForm
        onOrderCreated={loadOrders}
      />

      <OrdersList
        period={period}
        orders={filteredOrders}
        onDeleted={loadOrders}
      />
    </main>
  )
}