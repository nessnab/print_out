import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"

import { getExpenses } from "../api"
import type { Expense } from "@/types/expense"

type Props = {
  expenses: any[],
}

export default function ExpensesList({
  expenses,
}: Props) {

  return (
    <div className="space-y-3">
      {expenses.length === 0 && (
        <Card className="p-6 text-center text-muted-foreground">
          No expenses yet.
        </Card>
      )}

      {expenses.map((expense) => (
        <Card
          key={expense.id}
          className="space-y-2 p-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">
              {expense.description}
            </h3>

            <span className="font-bold">
              Rp
              {Number(
                expense.amount
              ).toLocaleString("id-ID")}
            </span>
          </div>

          <p className="text-sm text-muted-foreground">
            {expense.expense_date}
          </p>
        </Card>
      ))}
    </div>
  )
}