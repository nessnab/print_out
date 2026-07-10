type Props = {
  expenses: any[]
  period: Period
}

import { Card } from "@/components/ui/card"
import type { Period } from "@/types/period"

export default function ExpensesList({
  expenses,
  period
}: Props) {

  function formatDate(date: string) {
    return new Intl.DateTimeFormat("id-ID", {
      dateStyle: "medium",
    }).format(new Date(date))
  }

  return (
    
    <Card className="p-5 space-y-3">
      {expenses.length === 0 && (
        <p>No expenses yet.</p>
      )}

      {expenses.map((expense) => (
        
        <div
          key={expense.id}
          className="flex justify-between border-b pb-2"
        >
          <div>
            <p className="font-medium">
              {expense.description}
            </p>

            <p className="text-xs text-muted-foreground">
              {formatDate(expense.expense_date)}
            </p>
          </div>
          <div className="flex items-center gap-2">
          <p className="font-semibold text-destructive">
            Rp{Number(expense.amount).toLocaleString("id-ID")}
          </p>

          {/* <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="icon"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Delete this order?
                </AlertDialogTitle>

                <AlertDialogDescription>
                  This action cannot be undone.
                  <br />
                  All services in this order will also be deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>
                  Cancel
                </AlertDialogCancel>

                <AlertDialogAction
                  onClick={() =>
                    handleDelete(order.id)
                  }
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog> */}

          </div>
        </div>
      ))}
    </Card>
  )
}