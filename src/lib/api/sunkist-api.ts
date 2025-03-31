import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

type SunkistAxiosProps = {
  method: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'head' | 'options';
  url: string;
  headers?: any;
  params?: Record<string, any>;
  body?: any;
};

export async function sunkistAxios({ method, url = '', headers = {}, params = {}, body = {} }: SunkistAxiosProps) {
  const baseURL = process.env.NODE_ENV === 'production' ? 'https://api.sunkist.cloud' : 'http://localhost:3001';

  const encodedParams: Record<string, any> = {};
  Object.keys(params).forEach((key) => {
    const encodedKey = encodeURIComponent(key);
    encodedParams[encodedKey] = params[key];
  });

  const config: AxiosRequestConfig = {
    baseURL,
    url,
    method,
    headers: {
      'x-app-id': process.env.NEXT_PUBLIC_APP_ID,
      'x-app-code': process.env.NEXT_PUBLIC_APP_CODE,
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
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
