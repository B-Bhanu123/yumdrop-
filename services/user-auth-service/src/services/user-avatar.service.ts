export interface UserAvatarPayload {
  userId: string;
  avatarUrl: string;
}

export class UserAvatarService {
  updateUserAvatar(payload: UserAvatarPayload) {
    if (!payload.userId || !payload.avatarUrl) {
      throw new Error('User ID and Avatar URL are required');
    }
    return { success: true, userId: payload.userId, avatarUrl: payload.avatarUrl };
  }
}

export const userAvatarService = new UserAvatarService();
