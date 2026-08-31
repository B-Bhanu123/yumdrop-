import request from 'supertest';
import * as jwt from 'jsonwebtoken';
import { createApp } from '../src/app';
import { gatewayConfig } from '../src/config/gateway-config';

describe('API Gateway Service Tests', () => {
  const app = createApp();

  test('1. GET /health returns 200 and gateway metadata', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('UP');
    expect(res.body.service).toContain('YumDrop API Gateway');
  });

  test('2. GET /api/v1/routes returns route manifest', async () => {
    const res = await request(app).get('/api/v1/routes');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.routes)).toBe(true);
    expect(res.body.routes.length).toBeGreaterThan(0);
  });

  test('3. GET /api/v1/verify-token fails without authorization header', async () => {
    const res = await request(app).get('/api/v1/verify-token');
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  test('4. GET /api/v1/verify-token fails with malformed token', async () => {
    const res = await request(app)
      .get('/api/v1/verify-token')
      .set('Authorization', 'Bearer invalid.token.payload');
    expect(res.status).toBe(401);
    expect(res.body.errors[0].errorCode).toBe('INVALID_TOKEN');
  });

  test('5. GET /api/v1/verify-token succeeds with valid signed JWT', async () => {
    const payload = { id: 'usr-12345', email: 'bhanu@yumdrop.com', role: 'CUSTOMER' };
    const token = jwt.sign(payload, gatewayConfig.jwtSecret, { expiresIn: '1h' });

    const res = await request(app)
      .get('/api/v1/verify-token')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.user.id).toBe('usr-12345');
  });
});
