import { pushDispatcherService } from '../src/services/push-dispatcher.service';

describe('Push Dispatcher Service Unit Tests (PR #7)', () => {
  test('Dispatches mobile push notification successfully', async () => {
    const res = await pushDispatcherService.sendPushNotification({
      deviceToken: 'fcm-token-9921',
      title: 'Order Status Update',
      body: 'Your pizza is out for delivery!'
    });

    expect(res.success).toBe(true);
    expect(res.messageId).toContain('msg-push-');
  });
});
