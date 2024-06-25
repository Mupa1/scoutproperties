import express from 'express';

import swaggerRouter from './swagger';
import authRoute from './routes/auth.route';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Scoutproperties API');
});

app.use('/api-docs', swaggerRouter);
app.use('/api/auth', authRoute);

export default app;
