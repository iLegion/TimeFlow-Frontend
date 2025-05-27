import axios from 'axios'
import type { CreateAxiosDefaults } from 'axios'
import pathJoin from '@/shared/pathJoin'
import { ValidationErrors } from "@/exceptions/ValidationError.ts";
import {Unauthorized} from "@/exceptions/Unauthorized.ts";

export const axiosInstance = () => {
  const token = localStorage.getItem('token')
  const config: CreateAxiosDefaults = {
    baseURL: pathJoin(import.meta.env.VITE_API_BASE_URL, import.meta.env.VITE_API_PREFIX),
    timeout: 30 * 1000,
    // withCredentials: true,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },

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

    if (error.status === 401) {
      return Promise.reject(new Unauthorized())
    }

    if (error.status === 422 && error.response.data && error.response.data.errors) {
      return Promise.reject(new ValidationErrors(
        'Validation errors',
        error.response.data.errors
      ))
    }

    return Promise.reject(error);
  });

  return _axios
}
