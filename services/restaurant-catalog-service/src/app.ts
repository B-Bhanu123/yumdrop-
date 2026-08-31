import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { RestaurantController } from './controllers/restaurant.controller';
import { CustomError } from '@yumdrop/shared-core';

export const createApp = () => {
  const app = express();
  const controller = new RestaurantController();

  app.use(cors());
  app.use(express.json());

  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'UP', service: 'Restaurant Catalog Service' });
  });

  app.post('/api/v1/restaurants', (req, res, next) => controller.createRestaurant(req, res, next));
  app.get('/api/v1/restaurants', (req, res, next) => controller.searchRestaurants(req, res, next));
  app.get('/api/v1/restaurants/:id', (req, res, next) => controller.getRestaurant(req, res, next));
  app.post('/api/v1/restaurants/:id/items', (req, res, next) => controller.addMenuItem(req, res, next));

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
