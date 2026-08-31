export interface SupportTicket {
  ticketId: string;
  userId: string;
  subject: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
}

export class SupportChatService {
  createTicket(userId: string, subject: string): SupportTicket {
    if (!userId || !subject) {
      throw new Error('User ID and subject are required');
    }
    return {
      ticketId: `tkt-${Math.random().toString(36).substr(2, 8)}`,
      userId,
      subject,
      status: 'OPEN'
    };
  }
}

export const supportChatService = new SupportChatService();
