export interface ForecastPoint {
  hourOfDay: number;
  expectedOrderVolume: number;
  confidenceScore: number;
}

export class DemandForecastingService {
  predictHourlyDemand(historicalAvg: number[]): ForecastPoint[] {
    return historicalAvg.map((avg, hour) => {
      const multiplier = hour >= 18 && hour <= 21 ? 1.8 : hour >= 11 && hour <= 14 ? 1.4 : 0.8;
      const expectedOrderVolume = Math.round(avg * multiplier);
      return {
        hourOfDay: hour,
        expectedOrderVolume,
        confidenceScore: 0.92
      };
    });
  }
}

export const demandForecastingService = new DemandForecastingService();
