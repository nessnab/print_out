import { supabase } from "@/lib/supabase"

type CreateOrderInput = {
  customer_name: string
  order_date: string
  total: number
  is_paid: boolean
}

export async function createOrder(input: CreateOrderInput) {
  const { data, error } = await supabase
    .from("orders")
    .insert(input)
    .select()
    .single()

  if (error) throw error

  return data
}

type CreateOrderItemInput = {
  order_id: string
  service_id: string
  quantity: number
  unit_price: number
  subtotal: number
}

export async function createOrderItems(
  items: CreateOrderItemInput[]
) {
  const { error } = await supabase
    .from("order_items")
    .insert(items)

  if (error) throw error
}

export async function getOrders() {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("order_date", { ascending: false })
    .order("created_at", { ascending: false })

  if (error) throw error

  return data
}