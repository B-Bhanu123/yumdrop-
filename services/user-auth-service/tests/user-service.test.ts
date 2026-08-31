import request from 'supertest';
import { createApp } from '../src/app';
import { userRepository } from '../src/repositories/user.repository';

describe('User & Auth Microservice Tests', () => {
  const app = createApp();

  beforeEach(async () => {
    await userRepository.clear();
  });

  test('1. GET /health returns 200 UP status', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.service).toContain('User & Auth');
  });

  test('2. POST /api/v1/auth/register creates a new user and returns JWT token', async () => {
    const res = await request(app).post('/api/v1/auth/register').send({
      email: 'bhanu@yumdrop.com',
      password: 'SecurePassword123',
      fullName: 'Bhanu Customer',
      role: 'CUSTOMER'
    });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user.email).toBe('bhanu@yumdrop.com');
    expect(res.body.data.token).toBeDefined();
  });

  test('3. POST /api/v1/auth/register fails on duplicate email registration', async () => {
    await request(app).post('/api/v1/auth/register').send({
      email: 'duplicate@yumdrop.com',
      password: 'Password123',
      fullName: 'First Registration'
    });

    const res = await request(app).post('/api/v1/auth/register').send({
      email: 'duplicate@yumdrop.com',
      password: 'Password123',
      fullName: 'Second Registration'
    });

    expect(res.status).toBe(409);
    expect(res.body.errors[0].errorCode).toBe('CONFLICT');
  });

  test('4. POST /api/v1/auth/login authenticates registered user', async () => {
    await request(app).post('/api/v1/auth/register').send({
      email: 'driver@yumdrop.com',
      password: 'DriverSecret123',
      fullName: 'Alex Driver',
      role: 'DRIVER'
    });

    const res = await request(app).post('/api/v1/auth/login').send({
      email: 'driver@yumdrop.com',
      password: 'DriverSecret123'
    });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user.role).toBe('DRIVER');
    expect(res.body.data.token).toBeDefined();
  });

  test('5. GET /api/v1/users/:id fetches user profile', async () => {
    const regRes = await request(app).post('/api/v1/auth/register').send({
      email: 'owner@yumdrop.com',
      password: 'OwnerSecret123',
      fullName: 'Chef Owner',
      role: 'RESTAURANT_OWNER'
    });

    const userId = regRes.body.data.user.id;
    const profileRes = await request(app).get(`/api/v1/users/${userId}`);

    expect(profileRes.status).toBe(200);
    expect(profileRes.body.data.id).toBe(userId);
    expect(profileRes.body.data.fullName).toBe('Chef Owner');
  });
});
