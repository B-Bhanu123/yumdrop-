export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: any[];
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
    timestamp: string;
  };
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

export interface UserProfileDto {
  id: string;
  email: string;
  fullName: string;
  phoneNumber?: string;
  role: 'CUSTOMER' | 'DRIVER' | 'RESTAURANT_OWNER' | 'ADMIN';
  isVerified: boolean;
  avatarUrl?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  createdAt: string;
  updatedAt: string;
}

export interface RestaurantDto {
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
  location: {
    latitude: number;
    longitude: number;
  };
  imageUrl: string;
  menuCategories: Array<{
    categoryId: string;
    name: string;
    description?: string;
  }>;
  createdAt: string;
}

export interface MenuItemDto {
  id: string;
  restaurantId: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  isAvailable: boolean;
  dietaryTags: string[]; // E.g., 'Vegan', 'Gluten-Free', 'Halal'
  options?: Array<{
    optionGroup: string;
    choices: Array<{
      name: string;
      additionalPrice: number;
    }>;
  }>;
}

export interface OrderItemDto {
  menuItemId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  selectedOptions?: Array<{
    groupName: string;
    choiceName: string;
    additionalPrice: number;
  }>;
  specialInstructions?: string;
}

export interface OrderDto {
  id: string;
  orderNumber: string;
  customerId: string;
  restaurantId: string;
  driverId?: string;
  status: 'CREATED' | 'PAID' | 'KITCHEN_ACCEPTED' | 'PREPARING' | 'READY_FOR_PICKUP' | 'DRIVER_ASSIGNED' | 'IN_TRANSIT' | 'DELIVERED' | 'CANCELLED';
  items: OrderItemDto[];
  subtotal: number;
  taxAmount: number;
  deliveryFee: number;
  tipAmount: number;
  totalAmount: number;
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    notes?: string;
    location: {
      latitude: number;
      longitude: number;
    };
  };
  paymentStatus: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
  estimatedDeliveryTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentTransactionDto {
  id: string;
  orderId: string;
  customerId: string;
  amount: number;
  currency: string;
  paymentMethod: 'CREDIT_CARD' | 'DEBIT_CARD' | 'PAYPAL' | 'APPLE_PAY' | 'GOOGLE_PAY';
  status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';
  providerTransactionId: string;
  failureReason?: string;
  createdAt: string;
}
