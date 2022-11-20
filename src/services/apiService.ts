import axios, { AxiosRequestConfig, Method } from "axios";
import storage from '../auth/storage';

export interface ICallApi extends AxiosRequestConfig {
  url: string;
  method: Method;
  headers?: any;
  data?: unknown;
  params?: Record<string, unknown>;
  timeout?: 30000;
  isProtected?: boolean;
}

const CallApi = <T>({
  url,
  method,
  headers,
  data,
  params,
  timeout,
  isProtected = false
}: ICallApi) => {
  const config: AxiosRequestConfig = {
    method,
    data,
    params,
    url,
    timeout,
    headers: {
      ...headers,
    },
  };

  if (!isProtected) {
    return axios.request(config);
  }

  return storage.getToken().then((token) => {
    if (config.headers == undefined) {
      config.headers = {};
    }
    config.headers.Authorization = `Bearer ${token}`
    return axios.request(config);
  });
};

export default CallApi;
