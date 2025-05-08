import axios from 'axios'
import type { CreateAxiosDefaults } from 'axios'
import pathJoin from '@/shared/pathJoin'

export const axiosInstance = () => {
  const config: CreateAxiosDefaults = {
    baseURL: pathJoin(import.meta.env.VITE_API_BASE_URL, import.meta.env.VITE_API_PREFIX),
    timeout: 30 * 1000,
    // withCredentials: true,
  }
  const _axios = axios.create(config)

  _axios.interceptors.request.use(function (config) {
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  _axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
  });

  return _axios
}
