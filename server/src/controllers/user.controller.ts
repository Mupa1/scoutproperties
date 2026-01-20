import { Response } from 'express';

import { handleError } from '../lib/errors';
import { hashPassword } from '../lib/password';
import { prisma } from '../lib/prisma';
import { CustomRequest } from '../types';

export const getUsers = async (req: CustomRequest, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (err) {
    return handleError(res, err, 'Failed to get users!');
  }
};

export const getUser = async (req: CustomRequest, res: Response) => {
  const { id } = req.params;
  const idString = typeof id === 'string' ? id : id[0];

  try {
    const user = await prisma.user.findUnique({
      where: { id: idString },
    });
    res.status(200).json(user);
  } catch (err) {
    return handleError(res, err, 'Failed to get user!');
  }
};

export const updateUser = async (req: CustomRequest, res: Response) => {
  const { id } = req.params;
  const idString = typeof id === 'string' ? id : id[0];
  const tokenUserId = req.userId;

  const { password, avatar, ...inputs } = req.body;

  if (idString !== tokenUserId) {
    return res.status(403).json({ message: 'Not Authorized!' });
  }

  let updatedPassword = null;
  try {
    if (password) {
      updatedPassword = await hashPassword(password);
    }

    const updatedUser = await prisma.user.update({
      where: { id: idString },
      data: {
        ...inputs,
        ...(updatedPassword && { password: updatedPassword }),
        ...(avatar && { avatar }),
      },
    });

    const { password: userPassword, ...rest } = updatedUser;

    res.status(200).json(rest);
    return userPassword;
  } catch (err) {
    return handleError(res, err, 'Failed to update users!');
  }
};

export const deleteUser = async (req: CustomRequest, res: Response) => {
  try {
    const { id } = req.params;
    const idString = typeof id === 'string' ? id : id[0];
    await prisma.user.delete({
      where: { id: idString },
    });
    res.status(200).json({ message: 'User deleted successfully!' });
  } catch (err) {
    return handleError(res, err, 'Failed to delete user');
  }
};

export const profileListings = async (req: CustomRequest, res: Response) => {
  const tokenUserId = req.userId;
  try {
    const userListings = await prisma.listing.findMany({
      where: { userId: tokenUserId },
    });

    res.status(200).json(userListings);
  } catch (err) {
    return handleError(res, err, 'Failed to get profile posts!');
  }
};
