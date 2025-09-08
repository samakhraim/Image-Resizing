import express from 'express';
import { router as imageRoutes } from './routes/imageRoutes';

const app = express();

app.use('/api/images', imageRoutes);

// Start server only if not running tests
if (process.env.NODE_ENV !== 'test') {
  app.listen(5000, () => {
    console.log('🚀 Server running on http://localhost:5000');
  });
}

export default app; // 👈 super important
