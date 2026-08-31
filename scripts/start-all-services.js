const { fork } = require('child_process');
const path = require('path');

const SERVICES = [
  { name: 'API Gateway', script: 'services/api-gateway/src/server.ts', port: 3000 },
  { name: 'User & Auth Service', script: 'services/user-auth-service/src/server.ts', port: 3001 },
  { name: 'Restaurant Catalog Service', script: 'services/restaurant-catalog-service/src/server.ts', port: 3002 },
  { name: 'Order & Dispatch Service', script: 'services/order-dispatch-service/src/server.ts', port: 3003 },
  { name: 'Payment & Billing Service', script: 'services/payment-billing-service/src/server.ts', port: 3004 },
  { name: 'Notification Service', script: 'services/notification-service/src/server.ts', port: 3005 },
  { name: 'Analytics Service', script: 'services/analytics-service/src/server.ts', port: 3006 }
];

console.log('====================================================');
console.log('🚀 STARTING ALL 7 YUMDROP MICROSERVICES PARALLEL CLUSTER');
console.log('====================================================');

const tsNodeBin = path.resolve(__dirname, '../node_modules/ts-node/dist/bin.js');

SERVICES.forEach(svc => {
  const targetScript = path.resolve(__dirname, '..', svc.script);
  const child = fork(tsNodeBin, [targetScript], {
    env: { ...process.env, PORT: svc.port },
    stdio: 'inherit'
  });

  child.on('error', err => {
    console.error(`[${svc.name}] Failed to launch:`, err);
  });
});
