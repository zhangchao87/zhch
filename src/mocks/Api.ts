import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { AxiosError } from 'axios'
import appConfig from './AppConfig'

/**
 * axiosのラッパー
 */

export enum ApiMethod {
  GET = 'get',
  POST = 'post'
}

// type ApiMethodKey = (typeof ApiMethod)[keyof typeof ApiMethod]
// もっともシンプルな代替案
type ApiMethodKey = 'get' | 'post'

export type ApiData<T> = {
  code: number
  message?: string
  data?: T
}

function fixUrl(url: string) {
  //TODO mockAdapterを邪魔するので不要！
  return url

  if (url.startsWith('http')) return url
  let result = url
  if (!url.startsWith('/')) result = '/' + result
  return appConfig.api.baseUrl + result
}

// https://juejin.cn/post/7090889657721815076
class Api {
  static client = axios

  static {
    // ---------------------
    // axios.defaults
    // ---------------------
    // baseURL: appConfig.api.baseUrl  // MockAdapterを邪魔するので不要！
    axios.defaults.timeout = 10000
    // https://developer.mozilla.org/ja/docs/Web/API/XMLHttpRequest/withCredentials
    axios.defaults.withCredentials = false

    Api.client.interceptors.request.use(
      config => {
        if (appConfig.isDev) {
          // console.debug("axios request:", config);
          console.log(`=> [${config.method}] ${config.url}`)
        }
        config.headers = config.headers || {}

        if (!config.headers?.['Content-Type']) {
          if (config.method === ApiMethod.POST.toString()) {
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
            if (config.data) {
              config.data = JSON.stringify(config.data)
            }
          } else {
            config.headers['Content-Type'] = 'application/json'
          }
        }

        return config
      },
      (error: AxiosError) => {
        console.log(`TODO: API REQUEST ERROR: ${error}`)
        // 外側: Uncaught (in promise) API 異常
        Promise.reject('API REQUEST 異常')
      }
    )

    Api.client.interceptors.response.use(
      function (response) {
        // 何らかの成功時の処理。例えば、レスポンスデータを変更することもできます。
        return response
      },

      function (error: AxiosError) {
        // 何らかのエラーハンドリング。
        // 例えば、特定のエラーコードに応じてリダイレクトすることもできます。
        console.log(`TODO: API RESPONSE ERROR: ${error}`)
        if (error && error.response) {
          let status = error.response.status
          console.log('status: ', status)
        }
        // 外側: Uncaught (in promise) API 異常
        return Promise.reject('API RESPONSE 異常')
      }
    )
  }

  /**
   * TODO: 需要避开 call, apply
   * @param method
   * @param url
   * @param data
   * @param config
   * @returns
   * @generics T1  input  data's type
   * @generics T2  return data's type
   */
  static call<T1, T2>(
    method: ApiMethodKey,
    url: string,
    data?: T2,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T1, any>> {
    const options = {
      method: method,
      url: fixUrl(url),
      data: data,
      ...config
    } as AxiosRequestConfig

    return Api.client(options)
  }
}

export default Api
