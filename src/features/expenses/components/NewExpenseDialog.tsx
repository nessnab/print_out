import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { createExpense } from "../api"
import { toast } from "sonner"

type Props = {
  onExpenseCreated: () => void
}

export default function NewExpenseDialog({
  onExpenseCreated,
}: Props) {
  const today = new Date()
    .toISOString()
    .split("T")[0]

  const [description, setDescription] =
    useState("")

  const [amount, setAmount] = useState<
    number | ""
  >("")

  const [expenseDate, setExpenseDate] =
    useState(today)

  const [open, setOpen] =
    useState(false)

  const [isSaving, setIsSaving] =
    useState(false)

  async function handleSave() {
    if (!description.trim()) {
      toast.error(
        "Please enter a description."
      )
      return
    }

    if (amount === "" || amount <= 0) {
      toast.error(
        "Please enter an amount."
      )
      return
    }

    try {
      setIsSaving(true)

      await createExpense({
        description: description,
        amount,
        expense_date: expenseDate,
      })

      toast.success("Expense saved!")

      onExpenseCreated()

      setDescription("")
      setAmount("")
      setExpenseDate(today)

      setOpen(false)
    } catch (err) {
      console.error(err)
      toast.error(
        "Failed to save expense."
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button
          // variant="outline"
          className="w-full"
        >
          + Expense
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            New Expense
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm">
              Description
            </label>

            <Input
              placeholder="Printer Ink"
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
            />
          </div>

          <div>
            <label className="mb-1 block text-sm">
              Amount
            </label>

            <Input
              type="number"
              placeholder="50000"
              value={amount}
              onChange={(e) =>
                setAmount(
                  e.target.value === ""
                    ? ""
                    : Number(
                        e.target.value
                      )
                )
              }
            />
          </div>

          <div>
            <label className="mb-1 block text-sm">
              Date
            </label>

            <Input
              type="date"
              value={expenseDate}
              onChange={(e) =>
                setExpenseDate(
                  e.target.value
                )
              }
            />
          </div>

          <Button
            className="w-full"
            disabled={isSaving}
            onClick={handleSave}
          >
            {isSaving
              ? "Saving..."
              : "Save Expense"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}