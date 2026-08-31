import request from 'supertest';
import { createApp } from '../src/app';
import { orderRepository } from '../src/repositories/order.repository';

describe('Order & Dispatch Microservice Tests', () => {
  const app = createApp();

  beforeEach(async () => {
    await orderRepository.clear();
  });

  test('1. GET /health returns 200 UP status', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.service).toContain('Order & Dispatch Service');
  });

  test('2. POST /api/v1/orders creates a new customer order', async () => {
    const res = await request(app).post('/api/v1/orders').send({
      customerId: 'usr-cust-123',
      restaurantId: 'rst-pizza-99',
      items: [
        { itemId: 'itm-1', name: 'Margherita Pizza', quantity: 2, price: 14.99 },
        { itemId: 'itm-2', name: 'Garlic Bread', quantity: 1, price: 5.99 }
      ],
      deliveryAddress: '742 Evergreen Terrace, Springfield',
      specialInstructions: 'Ring doorbell on arrival'
    });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe('CREATED');
    expect(res.body.data.subtotal).toBe(35.97);
    expect(res.body.data.totalAmount).toBeGreaterThan(35.97);
  });

  test('3. POST /api/v1/orders rejects order with empty items array', async () => {
    const res = await request(app).post('/api/v1/orders').send({
      customerId: 'usr-cust-123',
      restaurantId: 'rst-pizza-99',
      items: [],
      deliveryAddress: '742 Evergreen Terrace'
    });

    expect(res.status).toBe(400);
    expect(res.body.errors[0].errorCode).toBe('BAD_REQUEST');
  });

  test('4. PATCH /api/v1/orders/:id/status updates order status and driver assignment', async () => {
    const createRes = await request(app).post('/api/v1/orders').send({
      customerId: 'usr-cust-10',
      restaurantId: 'rst-burger-1',
      items: [{ itemId: 'itm-b1', name: 'Cheeseburger', quantity: 1, price: 10.0 }],
      deliveryAddress: '100 Tech Lane'
    });

    const orderId = createRes.body.data.id;
    const patchRes = await request(app)
      .patch(`/api/v1/orders/${orderId}/status`)
      .send({ status: 'DRIVER_ASSIGNED', driverId: 'drv-alex-77' });

    expect(patchRes.status).toBe(200);
    expect(patchRes.body.data.status).toBe('DRIVER_ASSIGNED');
    expect(patchRes.body.data.driverId).toBe('drv-alex-77');
  });

  test('5. GET /api/v1/customers/:customerId/orders retrieves all orders for a customer', async () => {
    const customerId = 'usr-cust-multi';
    await request(app).post('/api/v1/orders').send({
      customerId,
      restaurantId: 'rst-1',
      items: [{ itemId: 'i1', name: 'Noodles', quantity: 1, price: 12.0 }],
      deliveryAddress: 'Address 1'
    });

    await request(app).post('/api/v1/orders').send({
      customerId,
      restaurantId: 'rst-2',
      items: [{ itemId: 'i2', name: 'Sushi Roll', quantity: 2, price: 15.0 }],
      deliveryAddress: 'Address 1'
    });

    const listRes = await request(app).get(`/api/v1/customers/${customerId}/orders`);
    expect(listRes.status).toBe(200);
    expect(listRes.body.count).toBe(2);
    expect(listRes.body.data.length).toBe(2);
  });
});
