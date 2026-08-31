import { OrderEntity, OrderStatus } from '../models/order.model';

export class OrderRepository {
  private orders: Map<string, OrderEntity> = new Map();

  async findById(id: string): Promise<OrderEntity | null> {
    return this.orders.get(id) || null;
  }

  async save(order: OrderEntity): Promise<OrderEntity> {
    this.orders.set(order.id, order);
    return order;
  }

  async updateStatus(id: string, status: OrderStatus, driverId?: string): Promise<OrderEntity | null> {
    const existing = await this.findById(id);
    if (!existing) return null;

    existing.status = status;
    if (driverId) existing.driverId = driverId;
    existing.updatedAt = new Date().toISOString();

    this.orders.set(id, existing);
    return existing;
  }

  async findByCustomer(customerId: string): Promise<OrderEntity[]> {
    return Array.from(this.orders.values()).filter(o => o.customerId === customerId);
  }

  async findByRestaurant(restaurantId: string): Promise<OrderEntity[]> {
    return Array.from(this.orders.values()).filter(o => o.restaurantId === restaurantId);
  }

  async clear(): Promise<void> {
    this.orders.clear();
  }
}

export const orderRepository = new OrderRepository();
