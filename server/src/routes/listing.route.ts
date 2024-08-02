import express from 'express';

import {
  createListing,
  getListing,
  getListings,
} from '@/controllers/listing.controller';

import { verifyToken } from '../middleware/verifyToken';

const router = express.Router();

router.get('/', getListings);
router.get('/:id', getListing);
router.post('/', verifyToken, createListing);

export default router;
