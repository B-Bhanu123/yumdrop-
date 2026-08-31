import { loyaltyService } from '../src/services/loyalty.service';

describe('Loyalty Service Unit Tests (PR #18)', () => {
  test('Calculates customer VIP reward points and upgrades to GOLD tier', () => {
    const account = loyaltyService.addRewardPoints('usr-vip-001', 2000, 600);
    expect(account.points).toBe(2600);
    expect(account.tier).toBe('GOLD');
  });
});
