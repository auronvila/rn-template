import { AxiosRequestConfig, AxiosResponse } from 'axios'
import BaseService from './base.service'

export const ApiService = {
  fetchData<TReq, TRes>(config: AxiosRequestConfig<TReq>): Promise<AxiosResponse<TRes>> {
    return new Promise((resolve, reject) => {
      BaseService(config)
        .then((response) => resolve(response))
        .catch((error) => reject(error))
    })
  }
}