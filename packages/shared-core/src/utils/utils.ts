import * as crypto from 'crypto';

export class CryptoUtils {
  static hashPassword(password: string, salt?: string): { hash: string; salt: string } {
    const activeSalt = salt || crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, activeSalt, 1000, 64, 'sha512').toString('hex');
    return { hash, salt: activeSalt };
  }

  static verifyPassword(password: string, hash: string, salt: string): boolean {
    const result = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return result === hash;
  }

  static generateRandomToken(bytes: number = 32): string {
    return crypto.randomBytes(bytes).toString('hex');
  }

  static generateUUID(): string {
    return crypto.randomUUID();
  }
}

export class ValidationUtils {
  static isValidEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  static isValidPhoneNumber(phone: string): boolean {
    const re = /^\+?[1-9]\d{1,14}$/;
    return re.test(phone);
  }

  static isNonEmptyString(val: any): boolean {
    return typeof val === 'string' && val.trim().length > 0;
  }

  static isPositiveNumber(val: any): boolean {
    return typeof val === 'number' && !isNaN(val) && val > 0;
  }
}

export class PaginationUtils {
  static getPaginationParams(pageInput?: any, limitInput?: any): { page: number; limit: number; offset: number } {
    const page = Math.max(1, parseInt(pageInput, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(limitInput, 10) || 10));
    const offset = (page - 1) * limit;
    return { page, limit, offset };
  }

  static buildPaginatedResponse<T>(data: T[], total: number, page: number, limit: number) {
    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        timestamp: new Date().toISOString()
      }
    };
  }
}
