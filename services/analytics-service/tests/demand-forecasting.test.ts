import { demandForecastingService } from '../src/services/demand-forecasting.service';

describe('Demand Forecasting Service Unit Tests (PR #5)', () => {
  test('Predicts hourly order volume with dinner peak multiplier', () => {
    const historical = Array(24).fill(50);
    const forecast = demandForecastingService.predictHourlyDemand(historical);

    expect(forecast.length).toBe(24);
    // Hour 19 (7 PM) should be peak dinner demand (50 * 1.8 = 90)
    expect(forecast[19].expectedOrderVolume).toBe(90);
    expect(forecast[19].confidenceScore).toBe(0.92);
  });
});
