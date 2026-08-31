export const gatewayConfig = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'yumdrop-super-secret-jwt-key-2026',
  services: {
    userAuth: process.env.USER_SERVICE_URL || 'http://localhost:3001',
    restaurantCatalog: process.env.RESTAURANT_SERVICE_URL || 'http://localhost:3002',
    orderDispatch: process.env.ORDER_SERVICE_URL || 'http://localhost:3003',
    paymentBilling: process.env.PAYMENT_SERVICE_URL || 'http://localhost:3004',
    notification: process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:3005',
    analytics: process.env.ANALYTICS_SERVICE_URL || 'http://localhost:3006'
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 500
  }
};
