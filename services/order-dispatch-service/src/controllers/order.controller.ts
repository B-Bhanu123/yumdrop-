import { Request, Response, NextFunction } from 'express';
import { orderService } from '../services/order.service';

export class OrderController {
  async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await orderService.createOrder(req.body);
      res.status(201).json({
        success: true,
        message: 'Order created successfully',
        data: order
      });
    } catch (err) {
      next(err);
    }
  }

  async getOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await orderService.getOrderById(req.params.id);
      res.status(200).json({
        success: true,
        data: order
      });
    } catch (err) {
      next(err);
    }
  }

  async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, driverId } = req.body;
      const order = await orderService.updateOrderStatus(req.params.id, status, driverId);
      res.status(200).json({
        success: true,
        message: `Order status updated to ${status}`,
        data: order
      });
    } catch (err) {
      next(err);
    }
  }

  async getCustomerOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const customerId = req.params.customerId;
      const orders = await orderService.getCustomerOrders(customerId);
      res.status(200).json({
        success: true,
        count: orders.length,
        data: orders
      });
    } catch (err) {
      next(err);
    }
  }
}
