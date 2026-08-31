import { CryptoUtils, BadRequestError } from '@yumdrop/shared-core';
import { OrderMetricEntity, SystemAnalyticsSummary } from '../models/analytics.model';
import { analyticsRepository } from '../repositories/analytics.repository';

export class AnalyticsService {
  async recordOrderMetric(params: {
    orderId: string;
    restaurantId: string;
    totalAmount: number;
    cuisineType: string;
    deliveryTimeMinutes?: number;
  }): Promise<OrderMetricEntity> {
    if (!params.totalAmount || params.totalAmount <= 0) {
      throw new BadRequestError('Total amount must be greater than zero', 'totalAmount');
    }

    const metric: OrderMetricEntity = {
      id: `metric_${CryptoUtils.generateRandomToken(8)}`,
      orderId: params.orderId,
      restaurantId: params.restaurantId,
      totalAmount: params.totalAmount,
      cuisineType: params.cuisineType || 'General',
      deliveryTimeMinutes: params.deliveryTimeMinutes || 25,
      timestamp: new Date().toISOString()
    };

    return await analyticsRepository.logMetric(metric);
  }

  async getExecutiveSummary(): Promise<SystemAnalyticsSummary> {
    return await analyticsRepository.getSummary();
  }
}

export const analyticsService = new AnalyticsService();
