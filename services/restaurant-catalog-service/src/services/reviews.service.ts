export interface ReviewPayload {
  restaurantId: string;
  userId: string;
  rating: number;
  comment: string;
}

export class RestaurantReviewsService {
  private reviews: ReviewPayload[] = [];

  addReview(payload: ReviewPayload) {
    if (payload.rating < 1 || payload.rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }
    this.reviews.push(payload);
    return { success: true, totalReviews: this.reviews.length };
  }

  getAverageRating(restaurantId: string): number {
    const list = this.reviews.filter(r => r.restaurantId === restaurantId);
    if (list.length === 0) return 5.0;
    const sum = list.reduce((a, b) => a + b.rating, 0);
    return parseFloat((sum / list.length).toFixed(1));
  }
}

export const restaurantReviewsService = new RestaurantReviewsService();
