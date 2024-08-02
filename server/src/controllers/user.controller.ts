import bcrypt from 'bcrypt';
import { Response } from 'express';

import { prisma } from '../lib/prisma';
import { CustomRequest } from '../types';

export const getUsers = async (req: CustomRequest, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to get users!' });
  }
};

export const getUser = async (req: CustomRequest, res: Response) => {
  const id = req.params.id;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to get user!' });
  }
};

export const updateUser = async (req: CustomRequest, res: Response) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  const { password, avatar, ...inputs } = req.body;

  if (id !== tokenUserId) {
    return res.status(403).json({ message: 'Not Authorized!' });
  }

  let updatedPassword = null;
  try {
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
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
    console.error(err);
    res.status(500).json({ message: 'Failed to update users!' });
  }
};

export const deleteUser = async (req: CustomRequest, res: Response) => {
  try {
    const id = req.params.id;
    await prisma.user.delete({
      where: { id },
    });
    res.status(200).json({ message: 'User deleted successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete user' });
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
    console.log(err);
    res.status(500).json({ message: 'Failed to get profile posts!' });
  }
};
