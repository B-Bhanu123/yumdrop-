export interface NotificationPreferences {
  userId: string;
  emailEnabled: boolean;
  smsEnabled: boolean;
  pushEnabled: boolean;
}

export class NotificationPrefsService {
  private userPrefs: Map<string, NotificationPreferences> = new Map();

  setPreferences(prefs: NotificationPreferences): NotificationPreferences {
    this.userPrefs.set(prefs.userId, prefs);
    return prefs;
  }

  getPreferences(userId: string): NotificationPreferences {
    return this.userPrefs.get(userId) || {
      userId,
      emailEnabled: true,
      smsEnabled: true,
      pushEnabled: true
    };
  }
}

export const notificationPrefsService = new NotificationPrefsService();
