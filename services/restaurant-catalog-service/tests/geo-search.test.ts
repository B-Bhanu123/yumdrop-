import { geoSearchService } from '../src/services/geo-search.service';

describe('GeoSearch Service Unit Tests (PR #2)', () => {
  test('Calculates distance in kilometers correctly', () => {
    // Distance between NY and Philadelphia (~150 km)
    const dist = geoSearchService.calculateDistanceKm(40.7128, -74.006, 39.9526, -75.1652);
    expect(dist).toBeGreaterThan(130);
    expect(dist).toBeLessThan(170);
  });

  test('Validates delivery radius check', () => {
    const isNearby = geoSearchService.isWithinRadius(40.7128, -74.006, 40.715, -74.008, 5);
    expect(isNearby).toBe(true);
  });
});
