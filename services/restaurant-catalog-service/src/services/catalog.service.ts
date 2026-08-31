import { CryptoUtils, BadRequestError, NotFoundError } from '@yumdrop/shared-core';
import { RestaurantEntity, MenuItem } from '../models/restaurant.model';
import { restaurantRepository } from '../repositories/restaurant.repository';

export class CatalogService {
  async createRestaurant(data: {
    ownerId: string;
    name: string;
    description: string;
    cuisineTypes: string[];
    address: string;
    deliveryTimeMinutes?: number;
    deliveryFee?: number;
    minimumOrderAmount?: number;
  }): Promise<RestaurantEntity> {
    if (!data.name || data.name.trim().length === 0) {
      throw new BadRequestError('Restaurant name is required', 'name');
    }

    const restaurantId = `rst_${CryptoUtils.generateRandomToken(8)}`;
    const newRestaurant: RestaurantEntity = {
      id: restaurantId,
      ownerId: data.ownerId,
      name: data.name,
      description: data.description,
      cuisineTypes: data.cuisineTypes || [],
      rating: 4.5,
      reviewCount: 1,
      deliveryTimeMinutes: data.deliveryTimeMinutes || 30,
      deliveryFee: data.deliveryFee || 2.99,
      minimumOrderAmount: data.minimumOrderAmount || 10.0,
      isOpen: true,
      address: data.address,
      categories: [
        { id: 'cat_main', name: 'Main Courses' },
        { id: 'cat_beverage', name: 'Drinks & Beverages' }
      ],
      menuItems: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return await restaurantRepository.save(newRestaurant);
  }

  async addMenuItem(restaurantId: string, itemData: {
    categoryId: string;
    name: string;
    description: string;
    price: number;
    dietaryTags?: string[];
  }): Promise<MenuItem> {
    const restaurant = await restaurantRepository.findById(restaurantId);
    if (!restaurant) {
      throw new NotFoundError('Restaurant');
    }

    if (!itemData.price || itemData.price <= 0) {
      throw new BadRequestError('Menu item price must be a positive number', 'price');
    }

    const newItem: MenuItem = {
      id: `itm_${CryptoUtils.generateRandomToken(8)}`,
      restaurantId,
      categoryId: itemData.categoryId,
      name: itemData.name,
      description: itemData.description,
      price: itemData.price,
      isAvailable: true,
      dietaryTags: itemData.dietaryTags || [],
      createdAt: new Date().toISOString()
    };

    await restaurantRepository.addMenuItem(restaurantId, newItem);
    return newItem;
  }

  async getRestaurantById(id: string): Promise<RestaurantEntity> {
    const restaurant = await restaurantRepository.findById(id);
    if (!restaurant) {
      throw new NotFoundError('Restaurant');
    }
    return restaurant;
  }

  async searchRestaurants(params: { cuisine?: string; minRating?: number; search?: string }) {
    return await restaurantRepository.search(params);
  }
}

export const catalogService = new CatalogService();
