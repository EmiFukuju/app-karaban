import express, { Request, Response } from 'express';
import { connectDB } from './db';
import authRouter from './routes/auth';

const app = express();
const port = 5000;

const startServer = async () => {
  await connectDB(); // Wait for DB connection to be established

  app.use(express.json());

  app.use('/api/auth', authRouter);

  app.get('/api/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'ok' });
  });

  app.listen(port, () => {
    console.log(`Backend server is running at http://localhost:${port}`);
  });
};

startServer();
