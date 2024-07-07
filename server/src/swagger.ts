import express from 'express';
import fs from 'fs';
import path from 'path';
import swaggerUi from 'swagger-ui-express';

const router = express.Router();

const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, './swagger.json'), 'utf8'),
);

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;
