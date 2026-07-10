type Props = {
  // orders: any[]
  revenue: number
  expense: number
  profit: number
}
export default function SummaryCards({
  // orders,
  revenue,
  expense,
  profit
}: Props) {
  // const revenue = orders.reduce(
  //   (sum, order) => sum + Number(order.total),
  //   0
  // )

  // const orderCount = orders.length

  // const unpaidCount = orders.filter(
  //   (order) => !order.is_paid
  // ).length

  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="rounded-xl border bg-white p-4">
        <p className="text-xs text-muted-foreground">
          Revenue
        </p>

        <p className="mt-1 text-lg font-bold">
          Rp{revenue.toLocaleString("id-ID")}
        </p>
      </div>

      <div className="rounded-xl border bg-white p-4">
        <p className="text-xs text-muted-foreground">
          Expenses
        </p>

        <p className="mt-1 text-lg font-bold">
          Rp{expense.toLocaleString("id-ID")}
        </p>
      </div>

      <div className="rounded-xl border bg-white p-4">
        <p className="text-xs text-muted-foreground">
          Profit
        </p>

        <p className="mt-1 text-lg font-bold">
          Rp{profit.toLocaleString("id-ID")}
        </p>
      </div>
    </div>
  )
}