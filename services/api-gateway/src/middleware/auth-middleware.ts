import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { gatewayConfig } from '../config/gateway-config';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export const authenticateJwt = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      errors: [{ message: 'Authentication required. Missing Bearer token.', errorCode: 'UNAUTHORIZED' }]
    });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, gatewayConfig.jwtSecret) as any;
    req.user = {
      id: decoded.id || decoded.userId,
      email: decoded.email,
      role: decoded.role
    };
    req.headers['x-user-id'] = req.user.id;
    req.headers['x-user-role'] = req.user.role;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      errors: [{ message: 'Invalid or expired access token.', errorCode: 'INVALID_TOKEN' }]
    });
  }
};

export const authorizeRoles = (...roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        errors: [{ message: `Access forbidden for role ${req.user?.role || 'anonymous'}`, errorCode: 'FORBIDDEN' }]
      });
    }
    next();
  };
};
