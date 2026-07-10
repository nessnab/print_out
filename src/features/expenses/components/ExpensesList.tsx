type Props = {
  expenses: any[]
  period: Period
  onDeleted: () => void
}

import type { Period } from "@/types/period"
import { deleteExpense } from "../api"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function ExpensesList({
  expenses,
  period,
  onDeleted
}: Props) {

  function formatDate(date: string) {
    return new Intl.DateTimeFormat("id-ID", {
      dateStyle: "medium",
    }).format(new Date(date))
  }

  async function handleDelete(id: string) {
    try {
      await deleteExpense(id)

      toast.success("Expense deleted")

      onDeleted()

    } catch (err) {
      console.error(err)

      toast.error("Failed to delete expense")
    }
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

          <AlertDialog>
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
                  Delete this expense?
                </AlertDialogTitle>

                <AlertDialogDescription>
                  This action cannot be undone.
                  <br />
                  {/* All services in this order will also be deleted. */}
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>
                  Cancel
                </AlertDialogCancel>

                <AlertDialogAction
                  onClick={() =>
                    handleDelete(expense.id)
                  }
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          </div>
        </div>
      ))}
    </Card>
  )
}