import { createApp } from './app';

const PORT = process.env.PORT || 3005;
const app = createApp();

app.listen(PORT, () => {
  console.log(`🔔 YumDrop Notification & Event Service running on port ${PORT}`);
});
