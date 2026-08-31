import { OrderMetricEntity, SystemAnalyticsSummary } from '../models/analytics.model';

export class AnalyticsRepository {
  private metrics: OrderMetricEntity[] = [];

  async logMetric(metric: OrderMetricEntity): Promise<OrderMetricEntity> {
    this.metrics.push(metric);
    return metric;
  }

  async getSummary(): Promise<SystemAnalyticsSummary> {
    const totalOrdersProcessed = this.metrics.length;
    if (totalOrdersProcessed === 0) {
      return {
        totalOrdersProcessed: 0,
        totalGrossRevenue: 0,
        averageOrderValue: 0,
        averageDeliveryTimeMinutes: 0,
        topCuisines: []
      };
    }

    const totalGrossRevenue = this.metrics.reduce((acc, m) => acc + m.totalAmount, 0);
    const averageOrderValue = parseFloat((totalGrossRevenue / totalOrdersProcessed).toFixed(2));
    const averageDeliveryTimeMinutes = Math.round(
      this.metrics.reduce((acc, m) => acc + m.deliveryTimeMinutes, 0) / totalOrdersProcessed
    );

    const cuisineCounts: Record<string, number> = {};
    this.metrics.forEach(m => {
      cuisineCounts[m.cuisineType] = (cuisineCounts[m.cuisineType] || 0) + 1;
    });

    const topCuisines = Object.entries(cuisineCounts)
      .map(([cuisine, orderCount]) => ({ cuisine, orderCount }))
      .sort((a, b) => b.orderCount - a.orderCount);

    return {
      totalOrdersProcessed,
      totalGrossRevenue: parseFloat(totalGrossRevenue.toFixed(2)),
      averageOrderValue,
      averageDeliveryTimeMinutes,
      topCuisines
    };
  }

  async clear(): Promise<void> {
    this.metrics = [];
  }
}

export const analyticsRepository = new AnalyticsRepository();
