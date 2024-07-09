import cookieParser from 'cookie-parser';
import cors, { CorsOptions } from 'cors';
import express from 'express';

import authRoute from './routes/auth.route';
import swaggerRouter from './swagger';

const app = express();

const CLIENT_URL = process.env.CLIENT_URL;
const allowedOrigins = [CLIENT_URL, 'https://www.scout-properties.com'];

const corsOptions: CorsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void,
  ) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Scoutproperties API');
});

// app.use('/api-docs', swaggerRouter);
app.use('/auth', authRoute);

export default app;
