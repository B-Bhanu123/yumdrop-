import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { gatewayConfig } from './config/gateway-config';
import { authenticateJwt } from './middleware/auth-middleware';

export const createApp = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));

  // Serve static assets & single page food delivery web application
  const publicPath = path.join(__dirname, 'public');
  app.use(express.static(publicPath));

  app.get('/', (_req: Request, res: Response) => {
    res.sendFile(path.join(publicPath, 'index.html'));
  });

  // Gateway Health & Metadata Endpoints
  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({
      status: 'UP',
      service: 'YumDrop API Gateway',
      timestamp: new Date().toISOString(),
      registeredServices: Object.keys(gatewayConfig.services)
    });
  });

  app.get('/api/v1/routes', (_req: Request, res: Response) => {
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

  app.use((err: any, _req: Request, res: Response, _next: NextFunction): void => {
    console.error('[API Gateway Error]:', err);
    const statusCode = err.statusCode || err.status || 500;
    const message = err.message || 'Internal Gateway Error';
    res.status(statusCode).json({
      success: false,
      errors: [{ message, errorCode: err.errorCode || 'GATEWAY_ERROR' }],
      timestamp: new Date().toISOString()
    });
  });

  return app;
};
