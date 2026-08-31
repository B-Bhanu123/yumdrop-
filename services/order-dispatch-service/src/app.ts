import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { OrderController } from './controllers/order.controller';
import { CustomError } from '@yumdrop/shared-core';

export const createApp = () => {
  const app = express();
  const controller = new OrderController();

  app.use(cors());
  app.use(express.json());

  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'UP', service: 'Order & Dispatch Service' });
  });

  app.post('/api/v1/orders', (req, res, next) => controller.createOrder(req, res, next));
  app.get('/api/v1/orders/:id', (req, res, next) => controller.getOrder(req, res, next));
  app.patch('/api/v1/orders/:id/status', (req, res, next) => controller.updateStatus(req, res, next));
  app.get('/api/v1/customers/:customerId/orders', (req, res, next) => controller.getCustomerOrders(req, res, next));

  app.use((err: any, _req: Request, res: Response, _next: NextFunction): void => {
    if (err instanceof CustomError) {
      res.status(err.statusCode).json({
        success: false,
        errors: err.serializeErrors()
      });
      return;
    }

    res.status(500).json({
      success: false,
      errors: [{ message: err.message || 'Internal Server Error' }]
    });
  });

  return app;
};
