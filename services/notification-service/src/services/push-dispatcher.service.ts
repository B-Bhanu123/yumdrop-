export interface PushNotificationPayload {
  deviceToken: string;
  title: string;
  body: string;
  data?: Record<string, string>;
}

export class PushDispatcherService {
  async sendPushNotification(payload: PushNotificationPayload): Promise<{ success: boolean; messageId: string }> {
    if (!payload.deviceToken || !payload.title) {
      throw new Error('Invalid push notification payload');
    }
    const messageId = `msg-push-${Math.random().toString(36).substr(2, 9)}`;
    return { success: true, messageId };
  }
}

export const pushDispatcherService = new PushDispatcherService();
