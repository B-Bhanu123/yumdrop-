import { sagaOrchestratorService } from '../src/services/saga-orchestrator.service';

describe('Order Saga Orchestrator Unit Tests (PR #3)', () => {
  test('Executes full checkout saga workflow successfully', async () => {
    const res = await sagaOrchestratorService.executeCheckoutSaga('ord-saga-001');
    expect(res.success).toBe(true);
    expect(res.currentStep).toBe('COMPLETED');
  });

  test('Executes compensating transaction rollback on failure', async () => {
    const res = await sagaOrchestratorService.compensateCheckoutSaga('ord-saga-002');
    expect(res.compensated).toBe(true);
    expect(res.currentStep).toBe('COMPENSATED');
  });
});
