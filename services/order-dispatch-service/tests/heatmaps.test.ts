import { heatmapsService } from '../src/services/heatmaps.service';

describe('Heatmaps Service Unit Tests (PR #17)', () => {
  test('Calculates delivery zone surge pricing multiplier correctly', () => {
    const zone = heatmapsService.getZoneSurge('zone-downtown-nyc', 35);
    expect(zone.surgeMultiplier).toBe(1.8);
    expect(zone.activeOrders).toBe(35);
  });
});
