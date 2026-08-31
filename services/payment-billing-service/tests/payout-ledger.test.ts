import { payoutLedgerService } from '../src/services/payout-ledger.service';

describe('Payout Ledger Service Unit Tests (PR #4)', () => {
  test('Creates and records driver payout correctly', () => {
    const payout = payoutLedgerService.createPayout('drv-881', 145.50);
    expect(payout.payoutId).toBeDefined();
    expect(payout.amount).toBe(145.50);
    expect(payout.status).toBe('COMPLETED');
  });

  test('Retrieves payouts for specific driver', () => {
    payoutLedgerService.createPayout('drv-992', 210.00);
    const list = payoutLedgerService.getDriverPayouts('drv-992');
    expect(list.length).toBe(1);
    expect(list[0].amount).toBe(210.00);
  });
});
