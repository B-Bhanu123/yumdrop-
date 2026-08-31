import { supportChatService } from '../src/services/support-chat.service';

describe('Support Chat Service Unit Tests (PR 4)', () => {
  test('Creates AI customer support ticket successfully', () => {
    const tkt = supportChatService.createTicket('usr-help-10', 'Where is my order?');
    expect(tkt.ticketId).toContain('tkt-');
    expect(tkt.status).toBe('OPEN');
  });
});
