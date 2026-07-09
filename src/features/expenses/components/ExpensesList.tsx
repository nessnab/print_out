import { Card } from "@/components/ui/card"

type Props = {
  expenses: any[],
}

export default function ExpensesList({
  expenses,
}: Props) {

  function formatDate(date: string) {
    return new Intl.DateTimeFormat("id-ID", {
      dateStyle: "medium",
    }).format(new Date(date))
  }

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
          <div className="flex justify-between border-b pb-2">
            <div>
              <p className="font-medium">
                {expense.description}
              </p>

              <p className="text-xs text-muted-foreground">
                {formatDate(expense.expense_date)}
              </p>

            </div>
              <p className="font-semibold">
                Rp
                {Number(
                  expense.amount
                ).toLocaleString("id-ID")}
              </p>
          </div>

        </Card>
      ))}
    </div>
  )
}