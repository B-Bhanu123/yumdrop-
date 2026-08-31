import { NotFoundError, BadRequestError, ForbiddenError, CryptoUtils, ValidationUtils, PaginationUtils } from '../src';

describe('Shared Core Package Tests', () => {
  describe('Custom Errors', () => {
    test('NotFoundError serializes correctly', () => {
      const err = new NotFoundError('User');
      expect(err.statusCode).toBe(404);
      expect(err.serializeErrors()).toEqual([{ message: 'User not found', errorCode: 'NOT_FOUND' }]);
    });

    test('BadRequestError serializes with field info', () => {
      const err = new BadRequestError('Invalid email', 'email');
      expect(err.statusCode).toBe(400);
      expect(err.serializeErrors()).toEqual([{ message: 'Invalid email', field: 'email', errorCode: 'BAD_REQUEST' }]);
    });

    test('ForbiddenError has 403 status code', () => {
      const err = new ForbiddenError();
      expect(err.statusCode).toBe(403);
    });
  });

  describe('Crypto & Validation Utilities', () => {
    test('Password hashing and verification works correctly', () => {
      const pass = 'SuperSecret123!';
      const { hash, salt } = CryptoUtils.hashPassword(pass);
      expect(hash).toBeDefined();
      expect(salt).toBeDefined();

      const isValid = CryptoUtils.verifyPassword(pass, hash, salt);
      expect(isValid).toBe(true);

      const isInvalid = CryptoUtils.verifyPassword('WrongPass', hash, salt);
      expect(isInvalid).toBe(false);
    });

    test('ValidationUtils validates email correctly', () => {
      expect(ValidationUtils.isValidEmail('test@yumdrop.com')).toBe(true);
      expect(ValidationUtils.isValidEmail('invalid-email')).toBe(false);
    });
  });

  describe('Pagination Utilities', () => {
    test('PaginationParams computes offsets correctly', () => {
      const params = PaginationUtils.getPaginationParams('2', '15');
      expect(params.page).toBe(2);
      expect(params.limit).toBe(15);
      expect(params.offset).toBe(15);
    });
  });
});
