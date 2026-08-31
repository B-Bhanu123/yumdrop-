import request from 'supertest';
import { createApp } from '../src/app';
import { notificationRepository } from '../src/repositories/notification.repository';

describe('Notification Microservice Tests', () => {
  const app = createApp();

  beforeEach(async () => {
    await notificationRepository.clear();
  });

  test('1. GET /health returns 200 UP status', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.service).toContain('Notification & Event Service');
  });

  test('2. POST /api/v1/notifications/send dispatches email notification', async () => {
    const res = await request(app).post('/api/v1/notifications/send').send({
      recipientId: 'usr-100',
      recipientContact: 'bhanu@yumdrop.com',
      channel: 'EMAIL',
      subject: 'Order Confirmed! #YD-10293',
      body: 'Your pizza order has been placed successfully and is being prepared by the kitchen.'
    });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe('SENT');
    expect(res.body.data.sentAt).toBeDefined();
  });

  test('3. POST /api/v1/notifications/send validates required fields', async () => {
    const res = await request(app).post('/api/v1/notifications/send').send({
      recipientId: 'usr-100',
      recipientContact: '', // Empty contact
      channel: 'SMS',
      subject: 'Test',
      body: ''
    });

    expect(res.status).toBe(400);
    expect(res.body.errors[0].errorCode).toBe('BAD_REQUEST');
  });

  test('4. GET /api/v1/notifications/recipient/:recipientId fetches notification log for user', async () => {
    const recipientId = 'usr-target-log';
    await request(app).post('/api/v1/notifications/send').send({
      recipientId,
      recipientContact: 'usr1@yumdrop.com',
      channel: 'SMS',
      subject: 'Driver Nearby',
      body: 'Your driver Alex is 2 minutes away!'
    });

    await request(app).post('/api/v1/notifications/send').send({
      recipientId,
      recipientContact: 'usr1@yumdrop.com',
      channel: 'PUSH',
      subject: 'Order Delivered',
      body: 'Enjoy your food!'
    });

    const historyRes = await request(app).get(`/api/v1/notifications/recipient/${recipientId}`);
    expect(historyRes.status).toBe(200);
    expect(historyRes.body.count).toBe(2);
    expect(historyRes.body.data.length).toBe(2);
  });

  test('5. GET /api/v1/notifications/:id retrieves single notification details', async () => {
    const sendRes = await request(app).post('/api/v1/notifications/send').send({
      recipientId: 'usr-single',
      recipientContact: 'usr-single@yumdrop.com',
      channel: 'EMAIL',
      subject: 'Receipt',
      body: 'Payment Receipt attached'
    });

    const notifId = sendRes.body.data.id;
    const getRes = await request(app).get(`/api/v1/notifications/${notifId}`);

    expect(getRes.status).toBe(200);
    expect(getRes.body.data.id).toBe(notifId);
    expect(getRes.body.data.channel).toBe('EMAIL');
  });
});
