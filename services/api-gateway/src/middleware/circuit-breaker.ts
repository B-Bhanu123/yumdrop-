export type CircuitState = 'CLOSED' | 'OPEN' | 'HALF_OPEN';

export class CircuitBreaker {
  private failureThreshold: number = 3;
  private failureCount: number = 0;
  private state: CircuitState = 'CLOSED';

  execute<T>(fn: () => T): { result?: T; error?: string; state: CircuitState } {
    if (this.state === 'OPEN') {
      return { error: 'Circuit breaker is OPEN. Microservice request rejected.', state: 'OPEN' };
    }

    try {
      const result = fn();
      this.failureCount = 0;
      this.state = 'CLOSED';
      return { result, state: 'CLOSED' };
    } catch (err: any) {
      this.failureCount++;
      if (this.failureCount >= this.failureThreshold) {
        this.state = 'OPEN';
      }
      return { error: err.message || 'Execution error', state: this.state };
    }
  }

  reset() {
    this.failureCount = 0;
    this.state = 'CLOSED';
  }
}
