/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
});
