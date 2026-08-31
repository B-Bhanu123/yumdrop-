import { notificationPrefsService } from '../src/services/notification-prefs.service';

describe('Notification Preferences Unit Tests (Sub-Branch 1)', () => {
  test('Saves and retrieves user notification settings', () => {
    const saved = notificationPrefsService.setPreferences({
      userId: 'usr-prefs-101',
      emailEnabled: true,
      smsEnabled: false,
      pushEnabled: true
    });

    expect(saved.emailEnabled).toBe(true);
    expect(saved.smsEnabled).toBe(false);

    const fetched = notificationPrefsService.getPreferences('usr-prefs-101');
    expect(fetched.smsEnabled).toBe(false);
  });
});
