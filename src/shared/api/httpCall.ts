import type { AxiosRequestConfig } from 'axios'
import { axiosInstance } from './axiosInstance'
import type { SimplePagination } from "@/interfaces/pagination.interface.ts";

export type Response<T = []> = {
  message?: string
  data?: T
  meta?: SimplePagination
  // Record<string, string> | string[]
  errors?: Record<string, string>
  token?: string
}

export const httpCall = async <T>(config: AxiosRequestConfig) => {
  try {
    const axios = axiosInstance()
    const { data } = await axios.request<Response<T>>(config)

    return data
  } catch (error) {
    throw error
  }
}
