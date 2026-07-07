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
  id: number,
  price: number,
  every: number
) {
  const { error } = await supabase
    .from("services")
    .update({
      price,
      every,
    })
    .eq("id", id)

  if (error) throw error
}