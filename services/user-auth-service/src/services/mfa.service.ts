import { CryptoUtils } from '@yumdrop/shared-core';

export class MfaService {
  generateTotpSecret(userId: string) {
    const secret = CryptoUtils.generateRandomToken(16);
    const otpAuthUrl = `otpauth://totp/YumDrop:${userId}?secret=${secret}&issuer=YumDrop`;
    return { secret, otpAuthUrl };
  }

  verifyTotpCode(secret: string, code: string): boolean {
    if (!code || code.length !== 6 || isNaN(Number(code))) {
      return false;
    }
    // Mock TOTP verification algorithm for demonstration
    return secret.length > 0 && code === '123456';
  }
}

export const mfaService = new MfaService();
