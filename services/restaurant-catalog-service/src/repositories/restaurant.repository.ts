import { RestaurantEntity, MenuItem } from '../models/restaurant.model';

export class RestaurantRepository {
  private restaurants: Map<string, RestaurantEntity> = new Map();

  async findById(id: string): Promise<RestaurantEntity | null> {
    return this.restaurants.get(id) || null;
  }

  async save(restaurant: RestaurantEntity): Promise<RestaurantEntity> {
    this.restaurants.set(restaurant.id, restaurant);
    return restaurant;
  }

  async search(query: { cuisine?: string; minRating?: number; search?: string }): Promise<RestaurantEntity[]> {
    return Array.from(this.restaurants.values()).filter(r => {
      if (query.cuisine && !r.cuisineTypes.map(c => c.toLowerCase()).includes(query.cuisine.toLowerCase())) {
        return false;
      }
      if (query.minRating && r.rating < query.minRating) {
        return false;
      }
      if (query.search) {
        const term = query.search.toLowerCase();
        const matchName = r.name.toLowerCase().includes(term);
        const matchDesc = r.description.toLowerCase().includes(term);
        if (!matchName && !matchDesc) return false;
      }
      return true;
    });
  }

  async addMenuItem(restaurantId: string, item: MenuItem): Promise<MenuItem | null> {
    const restaurant = await this.findById(restaurantId);
    if (!restaurant) return null;

    restaurant.menuItems.push(item);
    restaurant.updatedAt = new Date().toISOString();
    this.restaurants.set(restaurantId, restaurant);
    return item;
  }

  async clear(): Promise<void> {
    this.restaurants.clear();
  }
}

export const restaurantRepository = new RestaurantRepository();
