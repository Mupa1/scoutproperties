import { useMutation } from '@tanstack/react-query';

import { NewUser, User } from '@/types';

import { signinUser, signupUser } from '../services/api';

export const useSignup = () => {
  return useMutation({
    mutationFn: (data: NewUser) => signupUser(data),
  });
};

export const useSignin = () => {
  return useMutation({
    mutationFn: (data: User) => signinUser(data),
  });
};
