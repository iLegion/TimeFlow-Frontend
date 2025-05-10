import type { AxiosRequestConfig } from 'axios'
import { axiosInstance } from './axiosInstance'

export type Response<T = []> = {
  message?: string
  data?: T
  meta?: PaginationRemoteData
  // Record<string, string> | string[]
  errors?: Record<string, string>
}

interface PaginationRemoteData {
  current_page: number
  last_page: number
  per_page: number
  total: number
  to?: number
  from?: number
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
