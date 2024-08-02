import express from 'express';

import {
  deleteUser,
  getUsers,
  profileListings,
  updateUser,
} from '../controllers/user.controller';
import { verifyToken } from '../middleware/verifyToken';

const router = express.Router();

router.get('/', getUsers);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser);
router.get('/profileListings', verifyToken, profileListings);

export default router;
