export interface CancellationRequest {
  orderId: string;
  reason: string;
  refundAmount: number;
}

export class CancellationSagaService {
  processOrderCancellation(request: CancellationRequest) {
    if (!request.orderId || request.refundAmount <= 0) {
      throw new Error('Invalid cancellation request details');
    }
    return {
      orderId: request.orderId,
      status: 'CANCELLED_AND_REFUNDED',
      refundAmount: request.refundAmount,
      timestamp: new Date().toISOString()
    };
  }
}

export const cancellationSagaService = new CancellationSagaService();
