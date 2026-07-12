import { supabase } from "@/lib/supabase"
import type {
  CreateOrderInput,
  CreateOrderItemInput,
  OrderItemWithService
} from "@/types/order"

export async function createOrder(order: CreateOrderInput) {
  // const { data, error } = await supabase
  //   .from("orders")
  //   .insert(input)
  //   .select()
  //   .single()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data, error } = await supabase
  .from("orders")
  .insert({
    ...order,
    user_id: user!.id,
  })
  .select()
  .single()
  
  if (error) throw error

  return data
  
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
  // const { data, error } = await supabase
  //   .from("orders")
  //   .select("*")
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data, error } = await supabase
  .from("orders")
    .select("*")
    .eq("user_id", user!.id)
    .order("order_date", { ascending: false })
    .order("created_at", { ascending: false })

  if (error) throw error

  return data
}


export async function getOrderItems(
  orderId: string
): Promise<OrderItemWithService[]> {
  const { data, error } = await supabase
    .from("order_items")
    .select(`
      *,
      services (
        name
      )
    `)
    .eq("order_id", orderId)

  if (error) throw error

  return data
}

export async function deleteOrder(orderId: string) {
  const { error } = await supabase
    .from("orders")
    .delete()
    .eq("id", orderId)

  if (error) throw error
}