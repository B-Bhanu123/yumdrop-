import { CircuitBreaker } from '../src/middleware/circuit-breaker';

describe('API Gateway Circuit Breaker Unit Tests (PR #6)', () => {
  test('Allows execution when circuit is CLOSED', () => {
    const cb = new CircuitBreaker();
    const res = cb.execute(() => 'success');
    expect(res.result).toBe('success');
    expect(res.state).toBe('CLOSED');
  });

  test('Opens circuit after 3 consecutive failures', () => {
    const cb = new CircuitBreaker();
    const failingFn = () => { throw new Error('Service Unavailable'); };

    cb.execute(failingFn);
    cb.execute(failingFn);
    const thirdRes = cb.execute(failingFn);

    expect(thirdRes.state).toBe('OPEN');

    // Subsequent calls should be rejected automatically
    const rejectedRes = cb.execute(() => 'should not run');
    expect(rejectedRes.error).toContain('Circuit breaker is OPEN');
  });
});
