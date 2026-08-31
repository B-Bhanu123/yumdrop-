import { createApp } from './app';
import { gatewayConfig } from './config/gateway-config';

const app = createApp();

app.listen(gatewayConfig.port, () => {
  console.log(`🚀 YumDrop API Gateway running on port ${gatewayConfig.port}`);
});
