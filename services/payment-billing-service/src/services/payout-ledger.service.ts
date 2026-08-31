export interface PayoutRecord {
  payoutId: string;
  driverId: string;
  amount: number;
  currency: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  timestamp: string;
}

export class PayoutLedgerService {
  private ledger: PayoutRecord[] = [];

  createPayout(driverId: string, amount: number): PayoutRecord {
    const record: PayoutRecord = {
      payoutId: `pay-${Math.random().toString(36).substr(2, 9)}`,
      driverId,
      amount,
      currency: 'USD',
      status: 'COMPLETED',
      timestamp: new Date().toISOString()
    };
    this.ledger.push(record);
    return record;
  }

  getDriverPayouts(driverId: string): PayoutRecord[] {
    return this.ledger.filter(p => p.driverId === driverId);
  }
}

export const payoutLedgerService = new PayoutLedgerService();
