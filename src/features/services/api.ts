import type { Service } from "@/types/service"
import { supabase } from "@/lib/supabase"

export async function getServices() {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("is_active", true)
    .order("name")

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