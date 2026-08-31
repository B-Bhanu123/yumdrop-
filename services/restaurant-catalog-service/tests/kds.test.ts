import { kdsService } from '../src/services/kds.service';

describe('Kitchen Display System Unit Tests (PR #19)', () => {
  test('Enqueues kitchen order ticket and updates preparation state', () => {
    const ticket = kdsService.enqueueKitchenTicket('ord-kds-101', 'rest-55', ['Margherita Pizza', 'Garlic Bread']);
    expect(ticket.ticketId).toContain('kds-');
    expect(ticket.status).toBe('RECEIVED');

    const updated = kdsService.updateTicketStatus(ticket.ticketId, 'IN_PREPARATION');
    expect(updated?.status).toBe('IN_PREPARATION');
  });
});
