import { tableBookingService } from '../src/services/table-booking.service';

describe('Table Booking Service Unit Tests (Sub-Branch 2)', () => {
  test('Creates and confirms restaurant dine-in table reservation', () => {
    const res = tableBookingService.createReservation('rest-gourmet-1', 'Bhanu', 4, '2026-09-01T19:00:00Z');
    expect(res.reservationId).toBeDefined();
    expect(res.status).toBe('CONFIRMED');
    expect(res.partySize).toBe(4);
  });
});
