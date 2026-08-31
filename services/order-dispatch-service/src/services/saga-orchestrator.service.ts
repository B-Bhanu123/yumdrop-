export type SagaStep = 'ORDER_CREATED' | 'PAYMENT_RESERVED' | 'KITCHEN_NOTIFIED' | 'DRIVER_DISPATCHED' | 'COMPLETED' | 'COMPENSATED';

export class SagaOrchestratorService {
  private sagaSteps: Map<string, SagaStep[]> = new Map();

  async executeCheckoutSaga(orderId: string): Promise<{ success: boolean; currentStep: SagaStep }> {
    const steps: SagaStep[] = ['ORDER_CREATED', 'PAYMENT_RESERVED', 'KITCHEN_NOTIFIED', 'DRIVER_DISPATCHED', 'COMPLETED'];
    this.sagaSteps.set(orderId, steps);

    return { success: true, currentStep: 'COMPLETED' };
  }

  async compensateCheckoutSaga(orderId: string): Promise<{ compensated: boolean; currentStep: SagaStep }> {
    this.sagaSteps.set(orderId, ['COMPENSATED']);
    return { compensated: true, currentStep: 'COMPENSATED' };
  }
}

export const sagaOrchestratorService = new SagaOrchestratorService();
