import { Request, Response, NextFunction } from 'express';
import { paymentService } from '../services/payment.service';

export class PaymentController {
  async processPayment(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await paymentService.processPayment(req.body);
      res.status(200).json({
        success: true,
        message: 'Payment processed successfully',
        data: result
      });
    } catch (err) {
      next(err);
    }
  }

  async refundPayment(req: Request, res: Response, next: NextFunction) {
    try {
      const { reason } = req.body;
      const refunded = await paymentService.refundPayment(req.params.id, reason);
      res.status(200).json({
        success: true,
        message: 'Payment refunded successfully',
        data: refunded
      });
    } catch (err) {
      next(err);
    }
  }

  async getTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      const tx = await paymentService.getTransactionById(req.params.id);
      res.status(200).json({
        success: true,
        data: tx
      });
    } catch (err) {
      next(err);
    }
  }
}
