import { NotificationEntity } from '../models/notification.model';

export class NotificationRepository {
  private notifications: Map<string, NotificationEntity> = new Map();

  async findById(id: string): Promise<NotificationEntity | null> {
    return this.notifications.get(id) || null;
  }

  async findByRecipient(recipientId: string): Promise<NotificationEntity[]> {
    return Array.from(this.notifications.values()).filter(n => n.recipientId === recipientId);
  }

  async save(notification: NotificationEntity): Promise<NotificationEntity> {
    this.notifications.set(notification.id, notification);
    return notification;
  }

  async clear(): Promise<void> {
    this.notifications.clear();
  }
}

export const notificationRepository = new NotificationRepository();
