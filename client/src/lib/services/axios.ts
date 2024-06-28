import axios from 'axios';

const apiKey = import.meta.env.VITE_API_BASE_URL;

export const aXios = axios.create({
  baseURL: apiKey,
  withCredentials: true,
});
