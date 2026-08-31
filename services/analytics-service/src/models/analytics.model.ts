export interface OrderMetricEntity {
  id: string;
  orderId: string;
  restaurantId: string;
  totalAmount: number;
  cuisineType: string;
  deliveryTimeMinutes: number;
  timestamp: string;
}

export interface SystemAnalyticsSummary {
  totalOrdersProcessed: number;
  totalGrossRevenue: number;
  averageOrderValue: number;
  averageDeliveryTimeMinutes: number;
  topCuisines: Array<{ cuisine: string; orderCount: number }>;
}
