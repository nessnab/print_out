import { supabase } from "@/lib/supabase"

export async function getExpenses() {
  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .order("expense_date", { ascending: false })
    .order("created_at", { ascending: false })

  if (error) throw error

  return data
}

export async function createExpense(
  expense: {
    description: string
    amount: number
    expense_date: string
  }
) {
  const { data, error } =
    await supabase
      .from("expenses")
      .insert(expense)
      .select()
      .single()

  if (error) throw error

  return data
}

export async function deleteExpense(orderId: string) {
  const { error } = await supabase
    .from("expenses")
    .delete()
    .eq("id", orderId)

  if (error) throw error
}