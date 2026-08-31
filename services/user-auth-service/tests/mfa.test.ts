import { mfaService } from '../src/services/mfa.service';

describe('MFA Service Unit Tests (PR #1)', () => {
  test('Generates TOTP secret and QR URL', () => {
    const res = mfaService.generateTotpSecret('usr-mfa-123');
    expect(res.secret).toBeDefined();
    expect(res.otpAuthUrl).toContain('otpauth://totp/YumDrop:usr-mfa-123');
  });

  test('Verifies valid 6-digit TOTP code', () => {
    const { secret } = mfaService.generateTotpSecret('usr-mfa-123');
    expect(mfaService.verifyTotpCode(secret, '123456')).toBe(true);
    expect(mfaService.verifyTotpCode(secret, '999999')).toBe(false);
  });
});
