export type OrderStatus =
  | 'CREATED'
  | 'PAID'
  | 'KITCHEN_ACCEPTED'
  | 'PREPARING'
  | 'READY_FOR_PICKUP'
  | 'DRIVER_ASSIGNED'
  | 'IN_TRANSIT'
  | 'DELIVERED'
  | 'CANCELLED';

export interface OrderItemEntity {
  itemId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface OrderEntity {
  id: string;
  orderNumber: string;
  customerId: string;
  restaurantId: string;
  driverId?: string;
  status: OrderStatus;
  items: OrderItemEntity[];
  subtotal: number;
  deliveryFee: number;
  taxAmount: number;
  totalAmount: number;
  deliveryAddress: string;
  specialInstructions?: string;
  createdAt: string;
  updatedAt: string;
}
