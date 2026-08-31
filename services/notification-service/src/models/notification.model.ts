export type NotificationChannel = 'EMAIL' | 'SMS' | 'PUSH' | 'IN_APP';
export type NotificationStatus = 'PENDING' | 'SENT' | 'FAILED';

export interface NotificationEntity {
  id: string;
  recipientId: string;
  recipientContact: string; // Email or phone number
  channel: NotificationChannel;
  subject: string;
  body: string;
  status: NotificationStatus;
  sentAt?: string;
  createdAt: string;
}
