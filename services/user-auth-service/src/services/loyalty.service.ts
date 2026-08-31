export type LoyaltyTier = 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM';

export interface CustomerLoyaltyAccount {
  userId: string;
  points: number;
  tier: LoyaltyTier;
}

export class LoyaltyService {
  calculateTier(points: number): LoyaltyTier {
    if (points >= 5000) return 'PLATINUM';
    if (points >= 2500) return 'GOLD';
    if (points >= 1000) return 'SILVER';
    return 'BRONZE';
  }

  addRewardPoints(userId: string, currentPoints: number, earnedPoints: number): CustomerLoyaltyAccount {
    const totalPoints = currentPoints + earnedPoints;
    return {
      userId,
      points: totalPoints,
      tier: this.calculateTier(totalPoints)
    };
  }
}

export const loyaltyService = new LoyaltyService();
