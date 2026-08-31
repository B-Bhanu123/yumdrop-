import { userAvatarService } from '../src/services/user-avatar.service';

describe('User Avatar Service Unit Tests (PR #8)', () => {
  test('Updates user avatar URL successfully', () => {
    const res = userAvatarService.updateUserAvatar({
      userId: 'usr-991',
      avatarUrl: 'https://cdn.yumdrop.com/avatars/usr-991.jpg'
    });
    expect(res.success).toBe(true);
    expect(res.avatarUrl).toContain('avatars/usr-991.jpg');
  });
});
