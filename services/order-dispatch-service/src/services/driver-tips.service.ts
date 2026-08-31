export interface DriverTipSummary {
  driverId: string;
  orderId: string;
  tipAmount: number;
  instantPayoutEligible: boolean;
}

export class DriverTipsService {
  processDriverTip(driverId: string, orderId: string, tipAmount: number): DriverTipSummary {
    if (tipAmount < 0) {
      throw new Error('Tip amount cannot be negative');
    }
    return {
      driverId,
      orderId,
      tipAmount,
      instantPayoutEligible: tipAmount >= 5.0
    };
  }
}

export const driverTipsService = new DriverTipsService();
