import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { PaymentController } from './controllers/payment.controller';
import { CustomError } from '@yumdrop/shared-core';

export const createApp = () => {
  const app = express();
  const controller = new PaymentController();

  app.use(cors());
  app.use(express.json());

  app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'UP', service: 'Payment & Billing Service' });
  });

  app.post('/api/v1/payments/process', (req, res, next) => controller.processPayment(req, res, next));
  app.post('/api/v1/payments/:id/refund', (req, res, next) => controller.refundPayment(req, res, next));
  app.get('/api/v1/payments/:id', (req, res, next) => controller.getTransaction(req, res, next));

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
      return res.status(err.statusCode).json({
        success: false,
        errors: err.serializeErrors()
      });
    }

    res.status(500).json({
      success: false,
      errors: [{ message: err.message || 'Internal Server Error' }]
    });
  });

  return app;
};
