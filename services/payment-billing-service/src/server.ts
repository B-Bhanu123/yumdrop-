import { createApp } from './app';

const PORT = process.env.PORT || 3004;
const app = createApp();

app.listen(PORT, () => {
  console.log(`💳 YumDrop Payment & Billing Service running on port ${PORT}`);
});
