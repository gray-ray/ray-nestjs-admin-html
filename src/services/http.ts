import axios, { type AxiosRequestConfig, HttpStatusCode } from 'axios'
import router from '@/router/index'

import { message, notification } from 'ant-design-vue'

const APP_TOKEN = 'NESTJS_APP'

export const getToken = () => {
  return (window || globalThis)?.localStorage.getItem(APP_TOKEN)
}

export const setToken = (val: string) => {
  return (window || globalThis)?.localStorage.setItem(APP_TOKEN, val)
}

export const removeToken = () => {
  return (window || globalThis)?.localStorage.removeItem(APP_TOKEN)
}

const http = axios.create({
  baseURL: 'http://121.43.152.195:3000/admin', //'http://10.43.192.18:3000/admin', //
  headers: {
    'Content-Type': 'application/json'
  }
})

const urlCache = new Map()

const axiosPending = (url: string, controller: any) => {
  if (urlCache.has(url)) {
    const existingController = urlCache.get(url)

    if (existingController) {
      existingController.abort() // Abort the previous request
    }
  }
  urlCache.set(url, controller)
}

const request = <T>(
  url: string,
  options: AxiosRequestConfig & { throttleUrl?: string }
): Promise<T> => {
  const controller = new AbortController()
  const signal = controller.signal

  if (options?.throttleUrl) {
    axiosPending(options?.throttleUrl, controller)
  }
  return http({
    url,
    signal,
    ...options
  })
}

http.interceptors.request.use(
  function (config) {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    } else {
      console.warn('No token found in localStorage')
    }

    return config
  },
  function (error) {
    // return Promise.reject(error)
  }
)

http.interceptors.response.use(
  (response) => {
    if (urlCache.has(response.config?.url)) {
      urlCache.delete(response.config?.url)
    }

    return response?.data
  },
  (error) => {
    if (error.config && error.config.url) {
      urlCache.delete(error.config.url) // Remove from cache if request fails
    }

    // 业务错误
    if (
      error?.response?.status >= HttpStatusCode.BadRequest &&
      error?.response?.status < HttpStatusCode.InternalServerError
    ) {
      message.error(error.response?.data?.message)
    }

    // 登录
    if (error?.response?.status === HttpStatusCode.Unauthorized) {
      removeToken()
      router?.push('/login')
    }

    // 系统错误
    if (error?.response?.status >= HttpStatusCode.InternalServerError) {
      notification.error({
        message: error?.response?.status,
        description: error.response?.data?.message
      })
    }

    throw new Error(error.response?.data?.message)
  }
)

export default request
