import { Request, Response, NextFunction } from 'express';

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('[API Gateway Error]:', err);

  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Internal Gateway Error';

  res.status(statusCode).json({
    success: false,
    errors: [{ message, errorCode: err.errorCode || 'GATEWAY_ERROR' }],
    timestamp: new Date().toISOString()
  });
};
