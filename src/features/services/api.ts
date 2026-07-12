import type { Service } from "@/types/service"
import { supabase } from "@/lib/supabase"

export async function getServices() {
  // const { data, error } = await supabase
  //   .from("services")
  //   .select("*")
  //   .order("name")
  
  const {
    data: { user },
  } = await supabase.auth.getUser()
  
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("user_id", user!.id)
    .eq("is_active", true)
    .order("created_at", { ascending: false })

  if (error) throw error

  return data
}

export async function createService(
  service: {
    name: string
    price: number
    every: number
    // unit: "page" | "item"
  }
) {
  // const { data, error } = await supabase
  //   .from("services")
  //   .insert({
  //     ...service,
  //     is_active: true,
  //   })
  //   .select()
  //   .single()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from("services")
    .insert({
      ...service,
      is_active: true,
      user_id: user!.id,
    })
    .select()
    .single()

  if (error) throw error

  return data
}

export async function updateService(
  service: Service
) {
  const { error } = await supabase
    .from("services")
    .update({
      name: service.name,
      price: service.price,
      every: service.every,
      unit: service.unit,
      is_active: service.is_active,
    })
    .eq("id", service.id)

  if (error) throw error
}

export async function deactivateService(id: number) {
  const { error } = await supabase
    .from("services")
    .update({
      is_active: false,
    })
    .eq("id", id)

  if (error) throw error
}