import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { NotificationController } from './controllers/notification.controller';
import { CustomError } from '@yumdrop/shared-core';

export const createApp = () => {
  const app = express();
  const controller = new NotificationController();

  app.use(cors());
  app.use(express.json());

  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'UP', service: 'Notification & Event Service' });
  });

  app.post('/api/v1/notifications/send', (req, res, next) => controller.sendNotification(req, res, next));
  app.get('/api/v1/notifications/recipient/:recipientId', (req, res, next) => controller.getRecipientHistory(req, res, next));
  app.get('/api/v1/notifications/:id', (req, res, next) => controller.getNotification(req, res, next));

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
