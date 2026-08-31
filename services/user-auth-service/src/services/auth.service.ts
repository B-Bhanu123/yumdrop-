import * as jwt from 'jsonwebtoken';
import { CryptoUtils, ValidationUtils, BadRequestError, UnauthorizedError, ConflictError } from '@yumdrop/shared-core';
import { UserEntity, UserRole } from '../models/user.model';
import { userRepository } from '../repositories/user.repository';

const JWT_SECRET = process.env.JWT_SECRET || 'yumdrop-super-secret-jwt-key-2026';

export class AuthService {
  async register(params: {
    email: string;
    password: string;
    fullName: string;
    role?: UserRole;
    phoneNumber?: string;
  }) {
    if (!ValidationUtils.isValidEmail(params.email)) {
      throw new BadRequestError('Invalid email address format', 'email');
    }
    if (!params.password || params.password.length < 6) {
      throw new BadRequestError('Password must be at least 6 characters long', 'password');
    }

    const existing = await userRepository.findByEmail(params.email);
    if (existing) {
      throw new ConflictError('A user with this email address already exists');
    }

    const { hash, salt } = CryptoUtils.hashPassword(params.password);
    const userId = `usr_${CryptoUtils.generateRandomToken(8)}`;

    const newUser: UserEntity = {
      id: userId,
      email: params.email.toLowerCase(),
      passwordHash: hash,
      passwordSalt: salt,
      fullName: params.fullName,
      phoneNumber: params.phoneNumber,
      role: params.role || 'CUSTOMER',
      isVerified: true,
      addresses: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await userRepository.save(newUser);

    const token = this.generateToken(newUser);
    return { user: this.sanitizeUser(newUser), token };
  }

  async login(email: string, pass: string) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedError('Invalid credentials provided');
    }

    const isValid = CryptoUtils.verifyPassword(pass, user.passwordHash, user.passwordSalt);
    if (!isValid) {
      throw new UnauthorizedError('Invalid credentials provided');
    }

    const token = this.generateToken(user);
    return { user: this.sanitizeUser(user), token };
  }

  private generateToken(user: UserEntity): string {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
  }

  sanitizeUser(user: UserEntity) {
    const { passwordHash, passwordSalt, ...safe } = user;
    return safe;
  }
}

export const authService = new AuthService();
