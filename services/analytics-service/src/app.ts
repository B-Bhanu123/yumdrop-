import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { AnalyticsController } from './controllers/analytics.controller';
import { CustomError } from '@yumdrop/shared-core';

export const createApp = () => {
  const app = express();
  const controller = new AnalyticsController();

  app.use(cors());
  app.use(express.json());

  app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'UP', service: 'Kitchen Analytics & AI Service' });
  });

  app.post('/api/v1/analytics/metrics', (req, res, next) => controller.recordMetric(req, res, next));
  app.get('/api/v1/analytics/summary', (req, res, next) => controller.getExecutiveSummary(req, res, next));

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
