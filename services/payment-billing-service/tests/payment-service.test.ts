import request from 'supertest';
import { createApp } from '../src/app';
import { paymentRepository } from '../src/repositories/payment.repository';

describe('Payment & Billing Microservice Tests', () => {
  const app = createApp();

  beforeEach(async () => {
    await paymentRepository.clear();
  });

  test('1. GET /health returns 200 UP status', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.service).toContain('Payment & Billing Service');
  });

  test('2. POST /api/v1/payments/process processes payment successfully and returns invoice', async () => {
    const res = await request(app).post('/api/v1/payments/process').send({
      orderId: 'ord-test-100',
      customerId: 'usr-cust-1',
      amount: 42.50,
      currency: 'USD',
      paymentMethod: 'CREDIT_CARD',
      cardNumber: '4111111111111111'
    });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.transaction.status).toBe('SUCCESS');
    expect(res.body.data.invoice.invoiceNumber).toBeDefined();
  });

  test('3. POST /api/v1/payments/process handles card declines cleanly', async () => {
    const res = await request(app).post('/api/v1/payments/process').send({
      orderId: 'ord-test-200',
      customerId: 'usr-cust-2',
      amount: 15.00,
      paymentMethod: 'CREDIT_CARD',
      cardNumber: '4000000000000002' // Trigger mock card decline
    });

    expect(res.status).toBe(400);
    expect(res.body.errors[0].message).toContain('declined');
  });

  test('4. POST /api/v1/payments/:id/refund refunds successful transaction', async () => {
    const processRes = await request(app).post('/api/v1/payments/process').send({
      orderId: 'ord-test-300',
      customerId: 'usr-cust-3',
      amount: 88.00,
      paymentMethod: 'PAYPAL'
    });

    const txId = processRes.body.data.transaction.id;
    const refundRes = await request(app)
      .post(`/api/v1/payments/${txId}/refund`)
      .send({ reason: 'Customer cancelled order prior to kitchen preparation' });

    expect(refundRes.status).toBe(200);
    expect(refundRes.body.data.status).toBe('REFUNDED');
    expect(refundRes.body.data.refundId).toBeDefined();
  });

  test('5. GET /api/v1/payments/:id retrieves transaction record', async () => {
    const processRes = await request(app).post('/api/v1/payments/process').send({
      orderId: 'ord-test-400',
      customerId: 'usr-cust-4',
      amount: 25.00,
      paymentMethod: 'APPLE_PAY'
    });

    const txId = processRes.body.data.transaction.id;
    const getRes = await request(app).get(`/api/v1/payments/${txId}`);

    expect(getRes.status).toBe(200);
    expect(getRes.body.data.id).toBe(txId);
    expect(getRes.body.data.amount).toBe(25.00);
  });
});
