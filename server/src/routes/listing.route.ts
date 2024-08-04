import express from 'express';

import {
  createListing,
  deleteListing,
  getListing,
  getListings,
  updateListing,
} from '../controllers/listing.controller';
import { verifyToken } from '../middleware/verifyToken';

const router = express.Router();

router.post('/', verifyToken, createListing);
router.get('/', getListings);
router.get('/:id', getListing);
router.put('/:id', verifyToken, updateListing);
router.delete('/:id', verifyToken, deleteListing);

export default router;
