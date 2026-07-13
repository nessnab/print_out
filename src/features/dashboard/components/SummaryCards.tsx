type Props = {
  revenue: number
  expense: number
  profit: number
}

import { Wallet, Receipt, TrendingUp } from "lucide-react"

export default function SummaryCards({
  revenue,
  expense,
  profit
}: Props) {

  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="rounded-xl border bg-white p-4">
        <Wallet></Wallet>
        <p className="text-xs text-muted-foreground">
          Revenue
        </p>

        <p className="mt-1 text-lg font-bold text-emerald-600">
          Rp{revenue.toLocaleString("id-ID")}
        </p>
      </div>

      <div className="rounded-xl border bg-white p-4">
        <Receipt></Receipt>
        <p className="text-xs text-muted-foreground">
          Expenses
        </p>

        <p className="mt-1 text-lg font-bold text-destructive">
          Rp{expense.toLocaleString("id-ID")}
        </p>
      </div>

      <div className="rounded-xl border bg-white p-4">
        <TrendingUp></TrendingUp>
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