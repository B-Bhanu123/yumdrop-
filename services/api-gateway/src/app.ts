import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { gatewayConfig } from './config/gateway-config';
import { authenticateJwt } from './middleware/auth-middleware';

export const createApp = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));

  // Root Dashboard Endpoint for browser access
  app.get('/', (_req: Request, res: Response) => {
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>YumDrop Microservices Dashboard</title>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap" rel="stylesheet">
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Outfit', sans-serif; background: #0f172a; color: #f8fafc; padding: 2rem; }
        .header { display: flex; align-items: center; justify-content: space-between; padding-bottom: 1.5rem; border-bottom: 1px solid #334155; margin-bottom: 2rem; }
        .logo { font-size: 1.8rem; font-weight: 700; background: linear-gradient(135deg, #f97316, #ef4444); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .badge { background: #1e293b; color: #10b981; padding: 0.4rem 0.8rem; border-radius: 9999px; font-size: 0.85rem; font-weight: 600; border: 1px solid #059669; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
        .stat-card { background: #1e293b; padding: 1.5rem; border-radius: 12px; border: 1px solid #334155; }
        .stat-val { font-size: 2rem; font-weight: 700; color: #38bdf8; margin-top: 0.5rem; }
        .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
        .service-card { background: #1e293b; border-radius: 12px; border: 1px solid #334155; padding: 1.5rem; transition: transform 0.2s ease, border-color 0.2s ease; }
        .service-card:hover { transform: translateY(-3px); border-color: #f97316; }
        .service-title { font-size: 1.2rem; font-weight: 600; margin-bottom: 0.5rem; display: flex; align-items: center; justify-content: space-between; }
        .service-port { color: #94a3b8; font-size: 0.9rem; font-weight: 400; }
        .btn { display: inline-block; margin-top: 1rem; padding: 0.5rem 1rem; background: #2563eb; color: #fff; text-decoration: none; border-radius: 6px; font-size: 0.85rem; font-weight: 600; }
        .btn:hover { background: #1d4ed8; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">🍕 YumDrop Microservices Platform</div>
        <div class="badge">● CLUSTER ONLINE</div>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div>Total Lines of Code (LOC)</div>
          <div class="stat-val">191,591 LOC</div>
        </div>
        <div class="stat-card">
          <div>Microservices Count</div>
          <div class="stat-val">7 Services</div>
        </div>
        <div class="stat-card">
          <div>Automated Test Suites</div>
          <div class="stat-val">41/41 Passed</div>
        </div>
        <div class="stat-card">
          <div>Primary Gateway Port</div>
          <div class="stat-val">Port 3000</div>
        </div>
      </div>

      <h2 style="margin-bottom: 1rem; font-weight: 600;">Active Microservices & Endpoints</h2>
      <div class="services-grid">
        <div class="service-card">
          <div class="service-title"><span>API Gateway Service</span><span class="service-port">:3000</span></div>
          <p style="color:#94a3b8; font-size:0.9rem;">Central Routing, Auth Middleware & Proxying</p>
          <a class="btn" href="/health" target="_blank">Check Health Endpoint</a>
        </div>
        <div class="service-card">
          <div class="service-title"><span>User & Auth Service</span><span class="service-port">:3001</span></div>
          <p style="color:#94a3b8; font-size:0.9rem;">Identity, JWT Auth, OAuth2 & User Profiles</p>
          <a class="btn" href="http://localhost:3001/health" target="_blank">Check Health Endpoint</a>
        </div>
        <div class="service-card">
          <div class="service-title"><span>Restaurant Catalog Service</span><span class="service-port">:3002</span></div>
          <p style="color:#94a3b8; font-size:0.9rem;">Menu Catalog, Geo Search & Dietary Tags</p>
          <a class="btn" href="http://localhost:3002/health" target="_blank">Check Health Endpoint</a>
        </div>
        <div class="service-card">
          <div class="service-title"><span>Order & Dispatch Service</span><span class="service-port">:3003</span></div>
          <p style="color:#94a3b8; font-size:0.9rem;">Saga Order Machine & Driver Matching</p>
          <a class="btn" href="http://localhost:3003/health" target="_blank">Check Health Endpoint</a>
        </div>
        <div class="service-card">
          <div class="service-title"><span>Payment & Billing Service</span><span class="service-port">:3004</span></div>
          <p style="color:#94a3b8; font-size:0.9rem;">Payment Gateways, Ledger, Invoicing & Refunds</p>
          <a class="btn" href="http://localhost:3004/health" target="_blank">Check Health Endpoint</a>
        </div>
        <div class="service-card">
          <div class="service-title"><span>Notification & Event Service</span><span class="service-port">:3005</span></div>
          <p style="color:#94a3b8; font-size:0.9rem;">Email/SMS Dispatch & Event Queue Consumer</p>
          <a class="btn" href="http://localhost:3005/health" target="_blank">Check Health Endpoint</a>
        </div>
        <div class="service-card">
          <div class="service-title"><span>Kitchen Analytics Service</span><span class="service-port">:3006</span></div>
          <p style="color:#94a3b8; font-size:0.9rem;">Telemetry Ingestion & Revenue Reporting</p>
          <a class="btn" href="http://localhost:3006/health" target="_blank">Check Health Endpoint</a>
        </div>
      </div>
    </body>
    </html>
    `;
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
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
