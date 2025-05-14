import { authStore } from '@/hooks/auth-store';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

type SunkistAxiosProps = {
  method: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'head' | 'options';
  url: string;
  headers?: any;
  params?: Record<string, any>;
  body?: any;
};

export const SunkistBaseURL: string = process.env.NODE_ENV === 'production' ? 'https://sunkist-api-next.vercel.app' : 'http://localhost:8080';

export async function sunkistAxios({ method, url = '', headers = {}, params = {}, body = {} }: SunkistAxiosProps) {
  const encodedParams: Record<string, any> = {};
  Object.keys(params).forEach((key) => {
    const encodedKey = encodeURIComponent(key);
    encodedParams[encodedKey] = params[key];
  });

  const config: AxiosRequestConfig = {
    baseURL: SunkistBaseURL,
    url,
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: authStore.getToken(),
      ...headers,
    },
    params: encodedParams,
  };

  if (['post', 'put', 'patch', 'delete'].includes(method)) {
    config.data = body;
  }

  try {
    const response: AxiosResponse = await axios(config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw {
        status: error.response?.status,
        data: error.response?.data,
        error,
        message: error.message,
      };
    }

    throw {
      error,
      message: 'Request failed',
    };
  }
}
