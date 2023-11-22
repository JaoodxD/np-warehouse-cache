import { request, ProxyAgent } from 'undici'
import bodyParse from './bodyParse.js'

const apiHost = 'https://api.novaposhta.ua'
const apiVersion = 'v2.0'
const apiFormat = 'json'

export default function build (cfg = {}) {
  const login = cfg.PROXY_LOGIN
  const pass = cfg.PROXY_PASSWORD
  const proxyIps = cfg.PROXY_IPS
  const token = `Basic ${Buffer.from(`${login}:${pass}`).toString('base64')}`

  const proxies = proxyIps.map(
    ip =>
      new ProxyAgent({
        uri: `http://${ip}`,
        token
      })
  )

  const host = cfg.host || apiHost
  const version = cfg.version || apiVersion
  const format = cfg.format || apiFormat
  const url = `${host}/${version}/${format}/`

  return { fetch: doRequest }

  async function doRequest (apiKey, modelName, calledMethod, methodProperties) {
    if (!apiKey) throw new Error('no API key provided')
    modelName ||= 'Address'
    calledMethod ||= 'getWarehouses'
    methodProperties ||= {}
    const body = JSON.stringify({
      apiKey,
      modelName,
      calledMethod,
      methodProperties
    })

    const method = 'POST'
    const dispatcher = proxies[0]

    const opts = { method, dispatcher, body }
    const response = await request(url, opts)
    console.log(response.headers)
    return await bodyParse(response.body)
  }
}
