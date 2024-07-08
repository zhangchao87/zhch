import MockAdapter from 'axios-mock-adapter'
import Api from './Api'

const axiosMockAdapter = new MockAdapter(Api.client, {
  delayResponse: 0
})

export default axiosMockAdapter
