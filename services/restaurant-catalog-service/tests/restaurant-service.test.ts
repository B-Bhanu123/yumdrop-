import request from 'supertest';
import { createApp } from '../src/app';
import { restaurantRepository } from '../src/repositories/restaurant.repository';

describe('Restaurant Catalog Microservice Tests', () => {
  const app = createApp();

  beforeEach(async () => {
    await restaurantRepository.clear();
  });

  test('1. GET /health returns 200 UP status', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.service).toContain('Restaurant Catalog Service');
  });

  test('2. POST /api/v1/restaurants creates a new restaurant entry', async () => {
    const res = await request(app).post('/api/v1/restaurants').send({
      ownerId: 'own-99',
      name: 'Bhanu Gourmet Pizza',
      description: 'Authentic wood-fired artisanal pizza',
      cuisineTypes: ['Italian', 'Pizza'],
      address: '100 Culinary Way, New York, NY'
    });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe('Bhanu Gourmet Pizza');
    expect(res.body.data.id).toBeDefined();
  });

  test('3. GET /api/v1/restaurants/:id retrieves restaurant profile by ID', async () => {
    const createRes = await request(app).post('/api/v1/restaurants').send({
      ownerId: 'own-100',
      name: 'Tokyo Ramen Hub',
      description: 'Traditional tonkotsu ramen',
      cuisineTypes: ['Japanese', 'Ramen'],
      address: '200 Sakura St, San Francisco, CA'
    });

    const rId = createRes.body.data.id;
    const getRes = await request(app).get(`/api/v1/restaurants/${rId}`);

    expect(getRes.status).toBe(200);
    expect(getRes.body.data.name).toBe('Tokyo Ramen Hub');
  });

  test('4. POST /api/v1/restaurants/:id/items adds a menu item to restaurant catalog', async () => {
    const createRes = await request(app).post('/api/v1/restaurants').send({
      ownerId: 'own-101',
      name: 'Burger Craft',
      description: 'Smash burgers & hand-cut fries',
      cuisineTypes: ['American', 'Burgers'],
      address: '300 Main St, Austin, TX'
    });

    const rId = createRes.body.data.id;
    const itemRes = await request(app).post(`/api/v1/restaurants/${rId}/items`).send({
      categoryId: 'cat_main',
      name: 'Double Bacon Smash Burger',
      description: 'Crispy smash patty with smoked cheddar',
      price: 12.99,
      dietaryTags: ['Non-Veg']
    });

    expect(itemRes.status).toBe(201);
    expect(itemRes.body.data.name).toBe('Double Bacon Smash Burger');
    expect(itemRes.body.data.price).toBe(12.99);
  });

  test('5. GET /api/v1/restaurants filters restaurants by cuisine type', async () => {
    await request(app).post('/api/v1/restaurants').send({
      ownerId: 'own-1',
      name: 'Taco Fiesta',
      description: 'Street tacos and margaritas',
      cuisineTypes: ['Mexican', 'Tacos'],
      address: '400 Sunset Blvd, LA'
    });

    await request(app).post('/api/v1/restaurants').send({
      ownerId: 'own-2',
      name: 'Pasta Palace',
      description: 'Homemade pasta',
      cuisineTypes: ['Italian'],
      address: '500 Roma Way, LA'
    });

    const searchRes = await request(app).get('/api/v1/restaurants?cuisine=Mexican');
    expect(searchRes.status).toBe(200);
    expect(searchRes.body.count).toBe(1);
    expect(searchRes.body.data[0].name).toBe('Taco Fiesta');
  });
});
