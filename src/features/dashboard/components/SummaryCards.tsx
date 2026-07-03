interface SummaryCardsProps {
  orders: any[]
}

export default function SummaryCards({
  orders,
}: SummaryCardsProps) {
  const revenue = orders.reduce(
    (sum, order) => sum + Number(order.total),
    0
  )

  const orderCount = orders.length

  const unpaidCount = orders.filter(
    (order) => !order.is_paid
  ).length

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
          Orders
        </p>

        <p className="mt-1 text-lg font-bold">
          {orderCount}
        </p>
      </div>

      <div className="rounded-xl border bg-white p-4">
        <p className="text-xs text-muted-foreground">
          Unpaid
        </p>

        <p className="mt-1 text-lg font-bold">
          {unpaidCount}
        </p>
      </div>
    </div>
  )
}