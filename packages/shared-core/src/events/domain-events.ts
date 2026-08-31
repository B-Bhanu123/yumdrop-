export enum EventType {
  USER_REGISTERED = 'USER_REGISTERED',
  USER_UPDATED = 'USER_UPDATED',
  USER_LOGGED_IN = 'USER_LOGGED_IN',
  
  RESTAURANT_CREATED = 'RESTAURANT_CREATED',
  RESTAURANT_UPDATED = 'RESTAURANT_UPDATED',
  MENU_ITEM_ADDED = 'MENU_ITEM_ADDED',
  MENU_ITEM_UPDATED = 'MENU_ITEM_UPDATED',
  
  ORDER_CREATED = 'ORDER_CREATED',
  ORDER_PAYMENT_PENDING = 'ORDER_PAYMENT_PENDING',
  ORDER_PAID = 'ORDER_PAID',
  ORDER_KITCHEN_ACCEPTED = 'ORDER_KITCHEN_ACCEPTED',
  ORDER_PREPARING = 'ORDER_PREPARING',
  ORDER_READY_FOR_PICKUP = 'ORDER_READY_FOR_PICKUP',
  ORDER_DRIVER_ASSIGNED = 'ORDER_DRIVER_ASSIGNED',
  ORDER_IN_TRANSIT = 'ORDER_IN_TRANSIT',
  ORDER_DELIVERED = 'ORDER_DELIVERED',
  ORDER_CANCELLED = 'ORDER_CANCELLED',
  
  PAYMENT_INITIATED = 'PAYMENT_INITIATED',
  PAYMENT_COMPLETED = 'PAYMENT_COMPLETED',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  PAYMENT_REFUNDED = 'PAYMENT_REFUNDED',
  
  NOTIFICATION_DISPATCHED = 'NOTIFICATION_DISPATCHED',
  ANALYTICS_METRIC_LOGGED = 'ANALYTICS_METRIC_LOGGED'
}

export interface DomainEvent<T = any> {
  eventId: string;
  eventType: EventType;
  timestamp: string;
  producerService: string;
  version: string;
  data: T;
  correlationId?: string;
}

export interface UserRegisteredPayload {
  userId: string;
  email: string;
  fullName: string;
  role: 'CUSTOMER' | 'DRIVER' | 'RESTAURANT_OWNER' | 'ADMIN';
  createdAt: string;
}

export interface OrderCreatedPayload {
  orderId: string;
  customerId: string;
  restaurantId: string;
  items: Array<{
    itemId: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  deliveryAddress: string;
  paymentMethod: string;
  createdAt: string;
}

export interface PaymentCompletedPayload {
  paymentId: string;
  orderId: string;
  customerId: string;
  amount: number;
  currency: string;
  transactionRef: string;
  completedAt: string;
}

export interface OrderStatusChangedPayload {
  orderId: string;
  previousStatus: string;
  newStatus: string;
  updatedAt: string;
  driverId?: string;
  estimatedDeliveryTimeMinutes?: number;
}
