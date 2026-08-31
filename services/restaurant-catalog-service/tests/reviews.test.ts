import { restaurantReviewsService } from '../src/services/reviews.service';

describe('Restaurant Reviews Service Unit Tests (PR #9)', () => {
  test('Calculates average rating for restaurant reviews correctly', () => {
    restaurantReviewsService.addReview({ restaurantId: 'rest-1', userId: 'u1', rating: 5, comment: 'Awesome pizza!' });
    restaurantReviewsService.addReview({ restaurantId: 'rest-1', userId: 'u2', rating: 4, comment: 'Great food!' });

    const avg = restaurantReviewsService.getAverageRating('rest-1');
    expect(avg).toBe(4.5);
  });
});
