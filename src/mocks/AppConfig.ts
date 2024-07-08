import * as _ from 'lodash'

type AppConfigType = {
  isDev: boolean /** true:開発環境 */

  /** アプリルート */
  contextPath: string

  /**
   * SSO認証先
   * 戻るURL付きの想定
   * 例、https://サテライトオフィスドメイン/xxx?redirect=https://TTTドメイン/auth-back-url
   * https://TTTドメイン/auth-back-urlが、サーバ側のURL
   * レスポンスには、認証成功のトークンがあるはず
   */
  authUrl: string

  /** API */
  api: {
    baseUrl: string
    isMock: boolean
  }
}

const context = '/sample'

const createConfig = (): AppConfigType => {
  // const isProd = import.meta.env.PROD
  const isDev = false

  /** 本番環境 */
  const defaultConfig = {
    systemName: 'Sample',
    systemTitle: 'Sample',
    systemVersion: '0.0.1',
    isDev: isDev,
    contextPath: context,
    authUrl: 'TODO: 本番ログインパスを要確認 by 崔',
    api: {
      baseUrl: 'http://TODO:/api',
      isMock: false
    }
  }

  let result = _.merge({}, defaultConfig)

  /** 開発環境 */
  if (isDev) {
    const contextPath = `${location.origin}${defaultConfig.contextPath}`
    const devConfig = {
      systemTitle: 'Sample(開発)',
      authUrl: `${contextPath}/auth-mock`,
      api: {
        // baseUrl: `${contextPath}/api`,
        baseUrl: 'http://localhost:3000',
        isMock: true
      }
    }
    result = _.merge(result, devConfig)
  }

  return result
}

const appConfig = createConfig()
export default appConfig
