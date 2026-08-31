export interface TableReservation {
  reservationId: string;
  restaurantId: string;
  customerName: string;
  partySize: number;
  reservationTime: string;
  status: 'CONFIRMED' | 'CANCELLED';
}

export class TableBookingService {
  private reservations: TableReservation[] = [];

  createReservation(restaurantId: string, customerName: string, partySize: number, reservationTime: string): TableReservation {
    const reservation: TableReservation = {
      reservationId: `res-${Math.random().toString(36).substr(2, 9)}`,
      restaurantId,
      customerName,
      partySize,
      reservationTime,
      status: 'CONFIRMED'
    };
    this.reservations.push(reservation);
    return reservation;
  }

  getRestaurantReservations(restaurantId: string): TableReservation[] {
    return this.reservations.filter(r => r.restaurantId === restaurantId);
  }
}

export const tableBookingService = new TableBookingService();
