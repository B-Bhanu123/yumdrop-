import { Request, Response, NextFunction } from 'express';
import { catalogService } from '../services/catalog.service';

export class RestaurantController {
  async createRestaurant(req: Request, res: Response, next: NextFunction) {
    try {
      const restaurant = await catalogService.createRestaurant(req.body);
      res.status(201).json({
        success: true,
        message: 'Restaurant created successfully',
        data: restaurant
      });
    } catch (err) {
      next(err);
    }
  }

  async getRestaurant(req: Request, res: Response, next: NextFunction) {
    try {
      const restaurant = await catalogService.getRestaurantById(req.params.id);
      res.status(200).json({
        success: true,
        data: restaurant
      });
    } catch (err) {
      next(err);
    }
  }

  async searchRestaurants(req: Request, res: Response, next: NextFunction) {
    try {
      const { cuisine, minRating, search } = req.query;
      const results = await catalogService.searchRestaurants({
        cuisine: cuisine as string,
        minRating: minRating ? parseFloat(minRating as string) : undefined,
        search: search as string
      });
      res.status(200).json({
        success: true,
        count: results.length,
        data: results
      });
    } catch (err) {
      next(err);
    }
  }

  async addMenuItem(req: Request, res: Response, next: NextFunction) {
    try {
      const item = await catalogService.addMenuItem(req.params.id, req.body);
      res.status(201).json({
        success: true,
        message: 'Menu item added successfully',
        data: item
      });
    } catch (err) {
      next(err);
    }
  }
}
