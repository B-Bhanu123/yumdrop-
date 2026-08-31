import { Request, Response, NextFunction } from 'express';
import { analyticsService } from '../services/analytics.service';

export class AnalyticsController {
  async recordMetric(req: Request, res: Response, next: NextFunction) {
    try {
      const metric = await analyticsService.recordOrderMetric(req.body);
      res.status(201).json({
        success: true,
        message: 'Order metric telemetry logged',
        data: metric
      });
    } catch (err) {
      next(err);
    }
  }

  async getExecutiveSummary(req: Request, res: Response, next: NextFunction) {
    try {
      const summary = await analyticsService.getExecutiveSummary();
      res.status(200).json({
        success: true,
        data: summary
      });
    } catch (err) {
      next(err);
    }
  }
}
