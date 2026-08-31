import { cancellationSagaService } from '../src/services/cancellation-saga.service';

describe('Order Cancellation Saga Unit Tests (Sub-Branch 3)', () => {
  test('Processes automated order cancellation and refund', () => {
    const res = cancellationSagaService.processOrderCancellation({
      orderId: 'ord-cancel-991',
      reason: 'Customer changed mind',
      refundAmount: 32.50
    });

    expect(res.status).toBe('CANCELLED_AND_REFUNDED');
    expect(res.refundAmount).toBe(32.50);
  });
});
