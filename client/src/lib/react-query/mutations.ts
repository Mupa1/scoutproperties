import { useMutation } from '@tanstack/react-query';

import { NewUser } from '@/types';

import { signinUser, signOut, signupUser } from '../services/api';

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
