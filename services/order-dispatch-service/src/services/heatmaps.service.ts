export interface DeliveryZoneSurge {
  zoneId: string;
  activeOrders: number;
  surgeMultiplier: number;
}

export class HeatmapsService {
  calculateSurgeMultiplier(activeOrders: number): number {
    if (activeOrders >= 50) return 2.5;
    if (activeOrders >= 30) return 1.8;
    if (activeOrders >= 15) return 1.3;
    return 1.0;
  }

  getZoneSurge(zoneId: string, activeOrders: number): DeliveryZoneSurge {
    return {
      zoneId,
      activeOrders,
      surgeMultiplier: this.calculateSurgeMultiplier(activeOrders)
    };
  }
}

export const heatmapsService = new HeatmapsService();
