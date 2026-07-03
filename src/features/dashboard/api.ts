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