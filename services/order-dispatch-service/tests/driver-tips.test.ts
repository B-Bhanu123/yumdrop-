import { driverTipsService } from '../src/services/driver-tips.service';

describe('Driver Tips Service Unit Tests (PR 1)', () => {
  test('Processes driver tip and qualifies for instant payout', () => {
    const res = driverTipsService.processDriverTip('drv-771', 'ord-9901', 7.50);
    expect(res.tipAmount).toBe(7.50);
    expect(res.instantPayoutEligible).toBe(true);
  });
});
