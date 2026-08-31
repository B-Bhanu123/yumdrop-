import request from 'supertest';
import { createApp } from '../src/app';
import { analyticsRepository } from '../src/repositories/analytics.repository';

describe('Kitchen Analytics Microservice Tests', () => {
  const app = createApp();

  beforeEach(async () => {
    await analyticsRepository.clear();
  });

  test('1. GET /health returns 200 UP status', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.service).toContain('Kitchen Analytics');
  });

  test('2. POST /api/v1/analytics/metrics logs metric telemetry', async () => {
    const res = await request(app).post('/api/v1/analytics/metrics').send({
      orderId: 'ord-analytics-1',
      restaurantId: 'rst-pizza-1',
      totalAmount: 38.50,
      cuisineType: 'Italian',
      deliveryTimeMinutes: 28
    });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBeDefined();
    expect(res.body.data.cuisineType).toBe('Italian');
  });

  test('3. POST /api/v1/analytics/metrics rejects invalid negative amount', async () => {
    const res = await request(app).post('/api/v1/analytics/metrics').send({
      orderId: 'ord-bad',
      restaurantId: 'rst-1',
      totalAmount: -10,
      cuisineType: 'Fast Food'
    });

    expect(res.status).toBe(400);
    expect(res.body.errors[0].errorCode).toBe('BAD_REQUEST');
  });

  test('4. GET /api/v1/analytics/summary generates accurate executive metrics report', async () => {
    await request(app).post('/api/v1/analytics/metrics').send({
      orderId: 'o1',
      restaurantId: 'r1',
      totalAmount: 20.00,
      cuisineType: 'Mexican',
      deliveryTimeMinutes: 20
    });

    await request(app).post('/api/v1/analytics/metrics').send({
      orderId: 'o2',
      restaurantId: 'r2',
      totalAmount: 40.00,
      cuisineType: 'Mexican',
      deliveryTimeMinutes: 30
    });

    await request(app).post('/api/v1/analytics/metrics').send({
      orderId: 'o3',
      restaurantId: 'r3',
      totalAmount: 60.00,
      cuisineType: 'Japanese',
      deliveryTimeMinutes: 40
    });

    const summaryRes = await request(app).get('/api/v1/analytics/summary');

    expect(summaryRes.status).toBe(200);
    expect(summaryRes.body.data.totalOrdersProcessed).toBe(3);
    expect(summaryRes.body.data.totalGrossRevenue).toBe(120.00);
    expect(summaryRes.body.data.averageOrderValue).toBe(40.00);
    expect(summaryRes.body.data.averageDeliveryTimeMinutes).toBe(30);
    expect(summaryRes.body.data.topCuisines[0].cuisine).toBe('Mexican');
    expect(summaryRes.body.data.topCuisines[0].orderCount).toBe(2);
  });

  test('5. GET /api/v1/analytics/summary returns zeroes when no metrics exist', async () => {
    const summaryRes = await request(app).get('/api/v1/analytics/summary');

    expect(summaryRes.status).toBe(200);
    expect(summaryRes.body.data.totalOrdersProcessed).toBe(0);
    expect(summaryRes.body.data.totalGrossRevenue).toBe(0);
  });
});
