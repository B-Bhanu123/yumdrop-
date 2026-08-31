import { createApp } from './app';

const PORT = process.env.PORT || 3003;
const app = createApp();

app.listen(PORT, () => {
  console.log(`📦 YumDrop Order & Dispatch Service running on port ${PORT}`);
});
