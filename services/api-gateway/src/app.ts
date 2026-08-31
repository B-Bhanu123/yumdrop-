import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { gatewayConfig } from './config/gateway-config';
import { authenticateJwt } from './middleware/auth-middleware';
import { globalErrorHandler } from './middleware/error-handler';

export const createApp = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));

  // Gateway Health & Metadata Endpoints
  app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
      status: 'UP',
      service: 'YumDrop API Gateway',
      timestamp: new Date().toISOString(),
      registeredServices: Object.keys(gatewayConfig.services)
    });
  });

  app.get('/api/v1/routes', (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      routes: [
        { path: '/api/v1/auth/*', target: gatewayConfig.services.userAuth },
        { path: '/api/v1/users/*', target: gatewayConfig.services.userAuth, authRequired: true },
        { path: '/api/v1/restaurants/*', target: gatewayConfig.services.restaurantCatalog },
        { path: '/api/v1/orders/*', target: gatewayConfig.services.orderDispatch, authRequired: true },
        { path: '/api/v1/payments/*', target: gatewayConfig.services.paymentBilling, authRequired: true },
        { path: '/api/v1/notifications/*', target: gatewayConfig.services.notification, authRequired: true },
        { path: '/api/v1/analytics/*', target: gatewayConfig.services.analytics, authRequired: true }
      ]
    });
  });

  // Protected Gateway Verification Endpoint
  app.get('/api/v1/verify-token', authenticateJwt, (req: any, res: Response) => {
    res.status(200).json({
      success: true,
      message: 'Token is valid',
      user: req.user
    });
  });

  app.use(globalErrorHandler);

  return app;
};
