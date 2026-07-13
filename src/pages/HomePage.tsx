type Period =
| "today"
| "week"
| "month"
| "all"
import { useEffect, useState } from "react"

import SummaryCards from "@/features/dashboard/components/SummaryCards"

import NewOrderForm from "../features/orders/components/NewOrderForm"
import OrdersList from "../features/orders/components/OrdersList"

import NewExpenseDialog from "../features/expenses/components/NewExpenseDialog"
import ExpensesList from "@/features/expenses/components/ExpensesList"

import SettingsSheet from "../features/services/SettingsSheet"

import { useAuthContext } from "@/features/auth/AuthProvider"
import { getOrders } from "@/features/orders/api"
import { getExpenses } from "@/features/expenses/api"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function HomePage() {
  const { user } = useAuthContext()
  const [orders, setOrders] = useState<any[]>([])
  const [expenses, setExpenses] = useState<any[]>([])
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

  useEffect(() => {
    loadExpenses()
  }, [])

  async function loadExpenses() {
    try {
      const data = await getExpenses()
      setExpenses(data)
    } catch (err) {
      console.error(err)
    }
  }

  // Filter orders & expenses based on the selected period
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
  const filteredExpenses = expenses.filter(
    (expense) => {
      const expenseDate = new Date(expense.expense_date)

      switch (period) {
        case "today":
          return (
            expenseDate.toDateString() ===
            now.toDateString()
          )

        case "week": {
          const weekAgo = new Date()
          weekAgo.setDate(now.getDate() - 7)

          return expenseDate >= weekAgo
        }

        case "month":
          return (
            expenseDate.getMonth() ===
              now.getMonth() &&
            expenseDate.getFullYear() ===
              now.getFullYear()
          )

        case "all":
          return true
      }
    }
  )

  // Calculate revenue, expense, and profit
  const revenue = filteredOrders.reduce(
    (sum, order) => sum + Number(order.total),
    0
  )

  const expense = filteredExpenses.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  )

  const profit = revenue - expense

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
          <p className="text-sm text-muted-foreground capitalize">
            Welcome, {user?.email?.split("@")[0]}!
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


      <SummaryCards
        // orders={filteredOrders}
        revenue={revenue}
        expense={expense}
        profit={profit}
      />

      <div className="grid grid-cols-2 gap-3">
        <NewOrderForm
          onOrderCreated={loadOrders}
        />
        
        <NewExpenseDialog
          onExpenseCreated={loadExpenses}
        />

      </div>



      <Tabs
        defaultValue="orders"
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="orders">
            Orders
          </TabsTrigger>

          <TabsTrigger value="expenses">
            Expenses
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          <OrdersList
            orders={filteredOrders}
            onDeleted={loadOrders}
          />
        </TabsContent>

        <TabsContent value="expenses">
          <ExpensesList
            expenses={filteredExpenses}
            onDeleted={loadExpenses}
          />
        </TabsContent>
      </Tabs>
    </main>
  )
}