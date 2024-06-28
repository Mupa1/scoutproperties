import { NewUser, User } from '@/types';

import { aXios } from './axios';

export const signupUser = async (data: NewUser) => {
  try {
    const response = await aXios.post('/auth/register', data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const signinUser = async (data: User) => {
  try {
    const response = await aXios.post('/auth/login', data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

