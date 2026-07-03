interface SummaryCardsProps {
  orders: any[]
}

import { Card } from "@/components/ui/card";

export default function SummaryCards({ orders }: SummaryCardsProps) {

  const revenue = orders.reduce(
    (sum, order) => sum + Number(order.total),
  0
  )

  const unpaid = orders.filter(
    (o) => !o.is_paid
  ).length

  const orderCount = orders.length
  return (
    <div className="mt-6 grid gap-3">
      <Card className="p-4">
        <p className="text-sm text-muted-foreground">
          Revenue Today
        </p>

        <h2 className="mt-2 text-2xl font-bold">
          Rp0
        </h2>
      </Card>

      <Card className="p-4">
        <p className="text-sm text-muted-foreground">
          Expenses Today
        </p>

        <h2 className="mt-2 text-2xl font-bold">
          Rp0
        </h2>
      </Card>

      <Card className="p-4">
        <p className="text-sm text-muted-foreground">
          Profit Today
        </p>

        <h2 className="mt-2 text-2xl font-bold">
          Rp0
        </h2>
      </Card>
    </div>
  );
}