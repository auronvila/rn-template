import axios, { AxiosRequestConfig, AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BaseService = axios.create({
  timeout: 1000 * 60,
  baseURL: 'http://transyol.caykara.dev/api'
});

BaseService.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    const authToken = AsyncStorage.getItem('authToken');

    if (!!authToken) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${authToken}`
      } as AxiosRequestHeaders;
    }

    return config as InternalAxiosRequestConfig;
  },
  (error) => Promise.reject(error)
)


BaseService.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
)

export default BaseService;