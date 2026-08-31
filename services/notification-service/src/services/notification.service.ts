import { CryptoUtils, BadRequestError, NotFoundError } from '@yumdrop/shared-core';
import { NotificationEntity, NotificationChannel } from '../models/notification.model';
import { notificationRepository } from '../repositories/notification.repository';

export class NotificationService {
  async sendNotification(params: {
    recipientId: string;
    recipientContact: string;
    channel: NotificationChannel;
    subject: string;
    body: string;
  }): Promise<NotificationEntity> {
    if (!params.recipientContact || params.recipientContact.trim().length === 0) {
      throw new BadRequestError('Recipient contact is required', 'recipientContact');
    }
    if (!params.body || params.body.trim().length === 0) {
      throw new BadRequestError('Notification body text is required', 'body');
    }

    const notifId = `notif_${CryptoUtils.generateRandomToken(8)}`;
    const newNotif: NotificationEntity = {
      id: notifId,
      recipientId: params.recipientId,
      recipientContact: params.recipientContact,
      channel: params.channel,
      subject: params.subject,
      body: params.body,
      status: 'SENT',
      sentAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    return await notificationRepository.save(newNotif);
  }

  async getRecipientNotifications(recipientId: string): Promise<NotificationEntity[]> {
    return await notificationRepository.findByRecipient(recipientId);
  }

  async getNotificationById(id: string): Promise<NotificationEntity> {
    const notif = await notificationRepository.findById(id);
    if (!notif) {
      throw new NotFoundError('Notification');
    }
    return notif;
  }
}

export const notificationService = new NotificationService();
