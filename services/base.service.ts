import axios, { AxiosRequestConfig, AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BaseService = axios.create({
  timeout: 1000 * 60,
  baseURL: process.env.EXPO_PUBLIC_API_URL
});

BaseService.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    const userInfoString = await AsyncStorage.getItem('userInfo');
    const userInfo = JSON.parse(userInfoString || "{}");

    if (userInfo && userInfo.token) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${userInfo.token}`
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