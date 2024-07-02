import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import authRoute from './routes/auth.route';
import swaggerRouter from './swagger';

const app = express();

const CLIENT_URL =
  process.env.CLIENT_URL || 'https://scoutproperties.vercel.app';

app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Scoutproperties API');
});

app.use('/api-docs', swaggerRouter);
app.use('/api/auth', authRoute);

export default app;
