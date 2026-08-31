import { splitBillService } from '../src/services/split-bill.service';

describe('Split Bill Service Unit Tests (PR 3)', () => {
  test('Splits food bill equally among 3 diners', () => {
    const shares = splitBillService.calculateEqualSplit(90.00, ['usr-1', 'usr-2', 'usr-3']);
    expect(shares.length).toBe(3);
    expect(shares[0].amount).toBe(30.00);
  });
});
