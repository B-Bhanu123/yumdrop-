import { Request, Response, NextFunction } from 'express';
import { notificationService } from '../services/notification.service';

export class NotificationController {
  async sendNotification(req: Request, res: Response, next: NextFunction) {
    try {
      const notification = await notificationService.sendNotification(req.body);
      res.status(201).json({
        success: true,
        message: 'Notification dispatched successfully',
        data: notification
      });
    } catch (err) {
      next(err);
    }
  }

  async getRecipientHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const recipientId = req.params.recipientId;
      const history = await notificationService.getRecipientNotifications(recipientId);
      res.status(200).json({
        success: true,
        count: history.length,
        data: history
      });
    } catch (err) {
      next(err);
    }
  }

  async getNotification(req: Request, res: Response, next: NextFunction) {
    try {
      const notif = await notificationService.getNotificationById(req.params.id);
      res.status(200).json({
        success: true,
        data: notif
      });
    } catch (err) {
      next(err);
    }
  }
}
