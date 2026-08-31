import { createApp } from './app';

const PORT = process.env.PORT || 3006;
const app = createApp();

app.listen(PORT, () => {
  console.log(`📊 YumDrop Kitchen Analytics Service running on port ${PORT}`);
});
