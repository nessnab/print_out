export interface Order {
  id: string
  customer_name: string
  order_date: string
  total: number
  is_paid: boolean
  created_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  service_id: string
  quantity: number
  unit_price: number
  subtotal: number
}

export interface CreateOrderInput {
  customer_name: string
  order_date: string
  total: number
  is_paid: boolean
}

export interface CreateOrderItemInput {
  order_id: string
  service_id: number
  quantity: number
  unit_price: number
  subtotal: number
}

export interface OrderItemWithService {
  id: string
  order_id: string
  service_id: string

  quantity: number
  unit_price: number
  subtotal: number

  services: {
    name: string
  }
}