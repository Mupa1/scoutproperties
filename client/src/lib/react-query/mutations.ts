import { useMutation } from '@tanstack/react-query';

import { NewUser } from '@/types';

import {
  signinUser,
  signOut,
  signupUser,
  updateCurrentUser,
} from '../services/api';

export const useSignup = () => {
  return useMutation({
    mutationFn: (data: NewUser) => signupUser(data),
  });
};

export const useSignin = () => {
  return useMutation({
    mutationFn: (data: { email: string; password: string }) => signinUser(data),
  });
};

export const useSignout = () => {
  return useMutation({
    mutationFn: signOut,
  });
};

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: (data: { id: string; user: Partial<NewUser> }) =>
      updateCurrentUser(data.id, data.user),
  });
};
