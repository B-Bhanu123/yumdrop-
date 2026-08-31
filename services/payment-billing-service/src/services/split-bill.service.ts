export interface SplitShare {
  userId: string;
  amount: number;
}

export class SplitBillService {
  calculateEqualSplit(totalAmount: number, userIds: string[]): SplitShare[] {
    if (userIds.length === 0 || totalAmount <= 0) {
      throw new Error('Invalid total amount or participants list');
    }
    const perPerson = parseFloat((totalAmount / userIds.length).toFixed(2));
    return userIds.map(userId => ({ userId, amount: perPerson }));
  }
}

export const splitBillService = new SplitBillService();
