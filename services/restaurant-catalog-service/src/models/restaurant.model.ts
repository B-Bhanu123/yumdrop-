export interface MenuItem {
  id: string;
  restaurantId: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  isAvailable: boolean;
  dietaryTags: string[];
  imageUrl?: string;
  createdAt: string;
}

export interface RestaurantCategory {
  id: string;
  name: string;
  description?: string;
}

export interface RestaurantEntity {
  id: string;
  ownerId: string;
  name: string;
  description: string;
  cuisineTypes: string[];
  rating: number;
  reviewCount: number;
  deliveryTimeMinutes: number;
  deliveryFee: number;
  minimumOrderAmount: number;
  isOpen: boolean;
  address: string;
  categories: RestaurantCategory[];
  menuItems: MenuItem[];
  createdAt: string;
  updatedAt: string;
}
