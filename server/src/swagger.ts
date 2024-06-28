import express from 'express';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import yamljs from 'yamljs';

const router = express.Router();

const swaggerDocument = yamljs.load(path.resolve(__dirname, './swagger.yaml'));

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;
