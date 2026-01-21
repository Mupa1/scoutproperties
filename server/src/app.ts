import cookieParser from 'cookie-parser';
import cors, { CorsOptions } from 'cors';
import express from 'express';

import authRoute from './routes/auth.route';
import listingRoute from './routes/listing.route';
import swaggerRoute from './routes/swagger.route';
import userRoute from './routes/user.route';

const app = express();

const allowedOrigins = new Set([
  'http://localhost:4173',
  'https://www.scout-properties.com',
  'https://scout-properties.com',
]);

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // curl/server-to-server
    if (allowedOrigins.has(origin)) return callback(null, true);

    // Don't throw -> don't produce 500
    return callback(null, false);
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get('/', (_req, res) => {
  res.send('Scoutproperties API');
});

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api-docs', swaggerRoute);
app.use('/auth', authRoute);
app.use('/users', userRoute);
app.use('/listings', listingRoute);

export default app;
