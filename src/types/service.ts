export interface Service {
  id: number
  name: string
  price: number
  every: number
  unit: "page" | "item"
  is_active: boolean
}