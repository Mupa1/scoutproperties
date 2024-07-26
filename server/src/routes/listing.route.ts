import express from 'express';

import {
  createListing,
  deleteListing,
  getListing,
  getListings,
  updateListing,
} from '@/controllers/listing.controller';

import { verifyToken } from '../middleware/verifyToken';

const router = express.Router();

router.get('/', getListings);
router.get('/:id', getListing);
router.post('/', verifyToken, createListing);
router.put('/:id', verifyToken, updateListing);
router.delete('/:id', verifyToken, deleteListing);

export default router;
