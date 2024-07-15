import { NewUser } from '@/types';

import { axiosInstance } from './axiosInstance';

export const signupUser = async (data: NewUser) => {
  try {
    const response = await axiosInstance.post('/auth/register', data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const signinUser = async (data: { email: string; password: string }) => {
  try {
    const response = await axiosInstance.post('/auth/login', data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    const response = await axiosInstance.post('/auth/logout');
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateCurrentUser = async (id: string, data: Partial<NewUser>) => {
  try {
    const response = await axiosInstance.put(`/users/${id}`, data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
