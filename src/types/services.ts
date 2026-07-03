export interface Service {
  id: string
  name: string
  price: number
  every: number
  unit: "page" | "item"
}