import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { AuthController, UserController } from './controllers/user.controller';
import { CustomError } from '@yumdrop/shared-core';

export const createApp = () => {
  const app = express();
  const authController = new AuthController();
  const userController = new UserController();

  app.use(cors());
  app.use(express.json());

  app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'UP', service: 'User & Auth Service' });
  });

  app.post('/api/v1/auth/register', (req, res, next) => authController.register(req, res, next));
  app.post('/api/v1/auth/login', (req, res, next) => authController.login(req, res, next));

  app.get('/api/v1/users/:id', (req, res, next) => userController.getProfile(req, res, next));
  app.put('/api/v1/users/:id', (req, res, next) => userController.updateProfile(req, res, next));

  // Global Error Middleware
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
