import { createApp } from './app';

const PORT = process.env.PORT || 3002;
const app = createApp();

app.listen(PORT, () => {
  console.log(`🍕 YumDrop Restaurant Catalog Service running on port ${PORT}`);
});
