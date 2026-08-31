import { CryptoUtils, BadRequestError, NotFoundError } from '@yumdrop/shared-core';
import { OrderEntity, OrderItemEntity, OrderStatus } from '../models/order.model';
import { orderRepository } from '../repositories/order.repository';

export class OrderService {
  async createOrder(params: {
    customerId: string;
    restaurantId: string;
    items: OrderItemEntity[];
    deliveryAddress: string;
    specialInstructions?: string;
  }): Promise<OrderEntity> {
    if (!params.items || params.items.length === 0) {
      throw new BadRequestError('Order must contain at least one item', 'items');
    }
    if (!params.deliveryAddress || params.deliveryAddress.trim().length === 0) {
      throw new BadRequestError('Delivery address is required', 'deliveryAddress');
    }

    const subtotal = params.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const taxAmount = parseFloat((subtotal * 0.08).toFixed(2));
    const deliveryFee = 3.99;
    const totalAmount = parseFloat((subtotal + taxAmount + deliveryFee).toFixed(2));

    const orderId = `ord_${CryptoUtils.generateRandomToken(8)}`;
    const orderNumber = `YD-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder: OrderEntity = {
      id: orderId,
      orderNumber,
      customerId: params.customerId,
      restaurantId: params.restaurantId,
      status: 'CREATED',
      items: params.items,
      subtotal,
      taxAmount,
      deliveryFee,
      totalAmount,
      deliveryAddress: params.deliveryAddress,
      specialInstructions: params.specialInstructions,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return await orderRepository.save(newOrder);
  }

  async updateOrderStatus(orderId: string, status: OrderStatus, driverId?: string): Promise<OrderEntity> {
    const existing = await orderRepository.findById(orderId);
    if (!existing) {
      throw new NotFoundError('Order');
    }

    const updated = await orderRepository.updateStatus(orderId, status, driverId);
    if (!updated) {
      throw new NotFoundError('Order');
    }
    return updated;
  }

  async getOrderById(orderId: string): Promise<OrderEntity> {
    const order = await orderRepository.findById(orderId);
    if (!order) {
      throw new NotFoundError('Order');
    }
    return order;
  }

  async getCustomerOrders(customerId: string): Promise<OrderEntity[]> {
    return await orderRepository.findByCustomer(customerId);
  }
}

export const orderService = new OrderService();
