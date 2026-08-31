import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service';
import { userRepository } from '../repositories/user.repository';
import { NotFoundError } from '@yumdrop/shared-core';

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.register(req.body);
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: result
      });
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: result
      });
    } catch (err) {
      next(err);
    }
  }
}

export class UserController {
  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id || (req as any).user?.id;
      const user = await userRepository.findById(userId);
      if (!user) {
        throw new NotFoundError('User profile');
      }

      res.status(200).json({
        success: true,
        data: authService.sanitizeUser(user)
      });
    } catch (err) {
      next(err);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const updated = await userRepository.update(userId, req.body);
      if (!updated) {
        throw new NotFoundError('User profile');
      }

      res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        data: authService.sanitizeUser(updated)
      });
    } catch (err) {
      next(err);
    }
  }
}
