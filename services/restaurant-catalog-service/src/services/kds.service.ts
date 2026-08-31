export interface KdsOrderTicket {
  ticketId: string;
  orderId: string;
  restaurantId: string;
  dishes: string[];
  status: 'RECEIVED' | 'IN_PREPARATION' | 'READY';
}

export class KdsService {
  private tickets: KdsOrderTicket[] = [];

  enqueueKitchenTicket(orderId: string, restaurantId: string, dishes: string[]): KdsOrderTicket {
    const ticket: KdsOrderTicket = {
      ticketId: `kds-${Math.random().toString(36).substr(2, 8)}`,
      orderId,
      restaurantId,
      dishes,
      status: 'RECEIVED'
    };
    this.tickets.push(ticket);
    return ticket;
  }

  updateTicketStatus(ticketId: string, status: 'IN_PREPARATION' | 'READY'): KdsOrderTicket | undefined {
    const ticket = this.tickets.find(t => t.ticketId === ticketId);
    if (ticket) {
      ticket.status = status;
    }
    return ticket;
  }
}

export const kdsService = new KdsService();
